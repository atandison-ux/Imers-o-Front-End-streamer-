// Importa os dados das categorias que serão exibidas no catálogo.
import { categories } from './data.js';

// Importa a função que cria o carrossel visual para cada categoria.
import { createCarousel } from './components/Carousel.js';

// Aguarda o carregamento completo do HTML antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o perfil ativo usando o gerenciador principal da aplicação.
    const activeProfile = window.ProfileManager?.getActiveProfile?.();
    const nomePerfil = activeProfile?.name || localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = activeProfile?.image || localStorage.getItem('perfilAtivoImagem');

    // Se existir um perfil salvo, atualiza as informações visuais no topo da página.
    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        // Atualiza o nome do perfil exibido.
        if (kidsLink) kidsLink.textContent = nomePerfil;

        // Atualiza a imagem do perfil exibida.
        if (profileIcon) {
            profileIcon.src = imagemPerfil;
            profileIcon.alt = `Perfil de ${nomePerfil}`;
        }
    }

    // Seleciona o container principal onde os carrosséis serão inseridos.
    const container = document.getElementById('main-content');
    
    // Se o container existir, cria e adiciona um carrossel para cada categoria.
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
