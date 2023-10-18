const mySelect = document.querySelector("select");
const mySelect2 = document.getElementById("select-vitesse");

const API_URL = "https://swapi.dev/api/films/";

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const btnArretJouer = document.getElementById("stop");

let minuterie = null;
let tPlanets = [];
let index = 0;
let deffilementAuto = true;

mySelect.addEventListener("change", getDataFilm);


const getDataFilm = () => {
    btnArretJouer.innerHTML = "Arrêt";
    btnArretJouer.value = "Arrêt";
    let filmValue = mySelect.value;
    deffilementAuto = true;
    mySelect2.style.display = "none";

    fetch(API_URL + filmValue)
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
};