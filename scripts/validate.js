const setFormsItems = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
    return inputElement.validity.valid === false;
  });
}

const toggleButtonState = (button, inactiveButtonClass, error) => {
  if (error) {
    button.classList.add(inactiveButtonClass);
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

  if (inputElement.value.length === 0) {
    errorMessage = 'Вы пропустили это поле.';
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

  } else if (inputElement.type === 'text' && inputElement.value.length < inputElement.minLength) {
    errorMessage = `Минимальное число символов: ${inputElement.minLength}. Длина текста
      сейчас\u00A0${inputElement.value.length}\u00A0символ`;
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

  } else if (inputElement.type === 'url' && !((inputElement.value.startsWith('http://') && inputElement.value.length > 7) || (inputElement.value.startsWith('https://') && inputElement.value.length > 8))) {
    errorMessage = 'Введите адрес сайта';
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, errorMessage);

  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const enableValidation = (setFormsItems) => {

  const formsList = Array.from(document.querySelectorAll(setFormsItems.formSelector));
  const inputSelector = setFormsItems.inputSelector
  const inputErrorClass = setFormsItems.inputErrorClass;
  const errorClass = setFormsItems.errorClass;
  const inactiveButtonClass = setFormsItems.inactiveButtonClass;
  const submitButtonSelector = setFormsItems.submitButtonSelector;

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

enableValidation(setFormsItems);
