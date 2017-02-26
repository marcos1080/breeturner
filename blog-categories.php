<?php $categories = get_categories(); ?>
	
	<ul id="categories">
	<?php foreach ( $categories as $category ) : ?>
		<li>
			<a href="<?php echo $target_link.'?category='.$category->cat_ID; ?>"><?php echo $category->name; ?></a>
		</li>
	<?php endforeach; ?>
	</ul>
