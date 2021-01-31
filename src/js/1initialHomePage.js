<<<<<<< Updated upstream
=======
//  получаем доступ к шаблону для отображения списка фильмов
import templateListOfFilms from '../templates/list-films.hbs';
import refs from '../js/refs'

>>>>>>> Stashed changes
// 1.2) 1initialHomePage.js:

// - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться в запросе при плагинации);
// - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);
// - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам);
// - создаем функцию fetchGenres которая забирает жанры и кладет их в переменную genres (она понадобится в работе следующим участникам);
// - запускаем функцию fetchPopularMoviesList и fetchGenres.

<<<<<<< Updated upstream
// Доступ к элементам
import refs from './refs.js';

// Доступ к html <ul class="gallery"></ul>
=======
// // Доступ к html <ul class="gallery"></ul>

>>>>>>> Stashed changes

const renderFilms = 0;
const genres = 0;
const pageNumber = 1;

<<<<<<< Updated upstream
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
=======
function createCardFunc(data) {
  const markup = templateListOfFilms(data);
  
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

// fetch запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
function fetchPopularMoviesList() {
  const url =
    'https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2';

  return fetch(url)
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(({ results }) => {
      // console.log(results);
      createCardFunc(results);
      return results
    });
}
fetchPopularMoviesList();

// fetch запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
// function fetchGenres() {
//   const url =
//     'https://api.themoviedb.org/3/genre/movie/list?api_key=a524e22e3630cf24a2e0a24a461145a2';

//   return fetch(url)
//     .then(response => {
//       // console.log(response);
//       return response.json();
//     })
//     .then(({ genres }) => {
//       // console.log(genres);
//       // createCardFunc(genres);
//     });
// }
// fetchGenres();

// export default 
>>>>>>> Stashed changes
