'use strict';

import './index.css';

import {
  initialCards, buttonProfileEditElement, buttonAddCardElement, validationConfig,
  formEditProfileElement, formAddCardElement, userNameInputElement, userActivityInputElement
} from '../utils/utils.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const formEditProfileValidator = new FormValidator(validationConfig, formEditProfileElement);
const formAddCardValidator = new FormValidator(validationConfig, formAddCardElement);

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


const handleCardClick = (dataImage) => {
  popupImage.open(dataImage);
};


const renderCard = (cardData) => {
  const card = new Card(cardData, handleCardClick, '#card-template');
  return card.generateCard();
};


const handleAddCard = (cardData) => {
  gallery.addItem(renderCard(cardData));
}


const handleWriteProfileUser = (userData) => {
  userProfile.setUserInfo(userData);
};


const handleOpenAddCardForm = () => {
  formAddCardValidator.clearValidation(true);
  popupFormAddCard.open();
}


const handleOpenProfileEditForm = () => {
  formEditProfileValidator.clearValidation(false);
  const { userName, userActivity } = userProfile.getUserInfo();
  userNameInputElement.value = userName;
  userActivityInputElement.value = userActivity;
  popupFormEditProfile.open();
}


const userProfile = new UserInfo('.profile__userName', '.profile__userActivity');


const popupFormEditProfile = new PopupWithForm('.popup_for_profile-edit', handleWriteProfileUser);
popupFormEditProfile.setEventListeners();


const popupFormAddCard = new PopupWithForm('.popup_for_add-card', handleAddCard);
popupFormAddCard.setEventListeners();


const popupImage = new PopupWithImage('.popup_for_image');
popupImage.setEventListeners();


const gallery = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardData = {
      'location': item.name,
      'linkImage': item.link,
    }
    gallery.addItem(renderCard(cardData));
  },
}, '.cards');


buttonAddCardElement.addEventListener('click', handleOpenAddCardForm);
buttonProfileEditElement.addEventListener('click', handleOpenProfileEditForm);

gallery.renderItems();
