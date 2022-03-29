export function getUsers() {
  return fetch('https://reqres.in/api/users')
    .then((response) => response.json())
    .then((userResults) => userResults.data);
}
