# film-api

Aplicación hecha con [expressjs](http://expressjs.com/) para el [Curso de NodeJS](https://github.com/Fictizia/Curso-Node.js-para-desarrolladores-Front-end_ed5) de [@Fictizia](https://github.com/Fictizia);

El objetivo es crear una aplicación web junto a una pequeña API rest y una base de datos almacenada en un fichero JSON para administrar películas.

## Instalación

> Por defecto la aplicación arrancará en el puerto **8080**.

```
git clone https://github.com/josex2r/film-api.git
cd film-api
npm install
npm start
```

## Pasos a seguir

Cada paso es una rama del repo:

### step-1
1. Instalar/Configurar `nodemon`
2. Crear la base de datos (constructor, get, set)
3. Devolver el listado de películas
4. Formulario de login + redirección con query param

### step-2
1. Instalar/Configurar `cookie-session`
2. Crear la cookie al autenticarse
3. Crear middleware de redirección

### step-3
1. Crear parámetro `:film_id`
2. Añadir el parámetro al router para la vista de detalle

### step-4
1. Añadir el usuario a la plantilla
2. Logout

### step-5
1. Eliminar película

### step-6
1. Busboy

## Configuración Google Cloud

Rellena el fichero `.env` con los valores de de tu proyecto de Google Cloud:
- `CLIENT_ID`: ID de cliente del proyecto Google
- `CLIENT_SECRET`: Clave secreta del proyecto Google
- `CALLBACK_URL`: URL para el callback de OAuth (ej. `http://localhost:8080/auth/google/callback`)
- `PROJECT_ID`: ID del proyecto de Google

## Contenido

La aplicación contiene las siguientes rutas:

- **Rutas públicas (sin autenticación)**
  - [`/`](routes/index.js):
    - Si la petición es un `GET`, muestra un formulario de login (email y contraseña) que envía un `POST` a `/login`.
    - Si el usuario ya está autenticado redirige a `/films`.
  - [`/login`](routes/login.js):
    - Si la petición es un `POST`, comprueba si el usuario está en la base de datos ([](db/db.json)) y si es correcto crea una **coockie** y redirige a la ruta `/films`.
      En caso contrario redirige a `/` para mostrar el formulario con un mensaje de error.
    - [`/logout`](routes/login.js): Destruye la sesión y redirige a `/`
- **Rutas privadas (con autenticación)**
  - [`/films`](routes/films.js): Muestra el listado de películas de la base de datos ([](db/db.json)`)
  - [`/films/:film`](routes/films.js): Muestra el detalle de película determinada
  - [`/films/add`](routes/films.js):
    - Si se accede mediante un `GET`, se muestra un formulario que permite añadir una película nueva.
    - Si se envía un `POST` con body, se añade la película a la base de datos y se redirige a `/films`.
- **API (sin autenticación)**
  - [`GET - /api/films`](routes/api/films.js): Listado de películas
  - [`GET - /api/films/:film`](routes/api/films.js): Detalle de película
  - [`POST - /api/films`](routes/api/films.js): Añadir película
  - [`DELETE - /api/films/:film`](routes/api/films.js): Borrar película
