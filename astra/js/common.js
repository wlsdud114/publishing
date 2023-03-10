
$(document).ready(function(){
	$('.ui_attach .i_upload').on('change', function () {
		var $uiAttach = $(this).parents('.ui_attach');
		var filename = $(this).val();

		$uiAttach.find('.i_file').attr("disabled", "disabled").val(filename);
	});

	$('#gnb .nav>ul>li').click(function(){
		$('#gnb .nav>ul>li').removeClass('on');
		$(this).addClass('on');
	});

	$('#gnb .sub li').click(function(){
		$('#gnb .sub li').removeClass('on');
		$(this).addClass('on');
	});

	if($('.bbs_datepicker').length > 0){
		$('.bbs_datepicker input[type="text"]').datepicker({
			showOn: "button",
			buttonImage: "../images/ico_calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date",
			dateFormat : "yy-mm-dd"
		});
	}

	// $('#btnStaff').click(function(){
	// 	$('.pop_wrapper').show();
	// });

	$(document).on('click', '[data-control="modal"]', function (e) {
		e.preventDefault();

		var $el   = $(this),
			$modal;

		var $modal = $($el.data('target'));

		if($modal.is(':hidden')){
			$modal.openModal($.extend($el.data(), {opener: $el}));

		}
	});
});

(function($){
	$.fn.openModal = function (options) {
		this.each(function(index){
			if($(this).data('modalController') === undefined){
				var modalController = new ModalController(this, options);
				$(this).data('modalController', modalController);
			} else {
				var modalController = $(this).data('modalController');
			}

			if(modalController)
				modalController.show($(this));
		})

		return this;
	}

	$.fn.closeModal = function () {
		this.each(function(index){
			var modalController = $(this).data('modalController');
			if(modalController)
				modalController.hide($(this));
		})

		return this;
	}

	$.fn.layoutModal = function () {
		this.each(function(index){
			var modalController = $(this).data('modalController');
			if(modalController)
				modalController.center($(this));
		})

		return this;
	}

	function ModalController(selector, options){
		this.$modal = null;
		this.$openBtn = null;	// 열기 selector
		this.$closeBtn = null;	// 닫기 selector
		this.$targetBtn = null;
		this.$scroller = null;
		this.$opener = null;

		this._init(selector);
		this._initOptions(options);
		this._initEvent();
	}

	/* 요소 초기화 */
	ModalController.prototype._init=function(selector){
		this.$modal = $(selector);
		this.$closeBtn = this.$modal.find('.pop-close');
		//this.$header = this.$modal.find('.pop_head');
		//this.$content = this.$modal.find('.pop_cont');
		//this.$buttonWrap = this.$modal.find('.pop_foot');

		this.isShown = false;
	}

	// 옵션 초기화
	ModalController.prototype._initOptions=function(options){
		this.options = jQuery.extend({}, ModalController.defaultOptions, options);
	}

	ModalController.prototype.center=function(options){
		this.layout();
	}

	ModalController.prototype._initEvent=function(){
		var self = this;

		this.$closeBtn.on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			self.hide();

			if (self.options.opener) {
				$(self.options.opener).focus();
			}
		});

		$(window).on('resize.changemediasize resizeend', function (e) {
			if(self.$modal.is(':visible')){
				self.layout();
			}
		});
	}

	ModalController.prototype._createHolder=function(target){
		var me = this;
		this.$holder = $('<span class="ui-modal-holder" style="display:none;"></span>').insertAfter(this.$modal);
	}

	ModalController.prototype._replaceHolder=function(target){
		var me = this;

		if (me.$holder) {
			me.$modal.insertBefore(me.$holder);
			me.$holder.remove();
		}
	}

	ModalController.prototype._createModalContainer=function(){
		var me = this;

		me.$container = $('<div class="ui-modal-container" />');

		me.$container.css({
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'right': 0,
			'bottom':0
			//'height': '100%'
		}).append(me.$modal.css({
			'zIndex': 2
		})).appendTo('body');
	}

	ModalController.prototype.layout=function(){
		var me = this,
			opts = me.options,
			height, attr,
			winHeight = $(window).height();

		me.$modal.css({
			'display': 'block',
			'visibility': 'hidden',
			'top': '',
			'left': '',
			'height': '',
			'width': ''
		});

		width = me.$modal.width();
		height = me.$modal.height();

		attr = {
			visibility: '',
			display: 'block'
		};

		if (height > winHeight) {
			attr.top = 0;
			attr.marginTop = opts.offsetTop
			attr.marginBottom = opts.offsetTop;
		} else {
			attr.top = (opts.forceTop > 0 ? opts.forceTop : (winHeight - height) / 2);
			attr.height = '';
		}

		me.$modal.stop().css(attr);
	}

	ModalController.prototype._removeModalContainer = function () {
		var me = this;
		me._replaceHolder();
		me.$container.remove();
		me.$dim = null;
		me.$container = null;
	}

	ModalController.prototype.show=function(){
		var me = this;

		if (this.isShown) {
			return;
		}

		this.isShown = true;
		this._createHolder();
		this._createModalContainer();
		this.layout();

		$('html,body').css({'overflow-y':'hidden'});
		$('body').css({'position':'fixed', 'top': -this.scrollTop + 'px'});
	}

	ModalController.prototype.hide=function(e){
		var me = this;

		if(!this.isShown){
			return;
		}

		this.isShown = false;

		me.$modal.css({
			'position': '',
			'top': '',
			'left': '',
			'outline': '',
			'marginLeft': '',
			'marginTop': '',
			'backgroundClip': '',
			'zIndex': '',
			'display': ''
		});

		me._removeModalContainer();
		$('html,body').css({'overflow':''});
		$('body').css({'position':'', 'top': ''});
		$(window).scrollTop(me.scrollTop);
	}

	// 기본 옵션값
	ModalController.defaultOptions = {
		overlay: true,
		forceTop: 0,
		offsetTop: 50,
		offsetLeft: 208
	}
}(jQuery));

//아이디 중복체크 추가
$(function(){
    $(".id_btn").on("focus", 
        function(){ 
             $(".scroll_wrap").show(); 
    });
    $('.id_scroll ul li').click(function(){
        $(".scroll_wrap").hide();
    });
    $('.c_btn').click(function(){
        $(".scroll_wrap").hide();
     });
    });