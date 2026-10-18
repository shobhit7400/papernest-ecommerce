export type Category = 'Books' | 'Notebooks' | 'Pens' | 'Pencils' | 'School Supplies' | 'Art & Craft' | 'Office Supplies'
export type Pattern = 'ruled' | 'dot' | 'grid' | 'plain'
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  originalPrice: number
  discount: number
  color: string
  pattern: Pattern
  desc: string
  rating: number
  reviewCount: number
  stock: number
  image: string
  featured?: boolean
  bestSeller?: boolean
  newArrival?: boolean
  specs: { label: string; value: string }[]
}

export interface CartLine { id: string; qty: number }
export interface Customer { name: string; phone: string; email: string; address: string; city: string; state: string; pincode: string }
export interface OrderItem { id: string; name: string; qty: number; price: number }
export interface Order {
  id: string
  date: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  customer: Customer
  payment: string
  status: OrderStatus
}
