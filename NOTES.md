# P00LS Takehome Notes
## Decisions
* Added properties to config for fields that should be searchable and fields that should be displayed.
  * Easier to adjust per data source
* Improved matching by comparing lower-cased options
* Refactored Autocomplete component into custom html element
  * Makes using the component easier
  * Less repeated html
* Implemented custom ids for Autocomplete component's sub components
  * Prevents breaking functionality when multiple Autocomplete components exist

## Future improvements with more time