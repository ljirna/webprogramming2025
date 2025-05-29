<?php
require_once __DIR__ . '/../services/NewsletterService.php';

/**
 * @OA\Post(
 *     path="/newsletter",
 *     tags={"newsletter"},
 *     summary="Subscribe to newsletter",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email"},
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Subscription successful",
 *         @OA\JsonContent(
 *             @OA\Property(property="subscription_id", type="integer", example=1)
 *         )
 *     )
 * )
 */

Flight::route('POST /newsletter', function () {
   Flight::auth_middleware()->authorizeRole(Roles::USER);
   $data = Flight::request()->data->getData();
   Flight::json(Flight::newsletterService()->add_subscription($data['email']));
});

/**
 * @OA\Get(
 *     path="/newsletter",
 *     tags={"newsletter"},
 *     summary="Get all newsletter subscriptions",
 *     @OA\Response(
 *         response=200,
 *         description="List of all subscriptions",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="email", type="string", format="email"),
 *                 @OA\Property(property="user_id", type="integer", nullable=true)
 *             )
 *         )
 *     )
 * )
 */

Flight::route('GET /newsletter', function () {
   Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
   Flight::json(Flight::newsletterService()->get_all_subscriptions());
});
