var valine_appid = $("#valine_appid").val();
var valine_appKey = $("#valine_appKey").val();
var web_style = $("#web_style").val(); //获得config里设置的值

new Valine({
    el: '#vcomments',
    appId: valine_appid,
    appKey: valine_appKey,
    placeholder: '请输入内容...',
    avatar: "retro"
})

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
    });
});


//切换主题

function setCookie(key, value){  //将 键值对 存入cookie
    localStorage.setItem(key, value);
}

function getCookie(key) { //get key 对应value
    var data = localStorage.getItem(key);
    return data
}

function updateStyle() {
    if (getCookie("style") == "white") {
		$("html").attr('class', 'theme-white')
		$("#update_style_b").attr('class', "nes-radio")
        $("#update_style_w").attr('class', "nes-radio")

    } else {
		$("html").attr('class', 'theme-black')
		$("#update_style_b").attr('class', "nes-radio is-dark")
        $("#update_style_w").attr('class', "nes-radio is-dark")
}
}

$(document).ready(function(){
	//新页面保存主题信息
	if (getCookie("style") == null) {
		setCookie("style", web_style);
		$("[color_mode='"+web_style+"']").prop('checked', true);
		updateStyle();
	} else if (getCookie("style") == "white") {
		setCookie("style", "white");
		$("[color_mode=white]").prop('checked', true);
		updateStyle();
	} else if (getCookie("style") == "black") {
		setCookie("style", "black");
		$("[color_mode=black]").prop('checked', true);
		updateStyle();};
	//滚动条判定
	$(function(){
		$(window).scroll(function(){
			if ($(window).scrollTop() > 50){
				$(".scroll-btn").addClass("active")
			} else {
				$(".scroll-btn").removeClass("active")
			}
		});
	//点击后跳转
	$(".scroll-btn").click(function(){
		$('body,html').animate({
			scrollTop:0
		}, 500);
		return false;
		});
	});
});


$("[name=switch]").change(function() {
	var style = $('[name="switch"]').filter(':checked').attr("color_mode")
	setCookie("style", style);
	updateStyle();
});


// 文章页后退按钮
$('a.back').click(function () {
  if (history.length > 1) { // IE 和Opera从0开始，而Firefox、Chrome和Safari从1开始。
    history.go(-1);
  } else {
    location.replace('/');
  }
});