import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wines } from '../data/wines'
import { addToCart, navigate } from '../hooks/useStore'

const cats = [
  { key:'all', label:'Toute la gamme' },
  { key:'rouge', label:'Vins Rouges' },
  { key:'blanc', label:'Vins Blancs' },
  { key:'rose', label:'Vins Rosés' },
  { key:'aperitif', label:'Apéritifs' },
  { key:'jus', label:'Jus de Raisin' },
  { key:'spiritueux', label:'Spiritueux' },
]

function BottleSVG({ color='#6E0F1A', hovered=false }) {
  return (
    <svg width="60" height="150" viewBox="0 0 60 150" fill="none" style={{ filter: hovered ? `drop-shadow(0 0 18px ${color}88)` : 'none', transition:'filter .4s', animation: hovered ? 'float 3s ease-in-out infinite' : 'none' }}>
      <path d="M24 0h12v14c8 3 10 8 10 14v96c0 8-5 14-16 14s-16-6-16-14V28c0-6 2-11 10-14V0z" fill={color}/>
      <rect x="22" y="50" width="16" height="40" rx="2" fill="rgba(245,245,243,.1)"/>
      <path d="M22 50h16v8h-16z" fill="rgba(245,245,243,.07)"/>
      <rect x="28" y="14" width="4" height="10" rx="2" fill={color} opacity=".7"/>
    </svg>
  )
}

function WineCard({ wine }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div layout initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.5}}
      style={{ position:'relative', cursor:'pointer' }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      onClick={()=>navigate('product',wine)}>

      <div style={{ background: hovered ? 'rgba(200,169,106,.06)' : 'rgba(255,255,255,.025)', border:`1px solid ${hovered ? 'rgba(200,169,106,.4)' : 'rgba(255,255,255,.06)'}`, padding:'40px 28px', transition:'all .4s cubic-bezier(.16,1,.3,1)', transform: hovered ? 'translateY(-8px)' : 'translateY(0)' }}>

        {/* Badges */}
        <div style={{ position:'absolute', top:'16px', right:'16px', display:'flex', gap:'6px', flexDirection:'column', alignItems:'flex-end' }}>
          {wine.premium && <span style={{ padding:'3px 10px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'8px', fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase' }}>Premium</span>}
          {wine.badge && !wine.premium && <span style={{ padding:'3px 10px', background:'var(--bordeaux)', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'8px', fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase' }}>{wine.badge}</span>}
        </div>

        {/* Bottle */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:'28px', height:'150px', alignItems:'flex-end' }}>
          <BottleSVG color={wine.color} hovered={hovered}/>
        </div>

        {/* Info — hidden by default, revealed on hover */}
        <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px', opacity:.7 }}>{wine.type} · {wine.millesime}</div>
        <h3 style={{ fontFamily:'var(--serif)', fontSize:'22px', fontWeight:400, color:'var(--white)', marginBottom:'12px', lineHeight:1.2 }}>{wine.nom}</h3>

        <motion.div animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }} transition={{ duration:.3 }} style={{ overflow:'hidden' }}>
          <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:'16px', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'20px', color:'var(--gold)' }}>{wine.prix}</div>
            <button onClick={e=>{e.stopPropagation();addToCart(wine)}} style={{ padding:'10px 20px', background:'var(--gold)', color:'var(--black)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer', transition:'background .3s, color .3s' }}
              onMouseEnter={e=>{e.target.style.background='transparent';e.target.style.color='var(--gold)'}}
              onMouseLeave={e=>{e.target.style.background='var(--gold)';e.target.style.color='var(--black)'}}
            >+ Panier</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Catalog() {
  const [cat, setCat] = useState('all')
  const filtered = cat==='all' ? wines : wines.filter(w=>w.categorie===cat)

  return (
    <section id="vins" style={{ background:'#0F0F0F', padding:'120px 48px', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 80px,rgba(200,169,106,.015) 80px,rgba(200,169,106,.015) 81px)', pointerEvents:'none' }}/>
      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative' }}>

        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}}
          style={{ textAlign:'center', marginBottom:'64px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Notre Sélection</div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(44px,6vw,80px)', fontWeight:300, color:'var(--white)', lineHeight:1.05 }}>
            <em style={{ fontStyle:'italic' }}>Nos</em> Vins
          </h2>
          <div style={{ width:'48px', height:'1px', background:'var(--gold)', margin:'28px auto' }}/>
          <p style={{ fontFamily:'var(--serif)', fontSize:'19px', fontStyle:'italic', color:'rgba(245,245,243,.45)', maxWidth:'480px', margin:'0 auto' }}>
            Chaque bouteille est le fruit d'un terroir unique, transmis de génération en génération.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.7,delay:.2}}
          style={{ display:'flex', justifyContent:'center', gap:'8px', marginBottom:'64px', flexWrap:'wrap' }}>
          {cats.map(c=>(
            <button key={c.key} onClick={()=>setCat(c.key)} style={{ padding:'11px 28px', border:'1px solid', borderColor: cat===c.key ? 'var(--gold)' : 'rgba(255,255,255,.1)', background: cat===c.key ? 'var(--gold)' : 'transparent', color: cat===c.key ? 'var(--black)' : 'rgba(245,245,243,.5)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.16em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>{c.label}</button>
          ))}
        </motion.div>

        <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'24px' }}>
          <AnimatePresence>
            {filtered.map(w=><WineCard key={w.id} wine={w}/>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
