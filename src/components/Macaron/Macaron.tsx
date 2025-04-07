import React from "react";
import "./Macaron.scss";
// import du type custom de l'objet macaron:
import IMacaron from "../../@types/IMacaron";

// ce composant affiche 1 macaron il est générique mais il faut lui filer l'objet macaron contenant le filling, la couleur
// un composant est une fonction, elle peut avoir des paramètres
// pour utiliser ce composant dans le JSX de App on fait comme ça :
// <Macaron macaronToDisplay={{ flavour: 'rose', color: '#F0F' }} />

// Typage des props
interface MacaronProps {
	macaronToDisplay: IMacaron;
}

// Macaron c'est une fonction avec paramètres
// c'est un composant avec props
// il reçoit en props le macaron à afficher
// suivant le macaron qu'il a reçu en props il va afficher une couleur de coque différente

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

// COMPOSANT MACARON

function Macaron(props: {
	macaronToDisplay: { id: number; flavour: string; color: string };
}) {
	// nous sommes en TypeScript ===> on doit typer les props
	// ici il s'agit d'un OBJET avec plusieurs propriétés
	// on va typer les propriétés de l'objet 'props' ===> 'macaronToDisplay' est un objet avec 3 propriétés
	// on va typer les propriétés de l'objet 'macaronToDisplay' ===> 'id' est un nombre, 'flavour' et 'colour' sont des chaînes de caractères

	console.log(props);
	// affiche l'objet 'macaron' dans la console du navigateur

	const macaron = props.macaronToDisplay;
	// on décompose l'objet 'macaron' pour extraire les propriétés 'colour' et 'flavour'
	// const macaron = { id: 1, flavour: 'chocolate', colour: 'brown' };

	// Ancienne version de code ===> Jola
	return (
		<div className="macaron">
			{/* <div className="macaron__coque">{macaron.colour}</div>
			<div className="macaron__flavour">{macaron.flavour}</div> */}
			<div
				className="macaron__coque"
				// changement de la couleur avec du CSS-in-JS
				style={{ backgroundColor: macaron.color }}
			/>
			<div className="macaron__filling">{macaron.flavour}</div>
			<div
				className="macaron__coque reversed"
				style={{ backgroundColor: macaron.color }}
			/>
		</div>
	);
}

export default Macaron;
