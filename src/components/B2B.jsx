import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wines } from '../data/wines'
import { navigate } from '../hooks/useStore'

const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: 'rgba(34,35,37,.06)', border: '1px solid rgba(34,35,37,.12)',
  color: 'var(--black)', fontFamily: 'var(--sans)', fontSize: '13px', outline: 'none', transition: 'border-color .3s',
}

function AccessGate({ onUnlock }) {
  const [mode, setMode] = useState('carte')
  const [carteRouge, setCarteRouge] = useState('')
  const [nif, setNif] = useState('')
  const [stat, setStat] = useState('')
  const [error, setError] = useState(false)

  const canSubmit = mode === 'carte' ? carteRouge.trim() : nif.trim() && stat.trim()

  const handleSubmit = e => {
    e.preventDefault()
    if (!canSubmit) return
    setError(false)
    onUnlock(mode === 'carte'
      ? { carteRouge: carteRouge.trim() }
      : { nif: nif.trim(), stat: stat.trim() }
    )
  }

  const tabStyle = active => ({
    flex: 1, padding: '10px 16px', border: '1px solid',
    borderColor: active ? 'var(--gold)' : 'rgba(34,35,37,.12)',
    background: active ? 'rgba(221,43,33,.1)' : 'transparent',
    color: active ? 'var(--gold)' : 'rgba(34,35,37,.35)',
    fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500,
    letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s',
  })

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
      style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>

      <div style={{ width: '56px', height: '56px', border: '1px solid rgba(221,43,33,.35)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', background: 'rgba(221,43,33,.06)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(221,43,33,.8)" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Accès Réservé</div>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, color: 'var(--black)', marginBottom: '16px', lineHeight: 1.1 }}>
        Espace <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Professionnel</em>
      </h2>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.4)', lineHeight: 1.8, marginBottom: '32px' }}>
        L'accès aux offres B2B est réservé aux partenaires référencés.<br/>
        Identifiez-vous avec votre <span style={{ color: 'rgba(221,43,33,.7)' }}>Carte Rouge</span> ou votre <span style={{ color: 'rgba(221,43,33,.7)' }}>NIF &amp; STAT</span>.
      </p>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
        <button type="button" onClick={() => { setMode('carte'); setError(false) }} style={tabStyle(mode === 'carte')}>
          Carte Rouge
        </button>
        <button type="button" onClick={() => { setMode('nif'); setError(false) }} style={tabStyle(mode === 'nif')}>
          NIF &amp; STAT
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        <AnimatePresence mode="wait">
          {mode === 'carte' ? (
            <motion.div key="carte" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: .25 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.35)', marginBottom: '8px' }}>
                Numéro Carte Rouge *
              </div>
              <input
                value={carteRouge}
                onChange={e => { setCarteRouge(e.target.value); setError(false) }}
                placeholder="Ex : CR-00001"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'}
              />
            </motion.div>
          ) : (
            <motion.div key="nif" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .25 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.35)', marginBottom: '8px' }}>
                  NIF *
                </div>
                <input
                  value={nif}
                  onChange={e => { setNif(e.target.value); setError(false) }}
                  placeholder="Numéro d'Identification Fiscale"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.35)', marginBottom: '8px' }}>
                  STAT *
                </div>
                <input
                  value={stat}
                  onChange={e => { setStat(e.target.value); setError(false) }}
                  placeholder="Numéro STAT"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(255,100,100,.75)', letterSpacing: '.05em' }}>
            Identifiants non reconnus. Contactez-nous pour obtenir votre accès.
          </div>
        )}

        <button type="submit" disabled={!canSubmit}
          style={{ width: '100%', padding: '16px', background: canSubmit ? 'var(--gold)' : 'rgba(34,35,37,.07)', color: canSubmit ? 'var(--black)' : 'rgba(34,35,37,.2)', border: `1px solid ${canSubmit ? 'var(--gold)' : 'transparent'}`, fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: canSubmit ? 'pointer' : 'default', transition: 'all .3s', marginTop: '8px' }}
          onMouseEnter={e => { if (canSubmit) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' } }}
          onMouseLeave={e => { if (canSubmit) { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' } }}
        >Accéder aux offres →</button>
      </form>

      <div style={{ marginTop: '32px', padding: '20px', border: '1px solid rgba(34,35,37,.09)', background: 'rgba(34,35,37,.04)' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(34,35,37,.3)', lineHeight: 1.8, margin: 0 }}>
          Pas encore partenaire ?{' '}
          <button onClick={() => navigate('contact')} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: '11px', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Contactez-nous
          </button>{' '}pour obtenir votre Carte Rouge.
        </p>
      </div>
    </motion.div>
  )
}

export default function B2B() {
  const [unlocked, setUnlocked] = useState(false)
  const [credentials, setCredentials] = useState(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: 'transparent', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => navigate('home')} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,35,37,.4)'}
        >← Retour</button>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div key="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AccessGate onUnlock={creds => { setCredentials(creds); setUnlocked(true) }} />
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '60px', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Espace Professionnel</div>
                  <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,60px)', fontWeight: 300, color: 'var(--black)', marginBottom: '12px' }}>Portail B2B</h1>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(34,35,37,.4)', maxWidth: '560px', lineHeight: 1.7 }}>
                    Bienvenue, partenaire. Commande minimum 6 bouteilles par cuvée. Facturation à 30 jours pour clients référencés.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', border: '1px solid rgba(221,43,33,.2)', background: 'rgba(221,43,33,.05)', flexShrink: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 8px #4CAF5088' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.35)' }}>Carte Rouge</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--gold)', marginTop: '2px' }}>{credentials?.carteRouge}</div>
                  </div>
                </div>
              </div>

              {/* Encart visite */}
              <div style={{ marginBottom: '40px', padding: '28px 32px', background: 'linear-gradient(135deg, rgba(221,43,33,.12), rgba(221,43,33,.06))', border: '1px solid rgba(221,43,33,.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '44px', height: '44px', border: '1px solid rgba(221,43,33,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>🏠</div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Vous êtes à Antananarivo ?</div>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontStyle: 'italic', color: 'rgba(34,35,37,.8)', margin: 0, lineHeight: 1.4 }}>
                      Venez directement dans nos locaux — tarifs négociables, enlèvement immédiat, sélection sur mesure.
                    </p>
                  </div>
                </div>
                <button onClick={() => navigate('contact')}
                  style={{ padding: '12px 28px', background: 'transparent', border: '1px solid rgba(221,43,33,.4)', color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s', flexShrink: 0, whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
                >Prendre rendez-vous →</button>
              </div>

              {/* Catalogue sans prix */}
              <div style={{ background: 'rgba(34,35,37,.04)', border: '1px solid rgba(34,35,37,.09)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'rgba(221,43,33,.08)', borderBottom: '1px solid rgba(221,43,33,.15)', padding: '14px 24px' }}>
                  {['Cuvée', 'Type', 'Millésime'].map(h => (
                    <div key={h} style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{h}</div>
                  ))}
                </div>
                {wines.map((w, i) => (
                  <div key={w.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '18px 24px', borderBottom: i < wines.length - 1 ? '1px solid rgba(34,35,37,.06)' : 'none', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(221,43,33,.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '4px', height: '20px', background: w.color, opacity: .8, flexShrink: 0 }} />
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--black)' }}>{w.nom}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(34,35,37,.4)', alignSelf: 'center' }}>{w.type}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(34,35,37,.4)', alignSelf: 'center' }}>{w.millesime || '—'}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { title: 'Commander en gros', desc: 'Passez votre commande B2B directement en ligne. Livraison sous 48–72h.', cta: 'Passer une commande', action: () => navigate('b2border'), style: { background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)' } },
                  { title: 'Devenir revendeur', desc: 'Partenariat exclusif, conditions préférentielles, support commercial dédié.', cta: 'Nous contacter', action: () => navigate('contact'), style: { background: 'transparent', border: '1px solid rgba(221,43,33,.4)', color: 'var(--gold)' } },
                ].map(card => (
                  <div key={card.title} style={{ padding: '40px', border: '1px solid rgba(34,35,37,.09)' }}>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 300, color: 'var(--black)', marginBottom: '12px' }}>{card.title}</h3>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.4)', lineHeight: 1.7, marginBottom: '28px' }}>{card.desc}</p>
                    <button onClick={card.action} style={{ padding: '14px 32px', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'opacity .3s', ...card.style }}
                      onMouseEnter={e => e.target.style.opacity = '.8'}
                      onMouseLeave={e => e.target.style.opacity = '1'}
                    >{card.cta}</button>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
