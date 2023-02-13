import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const TIMEOUT_NOTIFICATION = 2000;
const searchBoxRef = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');

searchBoxRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = e.target.value.trim();

  fetchCountries(inputValue)
    .then(onRenderCountriesList)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: TIMEOUT_NOTIFICATION,
      });
      countriesList.innerHTML = '';
      countriesInfo.innerHTML = '';
    });
}

function onRenderCountriesList(countries) {
  const countriesCount = countries.length;
  const markupCountriesList = countries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `
        <li class="country-wrapper">
          <img src="${svg}" alt="Flag of ${official}" />
          <h1>${official}</h1>
        </li>`
    )
    .join('');
  countriesList.innerHTML = markupCountriesList;

  if (countriesCount === 1) {
    const fullInfoRender = document.querySelector('.country-wrapper');
    fullInfoRender.classList.add('fullInfoRender');

    const countryInfo = countries
      .map(
        ({ capital, population, languages }) =>
          `<p><b>Capital: </b>${capital}.</p>
         <p><b>Population: </b>${population}.</p>
         <p><b>Languages: </b>${Object.values(languages)}.</p>`
      )
      .join('');
    countriesInfo.innerHTML = countryInfo;
    return;
  }
  countriesInfo.innerHTML = '';

  if (countriesCount > 10) {
    countriesInfo.innerHTML = '';
    countriesList.innerHTML = '';
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name',
      {
        timeout: TIMEOUT_NOTIFICATION,
      }
    );
  }
}
