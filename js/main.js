fetch('https://randomuser.me/api?results=10')
    .then(response1 => response1.json())
    .then(json1 => {
        console.log(json1)

        for (let e = 0; e < json1["results"].length; e++) {
            let img = document.createElement('img');
            img.src = json1["results"][e]["picture"]["medium"];
            document.getElementById('liste').appendChild(img);
        }

    })


