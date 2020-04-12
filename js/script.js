$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 


//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
  document.querySelector('script[src*="script.js"]').before(script);

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    document.querySelector('link[href*="style.css"]').before(style);
  }

  script.onload = callback
}




jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.bg').attr('src');
			if($this.find('.bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	}

	$('.main-menu-parent').each(function(key,item){
		if($(item).find('ul').length) {
			$(item).addClass('childs-in').append('<i class="childs-toggler"></i>');
		}
	});


	$('.tabs-news-menu a').Tabs();


	backgrounded('.big-news-bg');
	backgrounded('.mid-news-bg');
	backgrounded('.project-item-bg');
	backgrounded('.affiche-big-bg');
	backgrounded('.affiche-mid-bg');

	//инитим фотораму
	function fotoramaInit(){
		$('.fotorama-node').fotorama({
			width: 920,
			maxwidth: '100%',
			allowfullscreen: false,
			nav: 'thumbs',
			thumbwidth: 190,
			thumbheight: 105,
			thumbmargin: 20
		});
	}

	if ($('.fotorama-node').length) {
		lazyLibraryLoad(
			'https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.css',
			fotoramaInit
		)
	}


	$('.slick-horoscope').slick({
		slidesToShow: 1,
		adaptiveHeight: true,
		fade: true
	})


	$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
	$('#news-archieve-input').datepicker({
		dateFormat: "dd.mm.yy",
		prevText: "вперед",
		nextText: "назад",
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		firstDay: 1,
		maxDate: 0,
	});
	

	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}

	
	$(document).on('click','.collective-all a',function(e){
		e.preventDefault();
		$('.collective-hidden').slideToggle('fast');
	});


	$("#contacts_form").validate({
    rules: {
      f_name: {
        required: true,
        lettersonly: true
      },
      f_mail: {
        required: true,
        email: true
			},
			f_phone: {
				telephone: true
			}
    }
  });


	$('main table').wrap('<div class="responsive-table"></div>');

	//плавающие соц кнопки
	if ( $('.float-share').length) {

		$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('.node-float-space').offset().top,
					contentHeight = $('.node').height(),
					floatHeight = $('.float-share').height(),
					floatStop = floatOffset + contentHeight - floatHeight - 30;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.float-share').addClass('float').removeClass('flip-bottom');
			} else {
				$('.float-share').removeClass('float').addClass('flip-bottom');

				if (windowOffset < floatStop) {
	        $('.float-share').removeClass('flip-bottom');
	    	}
			}
		});
	}//if end


	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});

	$(document).on('click','.h-search-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$('.h-search-form').toggleClass('opened');
	});


	//стилизация элементов форм
  $(function() {
		$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
			singleSelectzIndex: '1',
		});
	});


	



	


});//ready close





$(window).on('load',function(){

	lazyLibraryLoad(
		'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
		'',
		function () {
			ymaps.ready(function () {
				document.getElementById('footer_map').classList.add('init');
				var myMap = new ymaps.Map("footer_map", {
					center: [54.150906, 25.317705],
					zoom: 14,
					controls: ['zoomControl','fullscreenControl']
				});
		
				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
						hintContent: 'Учреждение «Редакция газеты «Воранаўская газета»',
						balloonContent: 'г. Вороново, ул. Советская, д. 44, 231391'
				}),
							
				myGeoObject = new ymaps.GeoObject({
					geometry: {
						type: "Point",// тип геометрии - точка
						coordinates: [54.150906, 25.317705] // координаты точки
					 }
				});
		
				myMap.geoObjects.add(myPlacemark); // Размещение геообъекта на карте.	
		
				//отрубаем скролл карты мышью
				myMap.behaviors.disable('scrollZoom');
				// myMap.behaviors.disable('drag');
		
				myMap.container.events.add('fullscreenenter', function(){
					myMap.behaviors.enable(['scrollZoom']);
				});
				myMap.container.events.add('fullscreenexit', function(){
					myMap.behaviors.disable(['scrollZoom']);
				});
			});
		}
	)


	if ($('.lightgallery').length) {
		lazyLibraryLoad(
			'//cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css',
			function () {
				$('.lightgallery').lightGallery({
					download: false,
					selector: 'a'
				})
			}
		);
	}

	if ( $('.ui-audio').length ) {
		lazyLibraryLoad(
			'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.5.10/plyr.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.5.10/plyr.css',
			function(){
				let players = Array.from(document.querySelectorAll('.ui-audio > audio')).map(p => new Plyr(p));
			}
		);

	}

});