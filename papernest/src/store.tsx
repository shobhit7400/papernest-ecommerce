import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CartLine, Customer, Order, OrderStatus, Product } from './types'
import { byId, products } from './data'
import { supabase } from "./supabase";

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export interface Totals {
  subtotal: number
  discount: number
  shipping: number
  total: number
  count: number
}

interface Store {
  cart: CartLine[]
  wishlist: string[]
  orders: Order[]
  adminProducts: Product[]
  coupon: string
  toast: string

  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  toggleWish: (id: string) => void
  applyCoupon: (code: string) => boolean
  totals: Totals

  placeOrder: (
    customer: Customer,
    payment: string
  ) => Promise<Order | null>

  addProduct: (p: Product) => void
  updateProduct: (p: Product) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

const Ctx = createContext<Store>(null as unknown as Store)

export const useStore = () => useContext(Ctx)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() =>
    load('pn_cart', [])
  )

  const [wishlist, setWishlist] = useState<string[]>(() =>
    load('pn_wish', [])
  )

  const [orders, setOrders] = useState<Order[]>(() =>
    load('pn_orders', [])
  )

  const [adminProducts, setAdminProducts] = useState<Product[]>(() =>
    load('pn_products', products)
  )

  const [coupon, setCoupon] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => save('pn_cart', cart), [cart])
  useEffect(() => save('pn_wish', wishlist), [wishlist])
  useEffect(() => save('pn_orders', orders), [orders])
  useEffect(() => save('pn_products', adminProducts), [adminProducts])

  const say = (m: string) => {
    setToast(m)
    window.setTimeout(() => setToast(''), 2200)
  }

  const get = (id: string) =>
    adminProducts.find(p => p.id === id) || byId(id)

  const add = (id: string, qty = 1) => {
    const stock = get(id)?.stock ?? 0

    if (!stock) {
      say('Out of stock')
      return
    }

    setCart(c => {
      const ex = c.find(x => x.id === id)

      return ex
        ? c.map(x =>
            x.id === id
              ? { ...x, qty: Math.min(stock, x.qty + qty) }
              : x
          )
        : [...c, { id, qty: Math.min(stock, qty) }]
    })

    say('Added to cart')
  }

  const setQty = (id: string, qty: number) => {
    const stock = get(id)?.stock ?? 1

    setCart(c =>
      c.map(x =>
        x.id === id
          ? { ...x, qty: Math.max(1, Math.min(stock, qty)) }
          : x
      )
    )
  }

  const remove = (id: string) =>
    setCart(c => c.filter(x => x.id !== id))

  const toggleWish = (id: string) =>
    setWishlist(w =>
      w.includes(id)
        ? w.filter(x => x !== id)
        : [...w, id]
    )

  const applyCoupon = (code: string) => {
    const ok = code.trim().toUpperCase() === 'NEST10'

    setCoupon(ok ? 'NEST10' : '')

    say(
      ok
        ? '10% demo coupon applied'
        : 'Try coupon NEST10'
    )

    return ok
  }

  const subtotal = cart.reduce(
    (s, x) => s + (get(x.id)?.price ?? 0) * x.qty,
    0
  )

  const discount =
    coupon === 'NEST10'
      ? Math.round(subtotal * 0.1)
      : 0

  const shipping =
    subtotal === 0 || subtotal >= 499
      ? 0
      : 49

  const totals = {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    count: cart.reduce((s, x) => s + x.qty, 0),
  }

  // ==========================
  // SUPABASE ORDER CREATION
  // ==========================

  const placeOrder = async (
    customer: Customer,
    payment: string
  ): Promise<Order | null> => {
    try {
      if (!cart.length) {
        say('Your cart is empty')
        return null
      }

      const orderNumber =
        'PN-' + Date.now().toString().slice(-8)

      const orderItems = cart.map(x => {
        const p = get(x.id)

        if (!p) {
          throw new Error('Product not found')
        }

        return {
          id: p.id,
          name: p.name,
          qty: x.qty,
          price: p.price,
        }
      })

      const { data, error } = await supabase.rpc(
        'create_papernest_order',
        {
          p_order_number: orderNumber,

          p_customer_name: customer.name,
          p_customer_phone: customer.phone,
          p_customer_email: customer.email || '',

          p_customer_address: customer.address,
          p_customer_city: customer.city,
          p_customer_state: customer.state,
          p_customer_pincode: customer.pincode,

          p_subtotal: subtotal,
          p_shipping: shipping,
          p_total: totals.total,

          p_payment_method: payment,

          p_items: orderItems.map(item => ({
            product_id: item.id,
            product_name: item.name,
            quantity: item.qty,
            price: item.price,
          })),
        }
      )

      if (error) {
        console.error('Supabase order error:', error)

        say('Order failed. Please try again.')

        return null
      }

      const result = data as {
        id: string
        order_number: string
        created_at: string
      } | null

      if (!result) {
        say('Order failed. Please try again.')
        return null
      }

      const order: Order = {
        id: result.order_number,
        date: result.created_at,

        items: orderItems,

        subtotal,
        shipping,
        total: totals.total,

        customer,
        payment,

        status: 'Pending',
      }

      // Keep local copy for current customer/browser
      setOrders(v => [order, ...v])

      // Clear cart only after Supabase succeeds
      setCart([])
      setCoupon('')

      say('Order placed successfully!')

      return order
    } catch (error) {
      console.error('Order creation error:', error)

      say('Order failed. Please try again.')

      return null
    }
  }

  const addProduct = (p: Product) =>
    setAdminProducts(v => [p, ...v])

  const updateProduct = (p: Product) =>
    setAdminProducts(v =>
      v.map(x => x.id === p.id ? p : x)
    )

  const deleteProduct = (id: string) =>
    setAdminProducts(v =>
      v.filter(x => x.id !== id)
    )

  const updateOrderStatus = (
    id: string,
    status: OrderStatus
  ) =>
    setOrders(v =>
      v.map(o =>
        o.id === id
          ? { ...o, status }
          : o
      )
    )

  return (
    <Ctx.Provider
      value={{
        cart,
        wishlist,
        orders,
        adminProducts,
        coupon,
        toast,
        add,
        setQty,
        remove,
        toggleWish,
        applyCoupon,
        totals,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}