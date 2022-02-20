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

const popupEdit = document.querySelector('.popup_edit-profile')
const popupAdd = document.querySelector('.popup_add-image')
const imagePopup = document.querySelector('.popup_image-view')
const popupCloseButtons = document.querySelectorAll('.popup__close')

const popupProfileName = document.querySelector('.popup__input_profile_name')
const popupProfileAbout = document.querySelector('.popup__input_profile_about')
const popupImageName = document.querySelector('.popup__input_image_name')
const popupImageLink = document.querySelector('.popup__input_image_link')

const popupImageFullView = document.querySelector('.popup__image-full')
const popupImageTitle = document.querySelector('.popup__image-title')

const cards = document.querySelector('.cards')
const template = document.querySelector('.card__template').content;

//Инициализируем карточки из массива
function renderinitialCards() {
  initialCards.forEach(addCardAppend);
}
renderinitialCards()

//Готовые карточки добавляем в конец DOM
function addCardAppend(data) {
  cards.append(createCard(data))
}

//Готовые карточки добавляем в начало DOM
function addCardPrepend(data) {
  cards.prepend(createCard(data))
}

//Функция создания карточки и добавления к ним обработчиков событий
function createCard(item) {
  const createElement = template.querySelector('.card').cloneNode(true);
  const cardImage = createElement.querySelector('.card__image')
  const cardNavigationTitle = createElement.querySelector('.card__navigation-title')
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardNavigationTitle.textContent = item.name;
  addListeners(createElement)
  return createElement
}

//Сохраняем редактирования профиля
function savePopupEdit(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value
  profileAbout.textContent = popupProfileAbout.value
  closePopup(popupEdit)
}

//Присваиваем изображению значения из input-ов и передаем в функцию создания карточки
function savePopupAdd(event) {
  event.preventDefault();
  const cardData = {
    name: popupImageName.value,
    link: popupImageLink.value
  }
  addCardPrepend(cardData)
  closePopup(popupAdd);
  popupImageName.value = ''
  popupImageLink.value = ''

  const disabled = popupAdd.querySelector('.popup__save')
  disabled.setAttribute('disabled', true)
  disabled.classList.add('popup__save_disabled')
  
  // const formList = Array.from(document.querySelectorAll('.popup__form'))
  // formList.forEach((element) => {
  //   const inputList = Array.from(element.querySelectorAll('.popup__input'))
  //   const buttonElement = element.querySelector('.popup__save')
  //   toggleButtonState(inputList, buttonElement)
  // })
}

function openPopup(popup) {
  popup.classList.add('popup_enable');
  document.addEventListener('keydown', closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_enable');
  document.removeEventListener('keydown', closeWithEscape);
}

function likeCard(event) {
  event.target.classList.toggle('card__navigation-like_dark')
}

function deleteCard(event) {
  event.target.closest('.card').remove()
}

//Pop-up просмотра изображения в полном размере
function openImage(event) {
  popupImageFullView.src = event.target.src
  popupImageFullView.alt = event.target.alt
  popupImageTitle.textContent = event.target.alt
  openPopup(imagePopup)
}

//Обработчики событий для карточки которые передаются в функцию создания карточки
function addListeners(element) {
  element.querySelector('.card__navigation-like').addEventListener('click', likeCard)
  element.querySelector('.card__delete').addEventListener('click', deleteCard)
  element.querySelector('.card__image').addEventListener('click', openImage)
}

//Обработчик для кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
  popupProfileName.value = profileName.textContent
  popupProfileAbout.value = profileAbout.textContent
  openPopup(popupEdit)
})

//Обработчик для кнопки добавления изображения
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd)
})

//Кнопки закрытия Pop-up
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget){
      closePopup(popup)
    }
  })
});

const closeWithEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_enable')
    closePopup(openedPopup)
  }
}

//Обработчик для кнопки сохранения профиля
popupEdit.querySelector('.popup__form').addEventListener('submit', savePopupEdit)

//Обработчик для кнопки сохранения изображения
popupAdd.querySelector('.popup__form').addEventListener('submit', savePopupAdd)