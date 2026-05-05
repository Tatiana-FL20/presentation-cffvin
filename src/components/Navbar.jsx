import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, navigate, setState } from '../hooks/useStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pct, setPct] = useState(0)
  const cartCount = useStore(s => s.cart.reduce((n,i)=>n+i.qty,0))

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const h = document.body.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label:'Histoire', href:'#histoire', action:null },
    { label:'Nos Vins', href:'#vins', action:null },
    { label:'Vignoble', href:'#vignoble', action:()=>{ navigate('home'); setTimeout(()=>document.getElementById('vignoble')?.scrollIntoView({behavior:'smooth',block:'start'}),400) } },
    { label:'Réserver', href:null, action:()=>navigate('reservation') },
    { label:'Wine Club', href:null, action:()=>navigate('wineclub') },
    { label:'Pro / B2B', href:null, action:()=>navigate('b2b') },
  ]

  const S = { fontFamily:'var(--sans)', fontSize:'10px', fontWeight:400, letterSpacing:'0.16em', textTransform:'uppercase', textDecoration:'none', cursor:'pointer', background:'none', border:'none', transition:'color .3s, letter-spacing .3s', padding:0 }

  return (
    <motion.nav initial={{ y:-80 }} animate={{ y:0 }} transition={{ duration:.7, ease:[.16,1,.3,1] }}
      style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, padding: scrolled ? '14px 40px' : '26px 40px',
        background: scrolled ? 'rgba(11,11,11,.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        transition:'padding .4s, background .4s' }}>
      <div style={{ position:'absolute', bottom:0, left:0, height:'1px', width:pct+'%', background:'linear-gradient(90deg,var(--bordeaux),var(--gold))', transition:'width .1s' }} />

      <button onClick={() => navigate('home')} style={{ ...S, color:'var(--white)', fontSize:'16px', fontFamily:'var(--serif)', fontWeight:600, letterSpacing:'0.06em' }}>
        <span className="gold-text">CF</span><span style={{ color:'var(--white)' }}> & Fils</span>
      </button>

      <div style={{ display:'flex', gap:'28px', alignItems:'center' }}>
        {nav.map(l => (
          <a key={l.label} href={l.href||'#'} onClick={l.action ? e=>{e.preventDefault();l.action()} : undefined}
            style={{ ...S, color: l.label==='Réserver' ? 'var(--gold)' : 'rgba(245,245,243,.6)' }}
            onMouseEnter={e=>{e.target.style.color='var(--gold)';e.target.style.letterSpacing='.22em'}}
            onMouseLeave={e=>{e.target.style.color=l.label==='Réserver'?'var(--gold)':'rgba(245,245,243,.6)';e.target.style.letterSpacing='.16em'}}
          >{l.label}</a>
        ))}
        <button onClick={()=>setState({cartOpen:true})} style={{ ...S, color:'var(--gold)', position:'relative', padding:'8px 16px', border:'1px solid rgba(200,169,106,.4)' }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(200,169,106,.4)'}>
          Panier
          {cartCount > 0 && (
            <motion.span initial={{scale:0}} animate={{scale:1}} style={{ position:'absolute', top:'-6px', right:'-6px', width:'18px', height:'18px', borderRadius:'50%', background:'var(--bordeaux)', color:'var(--white)', fontSize:'9px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {cartCount}
            </motion.span>
          )}
        </button>
        {/* Admin discreet link */}
        <button onClick={()=>navigate('admin')} style={{ ...S, color:'rgba(245,245,243,.15)', fontSize:'9px', letterSpacing:'.1em' }}
          onMouseEnter={e=>e.target.style.color='rgba(200,169,106,.5)'}
          onMouseLeave={e=>e.target.style.color='rgba(245,245,243,.15)'}
          title="Administration">⚙</button>
      </div>
    </motion.nav>
  )
}
