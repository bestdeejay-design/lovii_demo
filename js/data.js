/* ===== LOVII Mock Data ===== */

const MOCK = {
  stores: [
    { id: 1, name: 'Пекарня #23', category: 'bakery', emoji: '🍞', rating: 4.8, distance: '1.2км', address: 'ул. Тверская, 23', orders: 45, revenue: 54000, active: true },
    { id: 2, name: 'Цветы Fresh', category: 'flowers', emoji: '💐', rating: 4.9, distance: '2.3км', address: 'ул. Арбат, 12', orders: 28, revenue: 33600, active: true },
    { id: 3, name: 'Кофе daily', category: 'coffee', emoji: '☕', rating: 4.7, distance: '0.8км', address: 'ул. Пушкина, 5', orders: 62, revenue: 37200, active: true },
    { id: 4, name: 'Суши Мия', category: 'restaurant', emoji: '🍣', rating: 4.6, distance: '3.1км', address: 'ул. Новая, 42', orders: 18, revenue: 21600, active: false }
  ],

  products: [
    { id: 1, storeId: 1, name: 'Круассан классический', price: 190, active: true, orders: 142 },
    { id: 2, storeId: 1, name: 'Багет на закваске', price: 120, active: true, orders: 89 },
    { id: 3, storeId: 1, name: 'Эклер шоколадный', price: 250, active: true, orders: 67 },
    { id: 4, storeId: 1, name: 'Чизкейк Нью-Йорк', price: 390, active: false, orders: 34 },
    { id: 5, storeId: 2, name: 'Букет "Нежность"', price: 2900, active: true, orders: 56 },
    { id: 6, storeId: 2, name: 'Букет "Яркий день"', price: 3500, active: true, orders: 42 }
  ],

  orders: [
    { id: 312, storeId: 1, store: 'Пекарня #23', emoji: '🍞', amount: 1200, status: 'preparing', items: ['Круассан ×2', 'Багет ×1'], time: '15 мин', date: 'сегодня' },
    { id: 311, storeId: 2, store: 'Цветы Fresh', emoji: '💐', amount: 2300, status: 'delivering', items: ['Букет "Нежность" ×1'], time: '20 мин', date: 'сегодня' },
    { id: 310, storeId: 3, store: 'Кофе daily', emoji: '☕', amount: 560, status: 'delivered', items: ['Капучино ×2', 'Круассан ×1'], time: null, date: 'вчера' },
    { id: 309, storeId: 1, store: 'Пекарня #23', emoji: '🍞', amount: 890, status: 'delivered', items: ['Эклер ×1', 'Багет ×2'], time: null, date: 'вчера' }
  ],

  partners: {
    storeId: 1,
    metrics: { orders: 24, revenue: 28800, newClients: 3 },
    incomingOrders: [
      { id: 315, items: 'Круассан ×2', amount: 380, status: 'new', time: '2 мин' },
      { id: 314, items: 'Эклер ×2, Багет ×1', amount: 620, status: 'preparing', time: '10 мин' },
      { id: 313, items: 'Чизкейк ×1', amount: 390, status: 'ready', time: '—' }
    ]
  },

  rep: {
    name: 'Александра',
    phone: '+7 (999) 123-45-67',
    status: 'representative',
    statusEmoji: '🥈',
    points: 24,
    pointsToNext: 30,
    nextStatus: 'mayor',
    nextEmoji: '🥇',
    monthlyIncome: 46500,
    totalRevenue: 124800,
    stores: [
      { id: 1, name: 'Пекарня #23', orders: 45, revenue: 54000 },
      { id: 2, name: 'Цветы Fresh', orders: 28, revenue: 33600 },
      { id: 3, name: 'Кофе daily', orders: 62, revenue: 37200 }
    ],
    incomeHistory: [
      { date: '14 июл', amount: 3200 },
      { date: '13 июл', amount: 2800 },
      { date: '12 июл', amount: 4100 },
      { date: '11 июл', amount: 3500 },
      { date: '10 июл', amount: 2900 }
    ]
  },

  ambassador: {
    name: 'Елена',
    reps: 12,
    storesTotal: 86,
    monthlyIncome: 128000,
    repList: [
      { name: 'Александра', stores: 24, income: 46500 },
      { name: 'Дмитрий', stores: 18, income: 35200 },
      { name: 'Ольга', stores: 15, income: 28900 },
      { name: 'Сергей', stores: 12, income: 22400 }
    ]
  },

  user: {
    name: 'Александра',
    phone: '+7 (999) 123-45-67',
    bonusBalance: 1250
  }
}

function getStore(id) {
  return MOCK.stores.find(s => s.id === id)
}

function getOrders(status) {
  if (!status) return MOCK.orders
  return MOCK.orders.filter(o => o.status === status)
}

function getUserOrders() {
  return MOCK.orders
}

function getPartnerOrders() {
  return MOCK.partners.incomingOrders
}

function getStoreProducts(storeId) {
  return MOCK.products.filter(p => p.storeId === storeId)
}
