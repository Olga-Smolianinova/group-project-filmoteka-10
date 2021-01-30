// 4) Участник работает только с файлами: detailsPage.html, detailsPage.scss,  4filmDetailsPage.js.
// 4.1) detailsPage.html, detailsPage.scss - верстка согласно макетов на 320рх, 768рх, 1024рх
// 4.2) 4filmDetailsPage.js
// - пишем функцию monitorButtonStatusText которая следит за состоянием (значок и текст в кнопке) читает  local storage по ключу filmsQueue и  filmsWatched и меняет текст и значки в кнопках: Delete from queue / Add to queue ; Delete from watched / Add to watched.
// - пишем функцию toggleToQueue (будет добавлять или удалять фильмы из очереди просмотра), которая создает переменную массива в очереди, читает local storage по ключу filmsQueue если результат не пустой то пушит элементы в нашу переменную, ! также функция вплотную работает с глобальной переменной selectFilm, и если selectFilm содержиться в нашей переменной то убираем его оттуда иначе добавляем selectFilm в нашу переменную, потом эта функция кладет нашу переменную в  local storage, запускает в конце себя функцию monitorButtonStatusText;
// - пишем функцию toggleToWatched (будет добавлять или удалять фильмы из просмотренных), суть ее работы один в один как toggleToQueue  только работает с local storage по ключу filmsWatched.
// - пишем функцию showDetails которая принимает параметром selectFilm (глобальная переменная - объект, которая создана в задаче номер три) и рендерит всю разметку согласно макета, в этой функции запускается функция monitorButtonStatusText.

// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue  и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.
