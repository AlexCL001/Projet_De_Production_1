const name = document.querySelector('#name');
const email = document.querySelector('#email');
console.log('DONE');

const getAccesToken = () => localStorage.getItem("TOKEN");
const accesToken = getAccesToken();


const displayUser = async () => {
  const response = await fetch("https://ski-api.herokuapp.com/login", {
  method: "GET",
  
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: accesToken
  },
})
  .then((response) => response.json())
  .then((data) => {
    let token = data.token;
    let userName = data.name;
    let userEmail = data.email;
    name.innerHtml = userName;
    userEmail.innerHtml = userEmail;
   
  })
  .catch((error) => console.log(error));
};

window.addEventListener('load', displayUser);