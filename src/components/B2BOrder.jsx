import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from '../hooks/useStore'
import { wines } from '../data/wines'

const b2bPrices = {
  'coteau-rouge':      { '6-11': 16000, '12-23': 14000, '24+': 12000 },
  'cote-fianar-rouge': { '6-11': 20000, '12-23': 17500, '24+': 15000 },
  'marofavy':          { '6-11': 32000, '12-23': 28000, '24+': 24000 },
  'champetre':         { '6-11': 10500, '12-23':  9000, '24+':  7500 },
  'coteau-blanc':      { '6-11': 16000, '12-23': 14000, '24+': 12000 },
  'cote-fianar-blanc': { '6-11': 20000, '12-23': 17500, '24+': 15000 },
  'maropara':          { '6-11': 26000, '12-23': 22000, '24+': 19000 },
  'allerao':           { '6-11': 22000, '12-23': 19000, '24+': 16000 },
}

function getTier(qty) {
  if (qty >= 24) return '24+'
  if (qty >= 12) return '12-23'
  return '6-11'
}
function getUnitPrice(id, qty) {
  return b2bPrices[id]?.[getTier(qty)] ?? 0
}

const label = { fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.35)' }
const tierColors = { '6-11':'rgba(245,245,243,.5)', '12-23':'var(--gold)', '24+':'#C8E6A0' }

const inputStyle = {
  width:'100%', padding:'13px 16px',
  background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)',
  color:'var(--white)', fontFamily:'var(--sans)', fontSize:'13px', outline:'none', transition:'border-color .3s',
}

function StepIndicator({ step }) {
  const steps = ['Sélection', 'Coordonnées', 'Confirmation']
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0', marginBottom:'48px' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display:'flex', alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: i < step ? 'var(--gold)' : i === step ? 'transparent' : 'transparent', border: i <= step ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,.15)', color: i < step ? 'var(--black)' : i === step ? 'var(--gold)' : 'rgba(245,245,243,.25)', fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500, transition:'all .3s' }}>
              {i < step ? '✓' : i + 1}
            </div>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.15em', textTransform:'uppercase', color: i === step ? 'var(--gold)' : 'rgba(245,245,243,.25)', whiteSpace:'nowrap' }}>{s}</div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width:'80px', height:'1px', background: i < step ? 'var(--gold)' : 'rgba(255,255,255,.1)', margin:'0 12px', marginBottom:'28px', transition:'background .3s' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function OrderSummary({ quantities, compact = false }) {
  const selected = wines.filter(w => quantities[w.id] > 0)
  const totalBottles = selected.reduce((s, w) => s + quantities[w.id], 0)
  const totalPrice = selected.reduce((s, w) => s + getUnitPrice(w.id, quantities[w.id]) * quantities[w.id], 0)

  return (
    <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(200,169,106,.15)', padding: compact ? '20px 24px' : '32px' }}>
      <div style={{ ...label, marginBottom:'16px' }}>Récapitulatif commande</div>
      <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'16px' }}>
        {selected.map(wine => {
          const qty = quantities[wine.id]
          const tier = getTier(qty)
          const unitPrice = getUnitPrice(wine.id, qty)
          return (
            <div key={wine.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'14px', color:'var(--white)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{wine.nom}</div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', color:tierColors[tier], letterSpacing:'.1em', marginTop:'2px' }}>{qty} btl · palier {tier}</div>
              </div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.6)', flexShrink:0 }}>{(unitPrice * qty).toLocaleString('fr-FR')} Ar</div>
            </div>
          )
        })}
      </div>
      <div style={{ height:'1px', background:'rgba(200,169,106,.15)', margin:'0 0 16px' }} />
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
        <span style={label}>Total bouteilles</span>
        <span style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'var(--white)' }}>{totalBottles}</span>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={label}>Total</span>
        <span style={{ fontFamily:'var(--serif)', fontSize:'20px', color:'var(--gold)' }}>{totalPrice.toLocaleString('fr-FR')} Ar</span>
      </div>
    </div>
  )
}

