import Autocomplete from '../src/Autocomplete/Autocomplete';
import countries from '../data/countries.json';

import './styles.css';

const countriesWrapper = document.getElementById('countries');
const countriesResults = document.getElementById('countries-results');
const selectedCountry = document.getElementById('selected-country');
countriesWrapper.autocomplete = new Autocomplete(countriesWrapper, {
  data: countries,
  resultsEl: countriesResults,
  renderResult: (country) => {
    const item = document.createElement('div');
    item.innerText = country
      ? country.label
      : 'Start typing for options';
    return item;
  },
  onSelect: (country) => {
    console.log('select', country);
    selectedCountry.innerText = `${country.label} (${country.code})`;
  },
});
