<?php
require_once __DIR__ . '/../dao/EventImagesDao.class.php';
require_once 'BaseService.php';

class EventImagesService extends BaseService {
    public function __construct() {
        $dao = new EventImagesDao();
        parent::__construct($dao);
    }

    /*Get all images for a specific event*/
    public function get_images_by_event($event_id) {
        return $this->dao->get_images_by_event($event_id);
    }

    /*Get a specific image by its ID*/
    public function get_image_by_id($image_id) {
        return $this->dao->get_image_by_id($image_id);
    }
}
?>
