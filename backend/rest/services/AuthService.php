<?php
require_once __DIR__ . '/../dao/AuthDao.class.php';
require_once 'BaseService.php';

class AuthService extends BaseService {
    private $authDao;

    public function __construct() {
        $this->authDao = new AuthDao();
    }

    public function login($email, $password) {
        if (empty($email) || empty($password)) {
            throw new Exception("Email and password are required.");
        }

        $user = $this->authDao->get_user_by_email($email);

        if (!$user) {
            throw new Exception("User not found.");
        }

        if ($user['password'] !== $password) {
            throw new Exception("Invalid password.");
        }
        /*Unset used to hide the password of a user on the backend*/
        unset($user['password']);
        return $user;
    }

    public function register($user) {
        if (empty($user['first_name']) || empty($user['last_name']) || empty($user['email']) || empty($user['username']) || empty($user['password'])) {
            throw new Exception("Missing registration data.");
        }

        if ($this->authDao->get_user_by_email($user['email'])) {
            throw new Exception("Email already in use.");
        }
        return $this->authDao->add($user);
    }
}
