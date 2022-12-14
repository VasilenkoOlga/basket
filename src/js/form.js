import  {addError, removeError} from './errorVisualization.js';
import {movingNewCoordinates} from './workCard.js';

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
const REG_TELEPHONE = /^[\d\\+][\d\\(\\)\\-]{4,15}\d$/; // от 6 до 17 цифр, первая цифра или плюс, последняя только цифра. В середине допустимы скобки и тире
const REG_EMAIL = /^[\w-\\.]+@[\w-]+\.[a-z]{2,4}$/;
const selectGap = document.querySelector('.select__gap');
const selectOption = select.querySelectorAll('option');
const address = document.querySelector('.form__label--adress');
const addressText = address.querySelector('.form__input--adress');
let arrayProducts = []; // Массив для товаров
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__button');

let data;
// Для сервиса dadata
let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
let token = "6ec3a598a2172de4be05a4cb99ca6867d8a8cf43";
let query = addressText.value;
let options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}

// Проверка поля "Адрес"
// Проверка заполнения адреса
addressText.addEventListener('invalid', () => {
  const text = address.querySelector('.form__placeholder');

  if (addressText.validity.valueMissing){
    addError(text,addressText, 'Обязательное поле');
  }
//  addressText.reportValidity();
});

addressText.addEventListener('input', () => {
  query = addressText.value;
  const valueLength = addressText.value.length;
  const text = address.querySelector('.form__placeholder');
  addressText.checkValidity();
  if (valueLength == 0) {
    addError(text, addressText, 'Обязательное поле');
  } else {
    removeError(text, addressText);
  }
  addressText.reportValidity();
});

// Получение адреса из поля (пока при изменении адреса не работает, а берет только начальный)
addressText.addEventListener('blur', async function(){ // Делаем функцию асинхронной потому что иначе не будет работать await
  query = addressText.value; // получение значения адреса
  const valueLength = addressText.value.length;
  const text = address.querySelector('.form__placeholder');
//  addressText.checkValidity();
  if (valueLength == 0) {
    addError(text, addressText, 'Обязательное поле');
  } else {
    removeError(text, addressText);
    options.body = JSON.stringify({query: query}); // Изменение query в options, т.к. иначе используется те что записаны при инициации страницы
    let response = await fetch(url, options); // ожидание выполнения промиса (благодаря await)
    data = await response.json(); // сохранение результата промиса в переменную (c ожиданием благодаря await)
    let geoLon = data.suggestions[0].data.geo_lon; // присвоение координат переменным
    let geoLat = data.suggestions[0].data.geo_lat;
    movingNewCoordinates(geoLat, geoLon); // перемещеие карты и создание новой метки
  }
//   addressText.reportValidity();
});

// Проверка выбора поля "Тип упаковки"
select.addEventListener('invalid', () => {
  const text = formSelect.querySelector('.form__placeholder');

  if (select.validity.valueMissing){
    addError(text, select, 'Обязательное поле', selectGap);
  }
});

// Проверка поля "Email"
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

// Проверка поля "Телефон"
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

// Проверка поля "Комментарий"
// Проверки на количество символов комментария
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

// Проверка поля "Имя"
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

// Создание массива товаров
const collectingArrayProducts = function() {
const purchasesItems = document.querySelectorAll('.purchases__item');

  for(let i = 0; i < purchasesItems.length; i++) {
    let product = {}
    const name = purchasesItems[i].querySelector('.purchases__name').textContent;
    const count = purchasesItems[i].querySelector('.purchases__number-count').value;
    const id = purchasesItems[i].querySelector('.purchases__id').textContent;
    product.name = name;
    product.count = count;
    product.id = id;
    arrayProducts.push(product);
  }
}

// Собрание данных из формы в FormData и показ в консоль
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  collectingArrayProducts();
  const formData = new FormData(evt.target);
  formData.append('products', JSON.stringify(arrayProducts)); // Добавление массива товаров
  console.log(Object.fromEntries(formData));
  arrayProducts = [];

// Открытие и закрытие окна информирования об принятии заказа
  modal.classList.remove('modal--close');
  if(!(modal.classList.contains('modal--close'))){
    modalButton.addEventListener('click', function(){
      modal.classList.add('modal--close');
    })
  }
    // Обработка поля тип упаковки при отправке
      selectGap.textContent = "Тип упаковки"
      selectOption.forEach((option, i) => {
        if(i > 0) {
          option.removeAttribute("selected");
        }
      });
      selectOption[0].setAttribute("selected", "selected");
      form.reset();
      addressText.value = "";
});
