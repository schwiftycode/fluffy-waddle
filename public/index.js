import {} from '../src/components/Autocomplete/Autocomplete';
import countries from '../data/countries.json';
import { getUsers } from '../src/api/users';

import './styles.css';

const selectedCountry = document.getElementById(
  'countries-ac-selected-result',
);
const countriesAC = document.getElementById('countries-ac');
countriesAC.initialize({
  data: countries,
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

const usersAC = document.getElementById('users-ac');
const selectedUser = document.getElementById(
  'users-ac-selected-result',
);
const selectedUserAvatar = document.getElementById(
  'users-ac-selected-result-avatar',
);
getUsers()
  .then((users) => {
    usersAC.initialize({
      data: users,
      searchFields: ['first_name', 'last_name'],
      displayFields: ['first_name', 'last_name'],
      renderResult: (user) => {
        const item = document.createElement('div');
        item.innerText = user
          ? `${user.first_name} ${user.last_name}`
          : 'Start typing for options';
        return item;
      },
      onSelect: (user) => {
        console.log('select', user);
        selectedUser.innerText = `${user.first_name} ${user.last_name} (${user.email})`;
        selectedUserAvatar.style.background = `url(${user.avatar})`;
      },
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
