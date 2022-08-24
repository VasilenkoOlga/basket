import * as $ from 'jquery'
import './css/style.css'
//import WebpackLogo from '@/webpack-logo.png'
import './less/style.less'
//import 'core-js/stable';
//import 'regenerator-runtime/runtime';
//import React from 'react';
//import {render} from 'react-dom';

$('.main-nav_toggle-button').click(function(event) {
   event.preventDefault();
   $('#svgPlus').toggle();
   $('#svgMinus').toggle();
});


const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav_toggle-button');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });

//Textarea подгон размера под содержимое
const textarea = document.getElementsByTagName('textarea')[0];

textarea.addEventListener('keydown', resize);
function resize() {
  const el = this;
  setTimeout(function() {
    el.style.cssText = 'height:auto; padding: 9px 0px';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 1);
}

//  Выпадающий список
$('.select').each(function(){
		// Variables
		const $this = $(this), // присваивание $this = ('.select')
			selectOption = $this.find('option'), // Найти пункт
			selectOptionLength = selectOption.length, // Длинна selectOption (количество)
		//selectedOption = selectOption.filter(':selected'), // Отфильтровать  выбранный пункт
			dur = 500;

		$this.hide(); // скрытие селекта
		$this.wrap('<div class="select"></div>'); //создание div class="select" внутрь которого помещается селект из верстки
		$('<div>',{ //создание div внутри контейнера с классом и текстом
			class: 'select__gap',
			text: 'Тип упаковки'
		}).insertAfter($this); // добавление нового div после селект

		const selectGap = $this.next('.select__gap');
		$('<ul>',{ // Создние списка после элемента с классом .select__gap
			class: 'select__list'
		}).insertAfter(selectGap);

		const selectList = selectGap.next('.select__list');
		for(let i = 0; i < selectOptionLength; i++){
			$('<li>',{
				class: 'select__item',
				html: $('<span>',{
					text: selectOption.eq(i).text() // Добавление текста пункта
				})
			})
			.attr('data-value', selectOption.eq(i).val()) // добавление значения value
			.appendTo(selectList);
		}

		const selectItem = selectList.find('li'); // Найти все li

		selectList.slideUp(0); // Скрытие списка
		selectGap.on('click', function(){ // Добавление класса по клику при отсуствии и открытие списка
			if(!$(this).hasClass('on')){
				$(this).addClass('on'); // Добавить класс
				selectList.slideDown(dur);

				selectItem.on('click', function(){
					const chooseItem = $(this).data('value');

          $('select option').removeAttr('selected');
          $('select option[value="' + chooseItem + '"]').attr('selected', 'selected');
					selectGap.text($(this).find('span').text());
					selectList.slideUp(dur);
					selectGap.removeClass('on'); // Удалить класс
				});
			} else {
				$(this).removeClass('on'); // Удалить класс
				selectList.slideUp(dur);
			}
		});
	});


$('pre').addClass('test').html('C@t')
