<?php
require __DIR__ . '/backend/vendor/autoload.php';

require_once __DIR__ . '/backend/data/roles.php';
require_once __DIR__ . '/backend/rest/services/NewsletterService.php';
require_once __DIR__ . '/backend/rest/services/EventImagesService.php';
require_once __DIR__ . '/backend/rest/services/ReservationsService.php';
require_once __DIR__ . '/backend/rest/services/EventsService.php';
require_once __DIR__ . '/backend/rest/services/UsersService.php';
require_once __DIR__ . '/backend/rest/services/AuthService.php';
require_once __DIR__ . '/backend/middleware/AuthMiddleware.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


Flight::register('restaurantService', 'RestaurantService');
Flight::register('auth_service', "AuthService");
Flight::register('auth_middleware', "AuthMiddleware");


// This wildcard route intercepts all requests and applies authentication checks before proceeding.
Flight::route('/*', function () {
    if (
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
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


Flight::register('eventImagesService', 'EventImagesService');
Flight::register('newsletterService', 'NewsletterService');
Flight::register('reservationsService', 'ReservationsService');
Flight::register('eventsService', 'EventsService');
Flight::register('usersService', 'UsersService');
Flight::register('auth_service', 'AuthService');


require_once __DIR__ . '/backend/rest/routes/NewsletterRoutes.php';
require_once __DIR__ . '/backend/rest/routes/EventImagesRoutes.php';
require_once __DIR__ . '/backend/rest/routes/ReservationsRoutes.php';
require_once __DIR__ . '/backend/rest/routes/UsersRoutes.php';
require_once __DIR__ . '/backend/rest/routes/EventsRoutes.php';
require_once __DIR__ . '/backend/rest/routes/AuthRoutes.php';

Flight::start();
