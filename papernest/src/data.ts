import { Category, Product } from './types'

export const CATEGORIES: Category[] = [
  'Books',
  'Notebooks',
  'Pens',
  'Pencils',
  'School Supplies',
  'Art & Craft',
  'Office Supplies',
]

// All product images are inside: public/images/
const img = (file: string) =>
  `/${encodeURIComponent(file)}`

export const products: Product[] = [
  // =========================
  // BOOKS
  // =========================

  {
    id: 'b1',
    name: 'The Study Companion',
    category: 'Books',
    price: 399,
    originalPrice: 499,
    discount: 20,
    color: '#466B8A',
    pattern: 'plain',
    desc: 'A practical study and revision companion for students, with planning pages, quick-reference notes and reflection prompts.',
    rating: 4.8,
    reviewCount: 124,
    stock: 22,
    image: img('notebook.jpg'),
    bestSeller: true,
    featured: true,
    specs: [
      { label: 'Format', value: 'Paperback' },
      { label: 'Pages', value: '224' },
      { label: 'Language', value: 'English' },
    ],
  },

  {
    id: 'b2',
    name: 'Everyday Creativity',
    category: 'Books',
    price: 349,
    originalPrice: 399,
    discount: 13,
    color: '#6D8B74',
    pattern: 'plain',
    desc: 'A friendly creative workbook filled with prompts for sketching, journaling and small daily projects.',
    rating: 4.6,
    reviewCount: 76,
    stock: 15,
    image: img('sketch book.jpg'),
    newArrival: true,
    specs: [
      { label: 'Format', value: 'Paperback' },
      { label: 'Pages', value: '192' },
      { label: 'Level', value: 'Beginner' },
    ],
  },

  {
    id: 'b3',
    name: 'Little Learners Activity Book',
    category: 'Books',
    price: 249,
    originalPrice: 299,
    discount: 17,
    color: '#C98762',
    pattern: 'dot',
    desc: 'Fun activity pages designed for practice, puzzles and creative learning.',
    rating: 4.7,
    reviewCount: 91,
    stock: 30,
    image: img('aestthitic.jpg'),
    featured: true,
    specs: [
      { label: 'Pages', value: '128' },
      { label: 'Format', value: 'Paperback' },
      { label: 'Age', value: '6+' },
    ],
  },

  // =========================
  // NOTEBOOKS
  // =========================

  {
    id: 'n1',
    name: 'Classic A5 Ruled Notebook',
    category: 'Notebooks',
    price: 199,
    originalPrice: 249,
    discount: 20,
    color: '#365C7D',
    pattern: 'ruled',
    desc: 'A5 notebook with smooth 80 GSM paper and a durable soft cover for everyday notes.',
    rating: 4.8,
    reviewCount: 210,
    stock: 48,
    image: img('a5.jpg'),
    bestSeller: true,
    featured: true,
    specs: [
      { label: 'Size', value: 'A5' },
      { label: 'Pages', value: '160' },
      { label: 'Paper', value: '80 GSM' },
    ],
  },

  {
    id: 'n2',
    name: 'Dotted Bullet Journal',
    category: 'Notebooks',
    price: 349,
    originalPrice: 449,
    discount: 22,
    color: '#527A68',
    pattern: 'dot',
    desc: 'Minimal dotted pages for bullet journaling, layouts, lists and creative planning.',
    rating: 4.7,
    reviewCount: 148,
    stock: 26,
    image: img('daily planner.jpg'),
    bestSeller: true,
    specs: [
      { label: 'Size', value: 'A5' },
      { label: 'Pages', value: '192' },
      { label: 'Binding', value: 'Thread sewn' },
    ],
  },

  {
    id: 'n3',
    name: 'Hardbound Project Notebook',
    category: 'Notebooks',
    price: 449,
    originalPrice: 549,
    discount: 18,
    color: '#765C52',
    pattern: 'grid',
    desc: 'Hardbound notebook with grid pages, ribbon marker and elastic closure for college projects.',
    rating: 4.5,
    reviewCount: 68,
    stock: 18,
    image: img('notebook.jpg'),
    specs: [
      { label: 'Size', value: 'A4' },
      { label: 'Pages', value: '200' },
      { label: 'Paper', value: '90 GSM' },
    ],
  },

  {
    id: 'n4',
    name: 'Pastel Pocket Notes Set',
    category: 'Notebooks',
    price: 179,
    originalPrice: 219,
    discount: 18,
    color: '#A8798B',
    pattern: 'plain',
    desc: 'Set of three pocket notebooks for quick notes, reminders and daily ideas.',
    rating: 4.4,
    reviewCount: 55,
    stock: 60,
    image: img('sticky notes.jpg'),
    newArrival: true,
    specs: [
      { label: 'Pack', value: '3 notebooks' },
      { label: 'Size', value: 'A6' },
      { label: 'Pages', value: '48 each' },
    ],
  },

  // =========================
  // PENS
  // =========================

  {
    id: 'p1',
    name: 'SmoothFlow Gel Pen Set',
    category: 'Pens',
    price: 149,
    originalPrice: 199,
    discount: 25,
    color: '#283B56',
    pattern: 'plain',
    desc: 'Six quick-drying gel pens with smooth 0.5 mm tips for notes and exams.',
    rating: 4.8,
    reviewCount: 188,
    stock: 80,
    image: img('ball pen.webp'),
    bestSeller: true,
    specs: [
      { label: 'Pack', value: '6 pens' },
      { label: 'Tip', value: '0.5 mm' },
      { label: 'Ink', value: 'Gel' },
    ],
  },

  {
    id: 'p2',
    name: 'Executive Ball Pen Trio',
    category: 'Pens',
    price: 299,
    originalPrice: 349,
    discount: 14,
    color: '#8C6C3D',
    pattern: 'plain',
    desc: 'Elegant metal-body pens for meetings, signatures and everyday professional writing.',
    rating: 4.5,
    reviewCount: 44,
    stock: 25,
    image: img('black.jpeg'),
    specs: [
      { label: 'Pack', value: '3 pens' },
      { label: 'Body', value: 'Metal' },
      { label: 'Tip', value: '0.7 mm' },
    ],
  },

  {
    id: 'p3',
    name: 'Pastel Highlighter Pack',
    category: 'Pens',
    price: 229,
    originalPrice: 279,
    discount: 18,
    color: '#B77D90',
    pattern: 'plain',
    desc: 'Six muted highlighters designed for clean study notes without heavy ink bleed.',
    rating: 4.6,
    reviewCount: 97,
    stock: 52,
    image: img('highlighter.webp'),
    newArrival: true,
    specs: [
      { label: 'Pack', value: '6 colors' },
      { label: 'Tip', value: 'Chisel' },
      { label: 'Ink', value: 'Water based' },
    ],
  },

  // =========================
  // PENCILS
  // =========================

  {
    id: 'pe1',
    name: 'HB Exam Pencil Pack',
    category: 'Pencils',
    price: 99,
    originalPrice: 129,
    discount: 23,
    color: '#C7A56B',
    pattern: 'plain',
    desc: 'Reliable HB pencils for schoolwork, diagrams and examinations.',
    rating: 4.6,
    reviewCount: 133,
    stock: 100,
    image: img('hb pencil.jpeg'),
    bestSeller: true,
    specs: [
      { label: 'Pack', value: '10 pencils' },
      { label: 'Grade', value: 'HB' },
      { label: 'Use', value: 'Writing & exams' },
    ],
  },

  {
    id: 'pe2',
    name: 'Sketching Pencil Set',
    category: 'Pencils',
    price: 299,
    originalPrice: 399,
    discount: 25,
    color: '#625C5A',
    pattern: 'plain',
    desc: 'A balanced graphite range for sketching, shading and art practice.',
    rating: 4.7,
    reviewCount: 72,
    stock: 34,
    image: img('colord.avif'),
    specs: [
      { label: 'Pack', value: '12 pencils' },
      { label: 'Range', value: '2H–8B' },
      { label: 'Use', value: 'Sketching' },
    ],
  },

  // =========================
  // SCHOOL SUPPLIES
  // =========================

  {
    id: 's1',
    name: 'Student Geometry Kit',
    category: 'School Supplies',
    price: 179,
    originalPrice: 229,
    discount: 22,
    color: '#4C7694',
    pattern: 'grid',
    desc: 'Compact geometry kit with ruler, set squares, protractor, compass and pencil.',
    rating: 4.5,
    reviewCount: 88,
    stock: 41,
    image: img('geometry.jpg'),
    featured: true,
    specs: [
      { label: 'Pieces', value: '7' },
      { label: 'Case', value: 'Plastic box' },
      { label: 'Use', value: 'School' },
    ],
  },

  {
    id: 's2',
    name: 'Study Essentials Kit',
    category: 'School Supplies',
    price: 299,
    originalPrice: 399,
    discount: 25,
    color: '#7A6652',
    pattern: 'plain',
    desc: 'A handy starter kit with sticky notes, bookmarks, eraser, sharpener and ruler.',
    rating: 4.4,
    reviewCount: 61,
    stock: 29,
    image: img('penical case.jpg'),
    newArrival: true,
    specs: [
      { label: 'Pieces', value: '12+' },
      { label: 'Use', value: 'Students' },
      { label: 'Pack', value: 'Gift box' },
    ],
  },

  // =========================
  // ART & CRAFT
  // =========================

  {
    id: 'a1',
    name: 'Watercolour Starter Set',
    category: 'Art & Craft',
    price: 349,
    originalPrice: 449,
    discount: 22,
    color: '#507C78',
    pattern: 'plain',
    desc: 'A beginner-friendly watercolour set for school projects, cards and weekend painting.',
    rating: 4.7,
    reviewCount: 83,
    stock: 20,
    image: img('water color.jpg'),
    bestSeller: true,
    specs: [
      { label: 'Colors', value: '12' },
      { label: 'Includes', value: 'Brush + palette' },
      { label: 'Type', value: 'Watercolour' },
    ],
  },

  {
    id: 'a2',
    name: 'Craft Paper Colour Pack',
    category: 'Art & Craft',
    price: 129,
    originalPrice: 159,
    discount: 19,
    color: '#9A6673',
    pattern: 'grid',
    desc: 'Bright assorted craft sheets for school projects, origami and handmade cards.',
    rating: 4.5,
    reviewCount: 52,
    stock: 75,
    image: img('craft paper.jpeg'),
    specs: [
      { label: 'Sheets', value: '30' },
      { label: 'Size', value: 'A4' },
      { label: 'Use', value: 'Craft' },
    ],
  },

  // =========================
  // OFFICE SUPPLIES
  // =========================

  {
    id: 'o1',
    name: 'Minimal Desk Organizer',
    category: 'Office Supplies',
    price: 399,
    originalPrice: 499,
    discount: 20,
    color: '#596A67',
    pattern: 'plain',
    desc: 'A compact organizer for pens, clips, sticky notes and other everyday desk essentials.',
    rating: 4.6,
    reviewCount: 47,
    stock: 16,
    image: img('school desk.jpg'),
    featured: true,
    specs: [
      { label: 'Material', value: 'ABS' },
      { label: 'Compartments', value: '4' },
      { label: 'Use', value: 'Desk' },
    ],
  },

  {
    id: 'o2',
    name: 'Sticky Notes Office Pack',
    category: 'Office Supplies',
    price: 159,
    originalPrice: 199,
    discount: 20,
    color: '#C2A96A',
    pattern: 'plain',
    desc: 'A practical office pack of sticky notes and page markers in soft, readable colors.',
    rating: 4.5,
    reviewCount: 69,
    stock: 90,
    image: img('sticky notes.jpg'),
    specs: [
      { label: 'Sheets', value: '400+' },
      { label: 'Styles', value: '5' },
      { label: 'Use', value: 'Office & study' },
    ],
  },
]

