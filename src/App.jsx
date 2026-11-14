import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Experiences from './components/Experiences'
import AboutMe from './components/AboutMe'
import Account from './components/Account'
import Contact from './components/Contact'
import Footer from './components/Footer'

function getViewFromHash() {
  const hash = window.location.hash
  if (hash === '#sobre-mi') return 'about'
  if (hash === '#entrar') return 'account'
  return 'main'
}

function App() {
  const [view, setView] = useState(getViewFromHash)

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash
      const next = getViewFromHash()
      setView(next)

      if (next !== 'main') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!hash || hash === '#inicio') {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            return
          }
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'auto', block: 'start' })
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
          }
        })
      })
    }

    window.addEventListener('hashchange', sync)
    sync()
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return (
    <div id="inicio" className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-display focus:text-caption focus:uppercase focus:tracking-[0.12em] focus:text-white"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido" className="flex-1">
        {view === 'about' ? (
          <AboutMe />
        ) : view === 'account' ? (
          <Account />
        ) : (
          <>
            <Home />
            <Experiences />
            <Contact />
          </>
        )}
      </main>

      {view !== 'account' && <Footer />}
    </div>
  )
}

export default App
