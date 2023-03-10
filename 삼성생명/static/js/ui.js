/* ==============================
 * 작성일 : 2021-06-01
 * 작성자 : 안효주, 장영석
 * 작성자의 허락없이 무단 도용시 고발 조치 합니다.
 * ============================== */


$(function(){
	/* ==============================
	 * common
	 * ============================== */
	
	clickMotion();
	ieScroll();
	imgChange();
	common.init();
	
	mobileCheck.init();
	include.init();
	layerPopup.init();
	resize.init();
	animation.init();
	formBox.init();
	//folding.init();

	popImgView.init();

	accodionBox();

	tooltip();
	tabList();

	/* ==============================
	 * content
	 * ============================== */

	topBanner();

	locationPage();

	timeList();
	productList();
	productVisual();

	productView.init();

	productTopBox();
	searchDetailBox();

	qnaList();

	asideFixed();

	asideTopMenu();

	starIconBtnWrap();
	

}); 

const topBanner = function(){
	$('.topBanner .btnClose').click(function(){
		$(this).parent().addClass('close')
	});
};

const tabList = function(){
	$(document).on('click','.tabList a',function(){
		if($(this).attr('href').indexOf('#') == 0){
			const target = $(this).attr('href');
			$(target).show().siblings('.tabListView').hide();

			$(this).addClass('on').siblings().removeClass('on')

			if($(target).find('.productListWrap').length){
				productTabShow(target);
			}
			return false;
		}
	});

	function productTabShow(target) {

		$(target).siblings('.tabListView').find('.productList').slick('slickPause');

		/* 상품 */
		$(target).find('.productList').slick('setPosition'); 
		$(target).find('.productList').slick('slickPlay'); 
	}
};

const accodionBox = function(){

	$('.accodionBox .tit').click(function(){
		$(this).parent().toggleClass('on');
		$(this).next('.accodionView').slideToggle();
		
		if(!$(this).closest('.accodionWrap').hasClass('notToggle')){
			$(this).closest('.accodionWrap').find('.accodionBox').not($(this).parent()).removeClass('on').find('.accodionView').slideUp();
		}
		return false; 
	});
};

const tooltip = function(){
	$(document).on('click','.tooltip',function(){
		$(this).siblings('.tooltipPop').toggleClass('on');
		return false;
	});

	$(document).on('click','.tooltipPop .btnClose',function(){
		$(this).closest('.tooltipPop').removeClass('on').find('.tooltip').focus();
		return false;
	});

	$(document).on('click',function(e){
		$('.tooltipPop').removeClass('on');
	}).on('click','.tooltipWrap',function(e){
		e.stopPropagation();
	});

	$(document).on('click','.btnShare',function(){
		$(this).siblings('.sharePop').toggleClass('on');
		return false;
	});

	$(document).on('click','.sharePop .btnClose',function(){
		$(this).closest('.sharePop').removeClass('on').find('.btnShare').focus();
		return false;
	});

	$(document).on('click',function(e){
		$('.sharePop').removeClass('on');
	}).on('click','.shareWrap',function(e){
		e.stopPropagation();
	});
};

const locationPage = function(){
	$(document).on('click','.locationTitle > a',function(){
		$(this).next().slideToggle('fast').parent().toggleClass('on');
		return false;
	})	
}

const loading = {
	open : function(text){

		$('body').append(layerPopHtml());
		$('body').addClass('scrollLock');

		setTimeout(function(){
			$('#ladingPop').addClass('on');
		},10)

		function layerPopHtml(target){
			let $layout = '<div id="ladingPop" class="layerPopWrap loadingWrap">';
			$layout += '<div class="bg"></div>';
			$layout += '<div class="loadingBox">';
			$layout += '<div class="loading"><i></i><i></i><i></i><i></i></div>';
			if(text){
				$layout += '<div class="text">' + text + '</div>';
			}
			$layout += '</div></div>';
			return $layout;
		};
	},
	close : function(){
		$('#ladingPop').removeClass('on');
		$('body').removeClass('scrollLock');

		setTimeout(function(){
			$('#ladingPop').remove();
		},300);
	}
}

