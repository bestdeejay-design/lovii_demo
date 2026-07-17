/* ===== LOVII Mock Data ===== */

const CITY_PROMOS = {
  'Москва': { storeId: 8, title: 'Слойка с вишней — всего 65₽', desc: 'до 20:00', tag: 'sale' },
  'Санкт-Петербург': { storeId: 19, title: 'Скидка 15% на суши', desc: 'до полуночи', tag: 'sale' },
  'Казань': { storeId: 18, title: 'Пицца 2×1', desc: 'все выходные', tag: 'sale' },
  'Екатеринбург': { storeId: 25, title: '−30% на бургеры', desc: 'с 12 до 16', tag: 'sale' },
  'Новосибирск': { storeId: 30, title: 'Скидка 25% на сладости', desc: 'по промокоду SWEET', tag: 'sale' }
}

const MOCK = {
  stores: [
    { id: 1, name: 'Пекарня #23', category: 'bakery', icon: 'bread', rating: 4.8, distance: '1.2км', eta: '25 мин', address: 'ул. Тверская, 23', orders: 45, revenue: 54000, active: true, image: 'assets/img/store-1.webp' },
    { id: 2, name: 'Цветы Fresh', category: 'flowers', icon: 'flower', rating: 4.9, distance: '2.3км', eta: '40 мин', address: 'ул. Арбат, 12', orders: 28, revenue: 33600, active: true, image: 'assets/img/store-2.webp' },
    { id: 3, name: 'Кофе daily', category: 'coffee', icon: 'coffee', rating: 4.7, distance: '0.8км', eta: '15 мин', address: 'ул. Пушкина, 5', orders: 62, revenue: 37200, active: true, image: 'assets/img/store-3.webp' },
    { id: 4, name: 'Суши Мия', category: 'restaurant', icon: 'sushi', rating: 4.6, distance: '3.1км', eta: '50 мин', address: 'ул. Новая, 42', orders: 18, revenue: 21600, active: false, image: 'assets/img/store-4.webp' },
    { id: 7, name: 'Хлебный Двор', category: 'bakery', icon: 'bread', rating: 4.7, distance: '1.5км', eta: '20 мин', address: 'ул. Тверская, 45', orders: 38, revenue: 42000, active: true, image: 'assets/img/store-7.webp', tags: ['delivery','pickup','breakfast'], delivery: true, pickup: true },
    { id: 8, name: 'Булочная N9', category: 'bakery', icon: 'bread', rating: 4.5, distance: '2.0км', eta: '30 мин', address: 'пр-т Мира, 15', orders: 22, revenue: 28000, active: true, image: 'assets/img/store-8.webp', tags: ['delivery','pickup','cozy'], delivery: true, pickup: true },
    { id: 9, name: 'Кондитерская Сладкая', category: 'bakery', icon: 'bread', rating: 4.9, distance: '0.9км', eta: '15 мин', address: 'ул. Кузнецкий Мост, 8', orders: 55, revenue: 68000, active: true, image: 'assets/img/store-9.webp', tags: ['delivery','pickup','premium','kids'], delivery: true, pickup: false },
    { id: 10, name: 'Пироги и Ко', category: 'bakery', icon: 'bread', rating: 4.6, distance: '3.5км', eta: '35 мин', address: 'ул. Ленина, 22', orders: 31, revenue: 35000, active: true, image: 'assets/img/store-10.webp', tags: ['delivery','lunch','fast-food'], delivery: true, pickup: true },
    { id: 11, name: 'Цветочный Рай', category: 'flowers', icon: 'flower', rating: 4.8, distance: '1.8км', eta: '30 мин', address: 'ул. Новый Арбат, 7', orders: 40, revenue: 52000, active: true, image: 'assets/img/store-11.webp', tags: ['delivery','pickup','premium'], delivery: true, pickup: true },
    { id: 12, name: 'Лаванда Стор', category: 'flowers', icon: 'flower', rating: 4.5, distance: '4.2км', eta: '45 мин', address: 'ул. Садовая, 19', orders: 16, revenue: 19000, active: true, image: 'assets/img/store-12.webp', tags: ['delivery','cozy'], delivery: true, pickup: false },
    { id: 13, name: 'Кафе Эспрессо', category: 'coffee', icon: 'coffee', rating: 4.6, distance: '1.1км', eta: '10 мин', address: 'ул. Никольская, 3', orders: 71, revenue: 41000, active: true, image: 'assets/img/store-13.webp', tags: ['delivery','pickup','breakfast','cozy'], delivery: true, pickup: true },
    { id: 14, name: 'Кофейня Brew', category: 'coffee', icon: 'coffee', rating: 4.8, distance: '0.5км', eta: '8 мин', address: 'ул. Петровка, 12', orders: 88, revenue: 53000, active: true, image: 'assets/img/store-14.webp', tags: ['delivery','pickup','24hours'], delivery: true, pickup: true },
    { id: 15, name: 'Лавка Зёрен', category: 'coffee', icon: 'coffee', rating: 4.4, distance: '2.8км', eta: '25 мин', address: 'ул. Мясницкая, 24', orders: 34, revenue: 21000, active: true, image: 'assets/img/store-15.webp', tags: ['delivery','cozy','premium'], delivery: true, pickup: false },
    { id: 16, name: 'Ресторан Шеф', category: 'restaurant', icon: 'sushi', rating: 4.9, distance: '2.5км', eta: '35 мин', address: 'ул. Покровка, 1', orders: 52, revenue: 89000, active: true, image: 'assets/img/store-16.webp', tags: ['delivery','premium','lunch'], delivery: true, pickup: true },
    { id: 17, name: 'Барская Кухня', category: 'restaurant', icon: 'sushi', rating: 4.7, distance: '3.0км', eta: '40 мин', address: 'ул. Тверской бульвар, 11', orders: 29, revenue: 67000, active: true, image: 'assets/img/store-17.webp', tags: ['delivery','premium','cozy'], delivery: true, pickup: false },
    { id: 18, name: 'Обед Хаус', category: 'restaurant', icon: 'sushi', rating: 4.3, distance: '1.9км', eta: '20 мин', address: 'ул. Таганская, 5', orders: 44, revenue: 48000, active: true, image: 'assets/img/store-18.webp', tags: ['delivery','pickup','lunch','fast-food'], delivery: true, pickup: true },
    { id: 19, name: 'Сакура Ролл', category: 'sushi', icon: 'sushi', rating: 4.8, distance: '1.4км', eta: '30 мин', address: 'ул. Большая Дмитровка, 14', orders: 63, revenue: 72000, active: true, image: 'assets/img/store-19.webp', tags: ['delivery','pickup','premium'], delivery: true, pickup: true },
    { id: 20, name: 'Филадельфия Суши', category: 'sushi', icon: 'sushi', rating: 4.5, distance: '2.7км', eta: '45 мин', address: 'ул. Земляной Вал, 28', orders: 37, revenue: 41000, active: true, image: 'assets/img/store-20.webp', tags: ['delivery','pickup','hit'], delivery: true, pickup: true },
    { id: 21, name: 'Пепперони Парк', category: 'pizza', icon: 'pizza', rating: 4.6, distance: '1.3км', eta: '25 мин', address: 'ул. Тимура Фрунзе, 9', orders: 74, revenue: 64000, active: true, image: 'assets/img/store-21.webp', tags: ['delivery','pickup','fast-food'], delivery: true, pickup: true },
    { id: 22, name: 'Маргарита Пицца', category: 'pizza', icon: 'pizza', rating: 4.4, distance: '2.1км', eta: '30 мин', address: 'ул. Пречистенка, 33', orders: 41, revenue: 38000, active: true, image: 'assets/img/store-22.webp', tags: ['delivery','pickup','kids','lunch'], delivery: true, pickup: true },
    { id: 23, name: 'Домашняя Пицца', category: 'pizza', icon: 'pizza', rating: 4.7, distance: '3.8км', eta: '40 мин', address: 'ул. Вавилова, 17', orders: 28, revenue: 29000, active: true, image: 'assets/img/store-23.webp', tags: ['delivery','cozy'], delivery: true, pickup: false },
    { id: 24, name: 'Биф Бургер', category: 'burger', icon: 'burger', rating: 4.7, distance: '0.7км', eta: '15 мин', address: 'ул. Маросейка, 6', orders: 82, revenue: 56000, active: true, image: 'assets/img/store-24.webp', tags: ['delivery','pickup','fast-food'], delivery: true, pickup: true },
    { id: 25, name: 'Гриль Хаус', category: 'burger', icon: 'burger', rating: 4.5, distance: '2.2км', eta: '20 мин', address: 'ул. Солянка, 4', orders: 55, revenue: 39000, active: true, image: 'assets/img/store-25.webp', tags: ['delivery','pickup','lunch','healthy'], delivery: true, pickup: true },
    { id: 26, name: 'Чизбургер Шоп', category: 'burger', icon: 'burger', rating: 4.3, distance: '3.4км', eta: '30 мин', address: 'ул. Бауманская, 11', orders: 33, revenue: 25000, active: true, image: 'assets/img/store-26.webp', tags: ['delivery','fast-food','hot'], delivery: true, pickup: false },
    { id: 27, name: 'Продукты 24', category: 'grocery', icon: 'grocery', rating: 4.2, distance: '0.6км', eta: '10 мин', address: 'ул. Красная Пресня, 5', orders: 95, revenue: 45000, active: true, image: 'assets/img/store-27.webp', tags: ['delivery','pickup','24hours'], delivery: true, pickup: true },
    { id: 28, name: 'Фреш Маркет', category: 'grocery', icon: 'grocery', rating: 4.6, distance: '1.7км', eta: '20 мин', address: 'ул. Остоженка, 16', orders: 60, revenue: 72000, active: true, image: 'assets/img/store-28.webp', tags: ['delivery','pickup','healthy','cozy'], delivery: true, pickup: true },
    { id: 29, name: 'Экопродукт', category: 'grocery', icon: 'grocery', rating: 4.8, distance: '2.9км', eta: '25 мин', address: 'ул. Пятницкая, 30', orders: 47, revenue: 58000, active: true, image: 'assets/img/store-29.webp', tags: ['delivery','pickup','premium','healthy'], delivery: true, pickup: false },
    { id: 30, name: 'Здоровье Аптека', category: 'pharmacy', icon: 'pharmacy', rating: 4.3, distance: '0.9км', eta: '10 мин', address: 'ул. Лесная, 8', orders: 39, revenue: 31000, active: true, image: 'assets/img/store-30.webp', tags: ['delivery','pickup','24hours'], delivery: true, pickup: true },
    { id: 31, name: 'Фармация Плюс', category: 'pharmacy', icon: 'pharmacy', rating: 4.5, distance: '1.6км', eta: '15 мин', address: 'ул. Сретенка, 22', orders: 27, revenue: 22000, active: true, image: 'assets/img/store-31.webp', tags: ['delivery','pickup'], delivery: true, pickup: true },
    { id: 32, name: 'Винотека', category: 'alcohol', icon: 'alcohol', rating: 4.7, distance: '1.2км', eta: '20 мин', address: 'ул. Бульварное Кольцо, 7', orders: 51, revenue: 95000, active: true, image: 'assets/img/store-32.webp', tags: ['delivery','pickup','premium'], delivery: true, pickup: true },
    { id: 33, name: 'Пивной Двор', category: 'alcohol', icon: 'alcohol', rating: 4.1, distance: '2.4км', eta: '25 мин', address: 'ул. Серпуховская, 13', orders: 35, revenue: 28000, active: true, image: 'assets/img/store-33.webp', tags: ['delivery','pickup','24hours'], delivery: true, pickup: true },
    { id: 34, name: 'Конфетный Рай', category: 'sweets', icon: 'sweets', rating: 4.8, distance: '1.0км', eta: '15 мин', address: 'ул. Арбат, 44', orders: 48, revenue: 35000, active: true, image: 'assets/img/store-34.webp', tags: ['delivery','pickup','kids','cozy'], delivery: true, pickup: true },
    { id: 35, name: 'Шоколадница', category: 'sweets', icon: 'sweets', rating: 4.6, distance: '2.0км', eta: '20 мин', address: 'ул. Неглинная, 10', orders: 33, revenue: 26000, active: true, image: 'assets/img/store-35.webp', tags: ['delivery','premium','cozy'], delivery: true, pickup: false },
    { id: 36, name: 'Вок Хаус', category: 'asian', icon: 'asian', rating: 4.5, distance: '1.5км', eta: '20 мин', address: 'ул. Поклонная, 3', orders: 42, revenue: 39000, active: true, image: 'assets/img/store-36.webp', tags: ['delivery','pickup','fast-food','lunch'], delivery: true, pickup: true },
    { id: 37, name: 'Кимчи Бар', category: 'asian', icon: 'asian', rating: 4.6, distance: '2.8км', eta: '30 мин', address: 'ул. Усачёва, 21', orders: 29, revenue: 31000, active: true, image: 'assets/img/store-37.webp', tags: ['delivery','pickup','spicy','cozy'], delivery: true, pickup: true }
  ],

  products: [
    { id: 1, storeId: 1, name: 'Круассан классический', price: 190, oldPrice: 250, active: true, orders: 142, image: 'assets/img/product-1.webp', badges: [{ type: 'top', label: 'Топ' }, { type: 'discount', label: '−20%' }] },
    { id: 2, storeId: 1, name: 'Багет на закваске', price: 120, active: true, orders: 89, image: 'assets/img/product-2.webp', badges: [{ type: 'season', label: 'Сезон' }, { type: 'sugarfree', label: 'Без сахара' }] },
    { id: 3, storeId: 1, name: 'Эклер шоколадный', price: 250, oldPrice: 390, active: true, orders: 67, image: 'assets/img/product-3.webp', badges: [{ type: 'hit', label: 'Хит' }, { type: 'eco', label: 'Эко' }] },
    { id: 4, storeId: 1, name: 'Чизкейк Нью-Йорк', price: 390, active: false, orders: 34, image: 'assets/img/product-4.webp', badges: [{ type: 'new', label: 'Новинка' }] },
    { id: 5, storeId: 2, name: 'Букет "Нежность"', price: 2900, oldPrice: 3500, active: true, orders: 56, image: 'assets/img/product-5.webp', badges: [{ type: 'sale', label: 'Акция' }, { type: 'new', label: 'Новинка' }] },
    { id: 6, storeId: 2, name: 'Букет "Яркий день"', price: 3500, active: true, orders: 42, image: 'assets/img/product-6.webp', badges: [{ type: 'hit', label: 'Хит' }] },
    { id: 7, storeId: 7, name: 'Хлеб бородинский', price: 80, active: true, orders: 120, image: 'assets/img/product-7.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 8, storeId: 7, name: 'Батон нарезной', price: 55, active: true, orders: 98, image: 'assets/img/product-8.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 9, storeId: 7, name: 'Ржаной хлеб с тмином', price: 90, active: true, orders: 67, image: 'assets/img/product-9.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['new','eco'], delivery: true, pickup: true },
    { id: 10, storeId: 8, name: 'Булочка с маком', price: 45, active: true, orders: 85, image: 'assets/img/product-10.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 11, storeId: 8, name: 'Слойка с вишней', price: 65, oldPrice: 80, active: true, orders: 72, image: 'assets/img/product-11.webp', badges: [{ type: 'sale', label: 'Акция' }], tags: ['sale'], delivery: true, pickup: true },
    { id: 12, storeId: 8, name: 'Рогалик с сыром', price: 55, active: true, orders: 44, image: 'assets/img/product-12.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 13, storeId: 9, name: 'Торт медовик', price: 650, active: true, orders: 34, image: 'assets/img/product-13.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['premium','hit'], delivery: true, pickup: false },
    { id: 14, storeId: 9, name: 'Пирожное картошка', price: 120, active: true, orders: 56, image: 'assets/img/product-14.webp', badges: [], tags: ['combo'], delivery: true, pickup: false },
    { id: 15, storeId: 9, name: 'Печенье с шоколадом', price: 180, active: true, orders: 78, image: 'assets/img/product-15.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['new','kids'], delivery: true, pickup: false },
    { id: 16, storeId: 10, name: 'Пирог с капустой', price: 140, active: true, orders: 62, image: 'assets/img/product-16.webp', badges: [], tags: ['season'], delivery: true, pickup: true },
    { id: 17, storeId: 10, name: 'Пирог с мясом', price: 190, active: true, orders: 54, image: 'assets/img/product-17.webp', badges: [], tags: ['hot'], delivery: true, pickup: true },
    { id: 18, storeId: 10, name: 'Курник', price: 220, active: true, orders: 39, image: 'assets/img/product-18.webp', badges: [], tags: ['premium'], delivery: true, pickup: true },
    { id: 19, storeId: 11, name: 'Букет "Вдохновение"', price: 3200, active: true, orders: 38, image: 'assets/img/product-19.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['premium','new'], delivery: true, pickup: true },
    { id: 20, storeId: 11, name: 'Композиция из гортензий', price: 4500, oldPrice: 5200, active: true, orders: 22, image: 'assets/img/product-20.webp', badges: [{ type: 'sale', label: 'Акция' }], tags: ['sale'], delivery: true, pickup: true },
    { id: 21, storeId: 11, name: 'Розы в коробке', price: 3800, active: true, orders: 45, image: 'assets/img/product-21.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 22, storeId: 12, name: 'Букет лаванды', price: 1500, active: true, orders: 33, image: 'assets/img/product-22.webp', badges: [], tags: ['eco'], delivery: true, pickup: false },
    { id: 23, storeId: 12, name: 'Сухоцветы микс', price: 1200, active: true, orders: 28, image: 'assets/img/product-23.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['new'], delivery: true, pickup: false },
    { id: 24, storeId: 12, name: 'Гортензия в горшке', price: 2200, active: true, orders: 19, image: 'assets/img/product-24.webp', badges: [], tags: ['premium'], delivery: true, pickup: false },
    { id: 25, storeId: 13, name: 'Капучино', price: 180, active: true, orders: 120, image: 'assets/img/product-25.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 26, storeId: 13, name: 'Латте', price: 200, active: true, orders: 105, image: 'assets/img/product-26.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 27, storeId: 13, name: 'Американо', price: 150, active: true, orders: 88, image: 'assets/img/product-27.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 28, storeId: 13, name: 'Матча латте', price: 250, active: true, orders: 45, image: 'assets/img/product-28.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['new','eco'], delivery: true, pickup: true },
    { id: 29, storeId: 14, name: 'Раф-кофе', price: 220, active: true, orders: 97, image: 'assets/img/product-29.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit','premium'], delivery: true, pickup: true },
    { id: 30, storeId: 14, name: 'Холодный кофе', price: 170, active: true, orders: 76, image: 'assets/img/product-30.webp', badges: [], tags: ['season'], delivery: true, pickup: true },
    { id: 31, storeId: 14, name: 'Эспрессо двойной', price: 130, active: true, orders: 65, image: 'assets/img/product-31.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 32, storeId: 15, name: 'Зерновой кофе 250г', price: 450, active: true, orders: 44, image: 'assets/img/product-32.webp', badges: [], tags: ['premium','eco'], delivery: true, pickup: false },
    { id: 33, storeId: 15, name: 'Какао с маршмеллоу', price: 190, active: true, orders: 33, image: 'assets/img/product-33.webp', badges: [], tags: ['cozy','kids'], delivery: true, pickup: false },
    { id: 34, storeId: 15, name: 'Чай матча', price: 280, active: true, orders: 28, image: 'assets/img/product-34.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['new','healthy'], delivery: true, pickup: false },
    { id: 35, storeId: 16, name: 'Стейк рибай', price: 1200, active: true, orders: 47, image: 'assets/img/product-35.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['premium','grill','hit'], delivery: true, pickup: true },
    { id: 36, storeId: 16, name: 'Тартар из говядины', price: 890, active: true, orders: 35, image: 'assets/img/product-36.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['premium','new'], delivery: true, pickup: true },
    { id: 37, storeId: 16, name: 'Салат с трюфелем', price: 650, active: true, orders: 23, image: 'assets/img/product-37.webp', badges: [], tags: ['premium','season'], delivery: true, pickup: true },
    { id: 38, storeId: 17, name: 'Утиная грудка', price: 750, active: true, orders: 36, image: 'assets/img/product-38.webp', badges: [], tags: ['premium','grill'], delivery: true, pickup: false },
    { id: 39, storeId: 17, name: 'Ризотто с грибами', price: 420, active: true, orders: 42, image: 'assets/img/product-39.webp', badges: [], tags: ['hot','combo'], delivery: true, pickup: false },
    { id: 40, storeId: 17, name: 'Борщ с пампушками', price: 290, active: true, orders: 58, image: 'assets/img/product-40.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: false },
    { id: 41, storeId: 18, name: 'Бизнес-ланч', price: 350, active: true, orders: 85, image: 'assets/img/product-41.webp', badges: [], tags: ['combo','lunch'], delivery: true, pickup: true },
    { id: 42, storeId: 18, name: 'Паста карбонара', price: 380, active: true, orders: 61, image: 'assets/img/product-42.webp', badges: [], tags: ['hot'], delivery: true, pickup: true },
    { id: 43, storeId: 18, name: 'Суп-пюре тыквенный', price: 260, active: true, orders: 44, image: 'assets/img/product-43.webp', badges: [], tags: ['season','healthy'], delivery: true, pickup: true },
    { id: 44, storeId: 19, name: 'Ролл "Филадельфия"', price: 420, active: true, orders: 93, image: 'assets/img/product-44.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 45, storeId: 19, name: 'Сет "Сакура"', price: 1200, oldPrice: 1500, active: true, orders: 41, image: 'assets/img/product-45.webp', badges: [{ type: 'sale', label: 'Акция' }], tags: ['sale','combo','premium'], delivery: true, pickup: true },
    { id: 46, storeId: 19, name: 'Нигири с лососем', price: 180, active: true, orders: 76, image: 'assets/img/product-46.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 47, storeId: 20, name: 'Ролл "Калифорния"', price: 380, active: true, orders: 67, image: 'assets/img/product-47.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 48, storeId: 20, name: 'Гункан с икрой', price: 250, active: true, orders: 52, image: 'assets/img/product-48.webp', badges: [], tags: ['premium'], delivery: true, pickup: true },
    { id: 49, storeId: 20, name: 'Сет "Филадельфия"', price: 890, active: true, orders: 38, image: 'assets/img/product-49.webp', badges: [{ type: 'sale', label: 'Акция' }], tags: ['combo','sale'], delivery: true, pickup: true },
    { id: 50, storeId: 21, name: 'Пицца Пепперони', price: 450, active: true, orders: 110, image: 'assets/img/product-50.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 51, storeId: 21, name: 'Пицца Маргарита', price: 390, active: true, orders: 88, image: 'assets/img/product-51.webp', badges: [], tags: ['kids'], delivery: true, pickup: true },
    { id: 52, storeId: 21, name: 'Пицца Четыре сыра', price: 520, active: true, orders: 64, image: 'assets/img/product-52.webp', badges: [], tags: ['premium'], delivery: true, pickup: true },
    { id: 53, storeId: 22, name: 'Пицца Гавайская', price: 420, active: true, orders: 73, image: 'assets/img/product-53.webp', badges: [], tags: ['combo'], delivery: true, pickup: true },
    { id: 54, storeId: 22, name: 'Пицца Мясная', price: 490, active: true, orders: 56, image: 'assets/img/product-54.webp', badges: [], tags: ['hot','grill'], delivery: true, pickup: true },
    { id: 55, storeId: 22, name: 'Пицца с грибами', price: 380, active: true, orders: 47, image: 'assets/img/product-55.webp', badges: [], tags: ['eco'], delivery: true, pickup: true },
    { id: 56, storeId: 23, name: 'Пицца Домашняя', price: 350, active: true, orders: 62, image: 'assets/img/product-56.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: false },
    { id: 57, storeId: 23, name: 'Чесночные гренки', price: 120, active: true, orders: 55, image: 'assets/img/product-57.webp', badges: [], tags: ['combo'], delivery: true, pickup: false },
    { id: 58, storeId: 23, name: 'Салат Цезарь', price: 280, active: true, orders: 48, image: 'assets/img/product-58.webp', badges: [], tags: ['fresh'], delivery: true, pickup: false },
    { id: 59, storeId: 24, name: 'Биф Бургер классический', price: 290, active: true, orders: 95, image: 'assets/img/product-59.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit','grill'], delivery: true, pickup: true },
    { id: 60, storeId: 24, name: 'Чизбургер', price: 250, active: true, orders: 82, image: 'assets/img/product-60.webp', badges: [], tags: ['kids'], delivery: true, pickup: true },
    { id: 61, storeId: 24, name: 'Картошка фри', price: 120, active: true, orders: 110, image: 'assets/img/product-61.webp', badges: [], tags: ['combo'], delivery: true, pickup: true },
    { id: 62, storeId: 25, name: 'Бургер с беконом', price: 350, active: true, orders: 71, image: 'assets/img/product-62.webp', badges: [], tags: ['grill','hot'], delivery: true, pickup: true },
    { id: 63, storeId: 25, name: 'Дабл бургер', price: 420, active: true, orders: 55, image: 'assets/img/product-63.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 64, storeId: 25, name: 'Куриные крылья', price: 290, oldPrice: 340, active: true, orders: 63, image: 'assets/img/product-64.webp', badges: [{ type: 'sale', label: 'Акция' }], tags: ['sale','grill'], delivery: true, pickup: true },
    { id: 65, storeId: 26, name: 'Чизбургер де люкс', price: 320, active: true, orders: 48, image: 'assets/img/product-65.webp', badges: [], tags: ['premium'], delivery: true, pickup: false },
    { id: 66, storeId: 26, name: 'Бургер веганский', price: 280, active: true, orders: 32, image: 'assets/img/product-66.webp', badges: [], tags: ['vegan','eco'], delivery: true, pickup: false },
    { id: 67, storeId: 26, name: 'Наггетсы', price: 160, active: true, orders: 74, image: 'assets/img/product-67.webp', badges: [], tags: ['kids','combo'], delivery: true, pickup: false },
    { id: 68, storeId: 27, name: 'Молоко 1л', price: 85, active: true, orders: 140, image: 'assets/img/product-68.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 69, storeId: 27, name: 'Яйца 10шт', price: 95, active: true, orders: 120, image: 'assets/img/product-69.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 70, storeId: 27, name: 'Хлеб белый', price: 45, active: true, orders: 160, image: 'assets/img/product-70.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 71, storeId: 27, name: 'Вода 1.5л', price: 35, active: true, orders: 200, image: 'assets/img/product-71.webp', badges: [], tags: ['fresh'], delivery: true, pickup: true },
    { id: 72, storeId: 28, name: 'Салат Греческий', price: 220, active: true, orders: 66, image: 'assets/img/product-72.webp', badges: [], tags: ['healthy','fresh'], delivery: true, pickup: true },
    { id: 73, storeId: 28, name: 'Яблоки 1кг', price: 120, active: true, orders: 84, image: 'assets/img/product-73.webp', badges: [], tags: ['eco','healthy'], delivery: true, pickup: true },
    { id: 74, storeId: 28, name: 'Сок свежевыжатый', price: 180, active: true, orders: 72, image: 'assets/img/product-74.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['fresh','new'], delivery: true, pickup: true },
    { id: 75, storeId: 29, name: 'Киноа 500г', price: 280, active: true, orders: 38, image: 'assets/img/product-75.webp', badges: [], tags: ['eco','healthy','premium'], delivery: true, pickup: false },
    { id: 76, storeId: 29, name: 'Тофу натуральный', price: 150, active: true, orders: 44, image: 'assets/img/product-76.webp', badges: [], tags: ['vegan','eco'], delivery: true, pickup: false },
    { id: 77, storeId: 29, name: 'Мёд гречишный', price: 350, active: true, orders: 55, image: 'assets/img/product-77.webp', badges: [], tags: ['eco','premium'], delivery: true, pickup: false },
    { id: 78, storeId: 30, name: 'Витамин C 100мг', price: 320, active: true, orders: 67, image: 'assets/img/product-78.webp', badges: [], tags: ['healthy'], delivery: true, pickup: true },
    { id: 79, storeId: 30, name: 'Масло облепиховое', price: 180, active: true, orders: 43, image: 'assets/img/product-79.webp', badges: [], tags: ['eco'], delivery: true, pickup: true },
    { id: 80, storeId: 30, name: 'Пластырь набор', price: 90, active: true, orders: 38, image: 'assets/img/product-80.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 81, storeId: 31, name: 'Антисептик гель', price: 150, active: true, orders: 92, image: 'assets/img/product-81.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 82, storeId: 31, name: 'Бинт стерильный', price: 45, active: true, orders: 55, image: 'assets/img/product-82.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 83, storeId: 31, name: 'Аспирин', price: 120, active: true, orders: 74, image: 'assets/img/product-83.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 84, storeId: 32, name: 'Вино красное сухое', price: 650, active: true, orders: 62, image: 'assets/img/product-84.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['premium','hit'], delivery: true, pickup: true },
    { id: 85, storeId: 32, name: 'Шампанское брют', price: 890, active: true, orders: 48, image: 'assets/img/product-85.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['premium','new'], delivery: true, pickup: true },
    { id: 86, storeId: 32, name: 'Набор сыров к вину', price: 420, active: true, orders: 44, image: 'assets/img/product-86.webp', badges: [], tags: ['combo','premium'], delivery: true, pickup: true },
    { id: 87, storeId: 33, name: 'Пиво светлое 0.5л', price: 120, active: true, orders: 110, image: 'assets/img/product-87.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit'], delivery: true, pickup: true },
    { id: 88, storeId: 33, name: 'Пиво тёмное 0.5л', price: 130, active: true, orders: 85, image: 'assets/img/product-88.webp', badges: [], tags: [], delivery: true, pickup: true },
    { id: 89, storeId: 33, name: 'Орешки к пиву', price: 80, active: true, orders: 98, image: 'assets/img/product-89.webp', badges: [], tags: ['combo'], delivery: true, pickup: true },
    { id: 90, storeId: 34, name: 'Конфеты ассорти', price: 380, active: true, orders: 56, image: 'assets/img/product-90.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit','premium'], delivery: true, pickup: true },
    { id: 91, storeId: 34, name: 'Зефир ванильный', price: 150, active: true, orders: 72, image: 'assets/img/product-91.webp', badges: [], tags: ['kids','eco'], delivery: true, pickup: true },
    { id: 92, storeId: 34, name: 'Мармелад жевательный', price: 120, active: true, orders: 88, image: 'assets/img/product-92.webp', badges: [], tags: ['kids'], delivery: true, pickup: true },
    { id: 93, storeId: 35, name: 'Шоколад ручной работы', price: 280, active: true, orders: 47, image: 'assets/img/product-93.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['premium','new'], delivery: true, pickup: false },
    { id: 94, storeId: 35, name: 'Конфеты трюфели', price: 420, active: true, orders: 35, image: 'assets/img/product-94.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['premium','hit'], delivery: true, pickup: false },
    { id: 95, storeId: 35, name: 'Пряничный набор', price: 250, active: true, orders: 28, image: 'assets/img/product-95.webp', badges: [], tags: ['eco','season'], delivery: true, pickup: false },
    { id: 96, storeId: 36, name: 'Лапша с курицей', price: 290, active: true, orders: 78, image: 'assets/img/product-96.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit','hot'], delivery: true, pickup: true },
    { id: 97, storeId: 36, name: 'Рис с овощами', price: 220, active: true, orders: 55, image: 'assets/img/product-97.webp', badges: [], tags: ['vegan','healthy'], delivery: true, pickup: true },
    { id: 98, storeId: 36, name: 'Том Ям суп', price: 380, active: true, orders: 44, image: 'assets/img/product-98.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['spicy','new'], delivery: true, pickup: true },
    { id: 99, storeId: 37, name: 'Кимчи классическая', price: 180, active: true, orders: 48, image: 'assets/img/product-99.webp', badges: [], tags: ['spicy','eco'], delivery: true, pickup: true },
    { id: 100, storeId: 37, name: 'Поке с лососем', price: 350, active: true, orders: 62, image: 'assets/img/product-100.webp', badges: [{ type: 'hit', label: 'Хит' }], tags: ['hit','fresh'], delivery: true, pickup: true },
    { id: 101, storeId: 37, name: 'Бибимбап', price: 320, active: true, orders: 33, image: 'assets/img/product-101.webp', badges: [{ type: 'new', label: 'Новинка' }], tags: ['hot','new'], delivery: true, pickup: true }
  ],

  orders: [
    { id: 312, storeId: 1, store: 'Пекарня #23', icon: 'bread', amount: 1200, status: 'preparing', items: ['Круассан ×2', 'Багет ×1'], time: '15 мин', date: 'сегодня' },
    { id: 311, storeId: 2, store: 'Цветы Fresh', icon: 'flower', amount: 2300, status: 'delivering', items: ['Букет "Нежность" ×1'], time: '20 мин', date: 'сегодня' },
    { id: 310, storeId: 3, store: 'Кофе daily', icon: 'coffee', amount: 560, status: 'delivered', items: ['Капучино ×2', 'Круассан ×1'], time: null, date: 'вчера' },
    { id: 309, storeId: 1, store: 'Пекарня #23', icon: 'bread', amount: 890, status: 'delivered', items: ['Эклер ×1', 'Багет ×2'], time: null, date: 'вчера' }
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
    statusIcon: 'star',
    points: 24,
    pointsToNext: 30,
    nextStatus: 'mayor',
    nextIcon: 'award',
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
  },

  governor: {
    cities: ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'],
    metrics: {}
  }
}

function _storeCategory(cat) {
  const MAP = {
    bakery: 'Выпечка', flowers: 'Цветы', coffee: 'Кофе',
    restaurant: 'Ресторан', sushi: 'Суши', pizza: 'Пицца',
    burger: 'Бургеры', grocery: 'Продукты', pharmacy: 'Аптеки',
    alcohol: 'Алкоголь', sweets: 'Сладости', asian: 'Азиатская'
  }
  return MAP[cat] || 'Магазин'
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

function getProducts() {
  return MOCK.products
}

function getProductStoreName(storeId) {
  const s = MOCK.stores.find(s => s.id === storeId)
  return s ? s.name : ''
}
