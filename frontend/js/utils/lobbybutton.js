const lobbyButton = document.getElementById("lobbyButton")

function lobbyButtonEvent(){
    lobbyButton.addEventListener("click", function(e){
        e.preventDefault()
        location.assign("./accueil.html")
    })
}

lobbyButtonEvent()