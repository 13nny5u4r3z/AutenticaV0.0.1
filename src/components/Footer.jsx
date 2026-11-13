import logo from '../assets/images/logos/whitelogo.png'

const exploreLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 bg-primary text-sand">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm lg:col-span-2">
            <a href="#inicio" className="flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="h-8 w-auto object-contain"
              />
              <span className="font-display text-base font-bold uppercase tracking-[0.18em] text-white">
                Auténtica
              </span>
            </a>
            <p className="mt-4 text-small text-rose">
              Asesoría de imagen personal. Citas presenciales y videollamadas
              para encontrar tu estilo y sentirte tu mejor versión.
            </p>
          </div>

          <div>
            <h2 className="font-display text-caption uppercase tracking-[0.16em] text-white">
              Explorar
            </h2>
            <ul className="mt-4 space-y-2.5 text-small">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sand transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-caption uppercase tracking-[0.16em] text-white">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2.5 text-small text-sand">
              <li>
                <a href="mailto:hola@autentica.com" className="transition-colors hover:text-white">
                  hola@autentica.com
                </a>
              </li>
              <li>
                <a href="#agendar" className="transition-colors hover:text-white">
                  Agendar una cita
                </a>
              </li>
              <li className="text-rose">Lun–Vie · 9:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rose/30 pt-6 text-caption uppercase tracking-[0.12em] text-rose sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Auténtica. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <a href="#privacidad" className="transition-colors hover:text-white">
              Privacidad
            </a>
            <a href="#terminos" className="transition-colors hover:text-white">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
