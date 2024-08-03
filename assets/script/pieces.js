console.log("sa marche");

//------------

import { ajoutListenersAvis } from "./avis.js";


// récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


function genererPieces(pieces) {     //
//------------
    // boucle pour afficher toutes les pieces
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];

        // -------Récupération de l'élément du DOM qui accueillera les fiches------
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");

        // creation des balises
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image; // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "aucune catégorie";

        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        
        // -------On rattache la balise article à la section Fiches--------
        sectionFiches.appendChild(pieceElement);

        // On rattache les éléments à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);

        pieceElement.appendChild(nomElement);

        pieceElement.appendChild(prixElement);

        pieceElement.appendChild(categorieElement);
        
        pieceElement.appendChild(descriptionElement);

        pieceElement.appendChild(stockElement);

        pieceElement.appendChild(avisBouton);
    }  
    ajoutListenersAvis();
}

//----------------

genererPieces(pieces);

// ----------Gestion des boutons-----------------
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function() {
    // trier les articles selon leur prix croissant grâce à la function sort
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     console.log(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function() {
    const piecesDecroissant = Array.from(pieces);
    piecesDecroissant.sort(function (a, b) {
        return b.prix - a.prix;
     });
     console.log(piecesDecroissant);
});

// filtre pieces moins 35€
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
   console.log(piecesFiltrees)
});


const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function() { 
    const piecesDescriptions = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesDescriptions);
});

//----------------

// Liste des pieces abordables à moins de 35 €
const noms = pieces.map(piece => piece.nom);  // map pour extraire les noms de toutes les pièces dans le tableau pieces.

// parcour le tableau pieces verifie si le prix est supp a 35€ si c'est le cas supp le nom correspondant 
for (let i= pieces.length -1; i >= 0; i--) {
    if(pieces[i].prix > 35){
        noms.splice(i, 1);
    }
}

// création de la liste des pieces abordables
const abordablesElements = document.createElement("ul");
// boucle pour ajouter chaque nom de pieces à la liste 
for(let i=0; i < noms.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
    console.log(nomElement);
}

const afficheListes = document.querySelector('.abordables');
afficheListes.appendChild(abordablesElements); 



//-----------------
// liste des pieces disponible avec leurs prix

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for (let i= pieces.length -1; i >= 0; i--) {
    if(pieces[i].disponibilite = false){
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

// Liste des pieces disponibles
const piecesDisponibles = document.createElement('ul');

for(let i=0; i < nomsDisponibles.length; i++) {
    const nomPiece = document.createElement('li');
    nomPiece.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    piecesDisponibles.appendChild(nomPiece);
    console.log(nomPiece);
}

document.querySelector('.disponibles').appendChild(piecesDisponibles);


//-------------------
// ajout d'une barre horizontale avec une poignée que l’on peut glisser de droite à gauche met a jour la page lorsque l'utilisateur interagit avec elle
// function genererPieces(pieces) s'applique au debut du code pour generer tt les elements
const inputPrixMax = document.querySelector('#prix_max');
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})