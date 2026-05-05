import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { navigate } from '../hooks/useStore'

const stats = [
  { val:'60+', label:'Années' },
  { val:'1200m', label:'Altitude' },
  { val:'7', label:'Cuvées' },
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

      {/* Visiter section */}
      <div style={{ background:'var(--black)', padding:'100px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-200px', left:'-200px', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle, rgba(74,93,35,.12) 0%, transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}
            style={{ marginBottom:'64px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Visite &amp; Découverte</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(36px,5vw,64px)', fontWeight:300, color:'var(--white)', lineHeight:1.05 }}>
              Vous pouvez <em style={{ fontStyle:'italic', color:'var(--gold)' }}>visiter</em>
            </h2>
          </motion.div>

          {/* Visit cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px', marginBottom:'2px' }}>
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                ),
                title: 'Les Vignobles',
                desc: 'Parcourez les rangées de vignes sur les hauts plateaux d\'Ambalavao à 1 200 mètres d\'altitude. Découvrez comment le terroir volcanique façonne chaque cuvée.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                ),
                title: 'Les Caves',
                desc: 'Plongez dans nos caves d\'élevage où reposent les fûts et les cuves. Une atmosphère unique, entre tradition et savoir-faire transmis de génération en génération.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                ),
                title: 'Les Ateliers de Fermentation',
                desc: 'Assistez en direct aux étapes de vinification. De la vendange à la mise en bouteille, observez les gestes précis qui donnent naissance aux vins Chan Foui & Fils.',
              },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.15,duration:.7}}
                style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(200,169,106,.1)', padding:'48px 36px', position:'relative', overflow:'hidden', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,169,106,.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.025)'}>
                <div style={{ color:'var(--gold)', marginBottom:'24px', opacity:.8 }}>{card.icon}</div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px', opacity:.7 }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(22px,2.5vw,30px)', fontWeight:300, color:'var(--white)', marginBottom:'16px', lineHeight:1.2 }}>{card.title}</h3>
                <p style={{ fontFamily:'var(--serif)', fontSize:'15px', fontStyle:'italic', color:'rgba(245,245,243,.5)', lineHeight:1.8 }}>{card.desc}</p>
                <div style={{ position:'absolute', bottom:0, left:0, width:'0%', height:'2px', background:'var(--gold)', transition:'width .4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.width = '100%'}
                  onMouseLeave={e => e.currentTarget.style.width = '0%'}/>
              </motion.div>
            ))}
          </div>

          {/* Dégustation banner */}
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.4,duration:.8}}
            style={{ background:'linear-gradient(135deg, rgba(110,15,26,.25), rgba(200,169,106,.08))', border:'1px solid rgba(200,169,106,.2)', padding:'48px 56px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'32px', flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'28px' }}>
              <div style={{ color:'var(--gold)', opacity:.9, flexShrink:0 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M8 22h8M12 11v11M6.6 3h10.8L20 11H4z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'10px' }}>Et dégustez sur place</div>
                <p style={{ fontFamily:'var(--serif)', fontSize:'clamp(18px,2.5vw,24px)', fontWeight:300, color:'var(--white)', lineHeight:1.3, margin:0 }}>
                  Vins rouges, vins blancs, rosés ou <em style={{ fontStyle:'italic', color:'var(--gold)' }}>vins fruités artisanaux</em>
                </p>
              </div>
            </div>
            <button onClick={() => navigate('reservation')}
              style={{ padding:'16px 40px', background:'var(--gold)', color:'var(--black)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s', flexShrink:0, whiteSpace:'nowrap' }}
              onMouseEnter={e => { e.target.style.background='transparent'; e.target.style.color='var(--gold)' }}
              onMouseLeave={e => { e.target.style.background='var(--gold)'; e.target.style.color='var(--black)' }}
            >Réserver une visite →</button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
