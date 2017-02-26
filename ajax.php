<?php
	// Check if request is for data
	if( isset( $_POST['ajax'] ) ) {
	
	   // AJAX request. Process request and return page data.
		$data = $_POST['ajax'];
		
		function return_posts( $args, $heading = null ) {
			$query = new WP_Query( $args );
			$num_of_pages = $query->max_num_pages;
			$postdata = [];
		
			if( $heading != null ) {
				if( $heading == 'Recent' ) {
					$postdata['heading'] = 'Recent Posts';
				} else {
					$postdata['heading'] = "Search Results for \"" . ucfirst( $heading  ) . "\"";
				}
			}
		
			if( $query->have_posts() ) {
				$count = 0;
				
				while ( $query->have_posts() ) {
					$query->the_post();
					$postdata['data'][$count]['href'] = get_permalink();
					if( has_post_thumbnail() ) {
						$postdata['data'][$count]['thumb'] = get_the_post_thumbnail();
					}
					$postdata['data'][$count]['title'] = get_the_title();
					$postdata['data'][$count]['date']['day'] = get_the_date( "j", "", "", false );
					$postdata['data'][$count]['date']['month'] = get_the_date( "M", "", "", false );
					$postdata['data'][$count]['excerpt'] = get_the_excerpt();
					
					$count++;
				}

				if( $args['paged'] == '1' ) {
					$postdata['add'] = false;
				} else {
					$postdata['add'] = true;
				}
			
				if(  $args['paged'] < $num_of_pages ) {
					$postdata['next'] = $args['paged'] + 1;
				}
			
				echo json_encode( $postdata );
			} else {
				echo json_encode( array( 'no_post' => $heading ) );
			}
		
			unset( $requested_posts );
		}
		
		if( isset( $data['category'] ) ) {
			
			$catID = get_cat_ID( $data['category'] );
			
			$args = array( 
				'cat' => $catID,
				'paged' => $data['paged']
			);
			
			return_posts( $args, ucfirst( $data['category'] ) );
		}
		
		if( isset( $data['recent'] ) ) {
			$args = array( 
				'post_type' => 'post',
				'paged' => $data['paged']
			);
			
			return_posts( $args, 'Recent' );
		}
		
		if( isset( $data['date'] ) ) {
			$year = $data['date']['year'];
			$month = $data['date']['month'];
			$text = $data['date']['text'];
			
			$args = array( 
				'date_query' => array(
					array(
						'year' => $year,
						'month' => $month,
					),
				),
				'paged' => $data['paged']
			);
			
			return_posts( $args, $text );
		}
		
		if( isset( $data['search'] ) ) {
			$args = array(
				'post_type' => 'post',
				's' => $data['search'],
				'paged' => $data['paged']
			);
			
			return_posts( $args, $data['search'] );
		}
	}
?>
