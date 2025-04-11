<?php
require_once __DIR__ . '/../dao/ReservationsDao.class.php';

class ReservationsService {
    private $reservationsDao;

    public function __construct() {
        $this->reservationsDao = new ReservationsDao();
    }

    /* Add a new reservation */
    public function add_reservation($reservation) {
        return $this->reservationsDao->add_reservation($reservation);
    }
}
?>
