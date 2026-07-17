/* ===== Promo Screen (#promo) ===== */

function screenPromo() {
  const promoProducts = getProducts().filter(p => p.active && p.badges?.some(b => b.type === 'top'))
  const productsHtml = promoProducts
    .map(p => ProductCard({ ...p, storeName: getProductStoreName(p.storeId) }, { cart: getCart() }))
    .join('')

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="home" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">Спецпредложения</span>
    </div>
    <div class="section-pad">
      ${PromoBanner({
        title: 'Пекарня #23',
        subtitle: 'Скидка 20% на выпечку до 18:00',
        timerEnd: '18:00',
        actionLabel: 'Заказать',
        actionNav: 'store/1'
      })}
    </div>
    <div class="section-label">Акционные товары</div>
    <div class="product-grid">${productsHtml || `<div class="empty-state">Нет активных акций</div>`}</div>`
}