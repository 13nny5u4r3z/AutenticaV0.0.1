import Navbar from './components/Navbar'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Blog from './components/Blog'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
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
        <Home />
        <Experiences />
        <Blog />
        <AboutMe />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
