'use strict';

const editButtonElement = document.querySelector('.profile__edit-button');
const editFormElement = document.querySelector('.edit-form');
const addFormElement = document.querySelector('.add-form');
const userNameElement = document.querySelector('.profile__userName');
const userActivityElement = document.querySelector('.profile__userActivity');
const userNameInputElement = document.querySelector('.edit-form__item_name_userName');
const userActivityInputElement = document.querySelector('.edit-form__item_name_userActivity');
const locationInputElement = document.querySelector('.add-form__item_name_location');
const linkImageInputElement = document.querySelector('.add-form__item_name_linkImage');
const closeButtonPopupElements = document.querySelectorAll('.popup__close-button');
const addButtonElement = document.querySelector('.profile__add-button');
const cardTemlate = document.querySelector('#card-template').content;
const cardsElement = document.querySelector('.cards');
const imagePopupElement = document.querySelector('.image-popup');


function showEditForm() {
  userNameInputElement.value = userNameElement.textContent;
  userActivityInputElement.value = userActivityElement.textContent;
  editFormElement.closest('.popup').classList.add('popup_opened');
}

function closeForm(evt) {
  evt.currentTarget.closest('.popup').classList.remove('popup_opened');
}

function writeUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInputElement.value;
  userActivityElement.textContent = userActivityInputElement.value;
  closeForm(evt);
}

function showAddForm() {
  locationInputElement.value = '';
  linkImageInputElement.value = '';
  addFormElement.closest('.popup').classList.add('popup_opened');
}

function likeCard() {
  this.classList.toggle('cards__like-button_active');
}

function deleteCard() {
  this.closest('.cards__item').remove();
}

function addCard(evt) {
  evt.preventDefault();
  const itemCardElement = cardTemlate.cloneNode(true);
  itemCardElement.querySelector('.cards__caption').textContent = locationInputElement.value;
  itemCardElement.querySelector('.cards__photo').src = linkImageInputElement.value;
  itemCardElement.querySelector('.cards__photo').alt = locationInputElement.value;
  itemCardElement.querySelector('.cards__like-button').addEventListener('click', likeCard);
  itemCardElement.querySelector('.cards__trash-button').addEventListener('click', deleteCard);
  cardsElement.prepend(itemCardElement);
  closeForm(evt);
}

function showImage() {
  imagePopupElement.closest('.popup').classList.add('popup_opened');
  imagePopupElement.querySelector('.image-popup__image').src = this.src;
  imagePopupElement.querySelector('.image-popup__caption').textContent = this.alt;
}

editButtonElement.addEventListener('click', showEditForm);

editFormElement.addEventListener('submit', writeUser);

addButtonElement.addEventListener('click', showAddForm);

addFormElement.addEventListener('submit', addCard);


for (let i = 0; i < closeButtonPopupElements.length; i++) {
  closeButtonPopupElements[i].addEventListener('click', closeForm);
}


const initialCards = [
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

initialCards.forEach(function (item) {
  const itemCardElement = cardTemlate.cloneNode(true);
  itemCardElement.querySelector('.cards__caption').textContent = item.name;
  itemCardElement.querySelector('.cards__photo').src = item.link;
  itemCardElement.querySelector('.cards__photo').alt = item.name;
  itemCardElement.querySelector('.cards__like-button').addEventListener('click', likeCard);
  itemCardElement.querySelector('.cards__photo').addEventListener('click', showImage);
  itemCardElement.querySelector('.cards__trash-button').addEventListener('click', deleteCard);
  cardsElement.prepend(itemCardElement);
});
