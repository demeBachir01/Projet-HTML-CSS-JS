// function recupererChamps(){
// let nom = document.getElementById("nom")
// let age = document.getElementById("age")
// let sexe = document.querySelector("input[name='sexe']:checked")
// let loisir = document.querySelectorAll("input[name='Loisir']:checked")
// let pays = document.querySelector("input[name='pays']:checked")
// let commentaire = document.getElementById("commentaire")
// let val = document.getElementById("envoyer")
// }
function afficherResultat(){
let nom = document.getElementById("nom")
let age = document.getElementById("age")
let sexe = document.querySelector("input[name='sexe']:checked")
let loisir = document.querySelectorAll("input[name='Loisir']:checked")
let pays = document.querySelector("input[name='pays']")
let commentaire = document.getElementById("commentaire")

const result = `
<p>Nom : ${nom.value}</p>
<p>Age : ${age.value} </p>
<p>Sexe : ${sexe.value} </p>
<p>Loisir : ${Array.from(loisir).map(l => l.value).join(", ")} </p>
<p>Commentaire : ${commentaire.value} </p>`
let divTest = document.getElementById("teste")
divTest.innerHTML = result
}
// valider.addEventListener("click", recupererChamps());