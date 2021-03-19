-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: smartphones-shop-old
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `brand_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `color_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `color_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `option_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `option_id` (`option_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memories`
--

DROP TABLE IF EXISTS `memories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memories` (
  `memory_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `memory` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`memory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memories`
--

LOCK TABLES `memories` WRITE;
/*!40000 ALTER TABLE `memories` DISABLE KEYS */;
/*!40000 ALTER TABLE `memories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `model_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `model_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `brand_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`model_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `option_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `model_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `memory_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `os_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `color_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `year` int NOT NULL,
  `created_at` varchar(45) COLLATE utf8_bin DEFAULT 'CURRENT_TIMESTAMP',
  `updated_at` varchar(45) COLLATE utf8_bin DEFAULT 'ON UPDATE CURRENT_TIMESTAMP',
  PRIMARY KEY (`option_id`),
  KEY `model_id` (`model_id`),
  KEY `color_id` (`color_id`),
  KEY `os_id` (`os_id`),
  KEY `memory_id` (`memory_id`),
  CONSTRAINT `options_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `models` (`model_id`),
  CONSTRAINT `options_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`),
  CONSTRAINT `options_ibfk_3` FOREIGN KEY (`os_id`) REFERENCES `os_versions` (`os_id`),
  CONSTRAINT `options_ibfk_4` FOREIGN KEY (`memory_id`) REFERENCES `memories` (`memory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_versions`
--

DROP TABLE IF EXISTS `os_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `os_versions` (
  `os_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `os_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`os_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_versions`
--

LOCK TABLES `os_versions` WRITE;
/*!40000 ALTER TABLE `os_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `option_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `price` decimal(19,4) DEFAULT NULL,
  `is_sold` tinyint DEFAULT '0',
  `is_published` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `option_id_idx` (`option_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-19 16:43:26
