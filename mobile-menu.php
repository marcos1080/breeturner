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
		<li id="mobile-cv">
			<a href="<?php echo get_permalink( get_page_by_path( 'cv' )->ID ); ?>"><h2>CV</h2></a>
		</li>
                <li id="mobile-contact">
			<a href="<?php echo get_permalink( get_page_by_path( 'contact' )->ID ); ?>"><h2>Contact</h2></a>
		</li>
		<li id="mobile-words">
			<a href="<?php echo get_permalink( get_page_by_path( 'words' )->ID ); ?>"><h2>Words</h2></a>
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
		</li>
                <li id="mobile-audio">
			<a class="audio-link" href="<?php echo get_permalink( get_page_by_path( 'words' )->ID ); ?>">AUDIO</a>
		</li>
                    <?php /*
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
