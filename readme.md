# Backend API - Ecommerce Project: Katy's Store

Este es el backend de una aplicación de venta de discos de vinilo que maneja usuarios, productos, carritos de compras y tickets. La aplicación está construida con Node.js, Express, y MongoDB, utilizando JWT para la autenticación de usuarios.

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características
- **Gestión de usuarios**: Registro, inicio de sesión, y gestión de sesiones.
- **Gestión de productos**: Creación, actualización, eliminación y visualización de productos.
- **Gestión de carritos**: Adición, eliminación y actualización de productos en los carritos de los usuarios.
- **Gestión de tickets**: Generación de tickets de compra.
- **Autenticación**: Autenticación basada en JWT para rutas protegidas.

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para crear el servidor web.
- **MongoDB**: Base de datos NoSQL para almacenar datos de usuarios, productos, carritos y tickets.
- **Mongoose**: ODM para interactuar con MongoDB.
- **Passport**: Middleware para la autenticación de usuarios.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios basada en tokens.

## Requisitos Previos
- **Node.js**: Versión 14 o superior.
- **MongoDB**: Una instancia local o remota de MongoDB.
- **Git**: Para clonar el repositorio (opcional).

## Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. **Instalar dependencias:**
   ```bash
   npm install  

3. **Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto y define las siguientes variables:**
   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=tu_secreto_para_jwt
   NODE_ENV=development

4. **Ejecutar la aplicación:**
   ```bash
   npm run dev

## Uso y Endpoints Disponibles
 Autenticación de Usuarios

    POST /api/sessions/register : Registro de nuevos usuarios.
    POST /api/sessions/login : Inicio de sesión de usuarios.
    GET /api/sessions/logout : Cierre de sesión de usuarios.

Gestión de Productos

    GET /api/products: Obtener todos los productos.
    GET /api/products/ : Obtener producto por ID.
    POST /api/products : Crear un nuevo producto (requiere rol de administrador).
    PUT /api/products/ : Actualizar un producto existente (requiere rol de administrador).
    DELETE /api/products/ : Eliminar un producto (requiere rol de administrador).

Gestión de Carritos

    POST /api/carts: Crear un nuevo carrito.
    GET /api/carts/ : Obtener un carrito por ID.
    PUT /api/carts/
    /product/ : Agregar un producto al carrito.
    PUT /api/carts/ : Actualizar productos en un carrito.
    DELETE /api/carts/
    /product/ : Eliminar un producto de un carrito.
    DELETE /api/carts/ : Limpiar un carrito.
    POST /api/carts/
    /purchase : Realizar una compra con el carrito.

Gestión de Tickets

    POST /api/tickets: Crear un nuevo ticket.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

    Haz un fork del repositorio.
    Crea una rama (git checkout -b feature-nueva-caracteristica).
    Realiza tus cambios y haz commit (git commit -m 'Agregar nueva característica').
    Sube tus cambios (git push origin feature-nueva-caracteristica).
    Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT.