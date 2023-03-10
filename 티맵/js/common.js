$(function(){
    //로딩 화면 자동차 애니메이션
    function carAni(){
        for(let loading = 0; loading <= 100; loading++){
            $('.ld-img').animate({left: loading + "%"},20);
        }
    };

    setInterval(carAni,4000);

    //전체동의 체크 버튼 클릭 시 일괄 체크
    $('#master-chk').click(function(){
        if($('#master-chk').is(":checked")){
            $('input[name=terms]').prop("checked", true);
        } else {
            $('input[name=terms]').prop("checked", false);
        }
    });

    // 체크박스 해제 시 전체동의 체크 버튼 해제
    $('input[name=terms]').click(function(){
        let total = $('input[name=terms]').length;
        let checked = $('input[name=terms]:checked').length;

        if(total != checked){
            $('#master-chk').prop("checked", false);
        } else {
            $('#master-chk').prop("checked", true);
        }
    });


});

//팝업창 열기
function popOpen(){
    document.getElementById("toast-pop").style.bottom = 0;
    document.getElementById("bg").style.display = "block";
};

//팝업창 닫기
window.onload = function () {
    const closing = document.getElementById("bg");
    closing.onclick = popClose;
};

function popClose(){
    document.getElementById("bg").style.display = "none";
    document.getElementById("toast-pop").style.bottom = -600 + "px";
}

//랜딩페이지로 돌아가기
function goBack(){
    window.history.back();
};

//동의하고 상담받기 버튼 클릭
function nextStep(){
    document.getElementById("termsAccept").style.display = "none";
    document.getElementById("personalInfo").style.display = "block";
};


