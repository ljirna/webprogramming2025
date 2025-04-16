<?php
require_once __DIR__ . '/../services/NewsletterService.php';

Flight::route('POST /newsletter', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::newsletterService()->add_subscription($data['email']));
});

Flight::route('GET /newsletter', function(){
   Flight::json(Flight::newsletterService()->get_all_subscriptions());
});
?>
