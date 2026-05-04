import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { val:'40+', label:'Années' },
  { val:'1200m', label:'Altitude' },
  { val:'8', label:'Cuvées' },
  { val:'N°1', label:'Madagascar' },
]

export default function Vignoble() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], ['15%','-15%'])

  return (
    <section id="vignoble" ref={ref} style={{ position:'relative', overflow:'hidden' }}>
      {/* Parallax landscape */}
      <motion.div style={{ y, position:'relative', height:'60vh', overflow:'hidden' }}>
        <svg viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'130%', position:'absolute', bottom:0 }}>
          <defs>
            <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B0B0B"/>
              <stop offset="100%" stopColor="#1A0508"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="500" fill="url(#sky2)"/>
          <path d="M0 500L0 300C100 260 250 200 400 220C550 240 650 170 800 155C950 140 1100 180 1250 170C1350 163 1410 185 1440 195L1440 500Z" fill="#4A5D23" opacity=".35"/>
          <path d="M0 500L0 350C200 310 380 280 550 295C720 310 880 260 1050 250C1200 241 1340 260 1440 270L1440 500Z" fill="#2A3A15" opacity=".5"/>
          <path d="M0 500L0 400C300 375 600 355 900 370C1100 380 1280 370 1440 375L1440 500Z" fill="#1A2510" opacity=".7"/>
          {[...Array(22)].map((_,i)=>(
            <g key={i} transform={`translate(${40+i*66},${390+Math.sin(i*0.9)*12})`}>
              <line x1="0" y1="0" x2="0" y2="110" stroke="#C8A96A" strokeWidth=".5" strokeOpacity=".25"/>
              <ellipse cx="0" cy="18" rx="15" ry="9" fill="#4A5D23" fillOpacity=".6"/>
              <ellipse cx="0" cy="36" rx="13" ry="8" fill="#3A4D18" fillOpacity=".5"/>
              <ellipse cx="-6" cy="54" rx="9" ry="6" fill="#4A5D23" fillOpacity=".4"/>
            </g>
          ))}
          {[...Array(50)].map((_,i)=>(
            <circle key={i} cx={Math.sin(i*137.5)*720+720} cy={Math.cos(i*89)*200+120} r={Math.random()*1.2+.3} fill="#C8A96A" fillOpacity={.3+Math.random()*.4}/>
          ))}
        </svg>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,11,11,.5), rgba(11,11,11,.2) 50%, rgba(11,11,11,.6))'}}/>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'12px' }}>
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', textAlign:'center', marginBottom:'16px' }}>Le Vignoble</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(44px,7vw,88px)', fontWeight:300, color:'var(--white)', textAlign:'center', lineHeight:.95 }}>
              Ambalavao<br/><em style={{ fontStyle:'italic', color:'var(--gold)' }}>1 200 mètres</em>
            </h2>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ background:'var(--black)', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid rgba(200,169,106,.15)' }}>
        {stats.map((s,i)=>(
          <motion.div key={s.label} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}
            style={{ padding:'40px 24px', textAlign:'center', borderRight: i<3 ? '1px solid rgba(200,169,106,.1)' : 'none' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'48px', fontWeight:300, color:'var(--gold)', lineHeight:1 }}>{s.val}</div>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.35)', marginTop:'8px' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
