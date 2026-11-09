import Reveal from "./Reveal.jsx";

const tiles = [
  {
    className: "tile tile--sunrise tile--wide",
    label: "Amanecer en el agua",
    meta: "Primera clase · 6:00 AM"
  },
  {
    className: "tile tile--barrel",
    label: "Días de swell",
    meta: "Olas para avanzados"
  },
  {
    className: "tile tile--plate",
    label: "Del mar a la mesa",
    meta: "Pescado del día"
  },
  {
    className: "tile tile--foam",
    label: "Aprender jugando",
    meta: "Nivel principiante"
  },
  {
    className: "tile tile--sunset tile--wide",
    label: "Sunset sessions",
    meta: "Sesiones de tarde"
  },
  {
    className: "tile tile--crew",
    label: "La familia Iguana",
    meta: "Comunidad local"
  }
];

export default function Gallery() {
  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <Reveal className="section-head section-head--light">
          <p className="eyebrow">Galería</p>
          <h2>
            La vida en <em>El Tunco</em>
          </h2>
          <p className="section-head__lead">
            Olas al amanecer, platos recién servidos y la comunidad que hace que
            cada temporada se sienta como volver a casa.
          </p>
        </Reveal>

        <div className="gallery__grid">
          {tiles.map((tile, index) => (
            <Reveal key={tile.label} className={tile.className} delay={index * 60}>
              <span className="tile__shade" aria-hidden="true" />
              <div className="tile__caption">
                <strong>{tile.label}</strong>
                <span>{tile.meta}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
