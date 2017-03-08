var eventHandlers = null;
var state = null;
var postManagerObject = null;
var ajax = null;
var displayManagerObject = null;

jQuery(document).ready(function() {	
	// Remove splash screen.
	jQuery('#splash-text').stop().hide();
	jQuery('#splash-screen').animate({'opacity': '0'}, 300, function() {
		jQuery('#splash-screen').remove();
	});
	
	// These two classes need to be instatiated on all pages to allow for
	// proper menu navigation to work on mobile devices.
	eventHandlers = new eventHandlerManager();
	state = new stateManager();

	// If the current page is the blog posts page then check to see if there is
	// saved state.
	if( jQuery( '#post-wrapper' ).length ) {
		postManagerObject = new postManager();
		ajax = new ajaxManager();
		displayManagerObject = new displayManager( ajax, postManagerObject );
																																																																																																																	
		var postsObject = {};
		
		if( state.historyHasState() == true ) {
			// There is state saved in the history object.
			postsObject = state.loadPostsObjectFromHistory();
		} else {
			// First time the page has been navigated to, new request.
			var ajaxRequest = {};
			
			// If there is data in the sessionStorage variable this is request
			// filters.
			if ( state.sessionStorageHasState() == true ) {
				ajaxRequest = state.loadRequestFilterFromSessionStorage();
			} else {
				ajaxRequest.recent = 'yes';
			}
			// Gets first page of posts.
			ajaxRequest.paged = '1';
			displayManagerObject.showLoadingIndicator();
			var ajaxResponseObject = ajax.getPosts( ajaxRequest );
			postsObject = postManagerObject.buildPostsObject( ajaxResponseObject );
		}
		
		// Display the posts.
		displayManagerObject.displayPosts( postsObject );
		
		// Save the state.
		state.savePostsObjectToHistory( postsObject );
	}
	
	// Set event handlers.
	eventHandlers.menuHandlers();
});
