<?php

require_once __DIR__ . '/BaseDao.class.php';

class EventsDao extends BaseDao {

    public function __construct() {
        parent::__construct("events");
    }

    /*Function for reading all events on both the events page and admin page*/
    public function get_all_events() {
        $query = "SELECT * FROM events";
        return $this->query($query, []);
    }

    /*Function for reading only first 6 events on the home page*/
    public function get_six_events() {
        $query = "SELECT * FROM events LIMIT 6";
        return $this->query($query, []);
    }

    /*Function for reading only one event*/
    public function get_event_by_id($event_id){
        return $this->query("SELECT * FROM events WHERE event_id = :event_id", ["event_id" => $event_id]);
      }

    /*Function for adding a new event*/
    public function add_event($event) {
        return $this->add($event);
    }

    /*Function for editing an event*/
    public function update_event($event_id, $event) {
        return $this->update($event, $event_id, "event_id");
    }

    public function delete_event($event_id) {
        return $this->query("DELETE FROM events WHERE id = :id", ["id" => $event_id]);
    }
}