-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  jeu. 08 juin 2017 à 09:58
-- Version du serveur :  5.7.18-log
-- Version de PHP :  7.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `planning`
--
CREATE DATABASE IF NOT EXISTS `planning` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `planning`;

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

DROP TABLE IF EXISTS `candidats`;
CREATE TABLE IF NOT EXISTS `candidats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `formation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formation_id` (`formation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidats`
--

INSERT INTO `candidats` (`id`, `firstname`, `lastname`, `formation_id`) VALUES
(2, 'John', 'Doe', 1),
(3, 'Jane', 'Doe', 1),
(4, 'Lorem', 'Ipsum', 2);

-- --------------------------------------------------------

--
-- Structure de la table `candidats_courses`
--

DROP TABLE IF EXISTS `candidats_courses`;
CREATE TABLE IF NOT EXISTS `candidats_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `candidat_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formation_id` (`course_id`),
  KEY `candidat_id` (`candidat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `candidats_courses`
--

INSERT INTO `candidats_courses` (`id`, `course_id`, `candidat_id`) VALUES
(30, 56, 2);

-- --------------------------------------------------------

--
-- Structure de la table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `start` datetime(3) NOT NULL,
  `end` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `day_id` (`day_id`),
  KEY `topic_id` (`topic_id`),
  KEY `room_id` (`room_id`),
  KEY `teacher_id` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `courses`
--

INSERT INTO `courses` (`id`, `day_id`, `topic_id`, `room_id`, `teacher_id`, `start`, `end`) VALUES
(56, 101, 4, 1, 3, '1000-01-01 10:00:00.000', '1000-01-01 12:00:00.000');

-- --------------------------------------------------------

--
-- Structure de la table `days`
--

DROP TABLE IF EXISTS `days`;
CREATE TABLE IF NOT EXISTS `days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `week_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `week_id` (`week_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `days`
--

INSERT INTO `days` (`id`, `week_id`) VALUES
(101, 25),
(102, 25),
(103, 25),
(104, 25),
(105, 25),
(106, 26),
(107, 26),
(108, 26),
(109, 26),
(110, 26);

-- --------------------------------------------------------

--
-- Structure de la table `formations`
--

DROP TABLE IF EXISTS `formations`;
CREATE TABLE IF NOT EXISTS `formations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `name`) VALUES
(1, 'Organisme1'),
(2, 'Organisme 2');

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formation_id` (`formation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `formation_id`) VALUES
(1, 'Salle1', 1),
(2, 'Salle 2', 1);

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `formation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachers`
--

INSERT INTO `teachers` (`id`, `firstname`, `lastname`, `formation_id`) VALUES
(2, 'Jane', 'Doe', 1),
(3, 'Toto', 'titi', 1),
(6, 'John', 'Doe', 1),
(7, 'lorem', 'ipsum', 1);

-- --------------------------------------------------------

--
-- Structure de la table `teachers_topics`
--

DROP TABLE IF EXISTS `teachers_topics`;
CREATE TABLE IF NOT EXISTS `teachers_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachers_topics`
--

INSERT INTO `teachers_topics` (`id`, `teacher_id`, `topic_id`) VALUES
(1, 2, 1),
(2, 2, 3),
(3, 3, 1),
(4, 3, 5),
(5, 3, 3),
(6, 3, 4),
(10, 6, 1),
(11, 6, 5),
(12, 6, 3),
(13, 7, 4);

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `color` varchar(20) NOT NULL,
  `formation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formation_id` (`formation_id`),
  KEY `formation_id_2` (`formation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `topics`
--

INSERT INTO `topics` (`id`, `name`, `color`, `formation_id`) VALUES
(1, 'SSIAP', '#7bd148', 1),
(3, 'SST', '#46d6db', 1),
(4, 'Maths', '#E34D52', 1),
(5, 'Palpation', '#fbd75b', 1),
(6, 'SST', '#5484ed', 2),
(7, 'SSIAP', '#FB875B', 2);

-- --------------------------------------------------------

--
-- Structure de la table `weeks`
--

DROP TABLE IF EXISTS `weeks`;
CREATE TABLE IF NOT EXISTS `weeks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `formation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `org_id` (`formation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `weeks`
--

INSERT INTO `weeks` (`id`, `start`, `end`, `formation_id`) VALUES
(25, '2017-06-12', '2017-06-18', 1),
(26, '2017-06-19', '2017-06-25', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `days`
--
ALTER TABLE `days`
  ADD CONSTRAINT `days_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `weeks` (`id`);

--
-- Contraintes pour la table `weeks`
--
ALTER TABLE `weeks`
  ADD CONSTRAINT `weeks_ibfk_1` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
