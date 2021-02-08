import refs from '../js/refs'
import templateListOfFilms from '../templates/my-library.hbs';
import { showNotice } from '../js/notification';
import { getArrWatchedFilms, getArrQueueFilms } from '../js/modalWindow'
import apiServise from './0apiServise.js';

// ==========Логика для отрисовки "Просмотренных" фильмов===========

let arrWatchedFilms;                           // масив "Просмотренных фильмов"
let arrQueueFilms;

function fetchMoviesForId(movie_id) {                                   // ищет фильмы по ID и добавляет розметку в gallery
  const url =
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a524e22e3630cf24a2e0a24a461145a2`;

    fetch(url)
    .then(response => {
      return response.json();
    })
        .then(results => {

          const markup = templateListOfFilms(results);
        refs.galleryRef.insertAdjacentHTML('beforeend', markup);
    });
}


function clickBtn(evt) {
    apiServise.renderFilms = 3;                                             // делает розметку в мейн фильмов из локал сторедж "просмотренные"
    activeBorderOn()
    addClassMyLibrary()
    evt.preventDefault();
    refs.galleryRef.innerHTML = ''
    arrWatchedFilms = getArrWatchedFilms()
    fetchMoviesFromLocalStorage()
}

refs.myLibraryBtn.addEventListener('click', clickBtn)
refs.queueBtn.addEventListener('click', activeBtnQueue)
refs.watchedBtn.addEventListener('click', activeBtnWatched)



function addClassMyLibrary() {                                          // добавляет/убирает классы в хедере для правильной отрисовки 
    refs.backgroundHome.classList.remove('header-background-home');
    refs.backgroundHome.classList.add('header-background-library');

    refs.bntlibrary.classList.remove('is-hidden');
    refs.inpuForm.classList.add('is-hidden');
}

function activeBorderOn() {                                             //   добавляет/убирает подчеркивание на HOME и MY LIBRERY 
    refs.homeBtn.classList.toggle('active-el')
    refs.myLibraryBtn.classList.toggle('active-el')

}

function activeBtnQueue(evt) {                                          //добавляет/убирает классы для кнопок в MY LIBRERY
    evt.preventDefault();
    refs.watchedBtn.classList.remove('active-btn')
    refs.queueBtn.classList.add('active-btn')
    refs.galleryRef.innerHTML = ''
    arrQueueFilms = getArrQueueFilms()
    if (arrQueueFilms.length === 0) {
        const message = 'Add movies'
        showNotice(message)
    } else {
        arrQueueFilms.map(film => {
        fetchMoviesForId(film)
    })
    }
}

function activeBtnWatched(evt) {                                        // при нажатии на кнопку Watched делает ее активной и добавляет розметку
    evt.preventDefault();
    refs.queueBtn.classList.remove('active-btn')
    refs.watchedBtn.classList.add('active-btn')
    refs.galleryRef.innerHTML = ''
    fetchMoviesFromLocalStorage()
}


function fetchMoviesFromLocalStorage() {                                // делает fetch на каждый id фильма из масива в local storege watched
    if (arrWatchedFilms.length === 0) {
        const message = 'Add movies'
        showNotice(message)
    }
    arrWatchedFilms.map(film => {
        fetchMoviesForId(film)
    })
}


