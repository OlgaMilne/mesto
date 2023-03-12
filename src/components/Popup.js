export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._buttonClosePopup = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popup.classList.remove('popup_opened');
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget || evt.target === this._buttonClosePopup) {
        this.close();
      };
    });
  }

}
