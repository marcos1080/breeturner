<?php
	/* Creates a post html element. Used by column building class to insert 
		formatted post element.
	*/
?>
<li>
	<a href="<?php echo get_permalink(); ?>">
	<?php if( has_post_thumbnail() ) {
		echo get_the_post_thumbnail();
	} ?>
		<div class="date-wrapper">
			<div class="date">
				<p class="day"><?php echo get_the_date( "j", "", "", false ); ?></p>
				<p class="month"><?php echo get_the_date( "M", "", "", false ); ?></p>
			</div>
		</div>
		<h3><?php echo get_the_title(); ?></h3>
		<p class="excerpt"><?php echo get_the_excerpt(); ?></p>
	</a>
</li>
