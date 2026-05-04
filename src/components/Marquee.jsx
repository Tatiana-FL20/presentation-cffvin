const items = ['Vins Rouges','·','Vins Blancs','·','Produits de Madagascar','·','Depuis 1980','·','Ambalavao','·','Côte de Fianar','·','Marofavy','·','Maropara Blanc Doux','·','Allerao 2019','·']
const doubled = [...items,...items]
export default function Marquee() {
  return (
    <div style={{ background:'var(--gold)', padding:'14px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', width:'max-content', animation:'marquee 28s linear infinite' }}>
        {doubled.map((item,i)=>(
          <span key={i} style={{ fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--black)', whiteSpace:'nowrap', padding:'0 20px' }}>{item}</span>
        ))}
      </div>
    </div>
  )
}
