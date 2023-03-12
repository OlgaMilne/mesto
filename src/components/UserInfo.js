export class UserInfo {
  constructor(selectorName, selectorActivity) {
    this._name = document.querySelector(selectorName);
    this._activity = document.querySelector(selectorActivity);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      activity: this._activity.textContent,
    }
  }

  setUserInfo({ name, activity }) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  }
}
