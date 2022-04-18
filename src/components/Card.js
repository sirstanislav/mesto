export default class Card {
  constructor(data, userID, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._data = data
    this._createElement = document.querySelector(cardTemplateSelector).content.querySelector('.card').cloneNode(true)
    this._like = this._createElement.querySelector('.card__navigation-like')
    this._cardDeleteButton = this._createElement.querySelector('.card__delete')
    this._likes = data.likes
    this._id = data._id
    this._userID = userID
    this._ownerID = data.owner._id
    this._handleImageClick = handleImageClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
    this._likeCountElement = this._createElement.querySelector('.card__like-count')
  }

  //Функция создания карточки и добавления к ним обработчиков событий
  generateCard() {
    this._cardImage = this._createElement.querySelector('.card__image')
    this._cardNavigationTitle = this._createElement.querySelector('.card__navigation-title')
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardNavigationTitle.textContent = this._data.name;
    this._addListeners()
    this.setLikes(this._likes)

    if(this._ownerID !== this._userID) {
      this._cardDeleteButton.style.display = 'none'
    }

    return this._createElement
  }

  //Обработчики событий для карточки которые передаются в функцию создания карточки
  _addListeners() {
    this._like.addEventListener('click', () => this._handleLikeClick(this._id))
    this._cardDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._id))
    this._cardImage.addEventListener('click', () => this._handleImageClick())
  }

  deleteCard = () => {
    this._createElement.remove()
    this._createElement = null
  }

  setLikes(newLikes) {
    this._likes = newLikes
    this._likeCountElement.textContent = this._likes.length

    if(this.isLiked()) {
      this._like.classList.add('card__navigation-like_dark')
    } else {
      this._like.classList.remove('card__navigation-like_dark')
    }
  }

  isLiked() {
    const userHasLikeCard = this._likes.find(user => user._id === this._userID)

    return userHasLikeCard
  }
}