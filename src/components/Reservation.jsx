import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from '../hooks/useStore'

const experiences = [
  {
    id: 'decouverte',
    nom: 'Découverte du Domaine',
    duree: '1h30',
    prix: '25 000 Ar / pers.',
    priceNum: 25000,
    desc: 'Visite guidée des vignes et des caves, suivie d\'une dégustation de 3 cuvées emblématiques.',
    vins: ['Coteau d\'Ambalavao', 'Côte de Fianar', 'maroparasyBlanc Doux'],
    max: 8,
    icon: '🍇',
  },
  {
    id: 'prestige',
    nom: 'Expérience Prestige',
    duree: '3h',
    prix: '65 000 Ar / pers.',
    priceNum: 65000,
    desc: 'Immersion complète : vendanges (selon saison), visite des chais, dégustation verticale de 6 cuvées avec accords mets-vins.',
    vins: ['Toute la gamme', 'Millésimes anciens', 'Accords gastronomiques'],
    max: 6,
    icon: '✦',
    premium: true,
  },
  {
    id: 'privatise',
    nom: 'Privatisation',
    duree: 'Sur mesure',
    prix: 'Sur devis',
    priceNum: 0,
    desc: 'Le domaine entier pour vous. Événement d\'entreprise, célébration privée, mariage — nous créons l\'expérience de vos rêves.',
    vins: ['Carte blanche', 'Accord avec votre chef', 'Service premium'],
    max: 40,
    icon: '◆',
  },
]

const creneaux = ['09:00', '10:30', '14:00', '15:30', '17:00']

const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
const firstDayOfMonth = (y, m) => new Date(y, m, 1).getDay()

const BLOCKED = [0, 1] // dimanche, lundi fermés
const today = new Date()

