export function AboutMe() {
  return (
    <section id="sobre-mi" className="container-page py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display text-caption uppercase tracking-[0.2em] text-black">
            Sobre mí
          </p>
          <h2 className="mt-4 text-h2">La persona detrás de Auténtica</h2>
          <p className="mt-5 max-w-prose text-body text-black/80">
            Soy asesora de imagen y creo que el estilo no se trata de seguir
            reglas, sino de entender qué te hace sentir bien. Mi trabajo es
            acompañarte a encontrar esa claridad.
          </p>
          <a href="#agendar" className="btn btn-primary mt-8">
            Conocer mi enfoque
          </a>
        </div>

        <div className="rounded-panel border border-rose/70 bg-rose/40 p-8 md:p-12">
          <p className="font-display text-h3 leading-snug text-black">
            “La imagen no es una máscara: es una forma de comunicar quién eres.”
          </p>
          <span className="mt-6 block font-display text-caption uppercase tracking-[0.16em] text-black/70">
            Auténtica · Asesoría de imagen
          </span>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
