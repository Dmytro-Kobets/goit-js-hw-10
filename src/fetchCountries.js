const ENDPOINT = "https://restcountries.com/v3.1/name/"

function getCountry(countryName) {
  return fetch(`${ENDPOINT}${countryName}`)
    .then(res => res.json());
}

export default { getCountry };