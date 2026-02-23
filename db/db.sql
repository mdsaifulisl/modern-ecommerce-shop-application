-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_project2
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('unread','read') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (2,'Md. Saiful Islam','saiful01741899@gmail.com','','Islam','dasfd','2026-02-01 16:53:59','2026-02-01 18:30:59','read'),(3,'Md. Saiful Islam','saiful01741899@gmail.com','','Islam','dfafds','2026-02-01 16:54:09','2026-02-01 18:04:09','read'),(12,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','amar sonar bangla ami toamay valO pai','2026-02-02 20:57:20','2026-02-02 20:57:38','read'),(13,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','fdsadfsa','2026-02-02 22:26:58','2026-02-02 22:27:16','read');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `type` enum('slider','gallery') NOT NULL DEFAULT 'slider',
  `public_id` varchar(255) DEFAULT NULL COMMENT 'Used for Cloudinary/Firebase file deletion',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES ('2638a17b-bcc3-42b5-9b28-19f90612b0c9','slider','uploads/image-1770359159162.png','slider','image-1770359159162.png','2026-02-06 06:25:59','2026-02-06 06:25:59'),('92f8bcb6-9fcd-4e79-9caa-b724ba87b04c','gallery 1','uploads/image-1770359191935.jpg','gallery','image-1770359191935.jpg','2026-02-06 06:26:31','2026-02-06 06:26:31'),('ea499a78-4ef5-4d79-8cb1-f93ff9d6d983','slider 1','uploads/image-1770359125468.png','slider','image-1770359125468.png','2026-02-06 06:25:25','2026-02-06 06:25:25');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES ('0c420593-03ee-41da-89f0-9dba6319dc4c','6baea3e1-2a22-4646-82d6-96930045cbbd','dsf',123.00,1,'L-40','http://localhost:8000/uploads/images-1770286806725.png','2026-02-05 10:35:58','2026-02-05 10:35:58','35c5fa7a-7c31-4912-bc02-a16316cc6e2e'),('1f402639-1f6b-43ad-86f4-77b2ba3a0b80','13ab489a-bfff-43de-9476-2dab3ff5cd16','Product 1',900.00,3,'L-40','http://localhost:8000/uploads/image-1770070777494.jpg','2026-02-03 06:23:40','2026-02-03 06:23:40','479ff713-3186-470b-9c4c-2a05a9801b8d'),('20db8ce7-e345-4687-955a-679e59ac9916','c9704a74-9496-4500-8d78-3bc8e51dca1b','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu',100.00,1,'L-40','http://localhost:8000/uploads/images-1770450598127.jpg','2026-02-07 08:31:33','2026-02-07 08:31:33','d675648e-d9c3-45d8-994b-7893b2d6f6ac'),('56e2a559-aafc-443b-a341-f4472820692f','fef60966-b953-4fb9-9745-8d11b43ba5fd','Product 1',900.00,2,'L-40','http://localhost:8000/uploads/image-1770070777494.jpg','2026-02-03 06:15:15','2026-02-03 06:15:15','479ff713-3186-470b-9c4c-2a05a9801b8d'),('57f6de7e-d9de-4ec9-97db-f0a56af7f5ae','116935d4-40c7-49f4-a11d-73c0b1ca48d2','fdsa',900.00,6,'XL-44','http://localhost:8000/uploads/image-1770070887644.png','2026-02-03 06:12:46','2026-02-03 06:12:46','8ba7d61e-244a-4974-8c16-67783f47bed3'),('781d5e61-886d-491f-9292-fb279345cf07','fef60966-b953-4fb9-9745-8d11b43ba5fd','fdsa',900.00,2,'L-40','http://localhost:8000/uploads/image-1770070887644.png','2026-02-03 06:15:15','2026-02-03 06:15:15','8ba7d61e-244a-4974-8c16-67783f47bed3'),('a52a9821-e3b3-44b5-93ab-660fbc0a1024','09d67408-b56a-4aa6-a9a8-77b2b2e7f0f5','ed',1024.00,1,'XL-44','http://localhost:8000/uploads/images-1770359857447.jpg','2026-02-06 07:59:43','2026-02-06 07:59:43','723a7417-370c-4355-9ab8-546d487a99d3'),('a5d2297a-176c-43e4-b364-989db6601452','b06d2b05-79d3-4601-aa9c-9247ace4fb9d','ed',1024.00,2,'L-40','http://localhost:8000/uploads/images-1770359857456.jpg','2026-02-06 06:38:25','2026-02-06 06:38:25','723a7417-370c-4355-9ab8-546d487a99d3'),('ad48ae52-b666-45aa-aacf-075d755908c2','6baea3e1-2a22-4646-82d6-96930045cbbd','dsf',123.00,1,'M-36','http://localhost:8000/uploads/images-1770286806725.png','2026-02-05 10:35:58','2026-02-05 10:35:58','35c5fa7a-7c31-4912-bc02-a16316cc6e2e'),('b458eda0-c9c9-4ba2-8013-b142119105aa','25db8845-fcf8-48f6-b161-d27cec26e2d2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',40.00,1,'One Size','http://localhost:8000/uploads/images-1770450991320.jpg','2026-02-07 08:29:45','2026-02-07 08:29:45','f2f1095a-fbf1-4bda-8e4d-c2cc771d0fb7'),('e70d46b6-2d95-4057-b4e7-657c4b1266bd','5f06cf7f-4ea4-4d96-8e8f-7e625a2afefa','Product 3',1000.00,5,'L-40','http://localhost:8000/uploads/image-1770070858641.png','2026-02-03 06:11:34','2026-02-03 06:11:34','1e678497-fd53-415a-88d0-fa547697eb2c'),('ecddbea0-3892-468d-954b-ee4e501f8dd0','6baea3e1-2a22-4646-82d6-96930045cbbd','dsf',123.00,3,'S-32','http://localhost:8000/uploads/images-1770286806725.png','2026-02-05 10:35:58','2026-02-05 10:35:58','35c5fa7a-7c31-4912-bc02-a16316cc6e2e');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` enum('inside','outside') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inside',
  `subtotal` decimal(10,2) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `paymentStatus` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Cash on Delivery',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('09d67408-b56a-4aa6-a9a8-77b2b2e7f0f5','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fg','outside',1024.00,120.00,1144.00,'Pending','Cash on Delivery','2026-02-06 07:59:43','2026-02-06 07:59:43'),('116935d4-40c7-49f4-a11d-73c0b1ca48d2','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','sdf','inside',5400.00,70.00,5470.00,'Cancelled','Cash on Delivery','2026-02-03 06:12:46','2026-02-03 06:53:46'),('13ab489a-bfff-43de-9476-2dab3ff5cd16','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fg','inside',2700.00,70.00,2770.00,'Pending','Cash on Delivery','2026-02-03 06:23:40','2026-02-04 12:35:18'),('25db8845-fcf8-48f6-b161-d27cec26e2d2','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','ccxv','inside',40.00,70.00,110.00,'Pending','Cash on Delivery','2026-02-07 08:29:45','2026-02-07 08:29:45'),('5f06cf7f-4ea4-4d96-8e8f-7e625a2afefa','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','ygii','inside',5000.00,70.00,5070.00,'Pending','Cash on Delivery','2026-02-03 06:11:34','2026-02-03 06:11:34'),('6baea3e1-2a22-4646-82d6-96930045cbbd','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fg','inside',615.00,70.00,685.00,'Pending','Cash on Delivery','2026-02-05 10:35:58','2026-02-05 10:35:58'),('b06d2b05-79d3-4601-aa9c-9247ace4fb9d','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fg','inside',2048.00,70.00,2118.00,'Processing','Cash on Delivery','2026-02-06 06:38:25','2026-02-07 08:03:52'),('c9704a74-9496-4500-8d78-3bc8e51dca1b','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','dfdfdsf','inside',100.00,70.00,170.00,'Delivered','Cash on Delivery','2026-02-07 08:31:33','2026-02-07 12:19:34'),('fef60966-b953-4fb9-9745-8d11b43ba5fd','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','ghgh','inside',3600.00,70.00,3670.00,'Pending','Cash on Delivery','2026-02-03 06:15:15','2026-02-04 12:46:18');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `_id` char(36) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'General',
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `images` json DEFAULT NULL,
  `description` text,
  `sizes` json DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('4a59efc2-088f-4042-92c9-7ba14786300d','dfs','dd',221.00,121.00,200,'[\"/uploads/images-1770450534976.png\", \"/uploads/images-1770450534980.png\"]','','[\"M-36\", \"L-40\"]','2026-02-07 07:48:54','2026-02-07 07:48:54'),('723a7417-370c-4355-9ab8-546d487a99d3','ed','ddd',10241.00,1000.00,7,'[\"/uploads/images-1770359857367.png\", \"/uploads/images-1770359857411.png\", \"/uploads/images-1770359857419.png\", \"/uploads/images-1770359857422.png\", \"/uploads/images-1770359857423.jpg\", \"/uploads/images-1770359857447.jpg\", \"/uploads/images-1770359857449.jpg\", \"/uploads/images-1770359857452.jpg\", \"/uploads/images-1770359857453.jpg\", \"/uploads/images-1770359857456.jpg\"]','dffd','[\"M-36\", \"L-40\", \"XL-44\", \"XXL-48\"]','2026-02-06 06:37:37','2026-02-07 07:46:06'),('8ca67177-dcf1-4275-99b3-8014e6fc8183','Rifat mc panjabi','Panjabi',200.00,150.00,1,'[\"/uploads/images-1770466949611.png\", \"/uploads/images-1770466949618.png\", \"/uploads/images-1770466949621.png\", \"/uploads/images-1770466949623.png\", \"/uploads/images-1770466949623.png\", \"/uploads/images-1770466949624.jpg\"]','This Panjabi is a local brand  ','[]','2026-02-07 12:22:29','2026-02-07 19:19:43'),('d675648e-d9c3-45d8-994b-7893b2d6f6ac','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu','123241',152.00,100.00,79,'[\"/uploads/images-1770450598127.jpg\"]','','[\"S-32\", \"L-40\", \"M-36\", \"XL-44\"]','2026-02-07 07:49:58','2026-02-07 08:31:33'),('f2f1095a-fbf1-4bda-8e4d-c2cc771d0fb7','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore','dsfa',54.00,40.00,119,'[\"/uploads/images-1770450991320.jpg\", \"/uploads/images-1770450991331.jpg\", \"/uploads/images-1770450991334.jpg\"]','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','[\"XL-44\", \"One Size\"]','2026-02-07 07:49:29','2026-02-07 08:29:45');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` int NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,45,'2026-02-02 04:09:47','2026-02-08 18:22:14');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23 20:49:09
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: modern-shop-application
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('unread','read') COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (2,'Md. Saiful Islam','saiful01741899@gmail.com','','Islam','dasfd','2026-02-01 16:53:59','2026-02-01 18:30:59','read'),(3,'Md. Saiful Islam','saiful01741899@gmail.com','','Islam','dfafds','2026-02-01 16:54:09','2026-02-01 18:04:09','read'),(12,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','amar sonar bangla ami toamay valO pai','2026-02-02 20:57:20','2026-02-02 20:57:38','read'),(13,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','fdsadfsa','2026-02-02 22:26:58','2026-02-02 22:27:16','read'),(14,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','afsdsdfadfsa','2026-02-06 06:33:31','2026-02-06 06:33:48','read');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `type` enum('slider','gallery') NOT NULL DEFAULT 'slider',
  `public_id` varchar(255) DEFAULT NULL COMMENT 'Used for Cloudinary/Firebase file deletion',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES ('1f402639-1f6b-43ad-86f4-77b2ba3a0b80','13ab489a-bfff-43de-9476-2dab3ff5cd16','Product 1',900.00,3,'L-40','http://localhost:8000/uploads/image-1770070777494.jpg','2026-02-03 06:23:40','2026-02-03 06:23:40','479ff713-3186-470b-9c4c-2a05a9801b8d'),('53826e49-cb8c-4ed4-b842-cd2074259587','3146c615-ef1f-463a-8410-23508cd777ef','product 2',1500.00,6,'L-40','http://localhost:8000/uploads/image-1770359366807.jpg','2026-02-06 06:30:34','2026-02-06 06:30:34','584db4ff-5e21-4341-b31c-b60d06c31c20'),('56e2a559-aafc-443b-a341-f4472820692f','fef60966-b953-4fb9-9745-8d11b43ba5fd','Product 1',900.00,2,'L-40','http://localhost:8000/uploads/image-1770070777494.jpg','2026-02-03 06:15:15','2026-02-03 06:15:15','479ff713-3186-470b-9c4c-2a05a9801b8d'),('57f6de7e-d9de-4ec9-97db-f0a56af7f5ae','116935d4-40c7-49f4-a11d-73c0b1ca48d2','fdsa',900.00,6,'XL-44','http://localhost:8000/uploads/image-1770070887644.png','2026-02-03 06:12:46','2026-02-03 06:12:46','8ba7d61e-244a-4974-8c16-67783f47bed3'),('781d5e61-886d-491f-9292-fb279345cf07','fef60966-b953-4fb9-9745-8d11b43ba5fd','fdsa',900.00,2,'L-40','http://localhost:8000/uploads/image-1770070887644.png','2026-02-03 06:15:15','2026-02-03 06:15:15','8ba7d61e-244a-4974-8c16-67783f47bed3'),('e70d46b6-2d95-4057-b4e7-657c4b1266bd','5f06cf7f-4ea4-4d96-8e8f-7e625a2afefa','Product 3',1000.00,5,'L-40','http://localhost:8000/uploads/image-1770070858641.png','2026-02-03 06:11:34','2026-02-03 06:11:34','1e678497-fd53-415a-88d0-fa547697eb2c');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` enum('inside','outside') COLLATE utf8mb4_unicode_ci DEFAULT 'inside',
  `subtotal` decimal(10,2) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `paymentStatus` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Cash on Delivery',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('116935d4-40c7-49f4-a11d-73c0b1ca48d2','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','sdf','inside',5400.00,70.00,5470.00,'Cancelled','Cash on Delivery','2026-02-03 06:12:46','2026-02-03 06:53:46'),('13ab489a-bfff-43de-9476-2dab3ff5cd16','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fg','inside',2700.00,70.00,2770.00,'Pending','Cash on Delivery','2026-02-03 06:23:40','2026-02-04 12:35:18'),('3146c615-ef1f-463a-8410-23508cd777ef','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','sdafdsa','inside',9000.00,70.00,9070.00,'Cancelled','Cash on Delivery','2026-02-06 06:30:34','2026-02-06 06:32:26'),('5f06cf7f-4ea4-4d96-8e8f-7e625a2afefa','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','ygii','inside',5000.00,70.00,5070.00,'Pending','Cash on Delivery','2026-02-03 06:11:34','2026-02-03 06:11:34'),('fef60966-b953-4fb9-9745-8d11b43ba5fd','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','ghgh','inside',3600.00,70.00,3670.00,'Pending','Cash on Delivery','2026-02-03 06:15:15','2026-02-04 12:46:18');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `_id` char(36) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'General',
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `sizes` json DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('13f9166d-f6e9-4ae0-be16-c97634a1df3f','panjabi2','ddd',1000.00,900.00,11,'/uploads/image-1770359312789.jpg','dsa','[\"S-32\", \"M-36\", \"L-40\", \"XL-44\"]','2026-02-06 06:28:32','2026-02-06 06:29:45'),('584db4ff-5e21-4341-b31c-b60d06c31c20','product 2','panjabi',2000.00,1500.00,100,'/uploads/image-1770359366807.jpg','ds','[\"M-36\", \"L-40\"]','2026-02-06 06:29:26','2026-02-06 06:32:26');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` int NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,40,'2026-02-02 04:09:47','2026-02-08 18:24:59');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23 20:49:09
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isRead` tinyint(1) DEFAULT '0' COMMENT '0: Unread, 1: Read',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23 20:49:09
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_project3_girls
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('unread','read') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (3,'Md. Saiful Islam','saiful01741899@gmail.com','','Islam','dfafds','2026-02-01 16:54:09','2026-02-01 18:04:09','read'),(12,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','amar sonar bangla ami toamay valO pai','2026-02-02 20:57:20','2026-02-02 20:57:38','read'),(13,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','fdsadfsa','2026-02-02 22:26:58','2026-02-02 22:27:16','read'),(14,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','amar sonar bangla ami tomay valo bashi','2026-02-08 19:26:47','2026-02-08 19:38:54','read'),(15,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','2026-02-08 20:49:48','2026-02-08 20:50:29','read'),(16,'Md. Saiful Islam','saiful01741899@gmail.com','4565651','Islamdsafd','amar sonar bangla','2026-02-17 17:57:55','2026-02-17 17:58:27','read');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `type` enum('slider','gallery') NOT NULL DEFAULT 'slider',
  `public_id` varchar(255) DEFAULT NULL COMMENT 'Used for Cloudinary/Firebase file deletion',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES ('2638a17b-bcc3-42b5-9b28-19f90612b0c9','slider','uploads/image-1770359159162.png','slider','image-1770359159162.png','2026-02-06 06:25:59','2026-02-06 06:25:59'),('31838a18-bc37-4920-91bb-5186c28699ba','asfd','uploads/image-1770578098802.png','gallery','image-1770578098802.png','2026-02-08 19:14:58','2026-02-08 19:14:58'),('39ce6ba6-2237-4790-85e1-4ed4ef475b5f','dd','uploads/image-1770578081655.png','gallery','image-1770578081655.png','2026-02-08 19:14:41','2026-02-08 19:14:41'),('4160591f-9987-49e8-ad14-934d15a66bd7','g','uploads/image-1770577989619.png','gallery','image-1770577989619.png','2026-02-08 19:13:09','2026-02-08 19:13:09'),('7201f746-3e60-43bc-93f4-644c07b8d8d5','fdf','uploads/image-1770578029353.png','gallery','image-1770578029353.png','2026-02-08 19:13:49','2026-02-08 19:13:49'),('754d33bc-c5db-419b-b0f6-668e8ea211cf','dd','uploads/image-1770578019408.png','gallery','image-1770578019408.png','2026-02-08 19:13:39','2026-02-08 19:13:39'),('815cf763-511d-4b1f-af04-e53ee156a863','gg','uploads/image-1770577973907.png','gallery','image-1770577973907.png','2026-02-08 19:12:53','2026-02-08 19:12:53'),('8640f141-5330-41de-b805-ab1fb79e2bda','dsa','uploads/image-1770578122629.png','gallery','image-1770578122629.png','2026-02-08 19:15:22','2026-02-08 19:15:22'),('897431c1-c5af-443e-8b03-5431d0e0f18e','efd','uploads/image-1770577997155.png','gallery','image-1770577997155.png','2026-02-08 19:13:17','2026-02-08 19:13:17'),('8a4d6ab3-7bd9-4eff-8502-0f47c0ad3f44','gallery','uploads/image-1770577952279.png','gallery','image-1770577952279.png','2026-02-08 19:12:32','2026-02-08 19:12:32'),('966587c7-1b01-4beb-9af2-94ed29b4097e','fds','uploads/image-1770578106066.png','gallery','image-1770578106066.png','2026-02-08 19:15:06','2026-02-08 19:15:06'),('998c2147-0ce7-4821-ac39-5972624a8690','sdfa','uploads/image-1770578005381.png','gallery','image-1770578005381.png','2026-02-08 19:13:25','2026-02-08 19:13:25'),('e58e5037-c427-48d0-9c59-63734eb7ee46','gg','uploads/image-1770578012799.png','gallery','image-1770578012799.png','2026-02-08 19:13:32','2026-02-08 19:13:32'),('ea499a78-4ef5-4d79-8cb1-f93ff9d6d983','slider 1','uploads/image-1770359125468.png','slider','image-1770359125468.png','2026-02-06 06:25:25','2026-02-06 06:25:25');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES ('06767152-3c65-4014-92c7-30c9849a2820','baa9062a-0a42-4d3b-afc4-8762d02e862c','also the leap into electronic typesetting, remaining',4000.00,1,'N/A','http://localhost:8000/uploads/images-1770577809374.png','2026-02-08 20:07:44','2026-02-08 20:07:44','1028df2a-ce5c-4d9e-88e1-a73d9d6c9071'),('2c4acb32-b96d-4829-853b-323817f3daa2','f0f2cf4c-4cb8-4263-b0ee-5221a005af29','also the leap into electronic typesetting, remaining',4000.00,1,'N/A','http://localhost:8000/uploads/images-1770577809374.png','2026-02-08 20:08:38','2026-02-08 20:08:38','1028df2a-ce5c-4d9e-88e1-a73d9d6c9071'),('47abf997-15bb-4df9-8997-3f6f715cac37','90dae9f7-488b-4663-ad07-378528792ad6',' type specimen book. It has survived not only five cent',1500.00,4,'N/A','http://localhost:8000/uploads/images-1770577420514.png','2026-02-08 20:11:02','2026-02-08 20:11:02','90d32bbc-5d12-418f-83e5-190e5f566f41'),('4d26df70-63cf-41e0-a617-29250dcd2f0f','c4559dd1-77db-4d57-bb3b-f2dfd27f527e',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining',900.00,4,'N/A','http://localhost:8000/uploads/images-1770577377701.png','2026-02-08 20:13:56','2026-02-08 20:13:56','34c884d1-1ee6-40c6-95ad-59625a64d90b'),('70202724-256c-4a91-bb1f-5037ddb8bc53','bbced4dc-a7ab-4d0b-b9f4-ea2070fa0571','uries, but also the leap into electronic typesetting, remaining',6000.00,1,'N/A','http://localhost:8000/uploads/images-1770582472856.png','2026-02-08 21:09:22','2026-02-08 21:09:22','9e083a64-9c51-4e5e-9de7-a434b8b0e832'),('c75fe819-a4fc-444c-804c-5ab2ed8b072c','bbced4dc-a7ab-4d0b-b9f4-ea2070fa0571','also the leap into electronic typesetting, remaining',4000.00,1,'N/A','http://localhost:8000/uploads/images-1770577809374.png','2026-02-08 21:09:22','2026-02-08 21:09:22','1028df2a-ce5c-4d9e-88e1-a73d9d6c9071'),('c9418361-be0f-4cd2-b476-6104ca918a0b','baa9062a-0a42-4d3b-afc4-8762d02e862c','Typesetting, remaining',1110.00,1,'N/A','http://localhost:8000/uploads/images-1770577541315.png','2026-02-08 20:07:44','2026-02-08 20:07:44','5e38e1fc-1f9d-4990-b6db-da8b5dbc5419'),('d9ce3eca-44b6-45e7-8264-28c7ee3f33ba','baa9062a-0a42-4d3b-afc4-8762d02e862c','Survived not only five centuries, but also the leap into electronic typesetting, remaining',1400.00,1,'N/A','http://localhost:8000/uploads/images-1770577626397.png','2026-02-08 20:07:44','2026-02-08 20:07:44','f62ee3aa-df81-48d2-a5f7-d4ec21f106bc'),('def65d89-4b40-42d5-8406-7d8c82830efd','0e835357-c4fe-45ac-8814-12336458202c','So the leap into electronic typesetting, remaining',1400.00,2,'N/A','http://localhost:8000/uploads/images-1770577777768.png','2026-02-08 20:09:27','2026-02-08 20:09:27','1ce56856-c8b7-4319-aaaf-9df79e16f636'),('e5f542e3-b47c-43bf-9e34-c358985da840','f304836c-441d-4fe7-85f8-365a73cf6b10','electronic typesetting, remaining',2500.00,1,'N/A','http://localhost:8000/uploads/images-1770577468015.png','2026-02-08 20:16:10','2026-02-08 20:16:10','ebf5aa85-6b6d-475f-8622-ec9ae2596a84'),('e7295118-3b8f-44bd-81d8-d1c9742cca00','8143da2f-b9a9-431b-a853-f24d1e58a219','uries, but also the leap into electronic typesetting, remaining',6000.00,1,'N/A','http://localhost:8000/uploads/images-1770582472856.png','2026-02-09 20:13:01','2026-02-09 20:13:01','9e083a64-9c51-4e5e-9de7-a434b8b0e832'),('ee8115cc-1b91-46fe-99b8-2dc60cdaca82','0211f04c-26ca-4fb4-9be1-65b574ed234c',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining',1500.00,1,'N/A','http://localhost:8000/uploads/images-1770577667250.png','2026-02-08 20:10:00','2026-02-08 20:10:00','5413b032-9a0d-41ee-9ff4-47f592d07bc2');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` enum('inside','outside') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inside',
  `subtotal` decimal(10,2) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `paymentStatus` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Cash on Delivery',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('0211f04c-26ca-4fb4-9be1-65b574ed234c','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','vort dite jabo narayangang','inside',1500.00,70.00,1570.00,'Delivered','Cash on Delivery','2026-02-08 20:10:00','2026-02-08 23:07:58'),('0e835357-c4fe-45ac-8814-12336458202c','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','south Banasree, khilgaon, Dhaka-1219','inside',2800.00,70.00,2870.00,'Cancelled','Cash on Delivery','2026-02-08 20:09:27','2026-02-08 20:16:44'),('8143da2f-b9a9-431b-a853-f24d1e58a219','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','fda','inside',6000.00,70.00,6070.00,'Pending','Cash on Delivery','2026-02-09 20:13:01','2026-02-09 20:13:01'),('90dae9f7-488b-4663-ad07-378528792ad6','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','amar sonar bangla ami tomay valo bashi','inside',6000.00,70.00,6070.00,'Processing','Cash on Delivery','2026-02-08 20:11:02','2026-02-08 20:16:55'),('baa9062a-0a42-4d3b-afc4-8762d02e862c','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','xsx','inside',6510.00,70.00,6580.00,'Delivered','Cash on Delivery','2026-02-08 20:07:44','2026-02-08 20:08:09'),('bbced4dc-a7ab-4d0b-b9f4-ea2070fa0571','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','dsvvcxc','outside',10000.00,120.00,10120.00,'Delivered','Cash on Delivery','2026-02-08 21:09:21','2026-02-08 21:09:52'),('c4559dd1-77db-4d57-bb3b-f2dfd27f527e','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','Hoglakanda, Araihazar, Narayangange,','inside',3600.00,70.00,3670.00,'Pending','Cash on Delivery','2026-02-08 20:13:56','2026-02-08 20:13:56'),('f0f2cf4c-4cb8-4263-b0ee-5221a005af29','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','zxc','inside',4000.00,70.00,4070.00,'Returned','Cash on Delivery','2026-02-08 20:08:38','2026-02-08 20:16:39'),('f304836c-441d-4fe7-85f8-365a73cf6b10','Saiful 12','jkbjhb','saiful01741899@gmail.com','4565651','Dhaka, Bangladesh','outside',2500.00,120.00,2620.00,'Pending','Cash on Delivery','2026-02-08 20:16:09','2026-02-08 20:16:09');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `_id` char(36) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'General',
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `images` json DEFAULT NULL,
  `description` text,
  `sizes` json DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('1028df2a-ce5c-4d9e-88e1-a73d9d6c9071','also the leap into electronic typesetting, remaining','sharee',5000.00,4000.00,0,'[\"/uploads/images-1770577809374.png\"]','','[]','2026-02-08 19:10:09','2026-02-08 21:09:22'),('1ce56856-c8b7-4319-aaaf-9df79e16f636','So the leap into electronic typesetting, remaining','sharee',1500.00,1400.00,4,'[\"/uploads/images-1770582512327.png\", \"/uploads/images-1770582512330.png\"]','','[]','2026-02-08 19:09:37','2026-02-08 20:28:32'),('34c884d1-1ee6-40c6-95ad-59625a64d90b',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining','girls',1000.00,900.00,16,'[\"/uploads/images-1770577377701.png\"]','','[]','2026-02-08 19:02:57','2026-02-08 20:13:56'),('397d3544-2b4d-4318-9479-f26253e23111','But also the leap into electronic typesetting, remaining','sharee',8000.00,7000.00,15,'[\"/uploads/images-1770582522968.png\", \"/uploads/images-1770582522985.png\"]','','[]','2026-02-08 19:09:05','2026-02-08 20:28:43'),('3c695954-b137-42ac-93b1-b53fdac7f490',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining','sharee',9000.00,0.00,4,'[\"/uploads/images-1770582432477.png\", \"/uploads/images-1770582432502.png\"]','\r\n\r\nfreestar\r\n\r\nfreestar\r\nWhat is Lorem Ipsum?\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. \r\n\r\nfreestar\r\n\r\nfreestar\r\nWhat is Lorem Ipsum?\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','[]','2026-02-08 19:11:05','2026-02-08 20:27:12'),('5413b032-9a0d-41ee-9ff4-47f592d07bc2',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining','sharee ',2000.00,1500.00,15,'[\"/uploads/images-1770582533538.png\", \"/uploads/images-1770582533540.png\"]','','[]','2026-02-08 19:07:47','2026-02-08 20:28:53'),('5e38e1fc-1f9d-4990-b6db-da8b5dbc5419','Typesetting, remaining','girls',1590.00,1110.00,13,'[\"/uploads/images-1770577541315.png\"]','','[]','2026-02-08 19:05:41','2026-02-08 20:07:44'),('89078e03-3be3-4c67-b200-b076dd6f611e','lorem 100','Lorem',400.00,300.00,15,'[\"/uploads/images-1770584662032.png\"]','','[]','2026-02-08 21:04:22','2026-02-08 21:05:44'),('90d32bbc-5d12-418f-83e5-190e5f566f41',' type specimen book. It has survived not only five cent','girls ',2000.00,1500.00,46,'[\"/uploads/images-1770577420514.png\"]','','[]','2026-02-08 19:03:40','2026-02-08 20:11:02'),('9612d16d-c4a1-41d4-89e2-ab01ab2464a6',' type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining','girls',1000.00,900.00,18,'[\"/uploads/images-1770577504928.png\"]','','[]','2026-02-08 19:05:04','2026-02-08 19:47:56'),('9e083a64-9c51-4e5e-9de7-a434b8b0e832','uries, but also the leap into electronic typesetting, remaining','sharee',6000.00,0.00,20,'[\"/uploads/images-1770582472856.png\", \"/uploads/images-1770582472858.png\"]','','[]','2026-02-08 19:10:38','2026-02-09 20:13:01'),('ebf5aa85-6b6d-475f-8622-ec9ae2596a84','electronic typesetting, remaining','girls',3000.00,2500.00,19,'[\"/uploads/images-1770577468015.png\"]','','[]','2026-02-08 19:04:19','2026-02-08 20:16:10'),('f62ee3aa-df81-48d2-a5f7-d4ec21f106bc','Survived not only five centuries, but also the leap into electronic typesetting, remaining','Sharee',1500.00,1400.00,0,'[\"/uploads/images-1770582545024.png\", \"/uploads/images-1770582545026.png\"]','','[]','2026-02-08 19:07:06','2026-02-08 20:29:05');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` int NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,55,'2026-02-02 04:09:47','2026-02-17 17:53:10');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23 20:49:09
