var context = window,
	$win = $(context),
	$body = $('body'),
	$doc = $(document);

(function($) {
	"use strict";
	// off, on
	$.fn.offon = function(type, f) {
		return this.off(type).on(type, f);
	};

	// length
	$.fn.exists = function() {
		return this.length > 0;
	};

	// space ([margin, padding], [horizontal, vertical, top, right, bottom, left])
	$.fn.space = function(property, option) {
		var property = String(property),
			option = String(option),
			value = 0;

		if(option == "horizontal") {
			if($(this).css(property + "-left") && $(this).css(property + "-left").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-left").replace(/\D/g, ""));
			}
			if($(this).css(property + "-right") && $(this).css(property + "-right").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-right").replace(/\D/g, ""));
			}
		} else if(option == "vertical") {
			if($(this).css(property + "-top") && $(this).css(property + "-top").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-top").replace(/\D/g, ""));
			}
			if($(this).css(property + "-bottom") && $(this).css(property + "-bottom").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-bottom").replace(/\D/g, ""));
			}
		} else {
			if($(this).css(property + "-" + option) && $(this).css(property + "-" + option).replace(/\D/g,"")) {
				value = Number($(this).css(property + "-" + option).replace(/\D/g, ""));
			}
		}

		return value;
	};

	$.fn.noop = function () {
		return this;
	};
}(jQuery));


(function ($) {
	"use strict";
	var $root = $(document.documentElement).addClass('js'),
		tmpInput = document.createElement('input'),
		isTouch = ('ontouchstart' in context),
		isMobile = ('orientation' in context) || isTouch || window.IS_MOBILE === true,
		supportPlaceholder = ('placeholder' in tmpInput);

	isTouch && $root.addClass('touch');
	isMobile && $root.addClass('mobile');
})(jQuery);

$(document).ready(function(){
	var ui = PUB.ui;
	
	$(window).resize(function(){
		ui.setLayout();
	}).resize();

	ui.tabPanel();
	ui.fileUpload();
	ui.ModalController();
	ui.swipeNum()
});

$(document).ready(function(){
	var ui = PUB.ui;

	if($('.js_tab').exists()){
		$('.js_tab', this).tabPanel({
			startIndex:0
		});
	}
	if($('.js_fileUpload').exists()){
		$('.js_fileUpload', this).fileUpload();
	}

	$('.bl_scrollX_scroll').addClass('bl_scrollbar_hide');

	$('.bl_scrollX_scroll').on('touchstart', function(){
		$(this).removeClass('bl_scrollbar_hide')
	});

	if($('.js_datepicker').exists()){
		$('.js_datepicker .js_datepicker_inp').datepicker({
			dateFormat : "yy-mm",
			monthNamesShort:[ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
			dayNamesMin:[ '일', '월', '화', '수', '목', '금', '토' ],
			changeMonth:true,
			changeYear:true
		});
	}

	if($('.js_datetimepicker').exists()){
		$('.js_datetimepicker .js_datetimepicker_inp').datetimepicker({
			dateFormat : "yy. mm. dd",
			monthNamesShort:[ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
			dayNamesMin:[ '일', '월', '화', '수', '목', '금', '토' ],
			changeMonth:true,
			changeYear:true,

			// timepicker 설정
			timeFormat:'　HH:mm',
			controlType:'select',
			oneLine:true
		});
	}
});
