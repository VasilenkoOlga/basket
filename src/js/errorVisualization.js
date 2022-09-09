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

export {addError, removeError}
