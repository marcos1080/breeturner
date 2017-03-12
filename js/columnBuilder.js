/* Class to construct the column and column wrapper DOM elements.
	
	Contains the pixel break points to calculate how many columns to construct
	given the current window size.
	
	Only has one public function "buildColumns". This function calls private
	functions and classes to construct a columnWrapper element ready to receive
	posts.
*/

function columnBuilder() {

	/* Holds the current number of columns. Used for comparison on resize and to
		build column wrappers.
	*/ 
	this.numOfColumns;
	
	// Column number window size break points.
	var one_column_max_width = 530;
	var two_column_max_width = 780;
	var three_column_max_width = 1200;

	// Main public function.
	this.buildColumns = function () {
		
		// Set number of columns, based on window width.
		this.numOfColumns = this.getNumOfColumns();
		
		var columnwrapper;
		
		// Make required number of columns.
		switch( this.numOfColumns ) {
			case 1:
				console.log('1 Column');
				columnWrapper = new ColumnWrapper( 'one-column', this.numOfColumns );
				break;
			case 2:
				console.log('2 Column');
				columnWrapper = new ColumnWrapper( 'two-columns', this.numOfColumns );
				break;
			case 3:
				console.log('3 Column');
				columnWrapper = new ColumnWrapper( 'three-columns', this.numOfColumns );
				break;
			case 4:
				console.log('4 Column');
				columnWrapper = new ColumnWrapper( 'four-columns', this.numOfColumns );
				break;
		}
		
		return columnWrapper;
	}

	// Uses the current window width and break points to determine the number
	// of columns to create.
	this.getNumOfColumns = function () {
		var currentWidth = jQuery( window ).width();
		if( currentWidth < one_column_max_width ) {
			return 1;
		} else if( currentWidth < two_column_max_width ) {
			return 2;
		} else if( currentWidth < three_column_max_width ) {
			return 3;
		} else {
			return 4;
		}
	}
	
	// Class for a post column to hold posts.
	function Column( name ) {
		// Constructor
		this.column = jQuery( '<ul class="' + name + ' posts column"></ul>' );

		// Add post to the column.
		this.addPost = function( post ) {
			post.appendTo( this.column );
		}
	
		// Get the current height of the column based on the height of posts
		// contained.
		this.getHeight = function() {
			return this.column.height();
		}
	
		// Return DOM element to calling function.
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
}
