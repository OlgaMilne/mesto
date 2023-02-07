'use strict';

const popupEditProfileElement = document.querySelector('.popup_for_profile-edit');
const formProfileEditElement = popupEditProfileElement.querySelector('.form_name_profile-edit');
const userNameInputElement = popupEditProfileElement.querySelector('.form__item_name_userName');
const userActivityInputElement = popupEditProfileElement.querySelector('.form__item_name_userActivity');

const popupAddCardElement = document.querySelector('.popup_for_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form_name_add-card');
const locationInputElement = popupAddCardElement.querySelector('.form__item_name_location');
const linkImageInputElement = popupAddCardElement.querySelector('.form__item_name_linkImage');

const popupImageElement = document.querySelector('.popup_for_image');
const imageElement = popupImageElement.querySelector('.image-popup__image')
const captionElement = popupImageElement.querySelector('.image-popup__caption')

const profileElement = document.querySelector('.profile');
const userNameElement = profileElement.querySelector('.profile__userName');
const userActivityElement = profileElement.querySelector('.profile__userActivity');
const buttonProfileEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddCardElement = profileElement.querySelector('.profile__add-button');

const cardsElement = document.querySelector('.cards');
const cardTemlate = document.querySelector('#card-template').content;
const buttonClosePopupElements = document.querySelectorAll('.popup__close-button');


function createCard(cardData) {
  const itemCardElement = cardTemlate.cloneNode(true);
  const imageCardElement = itemCardElement.querySelector('.card__photo');
  const captionCardElement = itemCardElement.querySelector('.card__caption');
  const likeCardElement = itemCardElement.querySelector('.card__like-button');
  const buttonTrashCardElement = itemCardElement.querySelector('.card__trash-button');
  captionCardElement.textContent = cardData.location;
  imageCardElement.src = cardData.link;
  imageCardElement.alt = cardData.location;
  imageCardElement.addEventListener('click', () => showImage(cardData));
  likeCardElement.addEventListener('click', likeCard);
  buttonTrashCardElement.addEventListener('click', deleteCard);
  return itemCardElement;
}


function likeCard() {
  this.classList.toggle('card__like-button_active');
}


function deleteCard() {
  this.closest('.card').remove();
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function showImage(cardData) {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.location;
  captionElement.textContent = cardData.location;
  openPopup(popupImageElement);
}


function openProfileEditForm() {
  userNameInputElement.value = userNameElement.textContent;
  userActivityInputElement.value = userActivityElement.textContent;
  openPopup(popupEditProfileElement);
}


function openAddCardForm() {
  locationInputElement.value = '';
  linkImageInputElement.value = '';
  openPopup(popupAddCardElement);
}


function writeProfileUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInputElement.value;
  userActivityElement.textContent = userActivityInputElement.value;
  closePopup(popupEditProfileElement);
}


function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    'location': locationInputElement.value,
    'link': linkImageInputElement.value,
  }
  cardsElement.prepend(createCard(cardData));
  closePopup(popupAddCardElement);
}


initialCards.forEach(function (item) {
  const cardData = {
    'location': item.name,
    'link': item.link,
  }
  cardsElement.prepend(createCard(cardData));
});


formProfileEditElement.addEventListener('submit', writeProfileUser);

formAddCardElement.addEventListener('submit', addCard);

buttonAddCardElement.addEventListener('click', openAddCardForm);

buttonProfileEditElement.addEventListener('click', openProfileEditForm);

buttonClosePopupElements.forEach((item) => item.addEventListener('click', () => closePopup(item.closest('.popup'))));
