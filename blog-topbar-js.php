<?php
$target_url = get_the_permalink();
?>
<div class="top-bar">
   <li>
      <a href="<?php echo $target_url; ?>" id="recent">ALL</a>
   </li>
   <li>
      <a href="<?php echo $target_url; ?>" class="audio-link">AUDIO</a>
   </li>
   <?php /*<li>
      <a href="" class="menu-slide-open" data-menu="categories">CATEGORIES</a>
   </li>*/ ?>
   <li>
      <a href="" class="menu-slide-open" data-menu="archives">ARCHIVES</a>
   </li>
   <li>
      <form id="searchform" 
                    role="search"  
                    method="post" 
                    action="http://<?php echo $target_url; ?>">
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
