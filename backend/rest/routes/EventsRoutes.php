<?php
require_once __DIR__ . '/../services/EventsService.php';

/**
 * @OA\Get(
 *     path="/events",
 *     tags={"events"},
 *     summary="Get all events",
 *     @OA\Response(
 *         response=200,
 *         description="List of all events",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="event_id", type="integer"),
 *                 @OA\Property(property="title", type="string"),
 *                 @OA\Property(property="description", type="string"),
 *                 @OA\Property(property="date", type="string", format="date"),
 *                 @OA\Property(property="location", type="string"),
 *                 @OA\Property(property="image_url", type="string")
 *             )
 *         )
 *     )
 * )
 */

Flight::route('GET /events', function () {
    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);
    Flight::json(Flight::eventsService()->get_all_events());
});

/**
 * @OA\Get(
 *     path="/events/six",
 *     tags={"events"},
 *     summary="Get the first 6 events for homepage",
 *     @OA\Response(
 *         response=200,
 *         description="List of 6 events",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="event_id", type="integer"),
 *                 @OA\Property(property="title", type="string"),
 *                 @OA\Property(property="description", type="string"),
 *                 @OA\Property(property="date", type="string", format="date"),
 *                 @OA\Property(property="location", type="string"),
 *                 @OA\Property(property="image_url", type="string")
 *             )
 *         )
 *     )
 * )
 */

Flight::route('GET /events/six', function () {
    Flight::auth_middleware()->authorizeRole(Roles::USER);
    Flight::json(Flight::eventsService()->get_six_events());
});

/**
 * @OA\Get(
 *     path="/events/{event_id}",
 *     tags={"events"},
 *     summary="Get event by ID",
 *     @OA\Parameter(
 *         name="event_id",
 *         in="path",
 *         required=true,
 *         description="ID of the event to retrieve",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Event details",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="event_id", type="integer"),
 *             @OA\Property(property="title", type="string"),
 *             @OA\Property(property="description", type="string"),
 *             @OA\Property(property="date", type="string", format="date"),
 *             @OA\Property(property="location", type="string"),
 *             @OA\Property(property="image_url", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Event not found"
 *     )
 * )
 */


Flight::route('GET /events/@event_id', function ($event_id) {
    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);
    Flight::json(Flight::eventsService()->get_event_by_id($event_id));
});


/**
 * @OA\Post(
 *     path="/events",
 *     tags={"events"},
 *     summary="Add a new event",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title", "description", "date", "location", "image_url"},
 *             @OA\Property(property="title", type="string", example="Film Premiere"),
 *             @OA\Property(property="description", type="string", example="An award-winning film screening."),
 *             @OA\Property(property="date", type="string", format="date", example="2025-06-15"),
 *             @OA\Property(property="location", type="string", example="Sarajevo National Theatre"),
 *             @OA\Property(property="image", type="string", example="https://example.com/image.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Event added successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="event_id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Film Premiere"),
 *             @OA\Property(property="description", type="string", example="An award-winning film screening."),
 *             @OA\Property(property="date", type="string", format="date", example="2025-06-15"),
 *             @OA\Property(property="location", type="string", example="Sarajevo National Theatre"),
 *             @OA\Property(property="image", type="string", example="https://example.com/image.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input or validation error"
 *     )
 * )
 */

Flight::route('POST /events', function () {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::eventsService()->add_event($data));
});

/**
 * @OA\Put(
 *     path="/events/{event_id}",
 *     tags={"events"},
 *     summary="Update an existing event",
 *     @OA\Parameter(
 *         name="event_id",
 *         in="path",
 *         required=true,
 *         description="ID of the event to update",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title", "description", "date", "location", "image_url"},
 *             @OA\Property(property="title", type="string", example="Updated Event Title"),
 *             @OA\Property(property="description", type="string", example="Updated description for the event."),
 *             @OA\Property(property="date", type="string", format="date", example="2025-06-20"),
 *             @OA\Property(property="location", type="string", example="Updated event location"),
 *             @OA\Property(property="image", type="string", example="https://example.com/updated-image.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Event updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="event_id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Updated Event Title"),
 *             @OA\Property(property="description", type="string", example="Updated description for the event."),
 *             @OA\Property(property="date", type="string", format="date", example="2025-06-20"),
 *             @OA\Property(property="location", type="string", example="Updated event location"),
 *             @OA\Property(property="image", type="string", example="https://example.com/updated-image.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Event not found"
 *     )
 * )
 */



Flight::route('PUT /events/@event_id', function ($event_id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::eventsService()->update_event($event_id, $data));
});

/**
 * @OA\Delete(
 *     path="/events/{event_id}",
 *     tags={"events"},
 *     summary="Delete an event by ID",
 *     @OA\Parameter(
 *         name="event_id",
 *         in="path",
 *         required=true,
 *         description="ID of the event to delete",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Event deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Event deleted successfully!"),
 *             @OA\Property(property="event_id", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Event not found"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error deleting the event"
 *     )
 * )
 */


Flight::route('DELETE /events/@event_id', function ($event_id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::eventsService()->delete_event($event_id));
});
