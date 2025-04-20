## 1. Descripción

Este sistema de gestión de biblioteca permite a los usuarios gestionar libros en una base de datos. Las funcionalidades incluyen la posibilidad de ver, agregar, editar y eliminar libros. Además, los usuarios pueden realizar búsquedas por título o autor, y filtrar los libros para mostrar solo aquellos que tienen copias disponibles.

El sistema está compuesto por un frontend desarrollado con React, un backend construido con Django, y una base de datos PostgreSQL. Todo el proyecto está containerizado utilizando Docker para facilitar su despliegue y ejecución en cualquier entorno.

El sistema está diseñado para ser simple, eficiente y fácil de usar, permitiendo una gestión completa de los libros en una biblioteca, tanto para administradores como para usuarios que necesiten consultar información sobre los libros disponibles.

## 2. Tecnologías Utilizadas

El proyecto utiliza las siguientes tecnologías principales para su desarrollo:

- **Frontend**:
  - **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
  - **React Router**: Librería para manejar la navegación entre páginas dentro de la aplicación.
  - **Bootstrap**: Framework CSS para la creación de interfaces de usuario con un diseño responsivo y estilizado.

- **Backend**:
  - **Django**: Framework web de Python para la creación de aplicaciones web robustas y seguras.
  - **Django REST Framework**: Conjunto de herramientas para construir API RESTful en Django.

- **Base de Datos**:
  - **PostgreSQL**: Sistema de gestión de bases de datos relacional de código abierto.

- **Docker**:
  - **Docker**: Plataforma que permite la creación, despliegue y ejecución de aplicaciones dentro de contenedores.
  - **Docker Compose**: Herramienta para definir y ejecutar aplicaciones multicontenedor con Docker.

Este stack tecnológico asegura un sistema flexible, escalable y fácil de desplegar, permitiendo que tanto el frontend como el backend trabajen de manera eficiente e integrada.



## 3. Requisitos Previos

