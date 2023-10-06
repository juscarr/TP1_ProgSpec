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

    let fiche = document.getElementById("fiche");
    fiche.innerHTML = "";

    let img = document.createElement("img");
    img.src = item["picture"]["large"];

    let liste = document.createElement("ul");
    let adresse = document.createElement("li");
    let ville = document.createElement("li");
    let etat = document.createElement("li");
    let codepostal = document.createElement("li");
    let nom = document.createElement("h2");

    nom.innerHTML = item["name"]["first"] + " " + item["name"]["last"]

    adresse.innerHTML = item["location"]["street"]["number"] + " " + item["location"]["street"]["name"];
    ville.innerHTML = item["location"]["city"];
    etat.innerHTML = item["location"]["state"];
    codepostal.innerHTML = item["location"]["postcode"];

    fiche.appendChild(nom);
    fiche.appendChild(img);

    liste.appendChild(adresse);
    liste.appendChild(ville);
    liste.appendChild(etat);
    liste.appendChild(codepostal);

    fiche.appendChild(liste);

}
