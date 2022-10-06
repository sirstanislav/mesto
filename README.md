# Project: Mesto

Mesto - an interactive page where you can register users, add photos, delete them, and like them. The project is written in `HTML`, `CSS` and `JavaScript` languages. The `BEM` methodology for building the site was used.

<div align="center">
<a href="https://sirstanislav.github.io/mesto/" target="_blank"><img width="100%" height="auto" src="https://github.com/sirstanislav/mesto/blob/main/src/images/preview.png?raw=true"></a>
</div>

<br>

The most memorable in this project is the `popup forms` and their `validation` through class components.

```JavaScript
import { settings } from "../utils/constant";

export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._inputsList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  enableValidation() {
    this._form.addEventListener("submit", this._setEventListeners());
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass } = this._settings;
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const { inputErrorClass } = this._settings;
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) {
      this._buttonElement.classList.add(settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  resetValidation() {
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
```



