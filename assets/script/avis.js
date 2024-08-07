export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {

        piecesElements[i].addEventListener("click", async function (event) {

            const id = event.target.dataset.id;
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
            const avis = await reponse.json();

            // stocker avis dans le localStorage et de les afficher automatiquement
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));

            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis);
           
            });
    }
}

export function afficherAvis(pieceElement, avis){  // export la function  permet de rendre disponible a l'exterieur du fichier
    const avisElement = document.createElement("p");
            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
            }
            pieceElement.appendChild(avisElement);

}


export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    // creation objet nouvelle avis
    const avis = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles:parseInt(event.target.querySelector("[name=nbEtoiles]").value),
    };

    // creation de la charge utile au format Json
    const chargeUtile = JSON.stringify(avis);

    // appel de la fonction fetch avec ttes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
}
 

// ---------afficher graphique avis----------- 
export async function afficherGraphiqueAvis(){
    
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];

    for (let commentaire of avis) {
      nb_commentaires[commentaire.nbEtoiles - 1]++;
    }

    //legende qui s'affichera sur la gauvhe à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    //données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: 'Etoiles attribuées',
            data: nb_commentaires.reverse(), // reverse affiche les notes du plus grand au plus petit
            backgroundColor: "rgba(255, 230, 0, 1)",
        }],
    };
    // objet de configuration final 
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };   
    // rendu graphique dans l'élément canvas
    const graphiqueAvis = new Chart ( 
        document.querySelector("#graphique-avis"),
        config,
    );             

}
    

