// Récupération des éléments HTML
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalCloseButton = document.querySelector('.modal__close__button');
const modalAddGalleryButton = document.querySelector('.modal__add__gallery__button');
const modalDeleteGalleryButton = document.querySelector('.modal__delete__gallery__button');
const modalContentForm = document.querySelector('.modal__content__form');
const modalContentReturnButton = document.querySelector('.modal__content__return__button');
const modalContentCloseButton = document.querySelector('.modal__content__close__button');
const modalForm = document.querySelector('.modal__form');
const projectCategory = document.querySelector('.project__category');
const modalOpenButtonProject = document.getElementById('p__modif');
const option = document.createElement('option');
const formData = new FormData();

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

modalOpenButtonProject.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    const modalGalleryGrid = document.querySelector('.modal__gallery__grid');
    modalGalleryGrid.innerHTML = '';

    // On boucle sur les éléments de la galerie pour les ajouter à la grille
    for (const item of data) {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('modal__gallery__item__container');
      imgContainer.dataset.id = item.id;
      console.log(item.id);

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;
      img.classList.add('modal__gallery__item');
      imgContainer.appendChild(img);

      const imgActions = document.createElement('div');
      imgActions.classList.add('modal__gallery__item__actions');

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteButton.classList.add('modal__gallery__item__delete');
      deleteButton.setAttribute("data-image-id", item.id);

      deleteButton.addEventListener('click', async (event) => {
        console.log('Clic sur le bouton supprimer');
        const authentificationToken = sessionStorage.getItem('authentificationToken');
        const imageId = event.target.dataset.imageId;
        try {
          await deleteImage(imageId, authentificationToken);
          console.log('Image supprimée avec succès');
          // Supprime l'image du DOM
          event.target.closest('.modal__gallery__item__container').remove();
        } catch (error) {
          console.error(error);
        }
      });

      imgActions.appendChild(deleteButton);


      const editButton = document.createElement('p');
      editButton.innerText = 'éditer';
      editButton.classList.add('modal__gallery__item__edit');
      imgActions.appendChild(editButton);

      imgContainer.appendChild(imgActions);

      modalGalleryGrid.appendChild(imgContainer);
    }

    // On affiche la modale
    modal.style.display = 'flex';
  } catch (error) {
    console.error(error);
  }
});


// Fonction pour supprimer une image
async function deleteImage(imageId, authentificationToken) {
  
  if (!imageId) {
    throw new Error('L\'identifiant de l\'image n\'est pas défini.');
  }

  const response = await fetch(`http://localhost:5678/api/works/${imageId}`,  {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authentificationToken}`,
      'accept': '/',
    },
    
  });
  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la suppression de l\'image.');
  }
}











//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

modalContentCloseButton.addEventListener('click', function () {
  modal.style.display = 'none';
  window.location.href = 'index.html';
});

// Ferme la modale lorsqu'on clique sur le bouton de fermeture
modalCloseButton.addEventListener('click', () => {
  modal.style.display = 'none';
  window.location.href = 'index.html';
});

// Ferme la modale lorsqu'on clique en dehors de celle-ci
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Fonction pour afficher la modale
function showModal() {
  modalContent.style.display = 'none';
  modalContentForm.style.display = 'flex';
}

// Fonction pour fermer la modale
function hideModal() {
  modalContentForm.style.display = 'none';
  modalContent.style.display = 'flex';
}

// Ferme la modale lorsqu'on clique sur le bouton de fermeture

  modalCloseButton.addEventListener('click', hideModal);
  
  // Ouvre la section formulaire lorsque l'utilisateur clique sur le bouton "Ajouter une photo"
  modalAddGalleryButton.addEventListener('click', () => {
    //console.log('Opening modal form');
    modalContent.style.display = 'none';
    modalContentForm.style.display = 'flex';
  });
  
  // Retourne à la section galerie lorsque l'utilisateur clique sur le bouton "Retour"
  modalContentReturnButton.addEventListener('click', () => {
    //console.log('Returning to modal gallery');
    modalContent.style.display = 'flex';
    modalContentForm.style.display = 'none';
  });
  
  // Ferme la modale lorsqu'on clique sur le bouton de fermeture dans la section formulaire
  modalContentCloseButton.addEventListener('click', hideModal);
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

// Fonction pour supprimer une galerie
async function deleteGallery(galleryId, authentificationToken) {
  const response = await fetch(`http://localhost:5678/api/works/${galleryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authentificationToken}`,
      'accept': '/',
    },
  });
  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la suppression de la galerie.');
  }
}

