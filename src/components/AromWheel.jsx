import { useEffect, useRef } from 'react'

const labels = { fruits:'Fruits', floral:'Floral', boise:'Boisé', epices:'Épices', mineral:'Minéral' }
const keys = ['fruits','floral','boise','epices','mineral']

export default function AromWheel({ aromes, color='#C8A96A' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    const W=canvas.width=200, H=canvas.height=200, cx=W/2, cy=H/2, R=75
    const N=keys.length
    ctx.clearRect(0,0,W,H)

    // Grid circles
    for(let r=1;r<=4;r++) {
      ctx.beginPath()
      for(let i=0;i<N;i++) {
        const a=(i/N)*Math.PI*2 - Math.PI/2
        const rr=(r/4)*R
        const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
      }
      ctx.closePath(); ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1; ctx.stroke()
    }
    // Spokes
    keys.forEach((_,i) => {
      const a=(i/N)*Math.PI*2-Math.PI/2
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*R, cy+Math.sin(a)*R)
      ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.stroke()
    })
    // Data polygon
    ctx.beginPath()
    keys.forEach((k,i) => {
      const a=(i/N)*Math.PI*2-Math.PI/2, v=(aromes[k]||0)/100
      const x=cx+Math.cos(a)*R*v, y=cy+Math.sin(a)*R*v
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
    })
    ctx.closePath()
    ctx.fillStyle=color+'33'; ctx.fill()
    ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.stroke()
    // Dots
    keys.forEach((k,i) => {
      const a=(i/N)*Math.PI*2-Math.PI/2, v=(aromes[k]||0)/100
      ctx.beginPath(); ctx.arc(cx+Math.cos(a)*R*v, cy+Math.sin(a)*R*v, 3,0,Math.PI*2)
      ctx.fillStyle=color; ctx.fill()
    })
    // Labels
    keys.forEach((k,i) => {
      const a=(i/N)*Math.PI*2-Math.PI/2
      const lx=cx+Math.cos(a)*(R+18), ly=cy+Math.sin(a)*(R+18)
      ctx.fillStyle='rgba(245,245,243,.5)'; ctx.font='9px Inter,sans-serif'
      ctx.textAlign='center'; ctx.textBaseline='middle'
      ctx.fillText(labels[k], lx, ly)
    })
  }, [aromes, color])

  return <canvas ref={canvasRef} width={200} height={200} style={{ display:'block' }}/>
}
