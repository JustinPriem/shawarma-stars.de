// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  initMenuTabs();
});

function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });
}
