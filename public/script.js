const connectBtn = document.querySelector('#connectBtn')

const getAccesToken = () => localStorage.getItem('TOKEN')
    const accesToken = getAccesToken()

    if (!!accesToken) location.replace("/affichageProfil", {test: 'test'})

    const connexion = () => {
        let emailValue = document.querySelector('#email').value
        let passwordValue = document.querySelector('#password').value
        if (!!email && !!password) {
            const body = JSON.stringify({
                email: emailValue,
                password: passwordValue,
            })
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
                localStorage.setItem('TOKEN', data.token)
                location.replace('/affichageProfil', {test: 'test'})
            })
            .catch(error => console.log('error'))
        }
    }

connectBtn.addEventListener("click", connexion)