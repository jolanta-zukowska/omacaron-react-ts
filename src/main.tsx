// import de la feuille de style index.css
import './index.scss';
// = style GLOBAL de l'application (body etc.)
// ====================================================


// pour voir ce code console.log dans le navigatteur : il faut le transformer (=typescript) en javascript 
// pour cela il faut utiliser la commande : "npm run build" ou "pnpm build"
// puis ouvrir le fichier index.html dans le navigateur
// & ouvrir la console du navigateur pour voir le console.log

console.log('Coucou je suis le main !');
console.log('Re-coucou je vérifie le watch du serveur !');

// on va créer un h1 en React et le mettre dans le DOM
// au lieu de "document.createElement('h1')" on va utiliser une méthode de React : "React.createElement()"
// pour utiliser React ===> il faut l'importer ===>

// import React from 'react';
// console.log(React);
// import ReactDOM from 'react-dom';
// console.log(ReactDOM);

// on importe "createElement" de React pour créer les elements virtuels 
import { createElement } from "react";

// import ReactDOM from 'react-dom/client';
// on importe "createRoot" pour créer le DOM virtuel avec les éléments virtuels créés avec "createElement"
// "createRoot" est une fonction qui prend en argument un élément du DOM réel
// cest en quelque sorte une équivalence de "append" en JS natif (= RENDER)
import {createRoot} from 'react-dom/client';

import App from '../src/components/App/App';

// console.log(ReactDOM);
console.log('Hello Again !!!');

// on va créer un h1 en React
// const h1 = React.createElement('h1', null, 'Hello World !');
// *** "React.createElement('h1')" si j'importe React
// *** "createElement('h1')" si j'importe createElement
// on va utiliser "ReactDOM.render()" pour mettre le h1 dans le DOM

// "createElement()" de React permet de créer & configurer les éléments 
// c'est une fonction qui prend 3 arguments :

// 1 --- le type de l'élément (string) : 'h1', 'div', 'p', 'span', ... = TYPE DE BALISE HTML
// 2 --- les attributs de l'élément (object) : null, {id: 'monId', className: 'maClasse', ...} = LES ATTRIBUTS DE LA BALISE HTML = LES PROPRIETES DE L'ELEMENT
// 3 --- le contenu de l'élément (string, number, array, ...) : 'Hello World !', 42, ['Hello', 'World', '!'], ... = LE TEXTE OU LE CONTENU DE LA BALISE HTML = CHILDREN DE L'ELEMENT (= l'équivalent de textContent)

const creaTitle = createElement('h1', {className :'title'}, 'Coucou React !');
// console.log(creaTitle);

const creaMain = createElement('main', {className :'main'},
    createElement('h1', {className :'title'}, 'Coucou React !'),
    createElement('p', {className :'text'}, 'Je suis un paragraphe !'),
    createElement('p', {className :'text'}, 'Je suis un autre paragraphe !'),
    createElement('p', {className :'text'}, 'Je suis un dernier paragraphe !'),
);

const reactMainEnJSX = (
<main>
    <h1 className="title">Bonjour et bienvenue en JSX !</h1>
    <p className="text">Quel pays curieux !</p>
    <p className="text">Tout est super bizarre par ici. Sois le bienvenu.</p>
</main>
);


// ensuite on ajoute l'élément dans le DOM virtuel et il sera ajouté au DOM réel par React ===>
// pour ajouter un élément dans le DOM on recupère d'abord notre div 'root' en tant que receptacle
// puis on utilise "ReactDOM.render()" pour ajouter notre élément dans la div 'root'


// et on doit transformer la divRoot en élément Reactpour pouvoir l'injecter dans le DOM virtuel
// pour cela on utilise "React.createElement()" ou "createElement()" de React
// const divRootReact = React.createElement('div', {id: 'root'}, 

// Les deux lignes suivantes peuvent être remplacées par une seule ligne "compilée" :
// const divRoot = document.querySelector('#root');
// const containerElemReact = createRoot(divRoot);

const containerElemReact = createRoot(document.querySelector('#root'));
containerElemReact.render(<App />); 

// *** "render" de React est l'équivalent de "append" de JS natif
// *** "render" de React permet d'ajouter un élément dans le DOM
// *** "render" de React prend 2 arguments :
// 1 --- l'élément à ajouter dans le DOM
// 2 --- le conteneur dans lequel ajouter l'élément

// ReactDOM.render(h1, divRoot);
// ReactDOM.render(creaTitle, divRootReact);
// sinon :
// divRootReact.render(creaTitle);

