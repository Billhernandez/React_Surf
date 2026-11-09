# Iguana Surf — Restaurante & Academia de Surf

Sitio web completo (React + Node) para un restaurante de cocina marina y una
academia de surf en Playa El Tunco, El Salvador. Incluye cuatro paquetes de surf
(principiante, intermedio, avanzado y Pro), menú del restaurante y un formulario
de reservas conectado a la API.

## Stack

- **React 19** + **Vite 8** (frontend)
- **Node.js 24** + **Express 5** (backend/API)
- JavaScript (ESM), CSS moderno responsive, sin dependencias de UI externas
- npm workspaces + `concurrently` para desarrollo

## Estructura

```
frontend/          Aplicación React (Vite)
  src/components/  Secciones: Hero, Packages, Restaurant, About, Gallery, Reservation...
  src/api.js       Cliente HTTP de la API
  src/styles.css   Sistema de diseño y estilos responsive
backend/           API REST con Express
  src/index.js     Rutas, validación y servidor de estáticos en producción
  src/data.js      Paquetes, menú y horarios
```

## Cómo ejecutar

Requiere Node.js 20.19+ (probado con Node 24).

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3001 (Vite redirige `/api` al backend)

### Producción

```bash
npm run build   # genera frontend/dist
npm start       # Express sirve la web y la API en http://localhost:3001
```

El puerto de la API se puede cambiar con la variable `PORT`.

## Scripts

| Script              | Descripción                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`         | Frontend y backend en modo desarrollo              |
| `npm run dev:frontend`| Solo Vite                                          |
| `npm run dev:backend` | Solo API con `node --watch`                        |
| `npm run build`       | Build de producción del frontend                   |
| `npm start`           | Servidor Express (sirve `frontend/dist` si existe) |
| `npm run lint`        | ESLint sobre el frontend                           |

## API

| Método | Ruta                 | Descripción                                   |
| ------ | -------------------- | --------------------------------------------- |
| GET    | `/api/health`        | Estado del servicio                           |
| GET    | `/api/packages`      | Paquetes de surf (4 niveles)                  |
| GET    | `/api/menu`          | Categorías e ítems del restaurante            |
| GET    | `/api/hours`         | Horarios y datos de contacto                  |
| POST   | `/api/reservations`  | Crea una reserva (restaurante o clase de surf)|

### Paquetes

| Nivel        | Precio | Sesiones | Duración     |
| ------------ | ------ | -------- | ------------ |
| Principiante | $45    | 1        | 2 horas      |
| Intermedio   | $75    | 3        | 3 × 2 horas  |
| Avanzado     | $140   | 5        | 5 × 2.5 horas|
| Pro          | $240   | 8        | 8 × 3 horas  |

### Ejemplo de reserva

```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Surfista",
    "email": "ana@example.com",
    "phone": "+503 7000 0000",
    "date": "2026-12-15",
    "people": 3,
    "type": "academia",
    "packageId": "pro",
    "message": "Primera vez en El Tunco"
  }'
```

Respuesta `201` con la reserva, el paquete y el total estimado. Los campos
inválidos devuelven `422` con un mapa `errors` por campo. Las reservas se
guardan en memoria: al reiniciar el servidor se reinicia el listado.
