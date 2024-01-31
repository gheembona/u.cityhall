/**
 * @file	: common.js
 * @author	: Shin-Hyunho
 * @brief	: 대표 공통 스크립트
 **/

(function(){
	TopMenu = {
		init : function() {
			$('.nav_pcbox nav ul.tm_dep01 > li > a').mouseenter(function(){
				TopMenu.menuOpen($(this));
			}).focusin(function() {
				$(this).mouseenter();
			});
			$('.nav_pcbox div.tm_depbg').mouseleave(function() {
				TopMenu.menuClose();
			});
			$('.nav_pcbox nav a').last().focusout(function() {
				TopMenu.menuClose();
			});
		},
		menuOpen : function(el) {
			TopMenu.menuClose();
			$(el).next().show();
		},
		menuClose : function() {
			$('div.tm_depbg').hide();
		}
	},
	LeftMenu = {
		init : function() {
			$('ul.leftm_list a').click(function(){
				var nextEl = $(this).next().prop('tagName');
				var nextElClass = $(this).next().attr('class');
				if (nextEl == 'UL') {
					
					$('ul.leftm_list ul.' + nextElClass).hide();
					$('ul.leftm_list a').removeClass('on');
					
					$(this).next().show();
					$(this).addClass('on');
					
					return false;
				}
			}).focusin(function() {
				$(this).click();
			});
		}	
	},
	MTopMenu = {
		init : function() {
			$('.nav_mbox nav ul.tm_dep01 > li > a').click(function() {
				$('.nav_mbox .tm_depbg').hide();
				$('.nav_mbox .tm_dep01 > li > a').removeClass('on');
				$(this).next().show();
				$(this).addClass('on');
				return false;
			});
			$('.nav_mbox nav ul.tm_dep02 > li > a').click(function() {
				var nextEl = $(this).next().prop('tagName');
				if (nextEl != undefined) {
					$('.nav_mbox nav ul.tm_dep03').removeClass('open');
					$('.nav_mbox nav ul.tm_dep02 > li > a').removeClass('on');
					$(this).next().addClass('open');
					$(this).addClass('on');
					return false;
				}
				
			});
			$('.nav_mbox nav ul.tm_dep03 > li > a').click(function() {
				var nextEl = $(this).next().prop('tagName');
				if (nextEl != undefined) {
					$('.nav_mbox nav ul.tm_dep04').hide();
					$('.nav_mbox nav ul.tm_dep03 > li > a').removeClass('on');
					$(this).next().show();
					$(this).addClass('on');
					return false;
				}
			});
			$('a[href="#menuOpen"]').click(function() {
              	if($('.nav_mbox nav a.on').length==0){
  					$('.nav_mbox .tm_dep01 > li > a').first().addClass('on');
  					$('.nav_mbox .tm_dep01 > li > a').first().next().show();
                }
				$('.nav_mbox').show();
				$('.nav_bg').show();
				return false;
			});
			$('.nav_bg').click(function() {
				$('.nav_mbox').hide();
				$('.nav_bg').hide();
				return false;
			});
		}
	},
	MLanguage = {
		toggle : function() {
			if ($('.lang_listbox').css('display') == 'block') {
				$('button.lang_selc').removeClass('open');
				$('.lang_listbox').removeClass('open');
			}
			else {
				$('button.lang_selc').addClass('open');
				$('.lang_listbox').addClass('open');
			}
		}
	},
	SnsShare = {
		toggle : function() {
			$('.sns_inner').toggle();
			//$('.sns_inner').animate({ width: $('.sns_inner').css('width')}, { duration: 800, easing: "easeInOutBack" });
			if ($('.sns_inner ').css('display') == 'block') {
				$('.sns_share').addClass('sns_open');
			}
			else {
				$('.sns_share').removeClass('sns_open');
			}
		}
	},
	SearchBtn = {
		toggle : function() {
			if ($('.search_box').attr('class').indexOf('open') != -1) {
				$('.search_box').removeClass('open');
			}
			else {
				$('.search_box').addClass('open');
			}
			return false;
		}
	},
	PartMenuBtn = {
		toggle : function() {
			$('.part_menubox').toggle();
			return false;
		}	
	}
})(); 

$(function() {
	TopMenu.init();
	LeftMenu.init();
	MTopMenu.init();
    //HHStoryCms.createAutoMediaPreviewBtn();
  
	$('button.usp_btm').click(function() {
		if ($(this).attr('class').indexOf('set01') != -1) {
			$('.usplan_oldinner, .usplan_oldcont').hide();
			$('.set01, .set02').removeClass('on');
		}
		else {
			$('.usplan_oldcont').hide();
			$('.set02').removeClass('on');
		}
		$(this).addClass('on');
		$(this).next().show();
	});
  
	$('.link_box button').click(function() {
		if ($(this).attr('class') == 'open') {
			$(this).removeClass('open');
			$(this).next().removeClass('open');
		}
		else {
			$('.link_box button').removeClass('open');
			$(this).addClass('open');
			$('.link_box .link_cont').removeClass('open');
			$(this).next().addClass('open');
		}
		return false;
	});
});