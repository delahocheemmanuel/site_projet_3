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
        
        // Code pour mettre les boutons en blanc
        let btns = document.querySelectorAll('input[type="submit"]');
        btns.forEach(function (btn) {
          btn.style.backgroundColor = 'white';
          btn.style.color = '#1D6154';
        });
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
     // e=event   
     newBtn.addEventListener('mouseout', function (e) {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#1D6154';
    });
    newBtn.addEventListener('mouseover', function (e) {
        e.target.style.backgroundColor = '#1D6154';
        e.target.style.color = 'white';
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
