import { motion } from 'framer-motion'
import { navigate } from '../hooks/useStore'

export default function Footer() {
  return (
    <footer style={{ background:'#1c1e20', padding:'72px 48px 40px', borderTop:'1px solid rgba(221,43,33,.1)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'60px', marginBottom:'64px' }}>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'28px', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>
              <span className="gold-text">CF</span> Chan Foui & Fils
            </div>
            <p style={{ fontFamily:'var(--serif)', fontSize:'15px', fontStyle:'italic', color:'rgba(245,245,243,.4)', lineHeight:1.8, maxWidth:'340px', marginBottom:'16px' }}>
              Depuis 1960, nous cultivons l'excellence viticole sur les hauts plateaux d'Ambalavao, à Madagascar.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {['Viticulteur','Encaveur','Embouteilleur','Grossiste'].map(m=>(
                <span key={m} style={{ fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(221,43,33,.55)', border:'1px solid rgba(221,43,33,.2)', padding:'4px 10px' }}>{m}</span>
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
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'24px' }}>Nos locaux</div>

            <div style={{ display:'flex', flexDirection:'column', gap:'14px', marginBottom:'20px' }}>
              {/* Adresse */}
              <div style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                <div style={{ flexShrink:0, marginTop:'1px', color:'rgba(221,43,33,.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.45)', lineHeight:1.7 }}>
                  Ankadimbahoaka<br/>Antananarivo, Madagascar
                </div>
              </div>

              {/* Téléphone */}
              <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                <div style={{ flexShrink:0, color:'rgba(221,43,33,.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <a href="tel:+261342232604" style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.45)', textDecoration:'none', transition:'color .3s' }}
                  onMouseEnter={e=>e.target.style.color='var(--gold)'}
                  onMouseLeave={e=>e.target.style.color='rgba(245,245,243,.45)'}>
                  034 22 326 04
                </a>
              </div>

              {/* Email */}
              <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                <div style={{ flexShrink:0, color:'rgba(221,43,33,.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <a href="mailto:info@chanfoui.mg" style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.45)', textDecoration:'none', transition:'color .3s' }}
                  onMouseEnter={e=>e.target.style.color='var(--gold)'}
                  onMouseLeave={e=>e.target.style.color='rgba(245,245,243,.45)'}>
                  info@chanfoui.mg
                </a>
              </div>
            </div>

            {/* Horaires */}
            <div style={{ padding:'14px 16px', border:'1px solid rgba(221,43,33,.12)', background:'rgba(221,43,33,.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(221,43,33,.7)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <div style={{ fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(221,43,33,.6)' }}>Horaires d'ouverture</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--sans)', fontSize:'11px' }}>
                  <span style={{ color:'rgba(245,245,243,.35)' }}>Lun – Ven</span>
                  <span style={{ color:'rgba(245,245,243,.55)' }}>08h–11h30 · 13h–16h</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--sans)', fontSize:'11px' }}>
                  <span style={{ color:'rgba(245,245,243,.35)' }}>Samedi</span>
                  <span style={{ color:'rgba(245,245,243,.55)' }}>08h30–11h00</span>
                </div>
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
