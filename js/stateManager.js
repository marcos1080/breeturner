/* State manager is responsible for storing the state of a page and restoring
	it when it is navigated back to.
	
	It essentially is used when the back button is used to navigate to the page
	but will work for navigating forward through the history too.
	
	It will restore the page with the number of post that the user had loaded 
	thus negating the need to navigate by clicking load more...
*/

function stateManager() {

	// Needed for archive postsObjects.
	var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];

	// Check if anything is stored in the sessionStorage object.
	this.sessionStorageHasState = function () {
		console.log('Checking sessionStorage state...');
		if (sessionStorage.length == 0 ) {
			console.log('   no state present');
			return false;
		}
		
		console.log('   state present.');
		return true;
	}

	/************************************************************************
	
		History State
		
	************************************************************************/

	// Check if the history object for this page has state attached.
	this.historyHasState = function () {
		console.log('Checking history state...');
		// Get history state.
		var state = window.history.state;
		
		if ( state == null ) {
			console.log('   no state present');
			return false;
		}
		
		console.log('   state present.');
		return true;
	}

	/*****************************************************************
		Save state to history.
	*****************************************************************/
	this.savePostsObjectToHistory = function ( postsObject, update ) {
		console.log( 'Saving state to history...' );
		var state = {
			'filter': postsObject.filter,
			'heading': postsObject.heading
		};
	
		switch ( state.filter ) {
			case 'category':
				// Title.
				state.category = postsObject.category;
				break;
			case 'archive':
				// Title.
				state.month = postsObject.month;
				state.year = postsObject.year;
				break;
			case 'search':
				// Title.
				state.searchString = postsObject.searchString;
				break;
		}
	
		// Next index for load more link.
		if( postsObject.hasOwnProperty( 'next' ) ) {
			state.next = postsObject.next;
		}
	
		// If the postsObject has "add" then it contains posts.
		if (postsObject.hasOwnProperty( 'add' )) {
			state.add = postsObject.add

			// Save postArray.
			// Array to store each DOM element as a string.
			stringArray = []
	
			// Convert each post element to string.
			jQuery.each( postsObject.postArray, function() {
				stringArray.push( jQuery( this ).prop( 'outerHTML' ) );
			});
	
			state.postArray = JSON.stringify( stringArray );
		}

		// Append state to history.
		if( update === undefined ) {
			window.history.pushState( state, state.heading );
		} else {
			window.history.replaceState( state, state.heading );
		}
	}

	/***************************************************************
		Load state from history.
	***************************************************************/
	this.loadPostsObjectFromHistory = function () {
		console.log( 'Loading state from history...' );
		
		var state = window.history.state;
		
		// Create new posts object.	
		var postsObject = {
			'heading': state.heading
		};
	
		// Add posts metadata
		switch ( state.filter ) {
			case 'recent':
				postsObject.filter = 'recent';
				break;
			case 'category':
				postsObject.filter = 'category';
				postsObject.category = state.category;
				break;
			case 'archive':
				postsObject.filter = 'archive';
				postsObject.month = state.month;
				postsObject.year = state.year;
				break;
			case 'search':
				sessionStorage.filter = 'search';
				sessionStorage.searchString = state.searchString;
				break;
			case 'no_posts':
				postsObject.filter = 'no_posts';
				break;
		}
	
		// If the state has "add" then it contains posts.
		if (state.hasOwnProperty( 'add' )) {
			postsObject.postArray = [];
			postsObject.unloadedThumbs = [];
			postsObject.add = state.add;
		
			// Add next page index if neccessary.
			if( state.hasOwnProperty( 'next' ) ) {
				postsObject.next = state.next;
			}
	
			// Restore DOM
			stringArray = JSON.parse( state.postArray );
	
			// Convert string array to DOM element array.
			jQuery.each( stringArray, function( index, value ) {
				postsObject.postArray.push( jQuery( value ) );
			});
		}

		return postsObject;
	}

	/***************************************************************
		Update state in history.
	***************************************************************/
	this.updatePostsObjectInHistory = function ( newPostsObject ) {
		console.log( 'Updating state in history...' );
		console.log(newPostsObject);
		var oldPostsObject = this.loadPostsObjectFromHistory();
		
		// Update posts.
		jQuery.each( newPostsObject.postArray, function( index, post ) {
			oldPostsObject.postArray.push( jQuery( post ) );
		});
		
		if ( newPostsObject.hasOwnProperty( 'next' ) ) {
			oldPostsObject.next = newPostsObject.next;
		} else if ( oldPostsObject.hasOwnProperty( 'next' ) ) {
			delete oldPostsObject['next' ];
		}
		
		this.savePostsObjectToHistory( oldPostsObject, update = true );
	}
	
	/************************************************************************
	
		SessionStorage State
		
	************************************************************************/
	
    /*****************************************************************
            Load AJAX request from sessionStorage.
    *****************************************************************/
    this.loadRequestFilterFromSessionStorage = function () {
        console.log('Loading request filter from sessionStorage');
        var requestObject = {};

        switch ( sessionStorage.getItem( 'filter' ) ) {
            case 'audio':
                requestObject.audio = 'yes';
                break;
            case 'category': 
                requestObject.category = sessionStorage.getItem( 'category' )
                break;
            case 'archive': 
                requestObject.date = {
                    'month': sessionStorage.getItem( 'month' ),
                    'year': sessionStorage.getItem( 'year' ),
                    'text': sessionStorage.getItem( 'text' )
                }
                break;
            case 'search': 
                requestObject.search = sessionStorage.getItem( 'searchString' )
                break;
            default:
                requestObject.recent = 'yes';
        }

        sessionStorage.clear();
        console.log(requestObject);
        return requestObject;
    }
	
    /****************************************************************
            Save an AJAX request to sessionStorage.
    ****************************************************************/
    this.saveRequestFilterToSessionStorage = function ( filter ) {
        console.log('Saving request filter to sessionStorage');

        sessionStorage.clear();

        sessionStorage.setItem( 'filter', filter.filter );
        switch ( filter.filter ) {
            case 'archive':
                sessionStorage.setItem( 'text', filter.text );
                sessionStorage.setItem( 'month', filter.month );
                sessionStorage.setItem( 'year', filter.year );
                break;
            case 'search':
                sessionStorage.setItem( 'searchString', filter.searchString )
                break;
            case 'category':
                sessionStorage.setItem( 'category', filter.category )
                break;
        }
    }
	
	console.log('State Manager initialised...');
}
