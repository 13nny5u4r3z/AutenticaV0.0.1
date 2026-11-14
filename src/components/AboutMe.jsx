import { useState } from 'react'
import retratoBg from '../assets/images/home/retrato.png'

const slides = [
  {
    title: "IF YOUR DREAM JOB DOESN'T EXIST, CREATE IT.",
    content: (
      <>
        <p className="mt-4 font-body text-body text-black/85">
          Tod@s hemos vivido ese momento en el que sentimos que nuestro futuro
          no encaja en ningún molde. Hoy estás aquí porque has decidido tomar
          las riendas de tu vida, de tu esencia y de tu marca personal.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Hoy eres la protagonista de tu propia historia. Es momento de
          reconocer tu poder, reencontrarte contigo misma, volver a enamorarte
          de quien eres y reinventarte tantas veces como sea necesario.
        </p>
        <p className="mt-4 font-body text-body font-bold text-black">
          Porque ser auténtica es, sin duda, tu mayor poder.
        </p>
      </>
    ),
  },
  {
    title: 'THE JOURNEY IS THE PURPOSE.',
    content: (
      <>
        <p className="mt-4 font-body text-body text-black/85">
          Con los años he aprendido a darle más valor al camino que a la meta.
          Una meta puede ser un instante, un día o un segundo; pero los
          propósitos se construyen todos los días. Son imperfectos, humanos y,
          sobre todo, constantes.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Hace más de siete años imaginaba un futuro que incluso a mí me parecía
          difícil de explicar. A veces me preguntaba: <em>¿Cómo voy a lograrlo?</em>
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Tenía claro mi propósito: acompañar a otras personas a descubrir el
          poder de su imagen personal y despertar en ellas el deseo de trabajar
          en su propia identidad.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          No sabía cómo sería el proceso, pero confiaba en que algún día
          encontraría la manera.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Y seguí adelante. A veces daba un paso al frente y tres hacia atrás.
          Me reencontraba, me reinventaba y volvía a comenzar.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Hoy sigo haciéndolo. Sigo aprendiendo, explorando y evolucionando.
          Porque creo que considerarnos expertas en el arte de renacer puede
          hacernos olvidar que siempre hay algo nuevo por descubrir.
        </p>
      </>
    ),
  },
  {
    title: 'THIS IS CELESTE IMAGEN.',
    content: (
      <>
        <p className="mt-4 font-body text-body text-black/85">
          Celeste Imagen es para cada persona que desea descubrir, construir y
          expresar su versión más auténtica.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          No se trata de convertirte en alguien diferente, sino de encontrar
          nuevas formas de expresar quién eres.
        </p>
        <p className="mt-4 font-body text-body text-black/85">
          Te acompaño en ese proceso a través de herramientas que te permitan
          desarrollar confianza, seguridad y autenticidad.
        </p>
        <p className="mt-4 font-body text-body font-bold text-black">
          Tu imagen no tiene que definirte. Tiene que representarte.
        </p>
        <p className="mt-4 font-body text-body font-bold text-black">
          Be yourself. Be authentic. Be Celeste.
        </p>
      </>
    ),
  },
]

export function AboutMe() {
  const [index, setIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [anim, setAnim] = useState('opacity-100 translate-x-0')

  const go = (dir) => {
    setAnim(
      dir === 'next'
        ? 'opacity-0 -translate-x-4'
        : 'opacity-0 translate-x-4',
    )
    setTimeout(() => {
      setIndex((i) =>
        dir === 'next'
          ? (i + 1) % slides.length
          : (i - 1 + slides.length) % slides.length,
      )
      setAnim(
        dir === 'next'
          ? 'opacity-0 translate-x-4'
          : 'opacity-0 -translate-x-4',
      )
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnim('opacity-100 translate-x-0'))
      })
    }, 180)
  }

  const prev = () => go('prev')
  const next = () => go('next')

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStartX === null) return
    const delta = e.changedTouches[0].clientX - touchStartX
    if (delta > 40) prev()
    if (delta < -40) next()
    setTouchStartX(null)
  }

  const slide = slides[index]

  return (
    <section
      id="sobre-mi"
      className="relative min-h-[100svh] w-full overflow-hidden bg-primary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-primary min-[375px]:h-16 md:h-[4.5rem] lg:h-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-14 overflow-hidden min-[375px]:top-16 md:top-[4.5rem] lg:top-20"
      >
        <img
          src={retratoBg}
          alt=""
          className="about-bg-enter h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 container-page flex min-h-[100svh] flex-col pb-16 pt-24 min-[375px]:pt-28 md:pb-24 md:pt-32 lg:pt-36">
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="flex flex-col lg:col-start-2">
            <div
              className="rounded-panel border border-rose/40 bg-white/90 p-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="h-[22rem] overflow-y-auto pr-1 sm:h-[26rem] md:h-[28rem]">
                <div
                  className={`transition-all duration-300 ease-out ${anim}`}
                >
                  <h2 className="font-display text-h3 uppercase leading-tight tracking-[0.04em] text-black">
                    {slide.title}
                  </h2>
                  {slide.content}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-rose/40 pt-5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Anterior"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose/60 text-black transition-colors hover:bg-rose/40"
                >
                  <span aria-hidden="true">←</span>
                </button>

                <p className="font-display text-caption uppercase tracking-[0.16em] text-black/70">
                  {index + 1} / {slides.length}
                </p>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose/60 text-black transition-colors hover:bg-rose/40"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#inicio"
          className="mt-10 inline-flex w-fit items-center gap-2 font-display text-caption uppercase tracking-[0.14em] text-white transition-colors hover:text-rose"
        >
          <span aria-hidden="true">←</span> Volver
        </a>
      </div>
    </section>
  )
}

export default AboutMe
