/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const maxCode = initState.list && initState.list.length > 0
      ? Math.max(...initState.list.map(item => item.code)) : 0;

    this.state = {
      ...initState,
      nextCode: maxCode+1,
      selectionCounts: initState.selectionCounts || {},
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newItem = {
      code: this.state.nextCode,
      title: `Новая запись №${this.state.nextCode}`,
    };

    this.setState({
      list: [...this.state.list, newItem],
      nextCode: this.state.nextCode + 1, // Увеличиваем код
      selectionCounts: {
        ...this.state.selectionCounts,
        [newItem.code]: 0,
      },
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        item.selected = !item.selected;
      } else {
        item.selected = false;
      }
      return item;
    });

    const updatedSelectionCounts = { ...this.state.selectionCounts };
    updatedList.forEach(item => {
      if (item.selected) {
        updatedSelectionCounts[item.code] = (updatedSelectionCounts[item.code] || 0) + 1;
      }
    });

    // Обновление состояния
    this.setState({
      list: updatedList,
      selectionCounts: updatedSelectionCounts
    });
  }
}

export default Store;
