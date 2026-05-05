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
            <p style={{ fontFamily:'var(--serif)', fontSize:'15px', fontStyle:'italic', color:'rgba(245,245,243,.4)', lineHeight:1.8, maxWidth:'340px', marginBottom:'16px' }}>
              Depuis 1980, nous cultivons l'excellence viticole sur les hauts plateaux d'Ambalavao, à Madagascar.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {['Viticulteur','Encaveur','Embouteilleur','Grossiste'].map(m=>(
                <span key={m} style={{ fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(200,169,106,.55)', border:'1px solid rgba(200,169,106,.2)', padding:'4px 10px' }}>{m}</span>
              ))}
            </div>
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
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Nos locaux</div>
            {[
              'Ankadimbahoaka',
              'Antananarivo, Madagascar',
              '034 22 326 04',
              'info@chanfoui.mg',
            ].map(l=>(
              <div key={l} style={{ marginBottom:'10px', fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', lineHeight:1.6 }}>{l}</div>
            ))}
            <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.2)', marginBottom:'8px' }}>Horaires</div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.35)', lineHeight:1.7 }}>
                Lun – Ven · 08h00–11h30 · 13h00–16h00<br/>
                Samedi · 08h30–11h00
              </div>
            </div>
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
