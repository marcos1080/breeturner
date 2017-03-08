jQuery(document).ready(function(){

	var catDistFromEnd = 2;
	var yearDistFromEnd = 3;
	var monthDistFromEnd = 2;
	var themeURL = jQuery( 'body' ).data( 'uri' );

	// Get category posts.
	jQuery( '.cat-item a' ).click(function(event) {
		event.preventDefault();
		
		// Close menu.
		closeSidebar( jQuery( '#sidebar > div ') );
		
		var category = jQuery( this ).attr( 'href' ).split( '/' );
		category = category[ category.length - catDistFromEnd ];
		var request = {
			'category': category,
			'paged': '1'
		};
		
		// Reset session storage.
		sessionStorage.clear();
		sessionStorage.setItem('filter', 'category');
		sessionStorage.setItem('category', category);
		
		get_posts( request );
	});
	
	// Get archive posts.
	jQuery( '.archives a' ).click(function(event) {
		event.preventDefault();
		
		// Close menu.
		closeSidebar( jQuery( '#sidebar > div ') );
		
		var date = jQuery( this ).attr( 'href' ).split( '/' );
		var month = date[ date.length - monthDistFromEnd ];
		var year = date[ date.length - yearDistFromEnd ];
//		
//		var request = {
//			'date': {
//				'month': month,
//				'year': year,
//				'text': jQuery( this ).text()
//			},
//			'paged': '1'
//		};
		
		// Reset session storage.
		sessionStorage.clear();
		sessionStorage.setItem('filter', 'archive');
		sessionStorage.setItem('month', month);
		sessionStorage.setItem('year', year);
		sessionStorage.setItem('text', jQuery( this ).text());
		
//		get_posts( request );
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
				'search': searchString,
				'paged': '1'
			};
	
			sessionStorage.clear();
			sessionStorage.setItem('filter', 'search');
			sessionStorage.setItem('searchString', searchString);
	
			get_posts( request );
		}
	}
	
	jQuery( '#recent' ).click(function(event) {	
		event.preventDefault();

		var request = {
			'recent': 'yes',
			'paged': '1'
		};

		sessionStorage.clear();
		sessionStorage.setItem('filter', 'recent');

		get_posts( request );
	});
	
//	jQuery( '#mobile-words' ).click(function(event) {	
//		event.preventDefault();

//		var request = {
//			'recent': 'yes',
//			'paged': '1'
//		};

//		sessionStorage.clear();
//		sessionStorage.setItem('filter', 'recent');

//		get_posts( request );
//	});
});

function get_posts( request ) {
	jQuery.post(
		location.protocol + '//' + location.host + '/index.php',
		{
			'ajax': request
		},
		function( data ) {
			// This try catch clause tests for a returned JSON string.
			var IS_JSON = true;
			try
			{
			   var json = jQuery.parseJSON( data );
			}
			catch(err)
			{
			   IS_JSON = false;
			}
			
			// If there is a JSON string detected there has been an error.
			if( IS_JSON == true ) {
				displayPosts( json )
			} else {
				alert( "bad data received!" );
			}
			
			return true;
		}
	);
}

function loadMoreHandler () {
	jQuery( '#load-more a' ).click(function(event) {
		event.preventDefault();
		
		var page = jQuery( this ).data( 'next' );
		
		// Get the next page of the appropriate filter.
		switch ( sessionStorage.getItem('filter') ) {
			case 'category': 
				var request = {
					'category': category,
					'paged': page
				};
				break;
			case 'archive': 
				var request = {
					'date': {
						'month': sessionStorage.getItem('month'),
						'year': sessionStorage.getItem('year'),
						'text': sessionStorage.getItem('text')
					},
					'paged': page
				};
				break;
			case 'search': 
				var request = {
					'search': sessionStorage.getItem('searchString'),
					'paged': page
				};
				break;
			default:
				// No filter, recent post page.
				var request = {
					'recent': 'yes',
					'paged': page
				};
		}
		
		get_posts( request );
	});
}
