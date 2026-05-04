import './index.css'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Storytelling from './components/Storytelling'
import Vignoble from './components/Vignoble'
import Catalog from './components/Catalog'
import Cart from './components/Cart'
import ProductPage from './components/ProductPage'
import WineClub from './components/WineClub'
import B2B from './components/B2B'
import Checkout from './components/Checkout'
import Reservation from './components/Reservation'
import Admin from './components/Admin'
import Contact from './components/Contact'
import B2BOrder from './components/B2BOrder'
import Footer from './components/Footer'
import { useStore } from './hooks/useStore'

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Storytelling />
      <Vignoble />
      <Catalog />
      <Footer />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const page = useStore(s => s.page)
  const selectedWine = useStore(s => s.selectedWine)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Cursor />
          <Navbar />
          <Cart />
          <AnimatePresence mode="wait">
            <motion.div key={page}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:.35 }}>
              {page==='home'        && <HomePage />}
              {page==='product'     && <ProductPage wine={selectedWine} />}
              {page==='wineclub'    && <WineClub />}
              {page==='b2b'         && <B2B />}
              {page==='checkout'    && <Checkout />}
              {page==='reservation' && <Reservation />}
              {page==='admin'       && <Admin />}
              {page==='contact'     && <Contact />}
              {page==='b2border'    && <B2BOrder />}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  )
}
