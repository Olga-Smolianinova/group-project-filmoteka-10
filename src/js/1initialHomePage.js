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
import apiServise from './0apiServise.js'; // Глобальные переменные

// доступ к функция showError() и showNotice() из notificaion.js для вывода сообщения о некорректном запросе и уведомлении
import { showError, showNotice } from './notification.js';

// ---- Глобальные переменные и объекты ----------------------------------------

let genres; //Массив жанров
let tekPageOnAPI = 1; //Текущая страница API запроса
let elmStartRender = 1; //С какого элемента API-страницы отображать страницу на экране
let dblFetch = false; //надо ли загружать с API еще одну страницу
let url1 = ''; //url для функции fetch (I запрос)
let url2 = ''; //url для функции fetch (II запрос)

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
      fetchPopularMoviesList(
        apiServise.pageNumber,
        apiServise.renderFilms,
        apiServise.searchQuery,
      );
    });
}

// Функция fetch-запрос  для создания коллекции фильмов на главной странице
function fetchPopularMoviesList(pageNumber, renderFilms, searchQuery) {
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

  // Определяем url для функции fetch
  if (renderFilms === 1) {
    // Популярные фильмы
    url1 = `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${tekPageOnAPI}`;
    url2 = `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${
      tekPageOnAPI + 1
    }`;
  } else if (renderFilms === 2) {
    // Поиск по ключевому слову
    url1 = `https://api.themoviedb.org/3/search/movie?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${tekPageOnAPI}&query=${searchQuery}`;
    url2 = `https://api.themoviedb.org/3/search/movie?api_key=a524e22e3630cf24a2e0a24a461145a2&page=${
      tekPageOnAPI + 1
    }&query=${searchQuery}`;
  }

  fetch(url1)
    .then(response => {
      return response.json();
    })
    .then(({ results, total_results }) => {
      paginator.set('totalResult', total_results); // Меняем свойство пагинатора
      // console.log(total_results);

      // Если total_results =0 выводить красную фигню
      if (total_results === 0) {
        throw new Error('Error fetching data'); //прописываем для того чтобы лучше отловить ошибки. В случае, если данные по запросу отсутствуют и  вернулся [], ошибка ловится в catch
        return;
      }

      if (dblFetch) {
        //Загружаем еще одну страницу
        fetch(url2)
          .then(response => {
            return response.json();
          })
          .then(({ results: results1 }) => {
            results.push.apply(results, results1);
            finRender(results, elmPerPageOn);
          });
      } else {
        finRender(results, elmPerPageOn);
      }
    })
    .catch(error => {
      if (error) {
        refs.searchErr.classList.remove('is-hidden');
        // виклик  hideError, щоб cховати повідомлення про помилку
        const timerId = setTimeout(hideError, 3000);
        showNotice('Please, enter your request!');
      } else {
        showError('Oops! Something went wrong. Try again.');
      }
    });
}
// cховати повідомлення про помилку
function hideError() {
  refs.searchErr.classList.add('is-hidden');
  // fetchPopularMoviesList();
}

// Функция изменяет на странице отображение жанров (с числа на описание),
//   отправка массива на отрисовку и перересовка пагинатора
function finRender(results, elmPerPageOn) {
  results.forEach(({ genre_ids }, inxex, arr) => {
    genre_ids.forEach(
      (item1, inxex, arr) =>
        (arr[inxex] = genres.find(item2 => item2.id == item1)),
    );
    arr[inxex].release_date =
      typeof arr[inxex].release_date === 'string'
        ? arr[inxex].release_date.slice(0, 4)
        : arr[inxex].release_date;
  });
  createCardFunc(
    results.slice(elmStartRender - 1, elmStartRender + elmPerPageOn - 1),
  );
  refs.paging.innerHTML = paginator.render();
}

// Функция выбор текущей страницы на пагинаторе и вызов функции отрисовки
function onClickPage(evt) {
  evt.preventDefault();
  switch (evt.target.innerText) {
    case 'Previous':
      apiServise.pageNumber = paginator.getPaginationData().current - 1;
      break;
    case 'Next':
      apiServise.pageNumber = paginator.getPaginationData().current + 1;
      break;
    default:
      apiServise.pageNumber = evt.target.innerText;
  }
  paginator.set('current', apiServise.pageNumber);
  refs.galleryRef.innerHTML = ''; //Стираем данные предыдущей страницы
  if (apiServise.renderFilms === 1 || apiServise.renderFilms === 2) {
    fetchPopularMoviesList(
      apiServise.pageNumber,
      apiServise.renderFilms,
      apiServise.searchQuery,
    );
  } else {
    // fetchPopularMoviesList(
    //   apiServise.pageNumber,
    //   apiServise.renderFilms,
    //   apiServise.searchQuery,
    // );
    // Вставить функцию Олега
  }
}

//Функция сброса пагинатора
function startPaginator() {
  apiServise.pageNumber = 1;
  paginator.set('current', apiServise.pageNumber);
}

// ---- Runtime ------------------------------------------------

fetchGenres();

// ---- Экспорты ------------------------------------------------

export { createCardFunc, fetchPopularMoviesList, startPaginator };
