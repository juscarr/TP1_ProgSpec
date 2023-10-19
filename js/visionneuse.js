// Fonction pour aller chercher les planètes selon le film choisi

const selectFilm = document.getElementById("listeFilms");
selectFilm.addEventListener("change", assyncPlanete);
let tPlanetes = [];
let minuteriePrincipale = null;

let indexPlanete = 0;
let enMouvement = true;

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

function afficherPlanete(sens) {
    if (sens !== false) {
        incrementerIndex(1)
    }
    let nomPlanete = document.querySelector("p");
    let imagePlanete = document.querySelector("img")

    nomPlanete.innerHTML = "";
    imagePlanete.src = "";

    console.log(indexPlanete + ": index de la planètes")
    console.log(tPlanetes[indexPlanete] + ": la planètes OBJ")

    nomPlanete.innerHTML = tPlanetes[indexPlanete];
    imagePlanete.src = './images/' + tPlanetes[indexPlanete] + '.jpg'


}

//Fonction pour faire rouler les images

function incrementerIndex(sens) {

    if (sens === 1) {
        indexPlanete++;
    }
    if (sens === -1) {
        indexPlanete = indexPlanete - 1;
    }

    if (indexPlanete > tPlanetes.length - 1) {
        indexPlanete = 0;
    }

    if (indexPlanete < 0) {
        indexPlanete = tPlanetes.length - 1;
    }

}

// Fonction pour aller à l'image suivante et l'image précédente et arrêter

const btnPrecedent = document.getElementById("precedentBtn");
const btnSuivant = document.getElementById("suivantBtn");
const btnStop = document.getElementById("stopBtn");

btnSuivant.addEventListener("click", () => {
    incrementerIndex(1);
    afficherPlanete()
})

btnPrecedent.addEventListener("click", () => {
    incrementerIndex(-1);
    afficherPlanete(false)
})

btnStop.addEventListener("click", () => {
    gestionVisionneuse()
})

// Fonction pour arrêter ou démarrer la visionneuse

function gestionVisionneuse() {

    if (btnStop.value === "stop") {
        clearInterval(minuteriePrincipale);
        minuteriePrincipale = "";
        afficherVitesse(true);

        btnStop.innerHTML = "Démarrer";
        btnStop.value = "demarrer"
    } else {
        minuteriePrincipale = setInterval(afficherPlanete, 1000);
        afficherVitesse(false);

        btnStop.innerHTML = "Stop";
        btnStop.value = "stop"
    }
}

// Fonction pour afficher le select de vitesse ou le retirer

const selectVitesse = document.getElementById("select-vitesse")

function afficherVitesse(afficher) {
    selectVitesse.hidden = !afficher;
}
