import * as $ from 'jquery'
import  {removeError} from './errorVisualization.js'

const formSelect = document.querySelector('.form__label--type-packaging');
const select = formSelect.querySelector('.form__select');
const text = formSelect.querySelector('.form__placeholder');

//  Выпадающий список
$('.form__select').each(function(){
		const $this = $(this), // присваивание $this = ('.select')
			selectOption = $this.find('option'), // Найти пункт
			selectOptionLength = selectOption.length, // Длинна selectOption (количество)
		//selectedOption = selectOption.filter(':selected'), // Отфильтровать  выбранный пункт
			dur = 500;

		//$this.hide(); // скрытие селекта
		$this.wrap('<div class="select-wrapper"></div>'); //создание div class="select" внутрь которого помещается селект из верстки
		$('<div>',{ //создание div внутри контейнера с классом и текстом
			class: 'select__gap',
			text: 'Тип упаковки'
		}).insertBefore($this); // добавление нового div перед селект

		const selectGap = $('.select__gap');
		$('<ul>',{ // Создние списка после элемента с классом .select__gap
			class: 'select__list'
		}).insertAfter(selectGap);

		const selectList = $('.select__list');
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
				selectList.slideDown(dur); // Плавное открытие JQ

				selectItem.on('click', function(){
					const chooseItem = $(this).data('value');

          $('select option').removeAttr('selected');
          $('select option[value="' + chooseItem + '"]').attr('selected', 'selected');
          removeError(text, select);
          selectGap.removeClass('color-red')
					selectGap.text($(this).find('span').text()).css("color", "#000000");
					selectList.slideUp(dur); // Плавное скрытие JQ
					selectGap.removeClass('on'); // Удалить класс
				});
			} else {
				$(this).removeClass('on'); // Удалить класс
				selectList.slideUp(dur); // Плавное скрытие JQ
			}
		});
	});

const selectList = document.querySelector('.select__list');
const selectItems = selectList.querySelectorAll('.select__item');

selectItems[0].remove();
