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


