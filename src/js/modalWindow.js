import refs from '../js/refs'
import markupContentModal from '../templates/modalWindow.hbs'
// import {saveFilmToWatched, saveFilmToQueue} from '../js/5libraryPage'
// console.log(refs);



refs.galleryRef.addEventListener('click', openModalWindow)
refs.oneFilmOwerlay.addEventListener('click', closeFilmModal)

// refs.tileFilm.addEventListener('click', openModalWindow)

let idFilmFromDataAction;

function openModalWindow(evt) {
    if (evt.target.nodeName !== "IMG") { // проверяет клик по картинке
        return
    }

    contentHidden()// запрещает пролистывать контент за модалкой

    console.dir(evt.target);

    idFilmFromDataAction = evt.target.attributes[2].nodeValue                 // ID фильма по клику на плитку фильма
    
    fetchMoviesForIdByModal(idFilmFromDataAction)                                   // делает запрос на сервер и добавляет розметку в модалку одного фильма

    refs.modalWindow.classList.add('open')                                          // по добавлению класса открывается модалка
    window.addEventListener('keydown', closeFilmModalESC);                          // закрытие модалка по нажатию на ESC
}

function fetchMoviesForIdByModal(movie_id) {                                        // ищет фильмы по ID и добавляет розметку в gallery
    console.log(movie_id);
  const url =
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a524e22e3630cf24a2e0a24a461145a2`;

    fetch(url)
    .then(response => {
      return response.json();
    })
        .then(results => {
          console.log(results);
          const markup = markupContentModal(results);
            refs. contentModal.insertAdjacentHTML('afterbegin', markup);
            addListenerFromBtn()                                                    // добавляет слушателя на кнопки в модалке
    });
}

function addListenerFromBtn() { 
    const btnAddToWatched = document.querySelector('.add-to-watched');
  const bntAddToQueue = document.querySelector('.add-to-queue');
  
  btnAddToWatched.addEventListener('click', console.log('hi'))

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

function contentHidden(){
    refs.body.classList.add('content-hidden')
}

