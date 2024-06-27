/* eslint-disable import/extensions */
import Model from './Model.js';

function getUrlParams() {
  const params = new URLSearchParams(document.location.search);
  const idParams = params.get('id');
  return idParams;
}

function displayHeader(photographer) {
  const header = document.querySelector('.photograph-header');
  const photographerName = photographer.name;
  const photographerCity = photographer.city;
  const photographerCountry = photographer.country;
  const photographerPortrait = photographer.portrait;
  const photographerTagline = photographer.tagline;
  header.innerHTML += `
  <div class="text">
    <h2 class="name" tabindex="0">${photographerName}</h2>
    <div tabindex="0">
    <p class="location">${photographerCity}, ${photographerCountry}</p>
    <p class="tagline">${photographerTagline}</p>
    </div>
  </div>
  <button class="contact_button" tabindex="0">Contactez-moi</button>
    <img class="portrait" alt="${photographerName} portrait" src="../assets/photographers/Photographers ID Photos/${photographerPortrait}" tabindex="0">
  `;
  document.querySelector('.contact_button').addEventListener('click', () => {
    displayModal();// eslint-disable-line
  });
}

function mediaFactory(media, photographerName) {
  let mediaElement;
  const mediaTitle = media.title;
  if (Object.hasOwn(media, 'image') === false) {
    const mediaVideo = media.video;
    mediaElement = document.createElement('video');
    mediaElement.src = `../assets/photographers/${photographerName}/${mediaVideo}`;
    mediaElement.alt = mediaTitle;
  } else {
    const mediaImage = media.image;
    mediaElement = document.createElement('img');
    mediaElement.src = `../assets/photographers/${photographerName}/${mediaImage}`;
    mediaElement.alt = mediaTitle;
  }
  return mediaElement;
}

function infoDisplay(price) {
  const likeData = document.querySelectorAll('.thumbnail-likes p');
  let likeTotal = 0;

  for (let i = 0; i < likeData.length; i += 1) {
    likeTotal += parseInt(likeData[i].textContent, 10);
  }

  const likeDisplayer = document.querySelector('.displayLikes');

  if (!likeDisplayer) {
    const likeDisplayerDiv = document.createElement('div');
    document.querySelector('.likeDisplayerDiv').appendChild(likeDisplayerDiv);
    likeDisplayerDiv.classList.add('displayLikes');
    likeDisplayerDiv.innerHTML = `
      <p class='displayLikes_likes'>
      ${likeTotal}
      <i class="fa-solid fa-heart displayLikes_icon"></i>
      </p>
      <p>${price}€/jour</p>
    `;
  } else {
    likeDisplayer.innerHTML = `
      <p class='displayLikes_likes'>
      ${likeTotal}
      <i class="fa-solid fa-heart displayLikes_icon"></i>
      </p>
      <p>${price}€/jour</p>
    `;
  }
}

function displayThumbnail(listDefault, photographer) {
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  thumbnailContainer.innerHTML = '';

  for (let i = 0; i < listDefault.length; i += 1) {
    const mediaTitle = listDefault[i].title;
    const mediaLikes = listDefault[i].likes;
    const photographerNameArray = photographer.name.split(' ');
    const photographerName = photographerNameArray[0].split('-').join(' ');
    const tabindex = i;

    const article = document.createElement('article');
    article.classList.add('thumbnail');
    article.tabIndex = 0;

    const mediaElement = mediaFactory(listDefault[i], photographerName);
    mediaElement.addEventListener('click', () => displayLightbox(listDefault, tabindex, photographerName));// eslint-disable-line
    article.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') { displayLightbox(listDefault, tabindex, photographerName); }// eslint-disable-line
    });

    article.append(mediaElement);

    const containerDetail = document.createElement('div');
    containerDetail.classList.add('thumbnail-text');

    const paragrapheTitle = document.createElement('h3');
    paragrapheTitle.textContent = mediaTitle;
    paragrapheTitle.tabIndex = 0;

    const likeContainer = document.createElement('div');
    likeContainer.tabIndex = 0;
    likeContainer.classList.add('thumbnail-likes');
    likeContainer.addEventListener('click', (e) => {
      e.target.parentElement.querySelector('p').textContent = mediaLikes + 1;
      infoDisplay(photographer.price);
    });
    likeContainer.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        e.target.parentElement.querySelector('p').textContent = mediaLikes + 1;
        infoDisplay(photographer.price); }// eslint-disable-line
    });

    const likeNum = document.createElement('p');
    likeNum.textContent = mediaLikes;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-heart');

    likeContainer.appendChild(likeNum);
    likeContainer.appendChild(icon);

    containerDetail.appendChild(paragrapheTitle);
    containerDetail.appendChild(likeContainer);

    article.appendChild(containerDetail);

    thumbnailContainer.append(article);
  }
}

