import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selectorPopup,) {
    super(selectorPopup);
  }

  open({ src, alt, imageElement, captionElement }) {
    imageElement.src = src;
    imageElement.alt = alt;
    captionElement.textContent = alt;
    super.open();
  }

}
