export const popupImageFullView = document.querySelector('.popup__image-full')
export const popupImageTitle = document.querySelector('.popup__image-title')
export const imagePopup = document.querySelector('.popup_image-view')
export const popupCloseButtons = document.querySelectorAll('.popup__close')

export const popupImageName = document.querySelector('.popup__input_image_name')
export const popupImageLink = document.querySelector('.popup__input_image_link')

export const cards = document.querySelector('.cards')

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

export const initialCards = [
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