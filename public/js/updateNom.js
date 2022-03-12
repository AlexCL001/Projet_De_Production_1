const nouveauNomInput = document.querySelector('#nouveauNom');
const btnSoumettre = document.querySelector('#btnSoumettreNouveauNom');
const nomUtilisateur = document.querySelector('#nomUtilisateur');

const getAccesToken = () => localStorage.getItem('TOKEN');
const accesToken = getAccesToken();



const putNouveauNom = () => {
    let nouveauNom =nouveauNomInput.value;
    // const body = JSON.stringify({
    //     name: nouveauNom
    // });
    // fetch(`https://ski-api.herokuapp.com/user?access_token=${accesToken}`,{
    //     method: "PUT",
    //     body,
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).then(response => response.json())
    // .then(data => {
    //     // localStorage.setItem('NAME', data.name);
    //     console.log(data);
    // })
    // .catch(error => console.log(error));

};




btnSoumettre.addEventListener('click', () => {
    let nouveauNom =nouveauNomInput.value;
    nomUtilisateur.innerHTML = nouveauNom;
    localStorage.setItem('NAME', nouveauNom); // TODO: remove this and put in fetch above
    putNouveauNom();
});

// change name in database





