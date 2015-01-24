var modalWindow = function(triggerz, targetz){
	var overlay = $('.bg-overlay');
	var trig = this.triggerz;

	triggerz.bind('click', function(e){
		$("div[class^='modal-']").removeClass("active");
		targetz.addClass("active");
		overlay.addClass("active");
	})

	$('.close').bind('click', function(e){
		targetz.removeClass("active");
		overlay.removeClass("active");
	})

	$('.cancel').bind('click', function(e){
		targetz.removeClass("active");
		overlay.removeClass("active");
	})

	$(document).keyup(function(e) {
	  if (e.keyCode == 27) {
  		targetz.removeClass("active");
		overlay.removeClass("active");
	  }
	});

}
