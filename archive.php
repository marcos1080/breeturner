<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each one. For example, tag.php (Tag archives),
 * category.php (Category archives), author.php (Author archives), etc.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Bree Turner
 * @since Bree Turner 1.0
 */
 
 get_header(); ?>
   <div id="main">
      <div id="content" class="archive">    
      <?php
      	/* Get the information from the words page to keep formatting of the 
      		page the same as the other blog pages.
      	*/
      	$page = get_page_by_path( 'WORDS' );
      	echo '<h1>'.$page->post_title.'</h1>';
      	$lines = explode( "\n", $page->post_content );
      	foreach ( $lines as $line ) {
      		echo '<p>'.$line.'</p>';
      	}
      ?>
      <!-- Top bar, show if javascript enabled. -->
      <?php      	
		   if ( $_SESSION['javascript'] === true ) {
		   	get_template_part( 'blog', 'topbar-js' );
		   } else {
		   	get_template_part( 'blog', 'topbar-nojs' );
		   }
		?>
			<div id="post-wrapper">
				<h1><?php echo str_replace('Month: ', '', get_the_archive_title()); ?></h1>
		<?php
			
			// Navigation.
			top_post_nav( get_previous_posts_link( 'Previous' ), get_next_posts_link( 'Next' ));
			
			// Column wrapper, 4 columns max.
			$wrapper = new Post_Wrapper( 4 );
			
		   while ( have_posts() ) : the_post();
				$wrapper->add_post( get_post()->ID );
			endwhile;

			// Insert wrapper into page.
			$wrapper->print();
			
			// Navigation.
			bottom_post_nav( get_previous_posts_link( 'Previous' ), get_next_posts_link( 'Next' ));
	   ?>
	   	</div>
      </div>
   </div>
<?php get_footer(); ?>
