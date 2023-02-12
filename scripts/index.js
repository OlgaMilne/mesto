'use strict';

const popupEditProfileElement = document.querySelector('.popup_for_profile-edit');
const formEditProfileElement = popupEditProfileElement.querySelector('.form_name_profile-edit');
const userNameInputElement = popupEditProfileElement.querySelector('.form__item_name_userName');
const userActivityInputElement = popupEditProfileElement.querySelector('.form__item_name_userActivity');
const buttonSubmitEditProfile = formEditProfileElement.querySelector('.form__button');
const inputsListEditProfile = Array.from(formEditProfileElement.querySelectorAll('.form__item'));

const popupAddCardElement = document.querySelector('.popup_for_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form_name_add-card');
const locationInputElement = popupAddCardElement.querySelector('.form__item_name_location');
const linkImageInputElement = popupAddCardElement.querySelector('.form__item_name_linkImage');
const buttonSubmitAddCard = formAddCardElement.querySelector('.form__button');
const inputsListAddCard = Array.from(formAddCardElement.querySelectorAll('.form__item'));

const popupImageElement = document.querySelector('.popup_for_image');
const imageElement = popupImageElement.querySelector('.image-popup__image')
const captionElement = popupImageElement.querySelector('.image-popup__caption')

const profileElement = document.querySelector('.profile');
const userNameElement = profileElement.querySelector('.profile__userName');
const userActivityElement = profileElement.querySelector('.profile__userActivity');
const buttonProfileEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddCardElement = profileElement.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const popupsList = Array.from(document.querySelectorAll('.popup'));


function createCard(cardData) {
  const itemCardElement = cardTemplate.cloneNode(true);
  const imageCardElement = itemCardElement.querySelector('.card__photo');
  const captionCardElement = itemCardElement.querySelector('.card__caption');
  const likeCardElement = itemCardElement.querySelector('.card__like-button');
  const buttonTrashCardElement = itemCardElement.querySelector('.card__trash-button');
  captionCardElement.textContent = cardData.location;
  imageCardElement.src = cardData.link;
  imageCardElement.alt = cardData.location;
  imageCardElement.addEventListener('click', () => handleShowImage(cardData));
  likeCardElement.addEventListener('click', handleLikeCard);
  buttonTrashCardElement.addEventListener('click', () => handleDeleteCard(itemCardElement));
  return itemCardElement;
}


function handleDeleteCard(card) {
  card.remove();
}


function handleLikeCard() {
  this.classList.toggle('card__like-button_active');
}


function handleClosePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = popupsList.find(function (popup) {
      return Array.from(popup.classList).includes('popup_opened');
    });
    handleClosePopup(popup);
  }
}


function handleOpenPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupEsc);
}


function handleClosePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupEsc);
}


function handleShowImage(cardData) {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.location;
  captionElement.textContent = cardData.location;
  handleOpenPopup(popupImageElement);
}


function removeErrorClass(form, inputsList) {
  inputsList.forEach((inputElement) => {
    const errorElement = form.querySelector(`.form__item-error_name_${inputElement.name}`);
    hideInputError(inputElement, errorElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
}


function handleOpenProfileEditForm() {
  userNameInputElement.value = userNameElement.textContent;
  userActivityInputElement.value = userActivityElement.textContent;
  removeErrorClass(formEditProfileElement, inputsListEditProfile);
  toggleButtonState(buttonSubmitEditProfile, validationConfig.inactiveButtonClass, false);
  handleOpenPopup(popupEditProfileElement);
}


function handleOpenAddCardForm() {
  formAddCardElement.reset();
  removeErrorClass(formAddCardElement, inputsListAddCard);
  toggleButtonState(buttonSubmitAddCard, validationConfig.inactiveButtonClass, false);
  buttonSubmitAddCard.disabled = true;
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
  cardsContainer.prepend(createCard(cardData));
  handleClosePopup(popupAddCardElement);
}


initialCards.forEach(function (item) {
  const cardData = {
    'location': item.name,
    'link': item.link,
  }
  cardsContainer.prepend(createCard(cardData));
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
