<?php
require_once __DIR__ . '/EventsDao.class.php';

// Create an instance of your EventsDao class
$eventsDao = new EventsDao();

// Test event ID (you can change this to test different events)
$event_id = 1; 

// Call the function to get the event
$event = $eventsDao->get_event_by_id($event_id);

echo "<pre>";
print_r($event);
echo "</pre>";
?>