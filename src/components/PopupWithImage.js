import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImageFullView = this._popup.querySelector('.popup__image-full')
    this._popupImageTitle = this._popup.querySelector('.popup__image-title')
  }

  open(data) {
     //Pop-up просмотра изображения в полном размере
      this._popupImageFullView.src = data.link
      this._popupImageFullView.alt = data.name
      this._popupImageTitle.textContent = data.name
      super.open()
    }
}