import { useEffect, useState } from 'react'
import logo from '../assets/images/logos/violetlogo.png'

const links = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Contacto', href: '#contacto' },
]

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  )
}

const iconButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full text-black transition-colors hover:bg-rose/50 @min-[20rem]:h-9 @min-[20rem]:w-9 @min-[23.4375rem]:h-10 @min-[23.4375rem]:w-10 @min-[48rem]:h-11 @min-[48rem]:w-11'

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }

    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className="@container fixed inset-x-0 top-0 z-50 bg-white/90 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="container-page flex items-center justify-between gap-1 py-2 @min-[23.4375rem]:gap-4 md:py-3">
        <a href="#inicio" onClick={closeMenu} aria-label="Auténtica — Inicio" className="shrink-0">
          <img
            src={logo}
            alt=""
            className="h-8 w-auto object-contain @min-[20rem]:h-10 @min-[23.4375rem]:h-14 @min-[48rem]:h-16"
          />
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-secondary hover:no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0 @min-[23.4375rem]:gap-1">
          {/* Below 288px there is no room for the extra icons. Hiding them
              keeps the menu button inside the viewport instead of pushing it
              out of the screen. */}
          <div className="hidden items-center gap-0 @min-[18rem]:flex @min-[23.4375rem]:gap-1">
            <button type="button" aria-label="Buscar" className={iconButtonClass}>
              <SearchIcon />
            </button>
            <a href="#entrar" aria-label="Mi cuenta" className={iconButtonClass}>
              <UserIcon />
            </a>
            <a href="#carrito" aria-label="Carrito" className={iconButtonClass}>
              <CartIcon />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className={`${iconButtonClass} lg:hidden`}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="bg-white lg:hidden"
      >
        <nav aria-label="Navegación móvil" className="container-page py-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-rose/40 py-3.5 font-display text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-secondary hover:no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
