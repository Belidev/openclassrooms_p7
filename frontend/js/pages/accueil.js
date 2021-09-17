// création d'un article ---------------------------------
function newArticle() {
    let article = {
        'username' : document.getElementById("name").value,
        'userfirstname' : document.getElementById("firstName").value,
        'text' : document.getElementById("newArticle").value,
        'email' : localStorage.getItem("email"),
        'iduser' : localStorage.getItem("user")
    }
    return article
}
function userObject() {
  let userItem = {
    'role' : localStorage.getItem("role"),
    'usermail' : localStorage.getItem("email")
  }
  return userItem
}
function refresh(){
  location.reload()
}
// function du bouton DELETE //
function supprimArt(btn){
  let idArt = btn.getAttribute('data-id');
  let user = JSON.stringify(userObject())
    let init = {method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access' : idArt,
    },
    body : user
    };
    fetch(`http://localhost:3000/api/article/deleteonearticleadmin`, init)
    .then((response) => response.json())
    .then(response => {
      window.alert("votre article est bien supprimé")
    })
    .then(response => {
    document.location.reload();
    })
}

function sendAnArticle(){
    let articleItem = JSON.stringify(newArticle());
    fetchInit = {method: 'POST',
    headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    mode: "cors",
    body: articleItem};
    fetch('http://localhost:3000/api/article/create', fetchInit)
    .then(response => {
        window.alert("l'article est envoyé!")
        refresh()
    })
    .catch(function(error){
        console.log(error)
    })
  };

  function SendingArticleButton(){
    const formButton = document.getElementById("sendArticle")
    formButton.addEventListener(`click`, function(e){
        e.preventDefault();
        sendAnArticle();
    })
};

// afficher tous les articles ---------------------------------
articleBox = document.getElementById('articleBox')
function showAllArticles() {
  let init = {method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
  }
};
  fetch(`http://localhost:3000/api/article/getall`, init)
    .then((response) => response.json())
    .then(response => { 
      let html =""
      if  (response.length == 0) {
        html +=`<p>désolé, aucun article disponible</p>`
        document.getElementById("articleBox").innerHTML = html
      }
      for(let i = 0; i < response.length; i++) {
      if (localStorage.getItem("role")=="admin"){
        params = response[i].idtable
        html += 
          `<div class="artBox">
            <a href ="./article.html?id=${params}">
              <div class="itemBox-${i}">
                <p>${response[i].name}</p>
                <p>${response[i].firstname}</p>
                <p>${response[i].text}</p>
              </div>
            </a>
            <button data-id="${params}" id="deleteAdmin" onclick="supprimArt(this)">Supprimer l'article</button>
          </div>`
        document.getElementById("articleBox").innerHTML = html
        }
      if (localStorage.getItem("role")=="user"){
        params = response[i].idtable
        html += 
        `<a href ="./article.html?id=${params}">
          <div class="itemBox-${i}">
            <p>${response[i].name}</p>
            <p>${response[i].firstname}</p>
            <p>${response[i].text}</p>
          </div>
        </a>`
        document.getElementById("articleBox").innerHTML = html
      }
      }
    })
};
showAllArticles();
SendingArticleButton();