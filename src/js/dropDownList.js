import * as $ from 'jquery'
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
				selectList.slideDown(dur); // Плавное открытие JQ

				selectItem.on('click', function(){
					const chooseItem = $(this).data('value');

          $('select option').removeAttr('selected');
          $('select option[value="' + chooseItem + '"]').attr('selected', 'selected');
					selectGap.text($(this).find('span').text());
					selectList.slideUp(dur); // Плавное скрытие JQ
					selectGap.removeClass('on'); // Удалить класс
				});
			} else {
				$(this).removeClass('on'); // Удалить класс
				selectList.slideUp(dur); // Плавное скрытие JQ
			}
		});
	});

const www = document.querySelector('.select__list');
const qqq = document.querySelector('.select__item');
qqq.remove();
