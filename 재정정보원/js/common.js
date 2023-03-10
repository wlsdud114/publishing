$(document).ready(function(){
    //GNB 애니메이션
    var newBg = $('#bg');

    $('header').append(newBg);

    var gnb = '.gnb';
    var sub = '.sub-mn';
    var bg = '#bg';

    $(gnb).hover(function(){
        $(sub + ', ' + bg).stop().animate({top:'110px'},500);
    },function(){
        $(sub + ', ' + bg).stop().animate({top:'-500px'},500);
    });

	//mobile GNB
	function showLeftMenu(){
		const mobGnb = document.getElementsByClassName('.gnb');

		mobGnb.style['right'] = "0px";
	}
	function closeLeftMenu(){
		const mobGnb = document.getElementsByClassName('.gnb');

		mobGnb.style['right'] = "-100%";
	}

	var mGnbClose = '#mClose';
    var mGnbOpen = '.ui_group .menu-btn';

    $(mGnbClose).click(function(){
        $('.m_gnb').animate({right : '-100%'},1000);
    });
    $(mGnbOpen).click(function(){
        $('.m_gnb').animate({right : '0px'},1000);
    });

	// mobile 서브메뉴
	$(".m_gnb .main-mn").click(function(ignore){
        ignore.preventDefault();

		$(this).addClass('open');
		if($(this).hasClass('open')){
			$('.m_gnb .main-mn').removeClass('open');
			$('.m_gnb .sub-mn').slideUp('slow');
			$(this).next('.sub-mn').slideDown('slow');
		}
    });

	//mobile 3depth 메뉴
	$(".m_gnb .main-mn").click(function(){
		$(this).find(".s-sub-mn").addClass('open');
			if($('.s-sub-mn').hasClass('open')){
				$('.m_gnb .main-mn .s-sub-mn').removeClass('open');
				$('.m_gnb .sub-mn .s-sub-mn').slideUp('slow');
				$(this).next('.s-sub-mn').slideDown('slow');
			}
    });

	// 메인 검색 박스
	$('.ui_group .search-btn').click(function(){
		$('.main_searchBox').animate({top: '110px'},700);
	});

	$('.ui_group #SrchClose').click(function(){
		$('.main_searchBox').animate({top: '-110px'},700);
	});

	//메인 슬라이드
		var $slide = $('.visual_wrap');
		var $nav = $('.slider-tab').find('li');
		var $navBg = $('.tabActive ')
		var enableNav = true; //클릭하여 내비게이션 이동 허용 여부(슬라이드 동작 중 클릭되는 것을 방지)
		var speed = 1000;//슬라이드 속도

		$slide.on('init reInit', function (event, slick) {//페이징이니셜
		  if(!slick.$dots) return;
		}).on('beforeChange', function(event, slick, currentSlide, nextSlide){ //슬라이드 변경 시 내비 및 페이징 변경
		  //내비 변경
		  if(enableNav){
			$nav.removeClass("on");
			$nav.eq(nextSlide).addClass("on");
			$navBg.animate({left : (nextSlide * 25)+'%'});
			navStatus();
		  }
		});

		function navStatus(){ //슬라이드 동작 중 내비클릭 방지
		  enableNav = false;
		  setTimeout(function() {
			enableNav = true;
		  }, speed);
		}

		$nav.on("click", function(){ //내비 클릭시 해당 인덱스로 이동
		  if(enableNav){
			var slideNo = $(this).index();
			$slide.slick('slickGoTo', slideNo);
			$nav.removeClass("on");
			$(this).addClass("on")
			navStatus();
		  }
		});

		$slide.not('.slick-initialized').slick({
		  arrows: true,
		  prevArrow: '.moveLeft',
		  nextArrow: '.moveRight',
		  dots: false,
		  infinite: true,
		  autoplay:false,
		  fade:true,
		  speed:speed,
		  autoplay:true,
		  autoplaySpeed:3000,
		  draggable: true
		});

	//main board tab-menu
	$('.tab_remote ol li').click(function(){
		let tabBoard = $(this).parents('.tab_remote').siblings('.tab_board_wrap').find('.tab_board');
		let tabNum = $(this).index();

		tabBoard.css('z-index','0');
		tabBoard.eq(tabNum).css('z-index','1');
		$(this).addClass('on').siblings().removeClass('on');
	})

	//기본 메인페이지 슬라이더
	$(".board-slider").not('.slick-initialized').slick({
		arrows: false,
		dots: true,
		infinite: true,
		autoplay:true,
		autoplaySpeed:3000,
		draggable: true,
		// responsive: [
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
		// 			slidesToShow:1,
		// 			slidesToScroll: 1
		// 		}
		// 	}
		// ]
	});

	//재정동향 슬라이더
	$(".bar-type").not('.slick-initialized').slick({
		arrows: true,
		prevArrow:'.slideLeft',
		nextArrow:'.slideRight',
		dots: true,
		infinite: true,
		autoplay:true,
		autoplaySpeed:3000,
		draggable: true
	});

	$('.board-cont-remote .slidePause').on('click', function() {
		$('.bar-type').slick('slickPause');
		$(this).hide();
    	$(this).siblings('.slidePlay').show()
	});

	$('.board-cont-remote .slidePlay').on('click', function() {
		$('.bar-type').slick('slickPlay');
		$(this).hide();
		$(this).siblings('.slidePause').show()
	});

	//배너존 슬라이더
	$(".banner-wrap .bnnr").not('.slick-initialized').slick({
		arrows: true,
		prevArrow:'.bannerLeft',
		nextArrow:'.bannerRight',
		dots: false,
		slidesToShow: 3,
    	slidesToScroll: 3,
		infinite: true,
		autoplay:true,
		autoplaySpeed:3500,
		draggable: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow:2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow:1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.bannerPause').on('click', function() {
		$('.banner-wrap').slick('slickPause');
		$(this).hide();
    	$(this).siblings('.bannerPlay').show()
	});

	$('.bannerPlay').on('click', function() {
		$('.banner-wrap').slick('slickPlay');
		$(this).hide();
		$(this).siblings('.bannerPause').show()
	});

	//패밀리사이트 슬라이더
	$(".site-wrap").not('.slick-initialized').slick({
		arrows: true,
		prevArrow:'.bnnrLeft',
		nextArrow:'.bnnrRight',
		dots: false,
		slidesToShow: 7,
    	slidesToScroll: 1,
		infinite: true,
		autoplay:true,
		autoplaySpeed:3000,
		draggable: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow:5
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow:4
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow:3
				}
			}
		]
	});


    //selectBox 클릭
    const label = document.querySelectorAll('.select');
    label.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.optionItem');
            clickLabel(lb, optionItems);
        })
    });
    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('active')) {
            lb.parentNode.classList.remove('active');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('active');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        }
    }
    const handleSelect = (label, item) => {
        label.innerHTML = item.textContent;
        label.parentNode.classList.remove('active');
    }

    //tab-menu 클릭
    const tabMenu = document.querySelectorAll('.tb-mn');

    tabMenu.forEach(function(el){
        el.addEventListener('click', active);
    });

    function active(el){
        let btnTarget = el.currentTarget;

        tabMenu.forEach(function(el) {
            el.classList.remove("active");
         });

        btnTarget.classList.add("active");
    };

    //footer selectbox 버튼 클릭
    $('.related-site .select').click(function(){
        if($('.related-site').hasClass('active')){
            $('.related-site-list').css({top:'-374px'}).show();
        } else {
            $('.related-site-list').css({top:'0'}).hide();
        }
    });

    // LNB
    let lnbMenu = $('.lnb .def');
    $('.lnb .def.on').find(".lnbsub").show();

    $(".lnb .def").click(function(){
        /*if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).find(".lnbsub").slideUp();

        } else {
            lnbMenu.removeClass('on');
            lnbMenu.find(".lnbsub").slideUp();
            $(this).addClass('on');
            $(this).find(".lnbsub").slideDown();
        }*/
        $(this).find(".lnbsub").slideToggle();
    });

    $(".lnb .def-y>a").click(function(ignore){
        ignore.preventDefault();
    });

	$(".btn-wrap > button").click(function(){
		sharer(this);
	});

	// view-tbl empty td colspan 설정하기.
	function trColspan(){
		$(".grid-full-wdt tr .name").attr("colspan", 2);
		$(".grid-full-wdt tr .date").attr("colspan", 2);
	}
	function trColspanNon(){
		$(".grid-full-wdt tr .name").attr("colspan", 0);
		$(".grid-full-wdt tr .date").attr("colspan", 0);
	}
	//테이블에서 file 없을 때 subject width 100%
	function checkFile(){
		if($('.file').length == 0){
			$('.subject').css("width","100%");
		};
	};

	//Moblie 쿼리 실행
	$(window).resize(function(){
		if (window.innerWidth < 768) {
			trColspan();
		} else {
			trColspanNon()
		}
	}).resize();

	$(window).load(function(){
		if (window.innerWidth < 768) {
			trColspan();;
		} else {
			trColspanNon()
		}


	}).resize();

});


