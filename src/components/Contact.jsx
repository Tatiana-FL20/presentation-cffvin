import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigate } from '../hooks/useStore'

const inputStyle = {
  width: '100%', padding: '14px 16px',
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
  color: 'var(--white)', fontFamily: 'var(--sans)', fontSize: '13px',
  outline: 'none', transition: 'border-color .3s',
}

export default function Contact() {
  const [form, setForm] = useState({ nom: '', entreprise: '', email: '', telephone: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const valid = form.nom && form.email && form.message

  const handleSubmit = e => {
    e.preventDefault()
    if (!valid) return
    setSent(true)
  }

  if (sent) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', padding: '48px' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✦</div>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 300, color: 'var(--white)', textAlign: 'center' }}>Message envoyé</h2>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(245,245,243,.4)', textAlign: 'center', maxWidth: '400px', lineHeight: 1.7 }}>
        Merci pour votre intérêt. Notre équipe commerciale vous recontactera sous 48h ouvrées.
      </p>
      <button onClick={() => navigate('b2b')} style={{ marginTop: '8px', padding: '14px 40px', background: 'transparent', border: '1px solid rgba(200,169,106,.4)', color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'border-color .3s' }}
        onMouseEnter={e => e.target.style.borderColor = 'var(--gold)'}
        onMouseLeave={e => e.target.style.borderColor = 'rgba(200,169,106,.4)'}
      >Retour B2B</button>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: '#0D0D0D', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => navigate('b2b')} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,.4)'}
        >← Retour</button>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Partenariat & Revendeurs</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--white)', marginBottom: '12px' }}>Nous contacter</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(245,245,243,.4)', lineHeight: 1.7 }}>
            Intéressé par un partenariat exclusif ? Renseignez vos coordonnées et nous vous rappelons sous 48h ouvrées.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.35)', marginBottom: '8px' }}>Nom *</label>
              <input value={form.nom} onChange={set('nom')} placeholder="Jean Dupont" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.35)', marginBottom: '8px' }}>Entreprise</label>
              <input value={form.entreprise} onChange={set('entreprise')} placeholder="Hôtel Ivato" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.35)', marginBottom: '8px' }}>Email *</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="contact@exemple.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.35)', marginBottom: '8px' }}>Téléphone</label>
              <input value={form.telephone} onChange={set('telephone')} placeholder="+261 34 00 000 00" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.35)', marginBottom: '8px' }}>Message *</label>
            <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Décrivez votre activité et vos besoins…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
            />
          </div>

          <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '8px 0' }} />

          <button type="submit" disabled={!valid} style={{ alignSelf: 'flex-start', padding: '16px 48px', background: valid ? 'var(--gold)' : 'rgba(255,255,255,.06)', color: valid ? 'var(--black)' : 'rgba(245,245,243,.2)', border: '1px solid ' + (valid ? 'var(--gold)' : 'transparent'), fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: valid ? 'pointer' : 'default', transition: 'all .3s' }}
            onMouseEnter={e => { if (valid) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' } }}
            onMouseLeave={e => { if (valid) { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' } }}
          >Envoyer le message</button>
        </form>
      </div>
    </motion.div>
  )
}
