// Fonction pour créer des boutons de catégories
function newBouton(btnName, categorieId, categorieOnClick) {
    let newBtn = document.createElement('input');
    newBtn.setAttribute('type', 'submit');
    newBtn.setAttribute('value', btnName);
    newBtn.setAttribute('class', 'removeAtEdit');
    newBtn.setAttribute('data-categorie-id', categorieId);

    newBtn.addEventListener('click', categorieOnClick);
    let currentForm = document.querySelector('#formBtn');
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
document.querySelectorAll('#formBtn input[type="submit"]').forEach(function(btn){
    btn.style.backgroundColor = 'white';
    btn.style.color = '#1D6154';
});

// Charger les boutons de catégories
fetch('http://localhost:5678/api/categories')
    .then(function (res) {
        return res.json();
    })
    .then(function (value) {
        const entries = value.length;

        for (let n = 0; n < entries; n++) {
            let cateName = value[n].name;
            let categorieId = value[n].id;
            newBouton(cateName, categorieId, categorieOnClick);
        }
        
    })
    .catch(function (err) {
        console.log(err);
    });

// Bouton pour afficher toutes les catégories
newBouton('Tous', '', categorieOnClick);

// Fonction de filtrage de la galerie
function categorieOnClick(e) {
    e.preventDefault();
    let categorieDataId = e.target.getAttribute('data-categorie-id');
    loadGallery(categorieDataId);
    setActiveButton(e.target);
}

// Fonction pour définir le bouton actif
function setActiveButton(activeBtn) {
    let buttons = document.querySelectorAll('#formBtn input[type="submit"]');
    buttons.forEach(function (btn) {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'white';
        btn.style.color = '#1D6154';
    });
    activeBtn.classList.add('active');
    activeBtn.style.backgroundColor = '#1D6154';
    activeBtn.style.color = 'white';
}

// Charger la galerie au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    loadGallery('');
});
window.addEventListener('load', function() {
    // Définir la couleur des boutons
    document.querySelectorAll('#formBtn input[type="submit"]').forEach(function(btn) {
      btn.style.backgroundColor = 'white';
      btn.style.color = '#1D6154';
    });
  });
  