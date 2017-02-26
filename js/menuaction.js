var slideSpeed = 300;
var fullscreenOverlay = jQuery('<div class="overlay"></div>');

function closeSidebar( menu ) {
	jQuery( '#sidebar' ).animate({
		'right': '-300'
	}, slideSpeed, function() {
		menu.hide();
	}).removeAttr( 'style' );
	fullscreenOverlay.animate({
		'opacity': '0'
	}, slideSpeed, function() {
		fullscreenOverlay.removeAttr( 'style' ).remove();
	});
	jQuery( '#sidebar' ).removeAttr( 'style' ).removeClass( 'active' );
}

jQuery(document).ready(function(){

	jQuery( '.menu-slide-open' ).click(function(event) {
		event.preventDefault();
		
		// Get menu to show.
		var menu;
		
		switch( jQuery( this ).data( 'menu' ) ) {
			case 'mobile-menu':
				menu = jQuery( '#sidebar .menu-main-container' );
				break;
			case 'categories':
				menu = jQuery( '#sidebar .categories' );
				break;
			case 'archives':
				menu = jQuery( '#sidebar .archives' );
				break;
		}
		
		if( menu.hasClass( 'active' ) ) {
			// Close menu
			closeSidebar( menu );
		} else {
			// Open menu
			openSidebar( menu );
		}
	});
	
	function openSidebar( menu ) {
		jQuery( 'body' ).prepend( fullscreenOverlay );
		fullscreenOverlay.animate({
			'opacity': '1'
		}, slideSpeed);
		menu.show();
		jQuery( '#sidebar' ).animate({
			'right': '0'
		}, slideSpeed);
		jQuery( '#sidebar' ).addClass( 'active' );
		
		fullscreenOverlay.click(function() {
			closeSidebar( menu );
		});
	}
});
