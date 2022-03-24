export default class Section {
  constructor({data, renderer}, containerSelector) {
    console.log(data)
    this._items = data
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  //Инициализируем карточки из массива
  renderItems() {
    this._items.forEach((card) => {
      this.addItem(this._renderer(card))
    });
  }

//Готовые карточки добавляем в конец DOM
  addItem(item) {
    this._container.prepend(item)
  }
}