async function getPhotographers() {
    // Récupération des pièces depuis le fichier JSON
    let model = new Model()
    let listPhotographes = await model.getListPhotographers()

    displayListPhotographe(listPhotographes)

    //let photograph930 = await model.getPhotographerById(930)
   

}


function displayListPhotographe(listPhotographes) {
    // Affichage des photographes  
    for (let i = 0; i < listPhotographes.length; i++) {
        const cardParents = document.querySelector(".photographer_section")
        const photographerId = listPhotographes[i].id
        const photographerName = listPhotographes[i].name
        const photographerCity = listPhotographes[i].city
        const photographerCountry = listPhotographes[i].country
        const photographerPortrait = listPhotographes[i].portrait
        const photographerPrice = listPhotographes[i].price
        const photographerTagline = listPhotographes[i].tagline
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
    }
    
}

getPhotographers()
