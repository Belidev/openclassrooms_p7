const firstname = document.getElementById("firstName").value
const username =  document.getElementById("name").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value
console.log(password)

let regexName = new RegExp(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{1,30}$/);
let regexMail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/);
let regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

function createUser() {
    let User = {
        'firstname': document.getElementById("firstName").value,
        'name': document.getElementById("name").value,
        'email': document.getElementById("email").value,
        'password': document.getElementById("password").value
    }
    return User
}
function navigateToLogIn(){
    window.location.replace("./login.html")
}

function sendUser() {
    User = createUser()
    let userItem = JSON.stringify(User);
    fetchInit = {method: 'POST',
    headers: {
      'content-type': "application/json"
    },
    mode: "cors",
    body: userItem};
    fetch('http://localhost:3000/api/auth/signup', fetchInit)
    .then(function (response){
        if(response.ok) {
            console.log("la requête est fonctionnelle")
            navigateToLogIn()
        }
        else{
            console.log("echec de la requête")
        }
    })
    .catch(function(error){
        console.log(error)
    })
    };
function SendingFormButton(){
    const formButton = document.getElementById("sendForm")
    formButton.addEventListener(`click`, function(e){
        console.log(password)
        if(regexName.test(username) == false){
            window.alert("nom d'utilisateur incorrect")
            location.reload()
            return false
        }
        if(regexName.test(firstname) == false){
            window.alert("prénom d'utilisateur incorrect")
            location.reload()
            return false
        }
        if(regexMail.test(email) == false){
            window.alert("email d'utilisateur incorrect")
            location.reload()
            return false
        }
        if(regexPassword.test(password) == false){
            window.alert("mot de passe de l'utilisateur incorrect")
            location.reload()
            return false
        }
        e.preventDefault();
        sendUser();
    }
    )
};
console.log(regexName.test(username))
console.log(regexName.test(firstname))
console.log(regexMail.test(email))
console.log(regexPassword.test(password))
SendingFormButton();