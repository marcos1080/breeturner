/*******************************************************************************

	This class compartmentalises various event handlers and allows for specific
	handlers to be added in specific circumstances.
	
*******************************************************************************/

function eventHandlerManager( displayManager ) {
	
	/***********************************************************************
	
		Everytime posts are loaded the load more link is adjusted. The adjustment
		involves removing it then adding again if needed. After it is added this
		event handler is added to facilitate the fetching of the next page of
		posts.
	
	***********************************************************************/
	this.loadMoreHandler = function ( postsObject ) {
		jQuery( '#load-more a' ).click(function(event) {
			event.preventDefault();
			console.log("load more clicked");
			
			// Get the number of the page to be requested.
			var page = jQuery( this ).data( 'next' );
			
			// Remove link to avoid double clicks.
			jQuery(this).remove();
			
			// Display loading icon in place of link.
			displayManagerObject.showLoadMoreProgress();
		
			// Get the next page of the appropriate filter.
			switch ( postsObject.filter ) {
				case 'category': 
					var ajaxRequest = {
						'category': category,
						'paged': page
					};
					break;
				case 'archive': 
					var ajaxRequest = {
						'date': {
							'month': postsObject.month,
							'year': postsObject.year,
							'text': postsObject.text
						},
						'paged': page
					};
					break;
				case 'search': 
					var ajaxRequest = {
						'search': postsObject.searchString,
						'paged': page
					};
					break;
				default:
					// No filter, recent post page.
					var ajaxRequest = {
						'recent': 'yes',
						'paged': page
					};
			}
		
			// Create a new posts object from the request. Response only sends new
			// posts that get appended to the existing data.
			var newPostsObject = {};
			var ajaxResponseObject = ajax.getPosts( ajaxRequest );
			newPostsObject = postManagerObject.buildPostsObject( ajaxResponseObject );
			displayManagerObject.displayPosts( newPostsObject );
			
			// Update the state.
			state.updatePostsObjectInHistory( newPostsObject );
		});
		
		console.log('Load More Event Handler Manager added...');
	}
	
	
	
	/************************************************************************
	
		Menu related handlers.
		
		Some functions are defined in the menuactions.js file. Closing menu
		functions that are called by a few handlers.
	
	************************************************************************/
	
	this.menuHandlers = function () {
	
		// Used to discern what data is being requested.
		var catDistFromEnd = 2;
		var yearDistFromEnd = 3;
		var monthDistFromEnd = 2;	
		
		// Target url.
		var themeURL = jQuery( 'body' ).data( 'uri' );
                
                /*****************************************************************
			Audio related
		*****************************************************************/
               
                jQuery( '.audio-link' ).click(function(event) {
                    console.log('Audio link clicked...');
                    event.preventDefault();
                    
                    // Request.
                    var request = {
                            'filter': 'audio'
                    };
                    
                    // Get target url
                    var target_url = jQuery( this ).attr( 'href' );
                    
                    // Make request.
                    saveAndReload( request, target_url );
                });
        
		/*****************************************************************
			Archive related
		*****************************************************************/
		
		jQuery( '.archives a' ).click(function(event) {
			console.log('Archive link clicked...');
			event.preventDefault();
		
			// Close menu.
			closeSidebar( jQuery( '#sidebar > div ') );
		
			// Get request parameters.
			var date = jQuery( this ).attr( 'href' ).split( '/' );
			var month = date[ date.length - monthDistFromEnd ];
			var year = date[ date.length - yearDistFromEnd ];
		
			// Request.
			var request = {
				'filter': 'archive',
				'month': month,
				'year': year,
				'text': jQuery( this ).text()
			};
		
			// Make request.
			//saveAndReload( request );
		});
		
		/*****************************************************************
			Search related
		*****************************************************************/
		
		jQuery( '#searchinput' ).keypress(function(event) {
			if( event.which == 13 ) {
				searchRequest()
			}
		});
	
		jQuery( '.searchsubmit' ).click(function(event) {	
			event.preventDefault();
			searchRequest()
		});
	
		jQuery( '#search_hover' ).click(function(event) {	
			event.preventDefault();
			searchRequest()
		});
	
		function searchRequest() {
			var searchQuery = jQuery( '#searchinput' )[0].value;

			if (searchQuery != "")
			{
				var searchString = searchQuery;
				jQuery( '#searchinput' )[0].value = '';

				var request = {
					'filter': 'search',
					'searchString': searchString
				};
	
				saveAndReload( request );
			}
		}
		
		/*****************************************************************
			Category related
		*****************************************************************/
		
		jQuery( '.cat-item a' ).click(function(event) {
			event.preventDefault();
		
			// Close menu.
			closeSidebar( jQuery( '#sidebar > div ') );
		
			var category = jQuery( this ).attr( 'href' ).split( '/' );
			category = category[ category.length - catDistFromEnd ];
			var request = {
				'filter': 'category',
				'category': category,
			};
		
			saveAndReload( request );
		});
		
		/*****************************************************************
			Common function used to make the request. Saves the request to 
			sessionStorage and reloads the page. Upon reload the init 
			script will	see the saved request, load it and make it.
		*****************************************************************/
		
		function saveAndReload( request, target_url = '' ) {
			// Close Menu
			if ( jQuery( '#mobile-menu-wrapper' ).length ) {
				closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) )
			}
		
			// Save request in storage.
			state.saveRequestFilterToSessionStorage( request );
		
			// Reload page.
                        if( target_url == '' ) {
                            window.location.href = themeURL + '/words/';
                        } else {
                            window.location.href = target_url;
                        }
		}
		
                /*****************************************************************
			Portfolio desktop side menu handler.
		*****************************************************************/
                
                var scrollTimeout = null;
                
                jQuery( window ).on( 'scroll', function() {
                    if( scrollTimeout == null ) {
                        scrollTimeout = setTimeout( function() {
                            if( jQuery( window ).scrollTop() > 250 ) {
                                jQuery( '.top-bar' ).addClass( 'top-bar-fixed' );
                            } else {
                                jQuery( '.top-bar' ).removeClass( 'top-bar-fixed' );
                            }
                            scrollTimeout = null;
                        }, 5 );
                    }
                });
                
		/*****************************************************************
			Menu opening handler
		*****************************************************************/
		
		// Used on the desktop version to open sidebar. 
		jQuery( '.menu-slide-open' ).click( function(event) {
			event.preventDefault();
		
			// Get menu to show.
			var menu;
		
			switch( jQuery( this ).data( 'menu' ) ) {
				case 'categories':
					menu = jQuery( '#sidebar .categories' );
					break;
				case 'archives':
					menu = jQuery( '#sidebar .archives' );
					break;
			}
			
			openSidebar( menu );
		});
	
		// Show sidebar
		function openSidebar( menu ) {
			// Add overlay and fade in.
			jQuery( 'body' ).prepend( fullscreenOverlay );
			fullscreenOverlay.animate({
				'opacity': '1'
			}, slideSpeed);
			
			// Set the display of menu to block and slide in from right.
			menu.show();
			jQuery( '#sidebar' ).show();
			jQuery( '#sidebar' ).animate({
				'right': '0'
			}, slideSpeed);
			
			// Set state
			jQuery( '#sidebar' ).addClass( 'active' );
		
			// Add event handler to close menu if the background is clicked.
			fullscreenOverlay.click(function() {
				closeSidebar( menu );
			});
		}
		
		console.log('Menu Event Handler Manager added...');
	}	
	
	
	
	/************************************************************************
	
		Menu related handlers for mobile devices.
		
		Some functions are defined in the menuactions.js file. Closing menu
		functions that are called by a few handlers.
	
	************************************************************************/
	
	this.mobileMenuHandlers = function(){
	
		/****************************************************************
			Opening and closing main menu.
		****************************************************************/
		// Home button close menu.
		jQuery( '#mobile-home' ).click(function() {
			closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) )
		});
	
		// Words button close menu
		jQuery( '#mobile-words' ).click(function() {
			closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) )
		});

		// Mobile menu, toggle open menu.
		jQuery( '#mobile-toggle' ).click(function() {
			menu = jQuery( '#mobile-menu-wrapper' );
			openMobileMenu( menu );
		});
	
		// Swipe from right edge to open menu.
		jQuery( 'body' ).swipeleft(function( event ){
			// take 15% of screen good for diffrent screen size
			var triggerWidth = jQuery( window ).width() * 0.85;
			// check if the swipe right is from 15% of screen (coords[0] means X)
			if ( event.swipestart.coords[0] > triggerWidth) {
				// open your panel
			  	openMobileMenu( jQuery( '#mobile-menu-wrapper' ) );
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
		
			// Both fullscreen and menu.
			fullscreenOverlay.swiperight(function() {
				closeMobileMenu( menu );
			});
		
			menu.swiperight(function() {
				closeMobileMenu( menu );
			});
		}
	
		/*****************************************************************
			Show/Hide menu on scroll.
		*****************************************************************/
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
	
		/*****************************************************************
			Sub menu
		*****************************************************************/
		// Categories
		jQuery( '#mobile-categories > a' ).click(function(event) {
			event.preventDefault();
			toggleMenu( jQuery( this ) );
		});
	
		// Archives
		jQuery( '#mobile-archives > a' ).click(function(event) {
			event.preventDefault();
			toggleMenu( jQuery( this ) );
		});
	
		// Menu open/close.
		function toggleMenu( menu ) {
			if( !menu.siblings( 'ul' ).hasClass( 'active' ) ) {
				// Close open sub menu (if any).
				jQuery( '#mobile-menu-wrapper .active' ).slideUp(function() {
					jQuery( this ).removeClass( 'active' );
				});
				
				// Adjust link style.
				jQuery( '#mobile-menu-wrapper .active' ).siblings( 'a' ).removeAttr( 'style' );
				menu.css({
					'color': 'rgba(0,0,0,.9)',
					'border-color': 'rgba(0,0,0,.9)'
				});
				
				// Show and set to active.
				menu.siblings( 'ul' ).slideDown(function() {
					jQuery( this ).addClass( 'active' );
				});
			} else {
				// Close sub menu and remove link style.
				menu.siblings( 'ul' ).slideUp(function() {
					jQuery( this ).removeClass( 'active' );
				});
				menu.removeAttr( 'style' );
			}
		}
	}
	
	
	
	/************************************************************************
	
		Comments (if enabled)
	
	************************************************************************/
	
	this.commentsHandlers = function () {
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
	
		console.log('Comments Event Handler Manager added...');
	}
	
	/************************************************************************
	
		Resizing handler.
		
		Used to rebuild the column wrapper if the window width crosses a 
		breakpoint. Breakpoints are defined in columnBuilder class.
	
	************************************************************************/
	
	// Used to stop concurrent firing of this function.
	var resizing = false;
	
	this.resizingHandlers = function () {
		// Need a columnBuilder object.
		if (columnBuilderObject == null ) {
			columnBuilderObject = new columnBuilder();
		}
		
		// Based on breakpoints the column wrapper is rebuilt upon window resize.
		jQuery( window ).resize( function() {
			numOfColumns = columnBuilderObject.getNumOfColumns();
			currentNumOfColumns = columnBuilderObject.numOfColumns;
	
			// Only do if a breakpoint has been crossed.
			if( numOfColumns != currentNumOfColumns && resizing == false ) {
				resizing = true;
		
				// Clear current posts.
				jQuery( '#post-wrapper' ).empty()
				
				// Get postsObject.
				var postsObject = state.loadPostsObjectFromHistory();
				// Set to false to avoid posts being added to current column wrapper.
				postsObject.add = false;

				// Display the posts.
				displayManagerObject.displayPosts( postsObject );
		
				// Allow resize to take place again.
				resizing = false;
			}
		});
	}
	
	console.log('Event Handler Manager initialised...');
}	
