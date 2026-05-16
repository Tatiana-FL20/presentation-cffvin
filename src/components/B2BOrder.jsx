import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from '../hooks/useStore'
import { wines } from '../data/wines'

const label = { fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.35)' }

const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: 'rgba(34,35,37,.06)', border: '1px solid rgba(34,35,37,.12)',
  color: 'var(--black)', fontFamily: 'var(--sans)', fontSize: '13px', outline: 'none', transition: 'border-color .3s',
}

function StepIndicator({ step }) {
  const steps = ['Sélection', 'Coordonnées', 'Confirmation', 'Paiement']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '48px' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < step ? 'var(--gold)' : 'transparent', border: i <= step ? '1px solid var(--gold)' : '1px solid rgba(34,35,37,.18)', color: i < step ? 'var(--black)' : i === step ? 'var(--gold)' : 'rgba(34,35,37,.25)', fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, transition: 'all .3s' }}>
              {i < step ? '✓' : i + 1}
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: i === step ? 'var(--gold)' : 'rgba(34,35,37,.25)', whiteSpace: 'nowrap' }}>{s}</div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: '80px', height: '1px', background: i < step ? 'var(--gold)' : 'rgba(34,35,37,.12)', margin: '0 12px', marginBottom: '28px', transition: 'background .3s' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function OrderSummary({ quantities, compact = false }) {
  const selected = wines.filter(w => quantities[w.id] > 0)
  const totalBottles = selected.reduce((s, w) => s + quantities[w.id], 0)

  return (
    <div style={{ background: 'rgba(34,35,37,.05)', border: '1px solid rgba(221,43,33,.15)', padding: compact ? '20px 24px' : '32px' }}>
      <div style={{ ...label, marginBottom: '16px' }}>Récapitulatif commande</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {selected.map(wine => (
          <div key={wine.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', color: 'var(--black)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{wine.nom}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'rgba(34,35,37,.35)', letterSpacing: '.1em', marginTop: '2px' }}>{wine.type}</div>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.6)', flexShrink: 0 }}>{quantities[wine.id]} btl</div>
          </div>
        ))}
      </div>
      <div style={{ height: '1px', background: 'rgba(221,43,33,.15)', margin: '0 0 16px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={label}>Total bouteilles</span>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--gold)' }}>{totalBottles}</span>
      </div>
    </div>
  )
}

