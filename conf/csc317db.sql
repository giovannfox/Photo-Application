-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL,
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'test title','test test title titlse 329239023','images/test.png','images/thumbnails/test.png',0,'2020-05-16 16:53:50',1),(3,'test title 2','test test title titlse 329239023','images/test2.png','images/thumbnails/test2.png',0,'2020-05-16 19:25:47',4),(4,'test title 5','test test title titlse 329239023','images/test5.png','images/thumbnails/test5.png',0,'2020-05-16 19:26:33',5),(5,'test title 6','test test title titlse 329239023','images/test6.png','images/thumbnails/test6.png',0,'2020-05-16 19:26:43',6),(6,'test title 7','test test title titlse 329239023','images/test7.png','images/thumbnails/test7.png',0,'2020-05-16 19:26:54',7),(7,'work plz','work ffs','public\\images\\uploads\\71792dccdc25151e237622751d4c8b8ff87935f24735.jpeg','public/images/uploads/thumbnail-71792dccdc25151e237622751d4c8b8ff87935f24735.jpeg',0,'2020-05-19 16:45:45',21),(8,'yay','yay','public\\images\\uploads\\d312d587a0af0c3fc7c039095d8a7357ca3fd91810e3.jpeg','public/images/uploads/thumbnail-d312d587a0af0c3fc7c039095d8a7357ca3fd91810e3.jpeg',0,'2020-05-19 17:40:12',23);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser1','test1@mail.com','ldskflsklsf66',0,0,'2020-05-16 16:09:36'),(4,'testuser2','test2@mail.com','ldskflsklsf66',0,0,'2020-05-16 16:13:11'),(5,'testuser3','test3@mail.com','ldskflsklsf66',0,0,'2020-05-16 16:29:57'),(6,'testuser4','test4@mail.com','ldskflsklsf66',0,0,'2020-05-16 16:30:03'),(7,'testuser5','test5@mail.com','ldskflsklsf66',0,0,'2020-05-16 16:30:10'),(8,'giotest34234','fake666111666111@mail.com','dfkafsdklss',0,0,'2020-05-17 12:46:10'),(10,'giotest3424434432','fake66333611166446111@mail.com','dfk44a333fsdklss',0,0,'2020-05-17 13:22:55'),(12,'giotest342443334432','fake6633361116633446111@mail.com','dfk44a333fsdklss',0,0,'2020-05-17 13:24:51'),(14,'ttt','tt@tt.com','1234',0,0,'2020-05-17 19:36:49'),(15,'fslskflds','sfsflds@mail.com','1234',0,0,'2020-05-17 19:38:20'),(16,'foxxxxxx','foxxxxx@mail.com','1234',0,0,'2020-05-17 19:43:43'),(17,'hello','hello@mail.com','hello',0,0,'2020-05-17 19:48:04'),(18,'gfoxxxx','gfoxxx@mail.com','12345',0,0,'2020-05-17 21:31:06'),(19,'yoooo','yooo@yo.com','yooo',0,0,'2020-05-18 14:35:39'),(20,'hashedT','hashed@hashed.com','$2a$10$K78uiF5wyLMJ.NRiqaZ2ze0fUj4NbKg2CbGDXtisLG8AEsyVRAD4a',0,0,'2020-05-19 08:33:33'),(21,'giovann','gio@fox.com','$2a$10$fBlS3ztt3tHA.MXraL2ltuxm6gV7IXJrrBZH2Cce9jdbRsy.1WzZK',0,0,'2020-05-19 11:26:06'),(22,'fklsdklsf','erelkwefklw','$2a$10$TxXDvv06QSYJ8y8eXdRlpueefSzV4ur.h9QluOaV7qblNWyhIJszC',0,0,'2020-05-19 16:00:31'),(23,'yay','yay','$2a$10$qyGixgrvS6C08jR3uSITDecorJ8sauBEUtQ73YDKumxzzAaRn1iOC',0,0,'2020-05-19 17:39:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-20 11:16:33
