const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close')
const popupName = document.querySelector('.popup__input_place_name')
const popupAbout = document.querySelector('.popup__input_place_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

function openPopup() {
  popup.classList.add('popup_enable')
  popupName.value = profileName.textContent
  popupAbout.value = profileAbout.textContent
}

function closePopup(close) {
  popup.classList.remove('popup_enable')
}

function savePopup (evt) {
  evt.preventDefault();
  
  profileName.textContent = popupName.value
  profileAbout.textContent = popupAbout.value
  closePopup()
}
    
profileEditButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', savePopup)


// popup.addEventListener('click', function (event) {
  //   if (event.target === event.currentTarget) {
    //     closePopup ()
    //   }
    // })