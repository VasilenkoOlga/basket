import * as $ from 'jquery'

const MAX_COMMENT_LENGTH = 600;
const MIN_NAME_LENGTH = 3;
const MIN_TELEPHONE_LENGTH = 9;
const textDescription = document.querySelector('.form__input--comment');
const name = document.querySelector('.form__input--name');
const telephone = document.querySelector('.form__input--telephone');

// Проверки на количество символов
textDescription.addEventListener('input', () => {
  const valueLength = textDescription.value.length;

  if (valueLength > MAX_COMMENT_LENGTH){
    textDescription.setCustomValidity('Не больше 600 символов');
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
});

name.addEventListener('input', () => {
  const valueLength = name.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    name.setCustomValidity('Не менее 3 символов');
  }
  else {
    name.setCustomValidity('');
  }
  name.reportValidity();
});

telephone.addEventListener('input', () => {
  const valueLength = telephone.value.length;

  if (valueLength < MIN_TELEPHONE_LENGTH) {
    telephone.setCustomValidity('Номер телефона не менее 9 символов');
  }
  else {
    telephone.setCustomValidity('');
  }
  telephone.reportValidity();
});

/*
const url = '';
const form = document.querySelector('.form_form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);

    fetch(
      url,
      {
        method: 'POST',
        body: formData,
      },)

});
*/

// Временное решение для данных из формы
$(".form_form").on("submit", function(e){
  e.preventDefault();
  let data = $(this).serialize();
  console.log(data);
})
