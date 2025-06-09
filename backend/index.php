<?php
require __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/data/roles.php';
require_once __DIR__ . '/rest/services/NewsletterService.php';
require_once __DIR__ . '/rest/services/EventImagesService.php';
require_once __DIR__ . '/rest/services/ReservationsService.php';
require_once __DIR__ . '/rest/services/EventsService.php';
require_once __DIR__ . '/rest/services/UsersService.php';
require_once __DIR__ . '/rest/services/AuthService.php';
require_once __DIR__ . '/middleware/AuthMiddleware.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// This wildcard route intercepts all requests and applies authentication checks before proceeding.
Flight::route('/*', function () {
    if (
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0 ||
        preg_match('#^/users/username/[^/]+$#', Flight::request()->url)
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if (Flight::auth_middleware()->verifyToken($token))
                return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});

Flight::register('auth_middleware', "AuthMiddleware");
Flight::register('eventImagesService', 'EventImagesService');
Flight::register('newsletterService', 'NewsletterService');
Flight::register('reservationsService', 'ReservationsService');
Flight::register('eventsService', 'EventsService');
Flight::register('usersService', 'UsersService');
Flight::register('auth_service', 'AuthService');


require_once __DIR__ . '/rest/routes/NewsletterRoutes.php';
require_once __DIR__ . '/rest/routes/EventImagesRoutes.php';
require_once __DIR__ . '/rest/routes/ReservationsRoutes.php';
require_once __DIR__ . '/rest/routes/UsersRoutes.php';
require_once __DIR__ . '/rest/routes/EventsRoutes.php';
require_once __DIR__ . '/rest/routes/AuthRoutes.php';

Flight::start();
