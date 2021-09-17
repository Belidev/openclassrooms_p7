const articleBox = document.getElementById("article__box")
const commentBox = document.getElementById("article__comments")
const commentButton = document.getElementById("sendComment")
const articleNumberSpan = document.getElementById("articleNumber")

function articleNumber() {
    html = `${getUrlParams()}`
    articleNumberSpan.innerHTML = html
}
function showUserMail(){
    const userMail = localStorage.getItem("email")
    const userPlaceHolder = document.getElementById("accueilHeader--userId")
    userHtml = `<p>email : <span class="userMail">${userMail}</span>!</p>`
    result = userPlaceHolder.innerHTML= userHtml
    return result
  }

function commentObject() {
    let Comment = {
        'firstname': document.getElementById("commentFirstName").value,
        'name': document.getElementById("commentName").value,
        'text' : document.getElementById("newComment").value,
        'iduser': localStorage.getItem('user'),
        'idarticle': getUrlParams()
    }
    return Comment
}

function commentButtonClick(){
    commentButton.addEventListener(`click`, function(e){
        e.preventDefault();
        sendComment();
    });
};

function getUrlParams(){
    const params = (new URL(document.location)).searchParams;
    const paramsResult = params.get('id')
    return paramsResult
}

function getOneArticle(){
    let init = {method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Access' : getUrlParams()
        }
    };
    fetch('http://localhost:3000/api/article/getonearticle', init)
    .then((response) => response.json())
    .then(response => {
        let htmlArticle = `
            <p>auteur : ${response[0].firstname} ${response[0].name}</p>
            <p>${response[0].text}</p>
            `
        articleBox.innerHTML = htmlArticle
    });
}

    let init = {method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access' : getUrlParams()
    }
  };

function getAllCommentary(){
    let init = {method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Access' : getUrlParams()
        }
    }
    fetch('http://localhost:3000/api/article/getallcommentary', init)
    .then((response) => response.json())
    .then(response => {
        let htmlContent=""
        for (let i = 0; i < response.comment.length; i++) {
            if (localStorage.getItem("role") == "user") {
                htmlContent += 
                `<div class="commentsBox-${response.comment[i].idcommentary}">
                <p>Auteur : ${response.comment[i].firstname} ${response.comment[i].name}</p>
                <p>commentaires : ${response.comment[i].text}</p>
                </div>`
            commentBox.innerHTML = htmlContent
            }
            if (localStorage.getItem("role") == "admin"){
                htmlContent += 
                `<div class="commentArea">
                    <div class="commentsBox-${response.comment[i].idcommentary}">
                        <p>Auteur : ${response.comment[i].firstname} ${response.comment[i].name}</p>
                        <p>commentaires : ${response.comment[i].text}</p>
                    </div>
                    <button id="deleteCommentButton" data-id="${response.comment[i].idcommentary}" onclick="deleteCommentAdmin(this)">Supprimer ce commentaire</button>
                </div>`
            commentBox.innerHTML = htmlContent
            }
        }
        if(response.comment.length == 0){
            htmlContent = `<p class="article__comments--emptyAnswer">Désolé, aucun commentaire disponible</p>`
            commentBox.innerHTML = htmlContent
        }
    });
}

function sendComment(){
    comment = JSON.stringify(commentObject())
    let fetchInit = {method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        mode: "cors",
        body : comment
    }
    fetch('http://localhost:3000/api/article/postcomment', fetchInit)
    .then(function (response){
        if(response.ok) {
            console.log("la requête est fonctionnelle")
            location.reload()
        }
        else{
            console.log("echec de la requête")
        }
    })
    .catch(function(error){
        console.log(error)
    })
};

function deleteCommentAdmin(btn){
    let idComm = btn.getAttribute('data-id');
    let fetchInit = {method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Access': idComm
        },
        mode: "cors",
    }
    fetch('http://localhost:3000/api/article/deletecommentadmin', fetchInit)
    .then(function (response){
        if(response.ok) {
            window.alert("commentaire supprimé")
            location.reload()
        }
        else{
            console.log("echec de la requête")
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
getOneArticle()
getAllCommentary()
commentButtonClick()
showUserMail()
articleNumber()
