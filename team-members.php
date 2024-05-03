<?php
/**
 * Plugin Name:       Team Members
 * Description:       Yet another team members block for Gutenberg.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            André Ranulfo
 * Author URI:		  https://github.com/Zagaz/team-members-block
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-members
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function team_members_team_members_block_init() {
	register_block_type( __DIR__ . '/build/team-members' );
	register_block_type( __DIR__ . '/build/team-member' );
}
add_action( 'init', 'team_members_team_members_block_init' );
