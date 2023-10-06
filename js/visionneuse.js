fetch('https://swapi.dev/api/planets')
    .then(response1 => response1.json())
    .then(json1 => {
        visionneuse(json1)
    })

let index = 0;

const avantButton = document.getElementById("avantBtn");
const apresButton = document.getElementById("apresBtn");
const arretButton = document.getElementById("arretBtn");

function visionneuse(json1) {
    imageElement.src = images[currentIndex];

}

avantButton.addEventListener("click", function retour() {

    index = index - 1;

    if (index === -1) {
        index = 9;
    }

});

apresButton.addEventListener("click", function next() {

    index = index + 1;

    if (index === 11) {
        index = 0;
    }

});

function startTimer() {
    timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }, 3000); // Change image every 3 seconds (adjust as needed)
}

function resetTimer() {
    clearInterval(timer);
}