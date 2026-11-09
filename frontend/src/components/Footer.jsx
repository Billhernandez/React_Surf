import Brand from "./Brand.jsx";
import { Instagram, Mail, MapPin, Phone } from "./Icons.jsx";

const fallbackContact = {
  phone: "+503 7000 1234",
  email: "hola@iguanasurf.com",
  address: "Playa El Tunco, La Libertad, El Salvador"
};

export default function Footer({ hours }) {
  const contact = hours?.contact ?? fallbackContact;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand />
            <p>
              Surf, cocina marina y comunidad en Playa El Tunco. Abierto todos los
              días, con olas o sin ellas.
            </p>
          </div>

          <nav className="footer__col" aria-label="Explorar">
            <h4>Explorar</h4>
            <a href="#paquetes">Paquetes de surf</a>
            <a href="#restaurante">Menú</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#galeria">Galería</a>
          </nav>

          <div className="footer__col">
            <h4>Visítanos</h4>
            <p>
              <MapPin width={16} height={16} /> {contact.address}
            </p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
              <Phone width={16} height={16} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail width={16} height={16} /> {contact.email}
            </a>
          </div>

          <div className="footer__col">
            <h4>Síguenos</h4>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Instagram width={16} height={16} /> @iguanasurf
            </a>
            <p className="footer__note">
              Reservas de surf con 24 horas de anticipación.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Iguana Surf. Todos los derechos reservados.</p>
          <p>Hecho con sal, sol y código.</p>
        </div>
      </div>
    </footer>
  );
}
