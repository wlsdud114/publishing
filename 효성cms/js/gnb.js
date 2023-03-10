$(function(){
    function panelOpen(){
        $('.gnb').css({'background-color':'#fff'});
        $('.gnb .title a').css('color','#333');
        $('.gnb .logo img').attr('src','../image/logo/logo2.png');
        $('.gnb .util #login').attr('src','../image/icon/gnb_login_blk.svg');
        $('.gnb .util #info').attr('src','../image/icon/gnb_info_blk.svg');
        $('.gnb .util #menu').attr('src','../image/icon/bt_menu_bk.svg');
        $('.childpanel').css('z-index','0');
    }
    function panelClose(){
        $('.gnb').css({'height':'60px','background-color':'#000'});
        $('.gnb .title a').css('color','#fff');
        $('.gnb .logo img').attr('src','../image/logo/logo.png');
        $('.gnb .util #login').attr('src','../image/icon/gnb_login.svg');
        $('.gnb .util #info').attr('src','../image/icon/gnb_info.svg');
        $('.gnb .util #menu').attr('src','../image/icon/bt_menu_wh.svg');
        $('.childpanel').css('z-index','0');
    }



    $('.gnb .menu li').hover(function(){
        let panelHeight = $(this).find('.childpanel').innerHeight() + 60;
        console.log(panelHeight);

        if($(this).find('.childpanel').length > 0){
            panelOpen();

            $(this).find('.childpanel').css({'z-index':'100'});
            $('.gnb').css({'height':panelHeight});
        }

    },function(){
        panelClose();
    })

});