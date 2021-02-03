//  получаем доступ к шаблону для отображения списка фильмов
import templateListOfFilms from '../templates/list-films.hbs';
import refs from '../js/refs';

// 1.2) 1initialHomePage.js:

// - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться в запросе при плагинации);
// - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li
//    согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом
//    false так как фильм из библиотеки(смотри пункт “3) ” создание activeDetailsPage);
// - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber)
//    в которой используется createCardFunc результат используя fragment кладем в ul,
//    и не забываем заполнить этими же данными переменную renderFilms(она понадобится в работе следующим участникам);
// - создаем функцию fetchGenres которая забирает жанры и кладет их в переменную genres (массив объектов)
//    (она понадобится в работе следующим участникам);
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
      // console.log(genres);
      fetchPopularMoviesList();
    });
}
fetchGenres();

// document
//   .querySelector('.button-test')
//   .addEventListener('click', () => console.log(genres));

// fetch запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
function fetchPopularMoviesList() {
  const url =
    'https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2';

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(({ results }) => {
      results.forEach(({ genre_ids }) =>
        genre_ids.forEach(
          (item1, inxex, arr) =>
            (arr[inxex] = genres.find(item2 => item2.id == item1)),
        ),
      );
      // .map(item2 => item2 * 10));
      // const aa = results.map(item => 10);
      console.log(results);

      // createCardFunc(results);
      // return results

      // test======для верстки MobileFirst====================
      arrQuantity(results);
    });
  // =====================================================
}

// Функция для отрисовки количество картинок на странице, в зависимости от ширины экрана
function arrQuantity(results) {
  const mobileArr = results.slice(0, 4);
  // console.log(mobileArr);
  const tabletArr = results.slice(0, 8);
  // console.log(tabletArr);
  const desktopArr = results.slice(0, 9);
  // console.log(desktopArr);

  // console.log(innerWidth);
  // console.log(visualViewport.width); //visualViewport.width

  if (innerWidth >= 1024) {
    createCardFunc(desktopArr);
  } else if (innerWidth >= 768 && innerWidth <= 1023) {
    createCardFunc(tabletArr);
  } else {
    createCardFunc(mobileArr);
  }
}

// СЛУШАТЕЛИ СОБЫТИЙ
// для открытия и закрытия модального окна вешаем слушателя событий на родителя li - это ul -refs.container
// const onGalleryClick = refs.galleryRef.addEventListener('click', onOpenModal);

// function onOpenModal(event) {
//   const largeImageUrl = event.target;
//   console.log(largeImageUrl);
//   console.log(event.target.dataset.action);
// }

