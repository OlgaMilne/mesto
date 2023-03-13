export class UserInfo {
  constructor(selectorName, selectorActivity) {
    this._name = document.querySelector(selectorName);
    this._activity = document.querySelector(selectorActivity);
  }

  getUserInfo() {
    return {
      'userName': this._name.textContent,
      'userActivity': this._activity.textContent,
    }
  }

  setUserInfo( {userName, userActivity} ) {
    this._name.textContent = userName;
    this._activity.textContent = userActivity;
  }
}
