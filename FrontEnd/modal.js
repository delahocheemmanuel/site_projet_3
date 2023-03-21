//-----------------------------------------------------
//------------------EDITMODE---------------------------
//-----------------------------------------------------

// Récupérer tous les éléments avec la classe "edit__mode"

const editModeElements = document.querySelectorAll('.edit__mode');

// affichage ou non du lien id login

const loginElement = document.querySelector('#login');

const authentificationState = sessionStorage.getItem('authentificationState');

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
/*fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const modalGalleryGrid = document.querySelector('.modal__gallery__grid');
    for (const item of data) {
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;
      img.dataset.id = item.id;
      img.dataset.title = item.title;
      img.classList.add('modal__gallery__item');
      modalGalleryGrid.appendChild(img);
    }
  })
  .catch(error => {
    console.error(error);
  });
*/


modalOpenButtonProject.addEventListener('click', () => {
    fetch('http://localhost:5678/api/works')
        .then((response) => response.json())
        .then((data) => {
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
            modal.style.display = 'flex';
        })
        .catch((error) => console.error(error));
});

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
    modalContent.style.display = 'none';
    modalContentForm.style.display = 'flex';
});

// Retourne à la section galerie lorsque l'utilisateur clique sur le bouton "Retour"
modalContentReturnButton.addEventListener('click', () => {
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
// Récupère les catégories depuis le serveur
fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
        // Ajoute chaque catégorie comme option dans le menu déroulant
        categories.forEach((category) => {
            //const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            document.getElementById('project__category').appendChild(option);
        });
    })
    .catch((error) => {
        // Affiche le message d'erreur dans la console
        console.error(error);
    });

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Supprime la galerie lorsqu'on clique sur le bouton correspondant
/*
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
*/
// Récupération du Token d'authentification.
const authentificationToken = sessionStorage.getItem("authentificationToken");

// Fonction de "Suppresion" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
	// Suppression du projet via l'API en fonction de l'ID du Projet (work.id).
	const deleteResponse = await fetch("http://localhost:5678/api/works/" + workId, {
		method: "DELETE",
		headers: {
			"Authorization": "Bearer " + authentificationToken
		},
	});

	// Si réponse de suppression de l'API est OK, alors on supprime le projet du DOM (Gallerie et Modale).
	if (deleteResponse.ok) {
		const workToRemove = document.querySelectorAll(`figure[data-id="${workId}"]`);

		for(let i = 0; i < workToRemove.length; i++){
			workToRemove[i].remove();
		};
		// Suppression de l'élément du tableau "works" correspondant à l'ID du projet.
		const workIndexToRemove = works.findIndex(work => workId === work.id);
		works.splice(workIndexToRemove, 1);

	} else {
		return alert("Échec de la suppresion du projet");
	};
};

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------




// Préparation des données du nouveau projet et envoi sur l'API "http://localhost:5678/api/works".
// Fonction d'ajout de projet.
/*
async function addWork() {
    // Création de l'objet formData
    //const formData = new FormData();

    formData.append('image', projectPhotoAdd.files[0]);
    formData.append('title', projectTitle.value);
    formData.append('category', projectCategory.value);

    const addResponse = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + authentificationToken,
            accept: 'application/json',
        },
        body: formData,
    });

    // Si réponse de d'ajout de l'API est OK, alors on ajoute le projet au DOM (Gallerie et Modale).
    if (addResponse.ok) {
        // Mise à jour du tableau "WORKS" avec les nouvelles données.
        works.push(await addResponse.json());

        modalContentReturnButton.click();
        // Réinitialisation du DOM (Galleries accueil et Modale).
       

        const modalGalleryGrid = document.querySelector('.modal__gallery__grid');
        modalGalleryGrid.innerHTML = '';
        
        // Regénération des Galleries.
        generateGalleryModale(works);
        
    } else {
        return alert("Échec de la l'ajout du projet");
    }
}*/
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
