const photographer = window.localStorage.getItem("photographe")


async function getMedia() {
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch("data/photographers.json")
    const pieces = await reponse.json()

    function displayHeader() {
            const header = document.querySelector(".photograph-header")
            const photographerName = pieces.photographers[0].name
            const photographerCity = pieces.photographers[0].city
            const photographerCountry = pieces.photographers[0].country
            const photographerPortrait = pieces.photographers[0].portrait
            const photographerTagline = pieces.photographers[0].tagline

            header.innerHTML += `
            <div class="text">
              <h2 class="name">${photographerName}</h2>
              <p class="location">${photographerCity},${photographerCountry}</p>
              <p class="tagline">${photographerTagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
              <img class="portrait" src="../assets/photographers/Photographers ID Photos/${photographerPortrait}">
            `

    }

    displayHeader()

    function displayThumbnail() {
        for (let i = 0; i < pieces.media.length; i++) {
            const thumbnailcontainer = document.querySelector(".thumbnail-container")
            const mediaImage = pieces.media[i].image
            const mediaTitle = pieces.media[i].title
            const mediaLikes = pieces.media[i].likes
            const mediaId = pieces.media[i].id
            const mediaPhotographerId = pieces.media[i].photographerId
            const photographerId = pieces.photographers[0].id
            const photographerNameArray = pieces.photographers[0].name.split(" ")
            const photographerName = photographerNameArray[0]

            if (mediaPhotographerId == photographerId)
            {
                thumbnailcontainer.innerHTML += `
                <div class="thumbnail">
                <img src="../assets/photographers/${photographerName}/${mediaImage}" />
                <div class="thumbnail-text"
                <p>${mediaTitle}</p>
                <p>${mediaLikes}</p>
                </div>
                </div>
                `
                console.log(photographerName, mediaImage)
            }
            console.log(photographerNameArray)
            

        }
    }
    displayThumbnail()
}
getMedia() 