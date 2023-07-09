// const URL = 'https://api.thecatapi.com/v1/';
// const API_KEY = "live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya";
// const url = `https://api.thecatapi.com/v1/breeds`;
// const api_key = "live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya";

//========================================================================
// бібліотеки
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

// змінні з HTML-елементів
const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

const URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya';


// глобальні змінні
let choosenBreed = null;
let breeds = [];

// slimSelect
let slimSelect = new SlimSelect({
  select: '.breed-select',
  placeholder: 'Loading breeds...',
  allowDeselect: true,
  deselectLabel: '<span class="placeholder">Select a breed</span>',
  showFirstOption: false,
  onChange: info => {
    let selectedBreed = info[0].value;
    if (selectedBreed) {
      fetchCatByBreed(selectedBreed);
    }
  },
});

// створення розмітки для порід
function createBreedsMarkup(items) {
  slimSelect.setData(
    [{ text: 'Select a breed', value: '' }].concat(
      items.map(item => {
        return { text: item.name, value: item.id };
      })
    )
  );
}

// отримання даних про породи
function fetchBreeds() {
  fetch(`${URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure(`${errorMsg.textContent}`);
      }
      return response.json();
    })
    .then(data => {
      breeds = data;
      createBreedsMarkup(data);
    })
    .catch(error => {
      console.log(error);
    });
}

// отримання даних за обраною породою
function fetchCatByBreed(breed) {
  if (!breed) {
    return;
  }
  fetch(`${URL}images/search?breed_ids=${breed}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure(`${errorMsg.textContent}`);
      }
      return response.json();
    })
    .then(data => {
      catInfo.innerHTML = createCatInfo(data, breed);
    })
    .catch(error => {
      Notify.failure("this cat wasn't found :(", 'okay');
      console.log(error);
    });
}

// подія на зміну вибору породи
selectBreed.addEventListener('change', event => {
  choosenBreed = event.target.value;
  if (choosenBreed) {
    fetchCatByBreed(choosenBreed);
  }
});

// отримання породи за ID
function getBreedById(id) {
  return breeds.find(breed => breed.id === id);
}

// інформація про кота
function createCatInfo(catData, id) {
  const cat = catData[0];
  const catBreed = getBreedById(id);
  return `
    <div class="cat-info-container">
      <div class="cat-text">
        <h2>${catBreed.name}</h2>
        <p>${catBreed.description}</p>
        <p><h3>Temperament:</h3> ${catBreed.temperament}</p>
      </div>
      <div class="cat-image">
        <img src="${cat.url}" alt="${catBreed.name}">
      </div>
    </div>
  `;
}


export {fetchBreeds};
export {fetchCatByBreed};