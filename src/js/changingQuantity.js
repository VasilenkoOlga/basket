const products = document.querySelectorAll('.purchases__item'); // Все карточки товаров

products.forEach((item, i) => {
  let product = products[i].querySelector('.purchases__number-count'); // Карточка товара
  const productMinus = products[i].querySelector('.purchases__button-sign--minus');
  const productPlus = products[i].querySelector('.purchases__button-sign--plus');

  let productValue = Number(product.value); // Значение количества товара

  productPlus.addEventListener('click', function () {
    productValue += 1
    product.value = productValue; // Присвоение нового значения карточки товара
  })

  productMinus.addEventListener('click', function () {
    if (productValue != 0) {
      productValue = productValue - 1
      product.value = productValue; // Присвоение нового значения карточки товара
    }
  })
});
