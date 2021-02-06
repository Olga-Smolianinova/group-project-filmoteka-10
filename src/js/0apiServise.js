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

  // HTTP-запрос и его обработка для поиска (search) фильмов
  fetchFilms() {
    const apiKey = 'a524e22e3630cf24a2e0a24a461145a2';

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${this.pageNumber}&query=${this.query}`;

    return fetch(url)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(({ results }) => {
        this.pageNumber += 1; //для того чтобы при нажатии на пагинатор или кнопку "Load more" подгружалась новая часть запроса на следующей странице

        if (results.length === 0) {
          throw new Error('Error fetching data'); //прописываем для того чтобы лучше отловить ошибки. В случае, если данные по запросу отсутствуют и  вернулся [], ошибка ловится в catch
          return;
        }
      });
  },
  //   при изменении запроса при input начинает отсчет для вывода данных на страницы с page=1
  resetPage() {
    this.pageNumber = 1;
  },
};
