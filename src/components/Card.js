export class Card {
  constructor({ location, linkImage }, handleCardClick, templateSelector) {
    this._location = location;
    this._linkImage = linkImage;
    this._templateSelector = templateSelector;
    this._itemCardElement = this._getTemplate();
    this._imageCardElement = this._itemCardElement.querySelector('.card__photo');
    this._captionCardElement = this._itemCardElement.querySelector('.card__caption');
    this._likeCardElement = this._itemCardElement.querySelector('.card__like-button');
    this._buttonTrashCardElement = this._itemCardElement.querySelector('.card__trash-button');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.card');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._imageCardElement.addEventListener('click', () => this._handleShowImage());
    this._likeCardElement.addEventListener('click', () => this._handleLikeCard());
    this._buttonTrashCardElement.addEventListener('click', () => this._handleDeleteCard());
  }

  _handleShowImage() {
    const dataImage = {
      'location': this._location,
      'linkImage': this._linkImage,
    }
    this._handleCardClick(dataImage);
  }

  _handleLikeCard() {
    this._likeCardElement.classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this._itemCardElement.remove();
    this._itemCardElement = null;
  }

  generateCard() {
    this._captionCardElement.textContent = this._location;
    this._imageCardElement.src = this._linkImage;
    this._imageCardElement.alt = this._location;

    this._setEventListeners();

    return this._itemCardElement;
  }

}
