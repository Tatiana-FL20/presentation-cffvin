import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const words = ["L'essence", "du terroir", "malgache."]

export default function Hero() {
  const canvasRef = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setTimeout(() => setShown(true), 200)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, animId
    const P = Array.from({length:100}, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      r: Math.random()*1.8+.3, vx:(Math.random()-.5)*.25, vy:-Math.random()*.4-.1,
      alpha:Math.random()*.5+.1, life:Math.random()
    }))
    const resize = () => { w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight }
    resize(); window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0,0,w,h)
      P.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.life+=.003
        if(p.y<-5||p.life>1) { p.x=Math.random()*w; p.y=h+5; p.life=0 }
        const pulse = Math.sin(p.life*Math.PI)
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(200,169,106,${p.alpha*pulse})`; ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    draw()

    const onMove = e => {
      const bg = document.getElementById('hero-parallax')
      if(bg) { bg.style.transform=`translate(${(e.clientX/w-.5)*24}px,${(e.clientY/h-.5)*16}px) scale(1.06)` }
    }
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',onMove) }
  }, [])

  return (
    <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0B0B0B' }}>
      {/* Parallax bg */}
      <div id="hero-parallax" style={{ position:'absolute', inset:'-5%', transition:'transform .9s cubic-bezier(.16,1,.3,1)' }}>
        <div style={{ width:'100%', height:'100%', background:'radial-gradient(ellipse 80% 80% at 40% 55%, #2A0610 0%, #0B0B0B 70%)' }} />
        {/* Vineyard silhouette */}
        <svg style={{ position:'absolute', bottom:0, left:0, right:0, width:'100%', opacity:.18 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
          <path d="M0 400L0 280C100 240 200 200 300 220C400 240 500 180 600 160C700 140 800 180 900 170C1000 160 1100 130 1200 150C1300 170 1380 200 1440 210L1440 400Z" fill="#4A5D23" opacity=".6"/>
          <path d="M0 400L0 320C150 290 280 270 400 280C520 290 620 260 720 250C820 240 950 270 1080 260C1200 250 1340 240 1440 250L1440 400Z" fill="#2A3A15" opacity=".8"/>
          {[...Array(18)].map((_,i)=>(
            <g key={i} transform={`translate(${60+i*82},${280+Math.sin(i)*20})`}>
              <line x1="0" y1="0" x2="0" y2="120" stroke="#C8A96A" strokeWidth=".6" strokeOpacity=".3"/>
              <ellipse cx="0" cy="20" rx="14" ry="9" fill="#4A5D23" fillOpacity=".5"/>
              <ellipse cx="0" cy="40" rx="12" ry="8" fill="#3A4D18" fillOpacity=".5"/>
            </g>
          ))}
        </svg>
      </div>

      {/* Diagonal lines */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.06, pointerEvents:'none' }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {[...Array(10)].map((_,i)=><line key={i} x1={-100+i*180} y1="0" x2={i*180+300} y2="900" stroke="#C8A96A" strokeWidth=".8"/>)}
      </svg>

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }}/>

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 20%, rgba(11,11,11,.8) 100%)' }}/>

      {/* Content */}
      <div style={{ position:'relative', textAlign:'center', padding:'0 28px', maxWidth:'900px', marginTop:'-2px' }}>
        <motion.div initial={{opacity:0,y:16}} animate={shown?{opacity:1,y:0}:{}} transition={{duration:.8,delay:.3}}
          style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:400, letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>
          Depuis 1960 · Ambalavao, Madagascar
        </motion.div>

        <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(64px,10vw,130px)', fontWeight:300, lineHeight:1.1, color:'var(--white)', marginBottom:'0' }}>
          {words.map((w,wi) => (
            <div key={wi} style={{ overflow:'hidden', display:'block', lineHeight:1.1, paddingBottom: wi===2 ? '0.12em' : 0 }}>
              <motion.span display="block" initial={{y:'110%'}} animate={shown?{y:'0%'}:{}} transition={{ duration:.9, delay:.5+wi*.15, ease:[.16,1,.3,1] }}
                style={{ display:'block', fontStyle: wi===1?'italic':'normal' }}>
                {wi===2 ? <span className="gold-text">{w}</span> : w}
              </motion.span>
            </div>
          ))}
        </h2>

        <motion.div initial={{scaleX:0}} animate={shown?{scaleX:1}:{}} transition={{duration:1.2,delay:1.2}}
          style={{ width:'78px', height:'1px', background:'linear-gradient(90deg,transparent,var(--gold),transparent)', margin:'20px auto' }}/>

        <motion.p initial={{opacity:0,y:20}} animate={shown?{opacity:1,y:0}:{}} transition={{duration:.8,delay:1.4}}
          style={{ fontFamily:'var(--serif)', fontSize:'clamp(17px,2.2vw,24px)', fontStyle:'italic', color:'rgba(245,245,243,.6)', lineHeight:1.65, maxWidth:'520px', margin:'0 auto 20px' }}>
          Quarante ans de passion au cœur des hauts plateaux.<br/>Un vin rare, élégant, et profondément malgache.
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={shown?{opacity:1,y:0}:{}} transition={{duration:.8,delay:1.7}}
          style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#vins" style={{ padding:'18px 52px', background:'var(--gold)', color:'var(--black)', border:'1px solid var(--gold)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', textDecoration:'none', transition:'transform .3s, background .3s, color .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.04)';e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--gold)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.background='var(--gold)';e.currentTarget.style.color='var(--black)'}}>
            Découvrir le domaine
          </a>
          <a href="#histoire" style={{ padding:'18px 52px', background:'transparent', border:'1px solid rgba(245,245,243,.25)', color:'var(--white)', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:300, letterSpacing:'.2em', textTransform:'uppercase', textDecoration:'none', transition:'border-color .3s, color .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(245,245,243,.25)';e.currentTarget.style.color='var(--white)'}}>
            Notre histoire
          </a>
        </motion.div>
      </div>

      {/*  */}
      <motion.div initial={{opacity:0}} animate={shown?{opacity:1}:{}} transition={{delay:2.2}}
        style={{ position:'absolute', bottom:'-10px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'20px' }}>
        <span style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(245,245,243,.3)' }}>Défiler</span>
        <div style={{ width:'1px', height:'52px', background:'var(--gold)', transformOrigin:'top', animation:'scrollDrop 2s ease-in-out infinite' }}/>
      </motion.div>  

      {/* Floating year */}
      <div style={{ position:'absolute', right:'48px', bottom:'40px', fontFamily:'var(--serif)', fontSize:'110px', fontWeight:300, color:'rgba(200,169,106,.05)', lineHeight:1, animation:'float 7s ease-in-out infinite', userSelect:'none' }}>1960</div>
    </section>
  )
}
