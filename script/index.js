/* eslint-disable import/extensions */
import Model from './Model.js';

function setPhotographer(id) {
  localStorage.setItem('photographerToDisplay', id);
}

function displayListPhotographe(list) {
// Affichage des photographes;
  for (let i = 0; i < list.length; i += 1) {
    const cardParents = document.querySelector('.photographer_section');
    const photographerId = list[i].id;
    const photographerName = list[i].name;
    const photographerCity = list[i].city;
    const photographerCountry = list[i].country;
    const photographerPortrait = list[i].portrait;
    const photographerPrice = list[i].price;
    const photographerTagline = list[i].tagline;
    /* const tabindex = i; */

    cardParents.innerHTML += `
            <a href="photographer.html?id=${photographerId}" class="photographer-link" tabindex="0">
            <article class="card">
              <img src="../assets/photographers/Photographers ID Photos/${photographerPortrait}" alt="${photographerName} portrait">
              <div tabindex="0">
                <h2>${photographerName}</h2>
                <p class="location">${photographerCity}, ${photographerCountry}</p>
                <p class="tagline">${photographerTagline}</p>
                <p class="price">${photographerPrice}€/jour</p>
              </div>
            </article>
            </a>
            `;
    cardParents.querySelector('.photographer-link').addEventListener('click', () => {
      setPhotographer(photographerId);
    });
  }
}

async function getPhotographers() {
  // Récupération des pièces depuis le fichier JSON
  const model = new Model();
  const listPhotographes = await model.getListPhotographers();
  displayListPhotographe(listPhotographes);
}
getPhotographers();
