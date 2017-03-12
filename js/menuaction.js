/*******************************************************************************

	Menu action functions that live globally, used by event handlers that are
	added to the DOM.

*******************************************************************************/

/*******************************************************************************

	Variables

*******************************************************************************/

var slideSpeed = 300;
var fullscreenOverlay = jQuery('<div class="overlay"></div>');

/*******************************************************************************

	Functions

*******************************************************************************/

function closeSidebar( menu ) {
	jQuery( '#sidebar' ).animate({
		'right': '-303'
	}, slideSpeed, function() {
		menu.hide();
		jQuery(this).removeClass('active');
	});
	fullscreenOverlay.animate({
		'opacity': '0'
	}, slideSpeed, function() {
		fullscreenOverlay.removeAttr( 'style' ).remove();
	});
}

function closeMobileMenu( menu ) {
	fullscreenOverlay.animate({
		'opacity': '0'
	}, slideSpeed, function() {
		jQuery( this ).remove();
	});
	
	menu.animate({
		'right': '-302px'
	}, slideSpeed, function() {
		menu.removeClass( 'active' );
		// Close any open submenus.
		jQuery( '#mobile-menu-wrapper .active' ).slideUp(function() {
			jQuery( this ).removeClass( 'active' );
			jQuery( this ).siblings( 'a' ).removeAttr( 'style' );
		});
	});
}
