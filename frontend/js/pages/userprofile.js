let initGet = {method: 'GET',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem("token"),
  'Access' : localStorage.getItem("user")
}};

function userObject() {
  let User = {
      'firstname': document.getElementById("firstName").value,
      'name': document.getElementById("name").value,
      'email': document.getElementById("email").value,
      'password': document.getElementById("password").value,
      'id': localStorage.getItem("user")
  }
  return User
}
function showUserArticle() {
  let init = initGet;
  fetch(`http://localhost:3000/api/article/getuserarticle`, init)
    .then((response) => response.json())
    .then(response => {
      let html =""
      for(let i = 0; i < response.length; i++) {
      html += 
      `<div class="artBox">
        <a class ="articleLink" href="./article.html?id=${response[i].idtable}">
          <div class="itemBox-${i}">
          <p>
            <span>${response[i].name}</span>
            <span>${response[i].firstname}</span>
          </p>
            <p>${response[i].text}</p>
          </div>
        </a>
        <button id="DeleteArticleButton", data-id="${response[i].idtable}" onclick="SupprimArt(this)">Supprimer</button>
      </div>`
      document.getElementById("userArticle").innerHTML = html
      }
    })
};

function showUserComment(){
  let init = initGet;
  fetch(`http://localhost:3000/api/article/getusercomment`, init)
  .then((response) => response.json())
    .then(response => {
      let html =""
      for(let i = 0; i < response.length; i++) {
      html += 
      `<div class="userComment__box__card">
      <a href="./article.html?id=${response[i].fkidtable}">
        <div class="userComment__box__card--text">
          <p>${response[i].text}</p>
        </div>
      </a>
        <button id="DeleteArticleButton", data-id="${response[i].idcommentary}" onclick="SupprimComm(this)">Supprimer</button>
      </div>`
      document.getElementById("userComment__box").innerHTML = html
      }
    })
}

function SupprimArt(btn){
  let idArt = btn.getAttribute('data-id');
    let init = {method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access' : idArt,
    }
  };
    fetch(`http://localhost:3000/api/article/deleteonearticle`, init)
    .then((response) => response.json())
    .then(response => {
      window.alert("votre article est bien supprimé")
    })
    .then(response => {
      document.location.reload();
    })
}

function SupprimComm(btn){
  let idComm = btn.getAttribute('data-id');
  let init = {method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Access' : idComm,
  }
};
  fetch(`http://localhost:3000/api/article/deleteonecomment`, init)
  .then((response) => response.json())
  .then(response => {
      window.alert("votre commentaire est bien effacé")
      document.location.reload()
  })
  .catch(function(e){
    window.alert("votre commentaire n'est pas effacé")
    console.log(e)
  })
}


function updateUser() {
  User = userObject()
  let userItem = JSON.stringify(User);
  fetchInit = {method: 'POST',
  headers: {
    'content-type': "application/json",
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
  },
  mode: "cors",
  body: userItem};
  fetch('http://localhost:3000/api/auth/updateuser', fetchInit)
    .then(response => {
      if(response.ok) {
        response.json().then(function(res) {
        localStorage.setItem("email", res.email)
        window.alert('utilisateur modifié')
      })}
      else{
        window.alert("modification")
      }
  })
  .catch(function(error){
      console.log(error)
  })
};

function updateButton(){
  const updateButton = document.getElementById("userProfile__boxform--button")
  updateButton.addEventListener('click', function(e) {
    e.preventDefault();
    updateUser()
  })
}

function noArticleLeft(){
  const box = document.getElementById('userArticle')
  if (box.childElementCount == 0){
    html=""
    html += `<p>aucun article disponible</p><button onclick="navigateToLobby()">Revenir à l'accueil</button>`
    box.innerHTML = html
  }
}

noArticleLeft()
updateButton()
showUserArticle()
showUserComment()