CREATE DATABASE `sisregex`;
USE `sisregex`;

CREATE TABLE `config_servico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `configurado` tinyint(1) DEFAULT NULL,
  `servico_ref` date NOT NULL,
  `sgtNomeGuerra` varchar(255) NOT NULL,
  `sgtTpArmamento` varchar(50) DEFAULT NULL,
  `sgtNrArmamento` varchar(50) DEFAULT NULL,
  `sgtQtdMun` varchar(10) DEFAULT NULL,
  `cbNomeGuerra` varchar(255) NOT NULL,
  `cbTpArmamento` varchar(50) DEFAULT NULL,
  `cbNrArmamento` varchar(50) DEFAULT NULL,
  `cbQtdMun` varchar(10) DEFAULT NULL,
  `motoristaNomeGuerra` varchar(255) DEFAULT NULL,
  `motoristaTpArmamento` varchar(50) DEFAULT NULL,
  `motoristaNrArmamento` varchar(50) DEFAULT NULL,
  `motoristaQtdMun` varchar(10) DEFAULT NULL,
  `sdPrimeiroHorNome` varchar(255) NOT NULL,
  `sdSegundoHorNome` varchar(255) NOT NULL,
  `sdTerceiroHorNome` varchar(255) NOT NULL,
  `paradaDiaria` text,
  `recebimentoServico` text,
  `pessoalServico` text,
  `consPonta` int DEFAULT NULL,
  `consFPonta` int DEFAULT NULL,
  `consTotal` int DEFAULT NULL,
  `consPontaAnterior` int DEFAULT NULL,
  `consFPontaAnterior` int DEFAULT NULL,
  `consTotalAnterior` int DEFAULT NULL,
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
  `correspondencias` text,
  `viaturas` text,
  `passagemServico` text,
  `relatorio_ronda_observacao` text,
  PRIMARY KEY (`id`)
);

CREATE TABLE `civis_pe` (
  `cpf` varchar(14) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_civis_pe` (`config_servico_id`),
  CONSTRAINT `fk_config_civis_pe` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

CREATE TABLE `civis_veiculo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cnh` varchar(50) DEFAULT NULL,
  `placa` varchar(8) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_pelotao_fora_expediente` (`config_servico_id`),
  CONSTRAINT `fk_config_civis_veiculo` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

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
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_oom_durante_expediente` (`config_servico_id`),
  CONSTRAINT `fk_config_oom_durante_expediente` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

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
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_oom_fora_expediente` (`config_servico_id`),
  CONSTRAINT `fk_config_oom_fora_expediente` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

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
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_oom_viatura` (`config_servico_id`),
  CONSTRAINT `fk_config_oom_viatura` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

CREATE TABLE `pelotao_durante_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_pelotao_durante_expediente` (`config_servico_id`),
  CONSTRAINT `fk_config_pelotao_durante_expediente` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

CREATE TABLE `pelotao_fora_expediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pg` varchar(20) DEFAULT NULL,
  `nomeGuerra` varchar(50) DEFAULT NULL,
  `idtMil` varchar(50) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `origem` varchar(50) DEFAULT NULL,
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_pelotao_fora_expediente` (`config_servico_id`),
  CONSTRAINT `fk_config_pelotao_fora_expediente` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

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
  `config_servico_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_pelotao_viatura` (`config_servico_id`),
  CONSTRAINT `fk_config_pelotao_viatura` FOREIGN KEY (`config_servico_id`) REFERENCES `config_servico` (`id`)
);

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `administrador` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `usuarios` VALUES ('plantao','plantao','Plantão da Hora',0),('admin','123','Administrador',1);