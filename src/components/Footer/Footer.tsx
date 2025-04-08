import { useEffect, useState } from "react";
import { Heart, Moon, Sun } from "feather-icons-react";
import "./Footer.scss";

// ====================================================

// import du composant Link de react-router qu'on va utiliser à la palce des balises <a>
// NavLink c'est pareil que Link, sauf que ça ajoute une classe "active" sur le lien actif (= le lien qui a la valeur de son attribut "to=''" et qui est égal à URL  )
import { NavLink } from "react-router";

// ====================================================

function Footer() {
	// STATE pour piloter l'affichage de compteur ou de message de validation
	// deux affichages possibles ===> soit le form soit WelcomeMsg ===> true / false
	// const [myWelcomeMsg, setMyWelcomeMsg] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleClick = () => {
		console.log("Le footer uniquement a été redessiné par VDom.");
		// counter = counter + 1;
		// au click : on incrémente les state en utilisant la fonction 'setCounter' qui prend en argument la nouvelle valeur du state ===>
		setCounter(counter + 1);
	};

	// au lieu de déclarer une variable 'state' en JS, on va utiliser la fonction React ===> useState
	// pour créer une VRAIE variable de state = si le state change : le composant est rechargé
	// const [state, setState] = useState(0);

	// useState();
	// useState() est une fonction qui prend en argument la valeur initiale du state
	// const returnValueUseState = useState(27);
	// console.log(returnValueUseState);

	// affiche le tableau de valeurs dans la console du navigateur
	// useState() retourne dans la conole un tableau avec 2 valeurs ===>
	// 1 --- undefined = la valeur du state
	// 2 --- la fonction à  utiliser pour modifier le state

	// STATE pour piloter l'affichage du compteur
	// *** ON DESTRUCTURE LE TABLEAU EN DEUX VALEURS DISTINCTES ===>
	// const counter = returnValueUseState[0];
	// const setCounter = returnValueUseState[1];
	// on raccourci en une seule ligne ===>

	// const [counter, setCounter] = returnValueUseState;
	const [counter, setCounter] = useState(27);

	// console.log(counter);
	// console.log(setCounter);

	// *** EXEMPLE D'EFFET qui necessite un nettoyage ===>
	useEffect(() => {
		// le bloc NEWSLETTER n'est pas affiché tout de suite ===> on 'affiche au bout de 5sec
		// on met en place un timer au premier rendu du composant et au bout de 5sec on affiche pop up newsletter
		// via la methode SETTIMEOUT
		// setTimeout(() => {
		let intervalId;
		let nbSec = 0; // Déclaré à l'intérieur du callback

		intervalId = setInterval(
			() => {
				// affichage de a pop up relou
				// alert("abonnez vous !!!");
				nbSec = nbSec + 1;
				// "nbSec += 1;"
				// console.log("le footer est affiché depuis", nbSec);
			},
			// au bout de 2 secondes ===>
			2000,
		);

		// Quand le composant meurt il faudrait exécuter une fonction qui nettoie l'effet de bord
		// Il est possible qu'après la mort de composant son effet continue de "tourner"
		// Ici c'est CLEARINTERVAL qui supprime SETINTERVAL ===>

		const cleaningFunction = () => {
			// supprimer interval ===>
			clearInterval(intervalId);
		};
		// on RETURN la fonction de nettoyage ===>
		return cleaningFunction;
	}, []);

	return (
		<footer className="footer">
			<button
				type="button"
				// onClick = {() => {
				// console.log('Le bouton coeur a été cliqué. Et Hop ! click sur le bouton !');
				// }}>
				onClick={handleClick}
			>
				{counter} ❤️ <Heart fill="red" />
			</button>
			<br />
			<br />
			@copyright - promo Ramen - 2025
			{/* {isDark && <span> - Dark Mode</span>} */}
			{isSubscribed ? (
				<p>Vous êtes abonné</p>
			) : (
				<form
					className="newsform"
					action={(FormData) => {
						// à la palce de callback via onSUSbmit on peut mettre une callback via action
						// contient le preventdefault par défaut

						const emailOfUser = FormData.get("emailOfUser");
						console.log("vous êtes abonné", emailOfUser);

						// dans action === dans onSubmit ===> on change le STATE une fois le mail renseigné ===>
						setIsSubscribed(!isSubscribed);
					}}
				>
					Inscrivez-vous à notre newsletter !
					<input
						className="newsform__email"
						type="email"
						name="emailOfUser"
						placeholder="Your e-mail here"
					/>
					<button type="submit" className="newsform__submit">
						OK
					</button>
				</form>
			)}
			<ul>
				<li>
					<a
						href="/aboutclassic"
						onClick={(clickEvent) => {
							// on stoppe le comport pas défaut du lien => NE PAS refaire une requête http => car nous sommes en SPA !!! il n'existe qu'une seule page !!!
							clickEvent.preventDefault();
							console.log("Lien cliqué & rien ne se passe.");
							// ici on change un state qui dit quelle page est affichée ===> setPage('about')
							// dans le JSX si page vaut about ===> au lieu de la liste de macarons j'affiche la page "about"

							// on va quand même modifier url pour avoir une expérience de navigation ===>
							// history.pushState({}, "title1", "?page=1");
							history.pushState({}, "", "/about");
						}}
					>
						About Us
					</a>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
				</li>
				<li>
					<NavLink to="/about">About Us avec Link</NavLink>
				</li>
				<li>
					<NavLink to="/contact">Contact Us</NavLink>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
