<?php
/** Minimal classic theme, selected automatically during initial installation. */
nocache_headers();
$request_time = gmdate( 'c' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Nitroship WordPress</title>
	<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_uri() ); ?>">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<main>
	<h1>Nitroship WordPress</h1>
	<p id="server-marker">Nitroship WordPress server-rendered page</p>
	<p>Request time (UTC): <time datetime="<?php echo esc_attr( $request_time ); ?>"><?php echo esc_html( $request_time ); ?></time></p>
	<p>This page is rendered by PHP on every request. Committed theme assets are served by Nitroship's CDN after deployment.</p>
	<ul>
		<li><a href="<?php echo esc_url( home_url( '/?rest_route=/nitroship/v1/hello' ) ); ?>">Public JSON API</a></li>
		<li><a href="<?php echo esc_url( get_stylesheet_directory_uri() . '/marker.txt' ); ?>">Static marker asset</a></li>
		<li><a href="<?php echo esc_url( admin_url() ); ?>">WordPress dashboard</a></li>
	</ul>
</main>
<?php wp_footer(); ?>
</body>
</html>
