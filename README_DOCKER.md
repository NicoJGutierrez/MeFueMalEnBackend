# MeFueMalEnBackend - Dockerized

Este proyecto está configurado para ejecutarse con Docker y Docker Compose.

## Requisitos previos

- Docker
- Docker Compose

## Ejecución con Docker Compose (Recomendado)

### Ejecutar la aplicación completa (Backend + MongoDB)

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Detener los servicios
docker-compose down

# Detener y eliminar volúmenes (datos de MongoDB)
docker-compose down -v
```

### Acceder a la aplicación

- Backend: http://localhost:5000
- API de prueba: http://localhost:5000/api/hello
- Usuarios: http://localhost:5000/api/usuarios

## Ejecución solo con Docker

### Construir la imagen

```bash
docker build -t mefuemalenbackend .
```

### Ejecutar el contenedor

```bash
# Ejecutar con MongoDB local
docker run -p 5000:5000 mefuemalenbackend

# Ejecutar con MongoDB externo
docker run -p 5000:5000 -e MONGODB_URI=mongodb://tu-mongodb-uri:27017/miapp mefuemalenbackend
```

## Variables de entorno

- `PORT`: Puerto en el que se ejecuta la aplicación (por defecto: 5000)
- `MONGODB_URI`: URI de conexión a MongoDB (por defecto: mongodb://localhost:27017/miapp)
- `NODE_ENV`: Entorno de Node.js (por defecto: production)

## Estructura del proyecto

```
.
├── dockerfile          # Configuración de Docker
├── docker-compose.yml  # Orchestración de servicios
├── .dockerignore       # Archivos ignorados por Docker
├── package.json        # Dependencias y scripts
├── index.js            # Aplicación principal
└── README.md           # Este archivo
```

## Logs

Para ver los logs de los servicios:

```bash
# Logs de todos los servicios
docker-compose logs

# Logs del backend
docker-compose logs backend

# Logs de MongoDB
docker-compose logs mongodb

# Seguir logs en tiempo real
docker-compose logs -f
```

## Desarrollo

Para desarrollo local sin Docker:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# o directamente
node index.js
```

## Notas importantes

- Los datos de MongoDB se persisten en un volumen Docker llamado `mongodb_data`
- La aplicación se ejecuta como usuario no root para mayor seguridad
- Se incluye un archivo `.dockerignore` para optimizar el proceso de construcción
- El backend se conecta automáticamente a MongoDB cuando se usa docker-compose
