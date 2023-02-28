


// Appel des catégories . création des btn filtre


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

//  btns (input:submit) de catégories
function newBouton(btnName, categorieId, categorieOnClick) {
    let newBtn = document.createElement('input');
    newBtn.setAttribute('type', 'submit');
    newBtn.setAttribute('value', btnName);
    newBtn.setAttribute('class', 'removeAtEdit');
    newBtn.setAttribute('data-categorie-id', categorieId);

    newBtn.addEventListener('click', categorieOnClick);
    let currentForm = document.querySelector('#formBtn');
    currentForm.appendChild(newBtn);

    newBtn.addEventListener('mouseover', function (e) {
        e.target.style.backgroundColor = '#1D6154';
        e.target.style.color = 'white';
    });
    newBtn.addEventListener('mouseout', function (e) {
        e.target.style.backgroundColor = '#FFFEF8';
        e.target.style.color = '#1D6154';
    });
}

// bouton Tous
newBouton('Tous', '', categorieOnClick);

// Filter
function categorieOnClick(e) {
    e.preventDefault();
    let categorieDataId = e.target.getAttribute('data-categorie-id');

    loadGallery(categorieDataId);
}
