import { useState } from "react";
import Reveal from "./Reveal.jsx";

const formatPrice = (value) => `$${value.toFixed(2)}`;

export default function Restaurant({ categories, loading, error }) {
  const [active, setActive] = useState("");
  const category = categories.find((item) => item.id === active) ?? categories[0];

  return (
    <section id="restaurante" className="section restaurant">
      <div className="container">
        <Reveal className="section-head section-head--light">
          <p className="eyebrow">Restaurante</p>
          <h2>
            Cocina de mar, <em>raíz local</em>
          </h2>
          <p className="section-head__lead">
            Producto fresco del Pacífico, recetas de la costa y un menú que cambia
            con la marea. Después del surf, la mesa es el mejor lugar para quedarse.
          </p>
        </Reveal>

        {loading && <p className="loading-text">Cargando el menú del día…</p>}

        {!loading && error && (
          <p className="loading-text" role="alert">
            El menú no está disponible en este momento. Intenta de nuevo más tarde.
          </p>
        )}

        {!loading && !error && categories.length > 0 && (
          <>
            <div className="tabs" role="tablist" aria-label="Categorías del menú">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={category?.id === item.id}
                  className={`tab${category?.id === item.id ? " is-active" : ""}`}
                  onClick={() => setActive(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {category && (
              <div className="menu-panel" role="tabpanel" key={category.id}>
                <ul className="menu-grid">
                  {category.items.map((item) => (
                    <li key={item.name} className="menu-item">
                      <div className="menu-item__head">
                        <h3>{item.name}</h3>
                        <span className="menu-item__price">{formatPrice(item.price)}</span>
                      </div>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="restaurant__note">
              <span className="dot" />
              Happy hour de 16:00 a 18:00 · 2×1 en cócteles de la casa
            </div>
          </>
        )}
      </div>
    </section>
  );
}
