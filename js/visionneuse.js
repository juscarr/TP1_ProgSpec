// Fonction pour aller chercher les planètes selon le film choisi

const selectFilm = document.getElementById("listeFilms");
selectFilm.addEventListener("change", assyncPlanete);
let tPlanetes = [];
let minuteriePrincipale = null;

let indexPlanete = 0;
let enMouvement = true;

let first = true;

let vitesse = "moyen"

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
            json["planets"].forEach(function pushDansTableau(linkPlanete) {
                fetch(linkPlanete)
                    .then((response2) => response2.json())
                    .then((planete) => {
                        tPlanetes.push(planete.name);
                    });
            })
            if (first) {
                minuteriePrincipale = setInterval(afficherPlanete, 1000);
            }
        });
}


//Fonction pour afficher les planètes selon le JSON envoyé

function afficherPlanete(sens) {
    if (enMouvement) {
        console.log(vitesse);
        if (sens !== false) {
            incrementerIndex(1)
        }
        let nomPlanete = document.querySelector("p");
        let imagePlanete = document.querySelector("img")

        nomPlanete.innerHTML = "";
        imagePlanete.src = "";

        nomPlanete.innerHTML = tPlanetes[indexPlanete];
        imagePlanete.src = './images/' + tPlanetes[indexPlanete] + '.jpg'

    }
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
    first = false;
    if (btnStop.value === "stop") {
        clearInterval(minuteriePrincipale);
        minuteriePrincipale = "";
        afficherVitesse(true);

        enMouvement = false;

        btnStop.innerHTML = "Démarrer";
        btnStop.value = "demarrer"
    } else {
        afficherVitesse(false);

        enMouvement = true;

        btnStop.innerHTML = "Stop";
        btnStop.value = "stop"

        clearInterval(minuteriePrincipale);


        if (vitesse === "moyen") {
            minuteriePrincipale = setInterval(afficherPlanete, 1000);
        } else if (vitesse === "lent") {
            minuteriePrincipale = setInterval(afficherPlanete, 1500);
        } else if (vitesse === "rapide") {
            minuteriePrincipale = setInterval(afficherPlanete, 500);
        }
    }
}

// Fonction pour afficher le select de vitesse ou le retirer

const selectVitesse = document.getElementById("select-vitesse")

function afficherVitesse(afficher) {
    selectVitesse.hidden = !afficher;
}

// Fonction changer la vitesse de la visionneuse

selectVitesse.addEventListener("change", changerVitesse)

function changerVitesse() {
    vitesse = selectVitesse.value;
    first = true;
}