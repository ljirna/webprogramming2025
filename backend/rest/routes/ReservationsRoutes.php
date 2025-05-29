<?php
require_once __DIR__ . '/../services/ReservationsService.php';

/**
 * @OA\Post(
 *     path="/reservations",
 *     tags={"reservations"},
 *     summary="Create a new reservation",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "event_id", "ticket_type"},
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="event_id", type="integer", example=113),
 *             @OA\Property(property="ticket_type", type="string", example="VIP")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Reservation created successfully"
 *     )
 * )
 */

Flight::route('POST /reservations', function () {
    Flight::auth_middleware()->authorizeRole(Roles::USER);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::reservationsService()->add_reservation($data));
});

/**
 * @OA\Get(
 *     path="/reservations/event/{event_id}",
 *     tags={"reservations"},
 *     summary="Get reservations for an event",
 *     @OA\Parameter(
 *         name="event_id",
 *         in="path",
 *         required=true,
 *         description="ID of the event",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="List of reservations for the event",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="user_id", type="integer"),
 *                 @OA\Property(property="event_id", type="integer"),
 *                 @OA\Property(property="ticket_type", type="string")
 *             )
 *         )
 *     )
 * )
 */

Flight::route('GET /reservations/event/@event_id', function ($event_id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::reservationsService()->get_reservations_for_event($event_id));
});

Flight::route('GET /reservations', function () {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::reservationsService()->get_all_reservations());
});

Flight::route('DELETE /admin/reservations/@id', function ($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(['success' => Flight::reservationsService()->delete_reservation($id)]);
});
