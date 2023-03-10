$(function(){

// gnb 펼침, 닫힘
function gnbClose(){
    $('.gnb').animate({left:'-100%'},500);
    $('.bg').fadeOut();
}
function gnbOpen(){
    $('.gnb').animate({left:'0'},500);
    $('.bg').fadeIn();
}

$('header .menu').click(gnbOpen);
$('.gnb .close_btn').click(gnbClose);

// datepicker
  var dateFormat = "yy/mm/dd",
  from = $( "#from" )
    .datepicker({
      dateFormat: 'yy-mm-dd',
      inline: true,
      showOtherMonths: true,
      showMonthAfterYear: true,
      monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showOn: "button",
      buttonImage: "../image/icon/icon_calender.png",
    })
    .on( "change", function() {
      to.datepicker( "option", "minDate", getDate( this ) );
    }),
  to = $( "#to" ).datepicker({
    dateFormat: 'yy-mm-dd',
    inline: true,
    showOtherMonths: true,
    showMonthAfterYear: true,
    monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showOn: "button",
    buttonImage: "../image/icon/icon_calender.png",
  })
  .on( "change", function() {
    from.datepicker( "option", "maxDate", getDate( this ) );
  });

function getDate( element ) {
  var date;
  try {
    date = $.datepicker.parseDate( dateFormat, element.value );
  } catch( error ) {
    date = null;
  }

  return date;
}

});

function optionToggle(){
    let option = document. querySelector(".option_btn");
    option.classList.toggle("active");
};

// 전체동의 체크
function masterchk(){
  if($('#mastercheck').is(':checked')){
    $(".checkbox input").prop("checked",true);
  } else {
    $(".checkbox input").prop("checked",false);
  }
};

// 체크 하나라도 해제 시 전체동의 해제
$(document).on("click", ".checkbox ", function(e) {

	var total = document.querySelectorAll("input[name=terms]").length;
  var select = document.querySelectorAll("input[name=terms]:checked").length;

  if(total == select){
    $("#mastercheck").prop("checked", true);
  } else {
    $("#mastercheck").prop("checked", false);
  }

});


