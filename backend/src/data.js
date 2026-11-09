export const packages = [
  {
    id: "principiante",
    name: "Nivel Principiante",
    tagline: "Tu primera ola, paso a paso",
    level: 1,
    price: 45,
    sessions: "1 sesión",
    duration: "2 horas",
    groupSize: "Máx. 4 personas",
    popular: false,
    description:
      "Diseñado para quienes tocan el mar por primera vez. Aprenderás a leer la ola, remar y ponerte de pie con seguridad, en aguas tranquilas y con acompañamiento constante.",
    features: [
      "Teoría en arena antes de entrar al agua",
      "Tabla foam y lycra incluidas",
      "Instructor certificado para 4 alumnos",
      "Seguro de accidentes y chaleco",
      "Fotografías de tu primera ola"
    ]
  },
  {
    id: "intermedio",
    name: "Nivel Intermedio",
    tagline: "De la espuma a la ola verde",
    level: 2,
    price: 75,
    sessions: "3 sesiones",
    duration: "3 × 2 horas",
    groupSize: "Máx. 5 personas",
    popular: true,
    description:
      "Para surfistas que ya se ponen de pie. Trabajamos el take-off, la lectura del mar y el paso a una tabla rígida para que ganes confianza y autonomía.",
    features: [
      "Evaluación inicial y plan personalizado",
      "Transición a tabla rígida",
      "Lectura de corrientes y sets",
      "Análisis de video al final de cada sesión",
      "Acceso a tablas de práctica entre clases"
    ]
  },
  {
    id: "avanzado",
    name: "Nivel Avanzado",
    tagline: "Maniobras con intención",
    level: 3,
    price: 140,
    sessions: "5 sesiones",
    duration: "5 × 2.5 horas",
    groupSize: "Máx. 3 personas",
    popular: false,
    description:
      "Refina tu técnica y construye un surfing más dinámico. Bottom turns, cutbacks y línea de ola con correcciones precisas frente al mar.",
    features: [
      "Coaching técnico de maniobras",
      "Video análisis con correcciones",
      "Entrenamiento de pop-up y balance",
      "Sesiones en distintos picos",
      "Rutina de movilidad y prevención"
    ]
  },
  {
    id: "pro",
    name: "Nivel Pro",
    tagline: "Compite, viaja, evoluciona",
    level: 4,
    price: 240,
    sessions: "8 sesiones",
    duration: "8 × 3 horas",
    groupSize: "Coaching 1 a 1",
    popular: false,
    description:
      "Acompañamiento de alto rendimiento para surfistas que compiten o quieren llevarlo al siguiente nivel. Plan de entrenamiento, video 4K y estrategia de heat.",
    features: [
      "Coaching 1 a 1 con instructor élite",
      "Grabación y análisis en 4K",
      "Plan físico, técnico y nutricional",
      "Simulación de heats de competencia",
      "Revisión de tablas y quiver",
      "Prioridad de reserva en temporada alta"
    ]
  }
];

export const menu = [
  {
    id: "entradas",
    name: "Para empezar",
    items: [
      {
        name: "Ceviche de camarón",
        description: "Leche de tigre, mango, cebolla morada y totopos de maíz.",
        price: 9
      },
      {
        name: "Tostones con guacamole",
        description: "Plátano macho crujiente, guacamole de la casa y chile de árbol.",
        price: 6
      },
      {
        name: "Alitas al coco",
        description: "Glaseado de coco, limón y jengibre con dip de cilantro.",
        price: 8
      }
    ]
  },
  {
    id: "fuertes",
    name: "Del mar a tu mesa",
    items: [
      {
        name: "Pescado del día",
        description: "A la plancha, con arroz de coco, ensalada fresca y limón asado.",
        price: 16
      },
      {
        name: "Tacos gobernador",
        description: "Camarón, queso gratinado, pico de gallo y salsa de la casa.",
        price: 12
      },
      {
        name: "Bowl de açaí",
        description: "Açaí, granola artesanal, plátano y frutos rojos.",
        price: 9
      },
      {
        name: "Pupusas del mar",
        description: "Queso, camarón y loroco. Acompañadas de curtido y salsa roja.",
        price: 8
      }
    ]
  },
  {
    id: "postres",
    name: "Dulce final",
    items: [
      {
        name: "Pie de limón",
        description: "Base de galleta, crema de limón y merengue tostado.",
        price: 5
      },
      {
        name: "Chocolate con sal de mar",
        description: "Mousse de cacao 70 %, sal marina y aceite de oliva.",
        price: 6
      }
    ]
  },
  {
    id: "bebidas",
    name: "Para brindar",
    items: [
      {
        name: "Smoothie tropical",
        description: "Mango, piña, maracuyá y leche de coco.",
        price: 4.5
      },
      {
        name: "Agua de coco",
        description: "Coco entero, servido bien frío.",
        price: 3.5
      },
      {
        name: "Cerveza artesanal",
        description: "Selección local, rotativa.",
        price: 5
      },
      {
        name: "Café de altura",
        description: "Grano de Apaneca, tostado medio.",
        price: 2.5
      }
    ]
  }
];

export const hours = {
  restaurant: [
    { days: "Lunes a jueves", time: "11:00 – 21:00" },
    { days: "Viernes y sábado", time: "11:00 – 23:00" },
    { days: "Domingo", time: "10:00 – 20:00" }
  ],
  academy: [
    { days: "Clases de surf", time: "6:00 – 10:00" },
    { days: "Sesiones de tarde", time: "15:00 – 18:00" },
    { days: "Check-in", time: "30 min antes de cada sesión" }
  ],
  contact: {
    phone: "+503 7000 1234",
    email: "hola@iguanasurf.com",
    address: "Playa El Tunco, La Libertad, El Salvador"
  }
};
