require("setimmediate");
window.$ = window.jQuery = require("jquery");
var mask = require("jquery-mask-plugin")
require("../js/owl.carousel.min");
var scrollingAPI = require("../js/ScrollingAPI.js");
import jump from 'jump.js';


 $(document).ready(function(){
    $('#phone').mask('+7'+'(999) 999-9999');

    function checkMQ(){
		return window.getComputedStyle(document.querySelector(".wrap"), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	var burger = $(".mobile_menu .burger");
    var burger_sidebar = $(".body_overlay .krest .burger")
	var sidemenu = $(".sidemenu");
	var paralax = $(".paralax");
    var body = $("body")
    var overlay = $(".overlay")
    var overlay_body = $(".body_overlay")
    var $header = $(".header");
    var $window = $(window);
    var h  = $header.outerHeight();

    burger.on("click", function(){
        overlay.addClass("overlay_active");
        overlay_body.addClass("body_overlay_active");
    })

   burger_sidebar.on("click", function(){
            overlay_body.addClass("body_overlay_intermediate");
            overlay_body.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                overlay.removeClass("overlay_active")
                overlay_body.removeClass("body_overlay_active body_overlay_intermediate")
                overlay_body.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            })
        burger.css("display","block")
        scrollingAPI.enableScroll();
    })

    function fixedMenu(){
        if ($window.scrollTop() <= h && $header.hasClass("fixed")) {
            $header.fadeOut('fast', function(){
                $header.removeClass("fixed")
                $header.fadeIn('fast')
            })

        }
    	if ($window.scrollTop() > h && $header.hasClass("fixed") == false){
             $header.fadeOut('fast', function(){
                $header.addClass("fixed")
                $header.fadeIn('fast')
             })
        }
    }
   
    $(document).scroll(function(){
        fixedMenu()
     })

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navText: ["",""],
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 1
            }
        }
    });

    
    $(".out_img").on('click', function(){
        $("input[type='checkbox']").each(function(i,e){
            $(e).prev().css("background","white");
            $(this).prop("checked",false)
        })
        $(this).next().prop("checked",true)
        $(this).css("background","#f18217");
    })

    $("input[type='checkbox']").on("click", function(){
        $("input[type='checkbox']").each(function(i,e){
            $(e).prev().css("background","white");
            $(this).prop("checked",false)
        })
            $(this).prev().css("background","#f18217");
            $(this).prop("checked",true)
    })
    
    $("#form").submit(function(e){
        e.preventDefault()
        var flag = false;
        var data = $(this).serialize();
        $(".error").remove();
        $(":input[required]").each(function(){
            if($(this).val() === ""){
                $(this).next().after("<div class='error'>Заполните поле</div>")
                flag = true;
            }
        })
        if(flag) {return false;} else {
               $.ajax({
                type: "POST", //Метод отправки
                url: "/reserve", //путь до php фаила отправителя
                data: data,
                success: function() {
                       //код в этом блоке выполняется при успешной отправке сообщения
                       alert("Ваше сообщение отправлено!");
                }
            });
               $("#form input").each(function(i,item){
                if(item.type == "checkbox"){
                    $(item).prev().css("background","white");
                    $(item).prop("checked",false)
                }else{
                    $(item).val("")
                }
            })
        }
    })

    ymaps.ready(init);

    function init(){
        var map = new ymaps.Map("map",{ 
        center: [55.682549, 37.865436],
        zoom: 16,
     })
       var MyPlacemark = new ymaps.Placemark([55.6827,37.8654],{},{
        iconLayout: 'default#image',
        iconImageHref: '../img/point.svg'
        })
        map.geoObjects.add(MyPlacemark);
        map.behaviors.disable('scrollZoom');
        map.behaviors.disable('drag');
    }
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

   $(".go_to").on('click', function(e){
        e.preventDefault();
        var href = $(this).attr('data-go');
        console.log(href)
        jump(href, {
          duration: 1000,
          offset: 0,
          callback: undefined,
          easing: easeInOutQuad,
          a11y: false
        })
    });

});