export default function Reservation() {
  const [step, setStep] = useState(0) // 0 experience, 1 calendrier, 2 formulaire, 3 confirm
  const [selected, setSelected] = useState(null)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [day, setDay] = useState(null)
  const [creneau, setCreneau] = useState(null)
  const [guests, setGuests] = useState(2)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', note: '' })
  const [done, setDone] = useState(false)

  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const dayNames = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']

  const totalDays = daysInMonth(year, month)
  const firstDay = firstDayOfMonth(year, month)
  const cells = [...Array(firstDay).fill(null), ...Array.from({length: totalDays}, (_,i) => i+1)]

  const isBlocked = d => {
    if (!d) return true
    const date = new Date(year, month, d)
    return BLOCKED.includes(date.getDay()) || date < today
  }

  const exp = experiences.find(e => e.id === selected)

  if (done) return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      style={{ background:'transparent', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'28px', padding:'48px', textAlign:'center' }}>
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:180, damping:14}}>
        <div style={{ width:'88px', height:'88px', borderRadius:'50%', background:'rgba(221,43,33,.15)', border:'1px solid var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', margin:'0 auto' }}>✦</div>
      </motion.div>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--black)' }}>Réservation confirmée</h2>
      <p style={{ fontFamily:'var(--serif)', fontSize:'19px', fontStyle:'italic', color:'rgba(34,35,37,.5)', maxWidth:'420px', lineHeight:1.7 }}>
        Nous vous attendons le <strong style={{color:'var(--gold)', fontStyle:'normal'}}>{day} {monthNames[month]} {year}</strong> à <strong style={{color:'var(--gold)', fontStyle:'normal'}}>{creneau}</strong>.<br/>Un email de confirmation vous sera envoyé.
      </p>
      <div style={{ padding:'20px 32px', border:'1px solid rgba(221,43,33,.2)', marginTop:'8px' }}>
        <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px' }}>Votre réservation</div>
        <div style={{ fontFamily:'var(--serif)', fontSize:'17px', color:'var(--black)' }}>{exp?.nom} · {guests} personne{guests>1?'s':''}</div>
      </div>
      <button onClick={() => navigate('home')} style={{ marginTop:'16px', padding:'16px 48px', background:'var(--gold)', color:'var(--black)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer' }}>
        Retour à l'accueil
      </button>
    </motion.div>
  )

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}}
      style={{ background:'transparent', minHeight:'100vh', paddingTop:'110px', paddingBottom:'100px' }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={() => navigate('home')} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(34,35,37,.35)', background:'none', border:'none', cursor:'pointer', marginBottom:'52px', padding:0, transition:'color .3s' }}
          onMouseEnter={e => e.currentTarget.style.color='var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(34,35,37,.35)'}
        >← Retour</button>

        {/* Header */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}} style={{ marginBottom:'64px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Vignoble Chan Foui & Fils</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(40px,6vw,72px)', fontWeight:300, color:'var(--black)', lineHeight:1.05, marginBottom:'16px' }}>
            Réserver une <em style={{fontStyle:'italic', color:'var(--gold)'}}>expérience</em>
          </h1>
          <p style={{ fontFamily:'var(--serif)', fontSize:'18px', fontStyle:'italic', color:'rgba(34,35,37,.45)', maxWidth:'520px', lineHeight:1.75 }}>
            Venez vivre le vignoble de l'intérieur. Nos vignerons vous accueillent à Ambalavao pour une immersion unique dans l'univers Chan Foui & Fils.
          </p>
        </motion.div>

        {/* Stepper */}
        <div style={{ display:'flex', alignItems:'center', marginBottom:'56px' }}>
          {['Expérience','Date & Heure','Vos infos'].map((s,i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', flex: i<2?'1':'none' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: i<=step?'var(--gold)':'rgba(34,35,37,.09)', color: i<=step?'var(--black)':'rgba(34,35,37,.3)', fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500, transition:'all .4s' }}>
                  {i<step?'✓':i+1}
                </div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.15em', textTransform:'uppercase', color: i===step?'var(--gold)':'rgba(34,35,37,.25)', whiteSpace:'nowrap' }}>{s}</div>
              </div>
              {i<2 && <div style={{ flex:1, height:'1px', background: i<step?'var(--gold)':'rgba(34,35,37,.09)', margin:'0 12px', marginBottom:'22px', transition:'background .4s' }}/>}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 0 — Choix expérience */}
          {step===0 && (
            <motion.div key="step0" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.4}}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
                {experiences.map(exp => (
                  <div key={exp.id} onClick={() => setSelected(exp.id)}
                    style={{ padding:'36px 28px', border:`1px solid ${selected===exp.id?'var(--gold)':'rgba(34,35,37,.09)'}`, background: selected===exp.id?'rgba(221,43,33,.06)':exp.premium?'rgba(221,43,33,.1)':'rgba(34,35,37,.04)', cursor:'pointer', transition:'all .35s', position:'relative', transform: selected===exp.id?'translateY(-4px)':'none' }}>
                    {exp.premium && <div style={{ position:'absolute', top:'-11px', left:'50%', transform:'translateX(-50%)', padding:'3px 16px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'8px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Recommandé</div>}
                    <div style={{ fontSize:'24px', marginBottom:'16px' }}>{exp.icon}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px' }}>{exp.duree} · {exp.max} pers. max</div>
                    <h3 style={{ fontFamily:'var(--serif)', fontSize:'22px', fontWeight:300, color:'var(--black)', marginBottom:'12px', lineHeight:1.2 }}>{exp.nom}</h3>
                    <p style={{ fontFamily:'var(--serif)', fontSize:'14px', fontStyle:'italic', color:'rgba(34,35,37,.5)', lineHeight:1.7, marginBottom:'20px' }}>{exp.desc}</p>
                    <div style={{ borderTop:'1px solid rgba(34,35,37,.09)', paddingTop:'16px' }}>
                      {exp.vins.map(v => (
                        <div key={v} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                          <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--gold)', flexShrink:0 }}/>
                          <span style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(34,35,37,.45)' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:'20px', fontFamily:'var(--serif)', fontSize:'20px', color:'var(--gold)' }}>{exp.prix}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'right', marginTop:'32px' }}>
                <button disabled={!selected} onClick={() => setStep(1)}
                  style={{ padding:'16px 48px', background: selected?'var(--gold)':'rgba(34,35,37,.09)', color: selected?'var(--black)':'rgba(34,35,37,.2)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor: selected?'pointer':'default', transition:'all .3s' }}>
                  Choisir une date →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Calendrier */}
          {step===1 && (
            <motion.div key="step1" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.4}}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>

                {/* Calendrier */}
                <div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
                    <button onClick={() => { if(month===0){setMonth(11);setYear(y=>y-1)}else setMonth(m=>m-1) }}
                      style={{ background:'none', border:'1px solid rgba(34,35,37,.12)', color:'rgba(34,35,37,.5)', width:'36px', height:'36px', cursor:'pointer', fontSize:'14px', transition:'border-color .3s' }}
                      onMouseEnter={e=>e.target.style.borderColor='var(--gold)'}
                      onMouseLeave={e=>e.target.style.borderColor='rgba(34,35,37,.12)'}
                    >‹</button>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'20px', color:'var(--black)' }}>{monthNames[month]} {year}</div>
                    <button onClick={() => { if(month===11){setMonth(0);setYear(y=>y+1)}else setMonth(m=>m+1) }}
                      style={{ background:'none', border:'1px solid rgba(34,35,37,.12)', color:'rgba(34,35,37,.5)', width:'36px', height:'36px', cursor:'pointer', fontSize:'14px', transition:'border-color .3s' }}
                      onMouseEnter={e=>e.target.style.borderColor='var(--gold)'}
                      onMouseLeave={e=>e.target.style.borderColor='rgba(34,35,37,.12)'}
                    >›</button>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'4px', marginBottom:'8px' }}>
                    {dayNames.map(d => <div key={d} style={{ textAlign:'center', fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(34,35,37,.25)', padding:'6px 0' }}>{d}</div>)}
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'4px' }}>
                    {cells.map((d, i) => (
                      <div key={i} onClick={() => !isBlocked(d) && setDay(d)}
                        style={{ aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--sans)', fontSize:'12px', borderRadius:'2px',
                          background: d===day?'var(--gold)': d&&!isBlocked(d)?'rgba(34,35,37,.05)':'transparent',
                          color: d===day?'var(--black)': isBlocked(d)?'rgba(34,35,37,.12)':'rgba(34,35,37,.65)',
                          cursor: d&&!isBlocked(d)?'pointer':'default',
                          border: `1px solid ${d===day?'var(--gold)':d&&!isBlocked(d)?'rgba(34,35,37,.09)':'transparent'}`,
                          transition:'all .25s'
                        }}>
                        {d}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:'16px', display:'flex', gap:'16px', alignItems:'center' }}>
                    <div style={{ width:'10px', height:'10px', background:'rgba(34,35,37,.09)', border:'1px solid rgba(34,35,37,.09)' }}/>
                    <span style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(34,35,37,.25)' }}>Fermé (dim. & lun.)</span>
                  </div>
                </div>

                {/* Créneaux + invités */}
                <div>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Créneau horaire</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'36px' }}>
                    {creneaux.map(c => (
                      <button key={c} onClick={() => setCreneau(c)}
                        style={{ padding:'14px 20px', border:`1px solid ${creneau===c?'var(--gold)':'rgba(34,35,37,.1)'}`, background: creneau===c?'rgba(221,43,33,.1)':'transparent', color: creneau===c?'var(--gold)':'rgba(34,35,37,.5)', fontFamily:'var(--sans)', fontSize:'13px', letterSpacing:'.05em', cursor:'pointer', textAlign:'left', transition:'all .3s' }}>
                        {c}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Nombre d'invités</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0', border:'1px solid rgba(34,35,37,.12)', width:'fit-content', marginBottom:'40px' }}>
                    <button onClick={() => setGuests(g=>Math.max(1,g-1))} style={{ width:'44px', height:'44px', background:'none', border:'none', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'18px', cursor:'pointer' }}>−</button>
                    <div style={{ width:'48px', textAlign:'center', fontFamily:'var(--serif)', fontSize:'20px', color:'var(--gold)' }}>{guests}</div>
                    <button onClick={() => setGuests(g=>Math.min(exp?.max||8,g+1))} style={{ width:'44px', height:'44px', background:'none', border:'none', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'18px', cursor:'pointer' }}>+</button>
                  </div>

                  {day && creneau && exp && (
                    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{ padding:'20px', background:'rgba(221,43,33,.06)', border:'1px solid rgba(221,43,33,.2)', marginBottom:'28px' }}>
                      <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'10px' }}>Récapitulatif</div>
                      <div style={{ fontFamily:'var(--serif)', fontSize:'15px', color:'var(--black)', lineHeight:1.7 }}>
                        {exp.nom}<br/>
                        <span style={{ color:'rgba(34,35,37,.5)', fontSize:'14px' }}>{day} {monthNames[month]} {year} · {creneau}</span><br/>
                        <span style={{ color:'rgba(34,35,37,.5)', fontSize:'14px' }}>{guests} personne{guests>1?'s':''}</span>
                      </div>
                      {exp.priceNum > 0 && (
                        <div style={{ marginTop:'12px', fontFamily:'var(--serif)', fontSize:'18px', color:'var(--gold)' }}>
                          Total : {(exp.priceNum * guests).toLocaleString()} Ar
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div style={{ display:'flex', gap:'12px' }}>
                    <button onClick={() => setStep(0)} style={{ padding:'14px 24px', background:'transparent', border:'1px solid rgba(34,35,37,.12)', color:'rgba(34,35,37,.4)', fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer' }}>← Retour</button>
                    <button disabled={!day||!creneau} onClick={() => setStep(2)}
                      style={{ flex:1, padding:'14px', background: day&&creneau?'var(--gold)':'rgba(34,35,37,.07)', color: day&&creneau?'var(--black)':'rgba(34,35,37,.2)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor: day&&creneau?'pointer':'default', transition:'all .3s' }}>
                      Continuer →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Formulaire */}
          {step===2 && (
            <motion.div key="step2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.4}}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'48px', alignItems:'start' }}>
                <div style={{ background:'rgba(34,35,37,.04)', border:'1px solid rgba(34,35,37,.09)', padding:'40px' }}>
                  <h3 style={{ fontFamily:'var(--serif)', fontSize:'28px', fontWeight:300, color:'var(--black)', marginBottom:'32px' }}>Vos coordonnées</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    {[
                      {key:'nom', ph:'Nom complet', type:'text'},
                      {key:'email', ph:'Adresse email', type:'email'},
                      {key:'tel', ph:'Téléphone (+261...)', type:'tel'},
                    ].map(f => (
                      <input key={f.key} type={f.type} placeholder={f.ph} value={form[f.key]}
                        onChange={e => setForm({...form, [f.key]: e.target.value})}
                        style={{ width:'100%', padding:'15px 18px', background:'rgba(34,35,37,.06)', border:'1px solid rgba(34,35,37,.12)', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'14px', fontWeight:300, outline:'none', transition:'border-color .3s' }}
                        onFocus={e=>e.target.style.borderColor='var(--gold)'}
                        onBlur={e=>e.target.style.borderColor='rgba(34,35,37,.12)'}/>
                    ))}
                    <textarea rows={3} placeholder="Demandes particulières, allergies, occasion spéciale..."
                      value={form.note} onChange={e => setForm({...form, note: e.target.value})}
                      style={{ width:'100%', padding:'15px 18px', background:'rgba(34,35,37,.06)', border:'1px solid rgba(34,35,37,.12)', color:'var(--black)', fontFamily:'var(--sans)', fontSize:'14px', fontWeight:300, outline:'none', resize:'vertical', transition:'border-color .3s' }}
                      onFocus={e=>e.target.style.borderColor='var(--gold)'}
                      onBlur={e=>e.target.style.borderColor='rgba(34,35,37,.12)'}/>
                  </div>
                  <div style={{ display:'flex', gap:'12px', marginTop:'28px' }}>
                    <button onClick={()=>setStep(1)} style={{ padding:'14px 24px', background:'transparent', border:'1px solid rgba(34,35,37,.12)', color:'rgba(34,35,37,.4)', fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer' }}>← Retour</button>
                    <button disabled={!form.nom||!form.email} onClick={() => setDone(true)}
                      style={{ flex:1, padding:'16px', background: form.nom&&form.email?'linear-gradient(90deg,var(--bordeaux),var(--gold))':'rgba(34,35,37,.07)', color: form.nom&&form.email?'var(--white)':'rgba(34,35,37,.2)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', cursor: form.nom&&form.email?'pointer':'default', transition:'all .3s' }}>
                      Confirmer ma réservation
                    </button>
                  </div>
                </div>

                {/* Recap sticky */}
                <div style={{ background:'rgba(34,35,37,.04)', border:'1px solid rgba(221,43,33,.15)', padding:'28px', position:'sticky', top:'100px' }}>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Votre réservation</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'20px', color:'var(--black)', marginBottom:'6px' }}>{exp?.nom}</div>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(34,35,37,.45)', marginBottom:'20px', lineHeight:1.7 }}>
                    {day} {monthNames[month]} {year}<br/>{creneau} · {guests} personne{guests>1?'s':''}
                  </div>
                  {exp?.priceNum > 0 && (
                    <>
                      <div style={{ borderTop:'1px solid rgba(34,35,37,.09)', paddingTop:'16px', display:'flex', justifyContent:'space-between' }}>
                        <span style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(34,35,37,.3)' }}>Total</span>
                        <span style={{ fontFamily:'var(--serif)', fontSize:'22px', color:'var(--gold)' }}>{((exp?.priceNum||0)*guests).toLocaleString()} Ar</span>
                      </div>
                      <p style={{ marginTop:'12px', fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(34,35,37,.2)', lineHeight:1.6 }}>Paiement sur place ou via Mobile Money avant la visite.</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
