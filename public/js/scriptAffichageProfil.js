const getToken = () => {
  return window.localStorage.getItem("TOKEN");
};

const token = getToken();

if (!token) {
  console.log(window.localStorage.getItem("TOKEN"));
  window.location.replace("/");
} else {
  const nameLocalStorage = window.localStorage.getItem("NAME");

  const nomUtilisateur = document.querySelector("#nomUtilisateur");
  nomUtilisateur.innerHTML = nameLocalStorage;

  const emailLocalStorage = window.localStorage.getItem("EMAIL");
  const emailUtilisateur = document.querySelector("#emailUtilisateur");
  emailUtilisateur.innerHTML = emailLocalStorage;
}
