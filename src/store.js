import { create } from 'zustand'

// simple zustand-like without zustand – using React context instead
let listeners = []
let state = {
  cart: [],
  cartOpen: false,
  page: 'home', // home | product | wineclub | b2b | checkout
  selectedProduct: null,
}

export function getState() { return state }
export function setState(patch) {
  state = { ...state, ...patch }
  listeners.forEach(fn => fn(state))
}
export function subscribe(fn) {
  listeners.push(fn)
  return () => { listeners = listeners.filter(l => l !== fn) }
}

export function addToCart(product, qty = 1) {
  const existing = state.cart.find(i => i.id === product.id)
  if (existing) {
    setState({ cart: state.cart.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) })
  } else {
    setState({ cart: [...state.cart, { ...product, qty }] })
  }
  setState({ cartOpen: true })
}

export function removeFromCart(id) {
  setState({ cart: state.cart.filter(i => i.id !== id) })
}

export function cartTotal() {
  return state.cart.reduce((sum, i) => sum + i.priceNum * i.qty, 0)
}
