const refs = {
  logo: document.querySelector('.logo'),
  headerTitle: document.querySelector('.title'),
  homeBtn: document.querySelector('.home'),
  backgroundHome: document.querySelector('.header-container'),

  galleryRef: document.querySelector('.gallery'),
  main: document.querySelector('main'), // ссылка откуда надо брать названия фильмов для локал сторедж

  paging: document.querySelector('.paging'),

  footer: document.querySelector('footer'),
  myLibraryBtn: document.querySelector('.library'),
  bntlibrary: document.querySelector('.form-button-library'),
  inpuForm: document.querySelector('.search-box-home'),
  homeBtn: document.querySelector('.home-link'),
  watchedBtn: document.querySelector('.button-library-active'),
  queueBtn: document.querySelector('.button-library-inactive'),
  inputForm: document.querySelector('.search-box-home'),
  searchErr: document.querySelector('.is-hidden'),

  tileFilm: document.querySelector('.film-element'),
  body: document.querySelector('body'),

  // =====
  modalWindow: document.querySelector('.modal-one-film'),
  contentModal: document.querySelector('.content-modal'),
  oneFilmOwerlay: document.querySelector('.modal-one-film__overlay'),
  //=====
};

// console.log(refs);
export default refs;
