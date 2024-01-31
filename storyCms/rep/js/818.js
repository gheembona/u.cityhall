$(function() {
	$('#mainAlimiList').slick({
		accessibility: true,
		arrows:true,
		infinite:true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
	  	autoplay: true,
	  	autoplaySpeed: 5000,
	  	prevArrow: $('a[href="#mainAlimiPrev"]'), 
	  	nextArrow: $('a[href="#mainAlimiNext"]'),
		responsive: [
			{
			breakpoint: 800,
			settings: {
					arrows:false
				}
			}
		]
	}); 
	$('#mainAlimiList').on('afterChange', function(event, slick, currentSlide) {
		//var thisSlide = slick.$slides[currentSlide];
	  	$('#mainAlimiSlideNo').text((currentSlide + 1));
	});
	$('a[href="#mainAlimiStop"]').click(function() {
		$('#mainAlimiList').slick('slickPause');
		$(this).parent().hide();
		$('a[href="#mainAlimiStart"]').parent().show();
	});
	$('a[href="#mainAlimiStart"]').click(function() {
		$('#mainAlimiList').slick('slickPlay'); 
		$(this).parent().hide();
		$('a[href="#mainAlimiStop"]').parent().show();
	});

	$('#subAlimiList').slick({
		accessibility: true,
		arrows:true,
		infinite:true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
	  	autoplay: true,
	  	autoplaySpeed: 5000,
	  	prevArrow: $('a[href="#subAlimiPrev"]'), 
	  	nextArrow: $('a[href="#subAlimiNext"]'),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
			        slidesToScroll: 1,
				}
			},
			{
			breakpoint: 640,
			settings: {
					slidesToShow:2,
					slidesToScroll: 1,
				}
			}
		]
	}); 
	$('#subAlimiList').on('afterChange', function(event, slick, currentSlide) {
		//var thisSlide = slick.$slides[currentSlide];
	  	$('#subAlimiSlideNo').text((currentSlide + 1));
	});
	$('a[href="#subAlimiStop"]').click(function() {
		$('#subAlimiList').slick('slickPause');
		$(this).parent().hide();
		$('a[href="#subAlimiStart"]').parent().show();
	});
	$('a[href="#subAlimiStart"]').click(function() {
		$('#subAlimiList').slick('slickPlay'); 
		$(this).parent().hide();
		$('a[href="#subAlimiStop"]').parent().show();
	});
	
	$('ul.notice_list > li > a').click(function() {
		$('ul.notice_list > li > a').removeClass('on');
		$('ul.notice_list div.list_box').hide();
		$(this).next().show();
		$(this).addClass('on');
        return false;
	});
  $('ul.notice_list > li > a').focus(function() {
		$('ul.notice_list > li > a').removeClass('on');
		$('ul.notice_list div.list_box').hide();
		$(this).next().show();
		$(this).addClass('on');
        return false;
	});
	
	$('#partList').slick({
		accessibility: true,
		arrows:true,
		infinite:true,
		speed: 500,
		slidesToShow: 10,
		slidesToScroll: 1,
		dots: false,
	  	prevArrow: $('button.prev'), 
	  	nextArrow: $('button.next'),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
			        slidesToScroll: 1,
				}
			},
			{
				breakpoint: 700,
				settings: {
						slidesToShow: 4,
				        slidesToScroll: 1,
				}
			}
			
		]
	}); 
	
	if ($('#realmInfoList > li').length > 4) {
		$('#realmInfoList').slick({
			accessibility: true,
			arrows:true,
			infinite:true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			dots: false,
          	prevArrow: $('a[href="#realmInfoPrev"]'),
		  	nextArrow: $('a[href="#realmInfoNext"]'),
		  	autoplay: true,
		  	autoplaySpeed: 5000,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
				        slidesToScroll: 3,
					}
				},
				{
					breakpoint: 800,
					settings: {
							slidesToShow: 2,
					        slidesToScroll: 2,
					}
				},
				{
					breakpoint: 600,
					settings: {
							slidesToShow: 1,
					        slidesToScroll: 1,
					}
				}
			]
		}); 
	}
  
  	$('a[href="#realmInfoStop"]').click(function() {
		$('#realmInfoList').slick('slickPause');
		$(this).parent().hide();
		$('a[href="#realmInfoStart"]').parent().show();
	});
	$('a[href="#realmInfoStart"]').click(function() {
		$('#realmInfoList').slick('slickPlay');
		$(this).parent().hide();
		$('a[href="#realmInfoStop"]').parent().show();
	});
	
	// 이용자별 service 탭처리
	$('ul.muser_list > li > a').click(function() {
		$('ul.muser_list div.muser_txt').hide();
		$(this).next().show();
		$('ul.muser_list > li > a').removeClass('on');
		$(this).addClass('on');
		return false;
	});	
	
    // 자주찾는메뉴 탭처리
	$('ul.part_list > li > a').click(function() {
		$('ul.part_list div.part_txt').hide();
		$(this).next().show();
		$('ul.part_list > li > a').removeClass('on');
		$(this).addClass('on');
		return false;
	});	
    
	// 재난 팝업
	$('#calamity-today-close').click(function() {
		HHCommon.SetCookie('rep_calamityPopup', 'STORY', 1);
		$('#calamity-close').click();
	});
	$('#calamity-close').click(function() {
		$('#calamity-area').slideUp(200);
	});
});

$(document).ready(function(){
  var floatPosition = parseInt($('#floatBanner').css('top'));
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    var newPosition = floatPosition + scrollTop + 'px';
    $('#floatBanner').stop().animate({'top':newPosition},300);
  });
  
});