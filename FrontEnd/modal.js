











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


modalOpenButtonProject.addEventListener('click', () => {
    fetch('http://localhost:5678/api/works')
      .then((response) => response.json())
      .then((data) => {
        //console.log('Fetched data:', data);
        const modalGalleryGrid = document.querySelector('.modal__gallery__grid');
        // On boucle sur les éléments de la galerie pour les ajouter à la grille
        for (const item of data) {
          const img = document.createElement('img');
          img.src = item.imageUrl;
          img.alt = item.title;
          img.dataset.id = item.id;
          img.dataset.title = item.title;
          img.classList.add('modal__gallery__item');
          modalGalleryGrid.appendChild(img);
        }
  
        // On affiche la modale
        //console.log('Showing modal');
        modal.style.display = 'flex';
      })
      .catch((error) => console.error(error));
  });
  
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------
  
  modalContentCloseButton.addEventListener('click', function () {
    //console.log('Closing modal and redirecting to index.html');
    modal.style.display = 'none';
    window.location.href = 'index.html';
  });
  
  // Ferme la modale lorsqu'on clique sur le bouton de fermeture
  modalCloseButton.addEventListener('click', () => {
    //console.log('Closing modal and redirecting to index.html');
    modal.style.display = 'none';
    window.location.href = 'index.html';
  });
  
  // Ferme la modale lorsqu'on clique en dehors de celle-ci
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      //console.log('Closing modal');
      modal.style.display = 'none';
    }
  });
  
  // Fonction pour afficher la modale
  function showModal() {
    //console.log('Showing modal form');
    modalContent.style.display = 'none';
    modalContentForm.style.display = 'flex';
  }
  
  // Fonction pour fermer la modale
  function hideModal() {
    //console.log('Closing modal form');
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

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Supprime la galerie lorsqu'on clique sur le bouton correspondant
modalDeleteGalleryButton.addEventListener('click', () => {
    const authentificationToken = sessionStorage.getItem('authentificationToken');
  
    fetch('http://localhost:5678/api/works', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authentificationToken}`,
            'accept': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((galleries) => {
            galleries.forEach((gallery) => {
                fetch(`http://localhost:5678/api/works/${gallery.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authentificationToken}`,
                        'accept': '/',
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log('Galerie supprimée avec succès');
                            // Recharge le contenu de la modale seulement
                            const modalContent = document.querySelector('.modal__content');
                            fetch('votre url de récupération de données', {
                                headers: {
                                    'Authorization': `Bearer ${authentificationToken}`,
                                    'accept': 'application/json',
                                },
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    modalContent.innerHTML = ''; // vide le contenu précédent
                                    // ajoute le contenu récupéré
                                    data.forEach((gallery) => {
                                        modalContent.innerHTML += `<div>${gallery.title}</div>`;
                                    });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            throw new Error(
                                'Une erreur est survenue lors de la suppression de la galerie.'
                            );
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        })
        .catch((error) => {
            console.error(error);
        });
  });

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------



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
const modalGalleryGrid = document.querySelector('.modal__gallery__grid');
const galleryElementModale = document.createElement("figure");	
const imageElementModale = document.createElement("img");	

		const enlargeImageButtonElementModale = document.createElement("button");
		enlargeImageButtonElementModale.className = "enlarge-image-button-modale";
		const enlargeImageIconeElementModale = document.createElement("i");
		enlargeImageIconeElementModale.className = "fa-solid fa-arrows-up-down-left-right";
		const trashButtonElementModale = document.createElement("button");
		trashButtonElementModale.className = "trash-button-modale";
		const trashIconeElementModale = document.createElement("i");
		trashIconeElementModale.className = "fa-solid fa-trash-can";
		// Ajout des écouteurs sur les "butons corbeilles" de la "Gallerie" de la "Modale" pour pouvoir supprimer des "Projets".
	
	
		const buttonGalleryElementModale = document.createElement("button");
		buttonGalleryElementModale.className = "edit-button-modale";
		buttonGalleryElementModale.innerText = "éditer";
		// Rattachement de la balise BUTTON à la section "modalGalleryGrid".
		modalGalleryGrid.appendChild(galleryElementModale);
		// Rattachement des balises IMG et FIGCAPTION à "galleryElement" (la balise FIGURE).
		galleryElementModale.appendChild(imageElementModale);
		galleryElementModale.appendChild(enlargeImageButtonElementModale);
		enlargeImageButtonElementModale.appendChild(enlargeImageIconeElementModale);
		galleryElementModale.appendChild(trashButtonElementModale);
		trashButtonElementModale.appendChild(trashIconeElementModale);
		galleryElementModale.appendChild(buttonGalleryElementModale);

