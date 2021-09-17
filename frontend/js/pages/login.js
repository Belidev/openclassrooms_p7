function checkUserObject() {
    let User = {
        'email': document.getElementById("email").value,
        'password': document.getElementById("password").value
    }
    return User
}
function navigateToLobby() {
    window.location.replace("./accueil.html")
}

function checkUser() {
    User = checkUserObject()
    let userItem = JSON.stringify(User);
    fetchInit = {method: 'POST',
    headers: {
      'content-type': "application/json"
    },
    mode: "cors",
    body: userItem};
    fetch('http://localhost:3000/api/auth/login', fetchInit)
    .then(response => {
        if(response.ok) {
            response.json().then(function(res) {
            localStorage.setItem("user", res.userId)
            localStorage.setItem("token", res.accessToken)
            localStorage.setItem("email", res.email)
            localStorage.setItem("role", res.role)
            navigateToLobby()
          });
        } else {
        response.json().then(function(res) {
          window.alert(res.error)
        })
        }
    })
    .catch(function(err){
        console.log(err)
    })
    };
function SendingFormButton(){
    const formButton = document.getElementById("sendForm")
    formButton.addEventListener(`click`, function(e){
        e.preventDefault()
        checkUser()
    }
    )
};
SendingFormButton();