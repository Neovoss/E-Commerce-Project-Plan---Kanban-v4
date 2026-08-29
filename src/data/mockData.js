// T13'te ürünler gerçek API'den çekilecek; o zamana kadar UI bu statik veriyle çalışıyor.
export const heroSlides = [
  {
    id: 1,
    eyebrow: 'SUMMER 2020',
    title: 'NEW COLLECTION',
    description:
      'We know how large objects will act, but things on a small scale just do not act that way.',
    cta: 'SHOP NOW',
    image: 'https://picsum.photos/seed/bandage-hero-1/900/1000',
  },
  {
    id: 2,
    eyebrow: 'SUMMER 2020',
    title: 'VITA CLASSIC PRODUCT',
    description:
      'We know how large objects will act, but things on a small scale just do not act that way.',
    cta: 'ADD TO CART',
    image: 'https://picsum.photos/seed/bandage-hero-2/900/1000',
  },
]

export const categories = [
  { id: 1, title: 'CLOTHS', subtitle: '5 Items', image: 'https://picsum.photos/seed/cat-1/500/600' },
  { id: 2, title: 'SHOES', subtitle: '5 Items', image: 'https://picsum.photos/seed/cat-2/500/600' },
  { id: 3, title: 'BAGS', subtitle: '5 Items', image: 'https://picsum.photos/seed/cat-3/500/600' },
  { id: 4, title: 'ACCESSORIES', subtitle: '5 Items', image: 'https://picsum.photos/seed/cat-4/500/600' },
  { id: 5, title: 'KIDS', subtitle: '5 Items', image: 'https://picsum.photos/seed/cat-5/500/600' },
]

export const products = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: 'Graphic Design',
  department: 'English Department',
  oldPrice: 16.48,
  price: 6.48,
  colors: ['#23a6f0', '#2dc071', '#e77c40', '#252b42'],
  image: `https://picsum.photos/seed/product-${index + 1}/480/600`,
}))

export const teamMembers = [
  {
    id: 1,
    name: 'Gökhan Özdemir',
    role: 'Project Manager',
    image: 'https://picsum.photos/seed/team-gokhan/400/400',
  },
  {
    id: 2,
    name: 'Berke Yılmaz Berk',
    role: 'Full Stack Developer',
    image: 'https://picsum.photos/seed/team-berke/400/400',
  },
  {
    id: 3,
    name: 'Username',
    role: 'Frontend Developer',
    image: 'https://picsum.photos/seed/team-3/400/400',
  },
  {
    id: 4,
    name: 'Username',
    role: 'Backend Developer',
    image: 'https://picsum.photos/seed/team-4/400/400',
  },
  {
    id: 5,
    name: 'Username',
    role: 'UI/UX Designer',
    image: 'https://picsum.photos/seed/team-5/400/400',
  },
]
