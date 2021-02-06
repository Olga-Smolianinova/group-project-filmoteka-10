import markupFooter from '../html/footer.html';

import refs from './refs.js';


refs.footer.insertAdjacentHTML('afterbegin', markupFooter);

// =====================================>
const openModalRef = document.querySelector('.link-modal');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxRef = document.querySelector('.lightbox');

openModalRef.addEventListener('click', onOpenModal);
lightboxOverlayRef.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  lightboxRef.classList.add('is-open');
    refs.body.classList.add('content-hidden')

  window.addEventListener('keydown', onCloseModalESC);
}

function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  refs.body.classList.remove('content-hidden')
  window.removeEventListener('keydown', onCloseModalESC);
}

function onCloseModalESC(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
