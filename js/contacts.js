/*******************************************************************************

	Contact form, front page behaviour.

*******************************************************************************/

/*******************************************************************************

	Variables.
	
*******************************************************************************/

var slideSpeed = 300;
var fullscreenOverlay = jQuery('<div class="overlay"></div>');


/*******************************************************************************

	Main, after page load.
	
*******************************************************************************/

jQuery(document).ready(function(){
	// Add event handler to "Email Me" link.
	openHandler();
	// Add event handler to "Send" button.
	addContactEventHandlers();
	// Add loading icon element to form.
	addProgressIcons();
});

/*******************************************************************************

	Functions
	
*******************************************************************************/

function formatNewContactForm() {
	
	// Insert error message into input fields as placeholder text.
	var alerts = jQuery('.wpcf7-not-valid-tip');
	alerts.each(function() {
		var message = jQuery(this).text();
		jQuery(this).siblings('input').attr({'placeholder': message});
		jQuery(this).remove();
	});
	
	// Move bottom error message to the top of div.
	var errorMessage = jQuery('.wpcf7-response-output');
	var parentForm = errorMessage.closest('form');
	errorMessage.detach();
	errorMessage.prependTo(parentForm);
}	

// "Email Me" link clicked. Slide up and down function.
function openHandler() {
	jQuery( '#contact' ).click(function(event) {
		event.preventDefault();
	
		var contactForm = jQuery( '#contact-form' );		

		if (contactForm.hasClass('open')) {
			contactForm.removeClass('open');
			contactForm.slideUp();
		} else {
			contactForm.addClass('open');
			contactForm.slideDown();
		}
	});
}

// Add the event handler to a form.
function addContactEventHandlers() {
	// Submit button clicked. Stop default action and replace with AJAX.
	jQuery( '#contact-form form' ).submit(function(event) {
		event.preventDefault();
		
		// Hide submit button and show loading icon.
		jQuery('.wpcf7-submit').fadeOut(slideSpeed, function() {
			jQuery('.loading-icon').fadeIn(slideSpeed);
		});
		
		// Send form details to ajax.php
		var url = location.protocol + '//' + location.host + jQuery(this).attr('action');
		jQuery.post(
			url,
			jQuery(this).serialize(),
			function( data ) {
				var response = jQuery(data);
				// Response is an entire page, separate the form from the page.
				var newContactForm = response.find('#contact-form');
				// Set the form to the current state.
				newContactForm.addClass('open');
				newContactForm.find('.wpcf7-mail-sent-ok').text = '';
				newContactForm.find('.wpcf7-mail-sent-ok').removeAttr('role');
				newContactForm.find('.wpcf7-mail-sent-ok').hide();
		
				// Replace the current form with the response form.
				jQuery('#contact-form').empty().replaceWith(newContactForm);
				newContactForm.show();
				// Add loading icon element to form.
				addProgressIcons();
		
				// Set any error messages.
				formatNewContactForm();
				// Set event handlers for the new form.
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

// Display an alert informing user of successful message.
function showSuccessAlert() {
	// Success alert parts.
	var alert = jQuery('<div id="message-sent"></div>');
	var message = jQuery('<p id="message-sent-message">Your message has been sent</p>');
	var messageLine2 = jQuery('<p id="message-sent-message">Thanks!</p>');
	var ok = jQuery('<p id="message-sent-ok"><a href="">OK</a></p>');
	
	// Assemble the parts.
	alert.append(message);
	alert.append(messageLine2);
	alert.append(ok);
	fullscreenOverlay.append(alert);
	
	// Set the styling.
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
	
	// Display the alert.
	jQuery( 'body' ).prepend( fullscreenOverlay );
	fullscreenOverlay.animate({
		'opacity': '1'
	}, slideSpeed);
	
	// Hide the form when the user clicks ok.
	jQuery('#message-sent-ok').click(function(event) {
		event.preventDefault();
		// Close contactForm
		var contactForm = jQuery( '#contact-form' );
		contactForm.removeClass('open');
		contactForm.slideUp();
		
		// Hide alert.
		fullscreenOverlay.animate({
			'opacity': '0'
		}, slideSpeed, function() {
			fullscreenOverlay.empty().removeAttr( 'style' ).remove();
		});
	});
}

// Adds a loading icon div element to the send button. When the button is
// clicked it fades and the progress button is shown.
function addProgressIcons() {
	var loadingIconUrl = jQuery('body').data('uri') + '/images/icons/loading.gif';
	var loadingIcon = jQuery('<img class="loading-icon" src="' + loadingIconUrl + '" alt="Loading Icon">');
	
	loadingIcon.clone().appendTo('#submit-wide');
	loadingIcon.clone().appendTo('#submit-thin');
	
	jQuery('.loading-icon').css({
		'height': '36px',
		'display': 'none'
	});
}
