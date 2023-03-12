export  const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export const formEditProfileElement = document.querySelector('.form_name_profile-edit');
export const userNameInputElement = formEditProfileElement.querySelector('.form__item_name_userName');
export const userActivityInputElement = formEditProfileElement.querySelector('.form__item_name_userActivity');

export const formAddCardElement = document.querySelector('.form_name_add-card');
export const locationInputElement = formAddCardElement.querySelector('.form__item_name_location');
export const linkImageInputElement = formAddCardElement.querySelector('.form__item_name_linkImage');

const profileElement = document.querySelector('.profile');
export const buttonProfileEditElement = profileElement.querySelector('.profile__edit-button');
export const buttonAddCardElement = profileElement.querySelector('.profile__add-button');

export const validationConfig = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};
