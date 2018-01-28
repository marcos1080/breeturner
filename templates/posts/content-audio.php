<?php
/**
 * The template for displaying the content for a audio post format.
 *
 * @package WordPress
 * @subpackage Bree_Turner
 * @since 2016
 */

$audio_url = '';
if( get_post_meta( get_the_ID(), 'action', true ) == 'url' ) {
    $audio_url = get_post_meta( get_the_ID(), 'value', true );
} else if( get_post_meta( get_the_ID(), 'action', true ) == 'file' ) {
    $audio_url = wp_get_attachment_url( get_post_meta( get_the_ID(), 'value', true ) );
}

$layout = get_post_meta( get_the_ID(), 'layout', true );

?>
        
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h1><?php the_title() ?></h1>
                    
                    <?php 
                        // Set layout.
                        if( $layout == 'none' || ! has_post_thumbnail() ) {
                            // No image
                            the_content();
                        } else {
                            switch( $layout ) {
                                case 'center':
                                    // Centered image at the top.
                                    ?>
                                        <img class="aligncenter fullwidth"
                                             src="<?php echo get_the_post_thumbnail_url(); ?>"
                                             alt="Featured image for <?php the_title(); ?>">
                                    <?php
                                    the_content();
                                    break;
                                case 'left':
                                    // Image gets a float left.
                                    ?>
                                        <img class="alignleft halfwidth" 
                                             style="margin-top: 0px; margin-bottom: 40px;"
                                             src="<?php echo get_the_post_thumbnail_url(); ?>"
                                             alt="Featured image for <?php the_title(); ?>">
                                    <?php
                                    the_content();
                                    break;
                                case 'right':
                                    // Image gets a float right.
                                    ?>
                                        <img class="alignright halfwidth"
                                             style="margin-top: 0px; margin-bottom: 40px;"
                                             src="<?php echo get_the_post_thumbnail_url(); ?>"
                                             alt="Featured image for <?php the_title(); ?>">
                                    <?php
                                    the_content();
                                    break;
                            }
                        }   
                    ?>
                    
                    <div id="audio-player">
                        <?php echo do_shortcode( "[audio src='$audio_url']" ); ?>
                    </div>
		</article>
