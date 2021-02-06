import refs from '../js/refs';
import { createCardFunc, fetchPopularMoviesList } from './1initialHomePage.js';

refs.homeBtn.addEventListener('click', activeHomePage);
refs.logo.addEventListener('click', activeHomePage);

function activeHomePage(event) {
  event.preventDefault();
  refs.galleryRef.innerHTML = '';
  createCardFunc();
  fetchPopularMoviesList();
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
