import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="shell">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <hr className="divider" />
        <Services />
        <hr className="divider" />
        <Work />
        <hr className="divider" />
        <Process />
        <hr className="divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