const formBox = {
	input : function(){
		$('input').on('focusin',function(){
			if(!$(this).attr('readonly')){
				$(this).closest('.inputBox').addClass('focus');

				if($(this).val()){
					inputBtn($(this),true);
				}else{
					inputBtn($(this),false);
				};
			}
		}).on('focusout',function(){
			if(!$(this).attr('readonly')){
				$(this).closest('.inputBox').removeClass('focus');
				inputBtn($(this),false);
			}
		}).on('keyup',function(){
			if(!$(this).attr('readonly')){
				if($(this).val()){
					inputBtn($(this),true);
				}else{
					inputBtn($(this),false);
				};
			}
		});

		$(document).on('click','.inputBox .btnClose',function(){
			$(this).siblings('input').val('');
			return false;
		});

		function inputBtn(target,check){
			if(check){
				if(target.closest('.inputBox').find('.btnClose').length === 0){
					if(target.closest('.inputBox').hasClass('right')){
						target.closest('.inputBox').find('input').before('<button class="btnClose">삭제</button>');
					}else {
						target.closest('.inputBox').find('input').after('<button class="btnClose">삭제</button>');
					}
				}
			}else{
				setTimeout(function(){
					target.siblings('.btnClose').remove();
				},300);
			}
		}

		/* 비밀번호 */
		$(document).on('click','.btnPwdShow',function(){
			if($(this).siblings('input').attr('type') == 'password'){
				$(this).siblings('input').attr('type','text').closest('.inputBox').addClass('show');
			}else {
				$(this).siblings('input').attr('type','password').closest('.inputBox').removeClass('show');
			}
			return false;
		});
		
		/* 달력 */
		$('.datepicker :input').datepicker({
			dateFormat: 'yy-mm-dd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
			yearSuffix: '년'
		})
		$('.datepicker i').click(function(){
			$(this).siblings(':input').datepicker('show');
		})
	},
	select: function(){
		const target = $('.formBox');
		target.find('select').on('focusin',function(){
			$(this).closest('.selectBox').addClass('focus')
		}).on('focusout',function(){
			$(this).closest('.selectBox').removeClass('focus')
		})
	},
	textarea : function(){
		const target = $('.formBox');
		target.find('textarea').on('focusin',function(){
			$(this).closest('.textarea').addClass('focus')
		}).on('focusout',function(){
			$(this).closest('.textarea').removeClass('focus')
		})
	},
	agreeWrap:function(){
		$('.agreeWrap').each(function(){
			const target = $(this);
			const all = target.find('.agreeAll :checkbox');
			const length = target.find(':checkbox').length - 1;
			target.find(':checkbox').on('change',function(){
				/* 전체메뉴 */
				if($(this).parent().hasClass('agreeAll')){
					if($(this).is(':checked')){
						target.find(':checkbox').each(function(){
							$(this).prop('checked',true);
							all.parent().addClass('on')
						});
					} else {
						target.find(':checkbox').each(function(){
							$(this).prop('checked',false);
							all.parent().removeClass('on')
						});
					}
				}else {
					if(target.find(':checkbox:checked').not(all).length == length){
						all.prop('checked',true);
						all.parent().addClass('on')
					}else {
						all.prop('checked',false)
						all.parent().removeClass('on')
					}
				}
				/* //전체메뉴 */
			});

		})
	},
	init : function(){
		formBox.input();
		formBox.select();
		formBox.textarea();
		formBox.agreeWrap();
	}
}

const Form = {
	error: function(target, massege){
		if(massege){
			$(target).closest('.formBox').addClass('error');
			$('<div class="errorText"></div>').appendTo($(target).closest('.formBox')).text(massege);
		}else{
			$(target).closest('.formBox').removeClass('error').find('.errorText').remove();
		}
	},
	success:function(target, massege){
		if(massege){
			$(target).closest('.formBox').addClass('success');
			$('<div class="successText"></div>').appendTo($(target).closest('.formBox')).text(massege);
		}else{
			$(target).closest('.formBox').removeClass('success').find('.successText').remove();
		}
	}
}

const mobileCheck = {
	val : {
		text:null
	},
	check : function(){
		const $agent = navigator.userAgent;
		const isAndroid = ($agent.match(/Android/i) != null) ? 'android' : null;
		const isBlackBerry = ($agent.match(/BlackBerry/i) != null) ? 'blackBerry' : null;
		const isIOS = ($agent.match(/iPhone|iPad|iPod|iOS/i) != null) ? 'ios' : null;
		const isIPhone = ($agent.match(/iPhone/i) != null) ? 'iphone' : null;
		const isIPad = ($agent.match(/iPad/i) != null) ? 'ipad' : null;
		const isOpera = ($agent.match(/Opera Mini/i) != null) ? 'opera' : null;
		const isWindows = ($agent.match(/IEMobile/i) != null) ? 'windows' : null;
		const isNaverApp = ($agent.indexOf('NAVER(inapp') !== -1) ? 'naverApp' : null;
		const isDaumApp = ($agent.match(/DaumApps/i) != null) ? 'daumApp' : null;
		const isKakaoTalk = ($agent.match(/KAKAOTALK/i) != null) ? 'kakaoTalk' : null;
		const isAny = (isAndroid || isIOS || isBlackBerry || isOpera || isWindows);

		if(isAny){
			$('html').addClass('mobile');
			if(mobileCheck.text){
				$('html').removeClass(mobileCheck.text.join(' '));
			}
			mobileCheck.text = null;
			mobileCheck.text = [isAndroid, isBlackBerry, isIOS, isIPhone, isIPad, isOpera, isWindows, isNaverApp, isDaumApp, isKakaoTalk];
			$('html').addClass(mobileCheck.text.join(' '));
		} else {
			$('html').removeClass('mobile');
			if(mobileCheck.text){
				$('html').removeClass(mobileCheck.text.join(' '));
			}
		}
	},
	init: function(){
		mobileCheck.check();
	}
};


