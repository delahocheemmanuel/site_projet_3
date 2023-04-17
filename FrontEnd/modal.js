//-----------------------------------------------------
//------------------EDITMODE---------------------------
//-----------------------------------------------------

// Récupérer tous les éléments avec la classe "edit__mode"
const editModeElements = document.querySelectorAll('.edit__mode');
//console.log('editModeElements:', editModeElements);

// affichage ou non du lien id login
const loginElement = document.querySelector('#login');
//console.log('loginElement:', loginElement);

const authentificationState = sessionStorage.getItem('authentificationState');
//console.log('authentificationState:', authentificationState);

if (authentificationState === 'true') {
console.log('Session ouverte');
// Pour chaque élément, changer le style pour passer de "display: none" à "display: flex"
editModeElements.forEach((element) => {
element.style.display = 'flex';
loginElement.style.display = 'none';
});
} else {
console.log('Session fermée');
// Pour chaque élément, changer le style pour passer de "display: flex" à "display: none"
editModeElements.forEach((element) => {
element.style.display = 'none';
});
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------











// Récupération des éléments HTML
const modal = document.querySelector('.modal');
//console.log('modal:', modal);

const modalContent = document.querySelector('.modal__content');
//console.log('modalContent:', modalContent);

const modalCloseButton = document.querySelector('.modal__close__button');
//console.log('modalCloseButton:', modalCloseButton);

const modalAddGalleryButton = document.querySelector('.modal__add__gallery__button');
//console.log('modalAddGalleryButton:', modalAddGalleryButton);

const modalDeleteGalleryButton = document.querySelector('.modal__delete__gallery__button');
//console.log('modalDeleteGalleryButton:', modalDeleteGalleryButton);

const modalContentForm = document.querySelector('.modal__content__form');
//console.log('modalContentForm:', modalContentForm);

const modalContentReturnButton = document.querySelector('.modal__content__return__button');
//console.log('modalContentReturnButton:', modalContentReturnButton);

const modalContentCloseButton = document.querySelector('.modal__content__close__button');
//console.log('modalContentCloseButton:', modalContentCloseButton);

const modalForm = document.querySelector('.modal__form');
//console.log('modalForm:', modalForm);

const projectCategory = document.querySelector('.project__category');
//console.log('projectCategory:', projectCategory);

const modalOpenButtonProject = document.getElementById('p__modif');
//console.log('modalOpenButtonProject:', modalOpenButtonProject);

const option = document.createElement('option');
//console.log('option:', option);

const formData = new FormData();
//console.log('formData:', formData);
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
