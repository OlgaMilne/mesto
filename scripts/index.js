'use strict';

const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const editFormElement = document.querySelector('.edit-form');
const userNameElement = document.querySelector('.profile__userName');
const userActivityElement = document.querySelector('.profile__userActivity');
const userNameInputElement = document.querySelectorAll('.edit-form__item')[0];
const userActivityInputElement = document.querySelectorAll('.edit-form__item')[1];
const closeButtonElement = document.querySelector('.popup__close-button');

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

/* for 5 sprint
const likeButtonsElement = document.querySelectorAll('.cards__like-button');

function togglelLikeButton() {
  this.classList.toggle('cards__like-button_active');
}

for (let i = 0; i < likeButtonsElement.length; i++) {
  likeButtonsElement[i].addEventListener('click', togglelLikeButton);
}
*/