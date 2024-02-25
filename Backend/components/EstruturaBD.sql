CREATE DATABASE `sisregex`;
USE `sisregex`;

CREATE TABLE `bk_civis_pe` (
  `cpf` varchar(14) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

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
);

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
);

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
);

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
);

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
);

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
);

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
);

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
);

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
);

CREATE TABLE `civis_pe` (
  `cpf` varchar(14) DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
);

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
);

INSERT INTO `relatorio_parte_sgt` VALUES (1,'Parada Diária Valor','Recebimento Serviço Valor','Pessoal Serviço Valor',123,456,789,'Rancho Valor','Lixeiras Valor','Arma e Munição Valor','Dependências Valor','Claviculário Valor','Bomba de Água Valor','Revista Recolher Valor','Radios Valor','Câmeras Valor','Material de Carga Valor','Ocorrências Valor','Correspondências Valor','Viaturas Valor','Passagem de Serviço Valor',111,222,333);

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
);

INSERT INTO `relatorio_roteiro_guarda` VALUES (1,'NomeGuerra_SGT','TipoArmamento_SGT','NrArmamento_SGT','14','NomeGuerra_CB','TipoArmamento_CB','NrArmamento_CB','14',NULL,NULL,NULL,NULL,'QuartoHorNome_SD','PrimeiroHorNome_SD','SegundoHorNome_SD','TerceiroHorNome_SD','Observacoes da ronda...');

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `administrador` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `usuarios` VALUES (1,'plantao','plantao','Plantão',0),(2,'admin','admin@2023','Administrador',1);
