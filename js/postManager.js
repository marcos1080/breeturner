function postManager() {
	
	// Build a posts object from an ajax response JSON object.
	this.buildPostsObject = function ( ajaxResponseObject ) {
		// Check if any posts were returned.
		if( ajaxResponseObject.hasOwnProperty( 'no_post' ) ) {
			return null;
		}
		
		console.log('Building post object...');

		// Initialise new posts object.
		var newPostsObject = {
			'heading': ajaxResponseObject.heading,
			'postArray': [],
			'unloadedThumbs': [],
			'add': ajaxResponseObject.add,
			'filter': ajaxResponseObject.filter
		};
			
		// Set filter info.
		switch ( newPostsObject.filter ) {
			case 'category':
				newPostsObject.category = ajaxResponseObject.category;
				break;
			case 'archive':
				newPostsObject.month = ajaxResponseObject.month;
				newPostsObject.year = ajaxResponseObject.year;
				break;
			case 'search':
				newPostsObject.searchString = ajaxResponseObject.searchString;
				break;
		}
		
		// Set next variable if neccessary.
		if( ajaxResponseObject.hasOwnProperty ( 'next' ) ) {
			newPostsObject.next = ajaxResponseObject.next;
		}
		
		// Create post DOM elements from the post ajax json object.
		jQuery.each(ajaxResponseObject.data, function( index, post ) {
			var newPost = formatPost( post, newPostsObject.unloadedThumbs )
			newPostsObject.postArray.push( newPost );
		});
		
		return newPostsObject;
	}
	
	/*************************************************************************
	
		Private functons
	
	*************************************************************************/
	
	// Take a post returned by AJAX in JSON format and convert into a DOM element.
	function formatPost( post, thumbArray ) {

		var postObject = jQuery( '<li class="post fade-speed"></li>' );
	
		// Thumbnail.
		var link = jQuery( '<a href="' + post.href + '"></a>' );
		if( post.hasOwnProperty( 'thumb' ) ) {
			jQuery( post.thumb ).appendTo( link );
			thumbArray.push( post.thumb );
		}
	
		// Date
		var dateWrapper = jQuery( '<div class="date-wrapper"></div>' );
		var date = jQuery( '<div class="date"></div>' );
		jQuery( '<p class="day">' + post.date.day + '</p>' ).appendTo( date );
		jQuery( '<p class="month">' + post.date.month.toUpperCase() + '</p>' ).appendTo( date );
		date.appendTo( dateWrapper );
		dateWrapper.appendTo( link );
	
		// Title.
		jQuery( '<h3 class="fade-speed">' + post.title + '</h3>' ).appendTo( link );
	
		// Excerpt
		jQuery( '<p class="excerpt">' + post.excerpt + '</p>' ).appendTo( link );

		link.appendTo( postObject );

		return postObject;
	}
	
	console.log('Post Manager initialised...');
}
