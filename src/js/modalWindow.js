import refs from '../js/refs'
import markupContentModal from '../templates/modalWindow.hbs'
import { showNotice } from '../js/notification';

let arrWatchedFilms = [];
let arrQueueFilms = [];
let idFilmFromDataAction;
let modalWatchedBtnRefs;
let modalQueueBtnRefs;



refs.galleryRef.addEventListener('click', openModalWindow)
refs.oneFilmOwerlay.addEventListener('click', closeFilmModal)



function openModalWindow(evt) {
    if (evt.target.nodeName !== "IMG") {                                            // проверяет клик по картинке
        return
    }

    contentHidden()

    idFilmFromDataAction = evt.target.attributes[2].nodeValue                       // ID фильма по клику на плитку фильма
    
    fetchMoviesForIdByModal(idFilmFromDataAction)                                   // делает запрос на сервер и добавляет розметку в модалку одного фильма

    refs.modalWindow.classList.add('open')                                          // по добавлению класса открывается модалка
    window.addEventListener('keydown', closeFilmModalESC);                          // закрытие модалка по нажатию на ESC
// -----------------------------  // 
}


function checkBtn() {                                                               // проверяет наличие ID фильма в локал сторедж и добавляет клас активной кнопки
  const arrWatchedFilms = getArrWatchedFilms()
  const arrQueueFilms = getArrQueueFilms()

  if (arrWatchedFilms.includes(idFilmFromDataAction)) {
     modalWatchedBtnRefs.classList.add('modal-active-btn')
  }

  if (arrQueueFilms.includes(idFilmFromDataAction)) {
    modalQueueBtnRefs.classList.add('modal-active-btn')
  }
}

function fetchMoviesForIdByModal(movie_id) {                                        // ищет фильмы по ID и добавляет розметку в gallery
  const url =
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a524e22e3630cf24a2e0a24a461145a2`;

    fetch(url)
    .then(response => {
      return response.json();
    })
        .then(results => {
          const markup = markupContentModal(results);
          refs.contentModal.insertAdjacentHTML('afterbegin', markup);
          
          modalWatchedBtnRefs = document.querySelector('.add-to-watched');
          modalQueueBtnRefs = document.querySelector('.add-to-queue');
          checkBtn()
    });
}



function closeFilmModal() {
    refs.modalWindow.classList.remove('open')
    window.removeEventListener('keydown', closeFilmModalESC);
    refs.contentModal.innerHTML = ''
    refs.body.classList.remove('content-hidden')
}

function closeFilmModalESC(evt) {
    if (evt.code === 'Escape') {
    closeFilmModal();
  }
}

function contentHidden(){                               // запрещает пролистывать контент за модалкой
    refs.body.classList.add('content-hidden')
}

refs.modalWindow.addEventListener('click', (evt) => {
  if (evt.target.nodeName !== "BUTTON") {               // проверяет клик по какой кнопке
        return
  }
  if (evt.toElement.classList[1] === 'add-to-watched') {
    modalWatchedBtnRefs.classList.toggle('modal-active-btn')


    if (checkClassFromWatchedBtn() === -1) {
      const arr = getArrWatchedFilms()
      const filterFromId = arr.filter(film => film !== idFilmFromDataAction)
      const stringArr = JSON.stringify(filterFromId)
      localStorage.setItem('watched', stringArr)
      return
    }


    const arr = getArrWatchedFilms()
    const check = arr.includes(idFilmFromDataAction)

    if (check) {                                        // проверяет на наличие ID  фильма в локал сторедж
      showNotice('Фильм уже находится в библиотеке')
      return
    }
    saveFilmToWatched()
  }

  if (evt.toElement.classList[1] === 'add-to-queue') {
    modalQueueBtnRefs.classList.toggle('modal-active-btn')

    
    if (checkClassFromQueueBtn() === -1) {
      const arr = getArrQueueFilms()
      const filterFromId = arr.filter(film => film !== idFilmFromDataAction)
      const stringArr = JSON.stringify(filterFromId)
      localStorage.setItem('queue', stringArr)
      return
    }

    const arr = getArrQueueFilms()
    const check = arr.includes(idFilmFromDataAction)
    if (check) {                                        // проверяет на наличие ID  фильма в локал сторедж
      showNotice('Фильм уже находится в библиотеке')
      return
    }
    
    saveFilmToQueue()
  }
})

function checkClassFromQueueBtn() {
      return modalQueueBtnRefs.getAttribute("class").indexOf("modal-active-btn")
}

function checkClassFromWatchedBtn() {
      return modalWatchedBtnRefs.getAttribute("class").indexOf("modal-active-btn")
}



// ================= Watched films

function getArrWatchedFilms() {                         // получает масив фильмов добавленных в "Просмотренные" из локал сторедж
    if (localStorage.getItem('watched')) {
        const arrString = localStorage.getItem('watched');
        const arrPars = JSON.parse(arrString);
        return arrWatchedFilms = [...arrPars]
    }
    return []
}

function makeStringWatched(idFilm) {                     //функцыя получает значение idFilm помещает его в масив и возвращает строку для локал сторедж
    arrWatchedFilms.push(idFilm)
    return JSON.stringify(arrWatchedFilms)
}

function saveFilmToWatched() {                           // записывает id фильма в локал сторедж "Просмотренные"
  const stringId = makeStringWatched(idFilmFromDataAction)  
  localStorage.setItem('watched', `${stringId}`)
  // closeFilmModal()
  // modalWatchedBtnRefs.classList.add('modal-active-btn')
  showNotice('Фильм добавлен')
}



// =================== Queue films

function getArrQueueFilms() {                           // получает масив фильмов добавленных в "Добавленных в очередь" из локал сторедж
    if (localStorage.getItem('queue')) {
        const arrString = localStorage.getItem('queue');
        const arrPars = JSON.parse(arrString);
        return arrQueueFilms = [...arrPars]
    }
    return []
}

function makeStringQueue(idFilm) {                       //функцыя получает значение idFilm помещает его в масив и возвращает строку для локал сторедж
    arrQueueFilms.push(idFilm)
    return JSON.stringify(arrQueueFilms)
}

function saveFilmToQueue() {                              // записывает id фильма в локал сторедж "Добавленных в очеридь"
  const stringId = makeStringQueue(idFilmFromDataAction)  
  localStorage.setItem('queue', `${stringId}`)
  // closeFilmModal()
  // modalQueueBtnRefs.classList.add('modal-active-btn')
  showNotice('Фильм добавлен')
}

// =======================



export {getArrWatchedFilms, getArrQueueFilms}

