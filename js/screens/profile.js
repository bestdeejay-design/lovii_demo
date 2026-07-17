/* ===== Профиль + выбор роли ===== */

function screenProfile() {
  const currentRole = LOVII.state.role
  const u = MOCK.user

  const roles = [
    { iconName: 'user', name: 'Клиент', desc: 'Покупайте в магазинах', value: 'client' },
    { iconName: 'store', name: 'Партнёр', desc: 'Управляйте точкой', value: 'partner' },
    { iconName: 'building', name: 'Представитель', desc: 'Развивайте сеть', value: 'rep' },
    { iconName: 'users', name: 'Амбасадор', desc: 'Управляйте регионом', value: 'ambassador' }
  ]

  let roleCards = ''
  roles.forEach(r => {
    const isActive = currentRole === r.value
    roleCards += `
      <div class="role-card${isActive ? ' active' : ''}" data-role="${r.value}">
        <div class="role-icon">${Icon(r.iconName)}</div>
        <div class="role-name">${r.name}</div>
        <div class="role-desc">${r.desc}</div>
      </div>`
  })

  const dashLinks = {
    client: 'home',
    partner: 'partner',
    rep: 'rep',
    ambassador: 'ambassador'
  }

  return `
    ${ProfileBanner(u.name, u.phone)}
    <div style="padding:8px 16px;">
      <div class="section-label" style="padding:0 0 6px;">Я —</div>
    </div>
    <div class="role-grid">
      ${roleCards}
    </div>
    <div class="section-pad" style="padding-top:0;margin-top:0;">
      <button class="btn btn-primary btn-block" id="go-to-dashboard" style="margin-top:0;">
        ${Icon('arrow-left')} Перейти в кабинет
      </button>
    </div>
    <div style="height:8px;"></div>
    <div class="menu-list">
      ${MenuItem('star', 'pink', 'Бонусы и баллы', u.bonusBalance.toLocaleString() + ' баллов')}
      ${MenuItem('shopping-bag', 'tiffany', 'Избранное', 'Пекарня #23, Цветы Fresh')}
      ${MenuItem('settings', 'pink', 'Настройки', '')}
      ${MenuItem('log-out', 'chiffon-bg', 'Выйти', '')}
    </div>
  `
}
