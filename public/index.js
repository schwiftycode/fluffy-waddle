import Autocomplete from '../src/Autocomplete/Autocomplete';
import countries from '../data/countries.json';

import './styles.css';
import { getUsers } from '../src/api/users';

const countriesWrapper = document.getElementById('countries');
const countriesResults = document.getElementById('countries-results');
const selectedCountry = document.getElementById('selected-country');
countriesWrapper.autocomplete = new Autocomplete(countriesWrapper, {
  data: countries,
  resultsEl: countriesResults,
  searchFields: ['label'],
  displayFields: ['label'],
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

function getName(user) {
  return `${user.first_name} ${user.last_name}`;
}

const usersWrapper = document.getElementById('users');
const usersResults = document.getElementById('users-results');
const selectedUsers = document.getElementById('selected-users');
getUsers()
  .then((users) => {
    usersWrapper.autocomplete = new Autocomplete(usersWrapper, {
      data: users,
      resultsEl: usersResults,
      searchFields: ['first_name', 'last_name'],
      displayFields: ['first_name', 'last_name'],
      renderResult: (user) => {
        const item = document.createElement('div');
        item.innerText = user
          ? getName(user)
          : 'Start typing for options';
        return item;
      },
      onSelect: (user) => {
        console.log('select', user);
        selectedUsers.innerText = getName(user);
      },
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
