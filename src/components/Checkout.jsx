import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, navigate, setState } from '../hooks/useStore'

const steps = ['Coordonnées','Livraison','Paiement','Confirmation']

export default function Checkout() {
  const cart = useStore(s=>s.cart)
  const total = cart.reduce((s,i)=>s+i.priceNum*i.qty,0)
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState('mobile')
  const [ref, setRef] = useState('')
  const [done, setDone] = useState(false)

  const next = () => { if(step<3) setStep(s=>s+1); else setDone(true) }

  if(done) return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ background:'var(--black)', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'24px', padding:'48px' }}>
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200,damping:15}}>
        <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'var(--olive)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px' }}>✓</div>
      </motion.div>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'40px', fontWeight:300, color:'var(--white)', textAlign:'center' }}>Commande confirmée !</h2>
      <p style={{ fontFamily:'var(--serif)', fontSize:'18px', fontStyle:'italic', color:'rgba(245,245,243,.5)', textAlign:'center', maxWidth:'400px' }}>Un email de confirmation vous sera envoyé. Livraison sous 48–72h.</p>
      <button onClick={()=>{setState({cart:[]});navigate('home')}} style={{ padding:'16px 48px', background:'var(--gold)', color:'var(--black)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer', marginTop:'16px' }}>Retour à l'accueil</button>
    </motion.div>
  )

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ background:'var(--black)', minHeight:'100vh', paddingTop:'100px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'0 48px' }}>

        {/* Stepper */}
        <div style={{ display:'flex', alignItems:'center', gap:'0', marginBottom:'64px' }}>
          {steps.map((s,i)=>(
            <div key={s} style={{ display:'flex', alignItems:'center', flex: i<steps.length-1 ? '1' : 'none' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: i<=step ? 'var(--gold)' : 'rgba(255,255,255,.08)', color: i<=step ? 'var(--black)' : 'rgba(245,245,243,.3)', fontFamily:'var(--sans)', fontSize:'12px', fontWeight:500, transition:'all .3s' }}>
                  {i<step ? '✓' : i+1}
                </div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.15em', textTransform:'uppercase', color: i===step ? 'var(--gold)' : 'rgba(245,245,243,.3)', whiteSpace:'nowrap' }}>{s}</div>
              </div>
              {i<steps.length-1 && <div style={{ flex:1, height:'1px', background: i<step ? 'var(--gold)' : 'rgba(255,255,255,.08)', margin:'0 12px', marginBottom:'24px', transition:'background .3s' }}/>}
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'40px', alignItems:'start' }}>
          {/* Form */}
          <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)', padding:'40px' }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:.3}}>
                {step===0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    <h3 style={{ fontFamily:'var(--serif)', fontSize:'26px', fontWeight:300, color:'var(--white)', marginBottom:'8px' }}>Vos coordonnées</h3>
                    {[['Nom complet','text'],['Email','email'],['Téléphone','+261...']].map(([ph,tp])=>(
                      <input key={ph} type={tp} placeholder={ph} style={{ width:'100%', padding:'14px 18px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'14px', outline:'none' }}
                        onFocus={e=>e.target.style.borderColor='var(--gold)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.1)'}/>
                    ))}
                  </div>
                )}
                {step===1 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    <h3 style={{ fontFamily:'var(--serif)', fontSize:'26px', fontWeight:300, color:'var(--white)', marginBottom:'8px' }}>Adresse de livraison</h3>
                    {['Adresse complète','Ville','Repère (si applicable)'].map(ph=>(
                      <input key={ph} placeholder={ph} style={{ width:'100%', padding:'14px 18px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'14px', outline:'none' }}
                        onFocus={e=>e.target.style.borderColor='var(--gold)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.1)'}/>
                    ))}
                  </div>
                )}
                {step===2 && (
                  <div>
                    <h3 style={{ fontFamily:'var(--serif)', fontSize:'26px', fontWeight:300, color:'var(--white)', marginBottom:'24px' }}>Mode de paiement</h3>
                    <div style={{ display:'flex', gap:'12px', marginBottom:'28px' }}>
                      {[{key:'mobile',label:'Mobile Money'},{key:'virement',label:'Virement'}].map(m=>(
                        <button key={m.key} onClick={()=>setMethod(m.key)} style={{ flex:1, padding:'14px', border:`1px solid ${method===m.key?'var(--gold)':'rgba(255,255,255,.1)'}`, background: method===m.key?'rgba(200,169,106,.1)':'transparent', color: method===m.key?'var(--gold)':'rgba(245,245,243,.5)', fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.12em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>{m.label}</button>
                      ))}
                    </div>
                    {method==='mobile' && (
                      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{ background:'rgba(200,169,106,.05)', border:'1px solid rgba(200,169,106,.2)', padding:'24px' }}>
                        <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Instructions Mobile Money</div>
                        {['1. Envoyez le montant total via MVola / Airtel Money / Orange Money','2. Numéro à créditer : 034 XX XXX XX (Chan Foui & Fils)','3. Entrez la référence de votre transaction ci-dessous'].map((s,i)=>(
                          <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'10px', fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.6)', lineHeight:1.5 }}>
                            <span style={{ color:'var(--gold)', flexShrink:0 }}>{i+1}.</span><span>{s.slice(3)}</span>
                          </div>
                        ))}
                        <input placeholder="Référence de transaction (ex: MVL-XXXXXXX)" value={ref} onChange={e=>setRef(e.target.value)} style={{ width:'100%', padding:'14px 18px', marginTop:'16px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'14px', outline:'none' }}
                          onFocus={e=>e.target.style.borderColor='var(--gold)'}
                          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.1)'}/>
                      </motion.div>
                    )}
                  </div>
                )}
                {step===3 && (
                  <div>
                    <h3 style={{ fontFamily:'var(--serif)', fontSize:'26px', fontWeight:300, color:'var(--white)', marginBottom:'24px' }}>Récapitulatif</h3>
                    {cart.map(i=>(
                      <div key={i.id} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
                        <span style={{ fontFamily:'var(--serif)', fontSize:'15px', color:'rgba(245,245,243,.7)' }}>{i.nom} × {i.qty}</span>
                        <span style={{ fontFamily:'var(--sans)', fontSize:'14px', color:'var(--gold)' }}>{(i.priceNum*i.qty).toLocaleString()} Ar</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'16px', marginTop:'8px' }}>
                      <span style={{ fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(245,245,243,.4)' }}>Total</span>
                      <span style={{ fontFamily:'var(--serif)', fontSize:'24px', color:'var(--gold)' }}>{total.toLocaleString()} Ar</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button onClick={next} style={{ width:'100%', padding:'18px', marginTop:'32px', background:'linear-gradient(90deg,var(--bordeaux),var(--gold))', color:'var(--white)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', cursor:'pointer', transition:'opacity .3s' }}
              onMouseEnter={e=>e.target.style.opacity='.85'}
              onMouseLeave={e=>e.target.style.opacity='1'}
            >{step===3 ? 'Confirmer la commande' : 'Continuer →'}</button>
          </div>

          {/* Order summary */}
          <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', padding:'28px', position:'sticky', top:'100px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Votre commande</div>
            {cart.map(i=>(
              <div key={i.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                <div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'14px', color:'var(--white)' }}>{i.nom}</div>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.3)' }}>× {i.qty}</div>
                </div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.6)' }}>{(i.priceNum*i.qty).toLocaleString()} Ar</div>
              </div>
            ))}
            <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:'16px', marginTop:'8px', display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(245,245,243,.35)' }}>Total</span>
              <span style={{ fontFamily:'var(--serif)', fontSize:'22px', color:'var(--gold)' }}>{total.toLocaleString()} Ar</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
