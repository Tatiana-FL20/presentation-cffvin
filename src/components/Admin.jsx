import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wines } from '../data/wines'

const initialStock = wines.map(w => ({
  ...w,
  stock: Math.floor(Math.random()*200)+20,
  seuil: 30,
  venduMois: Math.floor(Math.random()*80)+10,
}))

const reservations = [
  { id:'R001', nom:'Rakoto Jean', exp:'Expérience Prestige', date:'24 Avr 2025', heure:'10:30', guests:4, statut:'confirmé', montant:260000 },
  { id:'R002', nom:'Rabe Marie', exp:'Découverte du Domaine', date:'25 Avr 2025', heure:'14:00', guests:2, statut:'confirmé', montant:50000 },
  { id:'R003', nom:'Andry Rakotomalala', exp:'Découverte du Domaine', date:'26 Avr 2025', heure:'09:00', guests:6, statut:'en attente', montant:150000 },
  { id:'R004', nom:'Solo Razafy', exp:'Privatisation', date:'02 Mai 2025', heure:'10:00', guests:20, statut:'devis envoyé', montant:null },
  { id:'R005', nom:'Hery Rasolofo', exp:'Expérience Prestige', date:'03 Mai 2025', heure:'15:30', guests:2, statut:'confirmé', montant:130000 },
]

const commandes = [
  { id:'C001', client:'Hôtel Colbert', type:'B2B', date:'20 Avr 2025', vins:'Marofavy ×24, Côte de Fianar ×12', montant:1188000, statut:'livré' },
  { id:'C002', client:'Fara Andriamaro', type:'B2C', date:'19 Avr 2025', vins:'Maropara ×2, Allerao ×1', montant:81000, statut:'expédié' },
  { id:'C003', client:'Restaurant Sakamanga', type:'B2B', date:'18 Avr 2025', vins:'Côte de Fianar Blanc ×48', montant:840000, statut:'livré' },
  { id:'C004', client:'Club Réserve — Ny Ando', type:'Club', date:'17 Avr 2025', vins:'Sélection mensuelle ×4', montant:85000, statut:'expédié' },
  { id:'C005', client:'Lanto Rabarison', type:'B2C', date:'16 Avr 2025', vins:'Coteau d\'Ambalavao ×6', montant:108000, statut:'en préparation' },
]

const statutColor = { confirmé:'var(--olive)', 'en attente':'#C8A96A', 'devis envoyé':'#888', livré:'var(--olive)', expédié:'#4A7A9B', 'en préparation':'#C8A96A' }

