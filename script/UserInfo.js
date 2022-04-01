export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileNameSelector = document.querySelector(profileNameSelector)
    this._profileAboutSelector = document.querySelector(profileAboutSelector)
  }

  getUserInfo() {
    return {
      name: this._profileNameSelector.textContent,
      about: this._profileAboutSelector.textContent
    }
  }

  setUserInfo(name, about) {
    this._profileNameSelector.textContent = name
    this._profileAboutSelector.textContent = about
  }
}