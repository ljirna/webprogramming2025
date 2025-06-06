<?php
require_once __DIR__ . "/BaseDao.class.php";
require_once __DIR__ . "/UsersDao.class.php";
require_once __DIR__ . "/EventsDao.class.php";

class ReservationsDao extends BaseDao
{
    private $usersDao;
    private $eventsDao;

    public function __construct()
    {
        parent::__construct("reservations");
        $this->usersDao = new UsersDao();
        $this->eventsDao = new EventsDao();
    }

    public function add_reservation($reservation)
    {
        $stmt = $this->connection->prepare("INSERT INTO reservations (user_id, event_id, ticket_type) VALUES (:user_id, :event_id, :ticket_type)");
        $stmt->bindParam(':user_id', $reservation['user_id']);
        $stmt->bindParam(':event_id', $reservation['event_id']);
        $stmt->bindParam(':ticket_type', $reservation['ticket_type']);
        $stmt->execute();
    }

    /*Added for deleting an event*/
    public function get_reservations_for_event($event_id)
    {
        return $this->query(
            "SELECT * FROM reservations 
         WHERE event_id = :event_id",
            ['event_id' => $event_id]
        );
    }

    public function get_all_reservations()
    {
        return $this->query("SELECT r.*, u.email AS user_email, e.title AS event_title
                        FROM reservations r
                        LEFT JOIN users u ON r.user_id = u.user_id
                        LEFT JOIN events e ON r.event_id = e.event_id", []);
    }

    public function delete_reservation($reservation_id)
    {
        $stmt = $this->connection->prepare(
            "DELETE FROM reservations WHERE reservation_id = :reservation_id"
        );
        return $stmt->execute(['reservation_id' => $reservation_id]);
    }

    public function get_reservations_for_user($user_id)
    {
        return $this->query(
            "SELECT r.*, e.title AS event_title, e.date AS event_date, e.time AS event_time
         FROM reservations r
         LEFT JOIN events e ON r.event_id = e.event_id
         WHERE r.user_id = :user_id",
            ['user_id' => $user_id]
        );
    }
    public function delete_reservation_user($reservation_id)
    {
        $stmt = $this->connection->prepare(
            "DELETE FROM reservations WHERE reservation_id = :reservation_id"
        );
        return $stmt->execute(['reservation_id' => $reservation_id]);
    }
}
