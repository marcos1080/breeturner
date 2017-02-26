<?php $target_link = 'http://139.59.247.69/words/'; ?>

<!-- Top bar for non javascript page. -->
<div class="top-bar">
   <li>
      <a href="<?php echo $target_link.'?'; ?>"<?php if ( empty( $_GET ) ) { echo ' class="current"'; } ?>>RECENT</a>
   </li>
   <?php /*<li>
      <a href="<?php echo $target_link.'?categories' ; ?>"<?php if ( isset( $_GET['categories'] ) ) { echo ' class="current"'; } ?>>CATEGORIES</a>
   </li>*/ ?>
   <li>
      <a href="<?php echo $target_link.'?archives' ; ?>"<?php if ( isset( $_GET['archives'] ) ) { echo ' class="current"'; } ?>>ARCHIVES</a>
   </li>
   <li>
      <form id="searchform" 
		      role="search"  
		      method="post" 
		      action="<?php echo $target_link; ?>">
	      <input id="searchinput" 
			       value="" 
			       name="search" 
			       placeholder="SEARCH..." 
			       type="text"></input>
			<!-- Doubled up images here for a css hover effect. -->
	      <input class="searchsubmit" id="searchsubmit" 
			       type="image" 
			       src="<?php echo get_template_directory_uri(); ?>/images/icons/search_grey.png"></input>
	      <input class="searchsubmit fade-speed" id="search_hover"
					 type="image" 
					 src="<?php echo get_template_directory_uri(); ?>/images/icons/search_black.png"></input>
      </form>
   </li>
</div>

<?php
	// Display the categories if rquested.
	if ( isset( $_GET['categories'] ) ) {
		get_template_part( 'blog', 'categories' );
	}
	
	// Display the archives if requested.
	if ( isset( $_GET['archives'] ) ) {
		get_template_part( 'blog', 'archives' );
	}
?>
