// Function to display no posts availabe message.
function no_posts_found( searchString ) {
	jQuery( '#content' ).empty();
	postWrapper = jQuery( '#post-wrapper' );
	postWrapper.append( '<h1>No Posts Found for "' + searchString + '"</h1>' );
	jQuery( '#main' ).append( postWrapper );
}

/* Called after an AJAX request. Takes a JSON object and manipulates the DOM by
	converting posts from JSON to a DOM object.
*/

function displayPosts( posts ) {
	// Check if any posts were returned.
	if( posts.hasOwnProperty( 'no_post' ) ) {
		// Display message that no posts were found.
		no_posts_found( posts['no_post'] );
		
		closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) );
		
		return null;
	}
	
	var next = 0;
	
	if( posts.hasOwnProperty ( 'next' ) ) {
		next = posts.next;
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
			jQuery( '#load-more' ).remove();
			sessionStorage.removeItem( 'nextPage' );
		}
		
		// Set page details for reload if back button is pressed on post page.
		saveArrayToSessionStorage( postArray, 'postArray' );
		
	} else {
		// Close menu
		closeMobileMenu( jQuery( '#mobile-menu-wrapper' ) );
	
		// First load of the results, construct posts container.
		postArray= [];
		
		// Array to hold any thumbnails.
		var thumbArray = [];

		// Create post DOM elements from the post ajax json object.
		jQuery.each(posts.data, function( index, post ) {
			postArray.push(  formatPost( post, thumbArray ) );
		});

		/* If there are thumbs then set each thumb to call the addPostsThumbs to 
			test whether to display the posts yet.
		*/
		if( thumbArray.length > 0 ) {
			numOfThumbs = thumbArray.length;
			count = 0;
			
			jQuery.each( thumbArray, function( index, value ) {
				jQuery( value ).load( function() {
					count += 1;
					newPreLoad( count, numOfThumbs, posts.heading, next );
				});
			});
		} else {
			addPostsNewRequest( posts.heading, next );
		}
	}
	
	// At least one post contains thumbs, only display once images are pre-loaded.
	function newPreLoad( count, numOfThumbs, heading, next ) {
		if( numOfThumbs == count ) {
			addPostsNewRequest( heading, next );
		}
	}
	
	function appendPreLoad( count, numOfThumbs, array ) {
		if( numOfThumbs == count ) {
			addPostsToExisitingColumns( array )
		}
	}

	// No thumbs, just display posts immediately.
	function addPostsNewRequest( heading, next ) {
		// Get number of columns.
		numOfColumns = get_num_of_columns();
	
		// Add posts to columns and DOM.
		buildColumns( postArray, numOfColumns, heading, next );
		
		// Set page details for reload if back button is pressed on post page.
		saveState( 'save' );
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
		
		// Set page details for reload if back button is pressed on post page.
		saveState( 'update' );
	}
}

// Build column elements from post array
function buildColumns( array, numOfColumns, heading, next ) {
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
		
		contentWrapper = jQuery( '#content' );
		
		// Empty content div.
		contentWrapper.empty();
		// Empty main content to remove garbage from post on nvigation to words page.
		jQuery( '#main' ).empty().removeClass().append(contentWrapper).addClass('blog');
		
		// Change content div class if neccessary.
		if( contentWrapper.hasClass( 'home' ) ) {
			contentWrapper.removeClass( 'home' ).addClass( 'post-list' );
		}
		
		// Need to reset class on footer for border to show properly
		jQuery('#footer').removeClass('post-footer');
		
		// Reset scroll top
		jQuery(window).scrollTop(0);
		
		// Title.
		jQuery( '<h1>' + heading + '</h1>' ).appendTo( contentWrapper );
		
		/* Insert column wrapper before adding posts.
			Required for finding the height of each column to work.
		*/
		columnWrapper.getWrapper().appendTo( contentWrapper );
		
		// Add posts to DOM
		jQuery.each( postArray, function( index, post ) {
			columnWrapper.addPost( post );
		});
			
		// Sort out load more link.
		if( next != 0 ) {
			var more = jQuery( '<div id="load-more"><a href="" data-next="' + next + '">LOAD MORE...</a></div>' );
			more.appendTo( contentWrapper );
			loadMoreHandler();
			sessionStorage.setItem( 'nextPage', next );
		}	
		
		// Fade in posts.
		fadePostsIn( postArray, 0 );
		
		// Set current number of cols variable for resize function.
		curr_num_of_columns = numOfColumns;
}

