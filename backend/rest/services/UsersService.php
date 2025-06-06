<?php
require_once __DIR__ . '/../dao/UsersDao.class.php';
require_once 'BaseService.php';

class UsersService extends BaseService
{
    private $usersDao;

    public function __construct()
    {
        $this->usersDao = new UsersDao();
        parent::__construct($this->usersDao);
    }

    /*Get all users*/
    public function get_all_users()
    {
        return $this->usersDao->get_all_users();
    }

    /*Get a user by ID*/
    public function get_user_by_id($user_id)
    {
        if ($user_id <= 0) {
            throw new Exception("Invalid user ID.");
        }
        return $this->usersDao->get_user_by_id($user_id);
    }

    /* Get user by email */
    public function get_user_by_email($email)
    {
        if (empty($email)) {
            throw new Exception("Email is required.");
        }
        $this->validateEmailFormat($email);
        return $this->usersDao->get_user_by_email($email);
    }


    /*Register a new user*/
    public function add_user($user)
    {
        if (empty($user['email']) || empty($user['username']) || empty($user['password'])) {
            throw new Exception("Email, username and password are required.");
        }

        if ($this->usersDao->email_exists($user['email'])) {
            throw new Exception("Email is already registered.");
        }

        $this->validateEmailFormat($user['email']);
        return $this->usersDao->add_user($user);
    }

    /*Update an existing user*/
    public function update_user($user_id, $user)
    {
        if ($user_id <= 0) {
            throw new Exception("Invalid user ID.");
        }

        if (isset($user['email'])) {
            $existing = $this->usersDao->get_user_by_email($user['email']);
            if ($existing && $existing['user_id'] != $user_id) {
                throw new Exception("This email is already in use by another account.");
            }
            $this->validateEmailFormat($user['email']);
        }
        return $this->usersDao->update_user($user_id, $user);
    }

    /*Delete a user*/
    public function delete_user($user_id)
    {
        if ($user_id <= 0) {
            throw new Exception("Invalid user ID.");
        }
        return $this->usersDao->delete_user($user_id);
    }

    /*Get users by their role*/
    public function get_users_by_role($role)
    {
        if (empty($role)) {
            throw new Exception("Role is required.");
        }
        return $this->usersDao->get_users_by_role($role);
    }

    private function validateEmailFormat($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format.");
        }
    }
}
