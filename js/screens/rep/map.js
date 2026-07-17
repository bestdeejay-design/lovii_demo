/* ===== Governor Stub Screen (#rep/map) ===== */

function screenRepMap() {
  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="rep" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">Карта городов</span>
    </div>
    <div class="section-pad">
      <div class="status-banner">
        <div class="icon-box tiffany" style="width:36px;height:36px;border-radius:10px">${Icon('map-pin', 'icon-lg')}</div>
        <div class="info">
          <div class="title">Карта городов</div>
          <div class="sub">Раздел в разработке</div>
        </div>
      </div>
      <div class="section-label">Города присутствия</div>
      <div class="section-pad">
        ${(MOCK.governor?.cities || ['Москва','СПб','Казань','Екатеринбург','Новосибирск'])
          .map(c => `<div class="menu-item"><div class="icon-box dim">${Icon('map-pin','icon-sm')}</div><div class="text"><div class="title">${c}</div></div></div>`).join('')}
      </div>
    </div>`
}