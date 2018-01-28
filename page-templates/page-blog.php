<?php
/**
 * Template Name: Blog Page
 *
 * Words page, used to display all the blog posts.
 *
 * @package WordPress
 */
 
function showPageInfo() {
	/* This is the normal page information. Displayed all the time on the
		javascript enabled page or when the $_GET['category'] variable
		is not set.
	*/
	if (have_posts()) : while (have_posts()) : the_post(); ?>
	 	
	   <!--<h1><?php the_title(); ?></h1>-->
	   <p><?php the_content(__('(more...)')); ?></p>
	<?php endwhile; else: ?>
	   <p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif;
	}
?>

<?php get_header(); ?>
   <div id="main" class="blog">
      <div id="content">
      <?php       	
      	global $wp;
        $target_url = home_url( add_query_arg( array(), $wp->request ) );
      	
      	// Three cases, javascript on desktop, javascript on mobile and non javascript.
		   if ( $_SESSION['javascript'] === true && !wp_is_mobile() ) {
		   	showPageInfo();
		   	get_template_part( 'blog', 'topbar-js' );
		   	get_template_part( 'blog', 'posts-js' );
		   } else if ( $_SESSION['javascript'] === true && wp_is_mobile() ) {
		   	get_template_part( 'blog', 'posts-js' );
		   } else {
		   	showPageInfo();
		   	get_template_part( 'blog', 'topbar-nojs' );
		   	get_template_part( 'blog', 'posts-nojs' );
		   }
	   ?>
      </div>
   </div>
<?php get_footer(); ?>
