import markupFooter from '../html/footer.html';

import refs from './refs.js';

refs.footer.insertAdjacentHTML('afterend', markupFooter);

// =====================================>
const openModalRef = document.querySelector('.link-modal');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxRef = document.querySelector('.lightbox');

openModalRef.addEventListener('click', onOpenModal);
lightboxOverlayRef.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  lightboxRef.classList.add('is-open');
  window.addEventListener('keydown', onCloceModalESC);
}

function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  window.removeEventListener('keydown', onCloceModalESC);
}

function onCloceModalESC(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
