<?php

require_once __DIR__ . '/BaseDao.class.php';

class EventImagesDao extends BaseDao {
    public function __construct() {
        parent::__construct("event_images");
    }

    /*Get all images for a specific event*/
    public function get_images_by_event($event_id) {
        return $this->query(
            "SELECT image_id, image_url 
             FROM event_images 
             WHERE event_id = :event_id", 
            ['event_id' => $event_id]
        );
    }

    /*Get a specific image by its ID*/
    public function get_image_by_id($image_id) {
        return $this->query_unique(
            "SELECT image_id, image_url, event_id 
             FROM event_images 
             WHERE image_id = :image_id",
            ['image_id' => $image_id]
        );
    }
}
?>