const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.formSelector))
  formsList.forEach((formsList) => {
    formsList.addEventListener('submit', function(event) {
      event.preventDefault();
    })
    setEventListeners(formsList, settings)
    console.log(formsList)
  })
}

const setEventListeners = (formsList, settings) => {
  const inputsList = Array.from(formsList.querySelectorAll(settings.inputSelector))
  const buttonElement = formsList.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputsList, buttonElement)
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(inputElement, settings)
      toggleButtonState(inputsList, buttonElement);
    })
  })
}

const checkInputValidity = (inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(inputElement, settings)
  }
}

const showInputError = (inputElement, errorMessage, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (inputElement, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.textContent = ''
}

const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputsList, buttonElement) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add('popup__save_disabled')
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('popup__save_disabled')
    buttonElement.removeAttribute('disabled')
  }
}

enableValidation(settings);