import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let v = 0
    const interval = setInterval(() => {
      v += Math.random() * 18 + 4
      if (v >= 100) { v = 100; clearInterval(interval); setTimeout(() => { setDone(true); setTimeout(onDone, 600) }, 400) }
      setPct(Math.round(v))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity:0 }} transition={{ duration:.6, ease:'easeInOut' }}
          style={{ position:'fixed', inset:0, background:'#222325', zIndex:9995, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'32px' }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8 }}
            style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'48px', fontWeight:300, color:'var(--white)', letterSpacing:'0.05em', lineHeight:1 }}>
              <span className="gold-text">CF</span>
            </div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'18px', color:'rgba(245,245,243,.5)', fontStyle:'italic', marginTop:'8px' }}>Chan Foui & Fils</div>
          </motion.div>

          <div style={{ width:'200px', height:'1px', background:'rgba(221,43,33,.15)', position:'relative', overflow:'hidden' }}>
            <motion.div style={{ position:'absolute', left:0, top:0, height:'100%', background:'var(--gold)', width: pct+'%', transition:'width .1s linear' }} />
          </div>
          <div style={{ fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'0.3em', color:'rgba(245,245,243,.3)' }}>{pct}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
