import Reveal from "./Reveal.jsx";
import { ArrowRight, Check, Clock, Users, Waves } from "./Icons.jsx";

export default function Packages({ packages, loading, error, onReload, onChoose }) {
  return (
    <section id="paquetes" className="section packages">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Academia de surf</p>
          <h2>
            Cuatro niveles, <em>una misma pasión</em>
          </h2>
          <p className="section-head__lead">
            Desde tu primera vez sobre la tabla hasta la preparación para
            competencia. Grupos pequeños, instructores certificados y el mismo mar
            que nos vio crecer.
          </p>
        </Reveal>

        {loading && (
          <div className="packages__grid" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="package-card skeleton" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="notice" role="alert">
            <p>{error}</p>
            <button type="button" className="btn btn-primary btn-sm" onClick={onReload}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="packages__grid">
            {packages.map((pkg, index) => (
              <Reveal
                key={pkg.id}
                delay={index * 90}
                className={`package-card${pkg.popular ? " package-card--featured" : ""}`}
              >
                {pkg.popular && <span className="package-card__badge">Más elegido</span>}
                <div className="package-card__top">
                  <span className="package-card__level">Nivel {pkg.level}</span>
                  <h3>{pkg.name}</h3>
                  <p className="package-card__tagline">{pkg.tagline}</p>
                </div>

                <p className="package-card__price">
                  ${pkg.price} <span>USD / persona</span>
                </p>

                <ul className="package-card__meta">
                  <li>
                    <Clock /> {pkg.duration}
                  </li>
                  <li>
                    <Waves /> {pkg.sessions}
                  </li>
                  <li>
                    <Users /> {pkg.groupSize}
                  </li>
                </ul>

                <p className="package-card__desc">{pkg.description}</p>

                <ul className="package-card__features">
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="btn btn-block"
                  onClick={() => onChoose(pkg.id)}
                >
                  Reservar este nivel <ArrowRight width={16} height={16} />
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
