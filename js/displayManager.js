function displayManager( ajax, postManagerObject ) {
	
	var loadingShowing = false;
	var progressShowing = false;
	var columnBuilderObject = new columnBuilder();
	
	this.showLoadingIndicator = function () {
		var loadingIconUrl = jQuery('body').data('uri') + '/images/icons/loading.gif';
		var loadingIcon = jQuery('<img src="' + loadingIconUrl + '" alt="Loading Icon">');
		var loadingContainer = jQuery('<div id="loading"></div>');
		
		loadingIcon.css({
			'background-color': 'rgba(0,0,0,0)',
			'width': '80px',
			'position': 'absolute',
			'top': '40%',
			'left': '50%',
			'transform': 'translate( -50%, -50% )',
			'-o-transform': 'translate( -50%, -50% )',
			'-ms-transform': 'translate( -50%, -50% )',
			'-moz-transform': 'translate( -50%, -50% )',
			'-webkit-transform': 'translate( -50%, -50% )',
		});
		
		loadingContainer.css({
			'width': '100%',
			'height': jQuery(window).height() - 55 - jQuery('#footer').outerHeight()
		});
		
		loadingIcon.appendTo(loadingContainer);
		loadingContainer.appendTo('#post-wrapper');
		
		loadingShowing = true;
	}
	
	this.showProgressBar = function () {
		if ( loadingShowing == true ) {
			var progressContainer = jQuery('<div id="barContainer"></div>');
			var progressIndicator = jQuery('<div id="barProgress"></div>');
			
			progressIndicator.css({
				'background-color': 'rgba(0,0,0,0.1)',
				'width': '0%',
				'height': '100%'
			});
			
			progressIndicator.appendTo(progressContainer);
			progressContainer.css({
				'backgrond-color': 'white',
				'border': '1px solid rgba(0,0,0,0.2)',
				'border-radius': '10px',
				'overflow': 'hidden',
				'height': '10px',
				'position': 'absolute',
				'top': '55%',
				'left': '50%',
				'transform': 'translate( -50%, -50% )',
				'-o-transform': 'translate( -50%, -50% )',
				'-ms-transform': 'translate( -50%, -50% )',
				'-moz-transform': 'translate( -50%, -50% )',
				'-webkit-transform': 'translate( -50%, -50% )',
			});
			
			progressContainer.appendTo('#loading');
			progressShowing = true;
		}
	}
	
	function incrementProgressBar ( total, current ) {
		if ( progressShowing ) {
			jQuery('#barProgress').css({
				'width': ( current / total * 100 ) + '%'
			})
		}
	}
	
	this.showLoadMoreProgress = function () {
		var loadingIconUrl = jQuery('body').data('uri') + '/images/icons/loading.gif';
		var loadingIcon = jQuery('<img src="' + loadingIconUrl + '" alt="Loading Icon">');
		
		loadingIcon.css({
			'height': '30px'
		});
		
		loadingIcon.appendTo('#load-more');
	}
	
	// Takes a postsObject and displays it in the page.
	this.displayPosts = function ( postsObject ) {
		console.log('Displaying posts...');
		// Check if images need to be pre-loaded.
		if( postsObject.unloadedThumbs.length > 0 ) {
			numOfThumbs = postsObject.unloadedThumbs.length;
			count = 0;
			
			if ( postsObject.add == false ) {
				// Show progress bar.
				this.showProgressBar();
			}
			
			// Set each thumb to update the progress bar after loading.
			// Once all are loaded the showPost functon is caled.
			jQuery.each( postsObject.unloadedThumbs, function( index, value ) {
				jQuery( value ).load( function() {
					count += 1;
					if ( postsObject.add == false ) {
						incrementProgressBar( numOfThumbs, count );
					}
					
					// If all thumbs loaded then go to next step.
					if ( numOfThumbs == count ) {
						// Tidy up object.
						delete postsObject['unloadedThumbs'];
						
						if ( postsObject.add == false ) {
							jQuery('#loading').fadeOut(300, function() {
								jQuery(this).remove();
								loadingShowing = false;
								progressShowing = false;
								showPosts( postsObject );
							});
						} else {
							showPosts( postsObject );
						}
					}
				});
			});
		} else {
			// Display the posts.
			showPosts( postsObject );
		}
		
	}
	
	function showPosts( postsObject ) {
		var columnWrapper;

		// Create columns element if new request.
		if ( postsObject.add == false ) {
			columnWrapper = columnBuilderObject.buildColumns();
			
			// Title.
			jQuery( '<h1>' + postsObject.heading + '</h1>' ).appendTo( '#post-wrapper' );
			
			columnWrapper.getWrapper().appendTo( '#post-wrapper' );
			
			// Add posts to DOM
			jQuery.each( postsObject.postArray, function( index, post ) {
				columnWrapper.addPost( post );
			});
		} else {
			columnWrapper = jQuery( '#column-wrapper' );
			
			columns = jQuery( '.column' );
	
			jQuery.each( postsObject.postArray, function( index, post ) {
				// Find Smallest columns and add post to it.
				smallest = jQuery( '.column-one' );

				jQuery.each( columns, function() {
					if( jQuery(this).height() < smallest.height() ) {
						smallest = jQuery(this);
					}
				});
			
				post.appendTo( smallest );
			});
		}
		
		// Fade posts in one by one.
		fadePostsIn( postsObject.postArray );
		
		// Adjust load more link. By removing the link (if present) then
		// re-attaching it (if needed) avoids having to adjust it.
		jQuery('#load-more').remove();
		if ( postsObject.hasOwnProperty( 'next' ) ){
			var more = jQuery( '<div id="load-more"><a href="" data-next="' + postsObject.next + '">LOAD MORE...</a></div>' );
			more.appendTo( '#post-wrapper' );
			eventHandlers.loadMoreHandler( postsObject );
		}
	}
	
	// Fade posts from postArray in one after the other. Recursive function.
	function fadePostsIn( array, index ) {
		if ( index === undefined ) {
			index = 0;
		}
		/* Each time the function is called the index is incremented.
			Once it reaches the array size it stops.
		*/
		if( index < array.length ) {
			array[index].animate({'opacity': '1'}, 300);
			setTimeout(function() {
				fadePostsIn( array, index + 1 );
			}, 100);
		}
	}
	
	console.log('Post Display Manager initialised...');
}
