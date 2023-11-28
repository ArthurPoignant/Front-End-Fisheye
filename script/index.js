async function getPhotographers() {
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch("data/photographers.json")
    const pieces = await reponse.json()

    // Affichage des photographes  
    for (let i = 0; i < pieces.photographers.length; i++) {
        const cardParents = document.querySelector(".photographer_section")
        const photographerId = pieces.photographers[i].id
        const photographerName = pieces.photographers[i].name
        const photographerCity = pieces.photographers[i].city
        const photographerCountry = pieces.photographers[i].country
        const photographerPortrait = pieces.photographers[i].portrait
        const photographerPrice = pieces.photographers[i].price
        const photographerTagline = pieces.photographers[i].tagline
        const photographer = JSON.stringify(photographerId)
        const a = document.querySelector("a")

        cardParents.innerHTML += `
            <a href="photographer.html" onclick="displayPhotographerPage(${photographerId})">
            <article class="card">
              <img src="../assets/photographers/Photographers ID Photos/${photographerPortrait}">
              <h2>${photographerName}</h2>
              <p class="location">${photographerCity},${photographerCountry}</p>
              <p class="tagline">${photographerTagline}</p>
              <p class="price">${photographerPrice}€/jour</p>
            </article>
            </a>
            `
        
        /*a.addEventListener("click", () =>

            // Stockage des informations dans le localStorage
            window.localStorage.setItem("photographe", photographer))*/
    }
}



getPhotographers()