const common = {
	header : function(){
		$(document).on('mouseleave','#headerWrap',function(){
			const top = $(window).scrollTop();
			if(top > 120){
				$('#headerWrap').addClass('scrollHead');
				$('.allMenuBox').removeClass('on');
			}
		});

		$(document).on('click','.allMenuScroll',function(){
			$('.allMenuBox').addClass('on');
			return false;
		});

		$(document).on('click','.headerMenu .allMenu',function(){
			$('.allMenuBox').toggleClass('on');
			return false;
		});

		$(document).on('click','.headerMenu .allMenuBox .depth1 a',function(){
			const idx = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.headerMenu .allMenuBox .otherDepthBox .depthBox').eq(idx).addClass('on').siblings().removeClass('on');
			return false;
		});

		$(document).on('click','.headerMenu .quickMenu .btnMore',function(){
			$('.headerMenu .quickMenu').toggleClass('on');
			return false;
		});

		$(window).scroll(function(){
			const top = $(window).scrollTop();
			if(top > 120){
				$('#headerWrap').addClass('scrollHead');
				$('.allMenuBox').removeClass('on');
			}else {
				$('#headerWrap').removeClass('scrollHead');
			}
		});
	},
	footer: function(){
	},
	init: function(){
		common.header();
		common.footer();
	}
};

const imgChange = function(){
	const width = $(window).outerWidth();
	const mobileW = 768;
	const tabletW = 1280;
	$('*[data-pc-image]').each(function(){
		const $this = $(this);
		const name = $this.prop('tagName');
		const pc = $this.data('pc-image');
		const tablet = $this.data('tablet-image');
		const mo = $this.data('mo-image');

		change(pc);

		if(tablet){
			if(width <= tabletW) change(tablet);
		}

		if(mo){
			if(width <= mobileW) change(mo);
		};

		function change(t){
			if(name === 'IMG'){
				$this.attr('src',t);
			}else{
				$this.css('background-image','url(' + t + ')');
			}
		}
	});
}

const resize = {
	winResize:function(){
		$(window).resize(function(){
			imgChange();
			mobileCheck.init();
		});
	},
	init : function(){
		resize.winResize();
	}
}

/* 클릭 모션 */
const clickMotion = function(){
	$(document).on('mousedown','.clickMotion, .button',function(e){
		const $this = $(this),
			$delay = 650;
		
		if(!$this.find('.click-in').length) $this.prepend('<i class="click-in"></i>')
		
		const btnIn = $this.find('.click-in'),
			btnMax = Math.max($this.outerWidth(),$this.outerHeight()),
			btnX = e.pageX - $this.offset().left - btnMax/2,
			btnY = e.pageY - $this.offset().top - btnMax/2;
		
		btnIn.css({'left':btnX,'top':btnY,'width':btnMax,'height':btnMax})
			.addClass('animate').delay($delay).queue(function(next){
				btnIn.remove();
			});
	});

	$(document).on('mousedown','[class*=clickMotion], .button',function(e){
		const $this = $(this);
		$this.removeClass('on');
		timer = setTimeout(function(){
			$this.addClass('on');
		},1);
		
	});
}


/* 내용불러오기 */
const include = {
	load: function(){
		$(window).load(function(){
			const $include = $('[data-include]');
			$include.each(function(i,el){
				const $this = $(this)
				const src = $this.data('include');
				$this.load(src,function(){
					$this.removeAttr('data-include');
					if($this.attr('id') === 'headerWrap'){
						const $title = $('#container').data('title');
						const $headTitle = document.title;
						if($this && $this !== ''){
							document.title = $title+' | '+$headTitle;
						}
					}
				});
			});
		});

		if($('.btnGroup.fixed').length){
			$('#container').addClass('btnFixedPd')
		}
	},
	init:function(){
		include.load();
	}
};


/* ie 스크롤 */
const ieScroll = function(){
	if(navigator.userAgent.match(/Trident\/7\./)){
		$('html,body').on('mousewheel',function(e){
			e.preventDefault();

			var wheelDelta = event.wheelDelta;
			var currentScrollPosition = window.pageYOffset;
			window.scrollTo(0,currentScrollPosition - wheelDelta);
		});
	};
}

