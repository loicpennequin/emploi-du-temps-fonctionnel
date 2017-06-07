-- phpMyAdmin SQL Dump
-- version 4.6.5.2deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 01, 2017 at 02:36 PM
-- Server version: 5.6.30-1
-- PHP Version: 7.0.16-3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `planning`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidats`
--

CREATE TABLE `candidats` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `formation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidats`
--

INSERT INTO `candidats` (`id`, `firstname`, `lastname`, `formation_id`) VALUES
(2, 'John', 'Doe', 1),
(3, 'Jane', 'Doe', 1);

-- --------------------------------------------------------

--
-- Table structure for table `candidats_courses`
--

CREATE TABLE `candidats_courses` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `candidat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `candidats_courses`
--

INSERT INTO `candidats_courses` (`id`, `course_id`, `candidat_id`) VALUES
(1, 2, 2),
(2, 12, 3),
(3, 12, 3),
(4, 5, 2),
(5, 10, 2),
(6, 13, 2),
(7, 1, 2),
(8, 14, 2),
(9, 14, 3),
(10, 14, 3),
(11, 10, 3),
(12, 15, 2);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `day_id`, `topic_id`, `room_id`, `start`, `end`) VALUES
(1, 1, 3, 1, '2017-05-31 06:00:04', '2017-05-31 08:00:04'),
(2, 1, 1, 1, '2017-05-31 10:00:27', '2017-05-31 12:00:27'),
(3, 2, 3, 2, '2017-05-31 06:00:03', '2017-05-31 08:00:03'),
(4, 3, 1, 2, '2017-05-31 07:00:03', '2017-05-31 08:00:03'),
(5, 2, 1, 1, '2017-05-30 08:00:19', '2017-05-30 10:00:19'),
(10, 3, 3, 2, '2017-05-31 08:00:44', '2017-05-31 09:00:44'),
(11, 3, 3, 1, '2017-05-31 13:00:37', '2017-05-31 14:00:37'),
(12, 2, 3, 1, '2017-05-31 14:00:42', '2017-05-31 15:00:42'),
(13, 1, 3, 2, '2017-06-01 08:00:50', '2017-06-01 10:00:50'),
(14, 5, 1, 2, '2017-06-01 11:00:01', '2017-06-01 13:00:01'),
(15, 56, 4, 2, '2017-06-01 10:00:06', '2017-06-01 11:00:06');

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int(11) NOT NULL,
  `week_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`id`, `week_id`, `name`) VALUES
(1, 1, 'lundi'),
(2, 1, 'mardi'),
(3, 1, 'mercredi'),
(4, 1, 'jeudi'),
(5, 1, 'vendredi'),
(6, 5, 'lundi'),
(7, 5, 'mardi'),
(8, 5, 'mercredi'),
(9, 5, 'jeudi'),
(10, 5, 'vendredi'),
(46, 13, 'lundi'),
(47, 13, 'mardi'),
(48, 13, 'mercredi'),
(49, 13, 'jeudi'),
(50, 13, 'vendredi'),
(51, 14, 'lundi'),
(52, 14, 'mardi'),
(53, 14, 'mercredi'),
(54, 14, 'jeudi'),
(55, 14, 'vendredi'),
(56, 15, 'lundi'),
(57, 15, 'mardi'),
(58, 15, 'mercredi'),
(59, 15, 'jeudi'),
(60, 15, 'vendredi');

-- --------------------------------------------------------

--
-- Table structure for table `formations`
--

CREATE TABLE `formations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `formations`
--

INSERT INTO `formations` (`id`, `name`) VALUES
(1, 'Organisme1');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `formation_id`) VALUES
(1, 'Salle1', 1),
(2, 'Salle 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `color` varchar(20) NOT NULL,
  `formation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `name`, `color`, `formation_id`) VALUES
(1, 'SSIAP', '#7bd148', 1),
(3, 'SST', '#46d6db', 1),
(4, 'Maths', '#E34D52', 1);

-- --------------------------------------------------------

--
-- Table structure for table `weeks`
--

CREATE TABLE `weeks` (
  `id` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `formation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `weeks`
--

INSERT INTO `weeks` (`id`, `start`, `end`, `formation_id`) VALUES
(1, '2017-05-22', '2017-05-28', 1),
(5, '2017-05-28', '2017-06-03', 1),
(13, '2017-06-04', '2017-06-10', 1),
(14, '2017-06-11', '2017-06-17', 1),
(15, '2017-06-18', '2017-06-24', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidats`
--
ALTER TABLE `candidats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_id` (`formation_id`);

--
-- Indexes for table `candidats_courses`
--
ALTER TABLE `candidats_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_id` (`course_id`),
  ADD KEY `candidat_id` (`candidat_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `day_id` (`day_id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `week_id` (`week_id`);

--
-- Indexes for table `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_id` (`formation_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_id` (`formation_id`),
  ADD KEY `formation_id_2` (`formation_id`);

--
-- Indexes for table `weeks`
--
ALTER TABLE `weeks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `org_id` (`formation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidats`
--
ALTER TABLE `candidats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `candidats_courses`
--
ALTER TABLE `candidats_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `formations`
--
ALTER TABLE `formations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `weeks`
--
ALTER TABLE `weeks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `days`
--
ALTER TABLE `days`
  ADD CONSTRAINT `days_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `weeks` (`id`);

--
-- Constraints for table `weeks`
--
ALTER TABLE `weeks`
  ADD CONSTRAINT `weeks_ibfk_1` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
