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

// Affichage galery
window.onload = function () {
    loadGallery();
};

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






