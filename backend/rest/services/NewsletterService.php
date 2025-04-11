<?php
require_once __DIR__ . '/../dao/NewsletterDao.class.php';

class NewsletterService {
    private $newsletterDao;

    public function __construct() {
        $this->newsletterDao = new NewsletterDao();
    }

    /*Add a new subscription by email*/
    public function add_subscription($email) {
        $result = $this->newsletterDao->add_subscription($email);
        return $result;
    }

    /*Get all newsletter subscriptions*/
    public function get_all_subscriptions() {
        return $this->newsletterDao->get_all_subscriptions();
    }
}
?>
