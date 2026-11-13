import homeRetrato from '../assets/images/home/homeRetrato-opt.webp'
import heroBackground from '../assets/images/home/heroBackground.jpg'

export function Home() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/20"
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col hero:h-[min(91vh,940px)] hero:flex-row hero:items-stretch">
        <div className="relative h-[500px] w-fit shrink-0 sm:h-[620px] hero:h-full">
          <div
            aria-hidden="true"
            className="hero-art-fade pointer-events-none absolute bottom-0 left-[42%] hidden h-full w-[150%] -translate-x-1/2 rounded-t-full bg-[linear-gradient(to_top,#ceb2bd,#e2d2c8)] hero:block"
          />
          <img
            src={homeRetrato}
            alt="Mujer junto a un caballo"
            className="hero-art-fade relative h-full w-auto object-contain object-left-bottom hero:max-w-none"
          />
        </div>

        <div className="flex flex-1 items-center px-5 py-14 sm:px-8 hero:py-0 hero:pl-32 hero:pr-12 xl:pl-40">
          <div className="max-w-lg">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-rose">
              Asesoría de imagen
            </p>

            <h1 className="mt-5 text-[clamp(2rem,9vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[0.01em] text-white hero:text-[clamp(2rem,4.8vw,4.5rem)]">
              Viste tu
              <span className="block">esencia</span>
            </h1>

            <p className="mt-7 max-w-[20rem] text-[clamp(1rem,1.6vw,1.25rem)] leading-snug text-rose">
              Porque la autenticidad siempre será tu mejor look.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
