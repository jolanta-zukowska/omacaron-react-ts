import type IMacaron from "../@types/IMacaron";
import Macaron from "../components/Macaron/Macaron";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface MacaronsPageProps {
	listMacarons: IMacaron[];
	setListMacarons: Dispatch<SetStateAction<IMacaron[]>>;
	filterValue: string;
	setFilterValue: Dispatch<SetStateAction<string>>;
}

function MacaronsPage({
	listMacarons,
	setListMacarons,
	filterValue,
	setFilterValue,
}: MacaronsPageProps) {
	// *** FONCTION pour placer le focus dans INPUT au premier rendu ===>
	useEffect(
		() => {
			// une callback contenant le code de l'effet de bord
			// ici exemple pour récupérer l'élement avec "querySelector" mais c'est PAS BIEN, en react on utilise plutôt "useRef" pour récupérer les éléments du DOM
			const input = document.getElementById("filter-input") as HTMLInputElement;
			if (input) input.focus();
		},
		[], // placement de focus (=cursor) dans l'input UNIQUEMENT AU PREMIER RENDU
	);

	// *** FONCTON pour filtrer de l'input en temps réel :
	const filterMac = () => {
		return listMacarons.filter((ligneTableMacaron) =>
			// cette fonction renvoie VRAI si on garde la ligne & FAUX si on ne garde pas la ligne dans le nouveau tableau
			// ici ===> on renvoie VRAI si le nom du macaron INCLUDE INPUT (input = filterValue)
			// *** L'ajout de ".toLowerCase()" pour effectuer une recherche insensible à la casse.
			// Cela améliore l'expérience utilisateur. ***
			ligneTableMacaron.flavour
				.toLowerCase()
				.includes(filterValue.toLowerCase()),
		);
	};

	return (
		<>
			{/* FORM ADD MACARON */}
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

					// avec les données entreées par user via form on veut "fabriquer" un nouveau macaron
					// on crée "newMacaron"
					const newMacaron: IMacaron = {
						id: Date.now(),
						// id: 99,
						// id: crypto.randomUUID(), // id généré aéatoirement ===> ici nous sommes en front mais dans la vraie vie c'est le BACK qui génére les id
						// Remplacement l'ID statique "99" et/ou "crypto.randomUUID()" par "Date.now()" pour générer un ID unique pour chaque nouveau macaron.
						// Cependant, il est fortement recommandé que l'ID soit généré par le backend si vous travaillez avec une base de données.
						flavour: filling,
						color: color,
					};
					console.log(newMacaron);

					// le nouveau macaron existe ===> on l'ajoute dans le state et dans le tableau data ===>
					// ici ajout dans le tableau existant des macarons
					// listMacarons.push(newMacaron); INTERDIT !!!!!!!!!! ===> on utilise le setter
					// si je donne au setter le tableau de state ===> on a ajouté une nouvelle ligne mais c'est toujours le même tableau donc pas de nouveau tableau ===> pas de nouveau dessin
					// le setter fait une SHALLOW COMPARAISON (= comparaison en surface) et non DEEP COMPARAISON (= comparaison en profondeur)
					// compte tenu que c'est "le même tableau" ===> je ne refais pas de nouveau rendu

					// *** STATE de liste de macarons avec l'outil MAP
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

			{/* CREATION DE FILTER INPUT en temps réel*/}
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

			<h2>Voici la liste de nos petits bijoux à savourer :</h2>

			{/* Ceci est notre liste de Macarons ===>  */}
			<main>
				{/* <div>{tableauDivJSX}</div> */}
				{/* on remplace le {tableauDivJSX} avec l'expression de sa fonction = donc {data.map} */}
				<div className="box">
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

				{/* !!! Si on veut ajouter dans la liste un macaron à l'unité, en dehors du tableau : */}
				{/* <Macaron macaronToDisplay={{ flavour: "rose flowers", colour: "red" }} /> */}
			</main>
		</>
	);
}

export default MacaronsPage;
