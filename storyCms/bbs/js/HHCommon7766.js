/**
 *
 * @author	: Shin-Hyunho
 * @date    : 2017/04/17
 * @see     :  
 **/

(function() {
	HHBbs = {
			categoryLevelList: function(url, mId, bbsId, categoryLevel, categoryCode, el, optionDefaultVal) {
				var sendUrl = HHCommon.MenuIdRpc(url, mId);
				var data = {bbsId: bbsId, categoryLevel: categoryLevel, categoryCode: categoryCode};
		    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
				jqxhr.done(function(data) {
					var parseData = $.parseJSON(data);
					if ((parseData.flag == 'success')) {
						var createOption = "<option value=\"\">" + optionDefaultVal + "</option>";
						if (parseData.result) {
							createOption += parseData.result;
							$(el).html(createOption);
						} else { 
							$(el).html(createOption);
						}
					} else {
						alert('카테고리정보를 가져오는중 오류가 발생하였습니다!.');  
					}
				}); 
		    },
		    categoryHierarchyList: function(url, mId, bbsId, categoryCode, el, optionDefaultVal) {
		    	var sendUrl = HHCommon.MenuIdRpc(url, mId);
				var data = {bbsId: bbsId, categoryCode: categoryCode};
		    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
				jqxhr.done(function(data) {
					var parseData = $.parseJSON(data);
					if ((parseData.flag == 'success')) {
						$(el).val('').change();
						
						var createOption = "<option value=\"\">" + optionDefaultVal + "</option>";
						if (parseData.result) {
							createOption += parseData.result;
							$(el).html(createOption);
						} else { 
							$(el).html(createOption);
						}
					} else {
						alert('카테고리정보를 가져오는중 오류가 발생하였습니다!.');  
					}
				}); 
		    },
		    AtchFileSelect: function(el) {
		    	var atchFilePath = $(el).val();
		    	var atchFileName = "";
		    	var atchFileExt = "";
		    	
		    	if (atchFilePath) {
			    	atchFileName = atchFilePath.substring(atchFilePath.lastIndexOf("\\") + 1);
			    	atchFileExt = atchFileName.substring(atchFileName.lastIndexOf(".") + 1).toLowerCase();
			    	
			    	if ($('#fileExtList').length > 0) {
			    		var fileExtList = $('#fileExtList').text();
			    		var fileExtArr = fileExtList.split(',');
			    		
			    		var acceptNo = 0;
			    		var unAcceptNo = 0;
			    		for (var i=0;i<fileExtArr.length;i++) {
			    			var fileCheckSign = fileExtArr[i].charAt(0);
			    			if (fileCheckSign == '!') {
			    				var fileExt = fileExtArr[i].substring(1, fileExtArr[i].length);
			    				if (atchFileExt == fileExt) {
			    					unAcceptNo++;
			    					break; 
			    				} 
			    			} else {
			    				if (atchFileExt == fileExtArr[i]) {
			    					acceptNo++;
			    				}
			    			}
			    		} 
			    		
			    		if (acceptNo == 0 || unAcceptNo > 0) { 
			    			alert(atchFileExt + ' 확장자는 첨부할 수 없습니다!.\n첨부가능한 확장자를 확인하시기 바랍니다.'); 
			    			$(el).val(''); 
					    	$(el).parent().find('div').remove(); 
			    			return false;
			    		} 
			    	} else {
			    		alert("확장자 체크 리스트가 없습니다!.");
			    		$(el).val(''); 
				    	$(el).parent().find('div').remove(); 
			    		return false;
			    	} 
		    	} 
		    	if (!atchFileName) {
		    		$(el).parent().find('label').html($(el).parent().find('label > span').detach());
		    	}
		    	else {
		    		$(el).parent().find('label').html($(el).parent().find('label>span').clone());
		    		$(el).parent().find('label').append(atchFileName);
		    	}
		    },
		    DownFile: function(contextPath, bbsId, atchFileId, fileSn) {
		    	window.open(contextPath + "/bbs/FileDown.do?bbsId=" + bbsId + "&atchFileId="+encodeURIComponent(atchFileId)+"&fileSn="+encodeURIComponent(fileSn));
		    },
		    DeleteFileInf: function(fileListId, contextPath, dataId, bbsId, atchFileId, streFileNm, fileSn) {
		    	var sendUrl = contextPath + '/bbs/deleteFileInfs.do';
				var data = {dataId: dataId, bbsId: bbsId, atchFileId: atchFileId, streFileNm: streFileNm, fileSn: fileSn};
		    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
				jqxhr.done(function(data) {
					var parseData = $.parseJSON(data); 
					if ((parseData.flag == 'success')) {
						$('#'+fileListId).remove(); 
						
						var isFileAttachFormNo = $('#fileAttachForm').children().length;
						var copyFileInput = $('#fileAttachForm').children().first().clone();
						
						if (isFileAttachFormNo == 0) {
							copyFileInput  = "<li>";
							copyFileInput += 	"<dl style=\"margin-bottom:8px;\">";
							copyFileInput += 		"<dt>";
							copyFileInput +=			"<label class=\"button file blind\" for=\"file_" + (isFileAttachFormNo+1) + "\"><span>파일첨부</span></label>";
							copyFileInput += 			"<input type=\"file\" name=\"file_" + (isFileAttachFormNo+1) + "\" id=\"file_" + (isFileAttachFormNo+1) + "\" class=\"bd_input bdi_file\" />";
							copyFileInput += 		"</dt>";
							copyFileInput += 		"<dd>";
							copyFileInput +=			"<label class=\"button title blind\" for=\"file_cn_" + (isFileAttachFormNo+1) + "\"><span>첨부설명</span></label>";
							copyFileInput +=			"<input type=\"text\" id=\"file_cn_" + (isFileAttachFormNo+1) + "\" name=\"file_cn\" placeholder=\"첨부파일이 이미지일경우 대체텍스트를 입력하세요.\" class=\"bd_input bdi_text\">";
							copyFileInput += 		"</dd>";
							copyFileInput +=	"</dl>";
							copyFileInput += "</li>"; 
						}
						
						$(copyFileInput).find('label[for^="file"]').attr('for', 'file_' + (isFileAttachFormNo+1));
						$(copyFileInput).find('input[type="file"]').attr('name', 'file_' + (isFileAttachFormNo+1)).attr('id', 'file_' + (isFileAttachFormNo+1));
						$(copyFileInput).find('input[type="text"]').attr('id', 'file_cn_' + (isFileAttachFormNo+1));
						 
						$('#fileAttachForm').append(copyFileInput);
					} else {
						alert(parseData.resultMsg);  
					}
				}); 
		    },
		    PwdFormValidator: function(form) {
		    	if (!form.boardPassword.value) {
		    		alert("비밀번호를 입력하세요!.");
		    		form.boardPassword.focus();
		    		return false;
		    	}
		    	return true;
		    },
		    CommentInsertProc: function(url, mId, bbsId, dataId) { 
		    	if (url && bbsId && dataId) {
			    	if ($('#commentContent').val()) {
				    	var sendUrl = HHCommon.MenuIdRpc(url, mId);
						var data = {bbsId: bbsId, dataId: dataId, commentContent: $('#commentContent').val()};
				    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
						jqxhr.done(function(data) {
							var parseData = $.parseJSON(data);
							if ((parseData.flag == 'success')) {
								window.location.reload(); 
							} 
							else {
								alert(parseData.msg.replace('\\n', '\n'));  
							}
						}); 
			    	}
			    	else {
			    		alert('댓글 내용을 입력하세요!.');
			    	}
		    	}
		    },
		    CommentUpdate: function(url, mId, commentId, el_id) {
		    	if (url && mId && commentId) {
			    	var sendUrl = HHCommon.MenuIdRpc(url, mId);
					var data = {commentId: commentId, commentContent: $('#commentContent').val()};
			    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
					jqxhr.done(function(data) {
						var parseData = $.parseJSON(data);
						if ((parseData.flag == 'success')) { 
							var cmt_txt = $('#'+el_id).find('.cmt_txt').html().trim().replace('<br>','\n');   
							$('#'+el_id).find('.cmt_txt').remove(); 
							var insertTag = '<textarea class="cmt_config">'+cmt_txt+'</textarea>';
							$('#'+el_id).find('.replay_cmt').append(insertTag);
							$('#'+el_id).find('.replay_btn').find('button[onclick^="HHBbs.CommentUpdate"]').attr('onclick', "HHBbs.CommentUpdateProc('./commentUpdateProc.do','" + mId + "','" + commentId + "', '" + el_id + "');").html('<span><i class="fa fa-check" aria-hidden="true"></i>저장</span>');  
						}  
						else {
							alert(parseData.msg.replace('\\n', '\n'));   
						}
					}); 
		    	}
		    },
		    CommentUpdateProc: function(url, mId, commentId, el_id) {
		    	if (url && mId && commentId) {
		    		if ($('#'+el_id).find('textarea').val()) {
				    	var sendUrl = HHCommon.MenuIdRpc(url, mId);
						var data = {commentId: commentId, commentContent: $('#'+el_id).find('textarea').val()};
				    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
						jqxhr.done(function(data) {
							var parseData = $.parseJSON(data);
							if ((parseData.flag == 'success')) { 
								window.location.reload();
							} 
							else {
								alert(parseData.msg.replace('\\n', '\n'));  
							}
						}); 
		    		}
			    	else {
			    		alert('댓글 내용을 입력하세요!.');
			    	}
		    	}
		    },
		    CommentDeleteProc: function(url, mId, commentId, el_id) {
		    	if (url && mId && commentId) {
			    	var sendUrl = HHCommon.MenuIdRpc(url, mId);
					var data = {commentId: commentId};
			    	var jqxhr = HHCommon.Ajax('POST', sendUrl, data, 'text');
					jqxhr.done(function(data) {
						var parseData = $.parseJSON(data); 
						if ((parseData.flag == 'success')) {
							window.location.reload(); 
						} 
						else {
							alert(parseData.msg.replace('\\n', '\n'));  
						}
					});
		    	}
		    },
		    CommentTo: function(commentName) { 
		    	if (!$('#commentContent').prop('disabled')) {  
			    	$('#commentContent').val('[' + commentName + '] ');
			    	$('#commentContent').focus();  
		    	}
		    }, 
		    Print: function() {
		    	window.print();
		    	return false;
		    },
		    CaptchaImgRefresh: function(el, srcUrl) {
		        $(el).attr("src", srcUrl + "?id=" + Math.random());
		    },
		    CapchaLoadAudio: function(capchaId, supportId, audioUrl) {
		    	var uAgent = navigator.userAgent;
		   		if (uAgent.indexOf('Trident') > -1 || uAgent.indexOf('MSIE') > -1) {
		       		$(capchaId).html('<bgsound src="' + soundUrl+'?agent=msie&rand='+ Math.random() + '">');
		   		} 
		   		else if (!!document.createElement('audio').canPlayType) {
		       		try { 
		       			new Audio(audioUrl).play(); 
		       		} catch(e) { 
		       			winPlayer(audioUrl); 
		       		}
		   		} 
		   		else {
		   			window.open(audioUrl, '', 'width=1,height=1');
		   		}
		    },
		    CapchaReplayAudio: function(capchaId) {
		    	const audioCaptcha = document.getElementById(capchaId);
				audioCaptcha.play();
		    },
		    CertAuthorization: function() {
		    	
		    },
		    FilePreivew: function(atchFileId, fileSn) {
		    	$.ajax({
		    		dataType : "json", 
		    		type : "POST",
		    		url : "/u/comm/preview/boardFile.do",
		    		data : {
		    			"atchFileId" : atchFileId,
		    			"fileSn" : fileSn
		    		},
		    		beforeSend: function() {
		    			HoldOn.open({ 
		    				theme : 'sk-cube-grid',
		    			    textColor:"white",
		    				message : '<div style="margin-bottom:5px;"><strong>잠시만 기다려주세요.</strong></div><div>미리보기를 위해 파일을 변환하고 있습니다.</div><div>파일 변환이 완료되면 새창으로 미리보기가 실행됩니다.</div><div>파일의 용량에 따라 다소 시간이 걸릴수 있습니다.</div>'
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
		    					alert("지원하지 않는 파일입니다. [resultCode=" + resultMap.resultCode + "]");
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
	}
})(); 