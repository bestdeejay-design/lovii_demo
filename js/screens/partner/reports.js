/* ===== Партнёр — Отчёты ===== */

function screenPartnerReports() {
  return `
    ${TabBar(['День', 'Неделя', 'Месяц'], 0)}
    <div style="padding:8px 16px;">
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <div style="font-size:11px;color:var(--text-secondary);">Выручка за сегодня</div>
            <div style="font-size:20px;font-weight:700;color:var(--pink);">28 800₽</div>
          </div>
          <div style="font-size:11px;color:var(--tiffany);font-weight:500;">+12% vs вчера</div>
        </div>
        <div style="display:flex;gap:4px;height:60px;align-items:flex-end;">
          <div style="flex:1;height:30%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:45%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:25%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:55%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:70%;background:var(--pink-mid);border-radius:4px;"></div>
          <div style="flex:1;height:60%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:85%;background:var(--pink);border-radius:4px;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;">
          <span style="font-size:8px;color:var(--text-dim);">Пн</span>
          <span style="font-size:8px;color:var(--text-dim);">Вт</span>
          <span style="font-size:8px;color:var(--text-dim);">Ср</span>
          <span style="font-size:8px;color:var(--text-dim);">Чт</span>
          <span style="font-size:8px;color:var(--text-dim);">Пт</span>
          <span style="font-size:8px;color:var(--text-dim);">Сб</span>
          <span style="font-size:8px;color:var(--pink);font-weight:600;">Вс</span>
        </div>
      </div>
    </div>
    <div class="section-label">Детализация</div>
    <div class="section-pad">
      ${POrder('', 'Заказ №315', '380₽', 'сегодня', 'gray')}
      ${POrder('', 'Заказ №314', '620₽', 'сегодня', 'gray')}
      ${POrder('', 'Заказ №313', '390₽', 'вчера', 'gray')}
    </div>
  `
}
