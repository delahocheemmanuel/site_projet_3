// Création du form de filtre
const newForm = document.createElement('form');
newForm.setAttribute('action', '#');
newForm.setAttribute('method', 'get');
newForm.setAttribute('id', 'formBtn');

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
