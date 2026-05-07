import { useState, useRef, useEffect } from 'react'

const vinsDisponibles = [
  "Coteau d'Ambalavao Rouge", "Vin Champêtre", "Côte de Fianar Rouge",
  "maroparasy Rouge (Premium)", "Coteau d'Ambalavao Blanc", "Côte de Fianar Blanc",
  "maroparasyBlanc Doux", "aperao (Nouveauté 2019)"
]

export default function Commander() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', vin: '', qte: '6', msg: '' })
  const [sent, setSent] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current && ref.current.classList.add('is-visible') }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const input = (key, placeholder, type = 'text') => (
    <input type={type} placeholder={placeholder} value={form[key]}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      style={{
        width: '100%', padding: '16px 20px',
        background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.12)',
        color: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 300,
        outline: 'none', transition: 'border-color 0.3s',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
      onBlur={e => e.target.style.borderColor = 'rgba(245,240,232,0.12)'}
    />
  )

  return (
    <>
      <section id="commander" style={{ background: 'linear-gradient(160deg, #2A0810 0%, var(--bordeaux-deep) 100%)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(196,151,58,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(196,151,58,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-200px', right: '-200px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(196,151,58,0.08)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="reveal" style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Commander</p>
            <h2 className="reveal" data-delay="0.1" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1 }}>
              Commandez<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>nos vins</em>
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '28px auto' }} />
            <p className="reveal" data-delay="0.2" style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', maxWidth: '460px', margin: '0 auto' }}>
              Livraison sur toute l'île. Minimum 6 bouteilles. Tarifs préférentiels pour les professionnels (restaurants, hôtels).
            </p>
          </div>

          {sent ? (
            <div className="reveal is-visible" style={{ textAlign: 'center', padding: '80px 40px', border: '1px solid rgba(196,151,58,0.25)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '72px', color: 'var(--gold)', marginBottom: '24px', animation: 'float 3s ease-in-out infinite' }}>✦</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 300, color: 'var(--cream)', marginBottom: '16px' }}>Votre commande est envoyée</h3>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)' }}>Nous vous contacterons dans les 24 heures. Merci de votre confiance.</p>
            </div>
          ) : (
            <div ref={ref} className="reveal">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>{input('nom', 'Votre nom complet')}</div>
                <div>{input('email', 'Adresse email', 'email')}</div>
                <div>{input('tel', 'Téléphone (+261...)', 'tel')}</div>
                <div>
                  <select value={form.vin} onChange={e => setForm({ ...form, vin: e.target.value })} style={{
                    width: '100%', padding: '16px 20px',
                    background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.12)',
                    color: form.vin ? 'var(--cream)' : 'rgba(245,240,232,0.35)',
                    fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 300,
                    outline: 'none', cursor: 'pointer',
                  }}>
                    <option value="" disabled>Vin souhaité</option>
                    {vinsDisponibles.map(v => <option key={v} value={v} style={{ background: 'var(--bordeaux-deep)' }}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.12)' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.5)' }}>Quantité (bouteilles)</span>
                  {[6, 12, 24, 48].map(n => (
                    <button key={n} onClick={() => setForm({ ...form, qte: String(n) })} style={{
                      padding: '6px 16px', border: '1px solid',
                      borderColor: form.qte === String(n) ? 'var(--gold)' : 'rgba(245,240,232,0.15)',
                      background: form.qte === String(n) ? 'var(--gold)' : 'transparent',
                      color: form.qte === String(n) ? 'var(--bordeaux-deep)' : 'rgba(245,240,232,0.5)',
                      fontFamily: 'var(--sans)', fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s',
                    }}>{n}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <textarea rows={4} placeholder="Message, adresse de livraison, demande professionnelle (restaurant, hôtel, événement)..."
                  value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                  style={{
                    width: '100%', padding: '16px 20px', resize: 'vertical',
                    background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.12)',
                    color: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 300, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(245,240,232,0.12)'}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button onClick={() => { if (form.nom && form.email) setSent(true) }} style={{
                  padding: '20px 72px',
                  background: 'linear-gradient(90deg, var(--bordeaux-mid), var(--gold))',
                  color: 'var(--cream)',
                  border: 'none', fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.4s',
                  position: 'relative', overflow: 'hidden',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >Envoyer ma commande</button>
                <p style={{ marginTop: '16px', fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.05em' }}>Réponse garantie sous 24h · Livraison dans toute Madagascar</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0D0308', padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--cream)', marginBottom: '8px' }}>
            <span style={{ color: 'var(--gold)' }}>CF</span> Chan Foui & Fils
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>Ambalavao, Madagascar · Depuis 1980</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(196,151,58,0.4)', margin: '0 auto 20px' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(245,240,232,0.25)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
            L'abus d'alcool est dangereux pour la santé.<br />À consommer avec modération.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(245,240,232,0.2)', letterSpacing: '0.05em' }}>© 2025 Chan Foui & Fils<br />Tous droits réservés</div>
        </div>
      </footer>
    </>
  )
}
