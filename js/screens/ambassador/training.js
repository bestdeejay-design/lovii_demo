/* ===== Амбасадор — Обучение ===== */

function screenAmbassadorTraining() {
  const materials = [
    { title: 'Как подключить новую точку', desc: 'Пошаговое руководство', icon: 'store', color: 'pink' },
    { title: 'Мотивация представителей', desc: 'Стратегии роста команды', icon: 'users', color: 'tiffany' },
    { title: 'Аналитика продаж', desc: 'Чтение отчётов и метрик', icon: 'bar-chart', color: 'pink' },
    { title: 'Скрипты общения', desc: 'Шаблоны для партнёров', icon: 'star', color: 'tiffany' }
  ]

  const html = materials.map(m =>
    MenuItem(m.icon, m.color, m.title, m.desc)
  ).join('')

  return `
    <div style="padding:16px;text-align:center;background:var(--surface-secondary);margin:0 16px;border-radius:var(--radius-lg);border:1px solid var(--border);">
      <div style="font-size:24px;margin-bottom:4px;">📚</div>
      <div style="font-size:13px;font-weight:600;">База знаний</div>
      <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">${materials.length} материалов для изучения</div>
    </div>
    <div style="height:8px;"></div>
    <div class="section-label">Материалы</div>
    <div class="menu-list">${html}</div>
  `
}
