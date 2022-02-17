const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.formSelector))
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    })
  })
  formsList.forEach((form) => {
    setEventListeners(form, settings)
  })
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(formElement, inputElement, settings)
  }
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_disabled')
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('popup__save_disabled')
    buttonElement.removeAttribute('disabled')
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
});