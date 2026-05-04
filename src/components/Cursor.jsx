import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    let mx=0, my=0, rx=0, ry=0
    window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY })
    const raf = () => {
      rx += (mx-rx)*.1; ry += (my-ry)*.1
      if(cursor) { cursor.style.left=mx+'px'; cursor.style.top=my+'px' }
      if(ring)   { ring.style.left=rx+'px';   ring.style.top=ry+'px' }
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    document.addEventListener('mouseover', e => {
      if(e.target.closest('a,button,[data-hover]')) document.body.classList.add('cursor-hover')
      else document.body.classList.remove('cursor-hover')
    })
  }, [])
  return <><div id="cursor"/><div id="cursor-ring"/></>
}
