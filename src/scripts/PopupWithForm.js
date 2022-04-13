import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._saveButton = this._form.querySelector('.popup__save')
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')]
    const values = {}
    inputs.forEach((input) => {
      values[input.name] = input.value
    });

    return values
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._handleSubmit(this._getInputValues())
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'
    } else {
      this._saveButton.textContent = 'Сохранение'
    }
  }

  close() {
    super.close()
  }
}