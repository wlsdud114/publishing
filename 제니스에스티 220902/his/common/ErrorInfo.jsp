<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="CommonInclude.jsp" %>
<c:set var="MENU_TITLE" value="오류 "/>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title><c:out value="${appTitle}"/> :: <c:out value="${MENU_TITLE}"/></title>
<link  type="text/css"rel="stylesheet"  href="${css}/common.css"/>
</head>

<body>
	<div id="wrap">
		<!--header stard-->
		<div id="header">
			<div class="con_l">
				<div class="logo">
				<!-- 
					<img src="${ctxRoot}/resources/his/img/admin/img_top_logo.gif" alt="" style="padding-top:25px;padding-left:30px;" class="cursor"/>
					<img alt="" src="${image}/log-yegaram.png" style ="padding-top:17px; width : 244px; height: 24px;">
				 -->
				</div>
			</div>
			<div class="col_r">
			</div>
	    </div>
		<!--header end-->
		
		<!--content stard-->
	    <div id="container"  style="border:0px solid black;">
	    
	        <table width="100%" height="100%">
				<tr>
					<td align="center">
						<table border="0" cellpadding="0" cellspacing="0" background="${ctxRoot}/resources/images/error_bg.gif">
							<tr>
								<td><img src="${ctxRoot}/resources/images/error_top.gif"/></td>
							</tr>
							<tr>
								<td height="155" align="center">
									<table width="90%" border="0" cellspacing="0" cellpadding="0" style="text-align:center">
										<tr>
											<td style="color:#f3801e;font-weight:;font-size:16px;">
									  			<c:choose>
									  				<c:when test="${ERROR_CODE=='USER_NOTFOUND_ERR'}">
									  				이미지시스템에 등록된 사용자가 아닙니다.
									  				</c:when>									  				
									  				<c:when test="${ERROR_CODE=='PARAM_ERR'}">
									  				잘못 전달된 파라미터가 존재합니다.
									  				</c:when>
									  				<c:when test="${ERROR_CODE=='PAGE_AUTH_ERR'}">
									  				요청하신 화면에 대한 접근권한이 없습니다.
									  				</c:when>
									  				<c:when test="${ERROR_CODE=='ACCESS_AUTH_ERR'}">
									  				이미지시스템 사용 권한이 없습니다.
									  				</c:when>
									  				<c:when test="${ERROR_CODE=='SESSION_ERR'}">
									  				세션이 종료되었거나 비정상적인 접속입니다.<br/>
									  				</c:when>
									  				<c:otherwise>
									  				요청하신 페이지가 존재하지 않거나 <br/>
									  				요청이 정상적으로 처리되지 못했습니다.<br/>
									  				이용에 불편을 드려 죄송합니다.
									  				</c:otherwise>
									  			</c:choose>  
												    
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td><img src="${ctxRoot}/resources/images/error_bottom.gif"/></td>
							</tr>
						</table>	
					</td>
				</tr>
			</table>
			
	    </div>
	    

	</div>
	
</body>
</html>