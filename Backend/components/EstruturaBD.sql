CREATE DATABASE  IF NOT EXISTS `sisregex` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sisregex`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sisregex
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `bk_civis_pe`
--

DROP TABLE IF EXISTS `bk_civis_pe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_civis_pe` (
  `cpf` varchar(14) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_civis_veiculo`
--

DROP TABLE IF EXISTS `bk_civis_veiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_civis_veiculo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cnh` varchar(50) DEFAULT NULL,
  `placa` varchar(8) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_oom_durante_expediente`
--

DROP TABLE IF EXISTS `bk_oom_durante_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_oom_durante_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `om` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_oom_fora_expediente`
--

DROP TABLE IF EXISTS `bk_oom_fora_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_oom_fora_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `om` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_oom_viatura`
--

DROP TABLE IF EXISTS `bk_oom_viatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_oom_viatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vtr` varchar(20) DEFAULT NULL,
  `odmEntrada` varchar(20) DEFAULT NULL,
  `odmSaida` varchar(20) DEFAULT NULL,
  `dataRegistro` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `motorista` varchar(50) DEFAULT NULL,
  `chefeVtr` varchar(50) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_pelotao_durante_expediente`
--

DROP TABLE IF EXISTS `bk_pelotao_durante_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_pelotao_durante_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_pelotao_fora_expediente`
--

DROP TABLE IF EXISTS `bk_pelotao_fora_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_pelotao_fora_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_pelotao_viatura`
--

DROP TABLE IF EXISTS `bk_pelotao_viatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_pelotao_viatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vtr` varchar(20) DEFAULT NULL,
  `odmEntrada` varchar(20) DEFAULT NULL,
  `odmSaida` varchar(20) DEFAULT NULL,
  `dataRegistro` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `motorista` varchar(50) DEFAULT NULL,
  `chefeVtr` varchar(50) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_relatorio_parte_sgt`
--

DROP TABLE IF EXISTS `bk_relatorio_parte_sgt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_relatorio_parte_sgt` (
  `id` int NOT NULL DEFAULT '0',
  `paradaDiaria` text,
  `recebimentoServico` text,
  `pessoalServico` text,
  `consPonta` int DEFAULT NULL,
  `consFPonta` int DEFAULT NULL,
  `consTotal` int DEFAULT NULL,
  `rancho` text,
  `lixeiras` text,
  `armtMunicao` text,
  `dependencias` text,
  `claviculario` text,
  `bombaAgua` text,
  `revistaRecolher` text,
  `radios` text,
  `cameras` text,
  `materialCarga` text,
  `ocorrencias` text,
  `correspondencias` text NOT NULL,
  `viaturas` text,
  `passagemServico` text,
  `consPontaAnterior` int NOT NULL,
  `consFPontaAnterior` int NOT NULL,
  `consTotalAnterior` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bk_relatorio_roteiro_guarda`
--

