<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Bree_Turner
 * @since 2016
 */

get_header(); ?>

	<main id="main" class="post-main<?php echo ( !comments_open() ? ' post-main-nojs' : '' ); ?>">

	<?php
	// Start the loop.
	while ( have_posts() ) : the_post();

		if (has_post_thumbnail() ) {
			the_post_thumbnail();
		}
	?>
		<div id="content">
			<h1><?php the_title() ?></h1>
	<?php
		the_content();
	?>
		</div>
		
	<?php
		get_template_part( 'content', get_post_format() );
		
		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
	// End the loop.
	endwhile;
	?>

	</main><!-- .site-main -->

<?php get_footer(); ?>
