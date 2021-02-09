export default {
  searchQuery: '', //Ключевое слово для поиска фильма
  pageNumber: 1, //Текущая страница запроса на пагинаторе
  renderFilms: 1, // Способ обращения к API (1-поп.фильмы, 2-поиск, 3-библиотека)

  // для того чтобы записывать данные из input в searchQuery обратимся к свойствам get/set, чтобы из внешнего когда записать заначение в этот ключ
  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
