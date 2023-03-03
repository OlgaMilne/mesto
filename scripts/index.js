'use strict';

import { initialCards } from './utils/utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfileElement = document.querySelector('.popup_for_profile-edit');
const formEditProfileElement = popupEditProfileElement.querySelector('.form_name_profile-edit');
const userNameInputElement = popupEditProfileElement.querySelector('.form__item_name_userName');
const userActivityInputElement = popupEditProfileElement.querySelector('.form__item_name_userActivity');

const popupAddCardElement = document.querySelector('.popup_for_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form_name_add-card');
const locationInputElement = popupAddCardElement.querySelector('.form__item_name_location');
const linkImageInputElement = popupAddCardElement.querySelector('.form__item_name_linkImage');

const profileElement = document.querySelector('.profile');
const userNameElement = profileElement.querySelector('.profile__userName');
const userActivityElement = profileElement.querySelector('.profile__userActivity');
const buttonProfileEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddCardElement = profileElement.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.cards');

const popupsList = Array.from(document.querySelectorAll('.popup'));

const validationConfig = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfileElement);
const formAddCardValidator = new FormValidator(validationConfig, formAddCardElement);


function handleOpenPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupEsc);
}


function handleClosePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupEsc);
}


function handleClosePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = popupsList.find(function (popup) {
      return Array.from(popup.classList).includes('popup_opened');
    });
    handleClosePopup(popup);
  }
}


function handleOpenProfileEditForm() {
  userNameInputElement.value = userNameElement.textContent;
  userActivityInputElement.value = userActivityElement.textContent;
  formEditProfileValidator.clearValidation(false);
  handleOpenPopup(popupEditProfileElement);
}


function handleOpenAddCardForm() {
  formAddCardElement.reset();
  formAddCardValidator.clearValidation(true);
  handleOpenPopup(popupAddCardElement);
}


function handleWriteProfileUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInputElement.value;
  userActivityElement.textContent = userActivityInputElement.value;
  handleClosePopup(popupEditProfileElement);
}


function handleAddCard(evt) {
  evt.preventDefault();
  const cardData = {
    'location': locationInputElement.value,
    'link': linkImageInputElement.value,
  }
  const openPopup = handleOpenPopup;
  const card = new Card(cardData, '#card-template', openPopup);
  cardsContainer.prepend(card.generateCard());
  handleClosePopup(popupAddCardElement);
}


initialCards.forEach(function (item) {
  const cardData = {
    'location': item.name,
    'link': item.link,
  }
  const openPopup = handleOpenPopup;
  const card = new Card(cardData, '#card-template', openPopup);
  cardsContainer.prepend(card.generateCard());
});


formEditProfileElement.addEventListener('submit', handleWriteProfileUser);

formAddCardElement.addEventListener('submit', handleAddCard);

buttonAddCardElement.addEventListener('click', handleOpenAddCardForm);

buttonProfileEditElement.addEventListener('click', handleOpenProfileEditForm);

popupsList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      handleClosePopup(popup)
    }
  });
});

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
