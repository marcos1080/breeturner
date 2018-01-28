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
	      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	      <!--<h1><?php //the_title(); ?></h1>-->
	      <p><?php the_content(__('(more...)')); ?></p>
	      <?php endwhile; else: ?>
	      <p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif; ?>
	      
	      <!-- Top bar, show if javascript enabled. -->
	      <?php
			   if ($_SESSION['javascript'] === false ) {
			   	get_template_part( 'blog-topbarjs' );
			   }
		   ?>
      </div>
   </div>
<?php get_footer(); ?>
