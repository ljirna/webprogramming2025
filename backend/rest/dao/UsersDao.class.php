<?php

require_once __DIR__ . '/BaseDao.class.php';

class UsersDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("users");
    }
    /*Get all users*/
    public function get_all_users()
    {
        $query = "SELECT user_id, username, email, role, first_name, last_name
                  FROM users";
        return $this->query($query, []);
    }

    /* Get single user by ID*/
    public function get_user_by_id($user_id)
    {
        return $this->query_unique(
            "SELECT user_id, username, email, role, first_name, last_name
             FROM users 
             WHERE user_id = :user_id",
            ["user_id" => $user_id]
        );
    }

    /* Get user by email (for login/authentication)*/
    public function get_user_by_email($email)
    {
        return $this->query_unique(
            "SELECT * FROM users WHERE email = :email",
            ["email" => $email]
        );
    }

    /* Add a new user (registration)*/
    public function add_user($user)
    {
        return $this->add($user);
    }

    /* Update user information*/
    public function update_user($user_id, $user)
    {
        return $this->update($user, $user_id, "user_id");
    }

    /* Delete a user with cascade deletion*/
    public function delete_user($user_id)
    {
        try {
            /*Delete the user's newsletter subscriptions*/
            $this->connection->prepare(
                "DELETE FROM newsletter_subscriptions WHERE user_id = :user_id"
            )->execute(['user_id' => $user_id]);

            /*Delete the user*/
            $stmt = $this->connection->prepare(
                "DELETE FROM users WHERE user_id = :user_id"
            );
            $stmt->execute(['user_id' => $user_id]);

            return [
                'success' => $stmt->rowCount() > 0,
                'user_id' => $user_id
            ];
        } catch (Exception $e) {
            throw new Exception("Failed to delete user: " . $e->getMessage());
        }
    }


    /*Check if email already exists (for registration)*/
    public function email_exists($email)
    {
        $result = $this->query_unique(
            "SELECT 1 FROM users WHERE email = :email",
            ["email" => $email]
        );
        return !empty($result);
    }

    /*Get users with a specific role*/
    public function get_users_by_role($role)
    {
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