/* 팝업 */
const layerPopup = {
	click: function(){
		$(document).on('click','.popOpen',function(){
			const $this = $(this);
			let href = $this.attr('href');
			if(!href){
				href = $this.data('href');
			}
			layerPopup.open(href,$this);
			return false;
		});
	},
	open: function(target,el){
		const cont = $(target).find('.layerPopCont');
		$(target).addClass('on');
		setTimeout(function(){
			cont.focus();
		},30);
		$('body').addClass('scrollLock');

		cont.find('.btnPopClose').last().on('keydown',function(e){
			var code = e.which;
			if(code == 9){
				$(this).closest('.layerPopCont').focus();
			};
		});
		layerPopup.close(target,el);

		if($(el).data('video')){
			const video = $(el).data('video')
			const tit = $(el).find('.tit').text();
			const date = $(el).find('.date').text();

			$(target).find('.videoPopTitBox .tit').text(tit);
			$(target).find('.videoPopTitBox .date').text(date);
			$(target).find('.video iframe').attr('src',video);
		}
	},
	close: function(target,reTarget){
		let btnTarget = reTarget ? reTarget : '';

		$(target).off('click');
		$(target).find('.btnPopClose').off('click');

		$(target).find('.btnPopClose').on('click',function(){
			layerPopup.actionClose(target,reTarget);
			return false;
		});
		$(target).on('click',function(e){
			if($(e.originalEvent.target).hasClass('layerPopWrap')){
				layerPopup.actionClose(target,reTarget);
			}
		});
	},
	actionClose : function(target,reTarget){
		let btnTarget = reTarget ? reTarget : '';
		$(target).removeClass('on');
		$('body').removeClass('scrollLock');

		if($(target).hasClass('videoPop')){

			$(target).find('.videoPopTitBox .tit').text('');
			$(target).find('.videoPopTitBox .date').text('');
			$(target).find('.video iframe').attr('src','').empty();
		}

		if(reTarget) btnTarget.focus();
	},
	init: function(){
		layerPopup.click();
	}

} 

/* 동작 인터렉션 */
const animation = {
	scrollAni: function(){
		const $elements = $( '*[data-animation]' );
		let h = $(window).height();
		$elements.each( function( i, el ) {
			const $el = $( el );
			const animationClass = $el.data('animation').split(',');
			
			$el.waypoint(function(i){
				h = $(window).height();
				if(i == 'up'){
					animation.scrollDD('remove',$el, animationClass);
				}
				if(i == 'down'){
					animation.scrollDD('add',$el, animationClass);
				}

			}, { offset: animation.waypointerCheck($el)[0] +'%',triggerOnce: animation.waypointerCheck($el)[1]});
		});
	},
	scrollChildAni: function(){
		const $elements = $( '*[data-child-animation]' );
		let h = $(window).height();
		$elements.each( function( i, el ) {
			const $el = $( el );
			const $child = $el.children();
			const animationClass = $el.data('child-animation').split(',');
			
			$child.each(function(j){
				const el = $(this);
				el.css('opacity',0)
				el.waypoint(function(i){
					h = $(window).height();
					if(i == 'up'){
						el.css('opacity',0)
						animation.scrollDD('remove',el, animationClass, j);
					}
					if(i == 'down'){
						el.css('opacity',1)
						animation.scrollDD('add',el, animationClass, j);
					}

				}, { offset: animation.waypointerCheck(el)[0] +'%',triggerOnce: animation.waypointerCheck(el)[1]});
			})
		});
	},
	numberCount:function(){
		const $elements = $( '*[data-count]' );
		let h = $(window).height();

		$elements.each( function( i, el ) {
			const $el = $( el );
			const count = $el.data('count').toString().split(',');
			let delay = 0;
			let duration = 800;
			let fixed = 0;
			if($el.data('tofixed'))fixed = $el.data('tofixed');
			if(count[1]) delay = parseInt(count[1]);
			if(count[2]) duration = parseInt(count[2]);

			$el.waypoint(function(i){
				h = $(window).height();
				if(i == 'up'){
					$el.text('-');
				}
				if(i == 'down'){
					$({val:0}).stop(delay).animate({val:count[0]},{
						duration:duration,
						step:function(){$el.text(animation.addComma(this.val.toFixed(fixed)))},
						complete:function(){$el.text(animation.addComma(this.val.toFixed(fixed)))}
					});
				}

			}, { offset: animation.waypointerCheck($el)[0] +'%',triggerOnce: animation.waypointerCheck($el)[1]});
		});
	},

	textAnimation: function(){

		const $elements = $( '*[data-text-animation]' );
		const h = $(window).height();

		$elements.each( function( i, el ) {
			const $el = $( el );
			let textAni = $el.data('text-animation'),
				number = $el.text();

			let _duration = 100,
				_delay = 0;
			if($el.data('duration') > 0) _duration = $el.data('duration');
			if($el.data('delay') > 0) _delay = $el.data('delay');

			$el.addClass(textAni);

			textMotionType($el,_duration,_delay);

			$el.waypoint(function(e){
				if(e == 'down'){
					textMotionType($el,_duration,_delay);
				};
			}, { offset: animation.waypointerCheck($el)[0] +'%',triggerOnce: animation.waypointerCheck($el)[1]});
		});

		function textMotionType(target,duration,delay){
			var timer;
			var split = target.text().split('');
			var last = split.length -1;
		
			target.text('');
			target.empty();
			clearTimeout(timer);
			$.each(split,function(e){
				setTimeout(function(){
					$('<span class="JStextMotion"></span>').appendTo(target).text(split[e]).addClass(split[e] == ' ' ? 'space' : '');
					timer = setTimeout(function(){
						target.find('.JStextMotion').eq(target.data('reverse') ? last -e : e).addClass('on');
					},e*duration);
				},delay);
			});
		}
	},

	scrollDD:function(i,target,name,idx){
		if(i == 'add') {
			target.addClass('animated '+ name[0]);
			if(name[1]){target.css({'-webkit-animation-delay':name[1]+'ms','animation-delay':name[1]+'ms'})}
			if(name[2]){target.css({'-webkit-animation-duration':name[2]+'ms','animation-duration':name[2]+'ms'})}

			if(target.parent().data('child-repeat')){
				const repeat = target.parent().data('child-repeat');
				let delay = name[1];
				if(repeat > idx){
					delay = name[1]*idx;
				}else {
					idx = idx % repeat;
					delay = name[1]*idx;
				}
				if(name[1]){target.css({'-webkit-animation-delay':delay+'ms','animation-delay':delay+'ms'})}
			}
			
		} else if(i == 'remove'){
			target.removeClass('animated '+ name[0]);
		}
	},
	waypointerCheck:function(target){
		let Wpoint = 100;
		let Wonce = false;
		if(target.data('waypoint-point')) Wpoint = target.data('waypoint-point');
		if(target.data('waypoint-once')) Wonce = target.data('waypoint-once');
	
		return [Wpoint,Wonce];
	},

	addComma:function(num){
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return num.toString().replace(regexp,',');
	},

	init : function(){
		animation.scrollAni();
		animation.scrollChildAni();
		animation.numberCount();
		animation.textAnimation();
	}
}

