// Fonction pour aller chercher les planètes selon le film choisi

const selectFilm = document.getElementById("listeFilms");
selectFilm.addEventListener("change", assyncPlanete);
let tPlanetes = [];
let minuteriePrincipale = null;

let indexPlanete = 0;

function assyncPlanete() {

    tPlanetes = [];

    indexPlanete = 0;

    if (minuteriePrincipale) {
        clearInterval(minuteriePrincipale);
    }

    let filmActuel = selectFilm.value;

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
            minuteriePrincipale = setInterval(afficherPlanete, 1000);
        });
}


//Fonction pour afficher les planètes selon le JSON envoyé

function afficherPlanete() {

    let nomPlanete = document.querySelector("p");
    let imagePlanete = document.querySelector("img")

    nomPlanete.innerHTML = "";
    imagePlanete.src = "";

    console.log(indexPlanete + ": index de la planètes")
    console.log(tPlanetes[indexPlanete] + ": la planètes OBJ")

    nomPlanete.innerHTML = tPlanetes[indexPlanete];
    imagePlanete.src = './images/' + tPlanetes[indexPlanete] + '.jpg'

    incrementerIndex(1)

}

//Fonction pour faire rouler les images

function incrementerIndex(sens) {

    if (sens === 1) {
        indexPlanete++;
    }
    if (sens === -1) {
        indexPlanete--;
    }

    if (indexPlanete > tPlanetes.length - 1) {
        indexPlanete = 0;
    }

    if (indexPlanete < 0) {
        indexPlanete = tPlanetes.length -1;
    }

}

