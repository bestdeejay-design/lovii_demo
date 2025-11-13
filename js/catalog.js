const offersData = {
  // ... (данные категории ресторанов, услуг, образования, финансов аналогично ранее)
  restaurants: [
    {title: "Скидка 20% в ресторане «Итальянская кухня»", desc: "Скидка 20% на все пиццы и пасту в ресторане.", linkText: "Получить купон"},
    {title: "Бесплатный десерт в «Французской булочной»", desc: "Подарок — десерт при заказе от 1000 р.", linkText: "Получить подарок"},
    {title: "Кэшбек 10% в «Гриль ресторане»", desc: "Вернем 10% с каждого заказа на гриль-меню.", linkText: "Получить кэшбек"},
    {title: "Скидка на бизнес-ланч в «Суши-баре»", desc: "Скидка 15% на бизнес-ланчи с 12 до 15 часов.", linkText: "Получить скидку"},
    {title: "Акция в «Вегетарианском кафе»", desc: "При заказе от 800 рублей коктейль в подарок.", linkText: "Получить акцию"},
    {title: "Подарочный сертификат в «Ресторан сыров»", desc: "Сертификат на 500 рублей в подарок.", linkText: "Получить сертификат"},
    {title: "Кэшбек 5% в «Барбекю кафе»", desc: "Возврат 5% со всех оплат на мясные блюда.", linkText: "Получить кэшбек"},
    {title: "Скидка 10% в «Кофейне»", desc: "Скидка на все напитки и десерты.", linkText: "Получить скидку"},
    {title: "Бесплатная доставка в «Пицца экспресс»", desc: "Доставка бесплатно при заказе от 1500 р.", linkText: "Заказать"},
    {title: "Скидка на наборы в «Суши-клубе»", desc: "Скидка 12% на все наборы сегодня.", linkText: "Получить скидку"},
    {title: "Акция «Семейный вечер» в «Ресторане Пиццы»", desc: "Детям мороженое бесплатно.", linkText: "Подробнее"},
    {title: "Скидка 15% на завтраки в «Бранч кафе»", desc: "Скидка на все завтраки с 8 до 11 утра.", linkText: "Получить скидку"},
    {title: "Подарок при заказе в «Мексиканском ресторане»", desc: "При заказе коктейля — бесплатная закуска.", linkText: "Получить подарок"},
    {title: "Кэшбек 8% в «Американском баре»", desc: "Возврат с каждого заказа напитков.", linkText: "Получить кэшбек"},
    {title: "Скидка 10% при бронировании в «Ресторане у озера»", desc: "10% снижения цены при онлайн-бронировании.", linkText: "Забронировать"}
  ],
  services: [
    {title: "Уборка квартиры", desc: "Профессиональная уборка с кэшбеком 5%.", linkText: "Заказать"},
    {title: "Доставка продуктов", desc: "Бесплатная доставка при заказе от 2000 р.", linkText: "Заказать"},
    {title: "Курсы английского языка", desc: "Онлайн-курсы со скидкой 30%.", linkText: "Записаться"},
    {title: "Ремонт бытовой техники", desc: "Скидка до 15% на ремонт.", linkText: "Вызвать мастера"},
    {title: "Услуги такси", desc: "Кэшбек 7% на поездки по городу.", linkText: "Вызвать такси"},
    {title: "Перевозки грузов", desc: "Скидка 10% на услуги грузоперевозок.", linkText: "Оформить заказ"},
    {title: "Ремонт обуви", desc: "Скидка 10% и бонусы.", linkText: "Заказать ремонт"},
    {title: "Обучение вождению", desc: "Курс с кэшбеком до 20%.", linkText: "Записаться"},
    {title: "Онлайн-курсы программирования", desc: "Скидка до 25% на курсы.", linkText: "Начать обучение"},
    {title: "Доставка цветов", desc: "Скидка 15% на букеты при первом заказе.", linkText: "Заказать"},
    {title: "Спортивные секции", desc: "Пробные занятия бесплатно.", linkText: "Записаться"},
    {title: "Фотоуслуги", desc: "Кэшбек 5% на фотосессии.", linkText: "Забронировать"},
    {title: "Ремонт компьютеров", desc: "Скидка 15% на услуги ремонта.", linkText: "Заказать"},
    {title: "Услуги визажа", desc: "Скидка 10% при первом визите.", linkText: "Записаться"},
    {title: "Наставничество и коучинг", desc: "Скидка 20% на первую консультацию.", linkText: "Получить консультацию"}
  ],
  education: [
    {title: "Курс по маркетингу", desc: "Обучение со скидкой 30% на онлайн-курсы.", linkText: "Записаться"},
    {title: "Курс по дизайну", desc: "Интенсив с обратной связью от экспертов.", linkText: "Начать обучение"},
    {title: "Изучение языков", desc: "Языковые курсы со скидкой до 25%.", linkText: "Записаться"},
    {title: "Курс развития навыков", desc: "Скидка 20% на тренинги и мастер-классы.", linkText: "Узнать детали"},
    {title: "Курс программирования для начинающих", desc: "Обучение с практическими заданиями.", linkText: "Начать"}
  ],
  finance: [
    {title: "Кредитная карта Альфа-Банк", desc: "Кэшбек 1000 руб при оформлении карты.", linkText: "Оформить карту"},
    {title: "Дебетовая карта Сбербанк", desc: "Бонусы и кешбек на покупки.", linkText: "Оформить карту"},
    {title: "Кредитная карта Тинькофф", desc: "Кэшбек до 5% на все покупки.", linkText: "Подать заявку"},
    {title: "Вклады в ВТБ", desc: "Высокий процент и бонусы новым клиентам.", linkText: "Открыть вклад"},
    {title: "Ипотека Газпромбанк", desc: "Низкая ставка и рассрочка.", linkText: "Узнать условия"},
    {title: "Кэшбек по карте Райффайзен", desc: "До 10000 руб в подарок.", linkText: "Получить"},
    {title: "Преимум-карта Русский Стандарт", desc: "Максимальный кэшбек на все категории.", linkText: "Оформить"},
    {title: "Кредит на авто в Сетелем", desc: "Выгодные ставки на заем.", linkText: "Подать заявку"},
    {title: "Карты рассрочки в Хоум Кредит", desc: "Покупки в рассрочку без комиссий.", linkText: "Оформить карту"},
    {title: "Кэшбек от Почта Банка", desc: "Особые условия по кэшбеку.", linkText: "Получить"}
  ]
};

