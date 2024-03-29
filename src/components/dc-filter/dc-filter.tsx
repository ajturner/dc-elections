import { Component, Event, EventEmitter, Host, h, State, Prop, Listen, Watch } from '@stencil/core';
import "@esri/calcite-components/dist/calcite/calcite.css";
// import "@esri/calcite-components/dist/components/calcite-icon";

// https://developers.arcgis.com/calcite-design-system/get-started/

@Component({
  tag: 'dc-filter',
  styleUrl: 'dc-filter.css',
  shadow: true,
})
export class DcFilter {
  @Prop({ mutable: true, reflect: true }) filter:string = "";
  @Prop() url: string = "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=ANC_ID%2CSMD_ID&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=SMD_ID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json";
  
  @Event({ cancelable: false })  filterChanged: EventEmitter<any>;

  @State() m_filterOptions:Array<any> = [];

  m_dropdownEl: HTMLCalciteComboboxElement;

  componentWillLoad() {
    this.fetchOptions();
  }


  // TODO: extract hard-coded ANC_ID, SMD_ID attribute names to @Prop
  async fetchOptions() {
    const filters = [];
    const response = await fetch(this.url);
    const json = await response.json();
    json.features.map((feature) => {
      filters.push({ANC_ID: feature.attributes.ANC_ID, SMD_ID: feature.attributes.SMD_ID});
    })
    this.m_filterOptions = filters;

  }
  groupBy(input: Array<any>, groupKey:string) {
    const result = input.reduce(function (r, a) {
              r[a[groupKey]] = r[a[groupKey]] || [];
              r[a[groupKey]].push(a);
              return r;
          }, Object.create(null));
    return result;
  }

  @Listen("calciteComboboxChange")
  dropdownChangedHandler(_event) {
    this.filterChanged.emit({ value: this.m_dropdownEl.value });
  }
  @Watch('filter')
  filterPropChanged(newValue: string) {
    console.debug("dc-filter: filterPropChanged", newValue);
    this.m_dropdownEl.value = newValue;
  }

  renderOption(option: string, slot:string = null) {
      return (<calcite-combobox-item 
                  value={option} 
                  textLabel={option}
                  selected={option === this.filter}
                  >
                  {slot}
                </calcite-combobox-item>
      )
  }
  resetButton() {
    return (
        <calcite-button
          class="filter"
          alignment="start"
          appearance="solid"
          color="blue"
          scale="m"
          href=""
          type="button"
          width="auto"
          onClick={() => this.filter = null}
        >
          Back to Summary
        </calcite-button>      
    )    
  }  
  render() {
    const filterDisplay = this.groupBy(this.m_filterOptions, 'ANC_ID');

    const filterOptions = [];
    for(let filter in filterDisplay) {
      const subFilters = filterDisplay[filter].map((sub) => {
        return this.renderOption(sub['SMD_ID']);
      })
      filterOptions.push (
        this.renderOption(filter, subFilters)
      );
    }
    return (
      <Host>
        <div class="filters">
          <slot></slot>
          <calcite-combobox
            class="filter"
            ref={(el) => this.m_dropdownEl = el}
            label="search"
            placeholder="Search by ANC"
            selection-mode="single"
            scale="m"
            max-items="0"
          >
            {filterOptions}
          </calcite-combobox>
          {this.filter ? this.resetButton() : ""}
        </div>
      </Host>
    );
  }

}
