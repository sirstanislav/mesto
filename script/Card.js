import {
  popupImageFullView,
  popupImageTitle,
  imagePopup,
  openPopup 
} from './shareFunctions.js'

export class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data
    this._createElement = document.querySelector(cardTemplateSelector).content.querySelector('.card').cloneNode(true)
    this._like = this._createElement.querySelector('.card__navigation-like')
  }

  //Функция создания карточки и добавления к ним обработчиков событий
  createCard() {
    this._cardImage = this._createElement.querySelector('.card__image')
    this._cardNavigationTitle = this._createElement.querySelector('.card__navigation-title')
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardNavigationTitle.textContent = this._data.name;
    this._addListeners()
    return this._createElement
  }

  //Обработчики событий для карточки которые передаются в функцию создания карточки
  _addListeners() {
    this._createElement.querySelector('.card__navigation-like').addEventListener('click', this._likeCard)
    this._createElement.querySelector('.card__delete').addEventListener('click', this._deleteCard)
    this._cardImage.addEventListener('click', this._openImage)
  }

  _likeCard = () => {
    this._like.classList.toggle('card__navigation-like_dark')
  }

  _deleteCard = () => {
    this._createElement.remove()
  }
  
  //Pop-up просмотра изображения в полном размере
  _openImage = () => {
    popupImageFullView.src = this._data.link
    popupImageFullView.alt = this._data.name
    popupImageTitle.textContent = this._data.name
    openPopup(imagePopup)
  }
}