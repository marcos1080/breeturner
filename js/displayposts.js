// Function to display no posts availabe message.
function no_posts_found( searchString ) {
	postWrapper = jQuery( '#post-wrapper' );
	postWrapper.empty()
	postWrapper.append( '<h1>No Posts Found for "' + searchString + '"</h1>' );
}

/* Called after an AJAX request. Takes a JSON object and manipulates the DOM by
	converting posts from JSON to a DOM object.
*/
function displayPosts( posts ) {
	// Check if any posts were returned.
	if( posts.hasOwnProperty( 'no_post' ) ) {
		// Display message that no posts were found.
		no_posts_found( posts['no_post'] );
		
		return null;
	}
	
	// Variables for checking image pre-loading.
	var numOfThumbs;
	var count;

	// Add detected, add posts to container.
	if( posts.add == true ) {
		// Post container already exists. Fill in more posts.
		newPosts = [];
		
		// Array to hold any thumbnails.
		var thumbArray = [];
		
		// Create array of new posts.
		jQuery.each(posts.data, function( index, post ) {
			newPost = formatPost( post, thumbArray );
			newPosts.push( newPost );
		});
		
		// Add new posts to main post array.
		jQuery.each( newPosts, function( index, post ) {
			postArray.push( post );
		});
		
		// Check if images need to be pre-loaded.
		if( thumbArray.length > 0 ) {
			numOfThumbs = thumbArray.length;
			count = 0;
			
			jQuery.each( thumbArray, function( index, value ) {
				jQuery( value ).load( function() {
					count += 1;
					appendPreLoad( count, numOfThumbs, newPosts );
				});
			});
		} else {
			addPostsToExisitingColumns( newPosts )
		}
		
		
		// Adjust load more link.
		if( posts.hasOwnProperty ( 'next' ) ) {
			jQuery( '#load-more a' ).data( 'next', posts.next );
			sessionStorage.setItem( 'nextPage', posts.next );
		} else {
			jQuery( '#load-more a' ).remove();
			sessionStorage.removeItem( 'nextPage' );
		}
		
		// Set page details for reload if back button is pressed on post page.
		saveArrayToSessionStorage( postArray, 'postArray' );
		
	} else {
		// First load of the results, construct posts container.
		postArray= [];
		
		// Array to hold any thumbnails.
		var thumbArray = [];

		// Create post DOM elements from the post ajax json object.
		jQuery.each(posts.data, function( index, post ) {
			postArray.push(  formatPost( post, thumbArray ) );
		});

		// Remove post information from the DOM.
		var postWrapper = jQuery( '#post-wrapper' );
		postWrapper.empty();
		
		// Title.
		jQuery( '<h1>' + posts.heading + '</h1>' ).appendTo( postWrapper );

		/* If there are thumbs then set each thumb to call the addPostsThumbs to 
			test whether to display the posts yet.
		*/
		if( thumbArray.length > 0 ) {
			numOfThumbs = thumbArray.length;
			count = 0;
			
			jQuery.each( thumbArray, function( index, value ) {
				jQuery( value ).load( function() {
					count += 1;
					newPreLoad( count, numOfThumbs );
				});
			});
		} else {
			addPostsNewRequest();
		}
		
		// Sort out load more link.
		if( posts.hasOwnProperty ( 'next' ) ) {
			var more = jQuery( '<div id="load-more"><a href="" data-next="' + posts.next + '">LOAD MORE...</a></div>' );
			more.appendTo( postWrapper );
			loadMoreHandler();
			
			sessionStorage.setItem( 'nextPage', posts.next );
		}
		
		// Set page details for reload if back button is pressed on post page.
		saveArrayToSessionStorage( postArray, 'postArray' );
	}
	
	// At least one post contains thumbs, only display once images are pre-loaded.
	function newPreLoad( count, numOfThumbs ) {
		if( numOfThumbs == count ) {
			addPostsNewRequest();
		}
	}
	
	function appendPreLoad( count, numOfThumbs, array ) {
		if( numOfThumbs == count ) {
			addPostsToExisitingColumns( array )
		}
	}

	// No thumbs, just display posts immediately.
	function addPostsNewRequest() {
		// Get number of columns.
		numOfColumns = get_num_of_columns();
	
		// Add posts to columns and DOM.
		buildColumns( postArray, numOfColumns );
	}
	
	function addPostsToExisitingColumns( array ) {
		columns = jQuery( '.column' );
	
		jQuery.each( array, function( index, post ) {
			// Find Smallest columns and add post to it.
			smallest = jQuery( '.column-one' );

			jQuery.each( columns, function() {
				if( jQuery(this).height() < smallest.height() ) {
					smallest = jQuery(this);
				}
			});
			
			post.appendTo( smallest );
		});
		
		// Fade in new posts.
		fadePostsIn( array, 0 );
	}
}

