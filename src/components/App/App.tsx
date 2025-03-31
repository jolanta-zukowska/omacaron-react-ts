import "./App.scss";
import { useEffect, useState } from "react";

// on desactive les données en statique ===> on va les chercher sur le serveur back
// import data from "../../data";
import { Heart, Moon, Sun } from "feather-icons-react";

// IMPORT DES COMPOSANTS :
import Footer from "../Footer/Footer";
import Macaron from "../Macaron/Macaron";
import type IMacaron from "../../@types/IMacaron";
import axios from "axios";

// *** UN COMPOSANT en React est une fonction qui retourne un élément React (= du JSX) ***
function App() {
	console.log(
		"App exécutée --- JSX retourné et transformé en élément React --- élément React placé dans le VDom --- VDom reconcilié avec le DOM réel",
	);
	const title = "Nos Macarons";

	// on utilise TABLEAU D'OBJETS 'data' (= TABLEAU DES DIV JSX) pour fabriquer du JSX (= pour la boucle de la liste des macarons) ===> méthode "map()" pour parcourir le tableau d'objets 'data' et créer un élément JSX pour chaque objet (= équivaut à une boucle for)
	// "map()" est une méthode qui prend en argument une fonction fléchée qui prend en argument un élément du tableau et son index ===> KEY !!!
	// on va retourner un élément JSX pour chaque objet du tableau 'data'

	// const tableauDivJSX = data.map( macaron => {
	//     return (
	//         <div className='macaron' key={macaron.id}>
	//             <div className='macaron__colour'>{macaron.colour}</div>
	//             <div className='macaron__flavour'>{macaron.flavour}</div>
	//         </div> )
	// });
	// CONST tableauDivJSX ===> au lieu de recourir à la variable intermédiaire ===> on le place directement dans JSX plus bas (dans le return du composant)

	// *** STATE *** POUR CHANGER LE THEME DE L'APPLICATION ===>
	// 1° une variable de state pour stocker le thème actuel de l'application  ===> LIGHT
	// 2° la fonction 'useState()' à utiliser pour créer une nouvelle variable de state ===> DARK
	// const [theme, setTheme] = useState('light');
	// 3° une nouvelle fonction qui va changer le thème de l'application ===> PASSAGE DE LIGHT A DARK

	// 1ère possibilité ===>
	// const changeTheme = () => {
	//     if (theme === 'light') {
	//         setTheme('dark');
	//     } else {
	//         setTheme('light');
	//     }
	// };

	// *** STATE macarons ***
	// POUR QUE LA LISTE DE MACARONS PUISSE EVOLUER ===> pour qu'on puisse ajouter les macarons dans le tableau
	// on initialise le STATE MACARONS avec le tableau initial de data ===> tableau de macarons
	// et quand on ne fournit pas de fichier data tout de suite : on initialise la variable avec le TABLEAU VIDE
	// or TypeScript type les var selon la valeur INITIALE ===> ici : le tableau de RIEN

	// si il y a des choses dedans : ce seront forcément des objets MACARONS typés par Interface Macarons
	// donc on précise avec le généric de useState que notre state EST UN TABLEAU DE MACARONS
	// ===> "useState<IMacaron[]>([])"

	const [listMacarons, setListMacarons] = useState<IMacaron[]>([]);

	// FONCTION CALL API pour aller chercher les données sur le back ===>

	useEffect(() => {
		const fetchMacarons = async () => {
			// *** VERSION AVEC AXIOS
			try {
				const response = await axios.get(
					"https://oclock-api.vercel.app/api/macarons",
				);
				console.log(response.data);
				// on a notre tableau ===> il faut l'afficher sur la page ===> on injecte les données dans le tableau (initialement) vide
				// ON MET LES DONNEES DANS LE STATE pour remplacer le tableau vide ===>
				setListMacarons(response.data);
			} catch {
				console.log("erreur de fetch");
			}

			// *** VERSION FETCH "ASYNC AWAIT" ===>
			// try {
			// 	const response = await fetch(
			// 		"https://oclock-api.vercel.app/api/macarons",
			// 	);
			// 	const data = await response.json();
			// 	console.log(data); // on reçoit un tableau de données
			// } catch (error) {
			// 	console.log("GAME OVER");
			// }

			// *** VERSION AVEC ".THEN .CATCH" ===>
			// fetch("https://oclock-api.vercel.app/api/macarons").then((response) => {
			// 	response
			// 		.json()
			// 		.then((data) => {
			// 			console.log(data);
			// 		})
			// 		.catch((erreur) => {
			// 			// gestion d'erreurs
			// 			console.log(erreur);
			// 			console.log("GAME OVER");
			// 		});
			// });
		};
		fetchMacarons();
	}, []);

	// *** STATE filter ***
	// POUR stocker la valeur de l'input FILTER = la saisie en temps réel par user
	const [filterValue, setFilterValue] = useState("");
	// maintenant il faut que le STATE pilote affichage donc on l'insère dans l'affichage de INPUT

	// FONCTON pour filtrer les macarons :
	const filterMac = () => {
		return listMacarons.filter((ligneTableMacaron) => {
			// cette fonction renvoie VRAI si on garde la ligne
			// FAUX si on ne garde pas la ligne dans le nouveau tableau
			// ici ===> on renvoie VRAI si le nom du macaron INCLUDE INPUT (input = filterValue)
			return ligneTableMacaron.flavour
				.toLowerCase()
				.includes(filterValue.toLowerCase());
			// *** L'ajout de ".toLowerCase()" pour effectuer une recherche insensible à la casse. Cela améliore l'expérience utilisateur. ***
		});
	};

	// *** STATE pour piloter l'affichage de Footer
	const [isFooterAlive, setIsFooterAlive] = useState(true);

	// *** STATE pour darkmode
	const [isDark, setIsDark] = useState(false);

	// EFFET por modifier le titre de l'onglet quand "isDark" ===>
	useEffect(
		// la callback
		() => {
			document.title = `oMacarons ${isDark ? "Dark Mode" : "Light Mode"}`;
		},
		[isDark],
	);

	// EFFET pour placer le focus dans l'input filter qu'au premier rendu
	useEffect(
		// une callback contenant le code de l'effet de bord
		() => {
			// ici exemple pour récupérer l'élement avec "querySelector" mais c'est PAS BIEN, en react on utilise plutôt "useRef" pour récupérer les éléments du DOM
			(document.querySelector("#filter-input") as HTMLInputElement).focus();
		},
		[], // pleacement de focus (=cursor) UNIQUEMENT AU PREMIER RENDU
	);

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
				Changement Mode{" "}
				{isDark ? <Sun fill="yellow" /> : <Moon fill="yellow" />}
			</button>

			<header className="header">
				<h1 className="header__title">{title}</h1>
			</header>
			<form
				className="addfom"
				onSubmit={(eventClick) => {
					eventClick.preventDefault();
					const myFormData = new FormData(eventClick.currentTarget);

					// ATTENTION la méthode get de formData renvoie un type INSOLITE ===> "FormDataEntryValue | null"
					// "FormDataEntryValue" c'est un input de type SOIT fichier (= File) soit string
					// on ajoute "as string" si on veut forcer que ce soit un STRING ===>
					const filling = myFormData.get("filling") as string;
					const color = myFormData.get("color") as string;

					console.log(filling, color);

					// avec les données entreées par user via form on veut "fabriquer" un nouveau macaron
					// on crée "newMacaron"
					const newMacaron = {
						id: Date.now(),
						// id: 99,
						// id: crypto.randomUUID(), // id généré aéatoirement ===> ici nous sommes en front mais dans la vraie vie c'est le BACK qui génére les id
						// Remplacement l'ID statique "99" et/ou "crypto.randomUUID()" par "Date.now()" pour générer un ID unique pour chaque nouveau macaron.
						// Cependant, il est fortement recommandé que l'ID soit généré par le backend si vous travaillez avec une base de données.
						flavour: filling,
						colour: color,
					};
					console.log(newMacaron);

					// le nouveau macaron existe ===> on l'ajoute dans le state et dans le tableau data ===>
					// ici ajout dans le tableau existant des macarons
					// listMacarons.push(newMacaron); INTERDIT !!!!!!!!!!

					// et on utilise le setter
					// si je donne au setter le tableau de state ===> on a ajouté une nouvelle ligne mais c'est toujours le même tableau donc pas de nouveau tableau ===> pas de nouveau dessin
					// le setter fait une SHALLOW COMPARAISON (= comparaison en surface) et non DEEP COMPARAISON (= comparaison en profondeur)
					// compte tenu que c'est "le même tableau" ===> je ne refais pas de nouveau rendu

					// Nouveau STATE de liste de macarons
					const newListMac = [
						// on deverse le tableau actuel = le state actuel de tableau
						...listMacarons,
						// et on ajoute au NOUVEAU TABLEAU le NOUVEAU MACARON
						newMacaron,
					];
					// ensuite on execute le setter avec le nouveau tableau
					setListMacarons(newListMac);
					// on peut écrire aussi ===>
					// setListMacarons([...listMacarons, newMacaron]);
				}}
			>
				<label htmlFor="filling">Filling</label>
				<input type="text" name="filling" />
				<label htmlFor="color">Color</label>
				<input type="text" name="color" />
				<button type="submit">Add</button>
			</form>
			{/* CREATION DE FILTER */}
			<div className="filter">
				<input
					id="filter-input"
					type="text"
					placeholder="Search..."
					// /* la valeur que user lit dans input doit correspondre au STATE FILTER */

					// /* CONTROLE EN LECTURE ===> on lit dans l'affichage ce qui dicte le STATE (= la valeur de state)*/
					value={filterValue}
					// {/* CONTROLE EN ECRITURE ===> on écoute événement "onChange" pour modifier le STATE */}
					onChange={(eventChange) => {
						// on modifie les STATE pour lui ajouter la saisie d'utilisateur ===> ainsi l'affichage va se redessiner

						console.log(eventChange.currentTarget.value);
						const userData = eventChange.currentTarget.value;
						setFilterValue(userData);
					}}
				/>

				<button
					type="button"
					onClick={() => {
						// on remet le filtre à vide
						setFilterValue("");
					}}
				>
					Clear
				</button>
			</div>
			{/* Comment faire pour qu'une donnée affluence l'affichage ? 
			donnée = la saisi dans un input en temps réel ===> si la donnée change alors l'affichage change AUSSI */}
			<main>
				<h2>Voici la liste de nos petits bijoux à savourer :</h2>
				{/* <div>{tableauDivJSX}</div> */}
				{/* on remplace le {tableauDivJSX} avec l'expression de sa fonction = donc data.map */}

				<div>
					{/* L'erreur "Each child in a list should have a unique "key" prop" se produit lorsque vous rendez une liste d'éléments en React sans fournir une prop key unique à chaque élément de la liste. Pour corriger cette erreur, vous devez ajouter une prop key à l'élément LE PLUS EXTERNE de chaque itération dans votre méthode map(). ===> "<Macaron key={macaron.oooo} macaronToDisplay={macaron} />" où "oooo" est la propriété uNIQUE autre que index du tableau */}
					{filterMac().map((macaron) => {
						return (
							// <div className='macaron' key={macaron.id}>
							// <div className='macaron__colour'>{macaron.colour}</div>
							// <div className='macaron__flavour'>{macaron.flavour}</div>
							// </div>
							<Macaron key={macaron.id} macaronToDisplay={macaron} />
							// Il est crucial d'utiliser un ID unique et stable comme key. Si vous n'avez pas d'ID unique dans vos données, utilisez Date.now() pour générer un ID unique !
						);
					})}
				</div>

				<br />
			</main>
			{/* !!! Si on veut ajouter dans la liste un macaron à l'unité, en dehors du tableau : */}
			{/* <Macaron macaronToDisplay={{ flavour: "rose flowers", colour: "red" }} /> */}

			<button type="button" onClick={() => setIsFooterAlive(!isFooterAlive)}>
				{isFooterAlive ? "Cacher le Footer" : "Afficher le Footer"}
			</button>
			{isFooterAlive && <Footer />}
			{/* <Footer /> */}
		</div>
	);
}

export default App;

// exemple d'une FONCTION PURE :
const sum = (nb1: number, nb2: number) => nb1 + nb2;

sum(2, 2); // va renvoyer 4
console.log(sum);