DROP TABLE IF EXISTS `bk_relatorio_roteiro_guarda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bk_relatorio_roteiro_guarda` (
  `id` int NOT NULL DEFAULT '0',
  `sgtNomeGuerra` varchar(100) DEFAULT NULL,
  `sgtTpArmamento` varchar(50) DEFAULT NULL,
  `sgtNrArmamento` varchar(50) DEFAULT NULL,
  `sgtQtdMun` varchar(10) DEFAULT NULL,
  `cbNomeGuerra` varchar(100) DEFAULT NULL,
  `cbTpArmamento` varchar(50) DEFAULT NULL,
  `cbNrArmamento` varchar(50) DEFAULT NULL,
  `cbQtdMun` varchar(10) DEFAULT NULL,
  `sdNomeGuerra` varchar(100) DEFAULT NULL,
  `sdTpArmamento` varchar(50) DEFAULT NULL,
  `sdNrArmamento` varchar(50) DEFAULT NULL,
  `sdQtdMun` varchar(10) DEFAULT NULL,
  `sdQuartoHorNome` varchar(100) DEFAULT NULL,
  `sdPrimeiroHorNome` varchar(100) DEFAULT NULL,
  `sdSegundoHorNome` varchar(100) DEFAULT NULL,
  `sdTerceiroHorNome` varchar(100) DEFAULT NULL,
  `relatorio_ronda_observacao` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `civis_pe`
--

DROP TABLE IF EXISTS `civis_pe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civis_pe` (
  `cpf` varchar(14) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `civis_veiculo`
--

DROP TABLE IF EXISTS `civis_veiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civis_veiculo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cnh` varchar(50) DEFAULT NULL,
  `placa` varchar(8) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oom_durante_expediente`
--

DROP TABLE IF EXISTS `oom_durante_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oom_durante_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `om` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oom_fora_expediente`
--

DROP TABLE IF EXISTS `oom_fora_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oom_fora_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `om` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oom_viatura`
--

DROP TABLE IF EXISTS `oom_viatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oom_viatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vtr` varchar(20) DEFAULT NULL,
  `odmEntrada` varchar(20) DEFAULT NULL,
  `odmSaida` varchar(20) DEFAULT NULL,
  `dataRegistro` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `motorista` varchar(50) DEFAULT NULL,
  `chefeVtr` varchar(50) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pelotao_durante_expediente`
--

DROP TABLE IF EXISTS `pelotao_durante_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelotao_durante_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pelotao_fora_expediente`
--

DROP TABLE IF EXISTS `pelotao_fora_expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelotao_fora_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pelotao_viatura`
--

DROP TABLE IF EXISTS `pelotao_viatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelotao_viatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vtr` varchar(20) DEFAULT NULL,
  `odmEntrada` varchar(20) DEFAULT NULL,
  `odmSaida` varchar(20) DEFAULT NULL,
  `dataRegistro` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `motorista` varchar(50) DEFAULT NULL,
  `chefeVtr` varchar(50) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relatorio_parte_sgt`
--

DROP TABLE IF EXISTS `relatorio_parte_sgt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorio_parte_sgt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paradaDiaria` text,
  `recebimentoServico` text,
  `pessoalServico` text,
  `consPonta` int DEFAULT NULL,
  `consFPonta` int DEFAULT NULL,
  `consTotal` int DEFAULT NULL,
  `rancho` text,
  `lixeiras` text,
  `armtMunicao` text,
  `dependencias` text,
  `claviculario` text,
  `bombaAgua` text,
  `revistaRecolher` text,
  `radios` text,
  `cameras` text,
  `materialCarga` text,
  `ocorrencias` text,
  `correspondencias` text NOT NULL,
  `viaturas` text,
  `passagemServico` text,
  `consPontaAnterior` int NOT NULL,
  `consFPontaAnterior` int NOT NULL,
  `consTotalAnterior` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relatorio_roteiro_guarda`
--

DROP TABLE IF EXISTS `relatorio_roteiro_guarda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorio_roteiro_guarda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sgtNomeGuerra` varchar(100) DEFAULT NULL,
  `sgtTpArmamento` varchar(50) DEFAULT NULL,
  `sgtNrArmamento` varchar(50) DEFAULT NULL,
  `sgtQtdMun` varchar(10) DEFAULT NULL,
  `cbNomeGuerra` varchar(100) DEFAULT NULL,
  `cbTpArmamento` varchar(50) DEFAULT NULL,
  `cbNrArmamento` varchar(50) DEFAULT NULL,
  `cbQtdMun` varchar(10) DEFAULT NULL,
  `sdNomeGuerra` varchar(100) DEFAULT NULL,
  `sdTpArmamento` varchar(50) DEFAULT NULL,
  `sdNrArmamento` varchar(50) DEFAULT NULL,
  `sdQtdMun` varchar(10) DEFAULT NULL,
  `sdQuartoHorNome` varchar(100) DEFAULT NULL,
  `sdPrimeiroHorNome` varchar(100) DEFAULT NULL,
  `sdSegundoHorNome` varchar(100) DEFAULT NULL,
  `sdTerceiroHorNome` varchar(100) DEFAULT NULL,
  `relatorio_ronda_observacao` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-04 12:07:32
