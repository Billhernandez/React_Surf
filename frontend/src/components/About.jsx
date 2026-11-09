import Reveal from "./Reveal.jsx";

const pillars = [
  {
    number: "01",
    title: "Seguridad primero",
    text: "Instructores certificados, grupos pequeños y equipo revisado cada día antes de entrar al agua."
  },
  {
    number: "02",
    title: "Comunidad local",
    text: "Trabajamos con familias y pescadores de El Tunco. El mar que cuidamos también nos da de comer."
  },
  {
    number: "03",
    title: "Sabor sin prisa",
    text: "Cocina de mercado, fuego lento y productos de temporada. La misma calma que se siente sobre la tabla."
  }
];

export default function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <p className="eyebrow">Nosotros</p>
          <h2>
            Nacimos entre olas <em>y fogones</em>
          </h2>
          <p>
            Iguana Surf empezó en 2013 con dos tablas, una cocina de gas y la idea
            de que el mar se disfruta mejor con las manos llenas de arena y el
            estómago contento.
          </p>
          <p>
            Hoy somos una escuela con instructores certificados y un restaurante de
            cocina marina que trabaja con productores de la costa salvadoreña. El
            mismo equipo que te enseña a leer una ola te sirve el pescado del día.
          </p>

          <ul className="pillars">
            {pillars.map((pillar) => (
              <li key={pillar.number}>
                <span>{pillar.number}</span>
                <div>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about__visual" delay={140}>
          <div className="about__sun" aria-hidden="true" />
          <div className="about__wave" aria-hidden="true" />
          <div className="about__badge">
            <strong>12</strong>
            <span>
              años
              <br />
              junto al mar
            </span>
          </div>
          <blockquote>
            “El mar no se explica: se vive. Nosotros solo te damos la tabla y el
            primer empujón.”
          </blockquote>
          <p className="about__author">— Ana &amp; Diego, fundadores</p>
        </Reveal>
      </div>
    </section>
  );
}
