<?php
require_once __DIR__ . '/ReservationsDao.class.php';
require_once __DIR__ . '/UsersDao.class.php';
require_once __DIR__ . '/EventsDao.class.php';

$reservationsDao = new ReservationsDao();

    $reservations_id = $reservationsDao->add_reservation([
        'user_id' => 1,
        'event_id' => 1,
        'ticket_type' => 'standard'
    ]);
    echo "Review inserted with ID: $reservation_id\n";
