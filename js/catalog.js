// catalog.js - функции для каталога предложений

// Пример данных для каталога
const catalogData = {
  all: [
    { id: 1, title: "Скидка 20% на ужины", description: "Получите скидку 20% на все ужины в ресторанах-партнерах", category: "restaurants", cashback: "до 10% ЛОВИ", partner: "Ресторан У моря", rating: 4.8 },
    { id: 2, title: "Бесплатная доставка", description: "Бесплатная доставка при заказе от 1000 рублей", category: "services", cashback: "до 5% ЛОВИ", partner: "Доставка Plus", rating: 4.5 },
    { id: 3, title: "Скидка на курсы", description: "Скидка 15% на все онлайн-курсы", category: "education", cashback: "до 20% ЛОВИ", partner: "Школа программирования", rating: 4.9 },
    { id: 4, title: "Кэшбэк на топливо", description: "Кэшбэк до 7% на заправках партнеров", category: "services", cashback: "до 7% ЛОВИ", partner: "АЗС Network", rating: 4.6 },
    { id: 5, title: "Подарочная карта", description: "Подарочная карта 1000 рублей за 800", category: "finance", cashback: "до 15% ЛОВИ", partner: "Финансовый сервис", rating: 4.7 },
    { id: 6, title: "Скидка на кофе", description: "Вторая чашка кофе в подарок", category: "restaurants", cashback: "до 8% ЛОВИ", partner: "Кофейня на углу", rating: 4.4 },
    { id: 7, title: "Фитнес-программа", description: "Скидка 25% на абонемент в фитнес-клуб", category: "services", cashback: "до 12% ЛОВИ", partner: "Фитнес-центр Active", rating: 4.7 },
    { id: 8, title: "Медицинская страховка", description: "Скидка на полис медицинского страхования", category: "finance", cashback: "до 18% ЛОВИ", partner: "МедСтрах", rating: 4.6 }
  ],
  restaurants: [
    { id: 1, title: "Скидка 20% на ужины", description: "Получите скидку 20% на все ужины в ресторанах-партнерах", category: "restaurants", cashback: "до 10% ЛОВИ", partner: "Ресторан У моря", rating: 4.8 },
    { id: 6, title: "Скидка на кофе", description: "Вторая чашка кофе в подарок", category: "restaurants", cashback: "до 8% ЛОВИ", partner: "Кофейня на углу", rating: 4.4 }
  ],
  services: [
    { id: 2, title: "Бесплатная доставка", description: "Бесплатная доставка при заказе от 1000 рублей", category: "services", cashback: "до 5% ЛОВИ", partner: "Доставка Plus", rating: 4.5 },
    { id: 4, title: "Кэшбэк на топливо", description: "Кэшбэк до 7% на заправках партнеров", category: "services", cashback: "до 7% ЛОВИ", partner: "АЗС Network", rating: 4.6 },
    { id: 7, title: "Фитнес-программа", description: "Скидка 25% на абонемент в фитнес-клуб", category: "services", cashback: "до 12% ЛОВИ", partner: "Фитнес-центр Active", rating: 4.7 }
  ],
  education: [
    { id: 3, title: "Скидка на курсы", description: "Скидка 15% на все онлайн-курсы", category: "education", cashback: "до 20% ЛОВИ", partner: "Школа программирования", rating: 4.9 }
  ],
  finance: [
    { id: 5, title: "Подарочная карта", description: "Подарочная карта 1000 рублей за 800", category: "finance", cashback: "до 15% ЛОВИ", partner: "Финансовый сервис", rating: 4.7 },
    { id: 8, title: "Медицинская страховка", description: "Скидка на полис медицинского страхования", category: "finance", cashback: "до 18% ЛОВИ", partner: "МедСтрах", rating: 4.6 }
  ]
};

// Функция для отображения карточек предложений
function displayOffers(offers, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (offers.length === 0) {
    container.innerHTML = '<p class="no-offers">Предложений в данной категории пока нет.</p>';
    return;
  }

  offers.forEach(offer => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <div class="offer-header">
        <h3>${offer.title}</h3>
        <div class="rating">⭐ ${offer.rating}</div>
      </div>
      <p>${offer.description}</p>
      <div class="offer-details">
        <div class="partner">Партнер: ${offer.partner}</div>
        <div class="cashback-info">${offer.cashback}</div>
      </div>
      <button class="btn btn-primary">Получить предложение</button>
    `;
    container.appendChild(card);
  });
}

// Инициализация каталога
document.addEventListener('DOMContentLoaded', function() {
  // Отображаем топ предложения
  displayOffers(catalogData.all.slice(0, 6), 'topOffersContainer');

  // Отображаем все предложения по умолчанию
  displayOffers(catalogData.all, 'category-content');

  // Обработчики кнопок категорий
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем активный класс у всех кнопок
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс к нажатой кнопке
      this.classList.add('active');

      // Получаем категорию
      const category = this.getAttribute('data-cat');

      // Отображаем соответствующие предложения
      if (category === 'all') {
        displayOffers(catalogData.all, 'category-content');
      } else {
        displayOffers(catalogData[category], 'category-content');
      }
    });
  });
});