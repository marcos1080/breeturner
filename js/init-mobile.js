// Column number window size break points.
var one_column_max_width = 530;
var two_column_max_width = 780;
var three_column_max_width = 1200;

jQuery(document).ready(function() {	
	// Get history state.
	var state = window.history.state;
	
	// Save home page content.
	if( state === null && jQuery( '.home' ).length ) {
		history.replaceState({
			'filter': 'home',
			'json': jQuery( '.home' ).prop( 'outerHTML' )
		}, jQuery( 'title' ) );
	}
	
	if( state !== null ) {
		if( state.filter == 'home' ) {
			jQuery( '#content' ).remove();
			jQuery( '#main' ).append( jQuery( state.json ) );
			addContactEventHandlers()
		} else {
			restoreState( state );
		}
	}
	
	window.addEventListener('popstate', function( event ) {
		if( event.state !== null ) {
			if( event.state.filter == 'home' ) {
				jQuery( '#content' ).remove();
				jQuery( '#main' ).append( jQuery( event.state.json ) );
				addContactEventHandlers()
			} else {
				restoreState( event.state );
			}
		}
	});
	
	// Remove splash screen.
	jQuery('#splash-text').stop().hide();
	jQuery('#splash-screen').animate({'opacity': '0'}, 300, function() {
		jQuery('#splash-screen').remove();
	});
});
