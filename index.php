<?php
require 'vendor/autoload.php'; // Autoload dependencies via Composer

// Register the NewsletterService
require_once __DIR__ . '/backend/rest/services/NewsletterService.php';
Flight::register('newsletterService', 'NewsletterService');

// Include the routes file for Newsletter
require_once __DIR__ . '/backend/rest/routes/NewsletterRoutes.php';

// Start FlightPHP
Flight::start();
?>
