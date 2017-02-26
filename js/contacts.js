var slideSpeed = 300;
var fullscreenOverlay = jQuery('<div class="overlay"></div>');

jQuery(document).ready(function(){
	openHandler();
	addContactEventHandlers();
});

function formatNewContactForm() {
	
	// Insert error message into input fields as placeholder text.
	var alerts = jQuery('.wpcf7-not-valid-tip');
	alerts.each(function() {
		var message = jQuery(this).text();
		jQuery(this).siblings('input').attr({'placeholder': message});
		jQuery(this).remove();
	});
	
	// Move botom error message to the top of div.
	var errorMessage = jQuery('.wpcf7-response-output');
	var parentForm = errorMessage.closest('form');
	errorMessage.detach();
	errorMessage.prependTo(parentForm);
}	

function openHandler() {
	// "Email Me" link clicked. Slide up and down function.
	jQuery( '#contact' ).click(function(event) {
		event.preventDefault();
	
		var contactForm = jQuery( '#contact-form' );		

		if (contactForm.hasClass('open'))
		{
			contactForm.removeClass('open');
			contactForm.slideUp();
		} else {
			contactForm.addClass('open');
			contactForm.slideDown();
		}
	});
}

function addContactEventHandlers() {
	// Submit button clicked. Stop default action and replace with AJAX.
	jQuery( '#contact-form form' ).submit(function(event) {
		event.preventDefault();
		var url = location.protocol + '//' + location.host + jQuery(this).attr('action');

		jQuery.post(
			url,
			jQuery(this).serialize(),
			function( data ) {

				var response = jQuery(data);
				var newContactForm = response.find('#contact-form');
				newContactForm.addClass('open');
				newContactForm.find('.wpcf7-mail-sent-ok').text = '';
				newContactForm.find('.wpcf7-mail-sent-ok').removeAttr('role');
				newContactForm.find('.wpcf7-mail-sent-ok').hide();
			
				jQuery('#contact-form').empty().replaceWith(newContactForm);
				newContactForm.show();
			
				formatNewContactForm();
				addContactEventHandlers();
				
				// Handle successful email.
				if( newContactForm.find('.sent').length ) {
					// Show alert
					showSuccessAlert();
				}
			}
		);
	});
}

function showSuccessAlert() {
	var alert = jQuery('<div id="message-sent"></div>');
	var message = jQuery('<p id="message-sent-message">Your message has been sent</p>');
	var messageLine2 = jQuery('<p id="message-sent-message">Thanks!</p>');
	var ok = jQuery('<p id="message-sent-ok"><a href="">OK</a></p>');
	
	alert.append(message);
	alert.append(messageLine2);
	alert.append(ok);
	fullscreenOverlay.append(alert);
	
	alert.css({
		'background-color': 'white',
		'border': '2px solid rgba(0,0,0,.4)',
		'box-shadow': '0 0 10px rgba(0,0,0,.2)',
		'position': 'absolute',
		'left': '50%',
		'top': '50%',
		'transform': 'translateX( -50% ) translateY( -50% )',
		'-webkit-transform': 'translateX( -50% ) translateY( -50% )',
		'-moz-transform': 'translateX( -50% ) translateY( -50% )',
		'-ms-transform': 'translateX( -50% ) translateY( -50% )',
		'-o-transform': 'translateX( -50% ) translateY( -50% )',
		'width': '300px',
		'height': '160px'		
	});
	
	message.css({
		'margin-top': '30px'
	})
	
	ok.css({
		'position': 'absolute',
		'bottom': '0px',
		'left': '50%',
		'transform': 'translateX( -50% )',
		'-webkit-transform': 'translateX( -50% )',
		'-moz-transform': 'translateX( -50% )',
		'-ms-transform': 'translateX( -50% )',
		'-o-transform': 'translateX( -50% )',
		'width': '270px',
		'border-top': '2px solid rgba(0,0,0,.1)',
		'padding-top': '12px'
	});
	
	jQuery( 'body' ).prepend( fullscreenOverlay );
	fullscreenOverlay.animate({
		'opacity': '1'
	}, slideSpeed);
	
	jQuery('#message-sent-ok').click(function(event) {
		event.preventDefault();
		// Close contactForm
		var contactForm = jQuery( '#contact-form' );
		contactForm.removeClass('open');
		contactForm.slideUp();
		
		fullscreenOverlay.animate({
			'opacity': '0'
		}, slideSpeed, function() {
			fullscreenOverlay.empty().removeAttr( 'style' ).remove();
		});
	});
}
