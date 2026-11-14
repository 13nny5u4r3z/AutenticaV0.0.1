import boutiqueImg from '../assets/images/home/boutique.jpg'
import glassImg from '../assets/images/home/glass.png'
import logoWhite from '../assets/images/logos/whitelogo-word.png'

export function Home() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-primary px-4 py-28 text-white sm:px-8">
      <img
        src={boutiqueImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={glassImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background sm:h-56 md:h-72"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="font-display text-[clamp(2rem,7vw,4.5rem)] font-normal uppercase leading-[1.05] tracking-[0.04em] text-white">
          <span className="block">Descubre tu esencia.</span>
          <span className="mt-2 block">sé tu yo más</span>
          <img
            src={logoWhite}
            alt="Auténtica"
            className="mx-auto mt-4 block h-[clamp(2.75rem,10vw,6rem)] w-auto"
          />
        </h1>

        <p className="mt-8 max-w-xl font-body text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-rose">
          Un espacio para reconectar contigo, celebrar tu imagen y expresarte
          con autenticidad en cada detalle.
        </p>

        <div className="mt-10 flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#experiencias"
            className="btn border border-white bg-white text-primary hover:border-rose hover:bg-rose"
          >
            Descubre nuestras experiencias
          </a>
          <a
            href="#sobre-mi"
            className="btn border border-white bg-transparent text-white hover:bg-white hover:text-primary"
          >
            Conóceme
          </a>
        </div>
      </div>
    </section>
  )
}

export default Home
