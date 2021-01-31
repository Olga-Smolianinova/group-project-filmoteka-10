import markupFilms from '../html/myFilmLibraryPage.html';
import refs from '../js/refs'

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
    return
}

function getArrQueueFilms() { // получает масив из локал сторедж
    if (localStorage.getItem('queue')) {
        const arrString = localStorage.getItem('queue');
        const arrPars = JSON.parse(arrString);
        return arrQueueFilms = [...arrPars]
    }
    return
}

// ==========Логика для отрисовки "Просмотренных" фильмов===========

// const arrArrWatchedFilms = getArrWatchedFilms();// масив "Просмотренных фильмов"
// console.log(arrArrWatchedFilms);


