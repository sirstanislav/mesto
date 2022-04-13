export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._items = data
    this._renderer = renderer
    this._container = containerSelector
  }

  //Инициализируем карточки из массива
  renderItems() {
    this._items.forEach((card) => {
      this.addItem(this._renderer(card))
    });
  }

//Готовые карточки добавляем в конец DOM
  addItem(item) {
    this._container.append(item)
  }
}