// Fonction pour récupérer les données et mettre à jour la modale
async function updateModalContent(authentificationToken, modalContent) {
  const response = await fetch('votre url de récupération de données', {
    headers: {
      'Authorization': `Bearer ${authentificationToken}`,
      'accept': 'application/json',
    },
  });
  const data = await response.json();
  modalContent.innerHTML = ''; // vide le contenu précédent
  // ajoute le contenu récupéré
  data.forEach((gallery) => {
    modalContent.innerHTML += `<div>${gallery.title}</div>`;
  });
}

// Supprime la galerie lorsqu'on clique sur le bouton correspondant
modalDeleteGalleryButton.addEventListener('click', async () => {
  const authentificationToken = sessionStorage.getItem('authentificationToken');
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authentificationToken}`,
        'accept': 'application/json',
      },
    });
    const galleries = await response.json();
    for (const gallery of galleries) {
      await deleteGallery(gallery.id, authentificationToken);
    }
    console.log('Galeries supprimées avec succès');
    // Recharge le contenu de la modale seulement
    const modalContent = document.querySelector('.modal__content');
    await updateModalContent(authentificationToken, modalContent);
  } catch (error) {
    console.error(error);
  }
});



// Récupère les catégories depuis le serveur
fetch('http://localhost:5678/api/categories')
.then((response) => {
//console.log('Fetch response :', response);
return response.json();
})
.then((categories) => {
//console.log('Categories :', categories);
categories.forEach((category) => {
const option = document.createElement('option');
option.value = category.id;
option.textContent = category.name;
document.getElementById('project__category').appendChild(option);
});
})
.catch((error) => {
console.error(error);
});


const modalFormForm = document.querySelector('.modal__form form');
const photoInput = document.querySelector('#project__photo__add__input');
const titleInput = document.querySelector('#project__title');
const categoryInput = document.querySelector('#project__category');
const categoryURL = 'http://localhost:5678/api/categories';
const worksURL = 'http://localhost:5678/api/works';
const loginURL = 'http://localhost:5678/api/users/login';



// Envoyer le formulaire
modalFormForm.addEventListener('submit', event => {
  event.preventDefault();
  const authentificationToken = sessionStorage.getItem('authentificationToken');

  // Créer une instance FormData pour envoyer les données du formulaire
  const formData = new FormData(modalFormForm);

  // Ajouter le fichier sélectionné pour la photo
  formData.append('image', photoInput.files[0]);

  // Envoyer les données avec une requête POST à l'API
  fetch(worksURL, {
    method: 'POST',
    body: formData,
    headers: {
        'Authorization': `Bearer ${authentificationToken}`,
        'accept': '/',
    },
  })
  .then(response => {
    // Afficher un message de succès ou d'erreur
    if (response.ok) {
      alert('Le projet a été ajouté avec succès!');
      modalFormForm.reset();
    } else {
      throw new Error('Une erreur est survenue.');
    }
  })
  .catch(error => {
    alert(error.message);
  });
});

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------- 
//ajout de la fonction checkFile() pour limiter la taille du fichier à 4Mo
function checkFile() {
  const fileInput = document.getElementById('project__photo__add__input');
  const fileSize = fileInput.files[0].size;
  const maxSize = 4 * 1024 * 1024; // 4 Mo
  const errorMessage = document.getElementById('error');
  const previewImage = document.querySelector('.preview__image');
  const addPhotoIcon = document.querySelector('.project__photo__add__icon');
  const addPhotoDesc = document.querySelector('.project__photo__add__desc');
  const addPhotoButton = document.querySelector('#button__add__photo');

  if (fileSize > maxSize) {
    errorMessage.innerHTML = 'Le fichier est trop volumineux';
    fileInput.value = ''; // effacer la sélection de fichier
  } else {
    const reader = new FileReader();
    reader.onload = function(event) {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
    errorMessage.innerHTML = '';
    addPhotoIcon.style.display = 'none'; // masquer l'icône de la caméra
    previewImage.style.display = 'block'; // afficher l'image de prévisualisation
    addPhotoDesc.style.display = 'none'; // masquer la description
    addPhotoButton.style.display = 'none'; // masquer le bouton d'ajout de photo
  }
}


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

// Définir la grille de la galerie
const modalGalleryGrid = document.querySelector('.modal__gallery__grid');

