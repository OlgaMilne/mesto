'use strict';

const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const editFormElement = document.querySelector('.edit-form');
const userNameElement = document.querySelector('.profile__userName');
const userActivityElement = document.querySelector('.profile__userActivity');
const userNameInputElement = document.querySelector('.edit-form__item_userName');
const userActivityInputElement = document.querySelector('.edit-form__item_userActivity');
const closeButtonElement = document.querySelector('.popup__close-button');

userNameInputElement.placeholder = userNameElement.textContent;
userActivityInputElement.placeholder = userActivityElement.textContent;

function showEditForm() {
  popupElement.classList.add('popup_opened');
}

function closeEditForm() {
  popupElement.classList.remove('popup_opened');
}

function writeUser(event) {
  event.preventDefault();
  userNameElement.textContent = userNameInputElement.value;
  userActivityElement.textContent = userActivityInputElement.value;
  closeEditForm();
}

editButtonElement.addEventListener('click', showEditForm);

editFormElement.addEventListener('submit', writeUser);

closeButtonElement.addEventListener('click', closeEditForm);


