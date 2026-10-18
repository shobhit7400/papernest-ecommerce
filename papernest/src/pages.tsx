import { FormEvent, useMemo, useState } from 'react'
import { Cover, ProductCard, Stars, Summary } from './components'
import {
  CATEGORIES,
  DEMO_BUSINESS,
  byId,
  inr,
  products,
  reviews,
} from './data'
import { useStore } from './store'
import { supabase } from './supabase'
import type {
  Category,
  Customer,
  OrderStatus,
  Product,
} from './types'

/* =========================================================
   HOME
========================================================= */

export function Home() {
  const featured = products.filter(p => p.featured).slice(0, 4)
  const best = products.filter(p => p.bestSeller).slice(0, 4)

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-soft">
            Learn · Create · Explore
          </p>

          <h1 className="font-display text-5xl font-extrabold leading-tight md:text-6xl">
            Stationery made for
            <span className="text-mark"> everyday ideas.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-soft">
            Books, notebooks, writing essentials, school supplies and
            creative products — all in one simple PaperNest experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn" href="#/shop">
              Shop collection
            </a>

            <a
              className="rounded-xl border border-rule px-5 py-3 font-bold"
              href="#/about"
            >
              About PaperNest
            </a>
          </div>

          <p className="mt-5 text-sm text-soft">
            {DEMO_BUSINESS.delivery}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featured.slice(0, 4).map(p => (
            <a key={p.id} href={`#/product/${p.id}`}>
              <Cover
                p={p}
                className="transition duration-300 hover:-translate-y-1"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-rule bg-paper">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold">
              Student friendly
            </p>
            <p className="mt-1 text-sm text-soft">
              Useful stationery for school, college and everyday learning.
            </p>
          </div>

          <div>
            <p className="font-display text-xl font-bold">
              Simple pricing
            </p>
            <p className="mt-1 text-sm text-soft">
              Clear INR pricing with free demo delivery above ₹499.
            </p>
          </div>

          <div>
            <p className="font-display text-xl font-bold">
              Curated essentials
            </p>
            <p className="mt-1 text-sm text-soft">
              Notebooks, pens, art supplies and practical desk products.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-soft">
              Popular
            </p>

            <h2 className="mt-2 font-display text-3xl font-extrabold">
              Best sellers
            </h2>
          </div>

          <a href="#/shop" className="font-bold">
            View all →
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {best.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-3xl border border-rule bg-paper p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-wider text-soft">
            Categories
          </p>

          <h2 className="mt-2 font-display text-3xl font-extrabold">
            Find what you need
          </h2>

          <div className="mt-7 flex flex-wrap gap-3">
            {CATEGORIES.map(c => (
              <a
                key={c}
                href={`#/shop?category=${encodeURIComponent(c)}`}
                className="rounded-full border border-rule px-4 py-2 font-semibold transition hover:bg-ink hover:text-paper"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="font-display text-3xl font-extrabold">
          What customers say
        </h2>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl border border-rule bg-paper p-6"
            >
              <Stars n={r.rating} />

              <p className="mt-4 leading-7">
                “{r.text}”
              </p>

              <p className="mt-4 font-bold">
                {r.name}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

/* =========================================================
   SHOP
========================================================= */

export function Shop({ query = '' }: { query?: string }) {
  const { adminProducts } = useStore()

  const params = new URLSearchParams(query)

  const initialCategory =
    (params.get('category') as Category | null) || ''

  const [category, setCategory] = useState<Category | ''>(
    initialCategory
  )

  const [search, setSearch] = useState('')

  const visible = useMemo(() => {
    return adminProducts.filter(p => {
      const categoryOk =
        !category || p.category === category

      const searchOk =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase())

      return categoryOk && searchOk
    })
  }, [adminProducts, category, search])

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-soft">
          PaperNest collection
        </p>

        <h1 className="mt-2 font-display text-4xl font-extrabold">
          Shop
        </h1>

        <p className="mt-3 text-soft">
          Browse stationery, books and everyday learning essentials.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          className="rounded-xl border border-rule bg-paper px-4 py-3 outline-none"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="rounded-xl border border-rule bg-paper px-4 py-3"
          value={category}
          onChange={e =>
            setCategory(e.target.value as Category | '')
          }
        >
          <option value="">All categories</option>

          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-5 text-sm text-soft">
        {visible.length} products found
      </p>

      {visible.length ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-rule bg-paper p-8 text-center">
          No products found.
        </div>
      )}
    </section>
  )
}

/* =========================================================
   PRODUCT DETAILS
========================================================= */

export function ProductPage({ id }: { id: string }) {
  const {
    adminProducts,
    add,
    toggleWish,
    wishlist,
  } = useStore()

  const p =
    adminProducts.find(x => x.id === id) || byId(id)

  if (!p) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">
          Product not found
        </h1>

        <a href="#/shop" className="btn mt-6">
          Back to shop
        </a>
      </section>
    )
  }

  const liked = wishlist.includes(p.id)

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-md">
          <Cover p={p} />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-soft">
            {p.category}
          </p>

          <h1 className="mt-2 font-display text-4xl font-extrabold">
            {p.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <Stars n={p.rating} />

            <span className="text-sm text-soft">
              {p.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6">
            <span className="font-display text-3xl font-extrabold">
              {inr(p.price)}
            </span>

            <span className="ml-3 text-soft line-through">
              {inr(p.originalPrice)}
            </span>

            <span className="ml-3 rounded-full bg-mark px-3 py-1 text-sm font-bold text-ink">
              {p.discount}% off
            </span>
          </div>

          <p className="mt-6 max-w-xl leading-8 text-soft">
            {p.desc}
          </p>

          <p className="mt-4 font-semibold">
            {p.stock > 0
              ? `${p.stock} in stock`
              : 'Currently out of stock'}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="btn"
              onClick={() => add(p.id)}
              disabled={!p.stock}
            >
              Add to cart
            </button>

            <button
              className="rounded-xl border border-rule px-5 py-3 font-bold"
              onClick={() => toggleWish(p.id)}
            >
              {liked ? '♥ Wishlisted' : '♡ Add to wishlist'}
            </button>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">
              Product details
            </h2>

            <div className="mt-4 divide-y divide-rule rounded-2xl border border-rule">
              {p.specs.map(s => (
                <div
                  key={s.label}
                  className="flex justify-between gap-5 p-4"
                >
                  <span className="text-soft">
                    {s.label}
                  </span>

                  <span className="font-semibold">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   WISHLIST
========================================================= */

export function Wishlist() {
  const { wishlist, adminProducts } = useStore()

  const items = adminProducts.filter(p =>
    wishlist.includes(p.id)
  )

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold">
        Wishlist
      </h1>

      {!items.length ? (
        <div className="mt-10 rounded-2xl border border-rule bg-paper p-10 text-center">
          <p className="text-lg font-semibold">
            Your wishlist is empty.
          </p>

          <a href="#/shop" className="btn mt-5">
            Explore products
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  )
}

/* =========================================================
   CART
========================================================= */

export function Cart() {
  const {
    cart,
    adminProducts,
    setQty,
    remove,
    applyCoupon,
  } = useStore()

  const [code, setCode] = useState('')

  const getProduct = (id: string) =>
    adminProducts.find(p => p.id === id) || byId(id)

  if (!cart.length) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-soft">
          Add something you like from the PaperNest collection.
        </p>

        <a href="#/shop" className="btn mt-6">
          Shop now
        </a>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map(line => {
            const p = getProduct(line.id)

            if (!p) return null

            return (
              <article
                key={line.id}
                className="grid grid-cols-[90px_1fr] gap-4 rounded-2xl border border-rule bg-paper p-4 sm:grid-cols-[110px_1fr]"
              >
                <Cover
                  p={p}
                  className="!rounded-xl"
                />

                <div>
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase text-soft">
                        {p.category}
                      </p>

                      <a
                        href={`#/product/${p.id}`}
                        className="font-display text-lg font-bold"
                      >
                        {p.name}
                      </a>
                    </div>

                    <button
                      onClick={() => remove(p.id)}
                      className="text-sm font-semibold text-soft"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-2 font-bold">
                    {inr(p.price)}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      className="h-9 w-9 rounded-lg border border-rule"
                      onClick={() =>
                        setQty(p.id, line.qty - 1)
                      }
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-bold">
                      {line.qty}
                    </span>

                    <button
                      className="h-9 w-9 rounded-lg border border-rule"
                      onClick={() =>
                        setQty(p.id, line.qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div>
          <Summary />

          <div className="mt-4 rounded-2xl border border-rule bg-paper p-5">
            <p className="font-display font-bold">
              Have a coupon?
            </p>

            <div className="mt-3 flex gap-2">
              <input
                className="min-w-0 flex-1 rounded-xl border border-rule px-3 py-2"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Coupon code"
              />

              <button
                className="rounded-xl border border-rule px-4 font-bold"
                onClick={() => applyCoupon(code)}
              >
                Apply
              </button>
            </div>

            <p className="mt-2 text-xs text-soft">
              Demo coupon: NEST10
            </p>
          </div>

          <a
            href="#/checkout"
            className="btn mt-4 block text-center"
          >
            Proceed to checkout
          </a>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   CHECKOUT + SUPABASE
========================================================= */

type RazorpayResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

type RazorpayInstance = {
  open: () => void
  on: (event: string, callback: (response: unknown) => void) => void
}

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )
    const getRazorpay = () =>
      (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay

    if (getRazorpay()) return resolve()
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Razorpay failed to load')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay failed to load'))
    document.body.appendChild(script)
  })
}

export function Checkout() {
  const store = useStore()
  const { cart, placeOrder, totals, remove } = store
  const coupon = (store as typeof store & { coupon?: string }).coupon

  const [f, setF] = useState<Customer>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Uttarakhand',
    pincode: '',
  })
  const [payment, setPayment] = useState('Cash on Delivery')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (key: keyof Customer, value: string) => {
    setF(prev => ({ ...prev, [key]: value }))
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErr('')

    if (
      f.name.trim().length < 2 ||
      !/^[0-9+\s-]{8,16}$/.test(f.phone) ||
      f.address.trim().length < 8 ||
      f.city.trim().length < 2 ||
      f.state.trim().length < 2 ||
      !/^[0-9]{6}$/.test(f.pincode)
    ) {
      setErr('Please enter valid delivery details, including a 6-digit pincode.')
      return
    }

    setBusy(true)

    try {
      if (payment === 'Cash on Delivery') {
        const order = await placeOrder(f, payment)
        if (!order) throw new Error('Order could not be placed')
        window.location.hash = `#/orders?new=${encodeURIComponent(order.id)}`
        return
      }

      await loadRazorpayScript()

      const { data: created, error: createError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            items: cart.map(item => ({ id: item.id, qty: item.qty })),
            coupon: coupon || '',
            customer: f,
          },
        }
      )

      if (createError || !created?.razorpay_order_id || !created?.key_id) {
        throw new Error(created?.error || createError?.message || 'Could not start payment')
      }

      const Razorpay = (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay
      if (!Razorpay) throw new Error('Payment window unavailable')

      // The amount and order ID come from the backend, not the browser cart total.
      const checkout = new Razorpay({
        key: created.key_id,
        amount: created.amount,
        currency: created.currency,
        order_id: created.razorpay_order_id,
        name: 'PaperNest',
        description: 'PaperNest test checkout',
        prefill: {
          name: f.name,
          email: f.email || '',
          contact: f.phone,
        },
        theme: { color: '#466B8A' },
        modal: {
          ondismiss: () => setBusy(false),
        },
        handler: async (result: RazorpayResponse) => {
          try {
            const { data: verified, error: verifyError } =
              await supabase.functions.invoke('verify-razorpay-payment', {
                body: {
                  razorpay_order_id: result.razorpay_order_id,
                  razorpay_payment_id: result.razorpay_payment_id,
                  razorpay_signature: result.razorpay_signature,
                },
              })

            if (verifyError || !verified?.verified || !verified?.order?.order_id) {
              throw new Error(
                verified?.error || verifyError?.message || 'Payment confirmation is pending'
              )
            }

            const orderRef = verified.order.order_number || verified.order.order_id
            // Do not call placeOrder here: the verified backend already saved this order.
            cart.forEach(item => remove(item.id))
            window.location.hash = `#/orders?new=${encodeURIComponent(orderRef)}`
          } catch (verificationError) {
            console.error('Payment verification error:', verificationError)
            setErr(
              'Payment may have succeeded, but order confirmation failed. Do not pay again. Contact support with your Razorpay payment ID: ' +
              result.razorpay_payment_id
            )
          } finally {
            setBusy(false)
          }
        },
      })

      checkout.on('payment.failed', () => {
        setErr('Test payment failed. No order was confirmed. Please try again.')
        setBusy(false)
      })

      checkout.open()
    } catch (error) {
      console.error('Checkout error:', error)
      setErr(error instanceof Error ? error.message : 'Unable to start checkout.')
      setBusy(false)
    }
  }

  if (!cart.length) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">Your cart is empty</h1>
        <a href="#/shop" className="btn mt-6">Continue shopping</a>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold">Checkout</h1>
      <p className="mt-2 text-soft">Enter your delivery details to place your order.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-2xl font-bold">Delivery details</h2>
          {err && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Full name</span>
              <input className="rounded-xl border border-rule px-4 py-3" value={f.name} onChange={e => update('name', e.target.value)} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Phone</span>
              <input type="tel" className="rounded-xl border border-rule px-4 py-3" value={f.phone} onChange={e => update('phone', e.target.value)} required />
            </label>
          </div>
          <label className="mt-4 grid gap-2">
            <span className="text-sm font-semibold">Email (optional)</span>
            <input type="email" className="rounded-xl border border-rule px-4 py-3" value={f.email} onChange={e => update('email', e.target.value)} />
          </label>
          <label className="mt-4 grid gap-2">
            <span className="text-sm font-semibold">Delivery address</span>
            <textarea className="min-h-28 rounded-xl border border-rule px-4 py-3" value={f.address} onChange={e => update('address', e.target.value)} required />
          </label>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">City</span>
              <input className="rounded-xl border border-rule px-4 py-3" value={f.city} onChange={e => update('city', e.target.value)} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">State</span>
              <input className="rounded-xl border border-rule px-4 py-3" value={f.state} onChange={e => update('state', e.target.value)} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Pincode</span>
              <input inputMode="numeric" maxLength={6} className="rounded-xl border border-rule px-4 py-3" value={f.pincode} onChange={e => update('pincode', e.target.value)} required />
            </label>
          </div>
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold">Payment method</h2>
            <div className="mt-4 grid gap-3">
              {['Cash on Delivery', 'Razorpay (Test Mode)'].map(method => (
                <label key={method} className="flex cursor-pointer items-center gap-3 rounded-xl border border-rule p-4">
                  <input type="radio" name="payment" value={method} checked={payment === method} onChange={e => setPayment(e.target.value)} disabled={busy} />
                  <span className="font-semibold">{method}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-soft">
              Razorpay Test Mode uses simulated payments only. The final amount is calculated by the server.
            </p>
          </div>
          <button type="submit" disabled={busy} className="btn mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60">
            {busy
              ? 'Processing...'
              : payment === 'Cash on Delivery'
                ? `Place order · ${inr(totals.total)}`
                : `Pay securely (Test) · ${inr(totals.total)}`}
          </button>
        </form>
        <div>
          <Summary />
          <div className="mt-4 rounded-2xl border border-rule bg-paper p-5 text-sm text-soft">
            Cash on Delivery places a normal order. Razorpay Test Mode confirms the order only after server-side payment verification.
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   ORDERS
========================================================= */

export function Orders({ query = '' }: { query?: string }) {
  const { orders } = useStore()

  const params = new URLSearchParams(query)
  const newId = params.get('new')

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold">
        Orders
      </h1>

      {newId && (
        <div className="mt-6 rounded-2xl border border-rule bg-paper p-6">
          <p className="font-display text-xl font-bold">
            ✓ Order placed successfully
          </p>

          <p className="mt-2 text-soft">
            Order number: {newId}
          </p>
        </div>
      )}

      {!orders.length ? (
        <div className="mt-8 rounded-2xl border border-rule bg-paper p-8 text-center">
          <p>No orders in this browser yet.</p>

          <a href="#/shop" className="btn mt-5">
            Start shopping
          </a>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map(o => (
            <article
              key={o.id}
              className="rounded-2xl border border-rule bg-paper p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold">
                    {o.id}
                  </p>

                  <p className="mt-1 text-sm text-soft">
                    {new Date(o.date).toLocaleString('en-IN')}
                  </p>
                </div>

                <span className="rounded-full border border-rule px-3 py-1 text-sm font-bold">
                  {o.status}
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {o.items.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>

                    <span>
                      {inr(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between border-t border-rule pt-4 font-display text-lg font-bold">
                <span>Total</span>
                <span>{inr(o.total)}</span>
              </div>

              <p className="mt-3 text-sm text-soft">
                Payment: {o.payment}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

/* =========================================================
   ABOUT
========================================================= */

export function About() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-sm font-bold uppercase tracking-wider text-soft">
        About us
      </p>

      <h1 className="mt-2 font-display text-5xl font-extrabold">
        {DEMO_BUSINESS.name}
      </h1>

      <p className="mt-3 font-display text-xl font-bold text-mark">
        {DEMO_BUSINESS.tagline}
      </p>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-soft">
        {DEMO_BUSINESS.description}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Learn
          </h2>

          <p className="mt-2 text-sm leading-6 text-soft">
            Practical products for students, readers and
            everyday learners.
          </p>
        </div>

        <div className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Create
          </h2>

          <p className="mt-2 text-sm leading-6 text-soft">
            Art, craft and stationery products for ideas,
            projects and creativity.
          </p>
        </div>

        <div className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Explore
          </h2>

          <p className="mt-2 text-sm leading-6 text-soft">
            A clean shopping experience designed around useful
            everyday essentials.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-rule bg-paper p-6">
        <p className="font-bold">Demo project notice</p>

        <p className="mt-2 text-sm leading-6 text-soft">
          PaperNest is currently a demonstration e-commerce
          project. Business information, policies and payment
          features should be reviewed before production use.
        </p>
      </div>
    </section>
  )
}

/* =========================================================
   CONTACT
========================================================= */

export function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-4xl font-extrabold">
        Contact PaperNest
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Contact details
          </h2>

          <div className="mt-5 space-y-3 text-soft">
            <p>{DEMO_BUSINESS.location}</p>
            <p>{DEMO_BUSINESS.email}</p>
            <p>{DEMO_BUSINESS.phone}</p>
          </div>

          <p className="mt-6 text-sm text-soft">
            Demo contact information. Verify details before
            using this website commercially.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-rule bg-paper p-6"
        >
          <h2 className="font-display text-xl font-bold">
            Send a message
          </h2>

          {sent && (
            <div className="mt-4 rounded-xl border border-rule p-3 text-sm">
              Demo message submitted.
            </div>
          )}

          <input
            required
            placeholder="Your name"
            className="mt-5 w-full rounded-xl border border-rule px-4 py-3"
          />

          <input
            required
            type="email"
            placeholder="Email"
            className="mt-3 w-full rounded-xl border border-rule px-4 py-3"
          />

          <textarea
            required
            placeholder="Message"
            className="mt-3 min-h-32 w-full rounded-xl border border-rule px-4 py-3"
          />

          <button className="btn mt-4" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}

/* =========================================================
   POLICIES
========================================================= */

export function Policies() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-4xl font-extrabold">
        Store policies
      </h1>

      <p className="mt-3 text-soft">
        Demo policies for the PaperNest portfolio project.
      </p>

      <div className="mt-8 space-y-5">
        <article className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Shipping
          </h2>

          <p className="mt-3 leading-7 text-soft">
            {DEMO_BUSINESS.delivery}. Delivery estimates are
            placeholders for this demo website.
          </p>
        </article>

        <article className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Returns
          </h2>

          <p className="mt-3 leading-7 text-soft">
            The current return and refund information is for
            demonstration purposes and should be replaced with
            final business terms before launch.
          </p>
        </article>

        <article className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Payments
          </h2>

          <p className="mt-3 leading-7 text-soft">
            Cash on Delivery is displayed as an order option.
            UPI and Card options are demo interfaces and do not
            process real online payments.
          </p>
        </article>

        <article className="rounded-2xl border border-rule bg-paper p-6">
          <h2 className="font-display text-xl font-bold">
            Privacy
          </h2>

          <p className="mt-3 leading-7 text-soft">
            Checkout information is used for the demonstration
            order flow. A production store should publish a
            complete privacy policy and data-retention policy.
          </p>
        </article>
      </div>
    </section>
  )
}

/* =========================================================
   ADMIN
========================================================= */

export function Admin() {
  const {
    adminProducts,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  } = useStore()

  const [editing, setEditing] =
    useState<Product | null>(null)

  const [showForm, setShowForm] = useState(false)

  const blankProduct = (): Product => ({
    id: `custom-${Date.now()}`,
    name: '',
    category: 'Books',
    price: 0,
    originalPrice: 0,
    discount: 0,
    color: '#466B8A',
    pattern: 'plain',
    desc: '',
    rating: 5,
    reviewCount: 0,
    stock: 1,
    image: '',
    specs: [],
  })

  const startAdd = () => {
    setEditing(blankProduct())
    setShowForm(true)
  }

  const startEdit = (p: Product) => {
    setEditing({ ...p })
    setShowForm(true)
  }

  const saveProduct = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!editing) return

    const exists = adminProducts.some(
      p => p.id === editing.id
    )

    if (exists) {
      updateProduct(editing)
    } else {
      addProduct(editing)
    }

    setEditing(null)
    setShowForm(false)
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-soft">
            Demo dashboard
          </p>

          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Admin
          </h1>
        </div>

        <button
          className="btn"
          onClick={startAdd}
        >
          Add product
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-rule bg-paper p-5">
          <p className="text-sm text-soft">
            Products
          </p>

          <p className="mt-1 font-display text-3xl font-bold">
            {adminProducts.length}
          </p>
        </div>

        <div className="rounded-2xl border border-rule bg-paper p-5">
          <p className="text-sm text-soft">
            Local orders
          </p>

          <p className="mt-1 font-display text-3xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="rounded-2xl border border-rule bg-paper p-5">
          <p className="text-sm text-soft">
            Pending
          </p>

          <p className="mt-1 font-display text-3xl font-bold">
            {orders.filter(o => o.status === 'Pending').length}
          </p>
        </div>

        <div className="rounded-2xl border border-rule bg-paper p-5">
          <p className="text-sm text-soft">
            Delivered
          </p>

          <p className="mt-1 font-display text-3xl font-bold">
            {orders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
      </div>

      {showForm && editing && (
        <form
          onSubmit={saveProduct}
          className="mt-8 rounded-2xl border border-rule bg-paper p-6"
        >
          <div className="flex justify-between gap-4">
            <h2 className="font-display text-2xl font-bold">
              Product editor
            </h2>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditing(null)
              }}
            >
              Close
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              required
              className="rounded-xl border border-rule px-4 py-3"
              placeholder="Product name"
              value={editing.name}
              onChange={e =>
                setEditing({
                  ...editing,
                  name: e.target.value,
                })
              }
            />

            <select
              className="rounded-xl border border-rule px-4 py-3"
              value={editing.category}
              onChange={e =>
                setEditing({
                  ...editing,
                  category: e.target.value as Category,
                })
              }
            >
              {CATEGORIES.map(c => (
                <option key={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="rounded-xl border border-rule px-4 py-3"
              placeholder="Price"
              value={editing.price}
              onChange={e =>
                setEditing({
                  ...editing,
                  price: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              className="rounded-xl border border-rule px-4 py-3"
              placeholder="Original price"
              value={editing.originalPrice}
              onChange={e =>
                setEditing({
                  ...editing,
                  originalPrice: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              className="rounded-xl border border-rule px-4 py-3"
              placeholder="Stock"
              value={editing.stock}
              onChange={e =>
                setEditing({
                  ...editing,
                  stock: Number(e.target.value),
                })
              }
            />

            <input
              className="rounded-xl border border-rule px-4 py-3"
              placeholder="Image path"
              value={editing.image}
              onChange={e =>
                setEditing({
                  ...editing,
                  image: e.target.value,
                })
              }
            />
          </div>

          <textarea
            className="mt-4 min-h-28 w-full rounded-xl border border-rule px-4 py-3"
            placeholder="Description"
            value={editing.desc}
            onChange={e =>
              setEditing({
                ...editing,
                desc: e.target.value,
              })
            }
          />

          <button className="btn mt-4">
            Save product
          </button>
        </form>
      )}

      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold">
          Products
        </h2>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-rule bg-paper">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-rule">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {adminProducts.map(p => (
                <tr
                  key={p.id}
                  className="border-b border-rule/60"
                >
                  <td className="p-4 font-semibold">
                    {p.name}
                  </td>

                  <td className="p-4">
                    {p.category}
                  </td>

                  <td className="p-4">
                    {inr(p.price)}
                  </td>

                  <td className="p-4">
                    {p.stock}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-lg border border-rule px-3 py-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="rounded-lg border border-rule px-3 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold">
          Orders
        </h2>

        <p className="mt-2 text-sm text-soft">
          These are orders available in this browser's local
          state. Database-wide admin order loading will require
          protected admin access.
        </p>

        {!orders.length ? (
          <div className="mt-5 rounded-2xl border border-rule bg-paper p-6">
            No local orders yet.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {orders.map(o => (
              <article
                key={o.id}
                className="rounded-2xl border border-rule bg-paper p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-bold">
                      {o.id}
                    </p>

                    <p className="text-sm text-soft">
                      {o.customer.name} · {inr(o.total)}
                    </p>
                  </div>

                  <select
                    className="rounded-xl border border-rule px-3 py-2"
                    value={o.status}
                    onChange={e =>
                      updateOrderStatus(
                        o.id,
                        e.target.value as OrderStatus
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}