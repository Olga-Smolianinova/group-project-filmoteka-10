// черновик 1initialHomePage.js

// //  получаем доступ к шаблону для отображения списка фильмов
// import templateListOfFilms from '../templates/list-films.hbs';
// import refs from '../js/refs';

// // 1.2) 1initialHomePage.js:

// // - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться в запросе при плагинации);
// // - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);
// // - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам);
// // - создаем функцию fetchGenres которая забирает жанры и кладет их в переменную genres (она понадобится в работе следующим участникам);
// // - запускаем функцию fetchPopularMoviesList и fetchGenres.

// // let genres;
// // const renderFilms = 0;
// const pageNumber = 1;

// import footer from '../html/footer.html';

// // для отрисовки фильмов через template  в HTML
// function createCardFunc(imgPath, filmTitle, movieId) {
//   const markup = templateListOfFilms(imgPath, filmTitle, movieId);

//   // встраиваем полученные данные в HTML документ
//   refs.galleryRef.insertAdjacentHTML('beforeend', markup);
// }

// //fetch запрос на список жанров:
// function fetchGenres() {
//   const url =
//     'https://api.themoviedb.org/3/genre/movie/list?api_key=a524e22e3630cf24a2e0a24a461145a2';

//   return fetch(url)
//     .then(response => {
//       // console.log(response);
//       return response.json();
//     })
//     .then(({ genres }) => {
//       console.log(genres);
//       // const genre = genres.map(({ name }) => name);
//       // createCardFunc(genre);
//     });
// }
// fetchGenres();

// // fetch запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
// function fetchPopularMoviesList() {
//   const url =
//     'https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2';

//   return fetch(url)
//     .then(response => {
//       // console.log(response);
//       return response.json();
//     })
//     .then(({ results }) => {
//       console.log(results);
//       // createCardFunc(results);
//       // return results

//       // test======для верстки MobileFirst====================
//       // console.log(results);
//       const mobileArr = results.slice(0, 4);
//       // console.log(mobileArr);
//       const tabletArr = results.slice(0, 8);
//       // console.log(tabletArr);
//       const desktopArr = results.slice(0, 9);
//       // console.log(desktopArr);

//       // console.log(innerWidth);
//       // console.log(visualViewport.width); //visualViewport.width

//       if (innerWidth >= 1024) {
//         createCardFunc(desktopArr);
//       } else if (innerWidth >= 768 && innerWidth <= 1023) {
//         createCardFunc(tabletArr);
//       } else {
//         createCardFunc(mobileArr);
//       }
//     });
//   // =====================================================
// }
// fetchPopularMoviesList();

// // через async await //////test
// // const fetchPopularMoviesList = async () => {
// //   // films
// //   const filmsList = await fetch(
// //     `https://api.themoviedb.org/3/trending/movie/day?api_key=a524e22e3630cf24a2e0a24a461145a2`,
// //   ).then(response =>
// //     response.json().then(({ results }) => results.map(data => data)),
// //   );

// //   // genres
// //   const genresList = await fetch(
// //     `https://api.themoviedb.org/3/genre/movie/list?api_key=a524e22e3630cf24a2e0a24a461145a2`,
// //   ).then(
// //     response => response.json(),
// //     // .then(({ genres }, id, name) =>
// //     //   genres.filter(({ genres }) => id === name),
// //     // ),
// //   );

// //   console.log(filmsList);
// //   console.log(genresList);

// //   return [filmsList, ...genresList];
// // };
// // fetchPopularMoviesList().then(total => {
// //   console.log(total);
// //   createCardFunc(total);
// // });

// // СЛУШАТЕЛИ СОБЫТИЙ Тест
// // для открытия и закрытия модального окна вешаем слушателя событий на родителя li - это ul -refs.container
// const onGalleryClick = refs.galleryRef.addEventListener('click', onOpenModal);

// function onOpenModal(event) {
//   const largeImageUrl = event.target;
//   console.log(largeImageUrl);
//   console.log(event.target.dataset.action);
// }

// fetch for configuration
// function fetchConfig() {
//   const url =
//     'https://api.themoviedb.org/3/configuration?api_key=a524e22e3630cf24a2e0a24a461145a2';

//   return fetch(url).then(response =>
//     response.json().then(data => console.log(data)),
//   );
// }
// fetchConfig();
