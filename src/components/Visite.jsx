import { motion } from 'framer-motion'
import { navigate } from '../hooks/useStore'
import visiteBg from '../assets/visite.png'

const privileges = [
  { titre: 'Dégustations privées', desc: 'Découvrez chaque cuvée directement en cave, guidé par nos vignerons.' },
  { titre: 'Tarifs négociables', desc: 'En visite, les conditions commerciales s\'adaptent à vos besoins réels.' },
  { titre: 'Obtention des formats premium', desc: 'Devenez partenaire officiel sur place et accédez à l\'espace B2B.' },
  { titre: 'Sélection sur mesure', desc: 'Composez votre commande bouteille par bouteille, sans contrainte de palier.' },
  { titre: 'Accès à la cave', desc: 'Visitez nos installations : vignes, cuves, ligne d\'embouteillage.' },
  { titre: 'Enlèvement immédiat', desc: 'Repartez avec votre commande le jour même, sans délai de livraison.' },
]

export default function Visite() {
  return (
    <section style={{ background: '#080808', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient */}
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,42,61,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,151,58,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Photo pleine largeur */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9 }}
          style={{ position: 'relative', height: '420px', marginBottom: '80px', overflow: 'hidden' }}>
          <img src={visiteBg} alt="Nos locaux Chan Foui & Fils" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,.7) 0%, rgba(8,8,8,.2) 60%, rgba(8,8,8,.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 64px' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Antananarivo, Madagascar</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px,5vw,68px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                Tout se passe<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>dans nos locaux.</em>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end', marginBottom: '80px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,245,243,.5)', lineHeight: 1.8, marginBottom: '40px' }}>
              La vraie expérience Chan Foui & Fils ne s'expédie pas. Elle se vit sur place, entre les vignes et les cuves, avec nos équipes à vos côtés.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
                  titre: 'Visite guidée des vignes',
                  desc: 'Parcourez les parcelles à 1 200m d\'altitude avec nos vignerons.',
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 22h8M12 11v11M6.6 3h10.8L20 11H4z"/></svg>,
                  titre: 'Dégustation sur place',
                  desc: 'Rouges, rosés, vins fruités — goûtez directement à la source.',
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
                  titre: 'Découverte des caves',
                  desc: 'Fûts, cuves et ligne d\'embouteillage — tout le savoir-faire en direct.',
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                  titre: 'Tarifs négociables',
                  desc: 'En venant sur place, obtenez des conditions adaptées à vos besoins.',
                },
              ].map((item, i) => (
                <motion.div key={item.titre}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1, duration: .6 }}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                  <div style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px', opacity: .8 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '4px' }}>{item.titre}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', fontStyle: 'italic', color: 'rgba(245,245,243,.4)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Infos pratiques */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .15 }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '36px' }}>Nos locaux</div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Adresse */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ color: 'rgba(200,169,106,.7)', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.25)', marginBottom: '8px' }}>Adresse</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(245,245,243,.8)', lineHeight: 1.7 }}>
                    Ankadimbahoaka<br/>Antananarivo, Madagascar
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ color: 'rgba(200,169,106,.7)', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.25)', marginBottom: '8px' }}>Horaires</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--sans)', fontSize: '13px' }}>
                      <span style={{ color: 'rgba(245,245,243,.4)', minWidth: '80px' }}>Lun – Ven</span>
                      <span style={{ color: 'rgba(245,245,243,.8)' }}>08h00–11h30 · 13h00–16h00</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--sans)', fontSize: '13px' }}>
                      <span style={{ color: 'rgba(245,245,243,.4)', minWidth: '80px' }}>Samedi</span>
                      <span style={{ color: 'rgba(245,245,243,.8)' }}>08h30–11h00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingTop: '28px' }}>
                <div style={{ color: 'rgba(200,169,106,.7)', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.25)', marginBottom: '8px' }}>Contact direct</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <a href="tel:+261342232604" style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(245,245,243,.8)', textDecoration: 'none', transition: 'color .3s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(245,245,243,.8)'}>034 22 326 04</a>
                    <a href="mailto:info@chanfoui.mg" style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(245,245,243,.8)', textDecoration: 'none', transition: 'color .3s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(245,245,243,.8)'}>info@chanfoui.mg</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <button onClick={() => navigate('contact')}
                style={{ padding: '16px 40px', background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
                onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
              >Prendre rendez-vous →</button>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,106,.3), transparent)', marginBottom: '64px', transformOrigin: 'left' }} />

        {/* Privilèges */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '40px', textAlign: 'center' }}>
          Ce que vous gagnez en venant chez nous
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(200,169,106,.1)' }}>
          {privileges.map((p, i) => (
            <motion.div key={p.titre}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: i * .08 }}
              style={{ background: '#080808', padding: '36px 32px', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,169,106,.04)'}
              onMouseLeave={e => e.currentTarget.style.background = '#080808'}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'var(--serif)', fontSize: '48px', fontWeight: 300, color: 'rgba(200,169,106,.06)', lineHeight: 1, userSelect: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)', marginBottom: '20px' }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--white)', marginBottom: '10px', lineHeight: 1.2 }}>{p.titre}</h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(245,245,243,.4)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .2 }}
          style={{ marginTop: '64px', padding: '56px', border: '1px solid rgba(200,169,106,.2)', background: 'linear-gradient(135deg, rgba(139,42,61,.12), transparent 60%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', lineHeight: 1.4, marginBottom: '32px' }}>
            "Les meilleures affaires se concluent autour d'un verre,<br />
            <span style={{ color: 'var(--gold)' }}>dans nos caves à Ambalavao."</span>
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('contact')}
              style={{ padding: '16px 48px', background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
            >Nous rendre visite</button>
            <button onClick={() => navigate('b2b')}
              style={{ padding: '16px 48px', background: 'transparent', border: '1px solid rgba(200,169,106,.35)', color: 'rgba(245,245,243,.7)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(200,169,106,.35)'; e.target.style.color = 'rgba(245,245,243,.7)' }}
            >Espace B2B</button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
