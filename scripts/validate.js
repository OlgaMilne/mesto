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
    button.classList.remove('disabled');
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const showInputError = (inputElement, errorElement, inputErrorClass, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass,);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass,);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (inputElement, errorElement, inputErrorClass, errorClass) => {

  let errorMessage = '';

  if (inputElement.validity.valueMissing) {
    errorMessage = 'Вы пропустили это поле.';
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

  } else if (inputElement.type === 'text' && inputElement.validity.tooShort) {
    errorMessage = `Минимальное число символов: ${inputElement.minLength}. Длина текста
      сейчас\u00A0${inputElement.value.length}\u00A0символ`;
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

  } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
    errorMessage = 'Введите адрес сайта';
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

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
