// 1.2) 1initialHomePage.js:

// - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться в запросе при плагинации);
// - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);
// - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам);
// - создаем функцию fetchGenres которая забирает жанры и кладет их в переменную genres (она понадобится в работе следующим участникам);
// - запускаем функцию fetchPopularMoviesList и fetchGenres.

// Доступ к элементам
import refs from './refs.js';

// Доступ к html <ul class="gallery"></ul>

const renderFilms = 0;
const genres = 0;
const pageNumber = 1;

function createCardFunc(imgPath, filmTitle, movieId) {
  //
}

import footer from '../html/footer.html';
console.log(footer);

// const footers = document.querySelector('.container');
// console.log(footers);

const gallery = document.querySelector('.gallery');
console.log(gallery);

gallery.insertAdjacentHTML('beforeend', footer);
