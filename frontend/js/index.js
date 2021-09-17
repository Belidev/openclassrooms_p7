const subscribeButton = document.getElementById("subscription")
const loginButton = document.getElementById("login")

function subscribe(){
    subscribeButton.addEventListener('click', function(event) {
        event.preventDefault()
        window.location.assign("./pages/subscription.html")
})}
function login(){
    loginButton.addEventListener('click', function(event) {
        event.preventDefault()
        window.location.assign("./pages/login.html")
})}

subscribe();
login();