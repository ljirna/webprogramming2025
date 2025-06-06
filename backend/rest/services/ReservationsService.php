<?php
require_once __DIR__ . '/../dao/ReservationsDao.class.php';

class ReservationsService
{
    private $reservationsDao;

    public function __construct()
    {
        $this->reservationsDao = new ReservationsDao();
    }

    /*Add a new reservation*/
    public function add_reservation($reservation)
    {
        return $this->reservationsDao->add_reservation($reservation);
    }

    /*Getting reservations for one event*/
    public function get_reservations_for_event($event_id)
    {
        return $this->reservationsDao->get_reservations_for_event($event_id);
    }

    public function get_all_reservations()
    {
        return $this->reservationsDao->get_all_reservations();
    }

    public function delete_reservation($reservation_id)
    {
        return $this->reservationsDao->delete_reservation($reservation_id);
    }
    public function get_reservations_for_user($user_id)
    {
        return $this->reservationsDao->get_reservations_for_user($user_id);
    }
    public function delete_reservation_user($reservation_id)
    {
        return $this->reservationsDao->delete_reservation_user($reservation_id);
    }
}
