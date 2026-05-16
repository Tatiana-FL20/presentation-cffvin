import { motion } from 'framer-motion'
import { wineClub } from '../data/wines'
import { addToCart, navigate } from '../hooks/useStore'

export default function WineClub() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}
      style={{ background:'transparent', minHeight:'100vh', paddingTop:'120px', paddingBottom:'120px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={()=>navigate('home')} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(34,35,37,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'60px', padding:0 }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(34,35,37,.4)'}
        >← Retour</button>

        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8}} style={{ textAlign:'center', marginBottom:'80px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Expérience VIP</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(44px,6vw,80px)', fontWeight:300, color:'var(--black)', lineHeight:1.05, marginBottom:'20px' }}>
            <em style={{ fontStyle:'italic' }}>Wine</em> Club
          </h1>
          <div style={{ width:'48px', height:'1px', background:'var(--gold)', margin:'0 auto 28px' }}/>
          <p style={{ fontFamily:'var(--serif)', fontSize:'19px', fontStyle:'italic', color:'rgba(34,35,37,.5)', maxWidth:'500px', margin:'0 auto' }}>
            Recevez chaque mois une sélection exclusive de nos meilleurs vins, livrée directement chez vous.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
          {wineClub.map((club, i) => (
            <motion.div key={club.id} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.15, duration:.7}}
              style={{ position:'relative', border:`1px solid ${club.recommended ? 'var(--gold)' : 'rgba(34,35,37,.1)'}`, padding:'40px 32px', background: club.recommended ? 'rgba(221,43,33,.05)' : 'rgba(34,35,37,.04)', animation: club.recommended ? 'glow 3s ease-in-out infinite' : 'none' }}>

              {club.recommended && (
                <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%)', padding:'4px 20px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  Plus populaire
                </div>
              )}

              <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{club.bouteilles} bouteilles / mois</div>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'40px', fontWeight:300, color:'var(--black)', marginBottom:'8px' }}>{club.nom}</h2>
              <div style={{ fontFamily:'var(--serif)', fontSize:'28px', color:'var(--gold)', marginBottom:'32px' }}>{club.prix}</div>

              <div style={{ borderTop:'1px solid rgba(34,35,37,.09)', paddingTop:'28px', marginBottom:'36px' }}>
                {club.avantages.map(a=>(
                  <div key={a} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'12px' }}>
                    <span style={{ color:'var(--gold)', marginTop:'2px', flexShrink:0 }}>✦</span>
                    <span style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(34,35,37,.65)', lineHeight:1.5 }}>{a}</span>
                  </div>
                ))}
              </div>

              <button onClick={()=>addToCart({...club, id:'club-'+club.id, nom:'Wine Club '+club.nom, type:'Abonnement'})}
                style={{ width:'100%', padding:'16px', background: club.recommended ? 'var(--gold)' : 'transparent', color: club.recommended ? 'var(--black)' : 'var(--gold)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}
                onMouseEnter={e=>{if(!club.recommended){e.target.style.borderColor='var(--gold-light)';e.target.style.color='var(--gold-light)'}}}
                onMouseLeave={e=>{if(!club.recommended){e.target.style.borderColor='var(--gold)';e.target.style.color='var(--gold)'}}}
              >Souscrire — {club.nom}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
