async function getMedia() {
  let model = new Model()
  let listMedias = await model.getListMedias()
  let photographer = await model.getPhotographerById(243)
  displayHeader(photographer)

  displayThumbnail(listMedias, photographer)
}
getMedia()

function displayHeader(photographer) {
  console.log(photographer.name)
  const header = document.querySelector(".photograph-header")
  const photographerName = photographer.name
  const photographerCity = photographer.city
  const photographerCountry = photographer.country
  const photographerPortrait = photographer.portrait
  const photographerTagline = photographer.tagline

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


function displayThumbnail(listMedias, photographer) {
  for (let i = 0; i < listMedias.length; i++) {
    const thumbnailcontainer = document.querySelector(".thumbnail-container")
    const mediaImage = listMedias[i].image
    const mediaTitle = listMedias[i].title
    const mediaLikes = listMedias[i].likes
    const mediaPhotographerId = listMedias[i].photographerId
    const photographerId = photographer.id
    const photographerNameArray = photographer.name.split(" ")
    const photographerName = photographerNameArray[0]

    if (mediaPhotographerId == photographerId) {
      thumbnailcontainer.innerHTML += `
          <div class="thumbnail">
          <img src="../assets/photographers/${photographerName}/${mediaImage}" />
          <div class="thumbnail-text"
          <p>${mediaTitle}</p>
          <p class="thumbnail-likes">${mediaLikes}
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
          <g clip-path="url(#clip0_120_550)">
            <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#911C1C"/>
          </g>
          <defs>
            <clipPath id="clip0_120_550">
              <rect width="21" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg></p>
          </div>
          </div>
          `
      console.log(photographerName, mediaImage)
    }
    console.log(photographerNameArray)


  }
}
