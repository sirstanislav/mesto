
const formSubmit = (event) => {
  event.preventDefault();
}

const checkInputValidity = (form, input) => {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  console.log(errorMessage)
  if (input.validity.valid) {
    errorMessage.textContent = '';
    input.classList.remove('popup__input_error')
  } else {
    errorMessage.textContent = input.validationMessage;
    input.classList.add('popup__input_error')
  }
}

const checkButtonValidity = (form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled')
    button.classList.remove('popup__save_disabled')
  } else {
    button.setAttribute('disabled', '')
    button.classList.add('popup__save_disabled')
  }
}

function enableValidation() {
  //берем форму
  const form = document.querySelector('.popup__form ')
  //вешаем обработичк при отправке делать фунцию formSubmit
  form.addEventListener('submit', formSubmit)
  //тут же выберем поля ввода
  const inputs = form.querySelectorAll('.popup__input')
  const button = form.querySelector('.popup__save')
  //для каждого поля ввода вешаем обработчик с функцией проверки на валидность
  inputs.forEach(input => {
    input.addEventListener('input', (event) => {
      checkInputValidity(form, input)
      checkButtonValidity(form, button)
    })
  })
}

enableValidation()