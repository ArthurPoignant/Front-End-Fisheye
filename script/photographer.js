async function getMedia() {
  const model = new Model();

  const photographer = await model.getPhotographerById(localStorage.getItem('photographerToDisplay'));
  const listMedias = await model.getListMedias();

  displayHeader(photographer);
  const listDefault = listMedias.filter((media) => media.photographerId === photographer.id);
  displayThumbnail(listDefault, photographer);
  sortThumbnail(listDefault, photographer);
  infoDisplay(photographer.price);
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
    <h2 class="name">${photographerName}</h2>
    <p class="location">${photographerCity}, ${photographerCountry}</p>
    <p class="tagline">${photographerTagline}</p>
  </div>
  <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img class="portrait" alt="${photographerName} portrait" src="../assets/photographers/Photographers ID Photos/${photographerPortrait}">
  `;
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

function displayThumbnail(listDefault, photographer) {
  for (let i = 0; i < listDefault.length; i += 1) {
    const thumbnailcontainer = document.querySelector('.thumbnail-container');
    const mediaTitle = listDefault[i].title;
    const mediaLikes = listDefault[i].likes;
    const photographerNameArray = photographer.name.split(' ');
    const photographerName = photographerNameArray[0].split('-').join(' ');
    const tabindex = i;

    const article = document.createElement('article');
    article.tabIndex = tabindex;
    article.classList.add('thumbnail');

    const mediaElement = mediaFactory(listDefault[i], photographerName);
    mediaElement.addEventListener('click', () => displayLightbox(listDefault, tabindex, photographerName));
    article.append(mediaElement);

    const containerDetail = document.createElement('div');
    containerDetail.classList.add('thumbnail-text');

    const paragrapheTitle = document.createElement('h3');
    paragrapheTitle.textContent = mediaTitle;

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('thumbnail-likes');
    likeContainer.addEventListener('click', (e) => {
      e.target.parentElement.querySelector('p').textContent = mediaLikes + 1;
      infoDisplay(photographer.price);
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

    thumbnailcontainer.append(article);
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

  // sort dates by latest to oldest
  const btnDate = document.querySelector('.date-filter');
  btnDate.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.thumbnail-container').innerHTML = '';
    const newListMedias = listMedias.sort((a, b) => b.date.localeCompare(a.date));
    displayThumbnail(newListMedias, photographer);
  });

  // sort title by alphabetical order
  const btnAlpha = document.querySelector('.alphabetical-filter');
  btnAlpha.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.thumbnail-container').innerHTML = '';
    const newListMedias = listMedias.sort((a, b) => a.title.localeCompare(b.title));
    displayThumbnail(newListMedias, photographer);
  });
}

function infoDisplay(price) {
  const likeData = document.querySelectorAll('.thumbnail-likes p');
  let likeTotal = 0;

  for (let i = 0; i < likeData.length; i += 1) {
    likeTotal += parseInt(likeData[i].textContent, 10);
  }

  const likeDisplayer = document.getElementsByClassName('displayLikes');

  if (likeDisplayer.length === 0) {
    const likeDisplayerDiv = document.createElement('div');
    document.querySelector('main').appendChild(likeDisplayerDiv);
    likeDisplayerDiv.classList.add('displayLikes');
    likeDisplayerDiv.innerHTML = `
  <p class='displayLikes_likes'>
  ${likeTotal}
  <i class="fa-solid fa-heart displayLikes_icon"></i>
  </p>
  <p>${price}€/jour</p>
  `;
  } else {
    const total = document.querySelector('.displayLikes_likes');
    total.innerHTML = `
    <p class='displayLikes_likes'>
    ${likeTotal}
    <i class="fa-solid fa-heart displayLikes_icon"></i>
    </p>
    `;
  }
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

function displayLightbox(list, listID, photographerName) {
  let i = listID;
  let source = checkMedia(list[i], photographerName);

  let titre = list[i].title;
  const leftArrow = document.getElementById('arrow-left');
  leftArrow.addEventListener('click', () => {
    i = prevMedia(i, list);
    source = checkMedia(list[i], photographerName);
    titre = list[i].title;
    lightboxData(source, titre);
  });

  const rightArrow = document.getElementById('arrow-right');
  rightArrow.addEventListener('click', () => {
    i = nextMedia(i, list);
    source = checkMedia(list[i], photographerName);
    titre = list[i].title;
    lightboxData(source, titre);
  });

  document.onkeydown = (e) => {
    if (e.keyCode === 37) {
      i = prevMedia(i, list);
      source = checkMedia(list[i], photographerName);
      titre = list[i].title;
      lightboxData(source, titre);
    } else if (e.keyCode === 39) {
      i = nextMedia(i, list);
      source = checkMedia(list[i], photographerName);
      titre = list[i].title;
      lightboxData(source, titre);
    }
  };

  document.getElementById('lightbox').style.display = 'flex';
  lightboxData(source, titre);
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function lightboxData(source, titre) {
  const lightboxImg = document.getElementById('lightbox_img');
  const lightboxTitle = document.getElementById('lightbox_mediaTitle');
  const image = document.getElementById('imageToDisplay');
  const title = document.getElementById('titleToDisplay');
  const video = document.getElementById('videoToDisplay');

  if (source.includes('mp4') === true) {
    if (image !== null) {
      image.remove();
    }
    if (video == null) {
      const videoToAppend = document.createElement('video');
      videoToAppend.id = 'videoToDisplay';
      videoToAppend.src = source;
      videoToAppend.autoplay = true;
      lightboxImg.append(videoToAppend);
    } else {
      video.src = source;
    }
  }

  if (source.includes('jpg') === true) {
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

function displayModal() {
  document.getElementById('contact_modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('contact_modal').style.display = 'none';
}

//  prevent form from refreshing the page
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
});

function getModalData() {
  const firstnameData = document.getElementById('firstname').value;
  const lastnameData = document.getElementById('lastname').value;
  const emailData = document.getElementById('email').value;
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
  console.log(`Prenom: ${firstnameData}, Nom: ${lastnameData}, Email: ${emailData}, Message: ${messageData}`);

  // Close modal after test completed
  if (validateForm === 4) {
    document.getElementById('contact_modal').style.display = 'none';
  }
}

getMedia();
