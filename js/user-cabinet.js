// js/user-cabinet.js

document.addEventListener('DOMContentLoaded', () => {
  // Меню шапки: сделаем переключение активности ссылок (если хотите, можно расширить под SPA)
  const navLinks = document.querySelectorAll('header nav.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // Можно добавить переключение контента по ссылкам, если реализовать SPA
      e.preventDefault(); // Чтобы не переходить по ссылкам пока не добавлено SPA
    });
  });

  // Кнопка выхода
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      alert('Вы вышли из аккаунта');
      // Здесь ваша логика логаута (обнуление сессии, переход)
      window.location.href = 'index.html';
    });
  }

  // История операций и фильтрация по неделям/месяцам
  const operationsList = document.getElementById('operationsList');
  const filterPeriod = document.getElementById('filterPeriod');

  const operations = [
    { date: '2025-11-01', description: 'Покупка в магазине А', points: -500 },
    { date: '2025-11-03', description: 'Начисление баллов', points: 1500 },
    { date: '2025-10-27', description: 'Покупка в ресторане Б', points: -300 },
    { date: '2025-10-15', description: 'Начисление баллов', points: 1200 },
    { date: '2025-10-10', description: 'Пополнение счета', points: 5000 }
  ];

  function formatDate(d) {
    const date = new Date(d);
    const dd = ('0' + date.getDate()).slice(-2);
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  function renderOperations(period) {
    let groupedOps = {};

    operations.forEach(op => {
      const date = new Date(op.date);
      let key;
      if (period === 'week') {
        const onejan = new Date(date.getFullYear(), 0, 1);
        const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        key = `${date.getFullYear()}-W${week}`;
      } else {
        key = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
      }
      if (!groupedOps[key]) groupedOps[key] = [];
      groupedOps[key].push(op);
    });

    operationsList.innerHTML = '';

    Object.keys(groupedOps).sort((a,b) => b.localeCompare(a)).forEach(group => {
      const groupTitle = document.createElement('li');
      groupTitle.textContent = period === 'week' ?
        `Неделя ${group.split('-W')[1]} (${group.split('-W')[0]})` :
        `Месяц ${group.split('-')[1]} ${group.split('-')[0]}`;
      groupTitle.style.fontWeight = '700';
      groupTitle.style.marginTop = '1rem';
      operationsList.appendChild(groupTitle);

      groupedOps[group].forEach(op => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = `${formatDate(op.date)} - ${op.description} ${op.points > 0 ? '+' : ''}${op.points} баллов`;
        operationsList.appendChild(li);
      });
    });
  }

  renderOperations(filterPeriod.value);

  filterPeriod.addEventListener('change', (e) => {
    renderOperations(e.target.value);
  });
});
