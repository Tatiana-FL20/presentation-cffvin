import { useState } from 'react'
import { motion } from 'framer-motion'
import { addToCart, navigate } from '../hooks/useStore'
import AromWheel from './AromWheel'

const wineImages = import.meta.glob('../assets/vins/*.png', { eager: true })

export default function ProductPage({ wine }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(wine, qty)
    setAdded(true)
    setTimeout(()=>setAdded(false), 2000)
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}
      style={{ background:'var(--black)', minHeight:'100vh', paddingTop:'100px' }}>

      {/* Back */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px' }}>
        <button onClick={()=>navigate('home')} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'48px', display:'flex', alignItems:'center', gap:'8px', padding:0 }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(245,245,243,.4)'}
        >← Retour aux vins</button>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>
          {/* Left - Bottle */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'48px' }}>
            <div style={{ position:'relative', display:'flex', justifyContent:'center', padding:'60px 0' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at center, ${wine.color}22 0%, transparent 70%)` }}/>
              {wineImages[`../assets/vins/${wine.id}.png`]?.default
                ? <img src={wineImages[`../assets/vins/${wine.id}.png`].default} alt={wine.nom} style={{ height:'300px', width:'auto', objectFit:'contain', animation:'float 5s ease-in-out infinite', filter:`drop-shadow(0 0 40px ${wine.color}55)` }} />
                : <svg width="120" height="300" viewBox="0 0 120 300" fill="none" style={{ animation:'float 5s ease-in-out infinite', filter:`drop-shadow(0 0 40px ${wine.color}55)` }}>
                    <path d="M48 0h24v28c16 5 20 14 20 26v192c0 16-10 28-32 28s-32-12-32-28V54c0-12 4-21 20-26V0z" fill={wine.color}/>
                    <path d="M44 80h32v80h-32z" fill="rgba(245,245,243,.08)"/>
                  </svg>
              }
            </div>
            {/* Arom wheel */}
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Profil Aromatique</div>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <AromWheel aromes={wine.aromes} color={wine.color}/>
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div style={{ paddingTop:'40px' }}>
            {(wine.premium||wine.badge) && (
              <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.2}}
                style={{ display:'inline-block', padding:'4px 16px', background: wine.premium ? 'var(--gold)' : 'var(--bordeaux)', color: wine.premium ? 'var(--black)' : 'var(--white)', fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', marginBottom:'24px' }}>
                {wine.badge||'Premium'}
              </motion.div>
            )}

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{wine.type} · {wine.degre} · {wine.millesime}</div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(40px,5vw,64px)', fontWeight:300, color:'var(--white)', lineHeight:1.1, marginBottom:'28px' }}>{wine.nom}</h1>
              <div style={{ width:'48px', height:'1px', background:'var(--gold)', marginBottom:'28px' }}/>
              <p style={{ fontFamily:'var(--serif)', fontSize:'18px', fontStyle:'italic', color:'rgba(245,245,243,.65)', lineHeight:1.85, marginBottom:'40px' }}>{wine.desc}</p>
            </motion.div>

            {/* Accords */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(245,245,243,.35)', marginBottom:'12px' }}>Accords Parfaits</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'48px' }}>
                {wine.accord.map(a=>(
                  <span key={a} style={{ padding:'6px 14px', border:'1px solid rgba(200,169,106,.25)', color:'rgba(245,245,243,.6)', fontFamily:'var(--sans)', fontSize:'11px' }}>{a}</span>
                ))}
              </div>
            </motion.div>

            {/* Prix + CTA */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'48px', fontWeight:300, color:'var(--gold)', marginBottom:'28px' }}>{wine.prix}</div>
              <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px' }}>
                <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(255,255,255,.12)' }}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:'44px', height:'44px', background:'none', border:'none', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'16px', cursor:'pointer' }}>−</button>
                  <div style={{ width:'44px', textAlign:'center', fontFamily:'var(--sans)', fontSize:'14px', color:'var(--white)' }}>{qty}</div>
                  <button onClick={()=>setQty(q=>q+1)} style={{ width:'44px', height:'44px', background:'none', border:'none', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'16px', cursor:'pointer' }}>+</button>
                </div>
                <motion.button whileTap={{scale:.97}} onClick={handleAdd}
                  style={{ flex:1, padding:'16px', background: added ? 'var(--olive)' : 'var(--gold)', color: added ? 'var(--white)' : 'var(--black)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer', transition:'background .3s' }}>
                  {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                </motion.button>
              </div>
              <p style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.25)', letterSpacing:'.05em' }}>Livraison gratuite dès 6 bouteilles · Toute Madagascar</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
