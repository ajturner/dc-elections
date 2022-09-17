import { Component, Event, EventEmitter, Host, h, Listen, State, Method } from '@stencil/core';

@Component({
  tag: 'dc-map',
  styleUrl: 'dc-map.css',
  shadow: false,
})
export class DcMap {

  @State() m_view;
  @State() m_layerView;
  @State() m_layers = {};
  @State() m_highlight;
  @State() m_currentFilter;

  @Event({ cancelable: false })  filterChanged: EventEmitter<any>;
  @Event({ cancelable: false })  featureSelected: EventEmitter<any>;

  @Method()
  public async setFilter(filter) {
    // filter = filter.slice(0, 2);
    this.selectFeature({ attributes: { SMD_ID: filter } })
    
    this.filterChanged.emit({ value: filter })
  }


  @Listen('arcgisHubMapViewReady')
  async handleMapViewReady(event: CustomEvent<any>): Promise<void> {
    const { detail: { view, loadModules } } = event;
    this.m_view = view;

    loadModules([
      'esri/geometry/Extent',
      'esri/layers/FeatureLayer',
      'esri/widgets/Home',
      "esri/layers/support/LabelClass",
      'esri/widgets/Search'
    ])
      .then(([Extent, FeatureLayer, Home, LabelClass, Search]) => {
        // Add ANC Boundaries
        const smdStyle = {
          type: "simple",
          symbol: {
            type: "simple-fill",
            opacity: 0,
            color: [200,200,200,0.1],
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "#0f9535"
            }
          }
        }
        const ancStyle = {
          type: "simple",
          symbol: {
            type: "simple-fill",
            opacity: 1,
            color: [0,0,0,0],
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: [255,255,255,0.8]
            }
          }
        }        
        const ancLabels = new LabelClass({
          labelExpressionInfo: { expression: "$feature.NAME" },
          symbol: {
            type: "text",  // autocasts as new TextSymbol()
            color: "white",
            haloSize: 0.5,
            haloColor: "black",
            font: {
              size: 12,
              weight: "bold"
            }
          }
        });

        // from https://opendata.dc.gov
        this.m_layers['ancLayer'] = new FeatureLayer({
          url: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/54",
          renderer: ancStyle,
          labelingInfo: [ancLabels]
        });


        const smdLabels = new LabelClass({
          labelExpressionInfo: { expression: "$feature.SMD_ID" },
          symbol: {
            type: "text",  // autocasts as new TextSymbol()
            color: "black",
            haloSize: 0.5,
            haloColor: "white",
            font: {
              size: 8
            },
            maxScale: 0,
            minScale: 1000000,
          }
        });
        // from https://opendata.dc.gov
        this.m_layers['smdLayer'] = new FeatureLayer({
          url: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55",
          outFields: ["*"],
          renderer: smdStyle,
          labelingInfo: [smdLabels]
        })

        this.m_view.map.add(this.m_layers['ancLayer']);
        this.m_view.map.add(this.m_layers['smdLayer']);

        this.m_view.highlightOptions = {
          color: "#0f9535"
        }

        // Washington, DC
        const theExtent = new Extent({
          xmin: -8584947.85844689,
          ymin: 4691862.387048862,
          xmax: -8561472.787091771,
          ymax: 4721095.072076196,
          spatialReference: {
            wkid: 3857
          }
        });
        this.m_view.constraints = {
          geometry: theExtent,
          minScale: 500000,
          maxScale: 10000,
          rotationEnabled: false
        };

        // this.m_view.ui.components = ["zoom"];
        const searchExtent = {
          geometry: theExtent
        };
        const sources = [{
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          name: "DC Address Search",
          zoomScale: 50000,
          popupEnabled: false,
          filter: searchExtent
        }, {
          layer: this.m_layers['smdLayer'],
          placeholder: "Search SMD",
          maxResults: 5,
          searchFields: ["NAME"],
          displayField: "NAME",
          name: "DC SMD"
        }];
        const searchWidget = new Search({
          view: this.m_view,
          includeDefaultSources: false,
          sources: sources
        });
        // Adds the search widget below other elements in
        // the top left corner of the view
        this.m_view.ui.add(searchWidget, {
          position: "top-left",
          index: 2
        });
        let homeWidget = new Home({
          view: this.m_view
        });
        view.ui.add(homeWidget, "top-left");
        view.ui.move("zoom", "top-right");

        searchWidget.on("search-complete", (event) => {this.searchCompleteHandler(event)});

        this.m_view
          .when()
          .then(() => {
            // console.log("when view", [this.m_layers, this.m_layers['ancLayer']]);

            return this.m_layers['smdLayer'].when();
          })
          .then((layer) => {
            // console.log("when view", layer);
            return this.m_view.whenLayerView(layer);
          })
          .then((layerView) => {
            this.m_layerView = layerView;
            // console.log("m_layerView", this.m_layerView);

            this.m_view.on("pointer-move", (event) => {this.mapMouseHandler(event)});
            this.m_view.on("pointer-down", (event) => {this.mapMouseHandler(event)});
          })
      });
  }
  searchCompleteHandler (event) {
    // The results are stored in the event Object[]
    let feature = event.results[0].results[0].feature;
    let query = this.m_layerView.createQuery();
    query.geometry = feature.geometry;
    // console.debug("search-complete", query)
    this.m_layers['smdLayer'].queryFeatures(query).then((result) => {
      let resultFeature = result.features[0];
      // console.debug("search-complete: resultFeature", resultFeature)
      this.setFilter(resultFeature.attributes.SMD_ID);
    });
  }
  mapMouseHandler(event) {
    const opts = {
      include: this.m_layers['smdLayer']
    }

    this.m_view.hitTest(event, opts).then((response) => {
      if (response.results.length) {
        const feature = response.results[0].graphic;
        this.highlightFeature(feature)
        // currentANCName = response.results[0].graphic.attributes["NAME"];
        if (event.type === "pointer-down") {
          this.setFilter(this.m_currentFilter);
        }
      }
    });

  }

  selectFeature(feature) {
    const query = this.m_layerView.createQuery();
    query.where = `SMD_ID = '${feature.attributes.SMD_ID}'`;
    this.m_layerView.queryFeatures(query).then((result) => {

      if (this.m_highlight) {
        this.m_highlight.remove();
      }
      if(!!result && result.features.length > 0) {

        
        const foundFeature = result.features[0];
        // console.debug("selectFeature", {feature, query, result, foundFeature})
        
        this.featureSelected.emit({ feature: foundFeature })

        this.m_highlight = this.m_layerView.highlight(foundFeature.attributes.OBJECTID);
        this.m_view.goTo(
          {
            target: foundFeature.geometry,
            zoom: 16
          },
          {
            duration: 2000,
            easing: "in-out-expo"
          }
        )

      }
    });
  }
  highlightFeature(feature) {
    this.m_currentFilter = feature.attributes.SMD_ID;
    // console.debug("highlightFeature", {filter: this.m_currentFilter, attr:feature.attributes})
    this.m_layers['smdLayer'].featureEffect = {
      filter: {
        where: `SMD_ID = '${feature.attributes.SMD_ID}'`
      },
      excludedLabelsVisible: true,
      includedEffect: "brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "
    }

    // this.m_layerView.queryFeatures(query).then((ids) => {
    //   if (highlight) {
    //     highlight.remove();
    //   }
    //   // highlight = this.m_layerView.highlight(ids.features[0].attributes.OBJECTID);
    // }); 
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <arcgis-hub-map
          style={{ height: '400px' }}
          zoom="10"
          center="-77.05,38.9"
          basemap="gray-vector"
        ></arcgis-hub-map>
      </Host>
    );
  }

}
