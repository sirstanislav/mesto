const popup = document.querySelector('.popup')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close')
const popupSaveButton = document.querySelector('.popup__save')
const popupName = document.querySelector('.popup__name')
const popupAbout = document.querySelector('.popup__about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')


function openPopup() {
  popup.classList.add('popup_enable')
  popupName.value = profileName.textContent
  popupAbout.value = profileAbout.textContent
}
profileEditButton.addEventListener('click', openPopup)


function closePopup(close) {
  popup.classList.remove('popup_enable')
}
popupCloseButton.addEventListener('click', closePopup)


popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup ()
  }
})


function savePopup (evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value
  profileAbout.textContent = popupAbout.value
  closePopup()
}
popup.addEventListener('submit', savePopup)