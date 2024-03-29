import { Component, Event, EventEmitter, Host, h, Listen, State, Method, Prop } from '@stencil/core';

@Component({
  tag: 'dc-map',
  styleUrl: 'dc-map.css',
  shadow: false,
})
export class DcMap {

  @Prop() filter:string = "";
  @State() m_view;
  @State() m_layerViews = {};
  @State() m_layers = {};
  @State() m_highlights = {};

  @Event({ cancelable: false })  featureSelected: EventEmitter<any>;
  @Event({ cancelable: false })  mapLoaded: EventEmitter<any>;

  // Highlight + Select a feature with attributes
  @Method()
  public async selectFeature(feature, emitEvent:boolean = true) {
    // filter = filter.slice(0, 2);
    // console.debug("dc-map: selectFeature", {attributes: feature.attributes, emitEvent} )
    this.highlightFeature( feature )
    if(emitEvent) {
      this.featureSelected.emit({ feature: feature })
    }
  }

  // Just highlight features based on a query
  @Method()
  public async highlightFeatures(ids:Array<string>) {
    this.outlineFeatures(ids);
  }


  @Listen('arcgisHubMapViewReady')
  async handleMapViewReady(event: CustomEvent<any>): Promise<void> {
    const { detail: { view, loadModules } } = event;
    this.m_view = view;
    this.m_view.map.basemap = "streets-vector";
    this.m_view.navigation = {
      mouseWheelZoomEnabled: false,
      browserTouchPanEnabled: false
    }

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

        // ANC labels are difficult to see
        // const ancLabels = new LabelClass({
        //   labelExpressionInfo: { expression: "$feature.NAME" },
        //   symbol: {
        //     type: "text",  // autocasts as new TextSymbol()
        //     color: "white",
        //     haloSize: 0.5,
        //     haloColor: "black",
        //     font: {
        //       size: 12,
        //       weight: "bold"
        //     }
        //   }
        // });

        // from https://opendata.dc.gov
        this.m_layers['ancLayer'] = new FeatureLayer({
          url: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/54",
          renderer: ancStyle,
          outFields: ['NAME'],
          // labelingInfo: [ancLabels]
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
            }

          }
        });
        // from https://opendata.dc.gov
        this.m_layers['smdLayer'] = new FeatureLayer({
          url: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55",
          outFields: ["*"],
          renderer: smdStyle,
          maxScale: 0,
          minScale: 1000000,
          labelingInfo: [smdLabels]
        })

        this.m_view.map.add(this.m_layers['ancLayer']);
        this.m_view.map.add(this.m_layers['smdLayer']);

        //////////
        // Masking
        ////
        const boundaryUrl = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Washington_DC_Boundary/FeatureServer";
        // const boundaryStyle = {
        //   type: "simple",
        //   symbol: {
        //     type: "simple-fill",
        //     opacity: 1,
        //     color: [0,0,0,0],
        //     outline: {  // autocasts as new SimpleLineSymbol()
        //       width: 0.5,
        //       color: [255,255,255,0.8]
        //     }
        //   }
        // }
        this.m_layers['boundaryLayer'] = new FeatureLayer({
          url: boundaryUrl,
          blendMode: "destination-in",
          maxScale: 0,
          minScale: 1000000,          
          // renderer: boundaryStyle
        })
        this.m_view.map.add(this.m_layers['boundaryLayer']);


        //////////
        // Map interaction: highlight, controls, limits
        ////
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
        searchWidget.on("search-complete", (event) => {this.searchCompleteHandler(event)});

        let homeWidget = new Home({
          view: this.m_view
        });
        view.ui.add(homeWidget, "top-left");
        view.ui.move("zoom", "top-right");
        homeWidget.on("go", () => {
          searchWidget.clear();
          this.highlightFeature();
          this.featureSelected.emit({ });
        })

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
            this.m_layerViews['smdLayer'] = layerView;
            
            this.m_view.on("pointer-move", (event) => {this.mapMouseHandler(event)});
            this.m_view.on("click", (event) => {this.mapMouseHandler(event)});
          })
          // Get ANC Layer definitions
          .then(() => {
            return this.m_layers['ancLayer'].when();
          })
          .then((layer) => {
            return this.m_view.whenLayerView(layer);
          })
          .then((layerView) => {
            this.m_layerViews['ancLayer'] = layerView;
            this.mapLoaded.emit();
          })

      });
  }
  searchCompleteHandler (event) {
    // The results are stored in the event Object[]
    let feature = event.results[0].results[0].feature;
    let query = this.m_layerViews['smdLayer'].createQuery();
    query.geometry = feature.geometry;
    // console.debug("search-complete", query)
    this.m_layers['smdLayer'].queryFeatures(query).then((result) => {
      let resultFeature = result.features[0];
      // console.debug("search-complete: resultFeature", resultFeature.attributes)
      this.selectFeature(resultFeature);
    });
  }

  mapMouseHandler(event) {
    const opts = {
      include: this.m_layers['smdLayer']
    }

    this.m_view.hitTest(event, opts).then((response) => {
      if (response.results.length) {
        const feature = response.results[0].graphic;
        this.outlineFeature(feature)

        // currentANCName = response.results[0].graphic.attributes["NAME"];
        if (event.type === "click") {
          // console.debug("dc-map: mapMouseHandler", {feature})
          this.selectFeature(feature);
        }
      }
    });

  }


  // Feature clicked on
  highlightFeature(feature = null) {
    if (this.m_highlights['smdLayer']) {
      this.m_highlights['smdLayer'].remove();
    }
    if (this.m_highlights['ancLayer']) {
      this.m_highlights['ancLayer'].remove();
    }
    // clear Highlights
    if(feature === null) {
      return;
    }
    const query = this.m_layerViews['ancLayer'].createQuery();
    query.where = `NAME = '${feature.attributes.ANC_ID}'`;
    this.m_layerViews['ancLayer'].queryFeatures(query).then((result) => {
      console.debug("dc-map: highlightFeature 1", {feature, where: query.where, result})

      if(!!result && result.features.length > 0) {
        const foundFeature = result.features[0];
        
        this.m_view.goTo(
          {
            target: foundFeature.geometry
          },
          {
            duration: 2000,
            easing: "in-out-expo"
          }
        )
        // console.debug("dc-map: highlightFeature 2", {lv: this.m_layerViews, an: this.m_layerViews['ancLayer'], hl: this.m_layerViews['ancLayer'].highlight})
        this.m_highlights['ancLayer'] = this.m_layerViews['ancLayer'].highlight(foundFeature.attributes.OBJECTID);

      }
    });
    // this.outlineFeature(feature)
    // Highlight the specific SMD
    if(feature.attributes.SMD_ID !== undefined) {
      const query = this.m_layerViews['smdLayer'].createQuery();
      query.where = `SMD_ID = '${feature.attributes.SMD_ID}'`;


      // console.debug("dc-map: highlightFeature 2", {feature, where: query.where})

      this.m_layerViews['smdLayer'].queryFeatures(query).then((result) => {
        const foundFeature = result.features[0];
        this.m_highlights['smdLayer'] = this.m_layerViews['smdLayer'].highlight(foundFeature.attributes.OBJECTID);
      });  
    }
    
  }

  // Feature hovered
  outlineFeature(feature) {
    this.m_layers['smdLayer'].featureEffect = {
      filter: {
        where: `SMD_ID = '${feature.attributes.SMD_ID}'`
      },
      excludedLabelsVisible: true,
      includedEffect: "brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "
    }

    // this.m_layerViews['smdLayer'].queryFeatures(query).then((ids) => {
    //   if (highlight) {
    //     highlight.remove();
    //   }
    //   // highlight = this.m_layerViews['smdLayer'].highlight(ids.features[0].attributes.OBJECTID);
    // }); 
  }

  // Outline features by Query
  outlineFeatures(ids:Array<string>) {
    this.m_layers['smdLayer'].featureEffect = {
      filter: {
        where: `SMD_ID in ('${ids.join("','")}')`
      },
      excludedLabelsVisible: false,
      excludedEffect: "brightness(0) contrast(0%)",
      includedEffect: "brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "
    }

    // this.m_layerViews['smdLayer'].queryFeatures(query).then((ids) => {
    //   if (highlight) {
    //     highlight.remove();
    //   }
    //   // highlight = this.m_layerViews['smdLayer'].highlight(ids.features[0].attributes.OBJECTID);
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
