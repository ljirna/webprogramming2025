<?php
require_once __DIR__ . '/../services/EventImagesService.php';

/**
 * @OA\Get(
 *     path="/event_images/{event_id}",
 *     tags={"event_images"},
 *     summary="Get all images for a specific event",
 *     @OA\Parameter(
 *         name="event_id",
 *         in="path",
 *         required=true,
 *         description="ID of the event to fetch images for",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="List of event images",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="image_id", type="integer", example=1),
 *                 @OA\Property(property="image_url", type="string", example="https://example.com/event1-image.jpg")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Event not found"
 *     )
 * )
 */

Flight::route('GET /event_images/@event_id', function($event_id){
    Flight::json(Flight::eventImagesService()->get_images_by_event($event_id));
});

/**
 * @OA\Get(
 *     path="/event_image/{image_id}",
 *     tags={"event_images"},
 *     summary="Get a specific image by its ID",
 *     @OA\Parameter(
 *         name="image_id",
 *         in="path",
 *         required=true,
 *         description="ID of the image to fetch",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Event image details",
 *         @OA\JsonContent(
 *             @OA\Property(property="image_id", type="integer", example=1),
 *             @OA\Property(property="image_url", type="string", example="https://example.com/event1-image.jpg"),
 *             @OA\Property(property="event_id", type="integer", example=100)
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Image not found"
 *     )
 * )
 */

Flight::route('GET /event_image/@image_id', function($image_id){
    Flight::json(Flight::eventImagesService()->get_image_by_id($image_id));
});
