import { motion } from 'framer-motion'
import { navigate } from '../hooks/useStore'

const privileges = [
  { titre: 'Dégustations privées', desc: 'Découvrez chaque cuvée directement en cave, guidé par nos vignerons.' },
  { titre: 'Tarifs négociables', desc: 'En visite, les conditions commerciales s\'adaptent à vos besoins réels.' },
  { titre: 'Obtention de la Carte Rouge', desc: 'Devenez partenaire officiel sur place et accédez à l\'espace B2B.' },
  { titre: 'Sélection sur mesure', desc: 'Composez votre commande bouteille par bouteille, sans contrainte de palier.' },
  { titre: 'Accès à la cave', desc: 'Visitez nos installations : vignes, cuves, ligne d\'embouteillage.' },
  { titre: 'Enlèvement immédiat', desc: 'Repartez avec votre commande le jour même, sans délai de livraison.' },
]

export default function Visite() {
  return (
    <section style={{ background: '#080808', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient */}
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,42,61,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,151,58,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end', marginBottom: '80px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Ambalavao, Madagascar</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px,5vw,68px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05, marginBottom: '24px' }}>
              Tout se passe<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>dans nos locaux.</em>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,245,243,.5)', lineHeight: 1.8, maxWidth: '440px' }}>
              La vraie expérience Chan Foui & Fils ne s'expédie pas. Elle se vit sur place, entre les vignes et les cuves, avec nos équipes à vos côtés.
            </p>
          </motion.div>

          {/* Infos pratiques */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .15 }}
            style={{ border: '1px solid rgba(200,169,106,.2)', background: 'rgba(200,169,106,.04)', padding: '40px' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '28px' }}>Nos locaux</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📍', label: 'Adresse', val: 'Ankadimbahoaka\nAntananarivo, Madagascar' },
                { icon: '🕐', label: 'Horaires', val: 'Lun – Ven : 08h00–11h30 · 13h00–16h00\nSamedi : 08h30–11h00' },
                { icon: '📞', label: 'Contact direct', val: '034 22 326 04\ninfo@chanfoui.mg' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', border: '1px solid rgba(200,169,106,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,245,243,.3)', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(245,245,243,.75)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(200,169,106,.15)', margin: '28px 0' }} />

            <button onClick={() => navigate('contact')}
              style={{ width: '100%', padding: '14px', background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
            >Prendre rendez-vous</button>
          </motion.div>
        </div>

        {/* Séparateur */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,106,.3), transparent)', marginBottom: '64px', transformOrigin: 'left' }} />

        {/* Privilèges */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '40px', textAlign: 'center' }}>
          Ce que vous gagnez en venant chez nous
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(200,169,106,.1)' }}>
          {privileges.map((p, i) => (
            <motion.div key={p.titre}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: i * .08 }}
              style={{ background: '#080808', padding: '36px 32px', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,169,106,.04)'}
              onMouseLeave={e => e.currentTarget.style.background = '#080808'}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'var(--serif)', fontSize: '48px', fontWeight: 300, color: 'rgba(200,169,106,.06)', lineHeight: 1, userSelect: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)', marginBottom: '20px' }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--white)', marginBottom: '10px', lineHeight: 1.2 }}>{p.titre}</h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(245,245,243,.4)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .2 }}
          style={{ marginTop: '64px', padding: '56px', border: '1px solid rgba(200,169,106,.2)', background: 'linear-gradient(135deg, rgba(139,42,61,.12), transparent 60%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', lineHeight: 1.4, marginBottom: '32px' }}>
            "Les meilleures affaires se concluent autour d'un verre,<br />
            <span style={{ color: 'var(--gold)' }}>dans nos caves à Ambalavao."</span>
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('contact')}
              style={{ padding: '16px 48px', background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
            >Nous rendre visite</button>
            <button onClick={() => navigate('b2b')}
              style={{ padding: '16px 48px', background: 'transparent', border: '1px solid rgba(200,169,106,.35)', color: 'rgba(245,245,243,.7)', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(200,169,106,.35)'; e.target.style.color = 'rgba(245,245,243,.7)' }}
            >Espace B2B</button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
