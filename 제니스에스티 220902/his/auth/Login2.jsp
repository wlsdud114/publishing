<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/CommonInclude.jsp" %>

<title><c:out value="${appTitle}"/> :: 로그인</title>
<!-- 
<link  type="text/css"rel="stylesheet"  href="${css}/common.css"/>
<link rel="stylesheet" type="text/css" href="${ctxRoot}/resources/his/user/publishing/css/popupwindow.css" />
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/default.css" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/style.css" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/layout.css" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/font.scss" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/login.css?time=2022032416" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/common.css?time=2022032416" data-cssvars="skip" data-cssvars-job="1">
 -->
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/css/reset.css" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/css/fonts.css" data-cssvars="skip" data-cssvars-job="1">
<link type="text/css" rel="stylesheet" href="${ctxRoot}/resources/login/css/common.css" data-cssvars="skip" data-cssvars-job="1">
 
<script>
	var root = "${ctxRoot}";
	var ContextPath ="${ctxRoot}";
</script>
<script type="text/javascript" src="${js}/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="${js}/aes.js"></script>
<script type="text/javascript" src="${ctxRoot}/resources/his/user/publishing/js/common-utils.js"></script>
<script type="text/javascript" src="${ctxRoot}/resources/his/user/publishing/js/popupwindow.js"></script>
<script type="text/javascript">
var g_CookieCode = "SecmCode";
var g_CookieName = "SecmId";
var g_CookiePeriod = 31;

