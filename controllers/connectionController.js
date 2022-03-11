
        
        const test = () => console.log('test')
        const getAccesToken = () => localStorage.getItem('ACCES_TOKEN')
        const accesToken = getAccesToken()
        if (!!accesToken) window.location.replace("/affichageProfil")

    