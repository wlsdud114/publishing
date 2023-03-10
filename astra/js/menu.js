
$(function() {
	
	var pathname = $(location).attr('pathname');
	var search = $(location).attr('search');

	$("nav[class=nav] ul").map(function() { 
		if ($(this).hasClass("sub")) {
			$(this).prev().click(function () {
				if ($(this).parent().hasClass("on")) {
					$(this).parent().removeClass();
				} else {
					$(this).parent().addClass("on");
					$(this).parent().siblings().removeClass('on');
				}
			});
			
			$(this).find("a").map(function() { 
				if ($(this).attr("href") == pathname) {
					$(this).parent().addClass("on");
					$(this).parent().parent().parent().addClass("on");
				}
			});
		}
	});
})