/* ===== Партнёр — Товары ===== */

function screenPartnerProducts() {
  const products = getStoreProducts(1)

  let html = ''
  products.forEach(p => {
    html += `
      <div class="p-order" style="cursor:default;">
        <div class="left">
          <div>
            <div class="oname">${p.name}</div>
            <div style="font-size:9px;color:var(--text-secondary);margin-top:1px;">${p.orders} заказов</div>
          </div>
        </div>
        <div class="right" style="gap:8px;">
          <span class="oprice">${p.price}₽</span>
          <span class="tag tag-${p.active ? 'success' : 'gray'}">${p.active ? 'Активен' : 'Скрыт'}</span>
        </div>
      </div>`
  })

  return `
    <div style="display:flex;gap:6px;padding:0 16px;">
      <button class="quick-btn" style="flex:1;">${Icon('plus', 'icon-sm')} Добавить товар</button>
    </div>
    <div style="height:8px;"></div>
    <div class="section-label">Товары (${products.length})</div>
    <div class="section-pad">${html}</div>
  `
}