function sharer(val){
	var pageUrl      		= "";
	var type = $(val).attr("id");
	/*
	if(type == "twitter"){
		var request = gapi.client.urlshortener.url.insert({
	        'resource' : {
	            'longUrl' : location.href
	        }
	    });
	    request.execute(function(response) {
	        if (response.id != null) {
	       	 pageUrl = response.id;
	        }else{
	       	 pageUrl = encodeURIComponent(location.href);
	        }
	    });
	}else{
		pageUrl = encodeURIComponent(location.href);
	}
	*/
	pageUrl = encodeURIComponent(location.href);

	var sns;
	var pageTitle			= encodeURIComponent($(".sv_wrap > h2").text());
	var pageSubTitle 		= encodeURIComponent($(".strapline > h3").text());

	if(pageUrl == ""){
		setTimeout(function(){
			var br					= encodeURIComponent('\r\n');
			var pageArticleTitle	= "";
			var pageArticlePattern 	= "/lay(\\d+)/bbs/S(\\d+)T(\\d+)C(\\d+)/(\\S)/(\\d+)/view.do";
			var pageHref 			= location.href;
			var matchResult 		= pageHref.match(pageArticlePattern);
			if(matchResult){
				if($("#v_title").html() != null){
					pageArticleTitle = br+encodeURIComponent($("#v_title").html());
				}
			}
			if(pageUrl == ""){
				pageUrl = encodeURIComponent(location.href);
			}
			sendSns(type,pageUrl,pageTitle,pageSubTitle,pageArticleTitle,pageUrl);
		},1000);
	}else{
		var br					= encodeURIComponent('\r\n');
		var pageArticleTitle	= "";
		var pageArticlePattern 	= "/lay(\\d+)/bbs/S(\\d+)T(\\d+)C(\\d+)/(\\S)/(\\d+)/view.do";
		var pageHref 			= location.href;
		var matchResult 		= pageHref.match(pageArticlePattern);
		if(matchResult){
			if($(".v_title").html() != null){
				pageArticleTitle = br+encodeURIComponent($(".v_title").html());
			}
		}
		if(pageUrl == ""){
			pageUrl = encodeURIComponent(location.href);
		}
		sendSns(type,pageUrl,pageTitle,pageSubTitle,pageArticleTitle,pageUrl);
	}
}

