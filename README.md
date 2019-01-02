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

## Configuración Google Cloud

Rellena el fichero `.env` con los valores de de tu proyecto de Google Cloud:
- `CLIENT_ID`: ID de cliente del proyecto Google
- `CLIENT_SECRET`: Clave secreta del proyecto Google
- `CALLBACK_URL`: URL para el callback de OAuth (ej. `http://localhost:8080/auth/google/callback`)
- `PROJECT_ID`: ID del proyecto de Google
- `GOOGLE_APPLICATION_CREDENTIALS`: JSON con la clave de servicio de Google, el fichero hay que crearlo y descargarlo desde la consola de Google Cloud (ej. `./curso-nodejs-ed7-c75b732c20ea.json`)

## Despliegue en Google Cloud

`npm run deploy`

## Contenido

La aplicación contiene las siguientes rutas:

- **Rutas públicas (sin autenticación)**
  - [`/`](routes/index.js):
    - Si la petición es un `GET`, muestra un formulario de login (email y contraseña) que envía un `POST` a `/login`.
    - Si el usuario ya está autenticado redirige a `/films`.
  - [`/auth/google`](routes/login.js):
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
