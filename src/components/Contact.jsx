export function Contact() {
  return (
    <section id="contacto" className="container-page pb-16 md:pb-24">
      <div
        id="agendar"
        className="rounded-panel bg-primary px-6 py-10 text-sand md:px-12 md:py-14"
      >
        <p className="font-display text-caption uppercase tracking-[0.2em] text-rose">
          Empecemos
        </p>
        <h2 className="mt-4 max-w-2xl text-h2 text-white">
          Reserva tu cita o videollamada
        </h2>
        <p className="mt-4 max-w-prose text-body text-rose">
          Regístrate, elige el día y la hora que prefieras y recibe la
          confirmación de tu sesión.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#entrar" className="btn bg-white text-black hover:bg-rose">
            Crear cuenta
          </a>
          <a
            href="#entrar"
            className="btn border border-rose text-white hover:bg-secondary"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
