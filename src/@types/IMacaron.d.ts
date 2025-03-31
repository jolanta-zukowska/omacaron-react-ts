// ce fichier sert à définir le type custom d'objet Macaron
// il sera importé dans le composant Macaron pour typer la prop macaronToDisplay

interface IMacaron {
	id: number;
	flavour: string;
	color: string;
}

export default IMacaron;