export default function B2BOrder() {
  const [step, setStep] = useState(0)
  const [quantities, setQuantities] = useState(Object.fromEntries(wines.map(w => [w.id, 0])))
  const [customer, setCustomer] = useState({
    type: 'entreprise', nom: '', entreprise: '', telephone: '', email: '',
    adresse: '', ville: '', codePostal: '', notes: '',
  })

  const setQty = (id, val) => {
    const n = Math.max(0, parseInt(val) || 0)
    setQuantities(q => ({ ...q, [id]: n }))
  }
  const setField = k => e => setCustomer(c => ({ ...c, [k]: e.target.value }))

  const selected = wines.filter(w => quantities[w.id] > 0)
  const hasInvalid = selected.some(w => quantities[w.id] < 6)
  const canNextStep1 = selected.length > 0 && !hasInvalid

  const canNextStep2 = customer.nom && customer.telephone && customer.email && customer.adresse && customer.ville
    && (customer.type === 'particulier' || customer.entreprise)

  // Step 0 — Wine selection
  if (step === 0) return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}
      style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:'120px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={() => navigate('b2b')} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'48px', padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,.4)'}
        >← Retour</button>

        <StepIndicator step={0} />

        <div style={{ marginBottom:'40px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>Sélection des cuvées</h1>
          <p style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', lineHeight:1.7, maxWidth:'520px' }}>
            Choisissez vos cuvées et les quantités souhaitées. Le tarif s'ajuste automatiquement selon les paliers (min. 6 btl par cuvée).
          </p>
        </div>

        {/* Tier legend */}
        <div style={{ display:'flex', gap:'24px', marginBottom:'28px', flexWrap:'wrap' }}>
          {[['6–11 btl','6-11','Tarif standard'],['12–23 btl','12-23','Tarif intermédiaire'],['24+ btl','24+','Meilleur tarif']].map(([lbl, key, sub]) => (
            <div key={key} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:tierColors[key] }} />
              <div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:tierColors[key] }}>{lbl}</div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', color:'rgba(245,245,243,.25)', letterSpacing:'.1em' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'32px', alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {wines.map(wine => {
              const qty = quantities[wine.id]
              const tier = qty > 0 ? getTier(qty) : null
              const unitPrice = qty > 0 ? getUnitPrice(wine.id, qty) : b2bPrices[wine.id]['6-11']
              const lineTotal = qty > 0 ? unitPrice * qty : 0
              const invalid = qty > 0 && qty < 6

              return (
                <div key={wine.id} style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'16px', alignItems:'center', padding:'18px 20px', background: qty > 0 ? 'rgba(200,169,106,.05)' : 'rgba(255,255,255,.02)', border:`1px solid ${qty > 0 ? (invalid ? 'rgba(255,80,80,.3)' : 'rgba(200,169,106,.2)') : 'rgba(255,255,255,.05)'}`, transition:'all .25s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                    <div style={{ width:'6px', height:'28px', background:wine.color, opacity:.8, flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:'var(--serif)', fontSize:'16px', color:'var(--white)', marginBottom:'2px' }}>{wine.nom}</div>
                      <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(245,245,243,.3)' }}>{wine.type} · {wine.millesime}</div>
                    </div>
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color: tier ? tierColors[tier] : 'rgba(245,245,243,.3)', transition:'color .3s' }}>
                        {unitPrice.toLocaleString('fr-FR')} Ar / btl
                      </div>
                      {qty > 0 && !invalid && <div style={{ fontFamily:'var(--serif)', fontSize:'13px', color:'var(--gold)', marginTop:'2px' }}>{lineTotal.toLocaleString('fr-FR')} Ar</div>}
                      {invalid && <div style={{ fontFamily:'var(--sans)', fontSize:'9px', color:'rgba(255,100,100,.8)', marginTop:'2px', letterSpacing:'.1em' }}>min. 6 btl</div>}
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
                    <button onClick={() => setQty(wine.id, qty - 1)} style={{ width:'30px', height:'30px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'var(--white)', fontSize:'16px', cursor: qty > 0 ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', opacity: qty > 0 ? 1 : .3, transition:'all .2s' }}>−</button>
                    <input type="number" min="0" value={qty === 0 ? '' : qty} onChange={e => setQty(wine.id, e.target.value)} placeholder="0"
                      style={{ width:'52px', height:'30px', textAlign:'center', background:'rgba(255,255,255,.04)', border:`1px solid ${invalid ? 'rgba(255,80,80,.4)' : 'rgba(255,255,255,.1)'}`, color:'var(--white)', fontFamily:'var(--sans)', fontSize:'13px', outline:'none' }} />
                    <button onClick={() => setQty(wine.id, qty + 1)} style={{ width:'30px', height:'30px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'var(--white)', fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>+</button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary + CTA */}
          <div style={{ position:'sticky', top:'100px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <OrderSummary quantities={quantities} />
            {hasInvalid && <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(255,100,100,.7)', letterSpacing:'.08em', lineHeight:1.6 }}>Certaines cuvées sont sous le minimum de 6 bouteilles.</div>}
            <button onClick={() => canNextStep1 && setStep(1)} disabled={!canNextStep1}
              style={{ width:'100%', padding:'16px', background: canNextStep1 ? 'var(--gold)' : 'rgba(255,255,255,.05)', color: canNextStep1 ? 'var(--black)' : 'rgba(245,245,243,.2)', border:`1px solid ${canNextStep1 ? 'var(--gold)' : 'transparent'}`, fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor: canNextStep1 ? 'pointer' : 'default', transition:'all .3s' }}
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
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}
      style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:'120px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={() => setStep(0)} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'48px', padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,.4)'}
        >← Modifier la sélection</button>

        <StepIndicator step={1} />

        <div style={{ marginBottom:'40px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>Vos coordonnées</h1>
          <p style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', lineHeight:1.7, maxWidth:'480px' }}>
            Ces informations nous permettent de valider et préparer votre livraison.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'32px', alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

            {/* Type toggle */}
            <div>
              <div style={{ ...label, marginBottom:'10px' }}>Type de client</div>
              <div style={{ display:'flex', gap:'0' }}>
                {['entreprise','particulier'].map(t => (
                  <button key={t} onClick={() => setCustomer(c => ({ ...c, type: t }))}
                    style={{ flex:1, padding:'12px', border:'1px solid', borderColor: customer.type === t ? 'var(--gold)' : 'rgba(255,255,255,.1)', background: customer.type === t ? 'rgba(200,169,106,.1)' : 'transparent', color: customer.type === t ? 'var(--gold)' : 'rgba(245,245,243,.4)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer', transition:'all .25s' }}>
                    {t === 'entreprise' ? 'Entreprise / Pro' : 'Particulier'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <div style={{ ...label, marginBottom:'8px' }}>Nom complet *</div>
                <input value={customer.nom} onChange={setField('nom')} placeholder="Jean Rakoto" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
              </div>
              {customer.type === 'entreprise' && (
                <div>
                  <div style={{ ...label, marginBottom:'8px' }}>Nom de l'entreprise *</div>
                  <input value={customer.entreprise} onChange={setField('entreprise')} placeholder="Hôtel Panorama" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
                </div>
              )}
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <div style={{ ...label, marginBottom:'8px' }}>Téléphone *</div>
                <input value={customer.telephone} onChange={setField('telephone')} placeholder="+261 34 00 000 00" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
              </div>
              <div>
                <div style={{ ...label, marginBottom:'8px' }}>Email *</div>
                <input type="email" value={customer.email} onChange={setField('email')} placeholder="contact@exemple.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
              </div>
            </div>

            <div>
              <div style={{ ...label, marginBottom:'8px' }}>Adresse de livraison *</div>
              <input value={customer.adresse} onChange={setField('adresse')} placeholder="Rue, numéro, quartier" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <div style={{ ...label, marginBottom:'8px' }}>Ville *</div>
                <input value={customer.ville} onChange={setField('ville')} placeholder="Antananarivo" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
              </div>
              <div>
                <div style={{ ...label, marginBottom:'8px' }}>Code postal</div>
                <input value={customer.codePostal} onChange={setField('codePostal')} placeholder="101" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
              </div>
            </div>

            <div>
              <div style={{ ...label, marginBottom:'8px' }}>Notes / Instructions de livraison</div>
              <textarea value={customer.notes} onChange={setField('notes')} rows={3} placeholder="Horaires de livraison, accès, instructions particulières…" style={{ ...inputStyle, resize:'vertical', lineHeight:1.6 }}
                onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'} />
            </div>

            <button onClick={() => canNextStep2 && setStep(2)} disabled={!canNextStep2}
              style={{ alignSelf:'flex-start', padding:'16px 48px', background: canNextStep2 ? 'var(--gold)' : 'rgba(255,255,255,.05)', color: canNextStep2 ? 'var(--black)' : 'rgba(245,245,243,.2)', border:`1px solid ${canNextStep2 ? 'var(--gold)' : 'transparent'}`, fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor: canNextStep2 ? 'pointer' : 'default', transition:'all .3s' }}
              onMouseEnter={e => { if (canNextStep2) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' } }}
              onMouseLeave={e => { if (canNextStep2) { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' } }}
            >Vérifier la commande →</button>
          </div>

          <div style={{ position:'sticky', top:'100px' }}>
            <OrderSummary quantities={quantities} compact />
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Step 2 — Review & confirm
  if (step === 2) return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}
      style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:'120px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'760px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={() => setStep(1)} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'48px', padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,.4)'}
        >← Modifier les coordonnées</button>

        <StepIndicator step={2} />

        <div style={{ marginBottom:'36px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Commande B2B</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--white)' }}>Vérification</h1>
        </div>

        <OrderSummary quantities={quantities} />

        <div style={{ marginTop:'24px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', padding:'28px' }}>
          <div style={{ ...label, marginBottom:'16px' }}>Informations client</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 32px' }}>
            {[
              ['Type', customer.type === 'entreprise' ? 'Entreprise / Pro' : 'Particulier'],
              ['Nom', customer.nom],
              ...(customer.type === 'entreprise' ? [['Entreprise', customer.entreprise]] : []),
              ['Téléphone', customer.telephone],
              ['Email', customer.email],
              ['Adresse', customer.adresse],
              ['Ville', customer.ville],
              ...(customer.codePostal ? [['Code postal', customer.codePostal]] : []),
              ...(customer.notes ? [['Notes', customer.notes]] : []),
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...label, marginBottom:'4px' }}>{k}</div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'var(--white)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width:'48px', height:'1px', background:'var(--gold)', margin:'32px 0' }} />

        <button onClick={() => setStep(3)}
          style={{ width:'100%', padding:'18px', background:'var(--gold)', color:'var(--black)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}
          onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
        >Confirmer la commande</button>
      </div>
    </motion.div>
  )

  // Step 3 — Success
  const totalBottles = wines.filter(w => quantities[w.id] > 0).reduce((s, w) => s + quantities[w.id], 0)
  const totalPrice = wines.filter(w => quantities[w.id] > 0).reduce((s, w) => s + getUnitPrice(w.id, quantities[w.id]) * quantities[w.id], 0)

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.6 }}
      style={{ background:'#0D0D0D', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'24px', padding:'48px', textAlign:'center' }}>
      <motion.div initial={{ scale:.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:.2, duration:.5 }}
        style={{ width:'72px', height:'72px', borderRadius:'50%', border:'1px solid var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>✦</motion.div>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(28px,4vw,44px)', fontWeight:300, color:'var(--white)' }}>Commande enregistrée</h2>
      <p style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.5)', maxWidth:'460px', lineHeight:1.8 }}>
        Merci {customer.nom}{customer.entreprise ? ` (${customer.entreprise})` : ''}.<br/>
        Votre commande de <span style={{ color:'var(--gold)' }}>{totalBottles} bouteilles</span> pour un montant de <span style={{ color:'var(--gold)' }}>{totalPrice.toLocaleString('fr-FR')} Ar</span> a bien été transmise.<br/><br/>
        Notre équipe vous contacte au <span style={{ color:'var(--white)' }}>{customer.telephone}</span> sous 48h ouvrées pour confirmer la livraison.
      </p>
      <button onClick={() => navigate('b2b')} style={{ marginTop:'8px', padding:'14px 40px', background:'transparent', border:'1px solid rgba(200,169,106,.4)', color:'var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', transition:'border-color .3s' }}
        onMouseEnter={e => e.target.style.borderColor = 'var(--gold)'}
        onMouseLeave={e => e.target.style.borderColor = 'rgba(200,169,106,.4)'}
      >Retour espace B2B</button>
    </motion.div>
  )
}