// Restore previous session.
function restorePostSession( array ) {
	postArray = array;
	
	var postWrapper = jQuery( '#post-wrapper' );
	
	switch ( sessionStorage.getItem( 'filter' ) ) {
		case 'recent':
			// Title.
			jQuery( '<h1>Recent Posts</h1>' ).appendTo( postWrapper );
			break;
		case 'category':
			// Title.
			category = sessionStorage.getItem( 'category' );
			jQuery( '<h1>Search Results for "' + category + '"</h1>' ).appendTo( postWrapper );
			break;
		case 'archive':
			// Title.
			month = sessionStorage.getItem( 'month' );
			year = sessionStorage.getItem( 'year' );
			jQuery( '<h1>Search Results for "' + month + ' ' + year + '"</h1>' ).appendTo( postWrapper );
			break;
		case 'search':
			// Title.
			searchString = sessionStorage.getItem( 'searchString' );
			jQuery( '<h1>Search Results for "' + searchString + '"</h1>' ).appendTo( postWrapper );
			break;
	}
	
		// Get number of columns.
		numOfColumns = get_num_of_columns();
		
		// Add posts to columns and DOM.
		buildColumns( postArray, numOfColumns );
		
		// Sort out load more link.
		if( sessionStorage.getItem( 'nextPage' ) !== null ) {
			var more = jQuery( '<div id="load-more"><a href="" data-next="' + sessionStorage.getItem( 'nextPage' ) + '">LOAD MORE...</a></div>' );
			more.appendTo( postWrapper );
			loadMoreHandler();
		}
}

// Build column elements from post array
function buildColumns( array, numOfColumns ) {
	// Make required number of columns.
	switch( numOfColumns ) {
			case 1:
				columnWrapper = new ColumnWrapper( 'one-column', numOfColumns );
				break;
			case 2:
				columnWrapper = new ColumnWrapper( 'two-columns', numOfColumns );
				break;
			case 3:
				columnWrapper = new ColumnWrapper( 'three-columns', numOfColumns );
				break;
			case 4:
				columnWrapper = new ColumnWrapper( 'four-columns', numOfColumns );
				break;
		}
		
		/* Insert column wrapper before adding posts.
			Required for finding the height of each column to work.
		*/
		columnWrapper.getWrapper().insertAfter( jQuery( '#post-wrapper h1' ) );
		
		// Add posts to DOM
		jQuery.each( postArray, function( index, post ) {
			columnWrapper.addPost( post );
		});
			
		// Fade in posts.
		fadePostsIn( postArray, 0 );
		
		// Set current number of cols variable for resize function.
		curr_num_of_columns = numOfColumns;
}

// Used to stop the resize being activated too often and interrupting a current resize.
var resizing = false;

// Based on breakpoints the column wrapper is rebuilt upon window resize.
jQuery( window ).resize( function() {
	numOfColumns = get_num_of_columns();
	
	if( numOfColumns != curr_num_of_columns && resizing == false ) {
		resizing = true;
		
		// Clear current posts.
		jQuery( '.column-wrapper' ).remove()

		// Reset the opacity of the post elements
		jQuery.each( postArray, function( index, post ) {
			post.css({'opacity': '0'});
		});

		// Add posts to columns and DOM.
		buildColumns( postArray, numOfColumns );
		
		resizing = false;
	}
});
