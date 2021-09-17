function showOneArticle() {
    let params = new URLSearchParams(document.location.search.substring(1));
    const idParams = params.get("id");
    let init = {method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access' : idParams,
    }
  };
    fetch(`http://localhost:3000/api/article/getonearticle`, init)
      .then((response) => response.json())
      .then(response => {
        let html =""
        for(let i = 0; i < response.length; i++) {
        html += `<div class="itemBox-${i}">
          <p>${response[i].name}</p>
          <p>${response[i].firstname}</p>
          <p>${response[i].text}</p>
        </div>`
        document.getElementById("userArticle").innerHTML = html
        }
    })
};

function deleteOneArticle(idParams){
  // let params = new URLSearchParams(document.location.search.substring(1));
  // const idParams = params.get("id");
  let init = {method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Access' : idParams,
  }
};
  fetch(`http://localhost:3000/api/article/deleteonearticle`, init)
  .then((response) => response.json())
  .then(response => {
      let html =""
      html += `<p>${response.response}</p>
              <a href="./accueil.html">Revenir à l'accueil</a>`
      document.getElementById("userArticle").innerHTML = html
      const deleteButton = document.getElementById("deleteOneArticle");
      if (deleteButton.parentNode){
          deleteButton.parentNode.removeChild(deleteButton);
      }
      deleteBox.removeChild(deleteButton);
  })
}
function deleteOneArticleButton(){
    const deleteButton = document.getElementById("deleteOneArticle");
    deleteButton.addEventListener('click', event => {
        event.preventDefault();
        deleteOneArticle();
    });
};
showOneArticle();
deleteOneArticleButton();