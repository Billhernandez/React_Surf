import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { Calendar, Check, Mail, MapPin, Phone, Users } from "./Icons.jsx";
import { createReservation } from "../api.js";

const fallbackContact = {
  phone: "+503 7000 1234",
  email: "hola@iguanasurf.com",
  address: "Playa El Tunco, La Libertad, El Salvador"
};

const fallbackHours = {
  restaurant: [
    { days: "Lunes a jueves", time: "11:00 – 21:00" },
    { days: "Viernes y sábado", time: "11:00 – 23:00" },
    { days: "Domingo", time: "10:00 – 20:00" }
  ],
  academy: [
    { days: "Clases de surf", time: "6:00 – 10:00" },
    { days: "Sesiones de tarde", time: "15:00 – 18:00" },
    { days: "Check-in", time: "30 min antes de cada sesión" }
  ]
};

const emptyForm = {
  type: "academia",
  name: "",
  email: "",
  phone: "",
  date: "",
  people: "2",
  packageId: "",
  message: ""
};

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "";
  return new Date(`${value}T12:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id}>
      {message}
    </p>
  );
}

export default function Reservation({ packages, hours, selectedPackage }) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    packageId: selectedPackage || ""
  }));
  const [status, setStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [result, setResult] = useState(null);

  const restaurantHours = hours?.restaurant?.length
    ? hours.restaurant
    : fallbackHours.restaurant;
  const academyHours = hours?.academy?.length ? hours.academy : fallbackHours.academy;
  const contact = hours?.contact ?? fallbackContact;

  const chosenPackage = packages.find((pkg) => pkg.id === form.packageId) ?? null;
  const people = Number(form.people) || 0;
  const total = chosenPackage ? chosenPackage.price * people : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (status === "error") setStatus("idle");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setStatus("idle");
    setFieldErrors({});
    setGeneralError("");
    setResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setGeneralError("");

    try {
      const data = await createReservation({
        ...form,
        people: Number(form.people),
        packageId: form.type === "academia" ? form.packageId : null
      });
      setResult(data.reservation);
      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      setFieldErrors(error.fieldErrors ?? {});
      setGeneralError(error.message);
      setStatus("error");
    }
  };

  return (
    <section id="reservar" className="section reservation">
      <div className="container reservation__grid">
        <Reveal className="reservation__info">
          <p className="eyebrow eyebrow--light">Reservas</p>
          <h2>
            Tu mesa o tu <em>próxima ola</em>
          </h2>
          <p className="reservation__lead">
            Cuéntanos qué quieres vivir y nosotros nos encargamos del resto. Las
            clases de surf se confirman según marea y condiciones del mar.
          </p>

          <div className="info-block">
            <h3>Restaurante</h3>
            <ul>
              {restaurantHours.map((row) => (
                <li key={row.days}>
                  <span>{row.days}</span>
                  <strong>{row.time}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-block">
            <h3>Academia</h3>
            <ul>
              {academyHours.map((row) => (
                <li key={row.days}>
                  <span>{row.days}</span>
                  <strong>{row.time}</strong>
                </li>
              ))}
            </ul>
          </div>

          <ul className="contact-list">
            <li>
              <MapPin />
              <span>{contact.address}</span>
            </li>
            <li>
              <Phone />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            </li>
            <li>
              <Mail />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </Reveal>

        <Reveal className="reservation__card" delay={120}>
          {status === "success" && result ? (
            <div className="success">
              <span className="success__icon">
                <Check width={30} height={30} />
              </span>
              <h3>¡Reserva recibida!</h3>
              <p>
                Te escribiremos a <strong>{result.email}</strong> para confirmar los
                detalles.
              </p>
              <dl>
                <div>
                  <dt>Tipo</dt>
                  <dd>{result.type === "academia" ? "Clase de surf" : "Mesa en el restaurante"}</dd>
                </div>
                <div>
                  <dt>Fecha</dt>
                  <dd>{formatDate(result.date)}</dd>
                </div>
                <div>
                  <dt>Personas</dt>
                  <dd>{result.people}</dd>
                </div>
                {result.packageName && (
                  <div>
                    <dt>Paquete</dt>
                    <dd>{result.packageName}</dd>
                  </div>
                )}
                {result.total != null && (
                  <div>
                    <dt>Total estimado</dt>
                    <dd>${result.total} USD</dd>
                  </div>
                )}
                <div>
                  <dt>Referencia</dt>
                  <dd>{result.id.slice(0, 8).toUpperCase()}</dd>
                </div>
              </dl>
              <button type="button" className="btn btn-primary btn-block" onClick={resetForm}>
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__head">
                <h3>Reserva en línea</h3>
                <p>Confirmamos por correo o WhatsApp en menos de 24 horas.</p>
              </div>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="type">¿Qué quieres reservar?</label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.type)}
                    aria-describedby={fieldErrors.type ? "error-type" : undefined}
                  >
                    <option value="academia">Clase de surf</option>
                    <option value="restaurante">Mesa en el restaurante</option>
                  </select>
                  <FieldError id="error-type" message={fieldErrors.type} />
                </div>

                {form.type === "academia" && (
                  <div className="field">
                    <label htmlFor="packageId">Paquete</label>
                    <select
                      id="packageId"
                      name="packageId"
                      value={form.packageId}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.packageId)}
                      aria-describedby={fieldErrors.packageId ? "error-package" : undefined}
                    >
                      <option value="">Selecciona un nivel</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} · ${pkg.price}
                        </option>
                      ))}
                    </select>
                    <FieldError id="error-package" message={fieldErrors.packageId} />
                  </div>
                )}
              </div>

              <div className="field">
                <label htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "error-name" : undefined}
                />
                <FieldError id="error-name" message={fieldErrors.name} />
              </div>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "error-email" : undefined}
                  />
                  <FieldError id="error-email" message={fieldErrors.email} />
                </div>
                <div className="field">
                  <label htmlFor="phone">Teléfono / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+503 0000 0000"
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="date">
                    <Calendar width={16} height={16} /> Fecha
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={todayISO()}
                    value={form.date}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.date)}
                    aria-describedby={fieldErrors.date ? "error-date" : undefined}
                  />
                  <FieldError id="error-date" message={fieldErrors.date} />
                </div>
                <div className="field">
                  <label htmlFor="people">
                    <Users width={16} height={16} /> Personas
                  </label>
                  <input
                    id="people"
                    name="people"
                    type="number"
                    min="1"
                    max="20"
                    value={form.people}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.people)}
                    aria-describedby={fieldErrors.people ? "error-people" : undefined}
                  />
                  <FieldError id="error-people" message={fieldErrors.people} />
                </div>
              </div>

              {chosenPackage && total != null && (
                <p className="form__total">
                  <span>
                    {chosenPackage.name} × {people} {people === 1 ? "persona" : "personas"}
                  </span>
                  <strong>${total} USD</strong>
                </p>
              )}

              <div className="field">
                <label htmlFor="message">Mensaje (opcional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  maxLength="500"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos tu experiencia, alergias o cualquier detalle."
                />
              </div>

              {status === "error" && generalError && (
                <p className="form__error" role="alert">
                  {generalError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando…" : "Confirmar reserva"}
              </button>

              <p className="form__hint">
                Las clases incluyen tabla, lycra y seguro. Llega 30 minutos antes.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
