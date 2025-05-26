<?php

require_once __DIR__ . '/BaseDao.class.php';

class EventsDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("events");
    }

    /*Function for reading all events on both the events page and admin page*/
    public function get_all_events()
    {
        $query = "SELECT * FROM events";
        return $this->query($query, []);
    }

    /*Function for reading only first 6 events on the home page*/
    public function get_six_events()
    {
        $query = "SELECT * FROM events LIMIT 6";
        return $this->query($query, []);
    }

    /*Function for reading only one event*/
    public function get_event_by_id($event_id)
    {
        return $this->query_unique("SELECT * FROM events WHERE event_id = :event_id", ["event_id" => $event_id]);
    }

    /*Function for adding a new event*/

    public function add_event($event)
    {
        $query = "INSERT INTO events (title, description, date, time, location, image) 
              VALUES (:title, :description, :date, :time, :location, :image)";

        $params = [
            'title' => $event['title'],
            'description' => $event['description'],
            'date' => $event['date'],
            'time' => $event['time'],
            'location' => $event['location'],
            'image' => $event['image']
        ];

        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
    }

    /*Function for editing an event*/
    public function update_event($event_id, $event)
    {
        return $this->update($event, $event_id, "event_id");
    }

    public function delete_event($event_id)
    {
        $stmt = $this->connection->prepare("DELETE FROM events WHERE event_id = :event_id");
        $stmt->execute(['event_id' => $event_id]);
        $rowCount = $stmt->rowCount();

        return [
            'success' => $rowCount > 0,
            'rows_affected' => $rowCount,
            'event_id' => $event_id
        ];
    }
}
