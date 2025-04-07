// ce fichier sert à definir le type custom d'un objet macaron
// il sera impprté dans le composant Macaron pour typer la prop macaronToDisplay

interface IMacaron {
	id: number;
	flavour: string;
	color: string;
	// category: string;
}

export default IMacaron;
