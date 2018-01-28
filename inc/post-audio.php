<?php
/**
 * Custom post type for audio posts.
 */
if( ! function_exists( 'breeturner_audio_post_type' ) ) {
    function breeturner_audio_post_type() {

        $labels = array(
            'name'                  => _x( 'Audio Post', 'Post Type General Name', 'text_domain' ),
            'singular_name'         => _x( 'Audio Post', 'Post Type Singular Name', 'text_domain' ),
            'menu_name'             => __( 'Audio Posts', 'text_domain' ),
            'name_admin_bar'        => __( 'Audio Post', 'text_domain' ),
            'archives'              => __( 'Audio Post Archives', 'text_domain' ),
            'attributes'            => __( 'Audio Post Attributes', 'text_domain' ),
            'parent_item_colon'     => __( 'Parent Audio Post:', 'text_domain' ),
            'all_items'             => __( 'All Audio Posts', 'text_domain' ),
            'add_new_item'          => __( 'Add New Audio Post', 'text_domain' ),
            'add_new'               => __( 'Add New', 'text_domain' ),
            'new_item'              => __( 'New Audio Post', 'text_domain' ),
            'edit_item'             => __( 'Edit Audio Post', 'text_domain' ),
            'update_item'           => __( 'Update Audio Post', 'text_domain' ),
            'view_item'             => __( 'View Audio Post', 'text_domain' ),
            'view_items'            => __( 'View Audio Posts', 'text_domain' ),
            'search_items'          => __( 'Search Audio Post', 'text_domain' ),
            'not_found'             => __( 'Not found', 'text_domain' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
            'featured_image'        => __( 'Featured Image', 'text_domain' ),
            'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
            'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
            'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
            'insert_into_item'      => __( 'Insert into audio post', 'text_domain' ),
            'uploaded_to_this_item' => __( 'Uploaded to this audio post', 'text_domain' ),
            'items_list'            => __( 'Audio post list', 'text_domain' ),
            'items_list_navigation' => __( 'Audio post list navigation', 'text_domain' ),
            'filter_items_list'     => __( 'Filter audio post list', 'text_domain' ),
        );
        $args = array(
            'label'                 => __( 'Audio Post', 'text_domain' ),
            'description'           => __( 'A post where the content is centered around an audio item', 'text_domain' ),
            'labels'                => $labels,
            'supports'              => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields', ),
            'taxonomies'            => array( 'category', 'post_tag' ),
            'hierarchical'          => true,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-format-audio',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,		
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
        );
        register_post_type( 'audio', $args );
    }
    add_action( 'init', 'breeturner_audio_post_type', 0 );
}

/**
 * Add audio file meta box.
 */
if( ! function_exists( 'breeturner_register_audio_meta_box' ) ) {
    function breeturner_register_audio_meta_box() {
        add_meta_box( 
            'audio_meta_box',
            __( 'Audio File', 'textdomain' ),
            'breeturner_display_audio_meta_box',
            'audio' 
        );
    }
    add_action( 'add_meta_boxes', 'breeturner_register_audio_meta_box' );
}

if( !function_exists( 'breeturner_display_audio_meta_box' ) ) {
    function breeturner_display_audio_meta_box( $post ) {
        wp_nonce_field( basename( __FILE__ ), 'breeturner_audio_nonce' );
        
        // Get post data if set.
        $action = get_post_meta( $post->ID, 'action', true );
        if( empty( $action ) ) {
            $action = 'url';
        }
        $value = get_post_meta( $post->ID, 'value', true );
        
        // Only set if action is file
        $filename = get_post_meta( $post->ID, 'filename', true ); 
        
        ?>
            <p class="howto">Choose the audio source</p>
            <div id="url" class="option">
                <div class="span-1">
                    <input type="radio"
                           name="breeturner-audio-source"
                           value="url" <?php echo $action == 'url' ? 'checked' : ''; ?>>Url: 
                </div>
                <div class="span-2">
                    <input class="text" 
                           type="text" 
                           name="breeturner-audio-url" 
                           value="<?php echo $action == 'url' ? $value : ''; ?>"
                           <?php echo $action == 'file' ? 'disabled' : ''; ?>>
                </div>
            </div>
            <div id="file" class="option">
                <div class="span-1">
                    <input type="radio" 
                           name="breeturner-audio-source" 
                           value="file" 
                           <?php echo $action == 'file' ? 'checked' : ''; ?>>File: 
                </div>
                <div class="span-2">
                    <input id="file-id" 
                           type="text" 
                           name="breeturner-audio-file-id" 
                           value="<?php echo $action == 'file' ? $value : ''; ?>"
                           hidden>
                    <input id="file-name" 
                           type="text" 
                           name="breeturner-audio-file-name" 
                           value="<?php echo $action == 'file' ? $filename : ''; ?>"
                           hidden>
                    <p id="file-name-visible"
                       class="<?php echo $action == 'url' ? 'disabled' : ''; ?><?php echo empty( $filename ) ? ' hidden' : ''; ?>"><?php echo $action == 'file' ? $filename : ''; ?></p>
                    <input class="button" type="button" value="Select" <?php echo $action == 'url' ? 'disabled' : ''; ?>>
                </div>
            </div>
        <?php
    }
}

/**
 * Add post layout meta box.
 */
if( ! function_exists( 'breeturner_register_audio_layout_meta_box' ) ) {
    function breeturner_register_audio_layout_meta_box() {
        add_meta_box( 
            'audio_layout_meta_box',
            __( 'Post Layout', 'textdomain' ),
            'breeturner_display_audio_layout_meta_box',
            'audio' 
        );
    }
    add_action( 'add_meta_boxes', 'breeturner_register_audio_layout_meta_box' );
}

if( !function_exists( 'breeturner_display_audio_layout_meta_box' ) ) {
    function breeturner_display_audio_layout_meta_box( $post ) {
        // Get post data if set.
        $layout = get_post_meta( $post->ID, 'layout', true );
        if( empty( $layout ) ) {
            $layout = 'none';
        }
        
        ?>
        <p class="howto">Choose the layout for the post</p>
        <div id="audio-layout">
            <div id="no-image-layout">
                <input id="no-image-layout-input"
                       type="radio" 
                       name="breeturner-audio-layout" 
                       value="none" 
                       <?php echo $layout == 'none' ? 'checked' : ''; ?>>No Image: <br/>
                <label for="no-image-layout-input">
                    <img class="<?php echo $layout != 'none' ? 'faded' : ''; ?>"
                         src="<?php echo get_template_directory_uri(); ?>/images/audio_layout_no_image.svg" 
                         alt="Layout post example for a post without a featured image.">
                </label>
            </div>
            <div id="center-layout">
                <input id="center-layout-input"
                       type="radio" 
                       name="breeturner-audio-layout" 
                       value="center" 
                       <?php echo $layout == 'center' ? 'checked' : ''; ?>>Centered Image: <br/>
                <label for="center-layout-input">
                    <img class="<?php echo $layout != 'center' ? 'faded' : ''; ?>"
                         src="<?php echo get_template_directory_uri(); ?>/images/audio_layout_center.svg" 
                         alt="Layout post example for a post with a centered featured image.">
                </label>
            </div>
            <div id="left-layout">
                <input id="left-layout-input"
                       type="radio" 
                       name="breeturner-audio-layout" 
                       value="left" 
                       <?php echo $layout == 'left' ? 'checked' : ''; ?>>Left Image: <br/>
                <label for="left-layout-input">
                    <img class="<?php echo $layout != 'left' ? 'faded' : ''; ?>"
                         src="<?php echo get_template_directory_uri(); ?>/images/audio_layout_left.svg" 
                         alt="Layout post example for a post with a left aligned featured image.">
                </label>
            </div>
            <div id="right-layout">
                <input id="right-layout-input" 
                       type="radio" 
                       name="breeturner-audio-layout" 
                       value="right"
                       <?php echo $layout == 'right' ? 'checked' : ''; ?>>Right Image: <br/>
                <label for="right-layout-input">
                    <img class="<?php echo $layout != 'right' ? 'faded' : ''; ?>"
                         src="<?php echo get_template_directory_uri(); ?>/images/audio_layout_right.svg" 
                         alt="Layout post example for a post with a right aligned featured image.">
                </label>
            </div>
        </div>
        <?php
    }
}

/**
 * Save post.
 */
if( ! function_exists( 'breeturner_save_audio_post' ) ) {
    // Display validation errors.
    function breeturner_audio_post_errors() {
        echo '<div class="error below-h2"><p>Car Type must be set, Model saved as a draft.</p></div>';
    }

    function breeturner_save_audio_post( $post_id ) {
        // Check nonce.
        if( ! isset( $_POST['breeturner_audio_nonce'] ) || ! wp_verify_nonce( $_POST['breeturner_audio_nonce'], basename( __FILE__ ) ) ){
            return;
        }  

        // Skip if autosaving.
        if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ){
            return;
        }

        // Can user save?
        if( ! current_user_can( 'edit_post', $post_id ) ){
            return;
        }

        if( ! isset( $_POST['breeturner-audio-source'] ) ) {
            return;
        }

        // Save audio file data.
        $action = sanitize_text_field( $_POST['breeturner-audio-source'] );
       
        if( $action == 'url' ) {
            if( ! wp_http_validate_url( sanitize_text_field( $_POST['breeturner-audio-url'] ) ) ) {
                add_settings_error(
                    'invalid-url',
                    'invalid-url',
                    'The url entered for the audio file is invalid! please check the url and try again.',
                    'error'
                );

                set_transient( 'settings_errors', get_settings_errors(), 30 );
                return;
            } else {
                update_post_meta( $post_id, 'value', sanitize_text_field( $_POST['breeturner-audio-url'] ) );
                delete_post_meta( $post_id, 'filename' );
            }
        } else {
            if( sanitize_text_field( $_POST['breeturner-audio-file-id'] ) === '' ) {
                add_settings_error(
                    'no-file-set',
                    'no-file-set',
                    'There was no file loaded for the audio. Please try again.',
                    'error'
                );

                set_transient( 'settings_errors', get_settings_errors(), 30 );
                return;
            }
            
            update_post_meta( $post_id, 'value', sanitize_text_field( $_POST['breeturner-audio-file-id'] ) );
            update_post_meta( $post_id, 'filename', sanitize_text_field( $_POST['breeturner-audio-file-name'] ) );
        }
        
        update_post_meta( $post_id, 'action', $action );
        
        // Save layout
        $layout = sanitize_text_field( $_POST['breeturner-audio-layout'] );
        update_post_meta( $post_id, 'layout', $layout );
    }
    add_action( 'save_post_audio', 'breeturner_save_audio_post', 10, 3 );
}

function breeturner_audio_errors() {
    //Check for errors
    if ( ! ( $errors = get_transient( 'settings_errors' ) ) ) {
        return;
    }
    
    // Print errors
    $message = '<div id="acme-message" class="error below-h2"><p><ul>';
    foreach ( $errors as $error ) {
        $message .= '<li>' . $error['message'] . '</li>';
    }
    $message .= '</ul></p></div><!-- #error -->';
    
    echo $message;
    
    // Reset
    delete_transient( 'settings_errors' );
    remove_action( 'edit_form_top', 'breeturner_audio_errors' );
}
add_action( 'edit_form_top', 'breeturner_audio_errors' );

?>