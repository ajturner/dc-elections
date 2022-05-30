# dc-election-gallery



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default |
| ---------- | ---------- | ----------- | -------- | ------- |
| `filename` | `filename` |             | `string` | `null`  |


## Dependencies

### Depends on

- [dc-election-candidate](../dc-election-candidate)
- [dc-election-question](../dc-election-question)

### Graph
```mermaid
graph TD;
  dc-election-gallery --> dc-election-candidate
  dc-election-gallery --> dc-election-question
  dc-election-question --> dc-election-candidate
  style dc-election-gallery fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
