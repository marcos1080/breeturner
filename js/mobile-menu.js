jQuery(document).ready(function(){
	// Home button
	jQuery( '#mobile-home' ).click(function() {
		window.location.href = jQuery( this ).data( 'url' );
	});

	// Mobile menu, toggle open menu.
	jQuery( '#mobile-toggle' ).click(function() {
		menu = jQuery( '#mobile-menu-wrapper' );
		
		openMobileMenu( menu );
	});
	
	// Swipe from right edge.
	jQuery( 'body' ).swipeleft(function( event ){
		// take 15% of screen good for diffrent screen size
		var triggerWidth = jQuery( window ).width() * 0.85;
		// check if the swipe right is from 15% of screen (coords[0] means X)
		if ( event.swipestart.coords[0] > triggerWidth) {
			// open your panel
		  	openMobileMenu( jQuery( '#mobile-menu-wrapper' ) );
		}
	});
	
	// Show/Hide menu on scroll.
	var lastScrollPosition = 0;
	var ignoreScrolling = false;
	
	jQuery(window).on('scroll', function() {
		if (ignoreScrolling == false && jQuery(window).scrollTop() > 55 ) {
			ignoreScrolling = true;
			jQuery('#mobile-banner').stop();
			var currentScrollPosition = jQuery(window).scrollTop();
			if (currentScrollPosition < lastScrollPosition) {
				// Scrolling up.
				jQuery('#mobile-banner').css({
					'top': '0px'
				});
			} else {
				// Scrolling down.
				jQuery('#mobile-banner').css({
					'top': '-55px'
				});
			}
			setTimeout(function() {
				ignoreScrolling = false;
			}, 50);
		
			lastScrollPosition = currentScrollPosition;
		}
	});
	
	function openMobileMenu( menu ) {
		jQuery( 'body' ).prepend( fullscreenOverlay );
			
		fullscreenOverlay.animate({
			'opacity': '1'
		}, slideSpeed);
	
		menu.animate({
			'right': '0px'
		}, slideSpeed, function() {
			menu.addClass( 'active' );
		});
		
		// Close menu triggers.
		fullscreenOverlay.click(function() {
			closeMobileMenu( menu );
		});
		
		fullscreenOverlay.swiperight(function() {
			closeMobileMenu( menu );
		});
		
		menu.swiperight(function() {
			closeMobileMenu( menu );
		});
	}
	
	// Slide handlers and functions for the mobile menu.
	jQuery( '#mobile-categories > a' ).click(function(event) {
		event.preventDefault();
		toggleMenu( jQuery( this ) );
	});
	
	jQuery( '#mobile-archives > a' ).click(function(event) {
		event.preventDefault();
		toggleMenu( jQuery( this ) );
	});
	
	function toggleMenu( menu ) {
		if( !menu.siblings( 'ul' ).hasClass( 'active' ) ) {
			jQuery( '#mobile-menu-wrapper .active' ).slideUp(function() {
				jQuery( this ).removeClass( 'active' );
			});
			jQuery( '#mobile-menu-wrapper .active' ).siblings( 'a' ).removeAttr( 'style' );
			menu.css({
				'color': 'rgba(0,0,0,.9)',
				'border-color': 'rgba(0,0,0,.9)'
			});
			menu.siblings( 'ul' ).slideDown(function() {
				jQuery( this ).addClass( 'active' );
			});
		} else {
			menu.siblings( 'ul' ).slideUp(function() {
				jQuery( this ).removeClass( 'active' );
			});
			menu.removeAttr( 'style' );
		}
	}
});

// Outside the ready block so it can be called globally.
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
