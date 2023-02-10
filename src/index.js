import './css/styles.css';
import API from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');

input.addEventListener('keydown', countrySearch);

function countrySearch(e) {
  const country = e.target.value;
  API.getCountry(`${country}`).then(console.log);
}

function createMarkup({name, capital, population, flag, languages}) {
    
}

// API.getCountry("Ukraine").then(console.log);
