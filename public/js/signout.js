const signOutBtn = document.querySelector('#signOutBtn');

    signOutBtn.addEventListener('click', () => {
        window.localStorage.clear();
        window.location.replace('/connexion');
    });