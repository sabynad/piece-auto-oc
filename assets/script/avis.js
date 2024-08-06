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
        pieceId: parseInt(event.target.querySelector("[name=piece-id").value),
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
 
