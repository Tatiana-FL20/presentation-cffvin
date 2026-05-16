import { motion, AnimatePresence } from 'framer-motion'
import { useStore, setState, removeFromCart, cartTotal } from '../hooks/useStore'
import { navigate } from '../hooks/useStore'

export default function Cart() {
  const open = useStore(s=>s.cartOpen)
  const cart = useStore(s=>s.cart)
  const total = cart.reduce((s,i)=>s+i.priceNum*i.qty,0)

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setState({cartOpen:false})} style={{ position:'fixed', inset:0, background:'rgba(34,35,37,.7)', backdropFilter:'blur(8px)', zIndex:600 }}/>}
      </AnimatePresence>

      {/* Drawer */}
      <div className={`cart-drawer ${open?'open':''}`} style={{ position:'fixed', top:0, right:0, bottom:0, width:'420px', background:'#ffffff', borderLeft:'1px solid rgba(221,43,33,.15)', zIndex:700, display:'flex', flexDirection:'column', overflowY:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'32px 32px 24px', borderBottom:'1px solid rgba(34,35,37,.09)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'4px' }}>Mon Panier</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'22px', color:'var(--black)' }}>{cart.length} article{cart.length!==1?'s':''}</div>
          </div>
          <button onClick={()=>setState({cartOpen:false})} style={{ background:'none', border:'1px solid rgba(34,35,37,.14)', color:'rgba(34,35,37,.5)', width:'36px', height:'36px', cursor:'pointer', fontSize:'16px', transition:'border-color .3s' }}
            onMouseEnter={e=>e.target.style.borderColor='var(--gold)'}
            onMouseLeave={e=>e.target.style.borderColor='rgba(34,35,37,.14)'}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px 32px' }}>
          <AnimatePresence>
            {cart.length===0 ? (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ textAlign:'center', padding:'60px 0' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'48px', color:'rgba(221,43,33,.2)', marginBottom:'16px' }}>🍷</div>
                <p style={{ fontFamily:'var(--serif)', fontSize:'16px', fontStyle:'italic', color:'rgba(34,35,37,.3)' }}>Votre panier est vide</p>
              </motion.div>
            ) : (
              cart.map(item=>(
                <motion.div key={item.id} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}
                  style={{ display:'flex', gap:'16px', alignItems:'center', paddingBottom:'20px', marginBottom:'20px', borderBottom:'1px solid rgba(34,35,37,.09)' }}>
                  <div style={{ width:'40px', height:'70px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="28" height="60" viewBox="0 0 28 60" fill="none">
                      <path d="M10 0h8v6c4 1.5 5 4 5 7v38c0 4-3 7-9 7s-9-3-9-7V13c0-3 1-5.5 5-7V0z" fill={item.color||'#dd2b21'}/>
                    </svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'16px', color:'var(--black)', marginBottom:'4px' }}>{item.nom}</div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(34,35,37,.35)', letterSpacing:'.1em' }}>{item.type} · qté {item.qty}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'16px', color:'var(--gold)', marginBottom:'8px' }}>{(item.priceNum*item.qty).toLocaleString()} Ar</div>
                    <button onClick={()=>removeFromCart(item.id)} style={{ background:'none', border:'none', color:'rgba(34,35,37,.25)', cursor:'pointer', fontSize:'11px', letterSpacing:'.1em', fontFamily:'var(--sans)', transition:'color .3s' }}
                      onMouseEnter={e=>e.target.style.color='#FF5555'}
                      onMouseLeave={e=>e.target.style.color='rgba(34,35,37,.25)'}
                    >Retirer</button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length>0 && (
          <div style={{ padding:'24px 32px', borderTop:'1px solid rgba(34,35,37,.09)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
              <span style={{ fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(34,35,37,.4)' }}>Total</span>
              <span style={{ fontFamily:'var(--serif)', fontSize:'24px', color:'var(--gold)' }}>{total.toLocaleString()} Ar</span>
            </div>
            <button onClick={()=>{setState({cartOpen:false});navigate('checkout')}} style={{ width:'100%', padding:'18px', background:'linear-gradient(90deg,var(--bordeaux),var(--gold))', color:'var(--black)', border:'none', fontFamily:'var(--sans)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', cursor:'pointer', transition:'opacity .3s' }}
              onMouseEnter={e=>e.target.style.opacity='.85'}
              onMouseLeave={e=>e.target.style.opacity='1'}
            >Commander · {total.toLocaleString()} Ar</button>
            <p style={{ textAlign:'center', marginTop:'12px', fontFamily:'var(--sans)', fontSize:'10px', color:'rgba(34,35,37,.2)' }}>Livraison gratuite dès 6 bouteilles</p>
          </div>
        )}
      </div>
    </>
  )
}
