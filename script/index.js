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

const popupEditButton = document.querySelector('.popup_edit')
const popupAddButton = document.querySelector('.popup_add')
const popupForm = document.querySelector('.popup__form')
const popupCloseButton = document.querySelectorAll('.popup__close')
const popupName = document.querySelector('.popup__input_place_name')
const popupAbout = document.querySelector('.popup__input_place_about')

const cards = document.querySelector('.cards')
const template = document.querySelector('.card__template').content;

function render() {
  initialCards.forEach(renderItem);
}

render()

function renderItem (item) {
  const newItem = template.querySelector('.card').cloneNode(true);
  newItem.querySelector('.card__image').src = item.link;
  newItem.querySelector('.card__image').alt = item.name;
  newItem.querySelector('.card__navigation-title').textContent = item.name;

  cards.append(newItem)
}

function openPopupEdit() {
  popupEditButton.classList.add('popup_enable')
  popupName.value = profileName.textContent
  popupAbout.value = profileAbout.textContent
}

function openPopupAdd() {
  popupAddButton.classList.add('popup_enable')
}

function savePopup (evt) {
  evt.preventDefault();
  
  profileName.textContent = popupName.value
  profileAbout.textContent = popupAbout.value
  closePopup()
}

function closePopup() {
  popupEditButton.classList.remove('popup_enable')
  popupAddButton.classList.remove('popup_enable') 
}

profileEditButton.addEventListener('click', openPopupEdit)
profileAddButton.addEventListener('click', openPopupAdd)

// popupCloseButton.forEach(function (element) {
//   element.addEventListener('click', function() {
//     closePopup()
//   })
// })

popupCloseButton.forEach(element => element.addEventListener('click', closePopup))

popupForm.addEventListener('submit', savePopup)























// popup.addEventListener('click', function (event) {
  //   if (event.target === event.currentTarget) {
    //     closePopup ()
    //   }
    // })