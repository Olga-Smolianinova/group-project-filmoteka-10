//  получаем доступ к шаблону для отображения списка фильмов
import templateListOfFilms from '../templates/list-films.hbs';
import refs from '../js/refs.js';

// 1.2) 1initialHomePage.js:

// - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться в запросе при плагинации);
// - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li
//    согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом
//    false так как фильм из библиотеки(смотри пункт “3) ” создание activeDetailsPage);
// - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber)
//    в которой используется createCardFunc результат используя fragment кладем в ul,
//    и не забываем заполнить этими же данными переменную renderFilms(она понадобится в работе следующим участникам);
// - создаем функцию fetchGenres которая забирает справочник жанров с API и кладет их в глобальную переменную
//    genres(массив объектов) (она понадобится в работе следующим участникам);
// - запускаем функцию fetchPopularMoviesList и fetchGenres.

const renderFilms = 0;
const pageNumber = 1;
let genres;

import footer from '../html/footer.html';

// для отрисовки фильмов через template  в HTML
function createCardFunc(imgPath, filmTitle, movieId) {
  const markup = templateListOfFilms(imgPath, filmTitle, movieId);

  // встраиваем полученные данные в HTML документ
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

// Функция fetchGenres запускается один раз при инициализации

function fetchGenres() {
  const url =
    'https://api.themoviedb.org/3/genre/movie/list?api_key=a524e22e3630cf24a2e0a24a461145a2&perPage=5';

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(gen => {
      genres = gen.genres;
      fetchPopularMoviesList(2);
    });
}
fetchGenres();

// document
//   .querySelector('.button-test')
//   .addEventListener('click', () => console.log(genres));

// fetch for configuration

function fetchConfig() {
  const url =
    'https://api.themoviedb.org/3/configuration?api_key=a524e22e3630cf24a2e0a24a461145a2';

  return fetch(url).then(response =>
    response.json().then(data => console.log(data)),
  );
}
fetchConfig();

let tekPageOnPaginator = 1; //Текущая страница запроса на пагинаторе
let tekPageOnAPI = 1; //Текущая страница API запроса
let elmStartRender = 1; //С какого элемента API отображать страницу на экране
let dblFetch = false; //надо ли загружать с API еще одну страницу
let elmCountRender = 0; // Сколько элементов загружать c другой страницы API
let elmPerPageOn = 9; // Сколько элементов отображается на экране (зависит от устройства)

// fetch запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
function fetchPopularMoviesList(tekPageOnPaginator) {
  if (innerWidth >= 1024) {
    elmPerPageOn = 9;
  } else if (innerWidth >= 768 && innerWidth < 1024) {
    elmPerPageOn = 8;
  } else {
    elmPerPageOn = 4;
  }

  // Вычисляем какую страницу API загружать в зависимости от страницы на пагинаторе
  tekPageOnAPI = Math.ceil(((tekPageOnPaginator - 1) * elmPerPageOn + 1) / 20);
  // С какого элемента API-страницы отображать страницу на экране
  elmStartRender =
    (tekPageOnPaginator - 1) * elmPerPageOn + 1 - (tekPageOnAPI - 1) * 20;
  // Надо ли загружать с API еще одну страницу
  dblFetch = 20 + 1 - elmStartRender <= elmPerPageOn;
  // Сколько элементов загружать c другой страницы API
  // elmCountRender = elmPerPageOn - (20 + 1 - elmStartRender);

  console.log(elmStartRender, dblFetch);

  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${tekPageOnAPI}`,
  )
    .then(response => {
      return response.json();
    })
    .then(({ results }) => {
      console.log(results);
      if (dblFetch) {
        fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${
            tekPageOnAPI + 1
          }`,
        )
          .then(response => {
            return response.json();
          })
          .then(({ results: results1 }) => {
            results.push.apply(results, results1);
            results.forEach(({ genre_ids }) =>
              genre_ids.forEach(
                (item1, inxex, arr) =>
                  (arr[inxex] = genres.find(item2 => item2.id == item1)),
              ),
            );
          });
        createCardFunc(results.slice(elmStartRender - 1, elmPerPageOn));
      } else {
        results.forEach(({ genre_ids }) =>
          genre_ids.forEach(
            (item1, inxex, arr) =>
              (arr[inxex] = genres.find(item2 => item2.id == item1)),
          ),
        );
        console.log(
          results.slice(elmStartRender - 1, elmStartRender + elmPerPageOn - 1),
        );
        createCardFunc(
          results.slice(elmStartRender - 1, elmStartRender + elmPerPageOn - 1),
        );
      }
    });
}

// Функция для отрисовки количество картинок на странице, в зависимости от ширины экрана
function arrQuantity(results) {
  // console.log(results);
  const mobileArr = results.slice(0, 4);
  // console.log(mobileArr);
  const tabletArr = results.slice(0, 8);
  // console.log(tabletArr);
  const desktopArr = results.slice(0, 9);
  // console.log(desktopArr);

  // console.log(innerWidth);
  // console.log(visualViewport.width); //visualViewport.width
}

// Пагинатор
var pagination = require('pagination');
var paginator = pagination.create('search', {
  prelink: '/',
  current: 6,
  rowsPerPage: 20,
  totalResult: 800,
});
refs.paging.insertAdjacentHTML('beforeend', paginator.render());

// Слушатель события на пагинатор
// const refPaginator = document.querySelector('.paginator');
refs.paging.addEventListener('click', onClickPage);
function onClickPage(evt) {
  evt.preventDefault();

  switch (evt.target.innerText) {
    case 'Previous':
      console.log(paginator.getPaginationData().current - 1);
      break;
    case 'Next':
      console.log(paginator.getPaginationData().current + 1);
      break;
  }

  // paginator.set('current', 3);
  // refs.paging.innerHTML = paginator.render();
  // console.log(evt.target.innerText);
  // console.log('dasdasda');
}

// console.log(paginator.render());
// paginator.set('current', 3);
// встраиваем полученные данные в HTML документ

// refPaginator = document.querySelector('.paginator');

// paginator.set('current', 1);
// refs.paging.innerHTML = paginator.render();

// СЛУШАТЕЛИ СОБЫТИЙ
// для открытия и закрытия модального окна вешаем слушателя событий на родителя li - это ul -refs.container
// const onGalleryClick = refs.galleryRef.addEventListener('click', onOpenModal);

// function onOpenModal(event) {
//   const largeImageUrl = event.target;
//   // console.dir(largeImageUrl);
//   // console.log(event.target.dataset.action);

// }

export { createCardFunc, fetchPopularMoviesList, arrQuantity, genres };
// const genreList = document.querySelector('span.genre');
// console.log(genreList);
