import FormValidator from '../FormValidator.js'
import Card from '../Card.js'
import Section from '../Section.js'
import PopupWithImage from '../PopupWithImage.js'
import PopupWithForm from '../PopupWithForm.js'
import UserInfo from '../UserInfo.js'
import {api} from '../Api.js'

import {
  popupImageName,
  popupImageLink,
  settings,
  cards
} from '../utils/constant.js'

import css from '../../pages/index.css'

let userID

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    userID = res._id
  })

api.getAvatar()
  .then(res => {
    userInfo.setAvatar(res.avatar)
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const cardData = {
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userID: userID,
        ownerID: data.owner._id
      }
      cardsContainer.addItem(renderCard(cardData))
    })
  })

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const avatarEditButton = document.querySelector('.profile__avatar')
const popupProfileName = document.querySelector('.popup__input_profile_name')
const popupProfileAbout = document.querySelector('.popup__input_profile_about')

const popupForms = {
  editForm: document.forms.editForm,
  imageForm: document.forms.imageForm,
  avatarForm: document.forms.avatarForm
}

const profileValidator = new FormValidator(settings, popupForms.editForm)
const cardleValidator = new FormValidator(settings, popupForms.imageForm)
const avatarValidator = new FormValidator(settings, popupForms.avatarForm)

const editPopupSubmit = new PopupWithForm('.popup_edit-profile', savePopupEdit)
const addPopupSubmit = new PopupWithForm('.popup_add-image', savePopupAdd)
const popupImageNew = new PopupWithImage('.popup_image-view')
const popupConfirmDelete = new PopupWithForm('.popup_confirm-delete')
const popupAvatar = new PopupWithForm('.popup_update-avatar', savePopupAvatar)

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
  profileAvatarSelector: '.profile__avatar'
  })

profileValidator.enableValidation()
cardleValidator.enableValidation()
avatarValidator.enableValidation()

editPopupSubmit.setEventListeners()
addPopupSubmit.setEventListeners()
popupImageNew.setEventListeners()
popupConfirmDelete.setEventListeners()
popupAvatar.setEventListeners()

function renderCard(item) {
   const card = new Card(item, '.card__template', () => popupImageNew.open(item), (id) => {
    popupConfirmDelete.open()
    popupConfirmDelete.changeSubmitHandler(() => {
      api.deleteCard(id)
        .then(res => {
          card.deleteCard()
          popupConfirmDelete.close()
          console.log(res)
        })
    })
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
      .then(res => {
        card.setLikes(res.likes)
      })
    } else {
      api.setLike(id)
      .then(res => {
        card.setLikes(res.likes)
      })
    }
  }
  )
  return card.generateCard()
}

const cardsContainer = new Section({ data: [], renderer: renderCard }, cards)
cardsContainer.renderItems()

function savePopupAvatar(data) {
  popupAvatar.renderLoading(true)
  api.updateAvatar(data['update-avatar'])
    .then(res => {
      userInfo.setAvatar(res.avatar)
      popupAvatar.close()
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
    })
}

//Сохраняем редактирования профиля
function savePopupEdit(data) {
  editPopupSubmit.renderLoading(true)
  const {name, about } = data
  console.log(data)

api.editProfile(name, about)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    editPopupSubmit.close()
  })
  .finally(() => {
    editPopupSubmit.renderLoading(false)
  })
  
}

//Присваиваем изображению значения из input-ов и передаем в функцию создания карточки
function savePopupAdd(data) {
  addPopupSubmit.renderLoading(true)
  api.addCard(data['image-name'], data['image-link'])
    .then(res => {
      const cardData = {
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userID: userID,
        ownerID: res.owner._id
      }
      cardsContainer.addItem(renderCard(cardData))
      addPopupSubmit.close()
      popupImageName.value = ''
      popupImageLink.value = ''
    })
    .finally(() => {
      addPopupSubmit.renderLoading(false)
    })
}

//Обработчик для кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
  const {name, about} = userInfo.getUserInfo()
  popupProfileName.value = name
  popupProfileAbout.value = about
  profileValidator.resetValidation()
  editPopupSubmit.open()
})

//Обработчик для кнопки добавления изображения
profileAddButton.addEventListener('click', function() {
  cardleValidator.resetValidation()
  addPopupSubmit.open()
})

avatarEditButton.addEventListener('click', function() {
  userInfo.getAvatar()
  avatarValidator.resetValidation()
  popupAvatar.open()
})