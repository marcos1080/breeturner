/* Activate the event handlers for mobile devices.

	This file is only provided if a mobile device is detected through wordpress.
*/

jQuery(document).ready(function(){
	var wait = true;
	
	// While loop waits till the event handler manager class is initiated.
	while( wait ) {
		if( eventHandlers != null ) {
			wait = false;
		}
	}
	
	// Load handlers.
	eventHandlers.mobileMenuHandlers();
});
