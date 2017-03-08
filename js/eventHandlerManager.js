function eventHandlerManager( displayManager ) {
	this.loadMoreHandler = function ( postsObject ) {
		jQuery( '#load-more a' ).click(function(event) {
			event.preventDefault();
			console.log("load more clicked");
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
		
			var newPostsObject = {};
			var ajaxResponseObject = ajax.getPosts( ajaxRequest );
			newPostsObject = postManagerObject.buildPostsObject( ajaxResponseObject );
			displayManagerObject.displayPosts( newPostsObject );
			
			// Save the state.
			state.updatePostsObjectInHistory( newPostsObject );
		});
	}
	
	this.menuHandlers = function () {
	
		var catDistFromEnd = 2;
		var yearDistFromEnd = 3;
		var monthDistFromEnd = 2;	
		var themeURL = jQuery( 'body' ).data( 'uri' );
	
		// Get archive posts.
		jQuery( '.archives a' ).click(function(event) {
			console.log('Archive link clicked...');
			event.preventDefault();
		
			// Close menu.
			closeSidebar( jQuery( '#sidebar > div ') );
		
			var date = jQuery( this ).attr( 'href' ).split( '/' );
			var month = date[ date.length - monthDistFromEnd ];
			var year = date[ date.length - yearDistFromEnd ];
		
			var request = {
				'filter': 'archive',
				'month': month,
				'year': year,
				'text': jQuery( this ).text()
			};
		
			saveAndReload( request );
		});
		
		// Search posts.
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
		
		// Get category posts.
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
		
		function saveAndReload( request ) {
			// Close Menu
			if ( jQuery( '#mobile-menu-wrapper' ).length ) {
				closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) )
			}
		
			// Save request in storage.
			state.saveRequestFilterToSessionStorage( request );
		
			// Reload page.
			window.location.href = themeURL + '/words/';
		}
	}	
	
	console.log('Event Handler Manager initialised...');
}	
