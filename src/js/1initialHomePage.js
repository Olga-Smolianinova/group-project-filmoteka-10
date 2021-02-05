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

// ---- Импорты -------------------------------------------------------

import templateListOfFilms from '../templates/list-films.hbs'; //  получаем доступ к шаблону для отображения списка фильмов
import refs from '../js/refs.js';
import pagination from 'pagination'; // Пагинатор

// ---- Глобальные переменные и объекты ----------------------------------------

const renderFilms = 0; // ?
let genres; //Массив жанров
let pageNumber = 1; //Текущая страница запроса на пагинаторе
let tekPageOnAPI = 1; //Текущая страница API запроса
let elmStartRender = 1; //С какого элемента API-страницы отображать страницу на экране
let dblFetch = false; //надо ли загружать с API еще одну страницу

// Пагинатор
let paginator = pagination.create('search', {
  prelink: '/',
  current: 1,
  rowsPerPage: 9,
  totalResult: 800,
});
refs.paging.insertAdjacentHTML('beforeend', paginator.render()); // Отображение  пагинатора на странице

// ---- Слушатели событий --------------------------------------------

refs.paging.addEventListener('click', onClickPage); // Слушатель события на пагинатор
// для открытия и закрытия модального окна вешаем слушателя событий на родителя li - это ul -refs.container
// const onGalleryClick = refs.galleryRef.addEventListener('click', onOpenModal);

// ---- Объявление функций --------------------------------------------

// Функция для отрисовки фильмов через template  в HTML
function createCardFunc(imgPath, filmTitle, movieId) {
  const markup = templateListOfFilms(imgPath, filmTitle, movieId);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

// Функция fetchGenres полчение массива жанров (запускается один раз при инициализации)
// Также запускает отрисовку первой страницы поп.фильмов
function fetchGenres() {
  return fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=a524e22e3630cf24a2e0a24a461145a2&perPage=5',
  )
    .then(response => {
      return response.json();
    })
    .then(gen => {
      genres = gen.genres;
      fetchPopularMoviesList(pageNumber);
    });
}

// Функция fetch-запрос на список самых популярных фильмов для создания коллекции на главной странице
function fetchPopularMoviesList(pageNumber) {
  // Определяем кол-во элементов на экране (зависит от устройства)
  let elmPerPageOn = 0;
  if (innerWidth >= 1024) {
    elmPerPageOn = 9;
  } else if (innerWidth >= 768 && innerWidth < 1024) {
    elmPerPageOn = 8;
  } else {
    elmPerPageOn = 4;
  }
  paginator.set('rowsPerPage', elmPerPageOn); // Меняем свойство пагинатора

  // Вычисляем какую страницу API загружать в зависимости от страницы на пагинаторе
  tekPageOnAPI = Math.ceil(((pageNumber - 1) * elmPerPageOn + 1) / 20);
  // С какого элемента API-страницы отображать страницу на экране
  elmStartRender =
    (pageNumber - 1) * elmPerPageOn + 1 - (tekPageOnAPI - 1) * 20;
  // Надо ли загружать с API еще одну страницу
  dblFetch = 20 + 1 - elmStartRender <= elmPerPageOn;

  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${tekPageOnAPI}`,
  )
    .then(response => {
      return response.json();
    })
    .then(({ results, total_results }) => {
      paginator.set('totalResult', total_results);
      if (dblFetch) {
        //Загружаем еще одну страницу
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
            createCardFunc(
              results.slice(
                elmStartRender - 1,
                elmStartRender + elmPerPageOn - 1,
              ),
            );
          });
      } else {
        results.forEach(({ genre_ids }) =>
          genre_ids.forEach(
            (item1, inxex, arr) =>
              (arr[inxex] = genres.find(item2 => item2.id == item1)),
          ),
        );
        createCardFunc(
          results.slice(elmStartRender - 1, elmStartRender + elmPerPageOn - 1),
        );
      }
    });
}

// Функция выбор текущей страницы на пагинаторе и вызов функции отрисовки
function onClickPage(evt) {
  evt.preventDefault();
  switch (evt.target.innerText) {
    case 'Previous':
      pageNumber = paginator.getPaginationData().current - 1;
      break;
    case 'Next':
      pageNumber = paginator.getPaginationData().current + 1;
      break;
    default:
      pageNumber = evt.target.innerText;
  }
  paginator.set('current', pageNumber);
  refs.paging.innerHTML = paginator.render();
  refs.galleryRef.innerHTML = ''; //Стираем данные предыдущей страницы
  fetchPopularMoviesList(pageNumber);
}

// fetch for configuration
// function fetchConfig() {
//   const url =
//     'https://api.themoviedb.org/3/configuration?api_key=a524e22e3630cf24a2e0a24a461145a2';

//   return fetch(url).then(response =>
//     response.json().then(data => console.log(data)),
//   );
// }
// fetchConfig();

// function onOpenModal(event) {
//   const largeImageUrl = event.target;
//   // console.dir(largeImageUrl);
//   // console.log(event.target.dataset.action);
// }

// ---- Runtime ------------------------------------------------

fetchGenres();

// ---- Экспорты ------------------------------------------------

export { createCardFunc, fetchPopularMoviesList, genres };
