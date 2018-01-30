<?php	
	// Start session for non javascript site options.
	session_start();
	//session_destroy();
	
	// URL to use as the base.
	$home_url = '139.59.247.69';
	
	/* Check for javascript presence. Only triggered if the splash screen is not
		removed and the link is clicked to navigate to the non-js site
	*/
   if( isset( $_GET['javascript'] ) ) {
   	if ($_GET['javascript'] == 'none' ) {
   		$_SESSION['javascript'] = false;
   	}
   }
   
   // Check for mobile device.
   if( wp_is_mobile() ) {
   	$mobile = true;
   } else {
   	$mobile = false;
   }
?>

<!DOCTYPE html>
<html class="background-outer-color">
	<head>
		<title>Breanan Turner</title>
		<meta charset="UTF-8"></meta>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1"></meta>
		<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/style.css">
                <script src='https://www.google.com/recaptcha/api.js'></script>
		<?php if( $mobile == false ) : ?>
			<!-- Desktop specific style rules -->
			<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/desktop.css">
		<?php else: ?>
			<!-- Mobile specific style rules -->
			<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/mobile.css">
		<?php if( $_SESSION['javascript'] === false ) : ?>
			<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/mobile-nojs.css">
		<?php endif;
			endif; 
		
		// Load wordpress header stuff.
		wp_head(); ?>
		
	</head>
	<body data-uri="<?php echo get_template_directory_uri() ?>">
		<?php
			// Splash screen. removed automatically if javascript is enabled.
			if ( !isset( $_SESSION['javascript'] ) ) {
				get_template_part( 'splash' );
				
				/* Set javascript session variable here. If javascript is not enabled
					then the only way to proceed is to navigate to the non javascript
					site where the get variable will be picked up and the javascript
					variable will be set to false. Otherwise the script on the client
					will remove the splash screen and the variable will stay true.
				*/
				$_SESSION['javascript'] = true;
			}
		?>
		
		<?php if ( $_SESSION['javascript'] == true && $mobile == false ) : ?> 
		<!-- Sub menu sidebar -->
		<div id="sidebar">
			<?php /*<div class="blog-sub-menu categories">
				<h2>Categories</h2>
				<ul>
					<?php echo wp_list_categories( array( 'title_li'	=> ''	)); ?>
				</ul>
			</div>*/ ?>
			<div class="blog-sub-menu archives">
				<h2>Archives</h2>
				<ul>
					<?php echo wp_get_archives(); ?>
				</ul>
			</div>
		</div>
		<?php endif; ?>
		
		<div id="wrapper" class="background-inner-color">
			<div id="header">
				<?php 
					// Load Mobile navigation.
					if( $_SESSION['javascript'] == true && $mobile == true ) {
						get_template_part( 'mobile', 'menu' ); 
					} else {
						 echo "<h1>".get_bloginfo( 'name' )."</h1>";
					}
				?>
				
				<!-- Title.
				<h1><?php echo get_bloginfo( 'name' ); ?></h1>
				-->
				<?php 
					// Load appropriate menu.
					if ( $_SESSION['javascript'] == false ) {
						// Javascript disabled.
						wp_nav_menu( array(
							 'menu'           => 'No-JS', // Do not fall back to first non-empty menu.
							 'fallback_cb'    => false // Do not fall back to wp_page_menu()
						) );
					} else {
						// Javascript enabled.
						// If not a mobile device then hide normal menu.
						if( $mobile == false ) {
							wp_nav_menu();
						}
					}
					
					// Disable menu-line. Only if javascript enabled, mobile version.
					if( !( $_SESSION['javascript'] == true && $mobile == true ) ) : 
				?>
				<div class="menu-line"></div>
				<?php endif; ?>
			</div>
