<?php
/**
 * Template Name: Blog Page
 *
 * @package WordPress
 */
?>

 <?php get_header(); ?>
   <div id="main">
      <div id="content" class="blog">
      <?php 
      	/* This is the normal page information. Displayed all the time on the
      		javascript enabled page or when the $_GET['category'] variable
      		is not set.
      	*/
      	if (have_posts()) : while (have_posts()) : the_post(); ?>
	      <h1><?php the_title(); ?></h1>
	      <p><?php the_content(__('(more...)')); ?></p>
		<?php endwhile; else: ?>
	      <p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif; ?>
	      
      <!-- Top bar, show if javascript enabled. -->
      <?php
      	$target_link = 'http://'.$_SERVER['SERVER_NAME']."/words/";
      	
		   if ( $_SESSION['javascript'] === true ) {
		   	get_template_part( 'blog', 'topbar-js' );
		   	get_template_part( 'blog', 'posts-js' );
		   } else {
		   	get_template_part( 'blog', 'topbar-nojs' );
		   	get_template_part( 'blog', 'posts-nojs' );
		   }
	   ?>
      </div>
   </div>
<?php get_footer(); ?>
