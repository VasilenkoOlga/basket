import * as $ from 'jquery'
const MAX_COMMENT_LENGTH = 600;
const MIN_NAME_LENGTH = 3;
const form = document.querySelector('.form_form');
const description = document.querySelector('.form__label--comment');
const textDescription = description.querySelector('.form__input--comment');
const name = document.querySelector('.form__label--name');
const nameText = name.querySelector('.form__input--name');
const telephone = document.querySelector('.form__label--telephone');
const telephoneText = telephone.querySelector('.form__input--telephone');
const email = document.querySelector('.form__label--email');
const emailText = email.querySelector('.form__input--email');
const formSelect = document.querySelector('.form__label--type-packaging');
const select = formSelect.querySelector('.form__select');
const REG_TELEPHONE = /^[\d\+][\d\(\)\-]{4,14}\d$/; // от 6 до 16 цифр, первая цифра или плюс, последняя только цифра. В середине допустимы скобки и тире
const REG_EMAIL = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/;
const selectGap = document.querySelector('.select__gap');
const selectOption = select.querySelectorAll('option');

// Действия при выявлении ошибки в поле
const addError = function (text, textInput, error, x) {
  text.textContent = error;
  textInput.setCustomValidity(' ');
  text.classList.add('color-red');
  if(x){
    x.classList.add('color-red');
  } else {
    textInput.classList.add('color-red');
  }
}
// Отмена действий ошибке
const removeError = function (text, textInput){
  text.textContent = text.dataset.prompt;
  textInput.setCustomValidity('');
  text.classList.remove('color-red');
  textInput.classList.remove('color-red');
}

// Проверка EMAIL
//Нужно поправить ошибку с невыводом после заполнения верхней подписи

select.addEventListener('invalid', () => {
  const text = formSelect.querySelector('.form__placeholder');

  if (select.validity.valueMissing){
    addError(text, select, 'Обязательное поле', selectGap);
/*    text.textContent = 'Обязательное поле';
    select.setCustomValidity(' ');
    text.classList.add('color-red');
    selectGap.classList.add('color-red');
    */
  }
});

emailText.addEventListener('invalid', () => {
  const text = email.querySelector('.form__placeholder');

  if (emailText.validity.valueMissing){
    addError(text, emailText, 'Обязательное поле');
  }
});

emailText.addEventListener('input', () => {
  const valueLength = emailText.value.length;
  const value = emailText.value;
  const text = email.querySelector('.form__placeholder');
  if (valueLength == 0) {
    removeError(text, emailText);
  } else if (!(REG_EMAIL.test(value))) {
    addError(text, emailText, 'Введите корректный email');
  }
  else {
    removeError(text, emailText);
  }
  emailText.reportValidity();
})

// Проверка телефона на заполнение и регулярынм выражением
telephoneText.addEventListener('invalid', () => {
  const text = telephone.querySelector('.form__placeholder');
  if (telephoneText.validity.valueMissing){
    addError(text, telephoneText, 'Обязательное поле');
  }
});

telephoneText.addEventListener('input', () => {
  const valueLength = telephoneText.value.length;
  const value = telephoneText.value;
  const text = telephone.querySelector('.form__placeholder');
  if (valueLength == 0) {
    removeError(text, telephoneText);
  } else if (!(REG_TELEPHONE.test(value))) {
    addError(text, telephoneText, 'Телефон от 6 до 16 цифр');
  }
  else {
    removeError(text, telephoneText);
  }
  telephoneText.reportValidity();
});

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

nameText.addEventListener('invalid', () => {
  const text = name.querySelector('.form__placeholder');
  if (nameText.validity.valueMissing){
    addError(text, nameText, 'Обязательное поле');
  }
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
// Обработка поля тип упаковки при отправке
  selectGap.textContent = "Тип упаковки"
  selectOption.forEach((option, i) => {
    if(i > 0) {
      option.removeAttribute("selected");
    }
  });
  selectOption[0].setAttribute("selected", "selected");
  form.reset();
})
