const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav_toggle-button');
const svgClose = document.querySelector('#svgClose');
const svgOpen = document.querySelector('#svgOpen');

navToggle.addEventListener('click',function(event) {
   event.preventDefault();
   svgOpen.classList.toggle('vissualy-hidden');
   svgClose.classList.toggle('vissualy-hidden');
});

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});
