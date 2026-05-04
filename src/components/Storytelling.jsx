import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const chapters = [
  { year:'1980', title:'Les Origines', sub:'La première vigne', text:"Sur les hauts plateaux de l'Imerina, à 1 200 mètres d'altitude, la famille Chan Foui plante les premières vignes. Un pari audacieux sur une terre volcanique rouge, portée par une conviction : Madagascar peut produire un grand vin.", color:'#6E0F1A' },
  { year:'1990', title:'Le Terroir', sub:'Une signature unique', text:"Les nuits fraîches et les journées ensoleillées créent un microclimat exceptionnel. Le sol volcanique, riche en fer et en minéraux, confère à chaque cuvée une complexité aromatique que nulle autre région au monde ne peut reproduire.", color:'#4A5D23' },
  { year:'2000', title:'La Production', sub:'L\'art de l\'excellence', text:"De la vendange à la bouteille, chaque étape est maîtrisée avec une rigueur absolue. Nos vignerons sélectionnent grappe par grappe, préservant l'intégrité du fruit. Quarante ans d'expérience distillés dans chaque gorgée.", color:'#C8A96A' },
  { year:'Aujourd\'hui', title:'La Philosophie', sub:'Perpétuer · Évoluer · Innover', text:"Chan Foui & Fils n'est pas seulement un producteur de vin. C'est une maison qui croit que Madagascar a quelque chose de rare à offrir au monde — une authenticité, une singularité, une âme. Et cette conviction guide chaque décision.", color:'#888' },
]

function Chapter({ ch, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] })
  const opacity = useTransform(scrollYProgress, [0,0.5,1],[0,1,1])
  const y = useTransform(scrollYProgress, [0,0.5],[60,0])
  const lineH = useTransform(scrollYProgress, [0,1],['0%','100%'])
  const isEven = index % 2 === 0

  return (
    <motion.div ref={ref} style={{ opacity, y, display:'grid', gridTemplateColumns:'1fr 80px 1fr', gap:'0 24px', alignItems:'start', marginBottom:'100px' }}>
      {/* Left */}
      <div style={{ textAlign: isEven ? 'right' : 'left', gridColumn: isEven ? 1 : 3, gridRow:1 }}>
        {isEven && (
          <div style={{ paddingRight:'24px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{ch.sub}</div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--white)', marginBottom:'20px', lineHeight:1.1 }}>{ch.title}</h3>
            <p style={{ fontFamily:'var(--serif)', fontSize:'17px', fontStyle:'italic', color:'rgba(245,245,243,.6)', lineHeight:1.85 }}>{ch.text}</p>
          </div>
        )}
      </div>

      {/* Center timeline */}
      <div style={{ gridColumn:2, gridRow:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', paddingTop:'8px' }}>
        <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:ch.color, boxShadow:`0 0 20px ${ch.color}88` }}/>
        <motion.div style={{ width:'1px', height:lineH, background:`linear-gradient(to bottom, ${ch.color}, transparent)`, minHeight:'160px' }}/>
        <div style={{ fontFamily:'var(--serif)', fontSize:'13px', color:'rgba(245,245,243,.35)', writingMode:'vertical-rl' }}>{ch.year}</div>
      </div>

      {/* Right */}
      <div style={{ gridColumn: isEven ? 3 : 1, gridRow:1 }}>
        {!isEven && (
          <div style={{ paddingLeft:'24px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{ch.sub}</div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'var(--white)', marginBottom:'20px', lineHeight:1.1 }}>{ch.title}</h3>
            <p style={{ fontFamily:'var(--serif)', fontSize:'17px', fontStyle:'italic', color:'rgba(245,245,243,.6)', lineHeight:1.85 }}>{ch.text}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Storytelling() {
  return (
    <section id="histoire" style={{ background:'var(--black)', padding:'120px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-300px', right:'-300px', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle, rgba(110,15,26,.15) 0%, transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}} style={{ textAlign:'center', marginBottom:'96px' }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>L'histoire</div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(44px,6vw,80px)', fontWeight:300, color:'var(--white)', lineHeight:1.05 }}>
            Une <em style={{ fontStyle:'italic', color:'var(--gold)' }}>saga</em> malgache
          </h2>
        </motion.div>
        {chapters.map((ch, i) => <Chapter key={ch.year} ch={ch} index={i}/>)}
      </div>
    </section>
  )
}
