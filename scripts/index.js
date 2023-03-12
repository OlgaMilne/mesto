'use strict';

import { initialCards } from './utils/utils.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';


const formEditProfileElement = document.querySelector('.form_name_profile-edit');
const userNameInputElement = formEditProfileElement.querySelector('.form__item_name_userName');
const userActivityInputElement = formEditProfileElement.querySelector('.form__item_name_userActivity');

const formAddCardElement = document.querySelector('.form_name_add-card');
const locationInputElement = formAddCardElement.querySelector('.form__item_name_location');
const linkImageInputElement = formAddCardElement.querySelector('.form__item_name_linkImage');

const profileElement = document.querySelector('.profile');
const buttonProfileEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddCardElement = profileElement.querySelector('.profile__add-button');

const user = new UserInfo('.profile__userName', '.profile__userActivity');

const validationConfig = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};


const formEditProfileValidator = new FormValidator(validationConfig, formEditProfileElement);
const formAddCardValidator = new FormValidator(validationConfig, formAddCardElement);


formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


const handleCardClick = (dataImage, selector) => {
  const popup = new PopupWithImage(selector);
  popup.setEventListeners();
  popup.open(dataImage);
};


const gallery = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardData = {
      'location': item.name,
      'link': item.link,
    }
    const card = new Card({ cardData, handleCardClick }, '#card-template');
    gallery.addItem(card.generateCard());
  },
}, '.cards');


gallery.renderItems();


const handleAddCard = (evt) => {
  evt.preventDefault();
  const cardData = {
    'location': locationInputElement.value,
    'link': linkImageInputElement.value,
  }
  const card = new Card({ cardData, handleCardClick }, '#card-template');
  gallery.addItem(card.generateCard());
  popupFormAddCard.close();
}


const popupFormAddCard = new PopupWithForm('.popup_for_add-card', handleAddCard);
popupFormAddCard.setEventListeners();


const handleOpenAddCardForm = () => {
  formAddCardValidator.clearValidation(true);
  popupFormAddCard.open();
}


const handleWriteProfileUser = (evt) => {
  evt.preventDefault();
  const userData = {
    name: userNameInputElement.value,
    activity: userActivityInputElement.value,
  };
  user.setUserInfo(userData);
  popupFormEditProfile.close();
};


const popupFormEditProfile = new PopupWithForm('.popup_for_profile-edit', handleWriteProfileUser);
popupFormEditProfile.setEventListeners();


const handleOpenProfileEditForm = () => {
  formEditProfileValidator.clearValidation(false);
  userNameInputElement.value = user.getUserInfo().name;
  userActivityInputElement.value = user.getUserInfo().activity;
  popupFormEditProfile.open();
}


buttonAddCardElement.addEventListener('click', handleOpenAddCardForm);
buttonProfileEditElement.addEventListener('click', handleOpenProfileEditForm);
