const services = [
  {
    number: '01',
    title: 'Asesoría integral',
    text: 'Análisis de estilo, colorimetría y formas para definir la imagen que mejor te representa.',
  },
  {
    number: '02',
    title: 'Armario cápsula',
    text: 'Revisamos tu clóset y construimos combinaciones reales con las prendas que ya tienes.',
  },
  {
    number: '03',
    title: 'Videollamada',
    text: 'Sesión online para hablar de tu estilo, resolver dudas y armar un plan a tu medida.',
  },
]

export function Experiences() {
  return (
    <section id="experiencias" className="container-page pb-16 md:pb-24">
      <div className="max-w-2xl">
        <p className="font-display text-caption uppercase tracking-[0.2em] text-black">
          Experiencias
        </p>
        <h2 className="mt-4 text-h2">Acompañamiento a tu medida</h2>
        <p className="mt-4 text-body text-black/80">
          Elige el formato que mejor se adapte a lo que necesitas. Cada sesión se
          personaliza antes de empezar.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.number}
            className="flex flex-col rounded-card border border-rose/70 bg-surface p-6 shadow-card md:p-7"
          >
            <span className="font-display text-caption tracking-[0.14em] text-black">
              {service.number}
            </span>
            <h3 className="mt-4 text-h3">{service.title}</h3>
            <p className="mt-3 flex-1 text-small text-black/75">
              {service.text}
            </p>
            <a
              href="#agendar"
              className="mt-6 inline-flex items-center gap-2 font-display text-[0.7rem] uppercase tracking-[0.14em] text-black transition-colors hover:text-secondary"
            >
              Reservar
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experiences
