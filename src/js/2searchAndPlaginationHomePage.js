// ---- Импорты -------------------------------------------------------

import refs from './refs.js';

// Доступ к файлу 0apiServise, который дополнительно будет обрабатывать API-запрос
import apiServise from './0apiServise.js';

// доступ к функциям from './1initialHomePage.js'
import { fetchPopularMoviesList, startPaginator } from './1initialHomePage.js';

// ---- Слушатели событий --------------------------------------------
// Для того чтобы работала поисковая строка, сначала вешаем слушателя событий на форму и получаем доступ к тому, что введет пользователь в input, обратившись к  event.target.value и обрабатываем действия в функции searchFilms
refs.inputForm.addEventListener('submit', searchFilms);

// ---- Объявление функций --------------------------------------------

function searchFilms(event) {
  event.preventDefault();
  apiServise.renderFilms = 2;
  startPaginator();
  apiServise.searchQuery = event.currentTarget.elements.query.value;
  refs.galleryRef.innerHTML = ''; //Стираем данные предыдущей страницы
  fetchPopularMoviesList(
    apiServise.pageNumber,
    apiServise.renderFilms,
    apiServise.searchQuery,
  );
  event.currentTarget.elements.query.value = '';
}
