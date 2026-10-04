<?php
/**
 * Plugin Name: Nitroship example API
 * Description: Public request-time JSON endpoint, always loaded as a must-use plugin.
 */
add_action( 'rest_api_init', function () {
	register_rest_route( 'nitroship/v1', '/hello', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			return new WP_REST_Response( array(
				'message'     => 'Nitroship WordPress API',
				'requestTime' => gmdate( 'c' ),
			), 200, array( 'Cache-Control' => 'no-store' ) );
		},
	) );
} );
