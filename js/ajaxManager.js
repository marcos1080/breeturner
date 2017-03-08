function ajaxManager() {
	this.getPosts = function ( request ) {
		var ajaxResponse = null;
		
		jQuery.ajax(
			location.protocol + '//' + location.host + '/index.php',
			{
				method: 'POST',
				data: {
					'ajax': request
				},
				async: false
			}).success(function( data ) {
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
					ajaxResponse = json;
				} else {
					alert( "bad data received!" );
				}
			}
		);
		
		return ajaxResponse;
	}
	
	console.log('Ajax Manager initialised...');
}
