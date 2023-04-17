const formInfos = document.querySelector('#login');

formInfos.addEventListener('submit', async function (event) {
event.preventDefault();

// Création de l'objet "userInfos"
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const userInfos = { email, password };
//console.log('userInfos :', userInfos);

// Envoi de ces informations sur l'API "LOGIN"
const authentificationInfos = await fetch(
'http://localhost:5678/api/users/login',
{
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(userInfos),
}
);
//console.log('authentificationInfos :', authentificationInfos);

// Récupération de la réponse et traduction
const authentificationResponse = await authentificationInfos.json();
//console.log('authentificationResponse :', authentificationResponse);

// Stockage du TOKEN du User identifié et de l'état de l'authentification
const authentificationToken = authentificationResponse.token;
const authentificationState = authentificationInfos.ok;
//console.log('authentificationToken :', authentificationToken);
//console.log('authentificationState :', authentificationState);

// Retour conditionnel en fonction de l'authentification et stockage des données dans le "sessionStorage".
if (authentificationState === true) {
sessionStorage.setItem('authentificationToken', authentificationToken);
sessionStorage.setItem('authentificationState', authentificationState);
//console.log('authentification réussie');
window.location.replace('index.html');
} else {
sessionStorage.setItem('authentificationState', authentificationState);
const wrongUserNotification = document.querySelector(
'.wrong-user-notification'
);
wrongUserNotification.innerText =
"Nom d'utilisateur ou mot de passe incorrect.";
//console.log('authentification échouée');
}
});

function logout() {
sessionStorage.removeItem('authentificationToken');
sessionStorage.removeItem('authentificationState');
window.location.replace('login.html');
}