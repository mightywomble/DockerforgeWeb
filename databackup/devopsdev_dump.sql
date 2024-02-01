-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: devopsdev
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `devopsdev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `devopsdev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `devopsdev`;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `run` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (13,'ansible','22.1','apt install ansible'),(14,'ansible','22.0','apt install ansible'),(15,'ansible','21.0','apt install ansible'),(16,'ansible','20.0','apt install ansible'),(17,'terraform','15','wget https://download.terraform.com/15/terraform.tar.gz && tar -xzvf terrraform.tar.gz && mv terraform/terraform /usr/local/bin/'),(18,'terraform','16','wget https://download.terraform.com/16/terraform.tar.gz && tar -xzvf terrraform.tar.gz && mv terraform/terraform /usr/local/bin/'),(19,'terraform','17','wget https://download.terraform.com/17/terraform.tar.gz && tar -xzvf terrraform.tar.gz && mv terraform/terraform /usr/local/bin/'),(21,'rust','1.0','apt get install rust'),(22,'rust','1.1','apt get install rust'),(23,'rust','1.2.1.3','apt get install rust'),(24,'rust','2.0','apt get install rust2'),(25,'go','11.1','apt get install go-software'),(26,'go','11.2','apt get install go-software'),(27,'go','11.3','apt get install go-software'),(28,'go','11.4','apt get install go-software'),(29,'vscode','12.01','apt install code'),(30,'vscode','13:00','apt install code');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baseimage`
--

DROP TABLE IF EXISTS `baseimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baseimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `version` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baseimage`
--

LOCK TABLES `baseimage` WRITE;
/*!40000 ALTER TABLE `baseimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `baseimage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-28 18:45:54
