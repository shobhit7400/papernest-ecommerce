import { CSSProperties, useState } from 'react'
import { Product } from './types'
import { inr } from './data'
import { useStore } from './store'

const patterns: Record<Product['pattern'], string> = {
  ruled:
    'repeating-linear-gradient(to bottom, transparent 0 15px, rgba(255,255,255,.28) 15px 16px)',
  dot:
    'radial-gradient(rgba(255,255,255,.4) 1.5px, transparent 1.6px) 0 0/16px 16px',
  grid:
    'linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px) 0 0/16px 16px, linear-gradient(90deg,rgba(255,255,255,.22) 1px,transparent 1px) 0 0/16px 16px',
  plain: 'none',
}



export function Cover({
  p,
  className = '',
  style,
}: {
  p: Product
  className?: string
  style?: CSSProperties
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm ${className}`}
      style={{
        backgroundColor: p.color,
        backgroundImage: patterns[p.pattern],
        ...style,
      }}
      role="img"
      aria-label={p.name}
    >
      {!imageError && p.image ? (
        <>
          <img
            src={p.image}
            alt={p.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

          {/* Brand badge */}
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-ink shadow-sm">
            PAPERNEST
          </div>
        </>
      ) : (
        <>
          {/* Fallback only if image cannot load */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />

          <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2 py-1 text-[10px] font-bold text-ink">
            PAPERNEST
          </div>

          <div className="absolute left-5 right-5 top-[38%] rounded-xl bg-paper/95 px-3 py-3 text-center font-display text-sm font-bold leading-tight text-ink shadow-sm">
            {p.name}
          </div>

          <div className="absolute bottom-4 left-5 text-xs font-semibold text-white/90">
           PRODUCT
          </div>
        </>
      )}
    </div>
  )
}

/* =========================
   RATINGS
========================= */

export function Stars({ n }: { n: number }) {
  return (
    <span
      className="text-sm text-soft"
      aria-label={`${n} out of 5`}
    >
      ★ {n.toFixed(1)}
    </span>
  )
}

/* =========================
   PRODUCT CARD
========================= */

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useStore()

  const liked = wishlist.includes(p.id)

  return (
    <article className="group rounded-2xl border border-rule/60 bg-paper p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Product image */}
      <a href={`#/product/${p.id}`} className="block">
        <Cover p={p} />
      </a>

      {/* Product information */}
      <div className="p-2">

        <div className="flex items-start justify-between gap-2">

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-soft">
              {p.category}
            </p>

            <h3 className="mt-1 font-display text-base font-bold leading-snug">
              <a href={`#/product/${p.id}`}>
                {p.name}
              </a>
            </h3>
          </div>

          <button
            onClick={() => toggleWish(p.id)}
            aria-label="Wishlist"
            className="shrink-0 text-xl transition hover:scale-110"
          >
            {liked ? '♥' : '♡'}
          </button>
        </div>

        {/* Rating + stock */}
        <div className="mt-2 flex items-center justify-between">
          <Stars n={p.rating} />

          <span className="text-xs text-soft">
            {p.stock > 0 ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        {/* Price + Add */}
        <div className="mt-3 flex items-end justify-between gap-2">

          <div>
            <span className="font-display text-lg font-bold">
              {inr(p.price)}
            </span>

            <span className="ml-2 text-xs text-soft line-through">
              {inr(p.originalPrice)}
            </span>
          </div>

          <button
            className="btn !rounded-xl !px-3 !py-2 text-sm"
            onClick={() => add(p.id)}
          >
            Add
          </button>

        </div>
      </div>
    </article>
  )
}



export function Header() {
  const { totals, wishlist } = useStore()
  const [open, setOpen] = useState(false)

  const nav = [
    ['Home', '#/'],
    ['Shop', '#/shop'],
    ['About', '#/about'],
    ['Contact', '#/contact'],
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-rule/70 bg-paper/90 backdrop-blur">



    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

  <a
    href="#/"
    className="group flex items-center"
    aria-label="PaperNest Home"
  >
    <img
      src="/papernest-logo.png"
      alt="PaperNest"
      className="logo-entry h-20 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-105"
    />
  </a>

 
        <button
          className="rounded-xl border border-rule px-3 py-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`${
            open ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-full flex-col gap-4 border-b border-rule bg-paper p-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >

          <div className="flex flex-col gap-3 md:flex-row md:gap-6">

            {nav.map(([n, h]) => (
              <a
                key={n}
                className="nav-entry font-display font-semibold hover:text-soft"
                href={h}
                onClick={() => setOpen(false)}
              >
                {n}
              </a>
            ))}

            <a
              className="font-display font-semibold"
              href="#/wishlist"
            >
              Wishlist ({wishlist.length})
            </a>

          </div>

          <a
            className="btn !rounded-xl !px-4 !py-2"
            href="#/cart"
          >
            Cart ({totals.count})
          </a>

        </nav>

      </div>

    </header>
  )
}

/* =========================
   FOOTER
========================= */

export function Footer() {
  return (
    <footer className="mt-20 border-t border-rule bg-ink text-paper">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4">

        <div className="md:col-span-2">

          <p className="font-display text-2xl font-extrabold">
            PaperNest
          </p>

          <p className="mt-3 max-w-md text-sm opacity-80">
            Learn. Create. Explore. A demo stationery and learning store
            built for a small Indian startup.
          </p>

        </div>

        <div>

          <p className="font-display font-bold">
            Quick links
          </p>

          <div className="mt-3 grid gap-2 text-sm opacity-80">

            <a href="#/shop">Shop</a>
            <a href="#/about">About</a>
            <a href="#/contact">Contact</a>
            <a href="#/policies">Policies</a>

          </div>

        </div>

        <div>

          <p className="font-display font-bold">
             Contact
          </p>

          <p className="mt-3 text-sm opacity-80">
            Dehradun, Uttarakhand
            <br />
           papernest1@gmail.com
            <br />
            +91 8004829402
          </p>

          <a
            className="mt-4 inline-block rounded-xl bg-mark px-4 py-2 font-bold text-ink"
            href="https://wa.me/91+8004829402"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us
          </a>

        </div>

      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs opacity-60">
       www.papernest@gmail.com
      </div>

    </footer>
  )
}

/* =========================
   TOAST
========================= */

export function Toast() {
  const { toast } = useStore()

  if (!toast) return null

  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink px-5 py-3 font-semibold text-paper shadow-lg"
    >
      {toast}
    </div>
  )
}

/* =========================
   ORDER SUMMARY
========================= */

export function Summary() {
  const { totals, coupon } = useStore()

  return (
    <div className="rounded-2xl border border-rule bg-paper p-5 shadow-sm">

      <div className="flex justify-between py-1">
        <span>Subtotal</span>
        <span>{inr(totals.subtotal)}</span>
      </div>

      {coupon && (
        <div className="flex justify-between py-1">
          <span>Coupon</span>
          <span>-{inr(totals.discount)}</span>
        </div>
      )}

      <div className="flex justify-between py-1">
        <span>Delivery</span>
        <span>
          {totals.shipping
            ? inr(totals.shipping)
            : 'Free'}
        </span>
      </div>

      <div className="mt-3 flex justify-between border-t border-rule pt-3 font-display text-xl font-bold">
        <span>Total</span>
        <span>{inr(totals.total)}</span>
      </div>

    </div>
  )
}
