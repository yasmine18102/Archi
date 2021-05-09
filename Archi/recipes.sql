-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2021 at 11:03 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipes`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `label`) VALUES
(1, 'sweet'),
(2, 'salty'),
(3, 'cold');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `label`) VALUES
(1, 'choclate'),
(2, 'egg'),
(23, 'cheese');

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `serving` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `calories` int(11) NOT NULL,
  `preperationTime` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `label`, `description`, `serving`, `level`, `calories`, `preperationTime`, `categoryId`) VALUES
(1, 'cake', '200', 2, 1, 500, 60, 1),
(2, 'other', '200', 2, 3, 500, 60, 1),
(3, 'i don\'t know', 'this is a long description', 2, 3, 152, 60, 2),
(12, 'azdzad', 'azdzad', 695, 1, 541, 515, 3),
(13, 'azdzad', 'azdzad', 695, 1, 541, 515, 3),
(14, 'azdzad', 'azdzad', 695, 1, 541, 515, 3),
(15, 'aze', 'azeaz', 54, 2, 84, 854, 2),
(16, 'posted new', 'zadazdazd', 541, 2, 54, 515, 2),
(17, 'qsdf', 'qsdfqdsf', 55, 2, 6262, 6263, 3),
(22, 'ddddff', 'ddddff', 11, 1, 111, 111, 1),
(23, 'ddddff', 'ddddff', 11, 1, 111, 111, 1),
(24, 'ddddff', 'ddddff', 11, 1, 111, 111, 1),
(25, 'cccc', 'cccccc', 123, 2, 2333, 121, 2);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `recipeId` int(11) NOT NULL,
  `ingredientId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`recipeId`, `ingredientId`) VALUES
(1, 1),
(1, 2),
(14, 1),
(14, 2),
(15, 1),
(16, 1),
(16, 2),
(17, 1),
(17, 2),
(23, 1),
(23, 2),
(24, 1),
(24, 2),
(25, 1),
(25, 2),
(25, 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_991484dd8189182dafe91e44413` (`categoryId`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`recipeId`,`ingredientId`),
  ADD KEY `IDX_b67e81a9afa83f2ee13440175c` (`recipeId`),
  ADD KEY `IDX_d2bbcf7bab477bfdcec65465c0` (`ingredientId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `FK_991484dd8189182dafe91e44413` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `FK_b67e81a9afa83f2ee13440175ce` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d2bbcf7bab477bfdcec65465c0c` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
