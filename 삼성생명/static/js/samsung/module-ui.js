/**
 * JavaScript UI Library
 * @author
 * @copyright
 */

"use strict";

PUB.createNs("ui");

/**
 * UI 기능 코드
 * @namespace ui
 * @memberOf PUB
 */
PUB.ui = (function() {

	return {
		/**
		 * 화면 레이아웃
		 * @memberOf PUB.ui
		 */
		setLayout: function() {
			var me = this;

			var $header = $('.header');
			var headerH = $header.outerHeight();;
			var contMinH = 0;
			var $content = $('.content');

			if($header.exists()){
				contMinH = $(window).height() - headerH;
			} else {
				contMinH = $(window).height();
			}
			$content.css('min-height', contMinH);
		},
		tabPanel :function(){
			$.fn.tabPanel=function(options){
				
				this.each(function(index){  
					var tabPanel = new TabPanel(this, options);
					$(this).data("tabPanel", tabPanel); 
				});
		
				return this;
			}
			
			$.fn.selectTabPanel=function(tabIndex, animation){
				this.each(function(index){  
					var tabPanel =$(this).data("tabPanel");
					if(tabPanel)
						tabPanel.setSelectTabMenuItemAt(tabIndex, animation);
				})
				
				return this;
			}
			
			function TabPanel(selector, options){
				this._$tabPanel = null;
				this._$tabMenu = null;
				this._$tabMenuItems = null;
				this._$selectTabMenuItem = null;
				
				this._$tabContents = null;
				this._$selectTabContent = null;
		
				this._effect= null;
				this._tabContentWidth = -1;
				this._options = null;
				
				this._init(selector);
				this._initEvent();
				this._initOptions(options);
				this._initTabContents();
				this.setSelectTabMenuItemAt(this._options.startIndex,false);
			}
		
			/*
			*      요소 초기화
			*/
			TabPanel.prototype._init=function(selector){
				this._$tabPanel = $(selector);
				this._$tabMenu = this._$tabPanel.find(".js_tab_menu");
		
				this._$tabMenuItems = this._$tabMenu.children("li");
				
				this._$tabContents = this._$tabPanel.find(".js_tab_contents .js_tab_cont");
				
				this._tabContentWidth = this._$tabPanel.find(".js_tab_contents").width();   
			}
		
		
			// 옵션 초기화
			TabPanel.prototype._initOptions=function(options){
				this._options = jQuery.extend({}, TabPanel.defaultOptions, options);
				this._effect = this._options.effect;
			}
		
			/*
			*      이벤트 초기화 
			*/
			TabPanel.prototype._initEvent=function(){
				var objThis = this;
				this._$tabMenuItems.on("click",function(e){
					e.preventDefault();
					objThis.setSelectTabMenuItem($(this));
				})
			}
		
			/* 
			* 탭 콘텐츠 초기화
			*/
			TabPanel.prototype._initTabContents=function(){
				
				this._$tabContents.css({opacity:0}).hide();
			}
		
			/*
			* 
			*      탭 메뉴  아이템 선택
			*/
			TabPanel.prototype.setSelectTabMenuItem=function($item, animation){
				if(this._$selectTabMenuItem){
					this._$selectTabMenuItem.removeClass("is_active");
				}
				this._$selectTabMenuItem = $item;
				this._$selectTabMenuItem.addClass("is_active"); 
				
				var newIndex = this._$tabMenuItems.index(this._$selectTabMenuItem);
				this._showContentAt(newIndex, animation);          
			}
		
			/*
			*      index 번째 탭메뉴 아이템 선택
			*/
			TabPanel.prototype.setSelectTabMenuItemAt=function(index, animation){
				this.setSelectTabMenuItem(this._$tabMenuItems.eq(index), animation);
			}
		
			/*
			* index에 맞는 탭 내용 활성화
			*/
			TabPanel.prototype._showContentAt=function(index, animation){
				// 1. 활성화/비활성화 탭 내용 찾기
				var $hideContent = this._$selectTabContent;
				var $showContent =  this._$tabContents.eq(index);
			
				if(animation==false){
					TabPanel.normalEffect.effect({
						$hideContent:$hideContent,
						$showContent:$showContent
					});
				
				}else {
			
					this._effect.effect({
						$hideContent:$hideContent,
						$showContent:$showContent,            
						showIndex:index,
						tabContentWidth: this._tabContentWidth,
						
						duration : this._options.duration ,
						easing:this._options.easing                    
					});
				}
				// 4. 선택 탭 내용 업데이트 
				this._$selectTabContent = $showContent;
			}

			TabPanel.prototype.effect=function(){
				
			}
		
			// 일반 출력 효과 
			TabPanel.normalEffect={
				effect:function(params){
					if(params.$hideContent){
						params.$hideContent.css({
							left:0,
							opacity:0
						}).hide();
					}
					
					params.$showContent.css({
						left:0,
						opacity:1
					}).show(); 
				}
			}
		
			/*
			* 슬라이드 출력 효과
			*/
			TabPanel.slideEffect={
				effect:function(params){        
					var hideIndex = -1;
					if(params.$hideContent){
						hideIndex= params.$hideContent.index();
					}
				
					// 이동 방향 구하기
					var direction = "";
					if(hideIndex<params.showIndex) 
						direction = "next";
					else
						direction = "prev";
						
					
					// 이동 위치 구하기
					// prev가 기본
					var hideEndLeft = 0;
					var showStartLeft = 0;
				
					if(direction=="next"){
						hideEndLeft = -params.tabContentWidth;
						showStartLeft = params.tabContentWidth;
					}else {
						hideEndLeft =  params.tabContentWidth;
						showStartLeft = -params.tabContentWidth;
					}
					
					// 2. 현재 탭 내용 비활성화
					if(params.$hideContent){
						params.$hideContent.stop().animate({
							left:hideEndLeft,
							opacity:0
						}, params.duration, params.easing);
					}
					
					// 3. 신규 탭 내용 활성화
					// 신규 탭 내용 위치 초기화
					params.$showContent.css({
						left:showStartLeft,
						opacity:0
					} )
				
					// 신규 탭 내용 애니메이션 적용 
					params.$showContent.stop().animate({
						left:0,
						opacity:1
					}, params.duration, params.easing);
				}
		
			}
		
			/*
			* 페이드 출력 효과
			*/
			TabPanel.fadeEffect={
				effect:function(params){
					// 2. 현재 탭 내용 비활성화
					if(params.$hideContent){
						params.$hideContent.stop().animate({
							left:0,
							opacity:0
						}, params.duration, params.easing);
					}
					
					// 3. 신규 탭 내용 활성화
					params.$showContent.stop().animate({
						left:0,
						opacity:1
					}, params.duration, params.easing);
				}
			}
		
			// 기본 옵션값 
			TabPanel.defaultOptions = {
				startIndex:0,
				effect: TabPanel.normalEffect
			}
		}
	}
}());


