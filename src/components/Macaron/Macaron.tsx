// le composant Macaron sert à afficher un seul macaron
// il prend en argument un objet 'macaron' qui contient les propriétés d'un macaron
// on va afficher la couleur et le parfum du macaron via les paramètres de la fonction

// un composant est une FONCTION qui retourne un élément React (= du JSX)
// on va créer un composant Macaron qui va afficher un macaron 
// on va utiliser les propriétés de l'objet 'macaron' pour afficher la couleur et le parfum

// UNE FONCTION peut avoir des paramètres


// on va créer un composant Macaron qui va afficher un macaron
// on va utiliser les propriétés de l'objet 'macaron' pour afficher la couleur et le parfum 
// on va utiliser la décomposition pour extraire les propriétés de l'objet 'macaron'
// on va afficher la couleur et le parfum du macaron via les paramètres de la fonction

function Macaron(props: { macaronToDisplay: { id: number; flavour: string; colour: string; }; }) {

    // nous sommes en TypeScript ===> on doit typer les props
    // ici il s'agit d'un OBJET avec plusieurs propriétés
    // on va typer les propriétés de l'objet 'props' ===> 'macaronToDisplay' est un objet avec 3 propriétés
    // on va typer les propriétés de l'objet 'macaronToDisplay' ===> 'id' est un nombre, 'flavour' et 'colour' sont des chaînes de caractères

    console.log(props);
    // affiche l'objet 'macaron' dans la console du navigateur

    const macaron = props.macaronToDisplay;
    // on décompose l'objet 'macaron' pour extraire les propriétés 'colour' et 'flavour'
    // const macaron = { id: 1, flavour: 'chocolate', colour: 'brown' };

    return ( 
        <div className='macaron' key={macaron.id}>
        <div className='macaron__colour'>{macaron.colour}</div>
        <div className='macaron__flavour'>{macaron.flavour}</div>           
        </div>
    );
}

export default Macaron; 



