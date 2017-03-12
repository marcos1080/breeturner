<div  id="mobile-menu">
	<div id="mobile-banner">
		<div id="mobile-toggle">
			<img src="<?php echo get_template_directory_uri(); ?>/images/icons/hamburger_icon.png" alt="Menu Icon"></img>
		</div>
		<!-- Title. -->
		<h1><?php echo get_bloginfo( 'name' ); ?></h1>
	</div>
	<ul id="mobile-menu-wrapper">
		<li id="mobile-home" data-url="<?php echo get_home_url(); ?>">
			<a href="<?php echo get_home_url(); ?>"><h2>Home</h2></a>
		</li>
		<li id="mobile-words">
			<a href="<?php echo get_home_url().'/CV/'; ?>"><h2>CV</h2></a>
		</li>
		<li id="mobile-words">
			<a href="<?php echo get_home_url().'/words/'; ?>"><h2>Words</h2></a>
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
					    type="text"
					    autocomplete="off"></input>
				<!-- Doubled up images here for a css hover effect. -->
			   <input class="searchsubmit" id="searchsubmit" 
					    type="image" 
					    src="<?php echo get_template_directory_uri(); ?>/images/icons/search_grey.png"></input>
		   </form>
		</li>
		<li id="mobile-recent">
			<a href="" id="recent">RECENT</a>
		</li><?php /*
		<li id="mobile-categories">
			<a href="">CATEGORIES</a>
			<ul>
				<?php echo wp_list_categories( array( 'title_li'	=> ''	)); ?>
			</ul>
		</li>*/ ?>
		<li id="mobile-archives">
			<a href="">ARCHIVES</a>
			<ul class="archives">
				<?php echo wp_get_archives('type=monthly');; ?>
			</ul>
		</li>
	</ul>
</div>
