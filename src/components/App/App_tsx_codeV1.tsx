import data from '../data'; 
// importe le tableau de données depuis le fichier data.ts




// *** UN COMPOSANT en React est une fonction qui retourne un élément React (= du JSX)
function App () {

    console.log(data);
    // affiche le tableau de données dans la console du navigateur

    const title = 'Nos Macarons';

    // on va fabriquer notre tableau d'objets 'data' (= TABLEAU DES DIV JSX) pour fabriquer du JSX (= pour la boucle de la liste des macarons)
    // on va utiliser la méthode "map()" pour parcourir le tableau d'objets 'data' et créer un élément JSX pour chaque objet (= équivaut à une boucle for)
    // "map()" est une méthode qui prend en argument une fonction fléchée qui prend en argument un élément du tableau et son index
    // on va retourner un élément JSX pour chaque objet du tableau 'data'

    const tableauDivJSX = data.map( macaron => {
        return (
            <div key={macaron.id}>{macaron.flavour}</div>
        )
    });



    return (
    <main>
    <h1 className="title">{title}</h1>
    <p className="text">Bienvenue au pays des gourmands !</p>
    <p className="text">Voici la liste de nos délices :</p>

    <div>    
        {/* {[<div key={1}>Je suis un macaron Numéro 1 !</div>, <div key={2}>Je suis un autre macaron, mon numéro c'est 2 !</div>, <div key={3}>Je suis un dernier macaron, je suis 3ème !</div>]} */}
        {/* *** ON PEUT AUSSI UTILISER UNE VARIABLE POUR AFFICHER LES ELEMENTS JSX */}
        {tableauDivJSX}
        {/* *** OU ON PEUT AUSSI UTILISER LA METHODE MAP DANS LE RETURN directement */}
    </div> 

    </main>
    );
};

// *** POUR TRANSFORMER LE TABLEAU D'OBJETS 'data' EN TABLEAU DE DIV JSX on va utiliser la fonction MAP
// const macarons = data.map((macaron, index) => {
//     return (

export default App;