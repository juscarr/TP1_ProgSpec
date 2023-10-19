// Fonction pour aller chercher les planètes selon le film choisi

const selectFilm = document.getElementById("listeFilms");
selectFilm.addEventListener("change", assyncPlanete);
let tPlanetes = [];
let minuteriePrincipal = null;

function assyncPlanete() {

    if (minuteriePrincipal) {
        clearInterval(minuteriePrincipal);
    }

    filmActuel = selectFilm.value;

    // arretJouerBtn.innerHTML = "Stop";
    // arretJouerBtn.value = "Stop";

    // deffilementAuto = true;
    // mySelect2.style.display = "none";

    fetch("https://swapi.dev/api/films/" + filmActuel)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            json["planets"].forEach(function pushDansTableau(linkPlanete) {
                console.log(linkPlanete + ": Avant le fetch")
                fetch(linkPlanete)
                    .then((response2) => response2.json())
                    .then((planete) => {
                        console.log(planete + ": Dans le fetch")
                        console.log(planete.name + ": Dans le fetch avec name")
                        tPlanetes.push(planete.name);
                    });
            })
            minuteriePrincipal = setInterval(afficherPlanete, 5000);
        });
};



//Fonction pour afficher les planètes selon je JSON envoyé

function afficherPlanete() {


    document.querySelector("p").innerHTML = "";
    document.querySelector("img").src = "";



}


const mySelect2 = document.getElementById("select-vitesse");

// const precedentBtn = document.getElementById("precedentBtn");
// const suivantBtn = document.getElementById("suivantBtn");
// const arretJouerBtn = document.getElementById("arretBtn");

let minuterie = null;
let tPlanets = [];
let index = 0;
let deffilementAuto = true;
let filmActuel = "";


function gererCarrouselImg() {
    clearInterval(minuterie);
    if (mySelect2.value === "lent") {
        minuterie = setInterval(() => {
            index = (index + 1) % tPlanets.length;
            document.querySelector("p").innerHTML = tPlanets[index].name;
            document.querySelector(
                "img"
            ).src = `./images/${tPlanets[index].name}.jpg`;
        }, 1500);
    } else if (mySelect2.value === "moyen") {
        minuterie = setInterval(() => {
            index = (index + 1) % tPlanets.length;
            document.querySelector("p").innerHTML = tPlanets[index].name;
            document.querySelector(
                "img"
            ).src = `./images/${tPlanets[index].name}.jpg`;
        }, 1000);
    } else if (mySelect2.value === "rapide") {
        minuterie = setInterval(() => {
            index = (index + 1) % tPlanets.length;
            document.querySelector("p").innerHTML = tPlanets[index].name;
            document.querySelector(
                "img"
            ).src = `./images/${tPlanets[index].name}.jpg`;
        }, 500);
    }
};