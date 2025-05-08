<?php
require_once __DIR__ . '/BaseDao.class.php';

class NewsletterDao extends BaseDao {
    public function __construct() {
        parent::__construct("newsletter_subscriptions");
    }

    public function add_subscription($email) {
        $user = $this->query_unique(
            "SELECT user_id FROM users WHERE email = :email", 
            ['email' => $email]
        );
    
        $subscription_data = ['email' => $email];
        
        /*If the user exists and has a user_id, include it in the subscription data*/
        if ($user && isset($user['user_id'])) {
            $subscription_data['user_id'] = $user['user_id'];
        }
        /*Insert the subscription data (without returning subscription_id directly)*/
        $this->add($subscription_data);
        /*Retrieve the subscription_id of the newly inserted record using lastInsertId*/
        $subscription_id = $this->connection->lastInsertId();
        return ['subscription_id' => $subscription_id];
    }

    /*Get all subscriptions*/
    public function get_all_subscriptions() {
        return $this->get_all();
    }
}
?>