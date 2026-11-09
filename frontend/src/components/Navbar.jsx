import { useEffect, useState } from "react";
import Brand from "./Brand.jsx";
import { CloseIcon, MenuIcon } from "./Icons.jsx";

const links = [
  { href: "#restaurante", label: "Restaurante" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#galeria", label: "Galería" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " nav--solid" : ""}${open ? " nav--open" : ""}`}>
        <div className="container nav__inner">
          <Brand onClick={() => setOpen(false)} />

          <nav className="nav__links" aria-label="Navegación principal">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn-primary btn-sm nav__cta" href="#reservar">
              Reservar
            </a>
            <button
              type="button"
              className="nav__toggle"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
            </button>
          </div>
        </div>
      </header>

      <div id="menu-movil" className={`nav__mobile${open ? " is-open" : ""}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="btn btn-primary" href="#reservar" onClick={() => setOpen(false)}>
          Reservar ahora
        </a>
      </div>
    </>
  );
}
