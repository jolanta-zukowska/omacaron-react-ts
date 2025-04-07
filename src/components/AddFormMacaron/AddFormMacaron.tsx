import type IMacaron from "../../@types/IMacaron";
import "./AddFormMacaron.scss";

// *** INTERFACE pour typer la fonction d'ajout des macarons
interface AddFormMacaronProps {
	listMacarons: IMacaron[];
	setListMacarons: React.Dispatch<React.SetStateAction<IMacaron[]>>;
}

function AddFormMacaron({
	listMacarons,
	setListMacarons,
}: AddFormMacaronProps) {
	// fonction pour trouver le plus grand id du tableau des macarons et ajouter 1
	const getNewId = () => {
		const idList = listMacarons.map((macaron) => macaron.id);
		const biggerId = Math.max(...idList);
		return biggerId + 1;
	};

	return (
		<form
			className="addform"
			onSubmit={(event) => {
				event.preventDefault();
				const myFormData = new FormData(event.currentTarget);

				// attention la méthode get d'un formDat renvoie FormDataEntryValue | null
				// FormDataEntryValue c'est File | string
				const filling = myFormData.get("filling") as string;
				const color = myFormData.get("color") as string;

				// on veut creer un nouvel objet macaron pour l'ajouter dans le state
				const newMacaron = {
					id: getNewId(), // id généré aléatoirement (en général c'est le back qui donne les id)
					flavour: filling,
					color: color,
				};

				// ajouter le newMacaron dans le state
				// modifier le state directement sans utiliser le setter
				// je push dans le tableau du state
				// macarons.push(newMacaron); - INTERDIT !!!!!

				// on utilise le setter et on lui file le tableau dans lequel on a push le nouveau macaron
				// attention si la valeur que je donne au setter est identique à celle du state actuel il ne redeclanche pas de rendu
				// si je donne au setter le tableau du state , ok y'a une nouvelle ligne dedans mais c'est tjs le meme tableau
				// le setter fait une shallow comparaison (et non une deep comparaison)

				// const newMacArray = [
				// on copie le contenu du state (les macarons actuellement presents dans le state)
				// ...listMacarons,
				// et à la fin on ajoute le nouveau macaron
				// newMacaron,];

				// on donne au setter ce nouveau tableau qui n'a pas la meme ref que le state actuel

				// setListMacarons(newMacArray);
				setListMacarons([...listMacarons, newMacaron]);
			}}
		>
			<label htmlFor="filling">Filling</label>
			<input type="text" name="filling" />
			<label htmlFor="color">Color</label>
			<input type="text" name="color" />
			<button type="submit">Add</button>
		</form>
	);
}

export default AddFormMacaron;
