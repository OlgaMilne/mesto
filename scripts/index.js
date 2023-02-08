'use strict';

const popupEditProfileElement = document.querySelector('.popup_for_profile-edit');
const formEditProfileElement = popupEditProfileElement.querySelector('.form_name_profile-edit');
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

const popupsList = Array.from(document.querySelectorAll('.popup'));


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
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
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
  userNameInputElement.classList.remove('form__item_type_error');
  userActivityInputElement.classList.remove('form__item_type_error');
  formEditProfileElement.querySelectorAll('.form__item-error').forEach((error) => {
    error.classList.remove('form__item-error_active');
    error.textContent = '';
  });
  const button = formEditProfileElement.querySelector('.form__button');
  button.classList.remove('form__button_inactive');
  button.disabled = false;
  openPopup(popupEditProfileElement);
}


function openAddCardForm() {
  locationInputElement.value = '';
  linkImageInputElement.value = '';
  locationInputElement.classList.remove('form__item_type_error');
  linkImageInputElement.classList.remove('form__item_type_error');
  formAddCardElement.querySelectorAll('.form__item-error').forEach((error) => {
    error.classList.remove('form__item-error_active');
    error.textContent = '';
  });
  const button = formAddCardElement.querySelector('.form__button');
  button.classList.remove('form__button_inactive');
  button.disabled = false;
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


formEditProfileElement.addEventListener('submit', (evt) => {
  const inputsList = Array.from(formEditProfileElement.querySelectorAll('.form__item'));
  if (!hasInvalidInput(inputsList)) {
    console.log(hasInvalidInput(inputsList));
    writeProfileUser(evt);
  }
});

formAddCardElement.addEventListener('submit', (evt) => {
  const inputsList = Array.from(formAddCardElement.querySelectorAll('.form__item'));
  if (!hasInvalidInput(inputsList)) {
    addCard(evt);
  }
});

buttonAddCardElement.addEventListener('click', openAddCardForm);

buttonProfileEditElement.addEventListener('click', openProfileEditForm);

buttonClosePopupElements.forEach((item) => item.addEventListener('click', () => closePopup(item.closest('.popup'))));

popupsList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item)
    }
  });
});

