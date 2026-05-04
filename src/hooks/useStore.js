import { useState, useEffect } from 'react'

let listeners = []
let _state = { cart:[], cartOpen:false, page:'home', selectedWine:null }

export function getState() { return _state }
export function setState(patch) {
  _state = { ..._state, ...patch }
  listeners.forEach(fn => fn(_state))
}
export function useStore(selector) {
  const [val, setVal] = useState(() => selector(_state))
  useEffect(() => {
    const unsub = (() => {
      const fn = s => setVal(selector(s))
      listeners.push(fn)
      return () => { listeners = listeners.filter(l => l !== fn) }
    })()
    return unsub
  }, [])
  return val
}

export function addToCart(product, qty=1) {
  const existing = _state.cart.find(i => i.id === product.id)
  if (existing) setState({ cart: _state.cart.map(i => i.id===product.id ? {...i, qty:i.qty+qty} : i) })
  else setState({ cart: [..._state.cart, {...product, qty}] })
  setState({ cartOpen: true })
}
export function removeFromCart(id) { setState({ cart: _state.cart.filter(i => i.id!==id) }) }
export function cartTotal() { return _state.cart.reduce((s,i) => s + i.priceNum*i.qty, 0) }
export function navigate(page, wine=null) { setState({ page, selectedWine:wine }); window.scrollTo({top:0, behavior:'smooth'}) }
