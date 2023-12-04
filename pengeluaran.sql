-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: pengeluaran
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20230812124254-add_column_refreshToken.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('IGxHZLorF8OV1Ozsqi7DP5dO935l47Qs','2023-08-08 16:53:02','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"ed529c04-0ebe-4b39-abba-36768cdcffa1\"}','2023-08-07 14:47:33','2023-08-07 16:53:02');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_pengeluaran`
--

DROP TABLE IF EXISTS `list_pengeluaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_pengeluaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `list_pengeluaran_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_pengeluaran`
--

LOCK TABLES `list_pengeluaran` WRITE;
/*!40000 ALTER TABLE `list_pengeluaran` DISABLE KEYS */;
INSERT INTO `list_pengeluaran` VALUES (3,'723b3965-4654-4a15-a209-be5e82d6b8d3','nasi orak-arik',30000,2,1,'2023-08-05 17:44:01','2023-08-05 17:44:01'),(4,'d8731f38-a86e-4a3c-b20f-c5844e5644e9','Nasi Goreng',17000,1,1,'2023-08-05 17:44:33','2023-08-28 01:50:08'),(7,'bdaf958f-b432-4637-8bc4-76508742303f','Nasi Orak-arik + gorengen',15000,1,1,'2023-08-07 16:47:04','2023-08-07 16:47:04'),(8,'0f3358a2-8b4f-4104-a8dd-3849dc684d82','Nasi Orak-arik + gorengen',15000,1,1,'2023-08-12 19:57:50','2023-08-12 19:57:50'),(10,'745672c6-7141-4f50-87f1-a55925b76d76','Nasi Orak-arik + gorengen',15000,1,1,'2023-08-13 15:58:46','2023-08-13 15:58:46');
/*!40000 ALTER TABLE `list_pengeluaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otpCode` varchar(255) DEFAULT NULL,
  `otpExpiration` datetime DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `refreshToken` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ed529c04-0ebe-4b39-abba-36768cdcffa1','Mark','markusrr10@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$aFp59hcEtaxo60sH2NQK9Q$g42i+HA0qlD6KVcD/LEfPnGUjEwg69TJ3mpKnMYu72w','947631','2023-08-28 07:57:43',1,'2023-08-05 09:39:35','2023-08-28 09:10:41',NULL),(4,'5cbb3d1c-e426-4388-ba1f-94429367399f','gambih','hgambih@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$LZzv1CFfgV0uXal20mMZaA$gH1YQyJlornx0RI0iaejV6A9Vf8+ImGFCrwGjtwLvPs','853575','2023-08-28 07:32:03',0,'2023-08-28 07:29:03','2023-08-28 07:29:03',NULL),(6,'b2dfa570-1f94-4b7b-adea-9d2aa524a7cb','mark','haiser109@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$1DLfYB/x4qWU/aINpla1+w$+3RvbVhr2n5Px2P3YI4WCCeXn6ZFtaEvM6Td7eopuxU','956934','2023-08-28 08:26:49',1,'2023-08-28 07:41:34','2023-08-28 09:16:53',NULL);
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

-- Dump completed on 2023-12-04 19:29:19
