const mySelect = document.querySelector("select");
const mySelect2 = document.getElementById("select-vitesse");

const API_URL = "https://swapi.dev/api/films/";

// const precedentBtn = document.getElementById("precedentBtn");
// const suivantBtn = document.getElementById("suivantBtn");
// const arretJouerBtn = document.getElementById("arretBtn");

let minuterie = null;
let tPlanets = [];
let index = 0;
let deffilementAuto = true;
let filmActuel = "";

mySelect.addEventListener("change", getDataFilm);

function getDataFilm() {

    filmActuel = mySelect.value;

    // arretJouerBtn.innerHTML = "Stop";
    // arretJouerBtn.value = "Stop";
    deffilementAuto = true;
    mySelect2.style.display = "none";

    fetch(API_URL + filmActuel)
        .then((data) => data.json())
        .then((dataFilm) => {
            console.log(dataFilm)
            gererPlanets(dataFilm.planets);
        });
};
function gererPlanets(dataPlanet) {
    tPlanets = [];
    clearInterval(minuterie);
    document.querySelector("p").innerHTML = "";
    document.querySelector("img").src = "";

    dataPlanet.forEach((planet) => {
        fetch(planet)
            .then((data) => data.json())
            .then((planet) => {
                tPlanets.push(planet);
            });
    });

    setTimeout(() => {
        gererCarrouselImg(tPlanets);
    }, 5000);
}


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