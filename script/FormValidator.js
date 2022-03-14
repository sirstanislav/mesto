export class FormValidator {
  constructor(settings, form) {
    this._settings = settings
    this._form = form
    this._inputSelector = settings.inputSelector
    this._inputsList = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector)
  }

  enableValidation() {
    this._form.addEventListener('submit', function(event) {
        event.preventDefault();
      });
      this._setEventListeners()
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
      })
    })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass } = this._settings
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = errorMessage
  }
  
  _hideInputError(inputElement) {
    const { inputErrorClass } = this._settings
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.remove(inputErrorClass)
    errorElement.textContent = ''
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) { 
      this._buttonElement.classList.add('popup__save_disabled')
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove('popup__save_disabled')
      this._buttonElement.removeAttribute('disabled')
    }
  }

  resetValidation() {
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState()
  }
}