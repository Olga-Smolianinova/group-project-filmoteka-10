// Доступы к элементам
import refs from './refs.js';

// Доступ к файлу 0apiServise, который дополнительно будет обрабатывать API-запрос
import apiServise from './0apiServise.js';

//  получаем доступ к шаблону для отображения списка фильмов
import templateListOfFilms from '../templates/list-films.hbs';

// доступ к функция
import {
  createCardFunc,
  fetchPopularMoviesList,
  arrQuantity,
  genres,
} from './1initialHomePage.js';

// доступ к функция showError() и showNotice() из notificaion.js для вывода сообщения о некорректном запросе и уведомлении
import { showError, showNotice } from './notification.js';

// 2.2) 2searchAndPlaginationHomePage.js:
// - не забываем в верстке параграф под формой для отображения ошибки на некорректный запрос, берем его из DOM;
// - создаем глобальные переменную inputVaue (будут использоваться в запросах, как и pageNumber созданный первым участником - НЕ ДУБЛИРУЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ);
// - берем из DOM форму, инпут, обе кнопки, контейнер страницы;
// - создаем функцию fetchFilms (должна в запросе использовать глобальные переменные pageNumber и inputVaue, в случае ответа пустым массивом отрисовывать ошибку, в случае корректного ответа чистить ul, и с помощью createCardFunc созданной первым участником отрисовывать фильмы, не забываем также положить в глобальную переменную renderFilms результат;
// - создать функцию searchFilms принимающую ивент, обрабатывающую дефолтное поведение формы и тп, также она должна менять глобальную переменную inputVaue и после запускать функцию fetchFilms использующую эту переменную у себя под капотом;
// + вешаем searchFilms на сабмит формы;
// - создаем функция plaginationNavigation принимающую ивент, по id она определяет какая из кнопок была нажат и в зависимости от этого по разному отрабатывает изменяя при этом глобальные переменные pageNumber, прорисовуя его в контейнере в DOM и запускает на пустую строчку inputValue функцию fetchPopularMoviesList или fetchFilms;
// - кнопка назад должна исчезать когда текущее количество страниц “1” и появляться при “2” и более; - вешаем слушателем функцию plaginationNavigation на кнопки вперед и назад.

// Для того чтобы работала поисковая строка, сначала вешаем слушателя событий на форму и получаем доступ к тому, что введет пользователь в input, обратившись к  event.target.value и обрабатываем действия в функции onFormSearch

refs.inputForm.addEventListener('submit', searchFilms);

function searchFilms(event) {
  event.preventDefault();
  apiServise.query = event.currentTarget.elements.query.value;
  console.log(apiServise.query);

  // чтобы при добавлении новой информации поиска предыдущий список не показывался и обновлялся прописываем:
  refs.galleryRef.innerHTML = '';

  // для того чтобы при вводе нового запроса в input отправлялся новый запрос, а не продолжалось действие page+=1 добавляем метод resetPage, который прописан в файле Apiservise.js :
  apiServise.resetPage();

  // вызов функции для fetch запроса search и его обработки
  onFetchSearch();

  // чтобы очищались данные input:
  // refs.form.reset();
  // или
  event.currentTarget.elements.query.value = '';
}

// вызов функции для fetch запроса search и его обработки
function onFetchSearch() {
  apiServise
    .fetchFilms()
    .then(results => {
      results.forEach(({ genre_ids }) =>
        genre_ids.forEach(
          (item1, inxex, arr) =>
            (arr[inxex] = genres.find(item2 => item2.id == item1)),
        ),
      );
      // console.log(results);

      // обрабатываем данные с бекенда и встраиваем их в шаблон с помощью функции createCardFunc(), работа которой прописана в файле 1initialHomePage.js
      // Функция для отрисовки количество картинок на странице, в зависимости от ширины экрана
      arrQuantity(results);
      // console.log(arrQuantity);

      window.scrollTo({
        // top: 10000000,
        // чтобы не прописывать рандомное число для корректной прокрутки, указем свойство, которое отвечает за всю высоту документа offsetHeight:
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      refs.searchErr.classList.remove('is-hidden');
      // виклик  hideError, щоб cховати повідомлення про помилку
      const timerId = setTimeout(hideError, 3000);
    });
}

// cховати повідомлення про помилку
function hideError() {
  refs.searchErr.classList.add('is-hidden');
  fetchPopularMoviesList();
}
// const timerId = setTimeout(hideError, 3000);
