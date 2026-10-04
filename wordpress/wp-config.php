<?php
/** WordPress configuration: all credentials come from stable runtime env values. */
function nitroship_required_env( $name ) {
	$value = getenv( $name );
	if ( false === $value || '' === $value ) {
		throw new RuntimeException( 'Missing required environment variable: ' . $name );
	}
	return $value;
}

foreach ( array( 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD' ) as $name ) {
	define( $name, nitroship_required_env( $name ) );
}
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );
$table_prefix = 'wp_';

foreach ( array( 'AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT' ) as $name ) {
	define( $name, nitroship_required_env( $name ) );
}

define( 'WP_HOME', rtrim( nitroship_required_env( 'WP_HOME' ), '/' ) );
define( 'WP_SITEURL', WP_HOME );
// Nitroship's trusted HTTPS proxy terminates TLS before the PHP container.
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === strtolower( trim( explode( ',', $_SERVER['HTTP_X_FORWARDED_PROTO'] )[0] ) ) ) {
	$_SERVER['HTTPS'] = 'on';
}
define( 'FORCE_SSL_ADMIN', 'https' === parse_url( WP_HOME, PHP_URL_SCHEME ) );
define( 'WP_DEFAULT_THEME', 'nitroship' );
define( 'WP_ENVIRONMENT_TYPE', 'production' );
define( 'WP_DEBUG', false );
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_AUTO_UPDATE_CORE', false );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
