<?php
require __DIR__ . '/backend/vendor/autoload.php';

require_once __DIR__ . '/backend/rest/services/NewsletterService.php';
require_once __DIR__ . '/backend/rest/services/EventImagesService.php';
require_once __DIR__ . '/backend/rest/services/ReservationsService.php';
require_once __DIR__ . '/backend/rest/services/EventsService.php';
require_once __DIR__ . '/backend/rest/services/UsersService.php';

Flight::register('eventImagesService', 'EventImagesService');
Flight::register('newsletterService', 'NewsletterService');
Flight::register('reservationsService', 'ReservationsService');
Flight::register('eventsService', 'EventsService');
Flight::register('usersService', 'UsersService');

require_once __DIR__ . '/backend/rest/routes/NewsletterRoutes.php';
require_once __DIR__ . '/backend/rest/routes/EventImagesRoutes.php';
require_once __DIR__ . '/backend/rest/routes/ReservationsRoutes.php';
require_once __DIR__ . '/backend/rest/routes/UsersRoutes.php';
require_once __DIR__ . '/backend/rest/routes/EventsRoutes.php';
Flight::start();
?>
