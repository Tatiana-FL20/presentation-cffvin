import { useEffect, useRef, useState } from 'react'

const milestones = [
  { year: '1980', label: 'Les origines', color: '#dd2b21', text: 'La famille Chan Foui plante les premières vignes à Ambalavao, sur les hauts plateaux à 1 200 mètres. Le Coteau d\'Ambalavao naît — premier vin rouge de la maison, premier souffle d\'une grande histoire.' },
  { year: '1990', label: 'L\'expansion', color: '#c42820', text: 'Le Côte de Fianar voit le jour, blanc et rouge. La maison s\'impose comme référence nationale, approvisionnant les grands hôtels de Tananarive. La réputation dépasse l\'île.' },
  { year: '2000', label: 'La consécration', color: '#878f90', text: 'Naissance du maroparasy Rouge et du maroparasyBlanc Doux. Ces cuvées premium consacrent Chan Foui & Fils comme le producteur le plus demandé de Madagascar. Une légende est née.' },
  { year: '2019', label: 'L\'innovation', color: '#c8d8d6', text: 'Lancement de l\'aperao — cuvée contemporaine audacieuse. La maison regarde vers l\'avenir, vers les nouvelles générations et les marchés d\'exportation. L\'histoire continue.' },
]

function Counter({ target, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = now => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 4)
          setVal(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Histoire() {
  const lineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.style.height = '100%'
    }, { threshold: 0.1 })
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="histoire" style={{ background: 'transparent', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(221,43,33,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '96px' }}>
          <p className="reveal" style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Notre Histoire</p>
          <h2 className="reveal" data-delay="0.1" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 300, lineHeight: 1.05, color: 'var(--black)' }}>
            Quatre décennies<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>de passion malgache</em>
          </h2>
        </div>

        {/* Stats */}
        <div className="reveal" data-delay="0.2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(221,43,33,0.2)', marginBottom: '96px' }}>
          {[
            { val: 40, suffix: '+', label: 'Années d\'histoire' },
            { val: 1200, suffix: 'm', label: 'Altitude des vignes' },
            { val: 7, suffix: '', label: 'Cuvées emblématiques' },
            { val: 1, suffix: 'er', label: 'Vin de Madagascar' },
          ].map(s => (
            <div key={s.label} style={{ background: 'transparent', padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '8px' }}>
                <Counter target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(34,35,37,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '80px 2px 1fr', gap: '0 32px' }}>
          {/* Timeline line container */}
          <div style={{ gridColumn: '2', gridRow: `1 / ${milestones.length + 1}`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0%', background: 'linear-gradient(to bottom, var(--bordeaux), var(--gold))', transition: 'height 2s ease', ref: lineRef }} ref={lineRef} />
          </div>

          {milestones.map((m, i) => (
            <>
              {/* Year */}
              <div key={`y${i}`} className="reveal" data-delay={i * 0.15} style={{ gridColumn: '1', textAlign: 'right', paddingTop: '4px', paddingBottom: '64px', position: 'relative' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: m.color, position: 'absolute', right: '-37px', top: '8px', boxShadow: `0 0 20px ${m.color}80` }} />
                <span style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 300, color: m.color }}>{m.year}</span>
              </div>
              {/* Skip line column */}
              <div key={`s${i}`} style={{ gridColumn: '2' }} />
              {/* Content */}
              <div key={`c${i}`} className="reveal" data-delay={i * 0.15 + 0.1} style={{ gridColumn: '3', paddingBottom: '64px', paddingTop: '4px' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: m.color, marginBottom: '10px' }}>{m.label}</div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(34,35,37,0.75)', lineHeight: 1.8 }}>{m.text}</p>
              </div>
            </>
          ))}
        </div>

        {/* Slogan banner */}
        <div className="reveal" style={{ marginTop: '80px', position: 'relative', padding: '64px', border: '1px solid rgba(221,43,33,0.25)', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(221,43,33,0.2), transparent 60%)' }} />
          <blockquote style={{ position: 'relative', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--black)', lineHeight: 1.3 }}>
            "Perpétuer, évoluer, innover."
          </blockquote>
          <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '28px auto 20px' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Chan Foui & Fils — Ambalavao, Madagascar</p>
        </div>
      </div>
    </section>
  )
}
