const popupImageFullView = document.querySelector('.popup__image-full')
const popupImageTitle = document.querySelector('.popup__image-title')
const imagePopup = document.querySelector('.popup_image-view')

function openPopup(popup) {
  popup.classList.add('popup_enable');
  document.addEventListener('keydown', closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_enable');
  document.removeEventListener('keydown', closeWithEscape);
}

const closeWithEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_enable')
    closePopup(openedPopup)
  }
}

export {
  popupImageFullView,
  popupImageTitle,
  imagePopup,
  openPopup,
  closeWithEscape,
  closePopup
}