$('document').ready(function(){
	var errMsg = "${errMsg}";
	if(errMsg)alert(errMsg);
	var getCookieCodeInIe = getCookie(g_CookieCode);
	var getCookieNameInIe = getCookie(g_CookieName);
	if(getCookieNameInIe ){
		$("#Txt_Code").val(getCookieCodeInIe);
		$("#Txt_UsrId").val(getCookieNameInIe);
		$('#Txt_Password').focus();
	}else{
		$('#Txt_Code').focus();
	}

	$('#Txt_Password').keydown( function(event) { if(event.keyCode == 13){ pageEvent.Loginbtn(); } });
	$('#Btn_Login').click( function() {		
		<c:choose>
			<c:when test="${SSO_CHECK eq 'N'}">
				pageEvent.Loginbtn(); 			
			</c:when>
			<c:otherwise>
				pageEvent.ssoAuth(); 
			</c:otherwise>
		</c:choose>		
	});
	
	$('#ComSummit').click(function(){

		var param = "";
	
		//기관정보
		//var UserID = '<c:out value="${indata.id}"/>';
		//var CompanyCODE = '<c:out value="${indata.code}"/>';
		var UserID = $("#Txt_UsrId").val();	
		var CompanyCODE = $("#Txt_Code").val();	
		var OldPWD = $('#TempPWD').val();
		var ChangePWD = $('#ChangePWD').val();
		var ChangePWDCHK = $('#ChangePWDCHK').val();
		console.log("UserID",UserID);
		console.log("CompanyCODE",CompanyCODE);
		console.log("OldPWD",OldPWD);
		console.log("ChangePWD",ChangePWD);
		console.log("ChangePWDCHK",ChangePWDCHK);
		
		if(OldPWD == ChangePWD){
			alert('기존 비밀번호와 같습니다. 다시 확인해 주세요');
			return;
		}		

		if (ChangePWD != ChangePWDCHK) {
			alert('변경할 비밀번호를 확인해 주세요.');
			return;
		}
		
		if(checkPassword(ChangePWD, UserID) == "mix" ){
			alert("비밀번호는 숫자와 영문자를 혼용하여 사용해야 합니다.");
		}else if(checkPassword(ChangePWD, UserID) == "same" ){
			alert('비밀번호는 같은 문자를 4번 이상 사용하실 수 없습니다.');
		}else{
			$.ajax({
				type : 'POST',
				url : './PwdChange.do',
				dataType : 'json',
				contentType : 'application/json',
				async : false,
				data : JSON.stringify({
					userid : UserID,
					id : UserID,
					companycode : CompanyCODE,
					passwd : OldPWD,
					newpwd : ChangePWD
				}),
				success : function(data){
					console.log("data ==> " + JSON.stringify(data));
					console.log("data.status ==> " + data.status);
					if(data.result == "PWDF"){
						alert('현재 비밀번호를 확인해주십시오.');
					}
					if(data.status =="SUCCESS"){
						alert("비밀번호가 변경 되었습니다.");
						$("#popup_changePWD").PopupWindow("close");	
					}
				},
					error : function(request, status, error){
				}
			});
		}
	})
	// 취소버튼 클릭
	$('#ComCansel').click(function(CompanyID){
		$("#popup_changePWD").PopupWindow("close");	
	});
	
});
/*****************************************************************************
Desc   : 전역변수 관련 선언
gbLoginFlag - 로그인 버튼 클릭 여부 flag
*****************************************************************************/
var global =
{
	gbLoginFlag : false
};
var pageEvent =
{
    /********************************************************************
        Name   : fn_LoginHandle
        Desc   : 로그인을 처리한다.
        Param  : 없음
    ********************************************************************/
    Loginbtn : function()
    {
    	var ID = $('#Txt_UsrId').val();
    	var PWD = $('#Txt_Password').val();
    	var CODE = $('#Txt_Code').val();
    	
    	if(CODE == "" || CODE == null){
    		alert("기관코드를 입력하세요");
    		return;
    	}
    	else if(ID == "" || ID == null){
    		alert("아이디를 입력하세요");
    		return;
    	}
    	else if(PWD == "" || PWD == null){
    		alert("패스워드를 입력하세요");
    		return;
    	}
    	
    	var encriptPWD = (CryptoJS.AES.encrypt(PWD, $("#cripkey").val())).toString();
    	
    	$.ajax({
    		type : 'POST',
    		url : './login.do',
    		dataType : 'json',
    		contentType : 'application/json',
    		async : false,
    		data : JSON.stringify({
    			id : ID,
    			passwd : encriptPWD,
    			companycode : CODE
    		}),
    		success : function(data){
    		   	global.gbLoginFlag = false;
    		   	
    		   	console.log(JSON.stringify(data));
    		   	//패스워드 체크 하지않음
    		   
   		   	    switch(data.status)
   	        	{
   	            	case "PWDSC" :
   							//ID 저장여부 쿠기셋팅
 								setCookie(g_CookieCode, $("#Txt_Code").val().trim(), g_CookiePeriod);
 								setCookie(g_CookieName, $("#Txt_UsrId").val().trim(), g_CookiePeriod);
 								var resulttf = compareDate(data.result[0].updatetime);
 								if(resulttf){ 									
 									//location.href='${ctxRoot}/img/SearchGeneral';
 									location.href='${ctxRoot}/new/MainScan?topR=N';

									
 								}else{
 									if(data.result[0].userid=='admin'){
 										//location.href='${ctxRoot}/img/SearchGeneral';
 										location.href='${ctxRoot}/new/MainScan?topR=N';
 									
 									}else{
 										alert("비밀번호 기간이 만료 되었습니다.");
 										popup_changePWD();
 									}
 								}
   	                    	break;
   	            	case "USRNF" :
   	                    	alert("로그인에 실패했습니다.");
   	                    	break;
   	            	case "PWDF" :
   	                		alert("로그인에 실패했습니다.");
   	               	 		break;
    	            case "CODEF" :
    	            		alert("로그인에 실패했습니다.");
    	           	 		break;
    	            case "IDPW" :
    	            	if(${PASSWD_CHECK == 'N'}){
    						setCookie(g_CookieCode, $("#Txt_Code").val().trim(), g_CookiePeriod);
    						setCookie(g_CookieName, $("#Txt_UsrId").val().trim(), g_CookiePeriod);
    						location.href='${ctxRoot}/new/MainScan';
        		   		}else{
    	            		alert("아이디와 동일한 패스워드는 사용하실수 없습니다. 패스워드 변경 후 사용 가능합니다.");
    	            		popup_changePWD();
    	            		//window.open('${ctxRoot}/ChangePWD?id='+$("#Txt_UsrId").val()+'&code='+$("#Txt_Code").val(), '', 'width=610, height=260;');	    	            		
        		   		}
    	            	break;
    	            case "FCTOV" :
	            			alert("비밀번호를 5회 이상 잘못 입력하셨습니다\n관리자에게 문의해 주세요.")
	            			break;	            		
    	            default :
    	            		if (data.message != "") {
    	            			alert(data.message);
    	            		} else {
    	            			alert("로그인 처리중 오류가 발생하였습니다.");
    	            		}
    	        	   	 	break;	    	       
	    		  }
	    		},
    			error : function(request, status, error){
    				//alert("오류가 발생하였습니다. request : " + request + "status : " + status + "error : " + error);		
    				alert("로그인 처리중 오류가 발생하였습니다.");
    		}
    	});
    },
    ssoAuth : function(){
    	var ID = $('#Txt_UsrId').val();
    	var PWD = $('#Txt_Password').val();
    	$.ajax({
    		type : 'POST',
			dataType: "json",
			url: ContextPath+"/api/his/sso/enc", 
			contentType : 'application/json',
    		async : false,
			data: JSON.stringify({
				passwd : PWD
			}),
			success : function (data) {
				console.log(JSON.stringify(data));
				if(data.code=="SUCCESS"){
					$("#USER").val(ID);
					$("#PASSWORD").val(data.result);
					document.login.submit();
				}else{
					alert("SSO 패스워드 암호화 실패.");
				}
				//document.login.submit();
			},
			error: function ( jqXHR, textStatus, errorThrown ) {
				alert("로그인 중 에러가 발생했습니다.");
			}

		});
    }
};

