export class FormValidator {
  constructor(validationConfig, form) {
    this._form = form;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inputsList = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(isError) {
    if (isError) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass,);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass,);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _findErrorElement(inputElement) {
    return this._form.querySelector(`.form__item-error_name_${inputElement.name}`);
  }

  _checkInputValidity(inputElement, errorElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputErrorClass, errorClass);
    } else {
      this._hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    }
  }

  enableValidation() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._hasInvalidInput(this._inputsList));
        this._checkInputValidity(inputElement, this._findErrorElement(inputElement), this._inputErrorClass, this._errorClass);
      });
    });
  }

  clearValidation(state) {
    this._toggleButtonState(state);
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._findErrorElement(inputElement), this._inputErrorClass, this._errorClass);
    });
  }
}
