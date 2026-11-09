import { ArrowRight } from "./Icons.jsx";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__sky" aria-hidden="true">
        <span className="hero__grain" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__tag">
            <span className="dot" /> El Palmarcito · El Salvador
          </p>
          <h1>
            La mejor vista de 
            <br />
            <em>Surf City</em> 
          </h1>
          <p className="hero__lead">
          Lo mejor del mar y de la tierra en un solo lugar<br/> Frescura, sabor y el ambiente que buscas.
          </p>
          <div className="hero__actions">
            <a className="btn btn-primary" href="#paquetes">
              Ver paquetes <ArrowRight />
            </a>
            <a className="btn btn-ghost" href="#restaurante">
              Explorar el menú
            </a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>+1,200</dt>
              <dd>alumnos en el agua</dd>
            </div>
            <div>
              <dt>4</dt>
              <dd>niveles de surf</dd>
            </div>
            <div>
              <dt>12</dt>
              <dd>años junto al mar</dd>
            </div>
          </dl>
        </div>
      </div>

      <svg
        className="hero__wave hero__wave--front"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 C240,110 480,110 720,60 C960,10 1200,10 1440,60 C1680,110 1920,110 2160,60 C2400,10 2640,10 2880,60 L2880,120 L0,120 Z" />
      </svg>
    </section>
  );
}
