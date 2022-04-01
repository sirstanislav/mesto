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

import css from '../pages/index.css'

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const popupProfileName = document.querySelector('.popup__input_profile_name')
const popupProfileAbout = document.querySelector('.popup__input_profile_about')

const popupForms = {
  editForm: document.forms.editForm,
  imageForm: document.forms.imageForm
}

const profileValidator = new FormValidator(settings, popupForms.editForm)
const cardleValidator = new FormValidator(settings, popupForms.imageForm)
const editPopupSubmit = new PopupWithForm('.popup_edit-profile', savePopupEdit)
const addPopupSubmit = new PopupWithForm('.popup_add-image', savePopupAdd)
const popupImageNew = new PopupWithImage('.popup_image-view')
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'})

profileValidator.enableValidation()
cardleValidator.enableValidation()
editPopupSubmit.setEventListeners()
addPopupSubmit.setEventListeners()
popupImageNew.setEventListeners() //пришлось вызвать popupImageNew.setEventListeners. Без него не заводится.

const defaultCards = new Section({
  data: initialCards,
  renderer: (item) => {
    return new Card(item, '.card__template', () => popupImageNew.open(item)).generateCard()
  }
 }, cards)

 defaultCards.renderItems()

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