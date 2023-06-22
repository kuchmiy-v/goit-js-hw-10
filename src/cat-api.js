const URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = "live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya";
const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = "live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya";
// const URL = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_gpMvPixYUL1PutLewUE7cHqz3bnPEgj87ihY0zIpW7mVjm5J72kPVqAWFdpNcjya';

// function fetchBreeds(breed) {
//     return fetch(`${URL}?apiKey=${API_KEY}
//   `).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// };

// function fetchCatByBreed(breedId) {

// };

// export default {fetchBreeds};
// export {fetchCatByBreed}

//=============================================================

let storedBreeds = []

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
   
   //filter to only include those with an `image` object
   data = data.filter(img=> img.image?.url!=null)
   
  storedBreeds = data;
   
   for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     //skip any breeds that don't have an image
     if(!breed.image)continue
     
    //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
document.getElementById('breed_selector').appendChild(option);
    
    }
   //show the first breed by default
   showBreedImage(0)
})
.catch(function(error) {
   console.log(error);
});

function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
  document.getElementById("breed_json").textContent= storedBreeds[index].temperament
  
  
  document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url
  document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url
};


export {showBreedImage}