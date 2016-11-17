-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2016 a las 15:08:44
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `abm`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarPersona`(IN `idp` INT(18))
    NO SQL
delete from persona	WHERE id=idp$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarPersona`(IN `pnombre` VARCHAR(50), IN `papellido` VARCHAR(50), IN `pdni` VARCHAR(50), IN `pfoto` VARCHAR(50))
    NO SQL
INSERT into persona (nombre,apellido,dni,foto)
values
(pnombre,papellido,pdni,pfoto)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarPersona`(IN `pid` INT, IN `pnombre` VARCHAR(50), IN `papellido` VARCHAR(50), IN `pfoto` VARCHAR(50))
    NO SQL
update persona 
				set nombre=pnombre,
				apellido=papellido,
				foto=pfoto
				WHERE id=pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerTodasLasPersonas`()
    NO SQL
select * from persona$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerUnaPersona`(IN `idp` INT(18))
    NO SQL
select * from persona where id =idp$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
`idPersona` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `email`, `password`, `perfil`, `foto`) VALUES
(57, 'vend', 'vend@vend.com', '321', 'vendedor', 'pordefecto.png'),
(58, 'admin', 'admin@admin.com', '321', 'administrador', 'pordefecto.png'),
(59, 'comprador', 'comp@comp.com', '123', 'comprador', 'pordefecto.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
`idProducto` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `precio` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `precio`) VALUES
(27, 'Pizza ahumada', 129),
(28, 'Pizza anchoas', 220),
(30, 'Pizza campesina', 180),
(31, 'Pizza atun', 250),
(32, 'Pizza cebolla', 150),
(33, 'Pizza champinon', 255),
(34, 'Pizza chilena', 145),
(35, 'Pizza de la casa', 125),
(36, 'Pizza huevo', 135),
(37, 'Pizza jamon y morron', 165),
(38, 'Pizza light', 150),
(39, 'Pizza mexicana', 180),
(40, 'Pizza noruega', 200),
(41, 'Pizza siciliana', 195),
(43, 'producto', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
 ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
 ADD PRIMARY KEY (`idProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
