<?php
require_once __DIR__ . '/../dao/EventsDao.class.php';
require_once __DIR__ . '/../dao/ReservationsDao.class.php';
require_once 'BaseService.php';

class EventsService extends BaseService
{
    private $eventsDao;
    private $reservationsDao;

    public function __construct()
    {
        $this->eventsDao = new EventsDao();
        $this->reservationsDao = new ReservationsDao();
        parent::__construct($this->eventsDao);
    }

    /*Get all events*/
    public function get_all_events()
    {
        return $this->eventsDao->get_all_events();
    }

    /*Get only the first 6 events (for homepage)*/
    public function get_six_events()
    {
        return $this->eventsDao->get_six_events();
    }

    /*Get a single event by ID*/
    public function get_event_by_id($event_id)
    {
        return $this->eventsDao->get_event_by_id($event_id);
    }

    public function add_event($event)
    {
        /*Ensure the event has a name and date*/
        if (empty($event['title']) || empty($event['date'])) {
            throw new Exception("Event name and date are required.");
        }
        /*Ensure the description is less than 50 words*/
        if (strlen($event['description']) > 150) {
            throw new Exception("Event description is too long. Max 50 characters allowed.");
        }
        /*Ensure that the event date is in the future and in the right format*/
        $date = DateTime::createFromFormat('Y-m-d', $event['date']);
        $errors = DateTime::getLastErrors();
    
        if (!$date || $errors['warning_count'] > 0 || $errors['error_count'] > 0) {
            throw new Exception("Date is invalid. Use format YYYY-MM-DD with a valid date.");
        }
    
        // Check if the date is in the past
        $today = new DateTime(date("Y-m-d"));
        if ($date < $today) {
            throw new Exception("Event date cannot be in the past.");
        }
        return $this->eventsDao->add_event($event);
    }

    /*Update an existing event*/
    public function update_event($event_id, $event)
    {
        /*Ensure the event has a valid ID*/
        if ($event_id <= 0) {
            throw new Exception("Invalid event ID.");
        }

        if (empty($event['title']) || empty($event['date'])) {
            throw new Exception("Event name and date are required.");
        }

        return $this->eventsDao->update_event($event_id, $event);
    }

    /*Delete an event - cascade deletion*/
    public function delete_event($event_id)
    {
        try {
            /*Check if there are any reservations for the event*/
            $reservations = $this->reservationsDao->get_reservations_for_event($event_id);
            if (count($reservations) > 0) {
                throw new Exception("Cannot delete event. There are existing reservations for this event.");
            }

            /*If there are no reservations, proceed with deleting the event*/
            $this->eventsDao->delete_event($event_id);
            return "Event deleted successfully!";
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
