fetch('https://randomuser.me/api?results=10')
    .then(response1 => response1.json())
    .then(json1 => {
        afficherListeAleatoireUtilisateurs(json1)
    })


function afficherListeAleatoireUtilisateurs(json1) {
    console.log(json1)

    for (let e = 0; e < json1["results"].length; e++) {
        let button = document.createElement('button');

        button.setAttribute("data-index-user", e)

        let img = document.createElement('img');
        img.addEventListener("click", function ajout() {
            information(json1["results"][e])
        })

        img.src = json1["results"][e]["picture"]["medium"];
        img.alt = "Afficher la fiche de " + json1["results"][e]["name"]["first"];

        button.appendChild(img);
        document.getElementById('liste').appendChild(button);
    }
}

function information(item) {
    document.querySelector('h2').innerHTML = "";
    document.querySelector('h2').innerHTML = item["name"]["first"] + " " + item["name"]["last"];
    document.getElementById('fiche').querySelector('img').src = item["picture"]["medium"];
    document.querySelector('li[data-adresse]').innerHTML = item["location"]["street"]["number"] + " " + item["location"]["street"]["name"];
    document.querySelector('li[data-ville]').innerHTML = item["location"]["city"];
    document.querySelector('li[data-etat]').innerHTML = item["location"]["state"];
    document.querySelector('li[data-codepostal]').innerHTML = item["location"]["postcode"];

}
