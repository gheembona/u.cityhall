/**
 *
 * @author	: Shin-Hyunho
 * @brief	: 
 * @date    : 2015/06/03
 * @see     :  
 **/

(function() {
	HHCommon = { 
		FormTextEl_FirstAutoFocus: function(el) {
			$(el).find('input[type="text"]:first').focus();
		},
		Ajax: function(intype, inurl, indata, indataType) {
			var ajaxobj = $.ajax({  
				type: 'POST',  
				url: inurl,
				data: indata,
				dataType: indataType,
				beforeSend: function() {
					
				},   
				complete: function() {
					
				},
				error: function() {
					HHCommon.Alert('서버와 통신중 오류가 발생 하였습니다.');
				}
			});
			return ajaxobj;
		},
		Alert: function(msg, el) {
			$('#alertModal .modal-body').html(msg);
			$('#alertModal').modal('show');
			
			if (el != null) {
				$('#alertModal').on('hidden.bs.modal', function () {
					$(el).focus();
				});
			}
		},
		Confirm: function(msg, callback) {
			$('#confirmModal').modal({show:true,
                backdrop:true,
                keyboard:false
			});
			$('#confirmModal .modal-body').html(msg);
			$('#confirmModalClose').unbind().bind('click', function(){
				$('#confirmModal').modal('hide');
				if (callback) callback(false);
			});
			$('#confirmModalSubmit').unbind().bind('click', function(){
				$('#confirmModal').modal('hide');
				if (callback) callback(true);
			});
		},
		PasswordPassCheck: function(str) {
			var reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{9,20}$/;
			return !reg.test(str) ? false : true;
		},
		EmailPassCheck: function(str) {
			var reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			return !reg.test(str) ? false : true;
		},
		IpAddressCheck: function(str) {
			var reg = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b$/;
			return !reg.test(str) ? false : true;
		},
		AutoHypenPhone: function(el) {
			$(el).bind('keydown keyup', function() {
				var str = $(this).val().replace(/[^0-9]/g, '');
				var tmp = '';
				if( str.length < 4){
					tmp = str;
				}else if(str.length < 7){
					tmp += str.substr(0, 3);
					tmp += '-';
					tmp += str.substr(3);
				}else if(str.length < 11){
					tmp += str.substr(0, 3);
					tmp += '-';
					tmp += str.substr(3, 3);
					tmp += '-';
					tmp += str.substr(6);
				}else{				
					tmp += str.substr(0, 3);
					tmp += '-';
					tmp += str.substr(3, 4);
					tmp += '-';
					tmp += str.substr(7);
				}
				$(this).val(tmp);
			});
		},
		NumberNotClear: function(el) {
			$(el).bind('keydown keyup', function() {
				var str = $(this).val().replace(/[^0-9]/g, '');
				$(this).val(str);
			});
		},
		NumberCheck: function(str) {
			var reg = /[^0-9]/;
			return reg.test(str) ? false : true;
		},
		ZeroFill: function(n, digits) {
			var zero = '';
		    n = n.toString();
		 
		    if (n.length < digits) {
		        for (i = 0; i < digits - n.length; i++)
		            zero += '0';
		    }
		    return zero + n;
		},
		ZeroFillEnd: function(inputvalue, demandLength) {
			var spaceValue = "";
			for (var i = 0; i < demandLength-inputvalue.length;i++){
				spaceValue += "0";
			}
			return inputvalue + spaceValue;
		},
		StrReplace: function(org, dest, str) {
			var reg = new RegExp(org, "g");
			return str.replace(reg, dest);
		},
		UnNumberFormat: function(num) {
			return (num.replace(/\,/g,""));
		},
		NumberFormat: function(num) {
			var pattern = /(-?[0-9]+)([0-9]{3})/;
			while(pattern.test(num)) {
				num = num.replace(pattern,"$1,$2");
			}
			return num;
		},
		NumberFormat: function(number, decimals, dec_point, thousands_sep) { 
	        number = (number+'').replace(',', '').replace(' ', ''); 
	        var n = !isFinite(+number) ? 0 : +number, 
	            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), 
	            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point, 
	            s = '', 
	            toFixedFix = function (n, prec) { 
	                var k = Math.pow(10, prec); 
	                return '' + Math.round(n * k) / k;        }; 
	        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.'); 
	        if (s[0].length > 3) { 
	            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    } 
	        if ((s[1] || '').length < prec) { 
	            s[1] = s[1] || ''; 
	            s[1] += new Array(prec - s[1].length + 1).join('0'); 
	        }    return s.join(dec); 
	    },
		NumberFormatAddEvent: function(el) {
			$(el).bind('keydown keyup', function() {
				console.log(HHCommon.UnNumberFormat($(this).val()));
				$(this).val(HHCommon.NumberFormat(HHCommon.UnNumberFormat($(this).val())));
			});
		},
		AlphabetPattern1: function(str) {
			var reg = /[^a-zA-Z]/;
			return !reg.test(str) ? false : true;
		},
		NewWinPop: function(url,winname,w,h,st,sc,re) {
			var winl = (screen.width-w)/2;
			var wint = (screen.height-h)/2;
			var settings   ='height='+h;
			settings +=',width=' + w;
			settings +=',top='+wint;
			settings +=',left='+winl;
			settings +=',status='+st;
			settings +=',scrollbars='+sc;
			settings +=',resizable='+re;
			
			var win = window.open(url,winname,settings);
			if(parseInt(navigator.appVersion) >= 4) {
				win.focus();
			}
		},
		MenuIdRpc: function(url, mId) {
			if (mId) {
				if (url.indexOf('?') > 0) {
					url = url + '&mId=' + mId;
				} else {
					url = url + '?mId=' + mId;
				}
				return url;
			} else {
				return url;
			}
		},
		JusoApiPopupOpen : function(url){
			var pop = window.open(url, "JosoApiPopupOpen", "width=570,height=420, scrollbars=yes, resizable=yes"); 
		},
		SetCookie: function(name, value, expiredays) {
			var todayDate = new Date();   
			todayDate.setDate( todayDate.getDate() + expiredays );   
			document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
		},
		GetCookie: function(name) {
			var nameOfCookie = name + "=";  
			var x = 0;  
			while ( x <= document.cookie.length ) {  
				var y = (x+nameOfCookie.length);  
				if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) {
						endOfCookie = document.cookie.length;
					}    
					return unescape( document.cookie.substring( y, endOfCookie ) );  
				}  
				x = document.cookie.indexOf( " ", x ) + 1;  
				if ( x == 0 ) break;  
			}  
			return "";  
		},
		DeleteCookie: function(name) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() - 1);
			document.cookie = name + "= " + "; expires=" + expireDate.toGMTString();
		},
		getParams: function() {
		    var param = new Array();
		    var url = decodeURIComponent(location.href);
		    url = decodeURIComponent(url);
		 
		    var params;
		    params = url.substring( url.indexOf('?')+1, url.length );
		    params = params.split("&");

		    var size = params.length;
		    var key, value;
		    for(var i=0 ; i < size ; i++) {
		        key = params[i].split("=")[0];
		        value = params[i].split("=")[1];
		        param[key] = value;
		    }
		    return param;
		},
		WindowToggleFullScreen: function() {
			var doc = window.document;
			var docEl = doc.documentElement;

			var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
			var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

			if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
				requestFullScreen.call(docEl);
			}
			else {
				cancelFullScreen.call(doc);
			}
		},
		SnsShare: function(sns, title){
			var url = "";
			var linkUrl = document.location.href;
			if(sns == "facebook") {
				url="https://www.facebook.com/sharer.php?s=100&p[title]="+title+"&p[url]="+linkUrl;
				window.open(url,"facebook",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			else if(sns == "twitter") {
				url="https://twitter.com/intent/tweet?text="+title+"&url="+linkUrl+"&original_referer="+linkUrl;
				window.open(url,"twitter",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			else if(sns == "googleplus") {
				url="https://plus.google.com/share?url="+linkUrl;
				window.open(url,"google",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			else if(sns == "kakao"){
				url = "https://story.kakao.com/share?url="+linkUrl;
				window.open(url,"kakao",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			else if(sns == "line"){
				url = "http://line.me/R/msg/text/?="+linkUrl;
				window.open(url,"kakao",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			else if(sns == "band"){
				url = "http://band.us/plugin/share?body=text&route="+linkUrl;
				window.open(url,"band",'location=1,scrollbars=auto,resizable=no,top=25,left=100,width=600,height=500');
			}
			return false;
		},
		getUrlFindParam: function(url, paramName) {
			var strReturn = "";
			var strHref = url;
			var bFound=false;
			var cmpstring = paramName + "=";
			var cmplen = cmpstring.length;
			if ( strHref.indexOf("?") > -1 ) {
				var strQueryString = strHref.substr(strHref.indexOf("?")+1);
			    var aQueryString = strQueryString.split("&");
			    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ) {
			    	if (aQueryString[iParam].substr(0,cmplen)==cmpstring) {
			        	var aParam = aQueryString[iParam].split("=");
			        	strReturn = aParam[1];
			        	bFound=true;
			        	break;
			      	}
			    }
			}
			if (bFound==false) return null;
			return strReturn;
		}
	},
	HHUser = {
		idCheck: function(url, mId, checkId) {
	   		$.ajax({  
	   			type: 'POST',  
	   			url: url,
	   			data: { checkId : checkId },
	   			dataType: "text",
	   			beforeSend: function() {
	   				$('#id_chk_display').text('확인중..');
	   				$('#id_chk').val('F');
	   			},   
	   			complete: function() { },
	   			error: function() {
	   				$('#id_chk_display').css({'color' : 'red', 'font-weight' : 'bold'}).text('Server Error!');
	   				$('#id_chk').val('F');
	   			}
	   		}).done(function(data) {
				var result = $.parseJSON(data);
	   			
	   			if (result.flag == 'success') {
	   				$('#id_chk_display').css({'color' : 'blue', 'font-weight' : 'bold'}).text('[사용가능한 아이디]');
	   				$('#id_chk').val('T');
	   			}
	   			else{
	   				$('#id_chk_display').css({'color' : 'red', 'font-weight' : 'bold'}).text('[사용불가능한 아이디]');
	   				$('#id_chk').val('F');
	   			}
	   		});
	    }
	},
	HHStatistics = {
		researchInsertProc: function(siteId, mId, contextPath, formEl) {
			if (siteId && mId) {
				if ($('input[name="researchScore"]:checked').length == 0) {
					alert("만족도 평가 점수를 선택하세요.");
				}
				else {
					var data = {siteId: siteId, researchScore: $('input[name="researchScore"]:checked').val(), researchContent: $('#researchContent').val()};
			    	var jqxhr = HHCommon.Ajax('POST', contextPath + '/menu/insertMenuResearchProc.do?mId=' + mId, data, 'text');
					jqxhr.done(function(data) {
						var parseData = $.parseJSON(data); 
						if ((parseData.flag == 'success')) {
							alert("소중한 평가 감사합니다.");
						} 
						else if (parseData.flag == 'already') {
							alert("만족도조사는 1일 1회만 가능합니다.");
						}
						else {
							alert("만족도평가 중 오류가 발생하였습니다!.");
						}
						$(formEl).each(function(){ this.reset(); });
					});
				}
			}
		}
	},
	HHFile = {
		commonFileDown: function(contextPath, df, fn, sn) {
			window.open(contextPath + "/FileDown.do?df=" + df + "&fn=" + fn + "&sn=" + encodeURIComponent(sn));
		},
		PreviewBlockUI: function() {
			var resultHtml = '<div style="margin-bottom:5px;">';
			resultHtml += '<strong>잠시만 기다려주세요.</strong>';
			resultHtml += '</div>';
			resultHtml += '<div>미리보기를 위해 파일을 변환하고 있습니다.</div>';
			resultHtml += '<div>파일 변환이 완료되면 새창으로 미리보기가 실행됩니다.</div>';
			resultHtml += '<div>파일의 용량에 따라 다소 시간이 걸릴수 있습니다.</div>';
			return resultHtml;
		},
		commonFilePreivew: function(atchFileId, fileSn){
			$.ajax({
				dataType: "json",
				type : "POST",
				url : "/u/comm/preview/cmmnFile.do",
				data : {
					"atchFileId" : atchFileId,
					"fileSn" : fileSn
				},
	    		beforeSend: function() {
	    			HoldOn.open({ 
	    				theme : 'sk-cube-grid',
	    			    textColor:"white",
	    				message : HHFile.PreviewBlockUI()
	    			});
	   			},  
	   			complete: function() { },
				success: function(resultMap) {
					if(resultMap) {
						if(resultMap.resultCode == 0) {
							window.open(resultMap.resultPage);
						}
						else if(resultMap.resultCode == 999) {
							alert("첨부파일이 존재하지 않습니다.");
						}
						else {
							alert("resultCode=" + resultMap.resultCode + ", 문서변환중 오류가 발생하였습니다. 컨버전이 가능한 환경인지 문서변환 솔루션을 점검하십시오.");
						}
					}
					else {
						alert("문서변환중 오류가 발생하였습니다.");
					}
	    			HoldOn.close();
				},
	    		error: function() {
	   				alert("문서변환 실행중 오류가 발생하였습니다.");
	   				HoldOn.close();
	   			}
			});
		},
		mediaFilePreivew: function(mediaId){
			$.ajax({
				dataType: "json",
				type : "POST",
				url : "/u/comm/preview/mediaFile.do",
				data : {
					"mediaId" : mediaId
				},
	    		beforeSend: function() {
	    			HoldOn.open({ 
	    				theme : 'sk-cube-grid',
	    			    textColor:"white",
	    				message : HHFile.PreviewBlockUI()
	    			});
	   			},  
	   			complete: function() { },
				success: function(resultMap) {
					if(resultMap) {
						if(resultMap.resultCode == 0) {
							window.open(resultMap.resultPage);
						}
						else if(resultMap.resultCode == 999) {
							alert("첨부파일이 존재하지 않습니다.");
						}
						else {
							alert("resultCode=" + resultMap.resultCode + ", 문서변환중 오류가 발생하였습니다. 컨버전이 가능한 환경인지 문서변환 솔루션을 점검하십시오.");
						}
					}
					else {
						alert("문서변환중 오류가 발생하였습니다.");
					}
	    			HoldOn.close();
				},
	    		error: function() {
	   				alert("문서변환 실행중 오류가 발생하였습니다.");
	   				HoldOn.close();
	   			}
			});
		},
		HFilePreivew: function(fileNo, progrmNo, progrmTy, progrmSe){
			if( !fileNo || !progrmNo || !progrmTy){
				alert("정보가 정확하지 않습니다.");
				return false;
			}
			
			$.ajax({
				dataType: "json",
				type : "POST",
				url : "/u/transfer/comm/preview/cmmnFile.do",
				data : {
					"fileNo" : fileNo,
					"progrmNo" : progrmNo,
					"progrmTy" : progrmTy,
					"progrmSe" : progrmSe
				},
	    		beforeSend: function() {
	    			HoldOn.open({ 
	    				theme : 'sk-cube-grid',
	    			    textColor:"white",
	    				message : HHFile.PreviewBlockUI()
	    			});
	   			},  
	   			complete: function() { },
				success: function(resultMap) {
					if(resultMap) {
						if(resultMap.resultCode == 0) {
							window.open(resultMap.resultPage);
						}
						else if(resultMap.resultCode == 999) {
							alert("첨부파일이 존재하지 않습니다.");
						}
						else {
							alert("resultCode=" + resultMap.resultCode + ", 문서변환중 오류가 발생하였습니다. 컨버전이 가능한 환경인지 문서변환 솔루션을 점검하십시오.");
						}
					}
					else {
						alert("문서변환중 오류가 발생하였습니다.");
					}
	    			HoldOn.close();
				},
	    		error: function() {
	   				alert("문서변환 실행중 오류가 발생하였습니다.");
	   				HoldOn.close();
	   			}
			});
		},
		TFilePreivew: function(fileNo, progrmNo, progrmTy, progrmSe){
			if( !fileNo || !progrmNo || !progrmTy){
				alert("정보가 정확하지 않습니다.");
				return false;
			}
			
			$.ajax({
				dataType: "json",
				type : "POST",
				url : "/u/transfer/tkb/preview/cmmnFile.do",
				data : {
					"fileNo" : fileNo,
					"progrmNo" : progrmNo,
					"progrmTy" : progrmTy,
					"progrmSe" : progrmSe
				},
	    		beforeSend: function() {
	    			HoldOn.open({ 
	    				theme : 'sk-cube-grid',
	    			    textColor:"white",
	    				message : HHFile.PreviewBlockUI()
	    			});
	   			},  
	   			complete: function() { },
				success: function(resultMap) {
					if(resultMap) {
						if(resultMap.resultCode == 0) {
							window.open(resultMap.resultPage);
						}
						else if(resultMap.resultCode == 999) {
							alert("첨부파일이 존재하지 않습니다.");
						}
						else {
							alert("resultCode=" + resultMap.resultCode + ", 문서변환중 오류가 발생하였습니다. 컨버전이 가능한 환경인지 문서변환 솔루션을 점검하십시오.");
						}
					}
					else {
						alert("문서변환중 오류가 발생하였습니다.");
					}
	    			HoldOn.close();
				},
	    		error: function() {
	   				alert("문서변환 실행중 오류가 발생하였습니다.");
	   				HoldOn.close();
	   			}
			});
		}
	},
	HHStoryCms = {
		contentsUpdate: function(defaultUrl, contentsId) {
			window.open(defaultUrl + '&contentsId=' + contentsId);
		},
		menuUpdate: function(defaultUrl, menuId) {
			window.open(defaultUrl + '&menuId=' + menuId);
		},
		bbsConfUpdate: function(defaultUrl, bbsId) {
			window.open(defaultUrl + '&bbsId=' + bbsId);
		},
		programSet: function(defaultUrl) {
			window.open(defaultUrl);
		},
		createAutoMediaPreviewBtn: function() {
			$('a[href*="mediaId=MEDIA_"]').each(function(index) {
				$(this).after('<button type="button" onclick="HHFile.mediaFilePreivew(\'' + HHCommon.getUrlFindParam($(this).attr('href'), 'mediaId') + '\'); return false;" class="bd_btn bd_btn_xs btn_preview"><span>미리보기</span></button>');
			})
		}
	}
})();