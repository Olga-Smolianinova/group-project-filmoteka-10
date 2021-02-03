
// import { from } from 'core-js/fn/array';
import markupFilms from '../html/myFilmLibraryPage.html';
import refs from '../js/refs'
import templateListOfFilms from '../templates/my-library.hbs';
import showNot from '../js/notification';
// import showError from '../js/notification';



// ---------------------------
refs.main.insertAdjacentHTML('afterend', markupFilms)// тестовая розметка для фильмов
// ---------------------------


// ======Логика дял добавления "просмотренных" и "Добавленых в просмотр" фильмов в local Storage=============
const btnAddToWatched = document.querySelector('.add-to-watched');// кнопка добавить в "Просмотренные "
const bntAddToQueue = document.querySelector('.add-to-queue'); // кнопка добавить в "Сотреть позже"
   
let arrWatchedFilms = [];
let arrQueueFilms = [];

getArrWatchedFilms();
getArrQueueFilms();

btnAddToWatched.addEventListener('click', saveFilmToWatched)
bntAddToQueue.addEventListener('click', saveFilmToQueue)

function saveFilmToWatched(evt) { // записывает id фильма в локал сторедж "Просмотренные"
    evt.preventDefault();
    const stringArr = makeStringWatched()
    localStorage.setItem('watched', `${stringArr}`)
}

function saveFilmToQueue(evt) {// записывает id фильма в локал сторедж "Смотреть позже"
    evt.preventDefault();
    const stringArr = makeStringQueue()
    localStorage.setItem('queue', `${stringArr}`)
    
}

function getWatchedFilmId() { // получает значение id фильма "Просмотренные"
    return btnAddToWatched.getAttribute("data-idFilm")
}

function getQueueFilmId() {// получает значение id фильма "Смотреть позже"
    return bntAddToQueue.getAttribute("data-idFilm")
}
 
function makeStringWatched() { //функцыя получает значение data-idFilm помещает его в масив и возвращает строку для локал сторедж
    const idFilm = getWatchedFilmId();
    console.log(idFilm);
    arrWatchedFilms.push(idFilm)
    return JSON.stringify(arrWatchedFilms)
}

function makeStringQueue() { //функцыя получает значение data-idFilm помещает его в масив и возвращает строку для локал сторедж
    const idFilm = getQueueFilmId();
    console.log(idFilm);
    arrQueueFilms.push(idFilm)
    return JSON.stringify(arrQueueFilms)
}

function getArrWatchedFilms() { // получает масив из локал сторедж
    if (localStorage.getItem('watched')) {
        const arrString = localStorage.getItem('watched');
        const arrPars = JSON.parse(arrString);
        return arrWatchedFilms = [...arrPars]
    }
    
    return []
}

function getArrQueueFilms() { // получает масив из локал сторедж
    if (localStorage.getItem('queue')) {
        const arrString = localStorage.getItem('queue');
        const arrPars = JSON.parse(arrString);
        return arrQueueFilms = [...arrPars]
    }
    return []
}

// ==========Логика для отрисовки "Просмотренных" фильмов===========


const arrArrWatchedFilms = getArrWatchedFilms();// масив "Просмотренных фильмов"

function fetchMoviesForId(movie_id) {// ищет фильмы по ID и добавляет розметку в gallery
    console.log(movie_id);
  const url =
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a524e22e3630cf24a2e0a24a461145a2`;

    fetch(url)
    .then(response => {
      return response.json();
    })
        .then(results => {
          console.log(results);
          const markup = templateListOfFilms(results);
        refs.galleryRef.insertAdjacentHTML('beforeend', markup);
    });
}

function clickBtn(evt) {// делает розметку в мейн фильмов из локал сторедж "просмотренные"
    activeBorderOn()
    addClassMyLibrary()
    evt.preventDefault();
    refs.galleryRef.innerHTML = ''
    fetchMoviesFromLocalStorage()
}

refs.myLibraryBtn.addEventListener('click', clickBtn)
refs.queueBtn.addEventListener('click', activeBtnQueue)
refs.watchedBtn.addEventListener('click', activeBtnWatched)


function addClassMyLibrary() { // добавляет/убирает классы в хедере для правильной отрисовки 
    refs.backgroundHome.classList.remove('header-background-home');
    refs.backgroundHome.classList.add('header-background-library');

    refs.bntlibrary.classList.remove('is-hidden');
    refs.inpuForm.classList.add('is-hidden');
}

function activeBorderOn() { //   добавляет/убирает подчеркивание на HOME и MY LIBRERY 
    // evt.preventDefault();
    refs.homeBtn.classList.toggle('active-el')
    refs.myLibraryBtn.classList.toggle('active-el')
}

function activeBtnQueue(evt) { //добавляет/убирает классы для кнопок в MY LIBRERY
    evt.preventDefault();
    refs.watchedBtn.classList.remove('active-btn')
    refs.queueBtn.classList.add('active-btn')
    refs.galleryRef.innerHTML = ''
    // console.log(arrArrWatchedFilms);
    arrQueueFilms.map(film => {
        fetchMoviesForId(film)
    })
}

function activeBtnWatched(evt) { // при нажатии на кнопку Watched делает ее активной и добавляет розметку
    // clickBtn()
    evt.preventDefault();
    refs.queueBtn.classList.remove('active-btn')
    refs.watchedBtn.classList.add('active-btn')
    refs.galleryRef.innerHTML = ''
    fetchMoviesFromLocalStorage()
}

function fetchMoviesFromLocalStorage() { // делает fetch на каждый id фильма из масива в local storege watched
    arrArrWatchedFilms.map(film => {
        fetchMoviesForId(film)
    })
}

