export default class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
  }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileAboutSelector = document.querySelector(profileAboutSelector);
    this._profileAvatarSelector = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameSelector.textContent,
      about: this._profileAboutSelector.textContent,
      avatar: this._profileAvatarSelector.style.backgroundImage,
    };
  }

  setUserInfo(name, about) {
    this._profileNameSelector.textContent = name;
    this._profileAboutSelector.textContent = about;
  }

  getAvatar() {
    return {
      avatar: this._profileAvatarSelector.style.backgroundImage,
    };
  }

  setAvatar(avatar) {
    this._profileAvatarSelector.style.backgroundImage = `url(${avatar})`;
  }
}
