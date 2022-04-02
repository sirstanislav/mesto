export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_enable');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_enable');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  // Кнопки закрытия Pop-up
  setEventListeners() {
    this._popup.closest('.popup').addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup__close') || event.target === event.currentTarget) {
          this.close(this._popup)
        }
      })
  }
}