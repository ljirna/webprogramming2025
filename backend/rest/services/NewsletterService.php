<?php
require_once __DIR__ . '/../dao/NewsletterDao.class.php';

class NewsletterService {
    private $newsletterDao;

    public function __construct() {
        $this->newsletterDao = new NewsletterDao();
    }

    /*Add a new subscription by email*/
    public function add_subscription($email) {
        /*Only allow unique emails to subscribe to newsletter*/   
        $all_subscriptions = $this->newsletterDao->get_all_subscriptions();
        foreach ($all_subscriptions as $subscription) {
            if ($subscription['email'] === $email) {
                throw new Exception("Email is already subscribed.");
            }
        }
        return $this->newsletterDao->add_subscription($email);
    }
    

    /*Get all newsletter subscriptions*/
    public function get_all_subscriptions() {
        return $this->newsletterDao->get_all_subscriptions();
    }
}
?>
