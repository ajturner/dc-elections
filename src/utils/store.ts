import { createStore } from "@stencil/store";

// DOC: https://stenciljs.com/docs/stencil-store

const { state, onChange } = createStore({
  filter: ''
});

onChange('filter', value => {
  // state.filter = value ** 2;
  console.log("store: filter changed: ", value)
});

export default state;