// const folding = {
// 	list: function(btn, panel, speed = 300) {
// 		$(document).on('click', btn, function(e){
// 			e.preventDefault();
// 			const $closest = $(this).closest('li');
// 			const $siblings = $closest.siblings();
// 			if($closest.hasClass('active')){
// 				$closest.removeClass('active').find(panel).stop(true).slideUp(speed);
// 			}else{
// 				$closest.addClass('active').find(panel).stop(true).slideDown(speed);
// 			}
// 			$siblings.removeClass('active').find(panel).stop(true).slideUp(speed);
// 		});
// 	},
// 	init: function(){
// 		if($('.ui-folding-list').length) folding.list('.ui-folding-btn', '.foldingPanel');
// 	}
// }


const timeList = function(){
	const target = $('.timeListWrap');
	const slick = target.find('.timeList');
	const prev = target.find('.btnPrev');
	const next = target.find('.btnNext');
	slick.slick({
		arrows:false,
		slidesToShow:3,
		slidesToScroll:3,
		autoplay: false,
		autoplaySpeed: 4000,
		dots:true,
		appendDots: target.find('.paging')
	});
	
	prev.click(function(){
		slick.slick('slickPrev');
		return false;
	});
	next.click(function(){
		slick.slick('slickNext');
		return false;
	});

	target.find('.btnPlayStop').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('정지');
			slick.slick('slickPlay');
		}else{
			$(this).addClass('on').text('플레이');
			slick.slick('slickPause');
		}
		return false;
	});

	if(target.closest('.tabListView').length >0){
		if(target.closest('.tabListView').css('display') !== 'block'){
			slick.slick('slickPause');
		}
	}
}

const productList = function(Target){
	let target = $('.productListWrap');
	if(Target) {
		target = $(Target);
	}
	target.each(function(){
		const slick = $(this).find('.productList');
		const prev = $(this).find('.btnPrev');
		const next = $(this).find('.btnNext');
		let swiper = $(this).data('swiper-none') === '' ? false :  true;
		let auto = $(this).data('auto') ? $(this).data('auto') : false;
		let slideMotionNumber = $(this).data('col') ? $(this).data('col') :5;
		
		if(slick.hasClass('slick-initialized')){
			slick.slick('unslick');
		}

		if(auto){
			$(this).find('.btnPlayStop').addClass('show');
		}

		if($(this).data('col')){
			slick.addClass('col'+ slideMotionNumber);
		}	
		
		if(swiper){
			slick.slick({
				arrows:false,
				slidesToShow:slideMotionNumber,
				slidesToScroll:slideMotionNumber,
				autoplay: auto,
				autoplaySpeed: 4000,
				dots:true,
				appendDots: $(this).find('.paging')
			});
			
			prev.click(function(){
				slick.slick('slickPrev');
				return false;
			});
			next.click(function(){
				slick.slick('slickNext');
				return false;
			});
	
			let arrowCount = slick.find('.list').length;
			if(arrowCount <= slideMotionNumber){
				prev.hide();
				next.hide();
			}
	
			$(this).find('.btnPlayStop').click(function(){
				if($(this).hasClass('on')){
					$(this).removeClass('on').text('정지');
					slick.slick('slickPlay');
				}else{
					$(this).addClass('on').text('플레이');
					slick.slick('slickPause');
				}
				return false;
			});
	
			if($(this).closest('.tabListView').length >0){
				if($(this).closest('.tabListView').css('display') !== 'block'){
					slick.slick('slickPause');
				}
			}
		}else {
			$(this).addClass('noSlick');
			prev.hide();
			next.hide();
		}
	})
}

