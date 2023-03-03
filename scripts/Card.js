export class Card {
  constructor(cardData, templateSelector, openPopup) {
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
    this.openPopup = openPopup;
  }

  _getTemplate() {
    const template = document.querySelector(this.templateSelector).content.querySelector('.card');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this.imageCardElement.addEventListener('click', () => this._handleShowImage());
    this.likeCardElement.addEventListener('click', (evt) => this._handleLikeCard(evt));
    this.buttonTrashCardElement.addEventListener('click', () => this._handleDeleteCard(this.itemCardElement));
  }

  _handleShowImage() {
    this.imageElement.src = this.image;
    this.imageElement.alt = this.location;
    this.captionElement.textContent = this.location;
    this.openPopup(this.popupImageElement);
  }

  _handleLikeCard(evt) {
    evt.currentTarget.classList.toggle('card__like-button_active');
  }

  _handleDeleteCard(card) {
    card.remove();
  }

  generateCard() {
    this.captionCardElement.textContent = this.location;
    this.imageCardElement.src = this.image;
    this.imageCardElement.alt = this.location;

    this._setEventListeners();

    return this.itemCardElement;
  }
}
