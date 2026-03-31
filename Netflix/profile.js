const ACTIVE_PROFILE_KEY = 'activeProfile';

// Função para salvar o perfil ativo no localStorage
function saveActiveProfile(name, imageSrc) {
  if (!name || !imageSrc) return;

  const profileData = {
    name: name,
    image: imageSrc,
    timestamp: new Date().toISOString()
  };

  // Salva no formato principal usado pelo projeto.
  localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(profileData));

  // Mantém compatibilidade com chaves antigas já usadas em outras páginas.
  localStorage.setItem('perfilAtivoNome', name);
  localStorage.setItem('perfilAtivoImagem', imageSrc);
}

// Função para obter o perfil ativo do localStorage
function getActiveProfile() {
  const profileData = localStorage.getItem(ACTIVE_PROFILE_KEY);

  if (profileData) {
    try {
      return JSON.parse(profileData);
    } catch (error) {
      console.error('Erro ao ler o perfil ativo:', error);
    }
  }

  // Fallback para o formato antigo, se existir.
  const legacyName = localStorage.getItem('perfilAtivoNome');
  const legacyImage = localStorage.getItem('perfilAtivoImagem');

  if (legacyName && legacyImage) {
    return {
      name: legacyName,
      image: legacyImage
    };
  }

  return null;
}

// Função para atualizar a exibição do perfil na página
function updateProfileDisplay() {
  const profile = getActiveProfile();

  if (!profile) {
    return;
  }

  const profileNameElement = document.getElementById('profile-name');
  if (profileNameElement) {
    profileNameElement.textContent = profile.name;
  }

  const profileImageElement = document.getElementById('profile-image');
  if (profileImageElement) {
    profileImageElement.src = profile.image;
    profileImageElement.alt = `Perfil de ${profile.name}`;
  }
}

// Função para lidar com o clique nos perfis
function handleProfileClick(event) {
  const profileLink = event.currentTarget;
  const name = profileLink.dataset.name;
  const imageSrc = profileLink.dataset.image;

  if (name && imageSrc) {
    saveActiveProfile(name, imageSrc);
    // Redirecionamento natural via href do link
  }
}

function initProfileSelection() {
  const profileLinks = document.querySelectorAll('.profile-link');
  profileLinks.forEach(link => {
    link.addEventListener('click', handleProfileClick);
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  initProfileSelection();
  updateProfileDisplay();
});

// Função para limpar o perfil ativo (opcional, para logout)
function clearActiveProfile() {
  localStorage.removeItem(ACTIVE_PROFILE_KEY);
  localStorage.removeItem('perfilAtivoNome');
  localStorage.removeItem('perfilAtivoImagem');
}

// Se não houver perfil ativo, redireciona para a página inicial
function ensureActiveProfileOrRedirect(redirectUrl = '../index.html') {
  const profile = getActiveProfile();
  if (!profile) {
    window.location.href = redirectUrl;
    return false;
  }
  return true;
}

// Exportar funções para uso global (opcional)
window.ProfileManager = {
  saveActiveProfile,
  getActiveProfile,
  updateProfileDisplay,
  clearActiveProfile,
  ensureActiveProfileOrRedirect
};
