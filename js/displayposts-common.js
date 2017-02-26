// Array to hold DOM post elements.
var postArray = [];

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

// Class for a post column to hold posts.
function Column( name ) {
	// Constructor
	this.column = jQuery( '<ul class="' + name + ' posts column"></ul>' );

	this.addPost = function( post ) {
		post.appendTo( this.column );
	}
	
	this.getHeight = function() {
		return this.column.height();
	}
	
	this.getColumn = function() {
		return this.column;
	}
}

/* Class for a column container. Holds columns and posts and adds posts
	intelligently to columns based on the column height.
*/
function ColumnWrapper( name, number ) {

	this.wrapper = jQuery( '<div id="' + name + '" class="column-wrapper"></div' );
	this.columns = [];
	
	// Add columns
	for( var count = 1; count <= number; count++ ) {
		name = '';
		switch( count ) {
			case 1:
				name = 'column-one';
				break;
			case 2:
				name = 'column-two';
				break;
			case 3:
				name = 'column-three';
				break;
			case 4:
				name = 'column-four';
				break;
		}
		
		var column = new Column( name );
		column.getColumn().appendTo( this.wrapper );
		this.columns.push( column );
	}
	
	// Return DOM element
	this.getWrapper = function() {
		return this.wrapper;
	}
	
	// Add post to smallest column.
	this.addPost = function( post ) {
		var smallest = this.columns[0];
		
		for( var count = 1; count < this.columns.length; count++ ) {
			if( this.columns[count].getHeight() < smallest.getHeight() ) {
				smallest = this.columns[count];
			}
		}
		
		smallest.addPost( post );
	}
}

/* Holds the current number of columns. Used for comparison on resize and to
	build column wrappers.
*/ 
var curr_num_of_columns;

function get_num_of_columns() {
	curr_width = jQuery( window ).width();
	if( curr_width < one_column_max_width ) {
		return 1;
	} else if( curr_width < two_column_max_width ) {
		return 2;
	} else if( curr_width < three_column_max_width ) {
		return 3;
	} else {
		return 4;
	}
	
	return 0;
}

// Fade posts from postArray in one after the other. Recursive function.
function fadePostsIn( array, index ) {
	
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

// Functions to save post array to sessionStorage as a json array.
function saveArrayToSessionStorage( array, label ) {
	// Array to store each DOM element as a string.
	stringArray = []
	
	// Convert each post element to string.
	jQuery.each( array, function() {
		stringArray.push( jQuery( this ).prop( 'outerHTML' ) );
	});
	
	// Save.
	sessionStorage.setItem( label, JSON.stringify( stringArray ) );
}

// Load post array.
function loadArrayFromSessionArray( label ) {
	// Check if the element is set.
	if( sessionStorage.getItem( label ) === null ) {
		return null;
	}
	
	stringArray = JSON.parse( sessionStorage.getItem( label ) );
	elementArray = [];
	
	// Convert string array to DOM element array.
	jQuery.each( stringArray, function( index, value ) {
		elementArray.push( jQuery( value ) );
	});
	
	return elementArray;
}
