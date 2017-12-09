require("setimmediate");
global.jQuery = require("jquery");
var $ = require("jquery")
var mask = require("jquery-mask-plugin")
require("../js/owl.carousel.min");
var scrollingAPI = require("../js/ScrollingAPI.js");


 $(document).ready(function(){
    
    $('#phone').mask('+7'+'(999) 999-9999');
    function checkMQ(){
		return window.getComputedStyle(document.querySelector(".wrap"), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	var burger = $(".mobile_menu > .burger");
    var burger_sidebar = $(".body_overlay .krest .burger")
	var sidemenu = $(".sidemenu");
	var paralax = $(".paralax");
    var body = $("body")
    var overlay = $(".overlay")
    var overlay_body = $(".body_overlay")
    var wrap = $(".wrap") 
    var $header   = $(".header") 
    var $window    = $(window)
    var h  = $header.outerHeight()

	burger.on("click",function(){
        scrollingAPI.disableScroll();
        overlay.addClass("menu_is_open")
        // overlay_body.addClass("menu_is_open")
        $(this).css("display","none")
	})

    burger_sidebar.on("click", function(){
        scrollingAPI.enableScroll();
        overlay.removeClass("menu_is_open")
        // overlay_body.removeClass("menu_is_open")
        burger.css("display","block")
        
    })


    function fixedMenu(){
        if ($(this).scrollTop() <= h && $header.hasClass("fixed")) {
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
        $(this).css("background","yellow");
    })

    $("input[type='checkbox']").on("click", function(){
        $("input[type='checkbox']").each(function(i,e){
            $(e).prev().css("background","white");
            $(this).prop("checked",false)
        })
            $(this).prev().css("background","yellow");
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
            }else{

            }
        })
        if(flag) {return false;} else {
               $.ajax({
                type: "POST", //Метод отправки
                url: "send.php", //путь до php фаила отправителя
                data: data,
                success: function() {
                       //код в этом блоке выполняется при успешной отправке сообщения
                       alert("Ваше сообщение отправлено!");
                }
            });
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

   $(".go_to").on('click', function(e){
        e.preventDefault();
        var href = $(this).attr('data-go');
        $('html, body').animate({ scrollTop: $(href).offset().top }, 500);
        return false
    });

});

