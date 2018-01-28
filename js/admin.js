jQuery( document ).ready( function( $ ) {
    // Choose audio file from media uploader on audio post.
    $( '#audio_meta_box .button' ).click( function( event ) {
        event.preventDefault();
        
        // Set up request
        var mediaUploader = wp.media({
            title: 'Add Audio',
            button: {
                text: 'Add Audio'
            },
             library: {
                type: 'audio'
            },
            multiple: false
        });
        
        // Action once file has beenselected
        mediaUploader.on( 'select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            
            // Set values.
            $( '#audio_meta_box #file-id' ).attr( 'value', attachment.id );
            $( '#audio_meta_box #file-name' ).attr( 'value', attachment.name );
            $( '#audio_meta_box #file-name-visible' ).text( attachment.name ).removeClass( 'hidden' );
            $( '#audio_meta_box .button' ).attr( 'value', 'Change' );
        });
    
        mediaUploader.open();
    });
    
    // Toggle disabled property for options on audio file selection meta box.
    $( '#audio_meta_box .span-1 input' ).click( function() {
        var parent = $( this ).closest( '.option' );
        
        if( parent.attr( 'id' ) == 'url' ) {
            parent.siblings( '#file' ).find( '.span-2 input' ).prop( 'disabled', true );
            parent.siblings( '#file' ).find( '#file-name-visible' ).addClass( 'disabled' );
            parent.find( '.span-2 input' ).prop( 'disabled', false );
        } else {
            // Parent id is file.
            parent.find( '.span-2 input' ).prop( 'disabled', false );
            parent.siblings( '#url' ).find( '.span-2 input' ).prop( 'disabled', true );
            parent.find( '#file-name-visible' ).removeClass( 'disabled' );
        }
    });
    
    // Toggle active opacity of selected layout on audio post layout meta box.
    $( '#audio_layout_meta_box input' ).on( 'change', function() {
        // Ge the image associated with this layout.
        var newLayoutImg = $( this ).parent().find( 'img' );

        $( '#audio_layout_meta_box img' ).each( function() {
            if( $( this ).hasClass( 'faded' ) ) {
                // Check if this image is the current one. if so activate image.
                if( $( this ).is( newLayoutImg ) ) {
                    $( this ).removeClass( 'faded' )
                }
            } else {
                // fade out last selected layout image.
                $( this ).addClass( 'faded' );
            }
        });
    });
});