# P00LS Takehome Notes
## Decisions
Some decisions that were made along the way and why
* Added properties to `config` for fields that should be searchable and fields that should be displayed.
  * Easier to adjust per data source
* Improved matching by comparing lower-cased options
* Refactored `Autocomplete` component into custom html element
  * Makes using the component easier
  * Less repeated html
* Implemented custom ids for `Autocomplete` component's sub components
  * Prevents breaking functionality when multiple `Autocomplete` components exist
* Moved `Autocomplete` component into separate components folder for all future components

## Future improvements with more time
Some things I would like to implement with more time
* Once results are displayed, the user should be able to use the `up` and `down` arrows and the `return` key to select a result
* Refresh Results
  * Implement polling in conjunction with input-changed events to keep the results up to date
* More styling of the `Autocomplete` component to make it more user-friendly