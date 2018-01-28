<?php
/**
 * The template for displaying the content for a standard post format.
 *
 * @package WordPress
 * @subpackage Bree_Turner
 * @since 2016
 */
?>
        
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h1><?php the_title() ?></h1>
                    <?php
                        if (has_post_thumbnail() ) {
                            the_post_thumbnail();
                        }
                    ?>
                    <?php the_content(); ?>
		</article>