function Metric({ label, val, sub, color='var(--gold)' }) {
  return (
    <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', padding:'24px 28px' }}>
      <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.35)', marginBottom:'10px' }}>{label}</div>
      <div style={{ fontFamily:'var(--serif)', fontSize:'36px', fontWeight:300, color, lineHeight:1, marginBottom:'6px' }}>{val}</div>
      {sub && <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.3)' }}>{sub}</div>}
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('stocks')
  const [stock, setStock] = useState(initialStock)
  const [editing, setEditing] = useState(null)
  const [editVal, setEditVal] = useState('')

  const saveEdit = (id) => {
    setStock(s => s.map(w => w.id===id ? {...w, stock: parseInt(editVal)||w.stock} : w))
    setEditing(null)
  }

  const tabs = [
    { key:'stocks', label:'Gestion des stocks' },
    { key:'reservations', label:'Réservations' },
    { key:'commandes', label:'Commandes' },
  ]

  const totalStock = stock.reduce((s,w)=>s+w.stock,0)
  const alertes = stock.filter(w=>w.stock<=w.seuil).length
  const caTotal = commandes.reduce((s,c)=>s+(c.montant||0),0)

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.4}}
      style={{ background:'#0A0A0A', minHeight:'100vh', paddingTop:'90px' }}>

      {/* Admin header */}
      <div style={{ background:'rgba(255,255,255,.02)', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'20px 48px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'4px' }}>Back-office</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:'22px', color:'var(--white)' }}>Chan Foui & Fils — Administration</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          {alertes > 0 && (
            <div style={{ padding:'6px 14px', background:'rgba(110,15,26,.4)', border:'1px solid rgba(110,15,26,.6)', fontFamily:'var(--sans)', fontSize:'10px', color:'#FF7070', letterSpacing:'.1em' }}>
              ⚠ {alertes} stock{alertes>1?'s':''} en alerte
            </div>
          )}
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(200,169,106,.15)', border:'1px solid rgba(200,169,106,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontSize:'14px', color:'var(--gold)' }}>CF</div>
        </div>
      </div>

      <div style={{ padding:'40px 48px', maxWidth:'1300px', margin:'0 auto' }}>

        {/* Metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'40px' }}>
          <Metric label="Bouteilles en stock" val={totalStock.toLocaleString()} sub="toutes cuvées confondues"/>
          <Metric label="Alertes stock" val={alertes} sub={alertes>0?"Seuil bas atteint":"Tout est OK"} color={alertes>0?'#FF7070':'var(--olive)'}/>
          <Metric label="CA ce mois" val={caTotal.toLocaleString()+' Ar'} sub="Commandes récentes"/>
          <Metric label="Réservations à venir" val={reservations.filter(r=>r.statut==='confirmé').length} sub="Confirmées"/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'0', borderBottom:'1px solid rgba(255,255,255,.07)', marginBottom:'32px' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)}
              style={{ padding:'14px 28px', background:'none', border:'none', borderBottom:`2px solid ${tab===t.key?'var(--gold)':'transparent'}`, color: tab===t.key?'var(--gold)':'rgba(245,245,243,.35)', fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer', transition:'color .3s', marginBottom:'-1px' }}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* STOCKS */}
          {tab==='stocks' && (
            <motion.div key="stocks" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.3}}>
              <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', overflow:'hidden' }}>
                {/* Table header */}
                <div style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 1fr 140px', background:'rgba(200,169,106,.06)', borderBottom:'1px solid rgba(200,169,106,.12)', padding:'12px 24px' }}>
                  {['Cuvée','Type','En stock','Seuil','Vendu/mois','Action'].map(h=>(
                    <div key={h} style={{ fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>{h}</div>
                  ))}
                </div>
                {stock.map((w, i) => (
                  <div key={w.id} style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 1fr 140px', padding:'16px 24px', borderBottom: i<stock.length-1?'1px solid rgba(255,255,255,.04)':'none', alignItems:'center', transition:'background .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(200,169,106,.03)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:w.color, flexShrink:0 }}/>
                      <span style={{ fontFamily:'var(--serif)', fontSize:'16px', color:'var(--white)' }}>{w.nom}</span>
                    </div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.35)' }}>{w.type}</div>
                    <div>
                      {editing===w.id ? (
                        <input type="number" value={editVal} onChange={e=>setEditVal(e.target.value)}
                          onKeyDown={e=>{if(e.key==='Enter')saveEdit(w.id);if(e.key==='Escape')setEditing(null)}}
                          autoFocus
                          style={{ width:'72px', padding:'4px 8px', background:'rgba(200,169,106,.1)', border:'1px solid var(--gold)', color:'var(--gold)', fontFamily:'var(--sans)', fontSize:'13px', outline:'none' }}/>
                      ) : (
                        <span style={{ fontFamily:'var(--sans)', fontSize:'15px', fontWeight:500, color: w.stock<=w.seuil?'#FF7070':w.stock<=w.seuil*1.5?'#FFAA44':'rgba(245,245,243,.8)' }}>{w.stock}</span>
                      )}
                    </div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(245,245,243,.3)' }}>{w.seuil}</div>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                        <div style={{ width:'50px', height:'3px', background:'rgba(255,255,255,.08)', borderRadius:'2px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${Math.min((w.venduMois/w.stock)*100,100)}%`, background:'var(--gold)' }}/>
                        </div>
                        <span style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.4)' }}>{w.venduMois}</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'8px' }}>
                      {editing===w.id ? (
                        <>
                          <button onClick={()=>saveEdit(w.id)} style={{ padding:'6px 12px', background:'var(--gold)', color:'var(--black)', border:'none', fontFamily:'var(--sans)', fontSize:'9px', fontWeight:500, letterSpacing:'.1em', cursor:'pointer' }}>OK</button>
                          <button onClick={()=>setEditing(null)} style={{ padding:'6px 12px', background:'transparent', border:'1px solid rgba(255,255,255,.1)', color:'rgba(245,245,243,.4)', fontFamily:'var(--sans)', fontSize:'9px', cursor:'pointer' }}>✕</button>
                        </>
                      ) : (
                        <button onClick={()=>{setEditing(w.id);setEditVal(String(w.stock))}} style={{ padding:'6px 14px', background:'transparent', border:'1px solid rgba(200,169,106,.25)', color:'rgba(200,169,106,.7)', fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.12em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}
                          onMouseEnter={e=>{e.target.style.borderColor='var(--gold)';e.target.style.color='var(--gold)'}}
                          onMouseLeave={e=>{e.target.style.borderColor='rgba(200,169,106,.25)';e.target.style.color='rgba(200,169,106,.7)'}}>
                          Modifier
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop:'16px', fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.2)', letterSpacing:'.05em' }}>
                Cliquez sur "Modifier" pour ajuster le stock · Appuyez sur Entrée pour valider
              </p>
            </motion.div>
          )}

          {/* RÉSERVATIONS */}
          {tab==='reservations' && (
            <motion.div key="resa" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.3}}>
              <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'80px 1.5fr 1.5fr 1fr 80px 100px 120px', background:'rgba(200,169,106,.06)', borderBottom:'1px solid rgba(200,169,106,.12)', padding:'12px 24px' }}>
                  {['Réf.','Client','Expérience','Date','Pers.','Montant','Statut'].map(h=>(
                    <div key={h} style={{ fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>{h}</div>
                  ))}
                </div>
                {reservations.map((r,i)=>(
                  <div key={r.id} style={{ display:'grid', gridTemplateColumns:'80px 1.5fr 1.5fr 1fr 80px 100px 120px', padding:'16px 24px', borderBottom: i<reservations.length-1?'1px solid rgba(255,255,255,.04)':'none', alignItems:'center', transition:'background .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(200,169,106,.03)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.3)' }}>{r.id}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'var(--white)' }}>{r.nom}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'14px', fontStyle:'italic', color:'rgba(245,245,243,.6)' }}>{r.exp}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.5)', lineHeight:1.5 }}>{r.date}<br/>{r.heure}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.7)', textAlign:'center' }}>{r.guests}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'14px', color:'var(--gold)' }}>{r.montant?r.montant.toLocaleString()+' Ar':'Sur devis'}</div>
                    <div>
                      <span style={{ padding:'4px 10px', background: (statutColor[r.statut]||'#888')+'22', color: statutColor[r.statut]||'#888', fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.1em', textTransform:'uppercase', border:`1px solid ${(statutColor[r.statut]||'#888')}44` }}>{r.statut}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COMMANDES */}
          {tab==='commandes' && (
            <motion.div key="cmd" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.3}}>
              <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'80px 1.5fr 80px 1fr 2fr 120px 120px', background:'rgba(200,169,106,.06)', borderBottom:'1px solid rgba(200,169,106,.12)', padding:'12px 24px' }}>
                  {['Réf.','Client','Type','Date','Cuvées','Montant','Statut'].map(h=>(
                    <div key={h} style={{ fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>{h}</div>
                  ))}
                </div>
                {commandes.map((c,i)=>(
                  <div key={c.id} style={{ display:'grid', gridTemplateColumns:'80px 1.5fr 80px 1fr 2fr 120px 120px', padding:'16px 24px', borderBottom: i<commandes.length-1?'1px solid rgba(255,255,255,.04)':'none', alignItems:'center', transition:'background .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(200,169,106,.03)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(245,245,243,.3)' }}>{c.id}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'var(--white)' }}>{c.client}</div>
                    <div>
                      <span style={{ padding:'3px 8px', background: c.type==='B2B'?'rgba(74,93,35,.3)':c.type==='Club'?'rgba(110,15,26,.3)':'rgba(255,255,255,.05)', color: c.type==='B2B'?'#8FAF45':c.type==='Club'?'#C8506A':'rgba(245,245,243,.4)', fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'.1em', textTransform:'uppercase' }}>{c.type}</span>
                    </div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.4)' }}>{c.date}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'13px', fontStyle:'italic', color:'rgba(245,245,243,.55)' }}>{c.vins}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'15px', color:'var(--gold)' }}>{c.montant.toLocaleString()} Ar</div>
                    <div>
                      <span style={{ padding:'4px 10px', background: (statutColor[c.statut]||'#888')+'22', color: statutColor[c.statut]||'#888', fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.1em', textTransform:'uppercase', border:`1px solid ${(statutColor[c.statut]||'#888')}44` }}>{c.statut}</span>
                    </div>
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
