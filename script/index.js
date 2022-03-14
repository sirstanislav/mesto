import {
  FormValidator } from './FormValidator.js'

import {
  openPopup,
  closePopup } from './shareFunctions.js'

  import {
    Card
  } from './Card.js'

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80'
  },
  {
    name: 'Конакова',
    link: 'https://images.unsplash.com/photo-1608132809707-8f82cda0879c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Ольхо́н',
    link: 'https://images.unsplash.com/photo-1614357932292-a38393b966a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Осетия',
    link: 'https://images.unsplash.com/photo-1612719734820-81784b7e6573?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1637912725667-291b85cf1850?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2789&q=80'
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1634715107433-d9e3403f5bc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
];

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const popupForms = {
  editForm: document.forms.editForm,
  imageForm: document.forms.imageForm
}

const popupEdit = document.querySelector('.popup_edit-profile')
const popupAdd = document.querySelector('.popup_add-image')
const popupCloseButtons = document.querySelectorAll('.popup__close')

const popupProfileName = document.querySelector('.popup__input_profile_name')
const popupProfileAbout = document.querySelector('.popup__input_profile_about')
const popupImageName = document.querySelector('.popup__input_image_name')
const popupImageLink = document.querySelector('.popup__input_image_link')

const cards = document.querySelector('.cards')

const profileValidator = new FormValidator(settings, popupForms.editForm)
const cardleValidator = new FormValidator(settings, popupForms.imageForm)

profileValidator.enableValidation()
cardleValidator.enableValidation()

//Инициализируем карточки из массива
function renderinitialCards() {
  initialCards.forEach(addCardAppend);
}
renderinitialCards()

//Готовые карточки добавляем в конец DOM
function addCardAppend(data) {
  cards.append(createCard(data))
}

//Готовые карточки добавляем в начало DOM
function addCardPrepend(data) {
  cards.prepend(createCard(data))
}

function createCard(data) {
  return new Card(data, '.card__template').generateCard()
}

//Сохраняем редактирования профиля
function savePopupEdit(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value
  profileAbout.textContent = popupProfileAbout.value
  closePopup(popupEdit)
}

//Присваиваем изображению значения из input-ов и передаем в функцию создания карточки
function savePopupAdd(event) {
  event.preventDefault();
  const cardData = {
    name: popupImageName.value,
    link: popupImageLink.value
  }
  addCardPrepend(cardData)
  closePopup(popupAdd);
  popupImageName.value = ''
  popupImageLink.value = ''

  // const disabled = popupAdd.querySelector('.popup__save')
  // disabled.setAttribute('disabled', true)
  // disabled.classList.add('popup__save_disabled')


}

//Обработчик для кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
  popupProfileName.value = profileName.textContent
  popupProfileAbout.value = profileAbout.textContent
  profileValidator.resetValidation()
  openPopup(popupEdit)
})

//Обработчик для кнопки добавления изображения
profileAddButton.addEventListener('click', function() {
  cardleValidator.resetValidation()
  openPopup(popupAdd)
  
})

//Кнопки закрытия Pop-up
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup')
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup__close') || event.target === event.currentTarget) {
      closePopup(popup)
    }
  })
});

//Обработчик для кнопки сохранения профиля
popupEdit.querySelector('.popup__form').addEventListener('submit', savePopupEdit)

//Обработчик для кнопки сохранения изображения
popupAdd.querySelector('.popup__form').addEventListener('submit', savePopupAdd)