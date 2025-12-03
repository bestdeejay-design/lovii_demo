// header.js
document.getElementById('header').innerHTML = `
  <header class="header">
    <div class="header-container">
      <div class="logo">Лови</div>
      <button id="menuToggle" class="menu-toggle" aria-label="Открыть меню">☰</button>
      <nav class="nav" id="navMenu">
        <a href="/" class="nav-link">Главная</a>
        <a href="/catalog.html" class="nav-link">Каталог</a>
        <a href="/partners.html" class="nav-link">Партнерам</a>
        <a href="/login.html" class="nav-link">Войти</a>
      </nav>
      <div class="theme-switcher">
        <button id="themeToggle" class="theme-toggle" aria-label="Переключить тему">🌙</button>
        <div class="theme-dropdown" id="themeDropdown">
          <button class="theme-option light-theme" data-theme="light" aria-label="Светлая тема">☀️</button>
          <button class="theme-option dark-theme" data-theme="dark" aria-label="Темная тема">🌙</button>
          <button class="theme-option bright-theme" data-theme="bright" aria-label="Яркая тема">💡</button>
        </div>
      </div>
    </div>
  </header>
`;
