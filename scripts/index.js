'use strict';

const editButtonElement = document.querySelector('.profile__edit-button');
const popupContainerElement = document.querySelector('.popup__container');
const editFormElement = document.querySelector('.edit-form');
const userNameElement = document.querySelector('.profile__userName');
const userActivityElement = document.querySelector('.profile__userActivity');
const userNameInputElement = document.getElementsByName('userName');
const userActivityInputElement = document.getElementsByName('userActivity');
const editFormSubmitElement = document.querySelector('.edit-form__button');
const closeButtonElement = document.querySelector('.edit-form__close-button');
const likeButtonsElement = document.querySelectorAll('.elements__like-button');


function showEditForm() {
  editFormElement.classList.remove('edit-form_visibility_hidden');
  popupContainerElement.classList.remove('popup__container_visibility_hidden');
}

function closeEditForm() {
  editFormElement.classList.add('edit-form_visibility_hidden');
  popupContainerElement.classList.add('popup__container_visibility_hidden');
}

function writeUser() {
  userNameElement.textContent = 'VOLA';
  userActivityElement.textContent = 'GAGA';
}

function togglelLikeButton() {
  this.classList.toggle('elements__like-button_active');
}

editButtonElement.addEventListener('click', showEditForm);

editFormSubmitElement.addEventListener('submit', writeUser);

closeButtonElement.addEventListener('click', closeEditForm);

for (let i = 0; i < likeButtonsElement.length; i++) {
  likeButtonsElement[i].addEventListener('click', togglelLikeButton);
}

