const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80'
  },
  {
    name: 'Конакова',
    link: 'https://images.unsplash.com/photo-1608132809707-8f82cda0879c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Ольхо́н',
    link: 'https://images.unsplash.com/photo-1614357932292-a38393b966a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Осетия',
    link: 'https://images.unsplash.com/photo-1612719734820-81784b7e6573?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1637912725667-291b85cf1850?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2789&q=80'
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1634715107433-d9e3403f5bc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
];

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const popupEditButton = document.querySelector('.popup_edit-profile')
const popupAddButton = document.querySelector('.popup_add-image')
const popupImageOpen = document.querySelector('.popup_image-view')
const popupCloseButton = document.querySelectorAll('.popup__close')

const popupForm = document.querySelector('.popup__form')
const popupName = document.querySelector('.popup__input_place_name')
const popupAbout = document.querySelector('.popup__input_place_about')
const popupLink = document.querySelector('.popup__input_place_link')

const cards = document.querySelector('.cards')
const template = document.querySelector('.card__template').content;

function render() {
  initialCards.forEach(renderItem);
}
render()

function renderItem(initialCards) {
  const newItem = template.querySelector('.card').cloneNode(true);
  newItem.querySelector('.card__image').src = initialCards.link;
  newItem.querySelector('.card__image').alt = initialCards.name;
  newItem.querySelector('.card__navigation-title').textContent = initialCards.name;
  cards.append(newItem)
  addListeners(newItem)
}

function openPopupEdit() {
  popupEditButton.classList.add('popup_enable')
  popupName.value = profileName.textContent
  popupAbout.value = profileAbout.textContent
}

function savePopupEdit(event) {
  event.preventDefault();
  
  profileName.textContent = popupName.value
  profileAbout.textContent = popupAbout.value
  closePopup()
}

function openPopupAdd() {
  popupAddButton.classList.add('popup_enable')
  popupAddButton.querySelector('.popup__input_place_name').value = ''
  popupAddButton.querySelector('.popup__input_place_link').value = ''
}

function savePopupAdd(event) {
  event.preventDefault();
  const popupName = popupAddButton.querySelector('.popup__input_place_name')
  const popupLink = popupAddButton.querySelector('.popup__input_place_link')
  const newItem = template.querySelector('.card').cloneNode(true);
  newItem.querySelector('.card__image').src = popupLink.value
  newItem.querySelector('.card__image').alt = popupName.value
  newItem.querySelector('.card__navigation-title').textContent = popupName.value
  cards.prepend(newItem)
  closePopup()
  addListeners(newItem)
}

function closePopup() {
  popupEditButton.classList.remove('popup_enable')
  popupAddButton.classList.remove('popup_enable')
  popupImageOpen.classList.remove('popup_enable')
}

function cardLike(event) {
  event.target.classList.toggle('card__navigation-like_dark')
}

function cardDelete(event) {
  event.target.closest('.card').remove()
}

function openImage(event) {
  popupImageOpen.classList.add('popup_enable')
  document.querySelector('.popup__image-full').src = event.target.src
  document.querySelector('.popup__image-full').alt = event.target.alt
  document.querySelector('.popup__image-title').textContent = event.target.alt
}

function addListeners(element) {
  element.querySelector('.card__navigation-like').addEventListener('click', cardLike)
  element.querySelector('.card__delete').addEventListener('click', cardDelete)
  element.querySelector('.card__image').addEventListener('click', openImage)
}

profileEditButton.addEventListener('click', openPopupEdit)
profileAddButton.addEventListener('click', openPopupAdd)

popupCloseButton.forEach(element => element.addEventListener('click', closePopup))
popupEditButton.querySelector('.popup__form').addEventListener('submit', savePopupEdit)
popupAddButton.querySelector('.popup__form').addEventListener('submit', savePopupAdd)

// popupCloseButton.forEach(function (element) {
//   element.addEventListener('click', function() {
//     closePopup()
//   })
// })


// popup.addEventListener('click', function (event) {
  //   if (event.target === event.currentTarget) {
    //     closePopup ()
    //   }
    // })