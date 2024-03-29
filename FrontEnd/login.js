//-----------------------------------------------------
//---------------------LOGIN---------------------------
//-----------------------------------------------------

const formInfos = document.querySelector('#login');

formInfos.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Création de l'objet "userInfos"
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const userInfos = { email, password };

    // Envoi de ces informations sur l'API "LOGIN"
    const authentificationInfos = await fetch(
        'http://localhost:5678/api/users/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfos),
        }
    );

    // Récupération de la réponse et traduction
    const authentificationResponse = await authentificationInfos.json();

    // Stockage du TOKEN du User identifié et de l'état de l'authentification
    const authentificationToken = authentificationResponse.token;
    const authentificationState = authentificationInfos.ok;

    // Retour conditionnel en fonction de l'authentification et stockage des données dans le "sessionStorage".
    if (authentificationState === true) {
        sessionStorage.setItem('authentificationToken', authentificationToken);
        sessionStorage.setItem('authentificationState', authentificationState);
        window.location.replace('index.html');
    } else {
        sessionStorage.setItem('authentificationState', authentificationState);
        const wrongUserNotification = document.querySelector(
            '.wrong-user-notification'
        );
        wrongUserNotification.innerText =
            '“Erreur dans l’identifiant ou le mot de passe”';
    }
});
//La fonction logout() s'active avec un "onclick" dans le fichier "index.html
function logout() {
    sessionStorage.removeItem('authentificationToken');
    sessionStorage.removeItem('authentificationState');
    window.location.replace('login.html');
}

//-----------------------------------------------------
//------------------EDITMODE---------------------------
//-----------------------------------------------------

// Récupérer tous les éléments avec la classe "edit__mode"
const editModeElements = document.querySelectorAll('.edit__mode');

// affichage ou non du lien id login
const loginElement = document.querySelector('#login');

const authentificationState = sessionStorage.getItem('authentificationState');

if (authentificationState === 'true') {
    // Pour chaque élément, changer le style pour passer de "display: none" à "display: flex"
    editModeElements.forEach((element) => {
        element.style.display = 'flex';
        loginElement.style.display = 'none';
    });
} else {
    // Pour chaque élément, changer le style pour passer de "display: flex" à "display: none"
    editModeElements.forEach((element) => {
        element.style.display = 'none';
    });
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
