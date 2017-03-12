/* Class that is responsible for communicating with the ajax functionality in
	the index.php page to retreive post information.
	
	I've turned on syncronous ajax here so the function can wait until the posts
	have been delivered before continuing with the rest of the post display
	steps.
*/

function ajaxManager() {
	this.getPosts = function ( request ) {
		var ajaxResponse = null;
		
		console.log('Requesting posts...');
		jQuery.ajax(
			// Get the url of the index.php page.
			location.protocol + '//' + location.host + '/index.php',
			{
				method: 'POST',
				data: {
					'ajax': request
				},
				async: false // Turn off asyncronous ajax.
			}).success(function( data ) {
				// This try catch clause tests for a returned JSON string.
				var IS_JSON = true;
				try
				{
					// Attemp to parse response as JSON string.
					var json = jQuery.parseJSON( data );
				}
				catch(err)
				{
					IS_JSON = false;
				}
			
				// If there is a JSON string detected there has been an error.
				if( IS_JSON == true ) {
					ajaxResponse = json;
				}
			}
		);
		
		return ajaxResponse;
	}
	
	console.log('Ajax Manager initialised...');
}
