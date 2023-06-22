// import './css/styles.css';

import { fetchBreeds } from './cat-api.js';
import { showBreedImage } from './cat-api.js';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select'
// import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const loadingError = document.querySelector('.error');

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  loadingError: document.querySelector('.error'),
};

refs.breedSelect.fetchBreeds;
// refs.breedSelect.addEventListener("click", selectBreed);

// function fillSelect() {
//     return refs.breedSelect.innerHTML = fetchBreeds;
//   };

function fillSelect() {
  return (refs.showBreedImage.innerHTML = fetchBreeds);
}

console.log(fillSelect);

// const refs = {
//   form: document.getElementById("form"),
//   newsWrapper: document.getElementById("newsWrapper"),
// };

// refs.form.addEventListener("submit", onSubmit);

// function onSubmit(event) {
//   event.preventDefault();
//   const form = event.currentTarget;
//   const value = form.elements.news.value.trim();

//   if (value === "") alert("No value!");
//   else
//     API.getNews(value)
//       .then(({ articles }) => {
//         if (articles.length === 0) throw new Error("No data");

//         return articles.reduce(
//           (markup, article) => markup + createMarkup(article),
//           ""
//         );
//       })
//       .then(updateNewsList)
//       //   .then(data => console.log(data))
//       .catch(onError)
//       .finally(() => form.reset());
//   //   .catch((err) => onError(err));
// }

//================================================================

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya';
let storedBreeds = [];

fetch(url, {
  headers: {
    'x-api-key': api_key,
  },
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    //filter to only include those with an `image` object
    data = data.filter(img => img.image?.url != null);

    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      //skip any breeds that don't have an image
      if (!breed.image) continue;

      //use the current array index
      option.value = i;
      option.innerHTML = `${breed.name}`;
      // document.querySelector('.breed-select').appendChild(option);
      refs.breedSelect.appendChild(option);
    }
    //show the first breed by default
    showBreedImage(0);
  })
  .catch(function (error) {
    console.log(error);
  });

function showBreedImage(index) {
  document.getElementById('breed_image').src = storedBreeds[index].image.url;
  refs.catInfo.src = storedBreeds[index].image.url;

  document.getElementById('breed_json').textContent =
    storedBreeds[index].temperament;
  refs.catInfo.textContent =
    storedBreeds[index].temperament;

  document.getElementById('wiki_link').href = storedBreeds[index].wikipedia_url;
  document.getElementById('wiki_link').innerHTML =
    storedBreeds[index].wikipedia_url;

    refs.catInfo.href = storedBreeds[index].wikipedia_url;
    refs.catInfo.innerHTML =
    storedBreeds[index].wikipedia_url;
}

//===================================================================


