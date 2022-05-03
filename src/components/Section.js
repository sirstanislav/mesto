export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //Инициализируем карточки из массива
  renderItems(cards, userID) {
    cards.forEach((card) => {
      this._renderer(card, userID);
    });
  }

  //Готовые карточки добавляем в конец DOM
  addItem(item) {
    this._container.prepend(item);
  }
}
