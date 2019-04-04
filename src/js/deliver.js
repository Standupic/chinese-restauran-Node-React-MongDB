window.$ = window.jQuery = require("jquery");
var scrollingAPI = require("../js/ScrollingAPI.js");
$(document).ready(function(){
	var burger = $(".mobile_menu .burger");
    var burger_sidebar = $(".body_overlay .krest .burger")
	var sidemenu = $(".sidemenu");
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
})