const signOutBtn = document.querySelector('#signOutBtn');
    console.log(signOutBtn);
    signOutBtn.addEventListener('click', () => {
        window.localStorage.clear();
        window.location.replace('/connexion');
    });