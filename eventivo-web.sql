-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: eventivo-web
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Sarajevo Street Fest','Sarajevo Street Fest is a vibrant and lively event that celebrates the cultural and artistic diversity of Sarajevo, Bosnia and Herzegovina. Held annually in various locations across the city, the festival features a mix of music, dance, theater, street performances, and food. It brings together both local and international artists, offering a platform for creative expression and artistic exchange. Visitors can enjoy the energy of Sarajevo’s streets, with performances taking place in open-air venues, parks, and along pedestrian zones, turning the city into a living art gallery. The event fosters a sense of community, encouraging public participation and interaction, while also promoting Sarajevo as a city of culture, history, and creativity','2024-06-15','18:00:00','Sarajevo City Center','assets/img/speakers/368557109-130620733406671-952748878036797617-n-1692607071.jpg'),(2,'Sarajevo Film Festival','Sarajevo Film Festival is the leading film festival in Southeast Europe and one of the region’s most prestigious cultural events. Founded during the siege of Sarajevo in 1995 as an act of creative resistance, the festival has grown into a world-renowned platform for emerging and established filmmakers from around the globe.','2024-08-11','10:00:00','National Theater Sarajevo','assets/img/speakers/Sarajevo-2024-opening.webp'),(3,'Garden of Lights','Garden of Lights is a magical, immersive light festival that transforms Sarajevo into a glowing wonderland of color, creativity, and imagination. Held during the winter months, this enchanting event invites visitors of all ages to explore dazzling light installations, interactive displays, and illuminated pathways set against the backdrop of Sarajevo’s natural and urban landscapes.','2025-06-06','20:00:00','Sarajevo City Park','assets/img/speakers/Festival-svjetla-Sarajevo-2-Photo-FSS-ok.jpg'),(4,'Sarajevo Business Forum','Sarajevo Business Forum (SBF) is one of Southeast Europe’s premier investment and economic development conferences, held annually in Sarajevo, Bosnia and Herzegovina. The forum serves as a strategic platform for connecting business leaders, policymakers, investors, and entrepreneurs from across the globe with opportunities in the Western Balkans.','2024-05-20','09:00:00','Hotel Hills','assets/img/speakers/ASP_3327-scaled.jpg'),(5,'Neon Beats Festival','Neon Beats Festival is Sarajevo’s ultimate celebration of electronic music, neon lights, and cutting-edge visual experiences. This high-energy festival brings together top local and international DJs, immersive light shows, and a crowd of music lovers ready to dance from dusk till dawn.','2024-07-12','22:00:00','Zetra Olympic Hall','assets/img/speakers/sLOGA-e1590413533436.jpg'),(6,'Urban Lounge Nights','Urban Lounge Nights is Sarajevo’s premier after-dark experience, blending sleek sophistication with underground electronic vibes. This stylish, high-energy event transforms the city’s hippest venues into a pulsating playground of deep house, tech grooves, and live DJ sets. With moody neon accents, immersive projections, and an intimate yet electric atmosphere, Urban Lounge Nights draw a chic crowd of music connoisseurs and nightlife enthusiasts. Sip crafted cocktails, lose yourself in the rhythm, and vibe until the early hours—where every night feels like an exclusive escape into sound.','2024-06-25','20:00:00','Downtown Club','assets/img/speakers/cinestar-sarajevo-7.jpg'),(7,'Baščaršija Nights','Baščaršija Nights is Sarajevo’s enchanting fusion of traditional charm and vibrant nightlife, where the historic Ottoman-era quarter comes alive after dark. Under the glow of lantern-lit cobblestone streets, this unique experience blends live Balkan folk music, modern electronic beats, and the warm hum of ćevapi grills. Sip on Bosnian coffee or rakija as local musicians and DJs spin a mesmerizing mix of old and new, while the scent of incense and spices lingers in the air. Whether you\'re swaying to the hypnotic rhythms of a sevdah song or dancing under the stars in a hidden courtyard, Baščaršija Nights offers a magical journey through Sarajevo’s soul—where history and hedonism meet.','2024-08-05','19:30:00','Baščaršija Square','assets/img/speakers/bascarsija2.jpg'),(8,'Sarajevo Jazz Festival','Sarajevo Jazz Festival is the city’s premier celebration of improvisation, soul, and rhythm, where world-class musicians and rising stars converge for an electrifying week of genre-defying performances. Set in atmospheric venues—from grand theaters to intimate underground clubs—the festival transforms the city into a haven for jazz purists and curious explorers alike. Experience the raw energy of avant-garde ensembles, the smoky allure of late-night jam sessions, and the boundary-pushing fusion of Balkan jazz with global influences.','2024-11-03','20:00:00','Sarajevo Jazz Club','assets/img/speakers/jazz.jpg'),(9,'Beer Fest','Sarajevo Beer Fest is the city’s ultimate celebration of hops, flavor, and good vibes—a lively gathering where craft brewers, beer enthusiasts, and party crowds unite under the summer sky. This open-air festival transforms the heart of the city into a buzzing hub of ice-cold pints, local and international brews, and mouthwatering street food. From crisp lagers to bold IPAs and rich stouts, every sip comes with live music, from rock and folk to DJ sets that keep the energy high.','2024-09-15','16:00:00','Sarajevo Brewery','assets/img/speakers/beerfest.jpg'),(10,'International Theater Festival','Sarajevo International Theater Festival (SITF) is the city’s most captivating celebration of performing arts, where bold creativity and raw emotion take center stage. For over a decade, this prestigious event has transformed Sarajevo into a global crossroads of theater, welcoming visionary directors, daring actors, and avant-garde troupes from across Europe and beyond.','2024-10-10','18:30:00','Sarajevo National Theater','assets/img/speakers/theatre.jpeg'),(11,'Sarajevo Bike Festival','Sarajevo Bike Festival is the city\'s ultimate celebration of two-wheeled passion, adrenaline, and outdoor adventure. This dynamic event brings together cycling enthusiasts of all disciplines—from mountain bike trailblazers and road cyclists to urban riders and family-friendly cruisers—for a weekend of speed, skill, and pure pedal-powered joy','2024-05-05','10:00:00','Sarajevo Olympic Stadium','assets/img/speakers/biciklo.jpg'),(12,'Cultural Heritage Festival','Sarajevo Cultural Heritage Festival is a vibrant ode to the city’s timeless soul—where centuries of tradition, art, and multicultural harmony come alive. This enchanting event transforms Sarajevo’s cobblestone streets and historic quarters into a living museum, celebrating the rich tapestry of Bosnian, Ottoman, Austro-Hungarian, and Slavic influences that define the city.','2024-07-21','17:00:00','Historical Museum of Bosnia','assets/img/speakers/culture.jpg');
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
  CONSTRAINT `newsletter_subscriptions_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscriptions`
--

LOCK TABLES `newsletter_subscriptions` WRITE;
/*!40000 ALTER TABLE `newsletter_subscriptions` DISABLE KEYS */;
INSERT INTO `newsletter_subscriptions` VALUES (13,'igor@gmail.com',44);
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
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (17,21,1,'vip'),(28,44,11,'standard'),(29,44,12,'vip');
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
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'salihrogo','$2y$10$bE25yjlU/8Kv4JS2DGNK/OxpfLaseydGOaWlIvFe/fs6VQzhLeydC','salihrogo@gmail.com','admin','Salih','Rogo'),(21,'ljirna','$2y$10$mvI/VUqlNv1Q/YDEASoUUusUI12Rx4.evchQY43J5G6fnWKRYH6mu','mirna@gmail.com','user','Mirna','Ljiljic'),(44,'Igor','$2y$10$vjvO6WeNWpGN483r8t98v.f4KahJpOs2KpnnTO7.FLUQAuS/x3cV6','igor@gmail.com','user','Igor','Ljiljić');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'eventivo-web'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26  2:31:56
