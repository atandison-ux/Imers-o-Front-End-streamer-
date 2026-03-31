// Função para inicializar o tema
function initTheme() {
  // Verificar se há uma preferência salva no localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Se não houver, verificar a preferência do sistema
  const prefersCold = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = savedTheme || (prefersCold ? 'light' : 'dark');
  
  // Aplicar o tema
  applyTheme(theme);
}

// Função para aplicar o tema
function applyTheme(theme) {
  const html = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  
  if (theme === 'light') {
    html.classList.add('light-mode');
    if (toggleButton) toggleButton.querySelector('.toggle-icon').textContent = '☀️';
  } else {
    html.classList.remove('light-mode');
    if (toggleButton) toggleButton.querySelector('.toggle-icon').textContent = '🌙';
  }
  
  // Salvar no localStorage
  localStorage.setItem('theme', theme);
}

// Função para alternar tema
function toggleTheme() {
  const html = document.documentElement;
  const isLightMode = html.classList.contains('light-mode');
  const newTheme = isLightMode ? 'dark' : 'light';
  
  applyTheme(newTheme);
}

// Inicializar tema quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Adicionar event listener ao botão de toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
  }
});

// Responder a mudanças de preferência do sistema
window.matchMedia('(prefers-color-scheme: light)').addListener(function(e) {
  const savedTheme = localStorage.getItem('theme');
  // Só aplicar mudança de sistema se o usuário não tiver feito uma escolha explícita
  if (!savedTheme) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});
