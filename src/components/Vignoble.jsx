import { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { navigate } from '../hooks/useStore'
import vignoBlg from '../assets/vignoble.jpg'
import g1 from '../assets/galerie/galerie-01.jpg'
import g2 from '../assets/galerie/galerie-02.jpg'
import g3 from '../assets/galerie/galerie-03.jpg'
import g4 from '../assets/galerie/galerie-04.jpg'
import g5 from '../assets/galerie/galerie-05.jpg'
import g6 from '../assets/galerie/galerie-06.jpg'

const stats = [
  { val:'60+', label:'Années' },
  { val:'1200m', label:'Altitude' },
  { val:'7', label:'Cuvées' },
  { val:'N°1', label:'Madagascar' },
]

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

export default function Vignoble() {
  const ref = useRef(null)
  const imgs = useMemo(() => shuffle([g1, g2, g3, g4, g5, g6]), [])
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], ['15%','-15%'])

  return (
    <section id="vignoble" ref={ref} style={{ position:'relative', overflow:'hidden' }}>
      {/* Parallax landscape */}
      <motion.div style={{ y, position:'relative', height:'60vh', overflow:'hidden' }}>
        <img src={vignoBlg} alt="Vignoble Chan Foui & Fils" style={{ width:'100%', height:'130%', objectFit:'cover', objectPosition:'center', position:'absolute', top:0, left:0 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(11,11,11,.45), rgba(11,11,11,.15) 50%, rgba(11,11,11,.65))' }}/>
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

      {/* Galerie */}
      <div style={{ background:'var(--black)', padding:'52px 80px', position:'relative' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}
            style={{ marginBottom:'32px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>Visite &amp; Découverte</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(28px,4vw,48px)', fontWeight:300, color:'var(--white)', lineHeight:1.05 }}>
              Le domaine en <em style={{ fontStyle:'italic', color:'var(--gold)' }}>images</em>
            </h2>
          </motion.div>

          {/* Grid galerie */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridTemplateRows:'180px 180px', gap:'4px' }}>

            {/* 01 — large gauche, 2 colonnes */}
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7}}
              style={{ gridColumn:'1 / 3', gridRow:'1', overflow:'hidden', position:'relative' }}>
              <img src={imgs[0]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>

            {/* 02 — droite, 2 lignes */}
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.1}}
              style={{ gridColumn:'3', gridRow:'1 / 3', overflow:'hidden', position:'relative' }}>
              <img src={imgs[1]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>

            {/* 03 */}
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.15}}
              style={{ gridColumn:'1', gridRow:'2', overflow:'hidden' }}>
              <img src={imgs[2]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>

            {/* 04 */}
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.2}}
              style={{ gridColumn:'2', gridRow:'2', overflow:'hidden' }}>
              <img src={imgs[3]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>
          </div>

          {/* Ligne 2 images pleine largeur */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px', marginTop:'4px' }}>
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.25}}
              style={{ height:'150px', overflow:'hidden' }}>
              <img src={imgs[4]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>
            <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.3}}
              style={{ height:'150px', overflow:'hidden' }}>
              <img src={imgs[5]} alt="Galerie" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'} />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6,delay:.3}}
            style={{ marginTop:'24px', display:'flex', justifyContent:'center' }}>
            <button onClick={() => navigate('reservation')}
              style={{ padding:'16px 48px', background:'var(--gold)', color:'var(--black)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}
              onMouseEnter={e => { e.target.style.background='transparent'; e.target.style.color='var(--gold)' }}
              onMouseLeave={e => { e.target.style.background='var(--gold)'; e.target.style.color='var(--black)' }}
            >Réserver une visite →</button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
