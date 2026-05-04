import { motion } from 'framer-motion'
import { navigate } from '../hooks/useStore'

export default function Footer() {
  return (
    <footer style={{ background:'#060606', padding:'72px 48px 40px', borderTop:'1px solid rgba(200,169,106,.1)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'60px', marginBottom:'64px' }}>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'28px', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>
              <span className="gold-text">CF</span> Chan Foui & Fils
            </div>
            <p style={{ fontFamily:'var(--serif)', fontSize:'15px', fontStyle:'italic', color:'rgba(245,245,243,.4)', lineHeight:1.8, maxWidth:'340px' }}>
              Depuis 1980, nous cultivons l'excellence viticole sur les hauts plateaux d'Ambalavao, à Madagascar.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Navigation</div>
            {['Notre Histoire','Nos Vins','Wine Club','Espace B2B'].map(l=>(
              <div key={l} style={{ marginBottom:'12px' }}>
                <button style={{ background:'none', border:'none', fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', cursor:'pointer', padding:0, transition:'color .3s' }}
                  onMouseEnter={e=>e.target.style.color='var(--gold)'}
                  onMouseLeave={e=>e.target.style.color='rgba(245,245,243,.4)'}
                >{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Contact</div>
            {['Ambalavao, Madagascar','info@chanfoui.mg','+(261) 34 XX XX XX'].map(l=>(
              <div key={l} style={{ marginBottom:'12px', fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', lineHeight:1.6 }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.2)', letterSpacing:'.05em' }}>© 2025 Chan Foui & Fils · Tous droits réservés</div>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.2)', letterSpacing:'.05em' }}>L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</div>
        </div>
      </div>
    </footer>
  )
}
