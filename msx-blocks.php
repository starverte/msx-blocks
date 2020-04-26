<?php
/**
 * Plugin Name:     Matchstix Blocks
 * Plugin URI:      https://github.com/starverte/msx-blocks
 * Description:     A plugin that is part of the WordPress development framework, Matchstix. This plugin creates Blocks for Bootstrap 4 components including alerts, buttons, cards, and more.
 * Author:          Star Verte LLC
 * Author URI:      https://starverte.com
 * Text Domain:     msx-blocks
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         msx_blocks
 */

function msx_blocks_block_categories( $categories, $post ) {
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'msx_blocks',
	    'title' => __( 'Matchstix', 'msx-blocks' ),
      ),
    )
  );
}
add_filter( 'block_categories', 'msx_blocks_block_categories', 10, 2 );

function msx_blocks_init() {
  include_once( plugin_dir_path( __FILE__ ) . 'blocks/alert.php');
}

function msx_blocks_enqueue_block_editor_assets() {
   wp_enqueue_script(
      'msx-alert',
      plugins_url( 'blocks/alert/index.js', __FILE__ ),
      array( 'wp-blocks', 'wp-element' )
   );

   wp_enqueue_style(
      'msx-alert-editor',
      plugins_url( 'blocks/alert/editor.css', __FILE__ ),
      array()
   );
}
add_action( 'enqueue_block_editor_assets', 'msx_blocks_enqueue_block_editor_assets' );

function msx_blocks_enqueue_scripts() {
   wp_enqueue_style(
      'msx-alert',
      plugins_url( 'blocks/alert/style.css', __FILE__ ),
      array()
   );
}
add_action( 'wp_enqueue_scripts', 'msx_blocks_enqueue_scripts' );