const productVisual = function(){
	const target = $('.productVisualWrap');
	target.each(function(){
		const slick = $(this).find('.visual');
		const prev = $(this).find('.btnPrev');
		const next = $(this).find('.btnNext');

		slick.slick({
			arrows:false,
			autoplay: true,
			autoplaySpeed: 4000,
			dots:true,
			appendDots: $(this).find('.paging')
		});
		
		prev.click(function(){
			slick.slick('slickPrev');
			return false;
		});
		next.click(function(){
			slick.slick('slickNext');
			return false;
		});

		$(this).find('.btnPlayStop').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on').text('정지');
				slick.slick('slickPlay');
			}else{
				$(this).addClass('on').text('플레이');
				slick.slick('slickPause');
			}
			return false;
		});

		if($(this).closest('.tabListView').length >0){
			if($(this).closest('.tabListView').css('display') !== 'block'){
				slick.slick('slickPause');
			}
		}
	})
}

const productTopBox = function(){
	const optionList = $('.optionList > a');
	optionList.click(function(){
		$(this).toggleClass('on').next('.view').slideToggle();
		return false;
	});

	const viewChange = $('.productTopBox .viewBox > a');
	viewChange.click(function(){
		if($(this).hasClass('btnList')){
			$(this).closest('.productTopBox').next('.productList').addClass('listView')
		}
		if($(this).hasClass('btnGrid')){
			$(this).closest('.productTopBox').next('.productList').removeClass('listView')
		}
		$(this).addClass('on').siblings().removeClass('on')
		return false;
	})
}

const searchDetailBox = function(){
	const target = $('.searchDetailWrap');
	target.find('.btnAll').click(function(){
		$(this).toggleClass('on').parent().next().toggleClass('allopen')
		return false;
	});

	target.find('.btnSearchText').click(function(){
		$(this).toggleClass('on').siblings('.searchDetailBox').slideToggle();
		return false;
	});

}

const qnaList = function(){
	$(document).on('click','.qnaList .success',function(){
		$(this).toggleClass('on').siblings('.view').slideToggle();
		return false;
	});
}

const productView = {
	visual:function(){
		const target = $('.productViewTop .visualBox');
		const visual = target.find('.visual .img');
		const list = target.find('.visualList > a');
		let idx = 0;

		list.click(function(){
			let left = 0;
			if(idx < $(this).index()){
				left = -100;
			}else if(idx > $(this).index()){
				left = 100;
			}

			anime({
				targets:visual.eq(idx)[0],
				left:[0,left+'%'],
				duration: 600,
				easing:'easeInOutQuad'
			})
			anime({
				targets:visual.eq($(this).index())[0],
				left:[(-1*left)+'%',0],
				duration: 600,
				easing:'easeInOutQuad'
			})
			idx = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			return false;
		});
	},
	imgShow:function(){
		$('.productDetailWrap .sec01 .imgBox .button').click(function(){
			//$(this).parent().toggleClass('on')
			if ($(this).parent().hasClass('on')){
				$(this).parent().removeClass('on');
				const top = $(this).parent().offset().top - $('#headerWrap').outerHeight(true) - $('.productTab').outerHeight();
				$('body,html').scrollTop(top)
			} else {
				$(this).parent().addClass('on');
			}
			return false;
		})
	},
	productTab:function(){
		const target = $('.productTab > a');
		const header = $('#headerWrap');
		target.click(function(){
			href = $(this).attr('href');
			let top = $(href).offset().top - header.outerHeight(true) - target.parent().outerHeight();
			$('html,body').animate({'scrollTop':top});
			return false;
		});
	},
	init : function(){
		productView.visual();
		productView.imgShow();
		productView.productTab();
	}
}

const asideFixed = function(){
	if($('.orderInfo').length || $('.productDetailWrap').length){
		let target = '';
		if($('.orderInfo').length){
			target = $('.orderInfo');
		}
		if($('.productDetailWrap').length){
			target = $('.productDetailWrap');
		}
		const aside = target.find('> .right')
		const header = $('#headerWrap');
		let targetTop = target.offset().top;

		$(window).scroll(function(){
			targetTop = target.offset().top;
			let top = $(window).scrollTop();

			if(targetTop - header.outerHeight(true) - 15 <= top){
				aside.addClass('fixed');
			}else {
				aside.removeClass('fixed');
			};

			/* 맨 마지막 체크 */
			const footer = $('#footerWrap').outerHeight();
			const asideH = aside.outerHeight();
			const asideT = parseInt(aside.css('top'));
			const docH = $(document).outerHeight();

			if(top > docH -footer - asideH - asideT - 160){
				aside.css({'transform':'translateY(' + (docH -footer - asideH - asideT - 160 - top) +'px)'})
			}else {
				aside.css({'transform':'translateY(0)'})
			}

		});
	}
}

