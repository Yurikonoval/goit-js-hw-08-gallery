import pictures from './gallery-items.js';

const refs = {
  gallery: document.querySelector(`.js-gallery`),
  lightBox: document.querySelector(`.lightbox`),
  closeBtn: document.querySelector(`[data-action="close-lightbox"]`),
  lightBoxImage: document.querySelector(`.lightbox__image`),
  overlay: document.querySelector(`.lightbox__overlay`),
};

const picturesMarkup = createPictureCardsMarkUp(pictures);

refs.gallery.insertAdjacentHTML('beforeend', picturesMarkup);

refs.gallery.addEventListener(`click`, imageOpen);
refs.closeBtn.addEventListener(`click`, closeModal);
refs.overlay.addEventListener(`click`, closeModal);

function createPictureCardsMarkUp(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join('');
}
function imageOpen(event) {
  event.preventDefault();

  if (!event.target.classList.contains(`gallery__image`)) {
    return;
  }

  refs.lightBox.classList.add(`is-open`);
  console.log(event.target);
  refs.lightBoxImage.src = event.target.dataset.source;
  refs.lightBoxImage.alt = event.target.alt;

  window.addEventListener(`keydown`, onKeyDown);
}
function closeModal(event) {
  refs.lightBox.classList.remove(`is-open`);
  refs.lightBoxImage.src = ``;
  refs.lightBoxImage.alt = ``;
  window.removeEventListener(`keydown`, onKeyDown);
}
function onKeyDown(event) {
  console.log(event.key);
  if (event.key === `Escape`) {
    closeModal();
  } else if (event.key === `ArrowRight`) {
    nextPicture();
  } else if (event.key === `ArrowLeft`) {
    previousPicture();
  }
  return;
}

function nextPicture() {
  for (let i = 0; i <= pictures.length; i += 1) {
    if (refs.lightBoxImage.src === pictures[i].original) {
      refs.lightBoxImage.src = pictures[i + 1].original;
      refs.lightBoxImage.alt = pictures[i + 1].description;
      break;
    }
  }
}
function previousPicture() {
  for (let i = 0; i <= pictures.length; i += 1) {
    if (refs.lightBoxImage.src === pictures[i].original) {
      refs.lightBoxImage.src = pictures[i - 1].original;
      refs.lightBoxImage.alt = pictures[i - 1].description;
      break;
    }
  }
}
