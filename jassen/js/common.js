$(function(){

	/*팝업*/
	$(".popOpen").click(function(){
		let href = $(this).find('a').attr('href')

		$(href).addClass('on')
	});

	$('.close_btn').click(function(){
		$('.Layer_pop').removeClass('on')
	});

	/*로그인*/

	

});