const asideTopMenu = function(){
	const target = $('.asideMenu');
	const btnTop = target.find('.btnTop');
	$(window).scroll(function(){
		let top = $(window).scrollTop();
		if(top > 400) {
			btnTop.addClass('on');
		}else {
			btnTop.removeClass('on');
		}
	});

	btnTop.on('click',function(){
		$('html,body').animate({'scrollTop':0});
		$('#header .headerSearch input').focus();
		return false
	});
}

const starIconBtnWrap = function(){
	if($('.starIconBtnWrap').length){
		const target = $('.starIconBtnWrap');
		const star = target.find('.starIconBtn button');
		const text = target.find('.text');
		const textG = ['나빠요','별로에요','보통이에요','좋아요!','최고에요!'];
		star.click(function(){
			let idx = $(this).index();
			star.removeClass('on');
			$(this).addClass('on');
			target.find('.starIconBtn button:lt('+idx+')').addClass('on');

			text.text(textG[idx]);
			return false;
		});

	}
}

const popImgView = {
	options : {
		href:'',
	},
	btn : function(){
		$('.popImgView img').click(function(){
			const target = $(this).parent().attr('href');
			popImgView.options.href = target;
			popImgView.addHtml($(this).parent(),target);

			$(target).find('.slickImg').slick({
				arrows:false,
				dots:true,
				initialSlide: $(this).index()
			});

			setTimeout(function(){
				$(target).addClass('on');
			},10)
			
			setTimeout(function(){
				$(target).find('.layerPopCont').focus();
			},30)

			return false;
		});

		$(document).on('click','.layerPopCont.imgView .btnPopClose',function(){
			$(this).closest('.layerPopWrap').removeClass('on');
			$('body').removeClass('scrollLock');

			setTimeout(function(){
				$(popImgView.options.href).remove();
			},300);
			return false;
		});
	},
	addHtml : function(t,target){
		let $layout = '<div id="' + target.replace('#','') +  '" class="layerPopWrap">';
		$layout += '<div class="layerPopCont imgView" tabindex="0">';
		$layout += '<div class="contBox"><div class="slickImg">';

		$(t).find('img').each(function(){
			$layout += '<div class="img"><img src="' + $(this).attr('src') +'" alt="" /></div>';
		});

		$layout += '</div></div><a href="#" class="btnClose btnPopClose">팝업닫기</a>';
		$layout += '</div></div>';

		$('body').append($layout);
	},
	init : function(){
		popImgView.btn();
	}
}


/* 팝업 플러그인 */
;(function($){
	$.fn.alert = function(options){
		let settings = $.extend({
			noIcon: false,
			buttons : 1,
			buttonText : ['확인'],
			buttonClose : 1,
			text : 'alert내용입니다 <br /> html 태그로 넣어주시면 됩니다.',
			textAlign : 'center',
			submit : function(){ console.log('전송버튼호출') },
			close : function(){ console.log('닫기버튼호출')}
		},options);
		
		return this.each(function(){
			const _this = $(this)

			/* id 경로 */
			let href = $(this).attr('href');
			if(!href){
				href = $(this).data('href');
			}
			/*//id 경로 */
			layerPopInit(href,$(this));
			layerPopOpen(href,$(this));
			
			function layerPopInit(target,change){
				$(target).remove();
			}
			
			function layerPopOpen(target,change){
				layerPopAppend(target);
				$('body').addClass('scrollLock');
				
				setTimeout(function(){
					$(target).addClass('on');
				},10)
				
				setTimeout(function(){
					$(target).find('.layerPopCont').focus();
				},30)
				
				$(target).find('.btnPopClose').last().on('keydown',function(e){
					const code = e.which;
					if(code == 9){
						$(this).closest('.layerPopCont').focus();
					};
				});
				
				$(target).find('.btnSubmit').on('click',settings.submit);
				$(target).find('.btnPopClose').on('click',settings.close);
				
				layerPopClose(change);
			}
			
			function layerPopClose(target){

				$(href).find('.btnSubmit').on('click',function(){
					close($(this));
					return false;
				});
				$(href).find('.btnPopClose').on('click',function(){
					close($(this));
					return false;
				});

				$(document).on('click', href, function(e){
					if($(e.originalEvent.target).hasClass('layerPopWrap')){
						$(href).find('.btnPopClose:last').trigger('click');
						$(document).off('click', href);
						close($(this));
					}
				});

				function close(t){
					const $this = t;
					$this.closest('.layerPopWrap').removeClass('on');
					$('body').removeClass('scrollLock');
					target.focus();

					$(target).find('.btnSubmit').off('click');
					$(target).find('.btnPopClose').off('click');

					setTimeout(function(){
						$(href).remove();
					},300);
				}
			}
			
			function layerPopAppend(target){
				$('body').append(layerPopHtml(target));
				$(target).find('.textBox').css('text-align',settings.textAlign);
				$(target).find('.btnPopGroup button').eq(settings.buttonClose - 1).addClass('btnPopClose').siblings().addClass('btnSubmit');
				if(settings.noIcon){
					$(target).addClass('noIcon')
				}
			}
			
			function layerPopHtml(target){
				let $layout = '<div id="' + target.replace('#','') +  '" class="layerPopWrap alertPop">';
				$layout += '<div class="bg"></div>';
				$layout += '<div class="layerPopCont" tabindex="0">';
				$layout += '<div class="contBox">';
				$layout += '<div class="textBox">' + settings.text +'</div>';
				$layout += '<div class="btnPopGroup">';
				if(settings.buttons == 1){
					$layout += '<button class="button">' + settings.buttonText + '</button>';
				}else{
					$layout += '<button class="button line">' + settings.buttonText[0] + '</button><button class="button">' + settings.buttonText[1] + '</button>';
				}
				$layout += '</div></div></div></div>';
				return $layout;
			};
			
		});
	};
}(jQuery));

