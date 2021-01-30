import markupFooter from '../html/footer.html';
// console.log(markupFooter);

const refs = {
  footer: document.querySelector('footer'),
};
console.log(refs);
refs.footer.insertAdjacentHTML('afterend', markupFooter);

// =====================================>
const openModalRef = document.querySelector('.link-modal');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxButtonRef = document.querySelector('.lightbox__button');
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
