var ScrollingAPI = (function(){
  
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  var preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  var preventDefaultForScrollKeys = function(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  var disableScroll = function() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  var enableScroll = function() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

  return {
    disableScroll: disableScroll,
    enableScroll: enableScroll
  }

}())

module.exports = ScrollingAPI;