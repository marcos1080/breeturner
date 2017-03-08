/*******************************************************************************

	Variables

*******************************************************************************/

// Column number window size break points.
var one_column_max_width = 530;
var two_column_max_width = 780;
var three_column_max_width = 1200;

/*******************************************************************************



*******************************************************************************/

jQuery(document).ready(function(){
	// Check to see if there is a current session.
	if( jQuery( '#post-wrapper' ).length ) {
		// Current page is the blog post page.
		var posts = loadArrayFromSessionArray( 'postArray' );
		if( posts !== null ) {
			restorePostSession( posts );
		} else {
			var request = {
				'recent': 'yes',
				'paged': '1'
			};

			sessionStorage.clear();
			sessionStorage.setItem('filter', 'recent');

			get_posts( request );	
		}
	}
	
	// Remove splash screen. Splash screen used to redirect for non javascript
	// browsers.
	jQuery('#splash-text').stop().hide();
	jQuery('#splash-screen').animate({'opacity': '0'}, 300, function() {
		jQuery('#splash-screen').remove();
	});
});
