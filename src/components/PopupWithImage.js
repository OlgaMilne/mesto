import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selectorPopup,) {
    super(selectorPopup);
    this._imageElement = this._popup.querySelector('.image-popup__image');
    this._captionElement = this._popup.querySelector('.image-popup__caption');
  }

  open({ location, linkImage}) {
    this._imageElement.src = linkImage;
    this._imageElement.alt = location;
    this._captionElement.textContent = location;
    super.open();
  }
}
