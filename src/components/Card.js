export class Card {
  constructor({ cardData, handleCardClick }, templateSelector) {
    this.location = cardData.location;
    this.image = cardData.link;
    this.templateSelector = templateSelector;
    this.popupImageElement = document.querySelector('.popup_for_image');
    this.imageElement = this.popupImageElement.querySelector('.image-popup__image');
    this.captionElement = this.popupImageElement.querySelector('.image-popup__caption');
    this.itemCardElement = this._getTemplate();
    this.imageCardElement = this.itemCardElement.querySelector('.card__photo');
    this.captionCardElement = this.itemCardElement.querySelector('.card__caption');
    this.likeCardElement = this.itemCardElement.querySelector('.card__like-button');
    this.buttonTrashCardElement = this.itemCardElement.querySelector('.card__trash-button');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this.templateSelector).content.querySelector('.card');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this.imageCardElement.addEventListener('click', () => this._handleShowImage());
    this.likeCardElement.addEventListener('click', () => this._handleLikeCard());
    this.buttonTrashCardElement.addEventListener('click', () => this._handleDeleteCard());
  }

  _handleShowImage() {

    const dataImage = {
      src: this.image,
      alt: this.location,
      imageElement: this.imageElement,
      captionElement: this.captionElement,
    }
    this._handleCardClick(dataImage, '.popup_for_image');
  }

  _handleLikeCard() {
    this.likeCardElement.classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this.itemCardElement.remove();
    this.itemCardElement = null;
  }

  generateCard() {
    this.captionCardElement.textContent = this.location;
    this.imageCardElement.src = this.image;
    this.imageCardElement.alt = this.location;

    this._setEventListeners();

    return this.itemCardElement;
  }

}
