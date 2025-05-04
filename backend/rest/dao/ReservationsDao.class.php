<?php
require_once __DIR__ . "/BaseDao.class.php";
require_once __DIR__ . "/UsersDao.class.php";
require_once __DIR__ . "/EventsDao.class.php";

class ReservationsDao extends BaseDao {
    private $usersDao;
    private $eventsDao;

    public function __construct() {
        parent::__construct("reservations");
        $this->usersDao = new UsersDao();
        $this->eventsDao = new EventsDao();
    }

    public function add_reservation($reservation){
        $stmt = $this->connection->prepare("INSERT INTO reservations (user_id, event_id, ticket_type) VALUES (:user_id, :event_id, :ticket_type)");
        $stmt->bindParam(':user_id', $reservation['user_id']);
        $stmt->bindParam(':event_id', $reservation['event_id']);
        $stmt->bindParam(':ticket_type', $reservation['ticket_type']);
        $stmt->execute();
    }

    /*Added for deleting an event*/
    public function get_reservations_for_event($event_id){
    return $this->query(
        "SELECT * FROM reservations 
         WHERE event_id = :event_id",
        ['event_id' => $event_id]
        );
    }
}