$(function(){
    function panelOpen(){
        $('.gnb').css({'background-color':'#fff'});
        $('.gnb .title a').css('color','#333');
        $('.gnb .logo img').attr('src','/images/hyosung/fo/logo/logo2.png');
        $('.gnb .util #login').attr('src','/images/hyosung/fo/icon/gnb_login_blk.svg');
        $('.gnb .util #info').attr('src','/images/hyosung/fo/icon/gnb_info_blk.svg');
        $('.gnb .util #menu img').attr('src','/images/hyosung/fo/icon/bt_menu_bk.svg');
        $('.childpanel').css('z-index','0');
    }
    function panelClose(){
        $('.gnb').css({'height':'60px'});
        /*$('.gnb .title a').css('color','#fff');*/
        /*$('.gnb .logo img').attr('src','/images/hyosung/fo/logo/logo.png');
        $('.gnb .util #login').attr('src','/images/hyosung/fo/icon/gnb_login.svg');
        $('.gnb .util #info').attr('src','/images/hyosung/fo/icon/gnb_info.svg');
        $('.gnb .util #menu img').attr('src','/images/hyosung/fo/icon/bt_menu_wh.svg');*/
        $('.childpanel').css('z-index','0');
    }
    function sideMenuOpen(){
        $('.rnb').animate({right:'0'});
    }
    function sideMenuClose(){
        $('.rnb').animate({right:'-400px'});
    }

    $(window).load(function(){
        panelClose();

       $('.gnb .menu>li').hover(function(){
            let panelHeight = $(this).find('.childpanel').innerHeight() + 60;
            $(this).find('.title').addClass('on');

            if($(this).find('.childpanel').length > 0){
                panelOpen();

                $(this).find('.childpanel').css({'z-index':'100'});
                $('.gnb').css({'height':panelHeight});
            } else {
                panelClose();
            }
        },function(){
            $(this).find('.title').removeClass('on');
        });

        //util hover event
        $('.util li .title').hover(function(){
        	$(this).find('.tooltip').css('display','block');
        	return false;
        },function(){
        	$('.tooltip').css('display','none');
        	return false;
        });

        // RNB 메뉴 펼치기
        $('.util #menu').click(function(){
            $(this).toggleClass('open');

            if($(this).hasClass('open')){
                $(this).find('img').attr('src','/images/hyosung/fo/icon/bt_menu_close.svg');
                sideMenuOpen();
                return false;
            } else {
                $(this).find('img').attr('src','/images/hyosung/fo/icon/bt_menu_wh.svg');
                sideMenuClose();
                return false;
            };
        });

        // RNB 메뉴 클릭 sub메뉴 노출
        $('.rnb .menu li').click(function(){
            $('.childpanel').css({'display':'none','z-index':'0'});;
            $(this).find('.childpanel').css({'display':'block','z-index':'100'});
        });

        $('main').mouseenter(function(){
            panelClose();
        });

         $(".childpanel #youtubeBtn").on("click", function(){
	        var gnbYoutubeSrc = $('#gnbYoutube').attr("src");
	        var gnbYoutubeSrcSplit = gnbYoutubeSrc.split("?")[0];

	        $('#gnbYoutube').attr("src", gnbYoutubeSrcSplit + "?autoplay=1&mute=1").css('display','block');
	        $(this).fadeOut(100);
	        return false;
	    });

        $(window).scroll(function(){
            let ScrollHeight = $(document).scrollTop();

            if(ScrollHeight >= 300){
                panelOpen();
                console.log('scroll');
            } else {
                panelClose();
            };
        });
    });

    //quickmenu btn
    $('.remote_btn div').hover(function(){
        $(this).addClass('h_over');
        return false;
    },function(){
        $(this).removeClass('h_over');
        return false;
    });

    //퀵메뉴 3초뒤 닫힘
    setTimeout(function(){
        $('.remote_btn div').removeClass('h_over');
    },3000);

    //퀵메뉴 클릭시 메뉴 펼쳐짐
    $('.remote_btn div:first-child a').click(function(){
        $('.quick_menu_list').addClass('on');
    });

    $('main').click(function(){
        if($('.quick_menu_list').hasClass('on')){
            $('.quick_menu_list').removeClass('on');
            $('.quick_menu_list').css('display','block');
        } else {
            $('.quick_menu_list').css('display','none');

        };
    });
    //main visual slide
    $('.visual_nav .tab-bar li').click(function(){
        let moveNav = $(this).index();
        console.log(moveNav)
    });

    let slide = 2;
    let navBar = 0;

    function fadeIn(){
        let imgSrc = "url('/images/hyosung/fo/layout/main_img0"+ slide + ".jpg')";


        $('.visual_img').css('background',imgSrc);

		if(slide==4){
			slide=1;
            navBar=3;
		} else if(slide == 1){
            slide++;
            navBar = 0;
        }
         else {
			slide++;
            navBar++;
		}


		$('.visual_img').css('background',imgSrc);
        $('.visual_img').css({"background-size":"cover","background-attachment":"fixed","background-position":"top","background-repeat":"no-repeat"});

        $('.visual_txt_wrap .visual_txt:first-child>div').eq(slide-2).siblings().animate({top :'-100px'},500);
        $('.visual_txt_wrap .visual_txt:nth-child(2)>div').eq(slide-2).siblings().animate({top :'-100px'},500);
        $('.visual_txt_wrap .visual_txt:nth-child(3)>div').eq(slide-2).siblings().animate({top :'-100px'},500);
        $('.visual_txt_wrap .visual_txt:last-child>div').eq(slide-2).siblings().animate({top :'-100px'},500);

        $('.visual_txt_wrap .visual_txt:first-child>div').eq(slide-2).animate({top :'0px'},500);
        $('.visual_txt_wrap .visual_txt:nth-child(2)>div').eq(slide-2).animate({top :'0px'},500);
        $('.visual_txt_wrap .visual_txt:nth-child(3)>div').eq(slide-2).animate({top :'0px'},500);
        $('.visual_txt_wrap .visual_txt:last-child>div').eq(slide-2).animate({top :'0px'},500);

        $('.visual_nav ul li').removeClass('on');
        $('.visual_nav ul li').eq(slide-2).addClass('on');
        $('.visual_nav .indicator').animate({left: (navBar) * 25 +'%' });


	};

    var Timer = setInterval(fadeIn,5000);

    let toggle = true;

    $('.pause_btn').click(function(){
        if(toggle){
            clearInterval(Timer);
            toggle = false;
            $(this).find('img').attr('src','/images/hyosung/fo/icon/bt_play.png');
        } else {
            Timer = setInterval(fadeIn,5000);
            toggle = true;
            $(this).find('img').attr('src','/images/hyosung/fo/icon/bt_pause.svg');
        }
    });

    //bottom_banner slide
    $('.bottom_banner_slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    // slideArea
        $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows : true,
        nextArrow:$('.slide_btn'),
        dots:true,
        dotsClass : "slick-dots",
        responsive:[
            {
                breakpoint: 768,
                settings: {
                slidesToShow:1,
                slidesToScroll: 1
                }
            }
        ]
      });


    // slide pagination
    let n = $('.pagination li').index();

    $('.slide_btn').click(function(){
        let pageLength = $('.pagination li').length - 1;

        $('.pagination li').removeClass('on');

        if(n == 2){
            n=0;
        } else {
            n++;
        }
        $('.pagination li').eq(n).addClass('on');
    });

    //accordian search button
    $('.acrd_ui_search .img_icon').click(function(){
    	$(this).css('display','none');
    	$('.acrd_ui_search .search_close').css('display','block');
        $('.acrd_ui_search').addClass('on');
        $('.acrd_ui_search .search_btn').css('display','block');
    })
    $('.acrd_ui_search .search_close').click(function(){
    	$('.acrd_ui_search .img_icon').css('display','block');
    	$(this).css('display','none');
        $('.acrd_ui_search').removeClass('on');
        $('.acrd_ui_search .search_btn').css('display','none');
    });

    //cont-slider
    /*let slideLength = $('.cont-slider .slider').length -1;
    let slideIndex = 0;
    function slideright(){
        if(slideIndex == 0){
            slideIndex = slideLength;
        } else {
            slideIndex--;
        }
        console.log("slideright : " + slideIndex);
        $('.cont-slider .slider').removeClass('on');
        $('.cont-slider .slider').eq(slideIndex).addClass('on');
        $('.slider-pagination li').removeClass('on');
        $('.slider-pagination li').eq(slideIndex).addClass('on');
    }
    function slideleft(){
        if(slideIndex == slideLength){
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        console.log("slideleft : " + slideIndex);

        $('.cont-slider .slider').removeClass('on');
        $('.cont-slider .slider').eq(slideIndex).addClass('on');
        $('.slider-pagination li').removeClass('on');
        $('.slider-pagination li').eq(slideIndex).addClass('on');
    }

    $('.cont-slider .slider-btn .slide-lft').click(function(){
        slideright();
    })

    $('.cont-slider .slider-btn .slide-rgt').click(function(){
       slideleft();
    });

    var contTimer = setInterval(slideleft,3000)*/

    //scrolling banner
    let bannerLeft=0;
    let first=1;
    let last;
    let imgCnt=0;
    let $img = $(".solution_list>div");
    let $first;
    let $last;

    $img.each(function(){
        $(this).css("left",bannerLeft);
        bannerLeft += $(this).width()+120;
        $(this).attr("id", "banner"+(++imgCnt));
    });


    if( imgCnt > 5){
        last = imgCnt;

        setInterval(function() {
            $img.each(function(){
                $(this).css("left", $(this).position().left-1);
            });
            $first = $("#banner"+first);
            $last = $("#banner"+last);
            if($first.position().left < -150) {
                $first.css("left", $last.position().left + $last.width()+80 );
                first++;
                last++;
                if(last > imgCnt) { last=1; }
                if(first > imgCnt) { first=1; }
            }
        }, 30);

     };

    //demo sticky slide animation
     $(window).scroll(function(){
        let def = $(document).scrollTop();
        console.log(def);

        // if(def < 2000){
        //    alert('#1');
        // } else if(2000 < def < 3000){
        //     alert('#2');
        // } else if(3000 < def < 4000){
        //     alert('#3');
        // } else if(4000 < def < 5000){
        //     alert('#4');
        // }
     });

    //footer select
    $('.ui_select').on('click',function(){
        let listHeight = 40;
        let listIndex = $(this).find('li').length;

        $(this).toggleClass('open');

        if($(this).hasClass('open')){
            $(this).css('height', listHeight*listIndex);
        } else {
            $(this).css('height', '35px');
        };

    });

    //top btn
    $( '.top_btn' ).click( function() {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
        return false;
    } );

    //modal_btn
    $('.modal .modal_close').click(function(){
        $('.modal').fadeOut();
    });

    //서비스시작하기 모달 팝업창
    $('.service_modal').click(function(){
        $('.modal').fadeIn();
    })

    //faq 탭 리스트 모바일 슬라이드
    // let tabNum = $(".lt_tab_list li").length;

    // $('.lt_tab_list').slick({
    //     infinite: false,
    //     slidesToShow: tabNum,
    //     slidesToScroll: tabNum,
    //     arrows : true,
    //     nextArrow:$('.tab_right'),
    //     dotsClass : "slick-dots",
    //     responsive:[
    //         {
    //             breakpoint: 650,
    //             settings: {
    //             slidesToShow:7,
    //             slidesToScroll: 7
    //             }
    //         },
    //         {
    //             breakpoint: 570,
    //             settings: {
    //             slidesToShow:5,
    //             slidesToScroll: 5
    //             }
    //         },
    //         {
    //             breakpoint: 520,
    //             settings: {
    //             slidesToShow:4,
    //             slidesToScroll: 4
    //             }
    //         },
    //         {
    //             breakpoint: 400,
    //             settings: {
    //             slidesToShow:3,
    //             slidesToScroll: 3
    //             }
    //         }
    //     ]
    //   });

    //faq 탭 펼치기
    $('.lt_faq img').click(function(){
        if($(this).hasClass('open')){
            $(this).parents().siblings('.lt_cont').slideUp();
            $(this).attr('src','/images/hyosung/fo/icon/i_down-arrow.png').removeClass('open')
        } else {
            $(this).parents().siblings('.lt_cont').slideDown();
            $(this).attr('src','/images/hyosung/fo/icon/i_up-arrow_bg.svg').addClass('open');
        }
    });




})