Para poder ejecutar y desarrollar este sistema de gestión de biblioteca, es necesario tener instalados los siguientes programas y herramientas:

  **1. Node.js**: 
   - [Descargar Node.js](https://nodejs.org/) - Necesario para ejecutar el frontend de la aplicación.
   - Verifica la instalación de Node.js ejecutando el siguiente comando:
     ```bash
     node -v
     ```

  **2. Python 3.x**:
   - [Descargar Python](https://www.python.org/downloads/) - Requerido para el backend desarrollado con Django.
   - Verifica la instalación de Python ejecutando:
     ```bash
     python --version
     ```

  **3. Docker y Docker Compose**:
   - [Instalar Docker](https://docs.docker.com/get-docker/) - Docker es necesario para la containerización de la aplicación.
   - Verifica la instalación de Docker ejecutando:
     ```bash
     docker --version
     ```
   - Docker Compose es necesario para orquestar los contenedores y levantar el stack completo.
   - Verifica la instalación de Docker Compose ejecutando:
     ```bash
     docker-compose --version
     ```

  **4. PostgreSQL** (opcional si se va a usar contenedor de Docker):
   - Si decides no usar el contenedor de PostgreSQL de Docker, deberás tener PostgreSQL instalado localmente. 
   - [Descargar PostgreSQL](https://www.postgresql.org/download/)

  **5. Editor de código (opcional pero recomendado)**:
   - [Visual Studio Code](https://code.visualstudio.com/) o cualquier otro editor de código de tu preferencia para editar los archivos del proyecto.
   
---

Una vez que tengas estas herramientas instaladas, podrás proceder a ejecutar y desarrollar el sistema de gestión de biblioteca en tu entorno local.


## 4.Descripción de las carpetas y archivos clave:

**1. `backend/`**:
   - Contiene todo el código del backend desarrollado con Django.
   - **`manage.py`**: Archivo para ejecutar comandos de Django, como `runserver` para iniciar el servidor.
   - **`library_api/`**: Carpeta donde se encuentra la configuración y lógica principal de Django.
     - **`settings.py`**: Contiene la configuración de la base de datos, middleware, aplicaciones instaladas, etc.
     - **`urls.py`**: Define las rutas para las vistas del backend.
     - **`views.py`**: Contiene la lógica de las vistas de la API, como las operaciones CRUD de los libros.
   - **`requirements.txt`**: Listado de dependencias para instalar en el entorno de desarrollo Python.
   - **`Dockerfile`**: Archivo para crear la imagen Docker del backend.

**2. `frontend/`**:
   - Contiene el código del frontend desarrollado con React.
   - **`src/`**: Carpeta con los archivos fuente de React.
     - **`components/`**: Componentes clave de la aplicación, como el listado de libros y formularios de edición.
     - **`App.js`**: Componente principal de la aplicación.
     - **`index.js`**: Punto de entrada que renderiza el componente `App` en el DOM.
     - **`styles/`**: Contiene los archivos de estilo CSS.
   - **`public/`**: Contiene el archivo HTML principal que carga la aplicación React.
   - **`Dockerfile`**: Archivo para crear la imagen Docker del frontend.

**3. `docker-compose.yml`**:
   - Archivo de configuración para levantar el stack completo de la aplicación (frontend, backend y PostgreSQL) mediante Docker.


Esta es la estructura básica de cómo se organiza el proyecto. Puedes ir navegando por las carpetas y archivos según el componente que desees modificar o revisar.

## 5. Funcionalidades

El sistema de gestión de biblioteca incluye las siguientes funcionalidades principales:

### 1. **Lista de Libros**
   - **Descripción**: Muestra una tabla con todos los libros almacenados en la base de datos.
   - **Características**:
     - Visualización de los detalles del libro: título, autor, año de publicación, ISBN, copias disponibles y antigüedad.
     - Paginación: Muestra hasta 10 libros por página.
     - Opciones para editar y eliminar cada libro.
     - Búsqueda por título o autor.
     - Filtro para mostrar solo los libros que tienen copias disponibles.

### 2. **Crear/Editar Libro**
   - **Descripción**: Permite agregar nuevos libros al sistema o editar los detalles de libros existentes.
   - **Características**:
     - **Formulario de Creación**: Campos para ingresar título, autor, año de publicación, ISBN y copias disponibles.
     - **Formulario de Edición**: Los campos se autocompletan con la información del libro seleccionado, y pueden ser modificados.
     - **Validaciones**:
       - Título y autor son campos obligatorios.
       - El año de publicación debe ser un número entre 1000 y el año actual.
       - El ISBN debe ser un número de 13 dígitos.
       - Las copias disponibles deben ser un número no negativo.

### 3. **Eliminar Libro**
   - **Descripción**: Permite eliminar un libro del sistema.
   - **Características**:
     - Muestra una confirmación antes de eliminar un libro para evitar eliminaciones accidentales.
     - Actualiza la lista de libros después de la eliminación.

### 4. **Antigüedad de los Libros**
   - **Descripción**: Calcula y muestra la antigüedad de los libros en la lista.
   - **Características**:
     - La antigüedad se calcula como la diferencia entre el año actual y el año de publicación del libro.
     - Se muestra en la columna "Antigüedad" de la tabla.

### 5. **Búsqueda de Libros**
   - **Descripción**: Permite buscar libros por título o autor.
   - **Características**:
     - La búsqueda es en tiempo real mientras el usuario escribe en el campo de búsqueda.
     - Filtra los resultados según la coincidencia parcial en el título o autor.

### 6. **Filtro de Libros Disponibles**
   - **Descripción**: Permite filtrar la lista de libros para mostrar solo aquellos que tienen copias disponibles.
   - **Características**:
     - Un checkbox en la interfaz permite activar este filtro.

### 7. **Interfaz de Usuario Amigable**
   - **Descripción**: El diseño de la interfaz de usuario es limpio y accesible.
   - **Características**:
     - Uso de tablas para mostrar los libros de manera ordenada y fácil de navegar.
     - Estilo visual consistente y adaptado para dispositivos móviles.
     - Botones e íconos intuitivos para realizar acciones de edición y eliminación.

## 6. Docker: Cómo levantar la aplicación usando Docker

Para facilitar la implementación y asegurar un entorno consistente, hemos utilizado Docker para contenerizar la aplicación. A continuación se detallan los pasos para levantar la aplicación utilizando Docker.

### 1. **Construir y levantar los contenedores**
- **Descripción**: Utiliza el archivo `docker-compose.yml` para construir y levantar todos los servicios necesarios (frontend, backend y base de datos).
- **Pasos**:
  - Ejecuta el comando `docker-compose up --build` en la raíz del proyecto.
  - Este comando descargará las imágenes necesarias, construirá los contenedores y levantará los servicios correspondientes.

### 2. **Acceder a la aplicación**
- **Descripción**: Una vez que los contenedores estén en funcionamiento, podrás acceder a la aplicación en tu navegador.
- **Direcciones**:
  - El **frontend** estará disponible en la dirección http://localhost:3000
  - El **backend** se podrá acceder en http://localhost:8000

### 3. **Detener y reiniciar los contenedores**
- **Descripción**: Si necesitas realizar algún cambio en la configuración o en el código, recuerda detener y reiniciar los contenedores.
- **Pasos**:
  - Detén los contenedores ejecutando el comando `docker-compose down`.
  - Reinicia los contenedores con `docker-compose up --build`.

### 4. **Ver los logs de los contenedores**
- **Descripción**: Si necesitas ver los logs de los contenedores en tiempo real para diagnosticar algún problema o verificar el funcionamiento.
- **Comando**: Utiliza el comando `docker-compose logs -f`.

### 5. **Eliminar los contenedores, redes y volúmenes asociados**
- **Descripción**: Para detener y eliminar los contenedores, redes y volúmenes asociados.
- **Comando**: Utiliza el comando `docker-compose down --volumes`.
- Este comando se asegura de que los contenedores y recursos temporales se eliminen correctamente.

Este proceso asegura que la aplicación se ejecute en un entorno consistente y replicable, facilitando la configuración y el despliegue de la aplicación en cualquier sistema.

## 7. Poblar la base de datos con libros de ejemplo

Para poblar la base de datos con algunos libros de ejemplo, sigue los siguientes pasos. **Es importante que hayas levantado previamente los contenedores con Docker Compose antes de proceder.**

### 1. **Levantar los contenedores**
- **Descripción**: Primero debes asegurarte de que los servicios estén funcionando correctamente.
- **Pasos**:
  - Ejecuta el comando `docker-compose up --build` en la raíz del proyecto.
  - Este comando descargará las imágenes necesarias, construirá los contenedores y levantará los servicios correspondientes.

### 2. **Ejecutar el comando de Seed**
- **Descripción**: Después de que los contenedores estén en funcionamiento, puedes poblar la base de datos con datos de ejemplo.
- **Comando**: 
  - Abre una nueva terminal y ejecuta el siguiente comando: `docker-compose run --rm seed`
  - Este comando ejecutará el proceso de seed, creando libros de ejemplo en la base de datos.
  - Verás en la terminal los libros que se han creado exitosamente.

### 3. **Verificar los datos**
- **Descripción**: Confirma que los datos se han cargado correctamente.
- **Pasos**:
  - Una vez que hayas ejecutado el proceso de seed, puedes acceder a la aplicación.
  - Verifica en el listado si los libros de ejemplo se han agregado correctamente.

Este proceso te permite tener datos iniciales en la aplicación para poder probar su funcionamiento sin necesidad de agregar manualmente cada libro.