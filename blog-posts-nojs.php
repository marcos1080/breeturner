<div id="post-wrapper">
	<?php	
		/* Important to set this for pagination to work! */	
		$paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
		
		if ( empty( $_GET ) && empty( $_POST ) ) {
			$the_query = new WP_Query( array( 'post_type' => 'post',
													'paged' => $paged ) );
		} /*else if ( isset( $_GET['category'] ) ) {
			$the_query = new WP_Query( array( 'post_type' => 'post',
													'cat' => $_GET['category'],
													'paged' => $paged ) );
			echo  '<h1>'.get_cat_name( $_GET['category'] ).'</h1>';
		} */ else if ( isset( $_POST['search'] ) ) {
			$the_query = new WP_Query( array( 'post_type' => 'post',
													's' => $_POST['search'],
													'paged' => $paged ) );
			echo '<h1>Search results for: '.$_POST['search'].'</h1>';
		}
		
		if ( !isset( $_GET['categories'] ) && !isset( $_GET['archives'] ) ) {
			$wrapper = new Post_Wrapper( 4 );
			
			top_post_nav( get_previous_posts_link( 'Previous' ), get_next_posts_link( 'Next', $the_query->max_num_pages ));
			
			while ( $the_query->have_posts() ) : $the_query->the_post();
				$wrapper->add_post( get_post()->ID );
			endwhile;

			$wrapper->print();
			
			bottom_post_nav( get_previous_posts_link( 'Previous' ), get_next_posts_link( 'Next', $the_query->max_num_pages ));
		}
	?>
</div>
