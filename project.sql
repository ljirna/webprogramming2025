-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: eventivo
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event_images`
--

DROP TABLE IF EXISTS `event_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_images_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_images`
--

LOCK TABLES `event_images` WRITE;
/*!40000 ALTER TABLE `event_images` DISABLE KEYS */;
INSERT INTO `event_images` VALUES (1,1,'img/gallery/comedy.webp'),(2,1,'img/gallery/2.jpg'),(3,1,'img/gallery/3.jpg'),(4,1,'img/gallery/4.jpeg'),(5,1,'img/gallery/5.jpg'),(6,1,'img/gallery/6.jpg'),(7,1,'img/gallery/field.jpeg'),(8,1,'img/gallery/8.jpg'),(9,2,'img/gallery/comedy.webp'),(10,2,'img/gallery/2.jpg'),(11,2,'img/gallery/3.jpg'),(12,2,'img/gallery/4.jpeg'),(13,2,'img/gallery/5.jpg'),(14,2,'img/gallery/6.jpg'),(15,2,'img/gallery/field.jpeg'),(16,2,'img/gallery/8.jpg'),(17,3,'img/gallery/comedy.webp'),(18,3,'img/gallery/2.jpg'),(19,3,'img/gallery/3.jpg'),(20,3,'img/gallery/4.jpeg'),(21,3,'img/gallery/5.jpg'),(22,3,'img/gallery/6.jpg'),(23,3,'img/gallery/field.jpeg'),(24,3,'img/gallery/8.jpg'),(25,4,'img/gallery/comedy.webp'),(26,4,'img/gallery/2.jpg'),(27,4,'img/gallery/3.jpg'),(28,4,'img/gallery/4.jpeg'),(29,4,'img/gallery/5.jpg'),(30,4,'img/gallery/6.jpg'),(31,4,'img/gallery/field.jpeg'),(32,4,'img/gallery/8.jpg'),(33,5,'img/gallery/comedy.webp'),(34,5,'img/gallery/2.jpg'),(35,5,'img/gallery/3.jpg'),(36,5,'img/gallery/4.jpeg'),(37,5,'img/gallery/5.jpg'),(38,5,'img/gallery/6.jpg'),(39,5,'img/gallery/field.jpeg'),(40,5,'img/gallery/8.jpg'),(41,6,'img/gallery/comedy.webp'),(42,6,'img/gallery/2.jpg'),(43,6,'img/gallery/3.jpg'),(44,6,'img/gallery/4.jpeg'),(45,6,'img/gallery/5.jpg'),(46,6,'img/gallery/6.jpg'),(47,6,'img/gallery/field.jpeg'),(48,6,'img/gallery/8.jpg'),(49,7,'img/gallery/comedy.webp'),(50,7,'img/gallery/2.jpg'),(51,7,'img/gallery/3.jpg'),(52,7,'img/gallery/4.jpeg'),(53,7,'img/gallery/5.jpg'),(54,7,'img/gallery/6.jpg'),(55,7,'img/gallery/field.jpeg'),(56,7,'img/gallery/8.jpg'),(57,8,'img/gallery/comedy.webp'),(58,8,'img/gallery/2.jpg'),(59,8,'img/gallery/3.jpg'),(60,8,'img/gallery/4.jpeg'),(61,8,'img/gallery/5.jpg'),(62,8,'img/gallery/6.jpg'),(63,8,'img/gallery/field.jpeg'),(64,8,'img/gallery/8.jpg'),(65,9,'img/gallery/comedy.webp'),(66,9,'img/gallery/2.jpg'),(67,9,'img/gallery/3.jpg'),(68,9,'img/gallery/4.jpeg'),(69,9,'img/gallery/5.jpg'),(70,9,'img/gallery/6.jpg'),(71,9,'img/gallery/field.jpeg'),(72,9,'img/gallery/8.jpg'),(73,10,'img/gallery/comedy.webp'),(74,10,'img/gallery/2.jpg'),(75,10,'img/gallery/3.jpg'),(76,10,'img/gallery/4.jpeg'),(77,10,'img/gallery/5.jpg'),(78,10,'img/gallery/6.jpg'),(79,10,'img/gallery/field.jpeg'),(80,10,'img/gallery/8.jpg'),(81,11,'img/gallery/comedy.webp'),(82,11,'img/gallery/2.jpg'),(83,11,'img/gallery/3.jpg'),(84,11,'img/gallery/4.jpeg'),(85,11,'img/gallery/5.jpg'),(86,11,'img/gallery/6.jpg'),(87,11,'img/gallery/field.jpeg'),(88,11,'img/gallery/8.jpg'),(89,12,'img/gallery/comedy.webp'),(90,12,'img/gallery/2.jpg'),(91,12,'img/gallery/3.jpg'),(92,12,'img/gallery/4.jpeg'),(93,12,'img/gallery/5.jpg'),(94,12,'img/gallery/6.jpg'),(95,12,'img/gallery/field.jpeg'),(96,12,'img/gallery/8.jpg');
/*!40000 ALTER TABLE `event_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Sarajevo Street Fest','A vibrant celebration of music, art, and culture.','2024-06-15','18:00:00','Sarajevo City Center','img/speakers/368557109-130620733406671-952748878036797617-n-1692607071.jpg'),(2,'Sarajevo Film Festival','The region\'s top film festival.','2024-08-10','10:00:00','National Theater Sarajevo','img/speakers/Sarajevo-2024-opening.webp'),(3,'Garden of Lights','A magical nighttime exhibition of art.','2024-12-01','19:00:00','Sarajevo City Park','img/speakers/Festival-svjetla-Sarajevo-2-Photo-FSS-ok.jpg'),(4,'Sarajevo Business Forum','A premier conference.','2024-05-20','09:00:00','Hotel Hills','img/speakers/ASP_3327-scaled.jpg'),(5,'Neon Beats Festival','An electrifying electronic music festival.','2024-07-12','22:00:00','Zetra Olympic Hall','img/speakers/sLOGA-e1590413533436.jpg'),(6,'Urban Lounge Nights','Stylish nights out with great music and ambiance.','2024-06-25','20:00:00','Downtown Club','img/speakers/cinestar-sarajevo-7.jpg'),(7,'Baščaršija Nights','Traditional music and cultural performances.','2024-08-05','19:30:00','Baščaršija Square','img/speakers/bascarsija2.jpg'),(8,'Sarajevo Jazz Festival','Featuring local and global jazz artists.','2024-11-03','20:00:00','Sarajevo Jazz Club','img/speakers/jazz.jpg'),(9,'Beer Fest','Celebrating craft beers and live music.','2024-09-15','16:00:00','Sarajevo Brewery','img/speakers/beerfest.jpg'),(10,'International Theater Festival','Showcasing innovative theatrical performances.','2024-10-10','18:30:00','Sarajevo National Theater','img/speakers/theatre.jpeg'),(11,'Sarajevo Bike Festival','A fun and eco-friendly event celebrating cycling.','2024-05-05','10:00:00','Sarajevo Olympic Stadium','img/speakers/biciklo.jpg'),(12,'Cultural Heritage Festival','Stylish nights out with great music and ambiance.','2024-07-20','17:00:00','Historical Museum of Bosnia','img/speakers/culture.jpg'),(105,'Sample Concert Event','A test event for reservation testing','2025-04-13','19:00:00','Test Venue','default.jpg'),(106,'Test Event 1743966554','Test Description','2025-04-13','19:00:00','Test Location','test.jpg'),(107,'Test Event 1743969220','Test Description','2025-04-13','19:00:00','Test Location','test.jpg'),(108,'Test Event 1743969350','Test Description','2025-04-13','19:00:00','Test Location','test.jpg'),(109,'Test Event 1743969440','Test Description','2025-04-13','19:00:00','Test Location','test.jpg');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscriptions`
--

DROP TABLE IF EXISTS `newsletter_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter_subscriptions` (
  `subscription_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`subscription_id`),
  UNIQUE KEY `email` (`email`),
  KEY `newsletter_subscriptions_FK` (`user_id`),
  CONSTRAINT `newsletter_subscriptions_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscriptions`
