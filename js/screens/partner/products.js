/* ===== Партнёр — Товары ===== */

function screenPartnerProducts() {
  const products = getStoreProducts(1)

  let html = ''
  products.forEach(p => {
    html += POrder(p.id, p.name, p.price + '₽', p.active ? 'Активен' : 'Скрыт', p.active ? 'success' : 'gray')
  })

  return `
    <div style="display:flex;gap:6px;padding:0 16px;">
      ${QuickBtn('plus', 'Добавить товар')}
    </div>
    <div style="height:8px;"></div>
    <div class="section-label">Товары (${products.length})</div>
    <div class="section-pad">${html}</div>
  `
}
