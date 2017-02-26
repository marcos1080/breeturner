<?php
/**
 * The template for displaying comments
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments">

	<?php if ( have_comments() ) : ?>
	<h2 class="comments-title">
		<a id="comment-toggle" href="#">COMMENTS</a>
	</h2>
	<div class="menu-line"></div>

	<?php $comments = get_comments( array('post_id' => $post->ID, 'status' => 'approve') ); ?>
	<div class="<?php echo ( $_SESSION['javascript'] == true ? 'comments-area' : 'comments-area nojs' ); ?>">
		<ol class="comment-list">
			<?php
				wp_list_comments( array(
					'callback' => 'custom_comments',
					'style'       => 'ol',
					'short_ping'  => true
				) );
			?>
		</ol><!-- .comment-list -->
		<?php //Show comment form in the comments area for the javascript enabled site.
			( $_SESSION['javascript'] == true ? comment_form() : null ); ?>
	</div><!--comments-area -->
	<?php endif; // have_comments() ?>
	
	<?php if ( $_SESSION['javascript'] == true ) {
			if ( !have_comments() ) {
				comment_form();
			}
		} else {
			comment_form();
		}?>

</div><!-- .comments-area -->
