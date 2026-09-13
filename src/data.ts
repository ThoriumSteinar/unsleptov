export const site = {
  name: 'UNSLEPTOV RESTAURANT & BAR',
  short: 'UNSLEPTOV RESTAURANT',
  phone: '0161 555 2048',
  email: 'hello@unsleptov.com',
  address: ['18 Tariff Street,', 'Manchester', 'NQ, M1 2FF'],
  hours: [
    'Mon & Wed 17:00–22:00',
    'Tuesday CLOSED',
    'Thur–Sat 12:00–22:00',
    'Sun 13:30–22:00',
  ],
  social: {
    instagram: 'https://instagram.com/unsleptov',
    twitter: 'https://x.com/unsleptov',
    facebook: 'https://facebook.com/unsleptov',
  },
  notices: [
    'Our restaurant prefers cash payments due to high card transaction fees',
    'If you cannot find a timeslot, give us a call on 0161 555 2048',
  ],
}

export const images = {
  hero: `${import.meta.env.BASE_URL}images/hero.jpg`,
  private:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80',
  events:
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=80',
  gift: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=80',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dry-aged ribeye with rosemary',
    },
    {
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Grilled steak and greens',
    },
    {
      src: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
      alt: 'Tomahawk on the grill',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
      alt: 'Plated dinner with wine',
    },
    {
      src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Red wine and glasses',
    },
    {
      src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80',
      alt: 'Lamb chops',
    },
  ],
}

export type MenuKey = 'alacarte' | 'drinks' | 'lunch'

export type MenuItem = {
  name: string
  desc?: string
  price: string
  tags?: string
}

export type MenuSection = { title: string; note?: string; items: MenuItem[] }

