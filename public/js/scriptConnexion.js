const connectBtn = document.querySelector('#connectBtn');


const getAccesToken = () => localStorage.getItem('TOKEN');

const accesToken = getAccesToken();

    if (!!accesToken) location.replace("/profil");

    const connexion = () => {
        let emailValue = document.querySelector('#email').value;
        let passwordValue = document.querySelector('#password').value;
        if (!!email && !!password) {
            const body = JSON.stringify({
                email: emailValue,
                password: passwordValue,
            });
            fetch('https://ski-api.herokuapp.com/login', {
                method: "POST",
                body,
                headers:{ 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        }
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('TOKEN', data.token);
                localStorage.setItem('NAME', data.name);
                localStorage.setItem('EMAIL', data.email);
                location.replace('/profil');
            })
            .catch(error => console.log(error));
        }
    };

connectBtn.addEventListener("click", connexion);