function sendSns(type,pageUrl,pageTitle,pageSubTitle,pageArticleTitle,pageUrl){
	switch(type) {
		case 'facebook' : //facebook
			sns = {
				type:'popup',
				url:"https://www.facebook.com/sharer.php?u=" + pageUrl
			};
			break;
		case 'twitter' : // twitter
			sns = {
				type:"popup",
				url:"https://twitter.com/intent/tweet?text=" + encodeURIComponent("[한국재정정보원]") + pageTitle + "::" + pageSubTitle + pageArticleTitle + "&url=" + pageUrl
			};
			break;
		case 'blog' : // blog
			sns = {
				type:"popup",
				url:"https://blog.naver.com/openapi/share?url=" + pageUrl + "&title=" + encodeURIComponent("[한국재정정보원]") + pageTitle + "::" + pageSubTitle + pageArticleTitle
			};
			break;
		case 'kakaostory' : // kakaostory
			sns = {
				type:"popup",
				url:"https://story.kakao.com/share?url=" + pageUrl
			};
			break;
		case 'print' : // print
			printCenterArea();
			return;
		case 'linkclip' : // url copy
			window.prompt('아래의 URL을 복사하여 사용하실수 있습니다.', location.href);
			return;
		default :
			return;
	}
	window.open(sns.url, "share_blog", 'width=600,height=400,scrollbars=yes');
}