;(function($){
	$.fn.popup = function(options){
		let settings = $.extend({
			full : false,
			title : '타이틀 영역들어갑니다',
			text : 'alert내용입니다 <br /> html 태그로 넣어주시면 됩니다.',
			load : null,
			remove : false,
			submit : function(){ console.log('전송버튼호출') },
			close : function(){ console.log('닫기버튼호출')}
		},options);
		
		return this.each(function(){
			const _this = $(this)

			/* id 경로 */
			let href = $(this).attr('href');
			if(!href){
				href = $(this).data('href');
			}
			/*//id 경로 */
			layerPopInit(href,$(this));
			layerPopOpen(href,$(this));
			
			function layerPopInit(target,change){
				if(settings.remove){
					$(target).remove();
				}
			}
			
			function layerPopOpen(target,change){
				if(!$(target).length){
					layerPopAppend(target);
				}
				$('body').addClass('scrollLock');
				
				setTimeout(function(){
					$(target).addClass('on');
				},10)
				
				setTimeout(function(){
					$(target).find('.layerPopCont').focus();
				},30)
				
				$(target).find('.btnPopClose').last().on('keydown',function(e){
					const code = e.which;
					if(code == 9){
						$(this).closest('.layerPopCont').focus();
					};
				});
				
				$(target).find('.btnSubmit').on('click',settings.submit);
				$(target).find('.btnPopClose').on('click',settings.close);
				
				layerPopClose(change);
			}
			
			function layerPopClose(target){

				$(href).find('.btnSubmit').on('click',function(){
					close($(this));
					return false;
				});
				$(href).find('.btnPopClose').on('click',function(){
					close($(this));
					return false;
				});

				$(document).on('click', href, function(e){
					if($(e.originalEvent.target).hasClass('layerPopWrap')){
						$(href).find('.btnPopClose:last').trigger('click');
						$(document).off('click', href);

						close($(this));
					}
				});

				function close(t){
					const $this = t;
					$this.closest('.layerPopWrap').removeClass('on');
					$('body').removeClass('scrollLock');
					target.focus();

					$(target).find('.btnSubmit').off('click');
					$(target).find('.btnPopClose').off('click');

					if(settings.remove){
						setTimeout(function(){
							$(href).remove();
						},300);
					}
				}
			}
			
			function layerPopAppend(target){
				$('body').append(layerPopHtml(target));
				if(settings.load){
					$(target).find('.textBox').load(settings.load);
				}
				$(target).find('.textBox').css('text-align',settings.textAlign);
				$(target).find('.btnPopGroup button').eq(settings.buttonClose - 1).addClass('btnPopClose').siblings().addClass('btnSubmit');
				if(settings.full){
					$(target).addClass('full')
				}
			}
			
			function layerPopHtml(target){
				let $layout = '<div id="' + target.replace('#','') +  '" class="layerPopWrap bottomPop">';
				$layout += '<div class="bg"></div>';
				$layout += '<div class="layerPopCont" tabindex="0">';
				$layout += '<div class="contBox">';
				$layout += '<p class="title">' + settings.title  + '</p>';
				if(settings.load){
					$layout += '<div class="textBox"></div>';
				}else{
					$layout += '<div class="textBox">' + settings.text +'</div>';
				}
				$layout += '</div><a href="#" class="btnClose btnPopClose">팝업닫기</a>';
				$layout += '</div></div>';
				return $layout;
			};
			
		});
	};
}(jQuery));
// 팝업 플러그인