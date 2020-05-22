// Smooth scrolling when clicking an anchor link
$(document).ready(function(){

	// Klick auf eien Link, der eine Raute (# = Anker) enthält
	$('a[href^="#"]').on('click',function(e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function () {
			window.location.hash = target;
		});
	});
});
 