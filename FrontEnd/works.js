// Création du form de filtre
const newForm = document.createElement('form');
newForm.setAttribute('action', '#');
newForm.setAttribute('method', 'get');
newForm.setAttribute('id', 'form__button');

let currentDiv = document.querySelector('#portfolio');
currentDiv.appendChild(newForm);

// Suppression de la gallery #portfolio
const galerie = document.querySelector('#portfolio .gallery');
galerie.remove();

// Création de la nouvelle gallery
const portfolioBox = document.querySelector('#portfolio');
newDiv = document.createElement('article');
portfolioBox.appendChild(newDiv);

// Application de la class gallery
const newGalerie = document.querySelector('#portfolio article');
newGalerie.classList.add('gallery');

// Fonction pour créer des boutons de catégories
function newBouton(btnName, categorieId, categorieOnClick) {
    let newBtn = document.createElement('input');
    newBtn.setAttribute('type', 'submit');
    newBtn.setAttribute('value', btnName);
    newBtn.setAttribute('class', 'removeAtEdit');
    newBtn.setAttribute('data-categorie-id', categorieId);

    newBtn.addEventListener('click', categorieOnClick);
    let currentForm = document.querySelector('#form__button');
    currentForm.appendChild(newBtn);

    // Gestion des événements pour changer la couleur des boutons au survol
    newBtn.addEventListener('mouseout', function (e) {
        if (!e.target.classList.contains('active')) {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#1D6154';
        }
    });
    newBtn.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains('active')) {
            e.target.style.backgroundColor = '#1D6154';
            e.target.style.color = 'white';
        }
    });
}

// Définir la couleur des boutons à l'initialisation

document
    .querySelectorAll('#form__button input[type="submit"]')
    .forEach(function (btn) {
        btn.style.backgroundColor = 'white';
        btn.style.color = '#1D6154';
    });

// Fonction pour définir le bouton actif
function setActiveButton(activeBtn) {
    let buttons = document.querySelectorAll(
        '#form__button input[type="submit"]'
    );
    buttons.forEach(function (btn) {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'white';
        btn.style.color = '#1D6154';
    });
    activeBtn.classList.add('active');
    activeBtn.style.backgroundColor = '#1D6154';
    activeBtn.style.color = 'white';
}

// Charger les boutons de catégories
async function loadCategories() {
    try {
        const res = await fetch('http://localhost:5678/api/categories');
        const value = await res.json();
        const entries = value.length;

        for (let n = 0; n < entries; n++) {
            let cateName = value[n].name;
            let categorieId = value[n].id;
            newBouton(cateName, categorieId, categorieOnClick);
        }
    } catch (err) {
        console.log(err);
    }
}

loadCategories();

// Bouton pour afficher toutes les catégories
newBouton('Tous', '', categorieOnClick);

// Fonction de filtrage de la galerie
function categorieOnClick(e) {
    e.preventDefault();
    let categorieDataId = e.target.getAttribute('data-categorie-id');

    loadGallery(categorieDataId);
    setActiveButton(e.target);
}

// Charger la galerie au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    loadGallery('');
});

window.addEventListener('load', function () {
    // Définir la couleur des boutons
    document
        .querySelectorAll('#form__button input[type="submit"]')
        .forEach(function (btn) {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1D6154';
        });
});


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// chargement de la gallerie
async function loadGallery(categorieId) {
    await fetch('http://localhost:5678/api/works')
        .then(function (res) {
            return res.json();
        })
        .then(function (value) {
            const entries = value.length;

            // clean  gallery
            newGalerie.innerHTML = '';
            for (let n = 0; n < entries; n++) {
                let imgId = value[n].id;
                let imgUrl = value[n].imageUrl;
                let imgName = value[n].title;
                let imgCatId = value[n].category.id;

                categorieId == imgCatId || !categorieId
                    ? newFigure(imgUrl, imgName, imgId)
                    : '';
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

/**
 * creation portfolio
 * @param {URL} imgUrl
 * @param {string} imgTitle
 * @param {number} imgId
 */

function newFigure(imgUrl, imgTitle, imgId) {
    let newFig = document.createElement('figure');
    newGalerie.appendChild(newFig);
    newFig.setAttribute('data-id', imgId);
    newImg = document.createElement('img');
    newImg.crossOrigin = 'anonymous';
    newFig.appendChild(newImg);
    newFigCap = document.createElement('figcaption');
    newFig.appendChild(newFigCap);

    newImg.setAttribute('src', imgUrl);
    newImg.setAttribute('alt', imgTitle);

    newFigCap.innerHTML += imgTitle;
    newFigCap.setAttribute('data-id', imgId);
}
