export class FormValidator {
  constructor(validationConfig, form) {
    this.form = form;
    this.inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.inputErrorClass = validationConfig.inputErrorClass;
    this.errorClass = validationConfig.errorClass;
    this.inputsList = Array.from(this.form.querySelectorAll(validationConfig.inputSelector));
    this.submitButton = this.form.querySelector(validationConfig.submitButtonSelector);
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(error) {
    if (error) {
      this.submitButton.classList.add(this.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.disabled = false;
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
    return this.form.querySelector(`.form__item-error_name_${inputElement.name}`);
  }

  _checkInputValidity(inputElement, errorElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputErrorClass, errorClass);
    } else {
      this._hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    }
  }

  enableValidation() {
    this.inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._hasInvalidInput(this.inputsList));
        this._checkInputValidity(inputElement, this._findErrorElement(inputElement), this.inputErrorClass, this.errorClass);
      });
    });
  }

  clearValidation(state) {
    this._toggleButtonState(state);
    this.inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._findErrorElement(inputElement), this.inputErrorClass, this.errorClass)
    });
  }
}
