import * as $ from 'jquery'

const MAX_COMMENT_LENGTH = 600;
const MIN_NAME_LENGTH = 3;
const MIN_TELEPHONE_LENGTH = 9;
const form = document.querySelector('.form_form');
const description = document.querySelector('.form__label--comment');
const textDescription = description.querySelector('.form__input--comment');
const name = document.querySelector('.form__label--name');
const nameText = name.querySelector('.form__input--name');
const telephone = document.querySelector('.form__label--telephone');
const telephoneText = telephone.querySelector('.form__input--telephone');

// Действия при выявлении ошибки в поле
const addError = function (text, textInput, error) {
  text.textContent = error;
  textInput.setCustomValidity(' ');
  text.classList.add('color-red');
  textInput.classList.add('color-red');
}

// Отмена действий ошибке
const removeError = function (text, textInput) {
  text.textContent = text.dataset.prompt;
  textInput.setCustomValidity('');
  text.classList.remove('color-red');
  textInput.classList.remove('color-red');
}

// Проверки на количество символов
textDescription.addEventListener('input', () => {
  const valueLength = textDescription.value.length;
  const text = description.querySelector('.form__placeholder');

  if (valueLength > MAX_COMMENT_LENGTH){
    addError(text, textDescription, 'Не больше 600 символов');
  } else {
    removeError(text, textDescription);
  }
  textDescription.reportValidity();
});

nameText.addEventListener('input', () => {
  const valueLength = nameText.value.length;
  const text = name.querySelector('.form__placeholder');

  nameText.checkValidity();
  if (valueLength > 0 && valueLength < MIN_NAME_LENGTH) {
    addError(text, nameText, 'Не менее 3 символов');
  }
  else {
    removeError(text, nameText);
  }
  nameText.reportValidity();
});

telephoneText.addEventListener('input', () => {
  const valueLength = telephoneText.value.length;
  const text = telephone.querySelector('.form__placeholder');

  if (valueLength > 0 && valueLength < MIN_TELEPHONE_LENGTH) {
    addError(text, telephoneText, 'Телефон от 9 цифр');
  }
  else {
    removeError(text, telephoneText);
  }
  telephoneText.reportValidity();
});

/*
const url = '';
form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);

    fetch(
      url,
      {
        method: 'POST',
        body: formData,
      },)
      form.reset();
});
*/

// Временное решение для данных из формы
form.addEventListener ("submit", function(e){
  e.preventDefault();
  let data = $(this).serialize();
  console.log(data);
  form.reset();
})