/*
 * 브라우저 쿠키 읽기
 */
var getCookie = function(inCookieName){
	var cookieName = inCookieName + "=";
	var cookieData = document.cookie;
	var startIdx = cookieData.indexOf(cookieName);
	var cookieValue = "";
	if(startIdx != -1){
		startIdx += cookieName.length;
		var endIdx = cookieData.indexOf(";", startIdx);
		if(endIdx == -1){
			endIdx = cookieData.length;
		}
		cookieValue = cookieData.substring(startIdx, endIdx);
	}
	
	return unescape(cookieValue);
}
/*
 * 브라우저 쿠키 저장
 */
var setCookie = function(inCookieName, inValue, inExdays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + inExdays);
	var cookieValue = escape(inValue) + ((inExdays == null) ? "" : "; expires=" + exdate.toGMTString());
	document.cookie = inCookieName + "=" + cookieValue;
}
/*
 * 브라우저 쿠키 제거
 */
var delCookie = function(inCookieName){
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() -1 );
	document.cookie = inCookieName + "=" + "; expires=" + expireDate.toGMTString();
}
//날짜 구하기
function getTimeStamp() {
	  var d = new Date();
	  var s =
	    leadingZeros(d.getFullYear(), 4) + '-' +
	    leadingZeros(d.getMonth() + 1, 2) + '-' +
	    leadingZeros(d.getDate(), 2) + ' ' +

	    leadingZeros(d.getHours(), 2) + ':' +
	    leadingZeros(d.getMinutes(), 2) + ':' +
	    leadingZeros(d.getSeconds(), 2);

	  return s;
}
//날짜 10이하 숫자에 0 붙이기
function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
}
function compareDate(defaultDate){
	var sdd = defaultDate;
	 sdd = sdd.substring(0,10);
	var edd = getTimeStamp();
	 edd = edd.substring(0,10);
	var ar1 = sdd.split('-');
	var ar2 = edd.split('-');
	var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	var dif = da2 - da1;
	var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
	var cMonth = cDay * 30;// 월 만듬
	var cYear = cMonth * 12; // 년 만듬
	var resultTip= false;
	 if(sdd && edd){
		//기간연한 체크
		if(parseInt(dif/cMonth)<3){
			resultTip = true;
		}
	 }
	return resultTip;
}

var popup_changePWD = function(){				
	$("#popup_changePWD").PopupWindow({
		title: "",
		modal: true,
		autoOpen: false,
		height:290,
		width: 688,
		nativeDrag: false,
		resizable: false
	});
	$("#popup_changePWD").PopupWindow("open");				

}
var popup_changePWDClose = function(){
	$("#popup_changePWD").PopupWindow("close");				
}

function checkPassword(password,id){
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/ig);
    if(checkNumber <0 || checkEnglish <0 || password.length < 4){
        //alert("비밀번호는 숫자와 영문자를 혼용하여  사용해야 합니다.");
       // $('#AdminPWD').val('').focus();
        return "mix";
    }
    if(/(\w)\1\1\1/.test(password)){
       // alert('비밀번호는 같은 문자를 4번 이상 사용하실 수 없습니다.');
       // $('#AdminPWD').val('').focus();
        return "same";
    }
}

