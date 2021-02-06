const refs = {
  galleryRef: document.querySelector('.gallery'),
  main: document.querySelector('main'), // ссылка откуда надо брать названия фильмов для локал сторедж
  footer: document.querySelector('footer'),
  myLibraryBtn: document.querySelector('.library'),
  homeBtn: document.querySelector('.home'),
  backgroundHome: document.querySelector('.header-container'),
  bntlibrary: document.querySelector('.form-button-library'),
  inpuForm: document.querySelector('.search-box-home'),
  homeBtn: document.querySelector('.home-link'),
  watchedBtn: document.querySelector('.button-library-active'),
  queueBtn: document.querySelector('.button-library-inactive'),
  inputForm: document.querySelector('.search-box-home'),
  logo: document.querySelector('.logo'),
  genreList: document.querySelector('.film-sign'),
  tileFilm: document.querySelector('.film-element'),
  body: document.querySelector('body'),

  // =====
  modalWindow: document.querySelector('.modal-one-film'),
  contentModal: document.querySelector('.content-modal'),
  oneFilmOwerlay: document.querySelector('.modal-one-film__overlay'),
  //=====

};

export default refs;
