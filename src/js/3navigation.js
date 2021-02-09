import refs from '../js/refs';
import {
  createCardFunc,
  fetchPopularMoviesList,
  startPaginator,
} from './1initialHomePage.js';
import apiServise from './0apiServise.js';

refs.homeBtn.addEventListener('click', activeHomePage);

refs.logo.addEventListener('click', activeHomePage);

refs.headerTitle.addEventListener('click', activeHomePage);

function activeHomePage(event) {
  event.preventDefault();
  apiServise.renderFilms = 1;
  startPaginator();
  refs.galleryRef.innerHTML = ''; //Стираем данные предыдущей страницы
  fetchPopularMoviesList(
    apiServise.pageNumber,
    apiServise.renderFilms,
    apiServise.searchQuery,
  );
  addClassHome();
}

function addClassHome() {
  refs.backgroundHome.classList.remove('header-background-library');
  refs.backgroundHome.classList.add('header-background-home');

  refs.homeBtn.classList.add('active-el');
  refs.myLibraryBtn.classList.remove('active-el');

  refs.inpuForm.classList.remove('is-hidden');
  refs.bntlibrary.classList.add('is-hidden');
}