function sortThumbnail(listMedias, photographer) {
  // sort likes by highest to lowest amount
  const btnPopularity = document.querySelector('.popularity-filter');
  btnPopularity.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.thumbnail-container').innerHTML = '';
    const newListMedias = listMedias.sort((a, b) => b.likes - a.likes);
    displayThumbnail(newListMedias, photographer);
  });
  btnPopularity.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      document.querySelector('.thumbnail-container').innerHTML = '';
      const newListMedias = listMedias.sort((a, b) => b.likes - a.likes);
      displayThumbnail(newListMedias, photographer); }// eslint-disable-line
  });

  // sort dates by latest to oldest
  const btnDate = document.querySelector('.date-filter');
  btnDate.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.thumbnail-container').innerHTML = '';
    const newListMedias = listMedias.sort((a, b) => b.date.localeCompare(a.date));
    displayThumbnail(newListMedias, photographer);
  });
  btnDate.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      document.querySelector('.thumbnail-container').innerHTML = '';
      const newListMedias = listMedias.sort((a, b) => b.date.localeCompare(a.date));
      displayThumbnail(newListMedias, photographer);
    }
  });

  // sort title by alphabetical order
  const btnAlpha = document.querySelector('.alphabetical-filter');
  btnAlpha.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.thumbnail-container').innerHTML = '';
    const newListMedias = listMedias.sort((a, b) => a.title.localeCompare(b.title));
    displayThumbnail(newListMedias, photographer);
  });
  btnAlpha.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      document.querySelector('.thumbnail-container').innerHTML = '';
      const newListMedias = listMedias.sort((a, b) => a.title.localeCompare(b.title));
      displayThumbnail(newListMedias, photographer);
    }
  });
}

function prevMedia(i, list) {
  let newListIndex = i - 1;
  if (newListIndex < 0) {
    newListIndex = list.length - 1;
  }
  return newListIndex;
}

function nextMedia(i, list) {
  let newListIndex = i + 1;
  if (newListIndex > list.length - 1) {
    newListIndex = 0;
  }
  return newListIndex;
}

function checkMedia(media, photographerName) {
  let source;
  if (Object.hasOwn(media, 'video') === true) {
    source = `../assets/photographers/${photographerName}/${media.video}`;
  } else {
    source = `../assets/photographers/${photographerName}/${media.image}`;
  }
  return source;
}

function mediaFormatHandler(source, titre) {
  const lightboxImg = document.getElementById('lightbox_img');
  const lightboxTitle = document.getElementById('lightbox_mediaTitle');
  const image = document.getElementById('imageToDisplay');
  const title = document.getElementById('titleToDisplay');
  const video = document.getElementById('videoToDisplay');
  const sourceFormat = source.split('.').pop();

  if (sourceFormat === 'mp4') {
    if (image !== null) {
      image.remove();
    }
    if (video == null) {
      const videoToAppend = document.createElement('video');
      videoToAppend.id = 'videoToDisplay';
      videoToAppend.src = source;
      videoToAppend.autoplay = true;
      videoToAppend.controls = true;
      lightboxImg.append(videoToAppend);
    } else {
      video.src = source;
    }
  }

  if (sourceFormat === 'jpg') {
    if (video !== null) {
      video.remove();
    }
    if (image == null) {
      const imageToAppend = document.createElement('img');
      imageToAppend.id = 'imageToDisplay';
      imageToAppend.src = source;
      lightboxImg.append(imageToAppend);
    } else {
      image.src = source;
    }
  }

  if (title == null) {
    const titleToAppend = document.createElement('h2');
    titleToAppend.textContent = titre;
    titleToAppend.id = 'titleToDisplay';
    lightboxTitle.append(titleToAppend);
  } else {
    title.textContent = titre;
  }
}