const topOffersData = [
  // ... (топ предложения, как было)
    {title: 'Кэшбек 1000 руб за карту банка', desc: 'Оформи карту и получи кэшбек 1000 рублей на счёт.', linkText: 'Получить предложение'},
    {title: 'Скидка на доставку еды', desc: 'Скидка 15% на доставку в ресторанах-партнёрах.', linkText: 'Получить скидку'},
    {title: 'Купон на услугу уборки', desc: 'Скидка 10% и кэшбек 5% на уборку квартиры.', linkText: 'Получить купон'},
    {title: 'Обучающий онлайн-курс', desc: 'Скидка 30% на курс по маркетингу.', linkText: 'Записаться'},
    {title: 'Бонус при оформлении карты', desc: 'Кэшбек 1500 рублей за новую карту.', linkText: 'Оформить карту'},
  ];



  function renderCards(container, items) {
    container.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'catalog-card';
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <a href="#" class="btn">${item.linkText}</a>
      `;
      container.appendChild(card);
    });
  }

  const topOffersContainer = document.getElementById('topOffersContainer');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const categoryContent = document.getElementById('category-content');

  if (topOffersContainer) {
    renderCards(topOffersContainer, topOffersData);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      let offersToShow;
      if (cat === 'all') offersToShow = [].concat(...Object.values(offersData));
      else offersToShow = [...offersData[cat]];

      shuffleArray(offersToShow);

      if (categoryContent) {
        renderCards(categoryContent, offersToShow);
        const categoryNav = document.getElementById('categoryNav');
        if (categoryNav) categoryNav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  if (categoryButtons.length) categoryButtons[0].click();