// =========================
// HELPERS
// =========================

export const byId = (id: string) =>
  products.find((p) => p.id === id)

export const inr = (n: number) =>
  '₹' + n.toLocaleString('en-IN')

// =========================
// DEMO BUSINESS DETAILS
// =========================

export const DEMO_BUSINESS = {
  name: 'PaperNest',
  tagline: 'Learn. Create. Explore.',
  description:
    'A modern stationery and learning store offering books, notebooks, writing essentials, school supplies and creative products.',
  location: 'Dehradun, Uttarakhand, India',
  email: 'shobhitsinghssssss@gmail.com',
  phone: '+91 8004829402',
  whatsapp: '9336522145',
  delivery:
    '₹49 delivery · Free above ₹499 · Estimated 2–5 working days',
}

// =========================
// DEMO REVIEWS
// =========================

export const reviews = [
  {
    name: 'Aarav Mehta',
    rating: 5,
    text:
      'The notebooks feel premium and the order experience is really simple. Demo customer review.',
  },
  {
    name: 'Meera Joshi',
    rating: 4.8,
    text:
      'Loved the stationery selection and clean packaging concept. Demo customer review.',
  },
  {
    name: 'Kabir Sharma',
    rating: 4.7,
    text:
      'The study essentials collection is useful for college students. Demo customer review.',
  },
]