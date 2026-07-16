/* ===== Представитель — Профиль ===== */

function screenRepProfile() {
  const r = MOCK.rep
  const statusName = 'Цифровой ' + r.status.charAt(0).toUpperCase() + r.status.slice(1)

  return `
    ${ProfileBanner(r.name, r.phone)}
    <div class="section-pad" style="padding-top:8px;">
      <div class="card">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="font-size:28px;">${r.statusEmoji}</div>
          <div>
            <div style="font-size:13px;font-weight:600;">${statusName}</div>
            <div style="font-size:10px;color:var(--text-secondary);">${r.points} баллов · код: LOVII-${String(r.points).padStart(4, '0')}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-list">
      ${MenuItem('wallet', 'pink', 'Реквизиты', 'Привязана карта •••• 4523')}
      ${MenuItem('users', 'tiffany', 'Моя команда', r.stores.length + ' точек')}
      ${MenuItem('bar-chart', 'pink', 'Статистика', 'Общий доход ' + r.totalRevenue.toLocaleString() + '₽')}
      ${MenuItem('settings', 'tiffany', 'Настройки', '')}
    </div>
  `
}