export const menus: Record<MenuKey, { title: string; intro: string; sections: MenuSection[] }> = {
  alacarte: {
    title: 'À la carte',
    intro: 'Mediterranean grill, dry-aged steaks and plates meant for sharing.',
    sections: [
      {
        title: 'Starters',
        items: [
          { name: 'Marinated olives', desc: 'Citrus, garlic, oregano', price: '4.50', tags: 'VG GF' },
          { name: 'Whipped feta', desc: 'Chilli honey, warm flatbread', price: '8.00', tags: 'V' },
          { name: 'Grilled halloumi', desc: 'Lemon, mint, pomegranate', price: '8.50', tags: 'V GF' },
          { name: 'Calamari', desc: 'Saffron aioli, parsley', price: '9.50' },
          { name: 'King prawns', desc: 'Garlic butter, chilli', price: '12.00', tags: 'GF' },
          { name: 'Goat’s cheese fritters', desc: 'Beetroot, walnut', price: '8.50', tags: 'V' },
        ],
      },
      {
        title: 'From the grill',
        note: 'Steaks are served with skin-on chips and one sauce — peppercorn or blue cheese.',
        items: [
          { name: 'Chicken souvlaki', desc: 'Two skewers, lemon, salad garnish', price: '16.00' },
          { name: 'Lamb chops', desc: 'Rosemary, garlic, olive oil', price: '24.00', tags: 'GF' },
          { name: 'Sea bass', desc: 'Capers, fennel, extra virgin oil', price: '22.00', tags: 'GF' },
          { name: 'Sirloin 300g', desc: '28-day dry-aged', price: '28.00', tags: 'GF' },
          { name: 'Ribeye 320g', desc: 'Rich marbling, charcoal finish', price: '32.00', tags: 'GF' },
          { name: 'Fillet 220g', desc: 'The tender cut', price: '34.00', tags: 'GF' },
        ],
      },
      {
        title: 'Burgers',
        note: 'All burgers come with skin-on chips.',
        items: [
          { name: 'Unsleptov burger', desc: 'Angus beef, cheddar, pickle, house sauce', price: '16.50' },
          { name: 'Whiskey burger', desc: 'Bacon, onion jam, whiskey glaze', price: '17.50' },
          { name: 'Halloumi burger', desc: 'Roasted pepper, basil mayo', price: '15.00', tags: 'V' },
        ],
      },
      {
        title: 'Sharing',
        items: [
          {
            name: 'Meat feast for two',
            desc: 'Chicken and lamb skewers, pork chop, wings, chorizo, two sides',
            price: '48.00',
          },
          {
            name: 'Mediterranean board',
            desc: 'Dips, halloumi, olives, grilled vegetables, warm bread',
            price: '36.00',
            tags: 'V',
          },
        ],
      },
      {
        title: 'Sides',
        items: [
          { name: 'Skin-on chips', price: '4.50', tags: 'VG' },
          { name: 'Greek salad', price: '5.50', tags: 'V GF' },
          { name: 'Garlic roasted potatoes', price: '5.00', tags: 'V GF' },
          { name: 'Sautéed mushrooms', price: '5.00', tags: 'V GF' },
          { name: 'Mediterranean rice', price: '4.50', tags: 'VG GF' },
        ],
      },
      {
        title: 'Desserts',
        items: [
          { name: 'Baklava', desc: 'Pistachio, honey syrup', price: '7.50', tags: 'V' },
          { name: 'Crème brûlée', desc: 'Vanilla, burnt sugar', price: '7.00', tags: 'V GF' },
          { name: 'Cheesecake of the day', price: '7.50', tags: 'V' },
        ],
      },
    ],
  },
  drinks: {
    title: 'Drinks',
    intro: 'House cocktails, a short wine list, and cold beers for the Northern Quarter.',
    sections: [
      {
        title: 'Cocktails',
        items: [
          { name: 'Night Shift', desc: 'Bourbon, honey, orange bitters', price: '9.50' },
          { name: 'Silk Street Spritz', desc: 'Aperitivo, prosecco, soda', price: '8.50' },
          { name: 'Fig Negroni', desc: 'Gin, vermouth, fig leaf', price: '10.00' },
          { name: 'Tariff Sour', desc: 'Whiskey, lemon, aquafaba', price: '9.00' },
        ],
      },
      {
        title: 'Wine',
        items: [
          { name: 'House white / red', desc: '175ml', price: '6.50' },
          { name: 'Assyrtiko, Santorini', desc: 'Bottle', price: '38.00' },
          { name: 'Nero d’Avola, Sicily', desc: 'Bottle', price: '32.00' },
          { name: 'Prosecco', desc: 'Bottle', price: '28.00' },
        ],
      },
      {
        title: 'Beer & soft',
        items: [
          { name: 'Mythos', desc: '330ml', price: '4.80' },
          { name: 'Guest IPA', desc: 'Pint', price: '5.80' },
          { name: 'Still / sparkling water', price: '3.50' },
          { name: 'Homemade lemonade', price: '3.80' },
        ],
      },
    ],
  },
  lunch: {
    title: 'Lunch',
    intro: 'A shorter grill menu, Thursday to Saturday, 12:00–16:00.',
    sections: [
      {
        title: 'Lunch plates',
        items: [
          { name: 'Halloumi salad', desc: 'Leaves, cucumber, mint dressing', price: '12.00', tags: 'V' },
          { name: 'Chicken pita', desc: 'Tzatziki, tomato, pickled onion', price: '11.50' },
          { name: 'Steak frites', desc: 'Sirloin, peppercorn, chips', price: '18.00' },
          { name: 'Sea bass', desc: 'Fennel salad, lemon oil', price: '16.00', tags: 'GF' },
          { name: 'Lunch burger', desc: 'Cheddar, house sauce, chips', price: '13.50' },
        ],
      },
    ],
  },
}

export const events = [
  {
    date: '14 Feb',
    year: '2027',
    title: 'Candle-light dinner',
    when: 'Saturday 14 February · 17:00–22:30',
    text: 'After sunset the dining room is lit only by candles. The à la carte menu stays, with a few Valentine specials. Walk-ins are welcome; a table is strongly recommended.',
  },
  {
    date: '18 Oct',
    year: '2026',
    title: 'Live bouzouki evening',
    when: 'Saturday 18 October · 19:00–22:00',
    text: 'Greek strings in the dining room. Entry is free — bring dancing shoes if the music takes you. Book ahead; we fill up quickly.',
  },
  {
    date: '30 Aug',
    year: '2026',
    title: 'Summer garden BBQ',
    when: 'Sunday 30 August · 12:00–23:00',
    text: 'A long afternoon in the courtyard: grilled skewers, cold wine, and a draw for a free three-course dinner for two.',
  },
]

export const giftAmounts = [25, 50, 75, 100, 150]
