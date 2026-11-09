import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import express from "express";
import cors from "cors";
import { hours, menu, packages } from "./data.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const frontendDist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../frontend/dist"
);
const reservations = [];

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "iguana-surf-api",
    uptime: Math.round(process.uptime())
  });
});

app.get("/api/packages", (_req, res) => {
  res.json({ packages });
});

app.get("/api/menu", (_req, res) => {
  res.json({ categories: menu });
});

app.get("/api/hours", (_req, res) => {
  res.json(hours);
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESERVATION_TYPES = new Set(["restaurante", "academia"]);

app.post("/api/reservations", (req, res) => {
  const body = req.body ?? {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const date = String(body.date ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 500);
  const people = Number(body.people);
  const errors = {};

  if (name.length < 2) errors.name = "Escribe tu nombre completo.";
  if (!EMAIL_RE.test(email)) errors.email = "Ingresa un correo válido.";
  if (!RESERVATION_TYPES.has(body.type)) {
    errors.type = "Selecciona un tipo de reserva.";
  }
  if (!Number.isInteger(people) || people < 1 || people > 20) {
    errors.people = "Indica entre 1 y 20 personas.";
  }
  if (!date || Number.isNaN(new Date(date).getTime())) {
    errors.date = "Selecciona una fecha válida.";
  }

  let selectedPackage = null;
  if (body.type === "academia") {
    selectedPackage = packages.find((item) => item.id === body.packageId) ?? null;
    if (!selectedPackage) {
      errors.packageId = "Selecciona un paquete de la academia.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message: "Revisa los campos marcados.", errors });
  }

  const reservation = {
    id: randomUUID(),
    name,
    email,
    phone,
    date,
    people,
    type: body.type,
    packageId: selectedPackage?.id ?? null,
    packageName: selectedPackage?.name ?? null,
    total: selectedPackage ? selectedPackage.price * people : null,
    message,
    status: "pendiente",
    createdAt: new Date().toISOString()
  };

  reservations.push(reservation);

  return res.status(201).json({
    message: "¡Reserva recibida! Te escribiremos para confirmar los detalles.",
    reservation
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

if (existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(frontendDist, "index.html"), (error) => {
      if (error) next(error);
    });
  });
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Ocurrió un error inesperado." });
});

app.listen(PORT, () => {
  console.log(`Iguana Surf API escuchando en http://localhost:${PORT}`);
});
