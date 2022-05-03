import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";

import {
  popupImageName,
  popupImageLink,
  settings,
  cards,
} from "../utils/constant.js";

import css from "./index.css";

let userID;

const getProfile = api.getProfile();
const getInitialCards = api.getInitialCards();

api
  .getAvatar()
  .then((res) => {
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`));

Promise.all([getProfile, getInitialCards])
  .then(([getProfile, getInitialCards]) => {
    userInfo.setUserInfo(getProfile.name, getProfile.about);
    userID = getProfile._id;

    cardsContainer.renderItems(getInitialCards, getProfile._id);
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`));

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar");
const popupProfileName = document.querySelector(".popup__input_profile_name");
const popupProfileAbout = document.querySelector(".popup__input_profile_about");

const popupForms = {
  editForm: document.forms.editForm,
  imageForm: document.forms.imageForm,
  avatarForm: document.forms.avatarForm,
};

const profileValidator = new FormValidator(settings, popupForms.editForm);
const cardleValidator = new FormValidator(settings, popupForms.imageForm);
const avatarValidator = new FormValidator(settings, popupForms.avatarForm);

const editPopupSubmit = new PopupWithForm(".popup_edit-profile", savePopupEdit);
const addPopupSubmit = new PopupWithForm(".popup_add-image", savePopupAdd);
const popupImageNew = new PopupWithImage(".popup_image-view");
const popupConfirmDelete = new PopupWithForm(".popup_confirm-delete");
const popupAvatar = new PopupWithForm(".popup_update-avatar", savePopupAvatar);

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar",
});

profileValidator.enableValidation();
cardleValidator.enableValidation();
avatarValidator.enableValidation();

editPopupSubmit.setEventListeners();
addPopupSubmit.setEventListeners();
popupImageNew.setEventListeners();
popupConfirmDelete.setEventListeners();
popupAvatar.setEventListeners();

function renderCard(item, userID) {
  const card = new Card(
    item,
    userID,
    ".card__template",
    () => popupImageNew.open(item),
    (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.changeSubmitHandler(() => {
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteCard();
            popupConfirmDelete.close();
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api
          .setLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      }
    }
  );
  return card.generateCard();
}

const cardsContainer = new Section(
  {
    data: [],
    renderer: (item) => cardsContainer.addItem(renderCard(item, userID)),
  },
  cards
);

function savePopupAvatar(data) {
  popupAvatar.renderLoading(true);
  api
    .updateAvatar(data["update-avatar"])
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

//Сохраняем редактирования профиля
function savePopupEdit(data) {
  editPopupSubmit.renderLoading(true);
  const { name, about } = data;

  api
    .editProfile(name, about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      editPopupSubmit.close();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      editPopupSubmit.renderLoading(false);
    });
}

//Присваиваем изображению значения из input-ов и передаем в функцию создания карточки
function savePopupAdd(data) {
  addPopupSubmit.renderLoading(true);
  api
    .addCard(data["image-name"], data["image-link"])
    .then((res) => {
      cardsContainer.addItem(renderCard(res, userID));
      addPopupSubmit.close();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      addPopupSubmit.renderLoading(false);
    });
}

//Обработчик для кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
  const { name, about } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileAbout.value = about;
  profileValidator.resetValidation();
  editPopupSubmit.open();
});

//Обработчик для кнопки добавления изображения
profileAddButton.addEventListener("click", function () {
  cardleValidator.resetValidation();
  addPopupSubmit.open();
});

avatarEditButton.addEventListener("click", function () {
  avatarValidator.resetValidation();
  popupAvatar.open();
});
