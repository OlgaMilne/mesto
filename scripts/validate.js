const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(button, inactiveButtonClass, error) {
  if (error) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass,);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass,);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (inputElement, errorElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const enableValidation = (validationConfig) => {

  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  const inputSelector = validationConfig.inputSelector
  const inputErrorClass = validationConfig.inputErrorClass;
  const errorClass = validationConfig.errorClass;
  const inactiveButtonClass = validationConfig.inactiveButtonClass;
  const submitButtonSelector = validationConfig.submitButtonSelector;

  formsList.forEach((form) => {

    const inputsList = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);

    inputsList.forEach((inputElement) => {

      const errorElement = form.querySelector(`.form__item-error_name_${inputElement.name}`);

      inputElement.addEventListener('input', () => {

        checkInputValidity(inputElement, errorElement, inputErrorClass, errorClass);
        toggleButtonState(button, inactiveButtonClass, hasInvalidInput(inputsList));
      });
    });
  });
};

enableValidation(validationConfig);
