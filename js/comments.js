jQuery(document).ready(function(){
	// Slide up and down function.
	jQuery('#comment-toggle').click(function(event) {
		event.preventDefault();
		var toggle = jQuery(this);
		if (toggle.hasClass('active')) {
			toggle.removeClass('active');
			jQuery('.comments-area').slideUp();
		} else {
			toggle.addClass('active');
			jQuery('.comments-area').slideDown();
		}
	});
});
