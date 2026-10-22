// Single source of truth for business details and page copy.
// Lines marked CONFIRM are reasonable assumptions; check them with the owner
// before going live.

export const business = {
  name: 'Suhan Second Hand AC Sale & Purchase',
  short: 'Suhan',
  tagline: 'Second hand AC sale & purchase',
  phoneDisplay: '+91 92206 49795',
  phoneShort: '92206 49795',
  phoneRaw: '919220649795',
  address: {
    line1: 'Nimi Bihar, 10A, Gali No. 7',
    line2: 'Sector 89, Noida',
    line3: 'Uttar Pradesh 201304',
  },
  rating: { score: '5.0', count: 40 },
  // CONFIRM: service area.
  serviceArea: 'Noida, Greater Noida and nearby NCR',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Suhan+Second+Hand+Ac+Sale+And+Purchase+Sector+89+Noida',
  mapsEmbed:
    'https://www.google.com/maps?q=Suhan%20Second%20Hand%20Ac%20Sale%20And%20Purchase%2C%20Sector%2089%2C%20Noida&output=embed',
}

export const telHref = `tel:+${business.phoneRaw}`

export const waHref = (text = 'Hi Suhan, I have a question about an AC.') =>
  `https://wa.me/${business.phoneRaw}?text=${encodeURIComponent(text)}`

export const waMessages = {
  general: 'Hi Suhan, I have a question about an AC.',
  sell: 'Hi Suhan, I want to sell my old AC. Please share the best price.',
  buy: 'Hi Suhan, I want to buy a used AC. What do you have in stock?',
  commercial: 'Hi Suhan, I have commercial ACs / a site to dismantle. Can you visit?',
}

export const nav = [
  { to: '/sell-old-ac', label: 'Sell your AC' },
  { to: '/buy-used-ac', label: 'Buy used AC' },
  { to: '/commercial-ac-dismantling', label: 'Commercial' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Photography from Unsplash (free licence). Swap in real shop photos when
// available: only the id and alt need to change.
export const photos = {
  heroCondensers: {
    id: '1698479603408-1a66a6d9e80f',
    alt: 'Rows of outdoor AC condenser units on a rooftop',
  },
  crew: {
    id: '1642749776312-aa42ce20c9f5',
    alt: 'Two technicians working beside outdoor AC units on a rooftop',
  },
  rooftop: {
    id: '1643100323417-7cbe4c8769c5',
    alt: 'Commercial rooftop lined with AC condenser units',
  },
  livingRoom: {
    id: '1761330440311-16e160cad236',
    alt: 'Split AC mounted on a living room wall',
  },
  splitCloseup: {
    id: '1759772238012-9d5ad59ae637',
    alt: 'A white split AC indoor unit mounted on a wall',
  },
  wallUnits: {
    id: '1667983453881-4992fe86ab1b',
    alt: 'AC outdoor units mounted on a grey building wall',
  },
  office: {
    id: '1771918050103-57b5de00d960',
    alt: 'Open office with exposed ducting above the desks',
  },
  oldUnit: {
    id: '1782110570084-51e1fe38b0a8',
    alt: 'An old AC outdoor unit sitting on a rooftop',
  },
  mono: {
    id: '1766788466565-768128d89ce4',
    alt: 'AC outdoor unit fixed to a wall under a tiled roof',
  },
}

export const brands = [
  'LG',
  'Voltas',
  'Daikin',
  'Samsung',
  'Blue Star',
  'Hitachi',
  'Carrier',
  'Lloyd',
  'Godrej',
  'Panasonic',
  'Whirlpool',
  'O General',
  'Haier',
  'Mitsubishi',
]

export const buyClusters = [
  {
    key: 'ac',
    title: 'Air conditioners',
    text: 'Any brand, any age, working or not.',
    items: [
      'Split AC',
      'Window AC',
      'Cassette AC',
      'Tower AC',
      'Ductable AC',
      'VRV and VRF systems',
      'Chiller and AC plants',
      'Rooftop AHU and package units',
      'Commercial 3-phase AC',
    ],
  },
  {
    key: 'dismantling',
    title: 'Dismantling and scrap',
    text: 'Full clear-outs, done by our team.',
    items: [
      'Office dismantling',
      'Hotel dismantling',
      'Showroom dismantling',
      'Factory dismantling',
      'Company scrap',
      'AC plant scrap',
    ],
  },
  {
    key: 'electricals',
    title: 'Other electricals',
    text: 'Bring them along with your AC.',
    items: ['Used UPS', 'Old batteries', 'Stabilizers', 'Motors', 'Transformers', 'Old machinery'],
  },
]

export const faqs = {
  nonWorking: {
    q: 'Do you buy ACs that are not working?',
    a: 'Yes. We buy working and non-working ACs, including old, damaged and gas-empty units. The condition changes the price, not whether we buy it.',
  },
  freePickup: {
    q: 'Do you charge for uninstallation or pickup?',
    a: 'No. Uninstalling the indoor and outdoor units and taking them away is free.',
  },
  price: {
    q: 'How is the price for my AC worked out?',
    a: 'We look at the type, tonnage, brand, age and condition (especially the compressor), plus how many units you have. Send these details or a photo on WhatsApp and we will quote.',
  },
  types: {
    q: 'Which ACs do you buy?',
    a: 'Window, split, cassette, tower, ductable, VRV/VRF, chiller plants and rooftop package units, from every brand. We also buy used UPS, batteries, stabilizers, motors and transformers.',
  },
  // CONFIRM: payment timing and method.
  payment: {
    q: 'When do I get paid?',
    a: 'Once we have checked the AC and you agree to the price, you are paid at pickup.',
  },
  area: {
    q: 'Which areas do you cover?',
    a: `Our shop is in Sector 89, Noida. We pick up across ${business.serviceArea}. Call or WhatsApp to check your location.`,
  },
  sellToo: {
    q: 'Do you also sell second hand ACs?',
    a: 'Yes. We mainly sell window and split ACs in 1, 1.5 and 2 ton, and only units in good working condition.',
  },
  bulk: {
    q: 'Can you clear a whole office, hotel or factory?',
    a: 'Yes. We buy in bulk and handle dismantling for offices, hotels, showrooms and factories, including AC plant and company scrap.',
  },
  seeFirst: {
    q: 'Can I see the AC before I buy it?',
    a: 'Yes. Visit our shop in Sector 89, Noida to see the units in person, or ask on WhatsApp for photos of what is in stock today.',
  },
  tonnage: {
    q: 'Which tonnage do I need?',
    a: 'As a rough guide: 1 ton for rooms up to about 120 sq ft, 1.5 ton up to about 180 sq ft, and 2 ton up to about 250 sq ft. Top-floor and west-facing rooms may need a size up.',
  },
  exchange: {
    q: 'I have an old AC too. Can you price it?',
    a: 'Yes. We buy old ACs as well, so tell us about it in the same chat and we will quote for both.',
  },
  siteVisit: {
    q: 'Do you visit the site before quoting?',
    a: 'For commercial systems and dismantling jobs, yes. We inspect the equipment, agree the price and then plan the removal with you.',
  },
}
