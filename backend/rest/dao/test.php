<?php
require_once __DIR__ . '/EventsDao.class.php';

$eventsDao = new EventsDao();

// ID of the event to delete (replace with a valid ID from your database)
$event_id = 100;

// First verify the event exists
$event = $eventsDao->get_event_by_id($event_id);

if (empty($event)) {
    die("<p>Event with ID $event_id not found - cannot test deletion</p>");
}

echo "<h2>Testing delete_event()</h2>";
echo "<h3>Event Before Deletion:</h3>";
echo "<pre>";
print_r($event);
echo "</pre>";

// Delete the event
$result = $eventsDao->delete_event($event_id);

echo "<h3>Deletion Result:</h3>";
echo "<pre>";
print_r($result);
echo "</pre>";

if ($result) {
    echo "<p>Event deleted successfully!</p>";
    
    // Verify deletion by trying to fetch the event again
    $deletedEvent = $eventsDao->get_event_by_id($event_id);
    if (empty($deletedEvent)) {
        echo "<p>Verification: Event no longer exists in database</p>";
    } else {
        echo "<p>Warning: Event still exists after deletion attempt!</p>";
    }
} else {
    echo "<p>Failed to delete event</p>";
}
?>