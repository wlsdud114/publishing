$(function(){
    //slide btn
    let mainWidth = $("main").width() + 5;

    $('.slide_btn').css('left',mainWidth);

    $(".slide_btn").click(function(){
        $(this).toggleClass('close');
        if($(this).hasClass('close')){
            $('.program_area').animate({'left': -mainWidth},800);
            $('.viewer_area').animate({'left': -mainWidth},800);
            $(this).animate({'left': 0},800);
            $(this).find('img').attr('src','../image/slide_open.png');
        } else {
            $('.program_area').animate({'left': 0},800);
            $('.viewer_area').animate({'left': 0},800);
            $(this).animate({'left': mainWidth},800);
            $(this).find('img').attr('src','../image/slide_close.png');
        }

    })



})