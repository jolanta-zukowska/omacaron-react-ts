// import de la feuille de style App.css
import "./App.scss";
// = style de l'application (header, main, footer, etc.) de JSX affiché plus bas dans le code
// ====================================================

import { useState } from "react";
// importe la fonction 'useState' depuis la bibliothèque React

import data from "../../data";
// importe le tableau de données depuis le fichier data.ts

import { Heart, Moon, Sun } from "feather-icons-react";
import Footer from "../Footer/Footer";
import Macaron from "../Macaron/Macaron";

// *** UN COMPOSANT en React est une fonction qui retourne un élément React (= du JSX)
function App() {
	console.log(
		"App exécutée --- JSX retourné et transformé en élément React --- élément React placé dans le VDom --- VDom reconcilié avec le DOM réel",
	);

	// console.log(data);
	// affiche le tableau de données dans la console du navigateur

	const title = "Nos Macarons";

	// on va fabriquer notre tableau d'objets 'data' (= TABLEAU DES DIV JSX) pour fabriquer du JSX (= pour la boucle de la liste des macarons)
	// on va utiliser la méthode "map()" pour parcourir le tableau d'objets 'data' et créer un élément JSX pour chaque objet (= équivaut à une boucle for)
	// "map()" est une méthode qui prend en argument une fonction fléchée qui prend en argument un élément du tableau et son index
	// on va retourner un élément JSX pour chaque objet du tableau 'data'

	// const tableauDivJSX = data.map( macaron => {
	//     return (
	//         <div className='macaron' key={macaron.id}>
	//             <div className='macaron__colour'>{macaron.colour}</div>
	//             <div className='macaron__flavour'>{macaron.flavour}</div>
	//         </div>
	//     )
	// });
	// CONST tableauDivJSX ===> placé directement dans JSX plus bas (dans le return du composant)

	// *** STATE *** POUR CHANGER LE THEME DE L'APPLICATION ===>
	// on va créer une variable de state pour stocker le thème actuel de l'application  ===> LIGHT
	// on va utiliser la fonction 'useState()' pour créer une nouvelle variable de state ===> DARK
	// const [theme, setTheme] = useState('light');
	// on va créer une fonction qui va changer le thème de l'application ===>   PASSAGE DE LIGHT A DARK
	// const changeTheme = () => {
	//     if (theme === 'light') {
	//         setTheme('dark');
	//     } else {
	//         setTheme('light');
	//     }
	// };

	// POUR CHANGER LE THEME DE L'APPLICATION ===> on va créer une nouvelle variable de state
	// cette variable de state est utilisée dans JSX pour piloter l'affichage des classes CSS
	const [isDark, setIsDark] = useState(false);

	return (
		<div className={isDark ? "app app--dark" : "app"}>
			{/* Cette expression est une ternaire qui va afficher la classe 'app app-dark' si 'isDark' est vrai et 'app' si 'isDark' est faux
=> si 'isDark' est vrai : la classe 'app app-dark' est affichée 
=> si 'isDark' est faux : la classe 'app' est affichée */}

			<button
				type="button"
				className="theme-btn"
				onClick={() => {
					// en cliquant sur le bouton on fait l'action de modifier le state
					// POUR MODIFIER LE STATE ON UTILISE LE SETTEUR
					// setTheme('dark');
					setIsDark(!isDark);
				}}
			>
				Changement Mode
				{isDark ? <Sun fill="yellow" /> : <Moon fill="yellow" />}
			</button>

			<header className="header">
				<h1 className="header__title">{title}</h1>
			</header>

			<main>
				<h2>Voici la liste de nos petits bijoux à savourer :</h2>
				{/* <div>{tableauDivJSX}</div> */}
				{/* on remplace le {tableauDivJSX} avec l'expression de sa fonction = donc data.map */}

				<div>
					{/* L'erreur "Each child in a list should have a unique "key" prop" se produit lorsque vous rendez une liste d'éléments en React sans fournir une prop key unique à chaque élément de la liste. Pour corriger cette erreur, vous devez ajouter une prop key à l'élément LE PLUS EXTERNE de chaque itération dans votre méthode map(). ===> "<Macaron key={macaron.oooo} macaronToDisplay={macaron} />" où "oooo" est la propriété uNIQUE autre que index du tableau */}
					{data.map((macaron) => {
						return (
							// <div className='macaron' key={macaron.id}>
							// <div className='macaron__colour'>{macaron.colour}</div>
							// <div className='macaron__flavour'>{macaron.flavour}</div>
							// </div>
							<Macaron key={macaron.flavour} macaronToDisplay={macaron} />
						);
					})}
				</div>

				<br />
			</main>

			<Macaron macaronToDisplay={{ flavour: "rose flowers", colour: "red" }} />

			{<Footer />}
			{/* <Footer /> */}
		</div>
	);
}

export default App;
