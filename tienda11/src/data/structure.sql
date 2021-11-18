CREATE TABLE `carrito` (
  `ID_Carrito` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Comprador` varchar(100) DEFAULT NULL,
  `Cant_Items_Total` int(11) NOT NULL DEFAULT 0,
  `Precio_Total` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.marca definition

CREATE TABLE `marca` (
  `ID_Marca` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.categoria definition

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.color definition

CREATE TABLE `color` (
  `ID_Color` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.producto definition

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Imagen` varchar(100) NOT NULL,
  `Descuento` int(11) DEFAULT 0,
  `Precio` float NOT NULL,
  `ID_Marca` int(11) NOT NULL,
  PRIMARY KEY (`ID_Producto`),
  KEY `producto_FK` (`ID_Marca`),
  CONSTRAINT `producto_FK` FOREIGN KEY (`ID_Marca`) REFERENCES `marca` (`ID_Marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.usuario definition

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Imagen` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contraseña` varchar(500) NOT NULL,
  `ID_Carrito` int(11) NOT NULL,
  PRIMARY KEY (`ID_Usuario`),
  KEY `usuario_FK` (`ID_Carrito`),
  CONSTRAINT `usuario_FK` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.categoriaporproducto definition

CREATE TABLE `categoriaporproducto` (
  `ID_CategoriaPorProducto` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Categoria` int(11) NOT NULL,
  PRIMARY KEY (`ID_CategoriaPorProducto`),
  KEY `categoriaPorProducto_FK` (`ID_Producto`),
  KEY `categoriaPorProducto_FK_1` (`ID_Categoria`),
  CONSTRAINT `categoriaPorProducto_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `categoriaPorProducto_FK_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.colorporproducto definition

CREATE TABLE `colorporproducto` (
  `ID_ColorPorProducto` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Color` int(11) NOT NULL,
  PRIMARY KEY (`ID_ColorPorProducto`),
  KEY `colorPorProducto_FK` (`ID_Producto`),
  KEY `colorPorProducto_FK_1` (`ID_Color`),
  CONSTRAINT `colorPorProducto_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `colorPorProducto_FK_1` FOREIGN KEY (`ID_Color`) REFERENCES `color` (`ID_Color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.productoencarrito definition

CREATE TABLE `productoencarrito` (
  `ID_ProductoEnCarrito` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Carrito` int(11) NOT NULL,
  `Cant_Producto` int(11) NOT NULL DEFAULT 0,
  `Precio` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID_ProductoEnCarrito`),
  KEY `productoEnCarrito_FK` (`ID_Producto`),
  KEY `productoEnCarrito_FK_1` (`ID_Carrito`),
  CONSTRAINT `productoEnCarrito_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `productoEnCarrito_FK_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;