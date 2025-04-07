<?php

require_once __DIR__ . '/BaseDao.class.php';

class UsersDao extends BaseDao {

    public function __construct() {
        parent::__construct("users");
    }
    /*Get all users*/
    public function get_all_users() {
        $query = "SELECT user_id, username, email, role
                  FROM users";
        return $this->query($query, []);
    }

    /* Get single user by ID*/
    public function get_user_by_id($user_id) {
        return $this->query_unique(
            "SELECT user_id, username, email, role
             FROM users 
             WHERE user_id = :user_id", 
            ["user_id" => $user_id]
        );
    }

    /* Get user by email (for login/authentication)*/
    public function get_user_by_email($email) {
        return $this->query_unique(
            "SELECT * FROM users WHERE email = :email", 
            ["email" => $email]
        );
    }

    /* Add a new user (registration)*/
    public function add_user($user) {
        return $this->add($user);
    }

    /* Update user information*/
    public function update_user($user_id, $user) {
        return $this->update($user, $user_id, "user_id");
    }

    /* Delete a user*/
    public function delete_user($user_id) {
        $stmt = $this->connection->prepare("DELETE FROM users WHERE user_id = :user_id");
        $stmt->execute(['user_id' => $user_id]);
        $rowCount = $stmt->rowCount();
        
        return [
            'success' => $rowCount > 0,
            'rows_affected' => $rowCount,
            'user_id' => $user_id
        ];
    }

    /*Check if email already exists (for registration)*/
    public function email_exists($email) {
        $result = $this->query_unique(
            "SELECT 1 FROM users WHERE email = :email", 
            ["email" => $email]
        );
        return !empty($result);
    }

    /*Get users with a specific role*/
    public function get_users_by_role($role) {
        return $this->query(
            "SELECT 
                user_id,
                username,
                email
             FROM users 
             WHERE role = :role", 
            ["role" => $role]
        );
    }
}