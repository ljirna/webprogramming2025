<?php
require_once __DIR__ . '/BaseDao.class.php';

class NewsletterDao extends BaseDao {
    public function __construct() {
        parent::__construct("newsletter_subscriptions");
    }

    /*Add a new newsletter subscription*/
    public function add_subscription($email) {
        $user = $this->query_unique(
            "SELECT user_id FROM users WHERE email = :email", 
            ['email' => $email]
        );
        $subscription_data = ['email' => $email];
        
        if ($user && isset($user['user_id'])) {
            $subscription_data['user_id'] = $user['user_id'];
        }
        return $this->add($subscription_data);
    }

    /*Get subscription by ID of the subscription*/
    public function get_subscription_by_id($subscription_id) {
        return $this->get_by_id($subscription_id);
    }

    /*Get all subscriptions*/
    public function get_all_subscriptions() {
        return $this->get_all();
    }

    /*Get subscriptions by user ID*/
    public function get_subscriptions_by_user($user_id) {
        return $this->query(
            "SELECT * FROM newsletter_subscriptions 
             WHERE user_id = :user_id 
             ORDER BY subscribed_at DESC",
            ['user_id' => $user_id]
        );
    }

    /*Get subscription by email*/
    public function get_subscription_by_email($email) {
        return $this->query_unique(
            "SELECT * FROM newsletter_subscriptions 
             WHERE email = :email",
            ['email' => $email]
        );
    }

    /*Check if email is subscribed*/
    public function is_email_subscribed($email) {
        $result = $this->query_unique(
            "SELECT 1 FROM newsletter_subscriptions 
             WHERE email = :email",
            ['email' => $email]
        );
        return !empty($result);
    }
}
?>