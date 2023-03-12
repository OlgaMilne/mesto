import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.form');
    this._inputsList = Array.from(this._form.querySelectorAll('.form__item'));
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((item) => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

}