function displayLightbox(list, listID, photographerName) {
  let i = listID;
  let source = checkMedia(list[i], photographerName);

  let titre = list[i].title;
  const leftArrow = document.getElementById('arrow-left');
  leftArrow.addEventListener('click', () => {
    i = prevMedia(i, list);
    source = checkMedia(list[i], photographerName);
    titre = list[i].title;
    mediaFormatHandler(source, titre);
  });

  const rightArrow = document.getElementById('arrow-right');
  rightArrow.addEventListener('click', () => {
    i = nextMedia(i, list);
    source = checkMedia(list[i], photographerName);
    titre = list[i].title;
    mediaFormatHandler(source, titre);
  });

  document.onkeydown = (e) => {
    if (e.code === 'ArrowLeft') {
      i = prevMedia(i, list);
      source = checkMedia(list[i], photographerName);
      titre = list[i].title;
      mediaFormatHandler(source, titre);
    } else if (e.code === 'ArrowRight') {
      i = nextMedia(i, list);
      source = checkMedia(list[i], photographerName);
      titre = list[i].title;
      mediaFormatHandler(source, titre);
    }
  };

  document.getElementById('lightbox').style.display = 'flex';
  mediaFormatHandler(source, titre);
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function displayModal() {
  document.getElementById('contact_modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('contact_modal').style.display = 'none';
}

function getModalData() {
  const firstnameData = document.getElementById('firstname').value;
  const lastnameData = document.getElementById('lastname').value;
  const emailData = document.getElementById('email').value;
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;// eslint-disable-line
  const messageData = document.getElementById('message').value;
  let validateForm = 0;

  //  Firstname test
  if (firstnameData === '' || firstnameData.length < 2) {
    document.getElementById('firstname').style.border = '2px solid red';

    if (document.querySelector('.firstname_container').querySelector('p') == null) {
      const errorMsg = document.createElement('p');
      errorMsg.id = 'error-msg';
      errorMsg.textContent = 'Ce champ doit contenir au moins 2 caractères';
      document.querySelector('.firstname_container').appendChild(errorMsg);
    }
  } else {
    document.getElementById('firstname').style.border = 'none';
    if (document.querySelector('.firstname_container').querySelector('p') !== null) {
      const errorMsg = document.querySelector('.firstname_container').querySelector('p');
      errorMsg.remove();
    }
    validateForm += 1;
  }

  //  Lastname test
  if (lastnameData === '' || lastnameData.length < 2) {
    document.getElementById('lastname').style.border = '2px solid red';

    if (document.querySelector('.lastname_container').querySelector('p') == null) {
      const errorMsg = document.createElement('p');
      errorMsg.id = 'error-msg';
      errorMsg.textContent = 'Ce champ doit contenir au moins 2 caractères';
      document.querySelector('.lastname_container').appendChild(errorMsg);
    }
  } else {
    document.getElementById('lastname').style.border = 'none';
    if (document.querySelector('.lastname_container').querySelector('p') !== null) {
      const errorMsg = document.querySelector('.lastname_container').querySelector('p');
      errorMsg.remove();
    }
    validateForm += 1;
  }

  // Email test
  if (emailRegEx.test(emailData) === false) {
    document.getElementById('email').style.border = '2px solid red';

    if (document.querySelector('.email_container').querySelector('p') == null) {
      const errorMsg = document.createElement('p');
      errorMsg.id = 'error-msg';
      errorMsg.textContent = 'Format incorrecte';
      document.querySelector('.email_container').appendChild(errorMsg);
    }
  } else {
    document.getElementById('email').style.border = 'none';
    if (document.querySelector('.email_container').querySelector('p') !== null) {
      const errorMsg = document.querySelector('.email_container').querySelector('p');
      errorMsg.remove();
    }
    validateForm += 1;
  }

  //  Message test
  if (messageData === '' || messageData.length < 2) {
    document.getElementById('message').style.border = '2px solid red';

    if (document.querySelector('.message_container').querySelector('p') == null) {
      const errorMsg = document.createElement('p');
      errorMsg.id = 'error-msg';
      errorMsg.textContent = 'Ce champ doit contenir au moins 2 caractères';
      document.querySelector('.message_container').appendChild(errorMsg);
    }
  } else {
    document.getElementById('message').style.border = 'none';
    if (document.querySelector('.message_container').querySelector('p') !== null) {
      const errorMsg = document.querySelector('.message_container').querySelector('p');
      errorMsg.remove();
    }
    validateForm += 1;
  }

  // Display form data in console
  console.log(`Prenom: ${firstnameData}, Nom: ${lastnameData}, Email: ${emailData}, Message: ${messageData}`);// eslint-disable-line

  // Close modal after test completed
  if (validateForm === 4) {
    document.getElementById('contact_modal').style.display = 'none';
  }
}

async function getMedia() {
  const model = new Model();

  const photographerId = getUrlParams();
  const photographer = await model.getPhotographerById(photographerId);
  const listMedias = await model.getListMedias();

  displayHeader(photographer);
  const listDefault = listMedias.filter((media) => media.photographerId === photographer.id);
  displayThumbnail(listDefault, photographer);
  sortThumbnail(listDefault, photographer);
  infoDisplay(photographer.price);
}

getMedia();

//  Event listeners
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
});

document.querySelector('form').addEventListener('submit', () => {
  getModalData();
});

document.querySelector('.modal img').addEventListener('click', () => {
  closeModal();
});

document.querySelector('.closeButton').addEventListener('click', () => {
  closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') { closeLightbox(); }// eslint-disable-line
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') { closeModal(); }// eslint-disable-line
});

document.addEventListener('focusin', () => {
  const focusedElement = document.activeElement;
  const additionalContent = document.querySelector('.filter_dropdown');

  if (focusedElement.classList == 'filter_listmenu') {// eslint-disable-line
    additionalContent.style.display = 'block';
  }
  if (focusedElement.classList == 'displayLikes') {// eslint-disable-line
    additionalContent.style.display = 'none';
  }
});