export default function B2BOrder() {
  const [step, setStep] = useState(0)
  const [quantities, setQuantities] = useState(Object.fromEntries(wines.map(w => [w.id, 0])))
  const [proIdMode, setProIdMode] = useState('carte')
  const [payMethod, setPayMethod] = useState('mobile')
  const [payRef, setPayRef] = useState('')
  const [customer, setCustomer] = useState({
    type: 'entreprise', nom: '', entreprise: '', telephone: '', email: '',
    adresse: '', ville: '', codePostal: '', carteRouge: '', nif: '', stat: '', notes: '',
  })

  const setQty = (id, val) => {
    const n = Math.max(0, parseInt(val) || 0)
    setQuantities(q => ({ ...q, [id]: n }))
  }
  const setField = k => e => setCustomer(c => ({ ...c, [k]: e.target.value }))

  const selected = wines.filter(w => quantities[w.id] > 0)
  const hasInvalid = selected.some(w => quantities[w.id] < 6)
  const canNextStep1 = selected.length > 0 && !hasInvalid

  const proIdValid = proIdMode === 'carte' ? !!customer.carteRouge : !!(customer.nif && customer.stat)
  const canNextStep2 = !!(customer.nom && customer.telephone && customer.email
    && customer.adresse && customer.ville
    && (customer.type === 'particulier' || (customer.entreprise && proIdValid)))

  // Step 0 — Wine selection
  if (step === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: 'transparent', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => navigate('b2b')} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,35,37,.4)'}
        >← Retour</button>

        <StepIndicator step={0} />

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--black)', marginBottom: '12px' }}>Sélection des cuvées</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.4)', lineHeight: 1.7, maxWidth: '520px' }}>
            Choisissez vos cuvées et les quantités souhaitées (minimum 6 bouteilles par cuvée).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {wines.map(wine => {
              const qty = quantities[wine.id]
              const invalid = qty > 0 && qty < 6

              return (
                <div key={wine.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center', padding: '18px 20px', background: qty > 0 ? 'rgba(221,43,33,.05)' : 'rgba(34,35,37,.04)', border: `1px solid ${qty > 0 ? (invalid ? 'rgba(255,80,80,.3)' : 'rgba(221,43,33,.2)') : 'rgba(34,35,37,.07)'}`, transition: 'all .25s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '6px', height: '28px', background: wine.color, opacity: .8, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--black)', marginBottom: '2px' }}>{wine.nom}</div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(34,35,37,.3)' }}>{wine.type} · {wine.millesime}</div>
                    </div>
                    {invalid && (
                      <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'rgba(255,100,100,.8)', letterSpacing: '.1em', flexShrink: 0 }}>min. 6 btl</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => setQty(wine.id, qty - 1)} style={{ width: '30px', height: '30px', background: 'rgba(34,35,37,.09)', border: '1px solid rgba(34,35,37,.12)', color: 'var(--black)', fontSize: '16px', cursor: qty > 0 ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: qty > 0 ? 1 : .3, transition: 'all .2s' }}>−</button>
                    <input type="number" min="0" value={qty === 0 ? '' : qty} onChange={e => setQty(wine.id, e.target.value)} placeholder="0"
                      style={{ width: '52px', height: '30px', textAlign: 'center', background: 'rgba(34,35,37,.06)', border: `1px solid ${invalid ? 'rgba(255,80,80,.4)' : 'rgba(34,35,37,.12)'}`, color: 'var(--black)', fontFamily: 'var(--sans)', fontSize: '13px', outline: 'none' }} />
                    <button onClick={() => setQty(wine.id, qty + 1)} style={{ width: '30px', height: '30px', background: 'rgba(34,35,37,.09)', border: '1px solid rgba(34,35,37,.12)', color: 'var(--black)', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>+</button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary + CTA */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <OrderSummary quantities={quantities} />
            {hasInvalid && <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(255,100,100,.7)', letterSpacing: '.08em', lineHeight: 1.6 }}>Certaines cuvées sont sous le minimum de 6 bouteilles.</div>}
            <button onClick={() => canNextStep1 && setStep(1)} disabled={!canNextStep1}
              style={{ width: '100%', padding: '16px', background: canNextStep1 ? 'var(--gold)' : 'rgba(34,35,37,.07)', color: canNextStep1 ? 'var(--black)' : 'rgba(34,35,37,.2)', border: `1px solid ${canNextStep1 ? 'var(--gold)' : 'transparent'}`, fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: canNextStep1 ? 'pointer' : 'default', transition: 'all .3s' }}
              onMouseEnter={e => { if (canNextStep1) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' } }}
              onMouseLeave={e => { if (canNextStep1) { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' } }}
            >Continuer →</button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Step 1 — Customer info
  if (step === 1) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: 'transparent', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => setStep(0)} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,35,37,.4)'}
        >← Modifier la sélection</button>

        <StepIndicator step={1} />

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--black)', marginBottom: '12px' }}>Vos coordonnées</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.4)', lineHeight: 1.7, maxWidth: '480px' }}>
            Ces informations nous permettent de valider et préparer votre livraison.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Type toggle */}
            <div>
              <div style={{ ...label, marginBottom: '10px' }}>Type de client</div>
              <div style={{ display: 'flex', gap: '0' }}>
                {['entreprise', 'particulier'].map(t => (
                  <button key={t} onClick={() => setCustomer(c => ({ ...c, type: t }))}
                    style={{ flex: 1, padding: '12px', border: '1px solid', borderColor: customer.type === t ? 'var(--gold)' : 'rgba(34,35,37,.12)', background: customer.type === t ? 'rgba(221,43,33,.1)' : 'transparent', color: customer.type === t ? 'var(--gold)' : 'rgba(34,35,37,.4)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .25s' }}>
                    {t === 'entreprise' ? 'Entreprise / Pro' : 'Particulier'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ ...label, marginBottom: '8px' }}>Nom complet *</div>
                <input value={customer.nom} onChange={setField('nom')} placeholder="Jean Rakoto" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
              </div>
              {customer.type === 'entreprise' && (
                <div>
                  <div style={{ ...label, marginBottom: '8px' }}>Nom de l'entreprise *</div>
                  <input value={customer.entreprise} onChange={setField('entreprise')} placeholder="Hôtel Panorama" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ ...label, marginBottom: '8px' }}>Téléphone *</div>
                <input value={customer.telephone} onChange={setField('telephone')} placeholder="+261 34 00 000 00" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
              </div>
              <div>
                <div style={{ ...label, marginBottom: '8px' }}>Email *</div>
                <input type="email" value={customer.email} onChange={setField('email')} placeholder="contact@exemple.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
              </div>
            </div>

            {/* Identification Professionnelle — pro uniquement */}
            {customer.type === 'entreprise' && (
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                  Identification Professionnelle
                </div>

                {/* Toggle carte / NIF+STAT */}
                <div style={{ display: 'flex', gap: '0', marginBottom: '16px' }}>
                  {[{ key: 'carte', label: 'Carte Rouge' }, { key: 'nif', label: 'NIF & STAT' }].map(opt => (
                    <button key={opt.key} type="button" onClick={() => setProIdMode(opt.key)}
                      style={{ flex: 1, padding: '10px', border: '1px solid', borderColor: proIdMode === opt.key ? 'var(--gold)' : 'rgba(34,35,37,.12)', background: proIdMode === opt.key ? 'rgba(221,43,33,.1)' : 'transparent', color: proIdMode === opt.key ? 'var(--gold)' : 'rgba(34,35,37,.35)', fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .25s' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {proIdMode === 'carte' ? (
                    <motion.div key="carte" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: .2 }}>
                      <div style={{ ...label, marginBottom: '8px' }}>Numéro Carte Rouge *</div>
                      <input value={customer.carteRouge} onChange={setField('carteRouge')} placeholder="Ex : CR-00001" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
                    </motion.div>
                  ) : (
                    <motion.div key="nif" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: .2 }}
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <div style={{ ...label, marginBottom: '8px' }}>NIF *</div>
                        <input value={customer.nif} onChange={setField('nif')} placeholder="Numéro d'Identification Fiscale" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
                      </div>
                      <div>
                        <div style={{ ...label, marginBottom: '8px' }}>STAT *</div>
                        <input value={customer.stat} onChange={setField('stat')} placeholder="Numéro STAT" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div>
              <div style={{ ...label, marginBottom: '8px' }}>Adresse de livraison *</div>
              <input value={customer.adresse} onChange={setField('adresse')} placeholder="Rue, numéro, quartier" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ ...label, marginBottom: '8px' }}>Ville *</div>
                <input value={customer.ville} onChange={setField('ville')} placeholder="Antananarivo" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
              </div>
              <div>
                <div style={{ ...label, marginBottom: '8px' }}>Code postal</div>
                <input value={customer.codePostal} onChange={setField('codePostal')} placeholder="101" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
              </div>
            </div>

            <div>
              <div style={{ ...label, marginBottom: '8px' }}>Notes / Instructions de livraison</div>
              <textarea value={customer.notes} onChange={setField('notes')} rows={3} placeholder="Horaires de livraison, accès, instructions particulières…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
            </div>

            <button onClick={() => canNextStep2 && setStep(2)} disabled={!canNextStep2}
              style={{ alignSelf: 'flex-start', padding: '16px 48px', background: canNextStep2 ? 'var(--gold)' : 'rgba(34,35,37,.07)', color: canNextStep2 ? 'var(--black)' : 'rgba(34,35,37,.2)', border: `1px solid ${canNextStep2 ? 'var(--gold)' : 'transparent'}`, fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: canNextStep2 ? 'pointer' : 'default', transition: 'all .3s' }}
              onMouseEnter={e => { if (canNextStep2) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' } }}
              onMouseLeave={e => { if (canNextStep2) { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' } }}
            >Vérifier la commande →</button>
          </div>

          <div style={{ position: 'sticky', top: '100px' }}>
            <OrderSummary quantities={quantities} compact />
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Step 2 — Review & confirm
  if (step === 2) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: 'transparent', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => setStep(1)} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,35,37,.4)'}
        >← Modifier les coordonnées</button>

        <StepIndicator step={2} />

        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--black)' }}>Vérification</h1>
        </div>

        <OrderSummary quantities={quantities} />

        <div style={{ marginTop: '24px', background: 'rgba(34,35,37,.05)', border: '1px solid rgba(34,35,37,.09)', padding: '28px' }}>
          <div style={{ ...label, marginBottom: '16px' }}>Informations client</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
            {[
              ['Type', customer.type === 'entreprise' ? 'Entreprise / Pro' : 'Particulier'],
              ['Nom', customer.nom],
              ...(customer.type === 'entreprise' ? [['Entreprise', customer.entreprise]] : []),
              ...(customer.type === 'entreprise' && proIdMode === 'carte' ? [['Carte Rouge', customer.carteRouge]] : []),
              ...(customer.type === 'entreprise' && proIdMode === 'nif' ? [['NIF', customer.nif], ['STAT', customer.stat]] : []),
              ['Téléphone', customer.telephone],
              ['Email', customer.email],
              ['Adresse', customer.adresse],
              ['Ville', customer.ville],
              ...(customer.codePostal ? [['Code postal', customer.codePostal]] : []),
              ...(customer.notes ? [['Notes', customer.notes]] : []),
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...label, marginBottom: '4px' }}>{k}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: ['Carte Rouge','NIF','STAT'].includes(k) ? 'var(--gold)' : 'var(--white)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '32px 0' }} />

        <button onClick={() => setStep(3)}
          style={{ width: '100%', padding: '18px', background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
          onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
        >Confirmer la commande</button>
      </div>
    </motion.div>
  )

  // Step 3 — Payment
  const payValid = payMethod === 'virement' || payMethod === 'facture' || payRef.trim() !== ''

  if (step === 3) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}
      style={{ background: 'transparent', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={() => setStep(2)} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(34,35,37,.4)'}
        >← Modifier la commande</button>

        <StepIndicator step={3} />

        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--black)' }}>Mode de paiement</h1>
        </div>

        {/* Méthodes */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '28px' }}>
          {[
            { key: 'mobile', label: 'Mobile Money' },
            { key: 'virement', label: 'Virement' },
            ...(customer.type === 'entreprise' ? [{ key: 'facture', label: 'Facturation 30j' }] : []),
          ].map(m => (
            <button key={m.key} onClick={() => { setPayMethod(m.key); setPayRef('') }}
              style={{ flex: 1, padding: '14px', border: '1px solid', borderColor: payMethod === m.key ? 'var(--gold)' : 'rgba(34,35,37,.12)', background: payMethod === m.key ? 'rgba(221,43,33,.1)' : 'transparent', color: payMethod === m.key ? 'var(--gold)' : 'rgba(34,35,37,.4)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}>
              {m.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {payMethod === 'mobile' && (
            <motion.div key="mobile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}
              style={{ background: 'rgba(221,43,33,.05)', border: '1px solid rgba(221,43,33,.2)', padding: '28px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Instructions Mobile Money</div>
              {[
                'Envoyez le montant total via MVola / Airtel Money / Orange Money',
                'Numéro à créditer : 034 22 326 04 (Chan Foui & Fils)',
                'Entrez la référence de votre transaction ci-dessous',
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontFamily: 'var(--sans)', fontSize: '12px', color: 'rgba(34,35,37,.6)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 600 }}>{i + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
              <input value={payRef} onChange={e => setPayRef(e.target.value)}
                placeholder="Référence de transaction (ex : MVL-XXXXXXX)"
                style={{ ...inputStyle, marginTop: '16px' }}
                onFocus={e => e.target.style.borderColor = 'rgba(221,43,33,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(34,35,37,.12)'} />
            </motion.div>
          )}

          {payMethod === 'virement' && (
            <motion.div key="virement" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}
              style={{ background: 'rgba(34,35,37,.05)', border: '1px solid rgba(34,35,37,.1)', padding: '28px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Coordonnées bancaires</div>
              {[
                ['Bénéficiaire', 'Chan Foui & Fils'],
                ['Banque', 'BFV-SG Madagascar'],
                ['RIB', '00005 · XXXX · XXXXXXXX · XX'],
                ['Objet du virement', `Commande B2B — ${customer.nom}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(34,35,37,.07)' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(34,35,37,.35)', letterSpacing: '.1em' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--black)' }}>{v}</span>
                </div>
              ))}
              <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(34,35,37,.35)', marginTop: '16px', lineHeight: 1.7 }}>
                La commande sera traitée dès réception du virement. Pensez à indiquer votre nom en objet.
              </p>
            </motion.div>
          )}

          {payMethod === 'facture' && (
            <motion.div key="facture" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}
              style={{ background: 'rgba(221,43,33,.04)', border: '1px solid rgba(221,43,33,.2)', padding: '28px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Facturation différée</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontStyle: 'italic', color: 'rgba(34,35,37,.7)', lineHeight: 1.8, margin: 0 }}>
                Réservé aux partenaires référencés. Une facture à 30 jours sera émise à réception de la commande et envoyée à <span style={{ color: 'var(--gold)' }}>{customer.email}</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => payValid && setStep(4)} disabled={!payValid}
          style={{ width: '100%', padding: '18px', background: payValid ? 'linear-gradient(90deg,var(--bordeaux),var(--gold))' : 'rgba(34,35,37,.07)', color: payValid ? 'var(--white)' : 'rgba(34,35,37,.2)', border: 'none', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', cursor: payValid ? 'pointer' : 'default', transition: 'opacity .3s' }}
          onMouseEnter={e => { if (payValid) e.target.style.opacity = '.85' }}
          onMouseLeave={e => { if (payValid) e.target.style.opacity = '1' }}
        >Confirmer la commande</button>
      </div>
    </motion.div>
  )

  // Step 4 — Success
  const totalBottles = wines.filter(w => quantities[w.id] > 0).reduce((s, w) => s + quantities[w.id], 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}
      style={{ background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', padding: '48px', textAlign: 'center' }}>
      <motion.div initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .2, duration: .5 }}
        style={{ width: '72px', height: '72px', borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✦</motion.div>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, color: 'var(--black)' }}>Commande enregistrée</h2>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(34,35,37,.5)', maxWidth: '460px', lineHeight: 1.8 }}>
        Merci {customer.nom}{customer.entreprise ? ` (${customer.entreprise})` : ''}.<br/>
        Votre commande de <span style={{ color: 'var(--gold)' }}>{totalBottles} bouteilles</span> a bien été transmise.<br/><br/>
        Notre équipe vous contacte au <span style={{ color: 'var(--black)' }}>{customer.telephone}</span> sous 48h ouvrées pour confirmer les conditions et la livraison.
      </p>
      <button onClick={() => navigate('b2b')} style={{ marginTop: '8px', padding: '14px 40px', background: 'transparent', border: '1px solid rgba(221,43,33,.4)', color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'border-color .3s' }}
        onMouseEnter={e => e.target.style.borderColor = 'var(--gold)'}
        onMouseLeave={e => e.target.style.borderColor = 'rgba(221,43,33,.4)'}
      >Retour espace B2B</button>
    </motion.div>
  )
}