// Used to stop the resize being activated too often and interrupting a current resize.
var resizing = false;

// Based on breakpoints the column wrapper is rebuilt upon window resize.
jQuery( window ).resize( function() {
	if( jQuery( '.column-wrapper' ).length ) {
		numOfColumns = get_num_of_columns();
	
		if( numOfColumns != curr_num_of_columns && resizing == false ) {
			resizing = true;
		
			// Get heading.
			var heading = jQuery( '#content h1' ).text();
		
			// Clear current posts.
			jQuery( '#content' ).empty()

			// Reset the opacity of the post elements
			jQuery.each( postArray, function( index, post ) {
				post.css({'opacity': '0'});
			});
			
			// Check for next page.
			var next = sessionStorage.getItem( 'nextPage' );
			if( next == null ) {
				next = 0;
			}

			// Add posts to columns and DOM.
			buildColumns( postArray, numOfColumns, heading, next );
		
			resizing = false;
		}
	}
});

var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];

// Save state to history.
function saveState( action ) {
	console.log( 'Saving state...' );
	var state = {
		'filter': sessionStorage.getItem( 'filter' )
	};
	
	switch ( state.filter ) {
		case 'recent':
			// Title.
			state.heading = 'Recent Posts';
			break;
		case 'category':
			// Title.
			state.category = sessionStorage.getItem( 'category' );
			state.heading = 'Search Results for "' + state.category;
			break;
		case 'archive':
			// Title.
			state.month = sessionStorage.getItem( 'month' );
			state.year = sessionStorage.getItem( 'year' );
			state.heading = 'Search Results for "' + months[state.month - 1] + ' ' + state.year;
			break;
		case 'search':
			// Title.
			state.searchString = sessionStorage.getItem( 'searchString' );
			state.heading = 'Search Results for "' + state.searchString;
			break;
	}
	
	// Next index for load more link.
	nextIndex = sessionStorage.getItem( 'nextPage' );
	if( nextIndex != null ) {
		state.nextIndex = nextIndex;
	}
	
	// Save postArray.
	// Array to store each DOM element as a string.
	stringArray = []
	
	// Convert each post element to string.
	jQuery.each( postArray, function() {
		stringArray.push( jQuery( this ).prop( 'outerHTML' ) );
	});
	
	state.postArray = JSON.stringify( stringArray );
	
	// Write to state.
	if( action == 'save' ) {
		history.pushState( state, state.heading );
	} else if ( action == 'update' ) {
		history.replaceState( state, state.heading );
	}
}

function restoreState( state ) {
	sessionStorage.clear();
	
	switch ( state.filter ) {
		case 'recent':
			// Title.
			sessionStorage.setItem('filter', 'recent');
			break;
		case 'category':
			// Title.
			sessionStorage.setItem('filter', 'category');
			sessionStorage.setItem('category', state.category);
			break;
		case 'archive':
			// Title.
			sessionStorage.setItem('filter', 'archive');
			sessionStorage.setItem('month', state.month);
			sessionStorage.setItem('year', state.year);
			break;
		case 'search':
			// Title.
			sessionStorage.setItem('filter', 'search');
			sessionStorage.setItem('searchString', state.searchString);
			break;
	}
	
	next = 0;
	
	if( state.hasOwnProperty( 'nextIndex' ) ) {
		sessionStorage.setItem( 'nextPage', state.nextIndex );
		next = state.nextIndex;
	}
	
	// Restore DOM
	stringArray = JSON.parse( state.postArray );
	
	postArray = [];
	
	// Convert string array to DOM element array.
	jQuery.each( stringArray, function( index, value ) {
		postArray.push( jQuery( value ) );
	});
	
	// Get number of columns.
	numOfColumns = get_num_of_columns();

	// Add posts to columns and DOM.
	buildColumns( postArray, numOfColumns, state.heading, next );
}
