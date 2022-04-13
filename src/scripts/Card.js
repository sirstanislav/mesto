export default class Card {
  constructor(data, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._data = data
    this._createElement = document.querySelector(cardTemplateSelector).content.querySelector('.card').cloneNode(true)
    this._like = this._createElement.querySelector('.card__navigation-like')
    this._cardDeleteButton = this._createElement.querySelector('.card__delete')
    this._likes = data.likes
    this._id = data.id
    this._userID = data.userID
    this._ownerID = data.ownerID
    this._handleImageClick = handleImageClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
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

  // _toggleLikeColor = () => {
  //   this._like.classList.toggle('card__navigation-like_dark')
  // }

  deleteCard = () => {
    console.log(this._likes)
    this._createElement.remove()
    this._createElement = null
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const likeCountElement = this._createElement.querySelector('.card__like-count')
    likeCountElement.textContent = this._likes.length

    if(this.isLiked()) {
      // this._toggleLikeColor()
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