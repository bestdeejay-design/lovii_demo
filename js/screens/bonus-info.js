/* ===== Bonus Info Screen (#bonus-info) ===== */

function screenBonusInfo() {
  const balance = getUser().bonusBalance || 0

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="profile" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">Бонусная программа</span>
    </div>
    <div class="section-pad">
      <div class="status-banner">
        <div class="icon-box pink" style="width:36px;height:36px;border-radius:10px">${Icon('gift', 'icon-lg')}</div>
        <div class="info">
          <div class="title">Ваш баланс</div>
          <div class="income">
            <div class="val">${balance.toLocaleString('ru-RU')} бонусов</div>
            <div class="lbl">Доступно к списанию</div>
          </div>
        </div>
      </div>
      <div class="section-label">Как заработать</div>
      <div class="section-pad">
        <div class="card">
          <div class="text"><div class="title">5% от каждого заказа</div><div class="sub">Бонус начисляется автоматически после доставки</div></div>
        </div>
        <div class="card">
          <div class="text"><div class="title">Бонусы за отзывы</div><div class="sub">50 бонусов за каждый подробный отзыв с фото</div></div>
        </div>
      </div>
      <div class="section-label">Как потратить</div>
      <div class="section-pad">
        <div class="card">
          <div class="text"><div class="title">До 30% от чека</div><div class="sub">Списание доступно при оформлении заказа</div></div>
        </div>
        <div class="card">
          <div class="text"><div class="title">Не сгорают при заказе</div><div class="sub">При покупке хотя бы раз в год</div></div>
        </div>
      </div>
      <div class="section-label">Уровни</div>
      <div class="section-pad">
        <div class="card"><div class="text"><div class="title">Silver</div><div class="sub">От 0 бонусов — базовые начисления</div></div></div>
        <div class="card"><div class="text"><div class="title">Gold</div><div class="sub">От 5 000 бонусов — +2% к начислению</div></div></div>
        <div class="card"><div class="text"><div class="title">Platinum</div><div class="sub">От 20 000 бонусов — +5% к начислению, приоритетная поддержка</div></div></div>
      </div>`
}

function getUser() {
  return MOCK?.user || { bonusBalance: 0 }
}