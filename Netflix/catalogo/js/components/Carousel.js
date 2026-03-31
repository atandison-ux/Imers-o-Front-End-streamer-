// Importa a função responsável por criar cada card de filme/série.
import { createCard } from './Card.js';

// Cria um carrossel a partir de uma categoria recebida.
export function createCarousel(category) {
    // Cria a seção principal que envolve todo o carrossel.
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Cria o cabeçalho que contém o título e os indicadores.
    const header = document.createElement('div');
    header.className = 'slider-header';

    // Define o título da categoria.
    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title;

    // Cria a área onde os indicadores visuais do carrossel podem ser exibidos.
    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    // Monta o cabeçalho e adiciona na seção principal.
    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Cria a linha onde os cards serão renderizados.
    const row = document.createElement('div');
    row.className = 'movie-row';

    // Percorre os itens da categoria e cria um card para cada um.
    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    // Adiciona a linha de cards à seção e retorna o carrossel completo.
    section.appendChild(row);
    return section;
}