function openWindow(){
    window.open("http://sso1.hanwhasonsa.co.kr/rathon/sms/forgotten.jsp", "새창", "width=800, height=420, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
}

</script>

</head>
<body>
	<main>
		<input type="hidden" value="${cripkey}" id = "cripkey"/>
		<section id="lg_bg_02" class="logIn">
                <div class="lg_img"></div>
                <div>
                    <h1>IMAGE SYSTEM</h1>
                </div>
                <h1><img src="${ctxRoot}/resources/login/image/logo_wh.svg" alt="메인로고"></h1>
            </section>
		<section id="lg_input_02" class="logIn">
			<div>
				<h3>(주)한화손해사정</h3>
				<div class="div_login" style="display:none;"><img class="img_login" class="Login_icon" alt="기관코드" title="기관코드" src="${image}/ic_field_hospital.png"><input type="text" name="" id="Txt_Code" class="input_txt" value="1" readonly/></div>
				<form id="form_login" name="form_login">
					<fieldset>
					<legend></legend>
					<input type="text" id="Txt_UsrId" name="userId" style="ime-mode:disabled;" placeholder="아이디">
					<input type="password" id="Txt_Password" name="pwd" maxlength="12" data-enc="on" data-tk-kbdtype="qwerty" placeholder="비밀번호를 입력하세요">
					<input type="checkbox" name="keep_chk" id="keep_btn">
					<label for="keep_btn" class="btn"></label>
					<label for="keep_btn" id="keep_txt" class="btn">아이디 기억하기</label>
					<div class="login-btn">
						<input type="button" value="로그인" class="btn" id="Btn_Login" >
					</div>
					</fieldset>
				</form>
				<c:if test="${SSO_CHECK ne 'N'}">
					<a onclick="openWindow()" class="pwFind">비밀번호 찾기</a>
				</c:if>
			</div>
			<dl>
				<dt>확인하세요!</dt>
				<dd>정보자산에 대한 모든 접근은 기록됩니다.</dd>
				<dd>정보보안상 60분 미사용시 세션이 종료됩니다.</dd>
			</dl>
		</section>
	</main>
	<div id="popup_changePWD" style="display:none;">
		<div id="HP_container">
			<div style="font-size:20px; font-weight:bold; border-bottom: 1px solid; padding-bottom:5px;">
				<span>비밀번호 변경</span>
			</div>
			<div class="HP_body">
				<table class="board_HP">
					<tbody>
						<tr>
							<td><span class="HP_hspan_b">*</span>현재 비밀번호</td>
							<td><input id = "TempPWD" name="AdminPWDchk" type="password" style="height:22px; border:1px solid #a2a2a2; border-top-right-radius:0px; border-bottom-right-radius:0px"> </td>
						</tr>
						<tr>
							<td><span class="HP_hspan_b">*</span>변경 비밀번호</td>
							<td><input id = "ChangePWD" name="ChangePWD" type="password" style="height:22px; border:1px solid #a2a2a2; border-top-right-radius:0px; border-bottom-right-radius:0px"></td>
						</tr>
						<tr>
							<td><span class="HP_hspan_b">*</span>변경 비밀번호 확인</td>
							<td><input id = "ChangePWDCHK" name="ChangePWDCHK" type="password" style="height:22px; border:1px solid #a2a2a2; border-top-right-radius:0px; border-bottom-right-radius:0px"></td>
						</tr>
					</tbody>
				</table>
				<div style = "float:right; padding-top:10px;">
					<button id="ComSummit" style="height:30px; width:60px;">변경</button>
					<button id="ComCansel"style="height:30px; width:60px;">취소</button>
				</div>
			</div>
		</div>
	</div>
</body>
	<form name ="login" action="/siteminderagent/forms/login.fcc" METHOD="POST">
		<input type="hidden" name=SMAUTHREASON value="0">
		<!-- 
		<c:choose>
			<c:when test="${empty TARGET}">
				<input type="hidden" name=TARGET value="${ctxRoot}/sso/auth.jsp">		
			</c:when>
			<c:otherwise>
				<input type="hidden" name=TARGET value="${TARGET}">
			</c:otherwise>
		</c:choose>	
		 -->
		 <!-- target 값이 다르게 넘어오는 문제 발생 -->
		 <input type="hidden" name=TARGET value="${ctxRoot}/sso/auth.jsp">
		<input type="hidden" id="USER" name="USER" value="">
		<input type="hidden" id="PASSWORD" name="PASSWORD" value="">
	</form>
</html>


