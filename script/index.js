import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

import {
  popupImageName,
  popupImageLink,
  initialCards,
  settings,
  cards
} from './utils/constant.js'

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

const profileValidator = new FormValidator(settings, popupForms.editForm)
const cardleValidator = new FormValidator(settings, popupForms.imageForm)

profileValidator.enableValidation()
cardleValidator.enableValidation()

const popupImageNew = new PopupWithImage('.popup_image-view')

const defaultCards = new Section({
  data: initialCards,
  renderer: (item) => {
    return new Card(item, '.card__template', () => popupImageNew.open(item)).generateCard()
  }
 }, cards)

 defaultCards.renderItems()

const editPopupSubmit = new PopupWithForm('.popup_edit-profile', savePopupEdit)
const addPopupSubmit = new PopupWithForm('.popup_add-image', savePopupAdd)
editPopupSubmit.setEventListeners()
addPopupSubmit.setEventListeners()
popupImageNew.setEventListeners() //пришлось вызвать popupImageNew.setEventListeners. Без него не заводится.

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'})

//Сохраняем редактирования профиля
function savePopupEdit(data) {
  const {name, about } = data
  // profileName.textContent = name
  // profileAbout.textContent = about
  userInfo.setUserInfo(name, about)
  new Popup('.popup_edit-profile').close()
}

//Присваиваем изображению значения из input-ов и передаем в функцию создания карточки
function savePopupAdd() {
  const cardData = [{
      name: popupImageName.value,
      link: popupImageLink.value
    }]
  
  new Section({
    data: cardData,
    renderer: (item) => {
      return new Card(item, '.card__template', () => popupImageNew.open(item)).generateCard()
    }
   }, cards).renderItems()

  new Popup('.popup_add-image').close()
  popupImageName.value = ''
  popupImageLink.value = ''
}

//Обработчик для кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
  const {name, about} = userInfo.getUserInfo()
  popupProfileName.value = name
  popupProfileAbout.value = about
  profileValidator.resetValidation()
  new Popup('.popup_edit-profile').open()
})

//Обработчик для кнопки добавления изображения
profileAddButton.addEventListener('click', function() {
  cardleValidator.resetValidation()
  new Popup('.popup_add-image').open()
})

// new Popup(popupCloseButtons).setEventListeners()
 
//Обработчик для кнопки сохранения профиля
// popupEdit.querySelector('.popup__form').addEventListener('submit', savePopupEdit)

//Обработчик для кнопки сохранения изображения
// popupAdd.querySelector('.popup__form').addEventListener('submit', savePopupAdd)