/**
* 업로드 디자인 적용
* @memberOf PUB.ui
*/
PUB.ui.fileUpload = function(){
	// fileUpload 플러그인
	$.fn.fileUpload=function(){
		// 선택자에 해당하는 요소 개수 만큼 FileUpload 객체 생성
		this.each(function(index){
			var fileUpload = new FileUpload(this);
			$(this).data("fileUpload", fileUpload);
			
		});
		return this;
	}

	function FileUpload(selector, options){
		// 프로퍼티 생성하기 
		this.$fileUpload = null;
		this._$inpTxt  = null;
		this._$inpFile = null;
		
		this._init(selector);
		this._initEvent();
		//this._initOptions(options);
	}

	// 요소 초기화 
	FileUpload.prototype._init=function(selector){
		this.$fileUpload = $(selector);
		this._$inpTxt = this.$fileUpload.find(".js_fileUpload_txt");
		this._$inpFile = this.$fileUpload.find('.js_fileUpload_file');
	}

	// 옵션 초기화
	//FileUpload.prototype._initOptions=function(options){
	//	this._options = jQuery.extend({}, FileUpload.defaultOptions, options);
	//	this._effect = this._options.effect;
	//}

	// 이벤트 초기화 
	FileUpload.prototype._initEvent=function(){
		var me = this;
		
		this._$inpFile.on('change', function(){
			var filename = $(this).val();
			me._$inpTxt.attr("disabled", "disabled").val(filename);
		});
	}

	// 기본 옵션값 
	//FileUpload.defaultOptions = {
	//}
}

/**
* Slick 페이지 넘버
* @memberOf PUB.ui
*/
PUB.ui.swipeNum = function(){
	var $status = $('.js_sliderNum');
	var $slickElement = $(".js_slider__pageNum");

	$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.text(i + ' / ' + slick.slideCount);
	});
}

PUB.ui.ModalController = function(){
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

		$(window).on('resize resizeend', function (e) {
			if(self.$modal.is(':visible')){
				self.layout();
			}
		});
	}

	ModalController.prototype._createHolder=function(target){
		var me = this;
		this.$holder = $('<span class="js_pop-holder" style="display:none;"></span>').insertAfter(this.$modal);
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

		me.scrollTop = $('html,body').scrollTop();
		
		me.$container = $('<div class="js_pop_bg" />');

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

		if(!me.options.overlay){
			me.$container.css('background', 'none');
		}
	}

	ModalController.prototype.layout=function(){
		var me = this,
			opts = me.options,width,
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

		$('html,body').css({'overflow':'hidden'});
		$('body').css({'position':'fixed', 'top': -me.scrollTop + 'px'});
	}

	ModalController.prototype.hide=function(e){
		var me = this;

		if(!this.isShown){
			return;
		}

		this.isShown = false;

		if(me.options.fade){
			me.$modal.fadeOut(400, function (){
				me._removeModalContainer();
			})
		} else {
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
		}

		$('html,body').css({'overflow':''});
		$('html,body').css({'position':'', 'top': ''});
		$(window).scrollTop(me.scrollTop);
	}

	// 기본 옵션값
	ModalController.defaultOptions = {
		overlay: true,
		forceTop: 0,
		fade : true,
		offsetTop: 50,
		offsetLeft: 208
	}

	$('[data-control="popup"]').click(function(){
		var $target = $('#' + $(this).attr('data-handler'));
		$target.openModal();
	});
}