// appel de l'api
fetch("http://localhost:5678/api/categories")
.then(function(res) {
    return res.json();
})

.catch(function(err) {
    console.log(err);
});

