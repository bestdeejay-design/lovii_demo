/* ===== City Select Screen (#city-select) ===== */

function screenCitySelect() {
  const currentCity = localStorage.getItem('lovii_city') || 'Москва'
  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск']

  const listHtml = cities.map(city => `
    <div class="menu-item" data-nav="home" data-city="${escapeHtml(city)}">
      <div class="icon-box dim">${Icon('map-pin', 'icon-sm')}</div>
      <div class="text">
        <div class="title">${city}${city === currentCity ? ' <span class="tag tag-success">Текущий</span>' : ''}</div>
      </div>
      <svg class="arrow"><use href="#i-chevron-right"/></svg>
    </div>`).join('')

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="home" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">Выбор города</span>
    </div>
    <div class="section-pad">
      <div class="menu-list">${listHtml}</div>
    </div>`
}