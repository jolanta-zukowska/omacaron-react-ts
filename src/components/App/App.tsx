// =========== START LES IMPORTS ===========

import "./App.scss";
import { useEffect, useState } from "react";

// on desactive les données en statique ===> on va les chercher sur le serveur back
// import data from "../../data";
import { Moon, Sun } from "feather-icons-react";

// IMPORT DES COMPOSANTS :
import Footer from "../Footer/Footer";
// mport Macaron from "../Macaron/Macaron";
import type IMacaron from "../../@types/IMacaron";
import axios from "axios";

import MacaronsPage from "../../pages/MacaronsPage";
import AboutPage from "../../pages/AboutPage";

import { Routes } from "react-router";
import { Route } from "react-router";

// import AddFormMacaron from "../AddFormMacaron/AddFormMacaron";

// =========== STOP LES IMPORTS ===========

// *** UN COMPOSANT en React est une fonction qui retourne un élément React (= du JSX) ***

// =========== START FONCTION APP ===========

function App() {
	// *** STATE pour stocker TOUS LES MACARONS ***
	// POUR QUE LA LISTE DE MACARONS PUISSE EVOLUER ===> pour qu'on puisse ajouter les macarons dans le tableau
	// on initialise le STATE MACARONS avec le tableau initial de data ===> tableau de macarons (d'abord VIDE, ensuite fetch)
	const [listMacarons, setListMacarons] = useState<IMacaron[]>([]);

	// *** STATE filter ***
	// POUR stocker la valeur de l'input FILTER = la saisie en temps réel par user
	const [filterValue, setFilterValue] = useState("");
	// maintenant il faut que le STATE pilote affichage donc on l'insère dans l'affichage de INPUT

	// *** STATE pour darkmode
	const [isDark, setIsDark] = useState(false);

	// *** STATE pour piloter l'affichage de Footer
	const [isFooterAlive, setIsFooterAlive] = useState(true);

	// *** FONCTION por modifier le titre de l'onglet quand "isDark" ===>
	useEffect(() => {
		// la callback
		document.title = `oMacarons ${isDark ? "Dark Mode" : "Light Mode"}`;
	}, [isDark]);

	const title = "Nos Macarons";

	// *** FONCTION CALL API (= fetch) pour aller chercher les données sur le back ===>
	useEffect(() => {
		const fetchMacarons = async () => {
			// *** VERSION AVEC AXIOS
			try {
				const response = await axios.get(
					"https://oclock-api.vercel.app/api/macarons",
				);
				console.log(response.data);
				// on a notre tableau ===> il faut l'afficher sur la page ===> on injecte les données dans le tableau (initialement) vide via le setter ===>
				setListMacarons(response.data);
			} catch {
				console.log("erreur de fetch");
			}
		};
		fetchMacarons();
	}, []);

	// *** RETURN du JSX qui sera placé dans le VDOM puis reconcilié avec le DOM réel
	return (
		<div className={isDark ? "app app--dark" : "app"}>
			{/* Cette expression est une ternaire qui va afficher la classe 'app app-dark' si 'isDark' est vrai et 'app' si 'isDark' est faux
		=> si 'isDark' est vrai : la classe 'app app-dark' est affichée 
		=> si 'isDark' est faux : la classe 'app' est affichée */}

			{/* <Header /> */}

			<Routes>
				<Route
					path="/"
					element={
						<MacaronsPage
							listMacarons={listMacarons}
							setListMacarons={setListMacarons}
							filterValue={filterValue}
							setFilterValue={setFilterValue}
						/>
					}
				/>
				<Route path="/about" element={<AboutPage />} />
			</Routes>

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

			<button type="button" onClick={() => setIsFooterAlive(!isFooterAlive)}>
				{isFooterAlive ? "Cacher le Footer" : "Afficher le Footer"}
			</button>
			{isFooterAlive && <Footer />}
			{/* <Footer /> */}
		</div>
	);
}

export default App;
