//Textarea подгон размера под содержимое
const textareaAddress = document.querySelector('.form__input--textarea');
const textareaComment = document.querySelector('.form__input--comment');

function resize() {
  const el = this;
  setTimeout(function() {
    el.style.cssText = 'height:auto; padding: 9px 0px';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 1);
}

textareaAddress.addEventListener('keydown', resize);
textareaComment.addEventListener('keydown', resize);