--

LOCK TABLES `newsletter_subscriptions` WRITE;
/*!40000 ALTER TABLE `newsletter_subscriptions` DISABLE KEYS */;
INSERT INTO `newsletter_subscriptions` VALUES (1,'john@example.com',1),(5,'testuser_1743631927@example.com',9);
/*!40000 ALTER TABLE `newsletter_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `ticket_type` enum('standard','pro','vip') NOT NULL DEFAULT 'standard',
  PRIMARY KEY (`reservation_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,1,'standard'),(2,1,3,'pro'),(3,1,5,'vip'),(4,10,NULL,'standard'),(5,1,105,'standard'),(6,NULL,106,'standard'),(10,1,1,'vip'),(11,1,1,'vip'),(12,1,1,'vip'),(13,1,1,'vip'),(14,1,1,'vip'),(15,1,1,''),(16,1,1,'standard');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_doe','password123','john@example.com','user','Mirna','blabla'),(2,'admin','admin123','admin@example.com','admin','admin','admin'),(9,'testuser_1743631927','testpass123','testuser_1743631927@example.com','admin',NULL,NULL),(10,'testuser_1743965757','testpass123','testuser_1743965757@example.com','admin','Test','User'),(11,'testuser','testpass','testuser_1743966554@example.com','user','Test','User'),(13,'testuser_1743969220','testpass','testuser_1743969220@example.com','admin','Test','User'),(14,'testuser_1743969350','testpass','testuser_1743969350@example.com','admin','Test','User'),(15,'testuser_1743969440','testpass','testuser_1743969440@example.com','admin','Test','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'eventivo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-06 22:37:54
