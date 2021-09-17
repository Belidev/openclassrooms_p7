function disconnectButton() {
    const disconnectButton = document.getElementById("disconnect");
    disconnectButton.addEventListener('click', event => {
      event.preventDefault();
      localStorage.clear();
      window.location.replace('../index.html');
    });
};

function showUserMail(){
  const userMail = localStorage.getItem("email")
  const userPlaceHolder = document.getElementById("accueilHeader--userId")
  userHtml = `<p>email : <span class="userMail">${userMail}</span>!</p>`
  result = userPlaceHolder.innerHTML= userHtml
  return result
}

showUserMail()
disconnectButton()