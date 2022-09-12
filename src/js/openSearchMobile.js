const searchInput = document.querySelector('.main-nav__search-input');
const buttonSearch = document.querySelector('.button-search');

// Открытие и закрытие поля поиска в мобильной версии
buttonSearch.addEventListener('click',function(event) {
   event.preventDefault();
   let searchInputLength = searchInput.value.length;
   if (searchInputLength == 0){
     searchInput.classList.toggle('main-nav__search-input--hidden');
   } else {
     console.log('Найти: ' + searchInput.value);
   }
 });
