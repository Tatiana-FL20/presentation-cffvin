import { motion } from 'framer-motion'
import { wines } from '../data/wines'
import { navigate } from '../hooks/useStore'

const b2bPrices = {
  'coteau-rouge': { '6-11':'16 000','12-23':'14 000','24+':'12 000' },
  'cote-fianar-rouge': { '6-11':'20 000','12-23':'17 500','24+':'15 000' },
  'marofavy': { '6-11':'32 000','12-23':'28 000','24+':'24 000' },
  'champetre': { '6-11':'10 500','12-23':'9 000','24+':'7 500' },
  'coteau-blanc': { '6-11':'16 000','12-23':'14 000','24+':'12 000' },
  'cote-fianar-blanc': { '6-11':'20 000','12-23':'17 500','24+':'15 000' },
  'maropara': { '6-11':'26 000','12-23':'22 000','24+':'19 000' },
  'allerao': { '6-11':'22 000','12-23':'19 000','24+':'16 000' },
}

export default function B2B() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}}
      style={{ background:'#0D0D0D', minHeight:'100vh', paddingTop:'120px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px' }}>

        <button onClick={()=>navigate('home')} style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,245,243,.4)', background:'none', border:'none', cursor:'pointer', marginBottom:'48px', padding:0 }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(245,245,243,.4)'}
        >← Retour</button>

        <div style={{ marginBottom:'60px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Espace Professionnel</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(36px,4vw,60px)', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>Portail B2B</h1>
          <p style={{ fontFamily:'var(--sans)', fontSize:'14px', color:'rgba(245,245,243,.4)', maxWidth:'560px', lineHeight:1.7 }}>
            Tarifs préférentiels pour restaurateurs, hôteliers et revendeurs. Commande minimum 6 bouteilles. Facturation à 30 jours pour clients référencés.
          </p>
        </div>

        {/* Pricing table */}
        <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', background:'rgba(200,169,106,.08)', borderBottom:'1px solid rgba(200,169,106,.15)', padding:'14px 24px' }}>
            {['Cuvée','Type','6–11 btl','12–23 btl','24+ btl'].map(h=>(
              <div key={h} style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>{h}</div>
            ))}
          </div>
          {wines.map((w,i)=>(
            <div key={w.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'18px 24px', borderBottom: i<wines.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none', transition:'background .2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(200,169,106,.04)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
            >
              <div style={{ fontFamily:'var(--serif)', fontSize:'16px', color:'var(--white)' }}>{w.nom}</div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(245,245,243,.4)' }}>{w.type}</div>
              {['6-11','12-23','24+'].map(tier=>(
                <div key={tier} style={{ fontFamily:'var(--sans)', fontSize:'13px', color: tier==='24+' ? 'var(--gold)' : 'rgba(245,245,243,.7)' }}>
                  {b2bPrices[w.id]?.[tier]||'-'} Ar
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop:'48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
          {[
            { title:'Commander en gros', desc:'Passez votre commande B2B directement en ligne. Livraison sous 48–72h.', cta:'Passer une commande', action:()=>navigate('b2border'), style:{ background:'var(--gold)', color:'var(--black)' } },
            { title:'Devenir revendeur', desc:'Partenariat exclusif, conditions préférentielles, support commercial dédié.', cta:'Nous contacter', action:()=>navigate('contact'), style:{ background:'transparent', border:'1px solid rgba(200,169,106,.4)', color:'var(--gold)' } },
          ].map(card=>(
            <div key={card.title} style={{ padding:'40px', border:'1px solid rgba(255,255,255,.06)' }}>
              <h3 style={{ fontFamily:'var(--serif)', fontSize:'26px', fontWeight:300, color:'var(--white)', marginBottom:'12px' }}>{card.title}</h3>
              <p style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(245,245,243,.4)', lineHeight:1.7, marginBottom:'28px' }}>{card.desc}</p>
              <button onClick={card.action||undefined} style={{ padding:'14px 32px', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', transition:'opacity .3s', border:'none', ...card.style }}
                onMouseEnter={e=>e.target.style.opacity='.8'}
                onMouseLeave={e=>e.target.style.opacity='1'}
              >{card.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
