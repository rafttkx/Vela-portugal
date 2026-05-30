# Ideias de Design - Vela Portugal

## Resposta 1: Minimalismo Náutico Moderno (Probabilidade: 0.08)

### Design Movement
Minimalismo contemporâneo com influências náuticas e de design de interface de navegação marítima.

### Core Principles
- **Clareza extrema**: Cada elemento tem um propósito funcional claro; sem decoração supérflua
- **Hierarquia visual através de espaço**: Uso generoso de whitespace para separar seções de dados
- **Tipografia precisa**: Fontes monoespaciais para dados técnicos, sans-serif limpa para contexto
- **Paleta reduzida**: Azul profundo (oceano), branco (vela), cinzento (neutro), com acentos em laranja (segurança/alerta)

### Color Philosophy
- **Azul profundo (#0A3A52)**: Confiança, oceano, profundidade
- **Branco (#FFFFFF)**: Pureza, vela, clareza
- **Cinzento carvão (#1A1A1A)**: Texto, contraste, estrutura
- **Laranja vibrante (#FF6B35)**: Alertas de vento forte, marés críticas
- **Cinzento claro (#E8E8E8)**: Divisores, backgrounds secundários

### Layout Paradigm
- **Grid assimétrico 3-coluna**: Coluna esquerda para seleção de locais (sidebar), coluna central para dados de vento (grande), coluna direita para marés (secundária)
- **Cards flutuantes**: Cada localidade é um card com dados em tempo real, sem bordas rígidas
- **Scroll horizontal para histórico**: Dados de 7 dias em scroll horizontal, não vertical

### Signature Elements
1. **Rosa dos ventos animada**: Indicador visual que roda conforme a direção do vento muda
2. **Gráfico de maré minimalista**: Linha simples que sobe/desce, sem preenchimento
3. **Ícones de estado**: Símbolos únicos para "maré subindo", "maré descendo", "vento calmo", "vento forte"

### Interaction Philosophy
- **Transições suaves**: Mudança de dados com fade-in/fade-out (200ms)
- **Hover revela detalhes**: Passar o rato sobre um local mostra histórico de 24h
- **Clique para fixar**: Selecionar um local o fixa na tela, permitindo comparação com outros
- **Atualização silenciosa**: Dados atualizam a cada 15 minutos sem notificação visual intrusiva

### Animation
- Rosa dos ventos: rotação suave contínua (3s por volta completa)
- Gráfico de maré: animação de desenho ao carregar (1.5s)
- Cards: entrada com slide-up + fade (300ms, ease-out)
- Indicadores de alerta: pulse suave quando vento > 25 km/h

### Typography System
- **Display**: Poppins Bold 32px (títulos de seção)
- **Heading**: Poppins SemiBold 20px (nome do local)
- **Body**: Inter Regular 14px (descrição, contexto)
- **Data**: IBM Plex Mono 16px (velocidade do vento, altura da maré)
- **Small**: Inter Regular 12px (timestamps, unidades)

---

## Resposta 2: Brutalism Digital com Dados Crus (Probabilidade: 0.07)

### Design Movement
Brutalism digital: estrutura exposta, tipografia pesada, dados como arte, rejeição de suavidade.

### Core Principles
- **Tipografia como estrutura**: Fontes grandes e pesadas definem o layout
- **Dados brutos visíveis**: Números grandes, sem gráficos decorativos
- **Contraste máximo**: Preto e branco, sem tons intermédios
- **Bordas definidas**: Linhas retas, ângulos agudos, sem arredondamentos

### Color Philosophy
- **Preto absoluto (#000000)**: Fundo, autoridade
- **Branco absoluto (#FFFFFF)**: Texto, dados
- **Vermelho vibrante (#FF0000)**: Alertas críticos (vento > 30 km/h)
- **Verde (#00FF00)**: Condições ideais para vela
- **Amarelo (#FFFF00)**: Condições moderadas

### Layout Paradigm
- **Tabela de dados bruta**: Linhas e colunas sem células definidas, apenas separadores
- **Tipografia como divisor**: Tamanho de fonte define hierarquia, não cores
- **Full-width sem margens**: Dados ocupam toda a largura, sem contentor
- **Timestamps em destaque**: Data/hora de cada leitura em tamanho grande

### Signature Elements
1. **Números gigantes**: Velocidade do vento em 72px, altura da maré em 64px
2. **Setas direcionais crus**: Setas ASCII-like para indicar direção do vento
3. **Grid de texto**: Dados organizados em grid tipográfico, sem ícones

### Interaction Philosophy
- **Sem animação**: Transições instantâneas, dados aparecem/desaparecem
- **Clique para expandir**: Expandir linha mostra histórico em tabela adicional
- **Modo "raw data"**: Opção para ver JSON bruto de cada localidade
- **Atualização visível**: Indicador de "UPDATED 2 min ago" em destaque

### Animation
- Nenhuma animação suave; transições instantâneas (0ms)
- Fade de 100ms apenas para mudança de página
- Pulse em vermelho para alertas críticos (sem suavidade, on/off)

### Typography System
- **Display**: IBM Plex Mono Bold 96px (velocidade do vento)
- **Heading**: IBM Plex Mono Bold 48px (nome do local)
- **Body**: IBM Plex Mono Regular 18px (descrição)
- **Data**: IBM Plex Mono Bold 64px (altura da maré)
- **Small**: IBM Plex Mono Regular 12px (unidades, timestamps)

---

## Resposta 3: Realismo Orgânico com Texturas Naturais (Probabilidade: 0.06)

### Design Movement
Realismo digital com inspiração em cartografia histórica, texturas naturais, e ilustração náutica tradicional.

### Core Principles
- **Texturas como identidade**: Papel envelhecido, tinta, aquarela digital
- **Ilustração integrada**: Elementos visuais não são decoração, são dados
- **Paleta terrosa com acentos azuis**: Tons naturais com destaque para o oceano
- **Tipografia humanista**: Fontes com serifa para elegância, sans-serif para legibilidade

### Color Philosophy
- **Bege antigo (#F5E6D3)**: Fundo principal (papel envelhecido)
- **Azul profundo (#1B4965)**: Oceano, dados principais
- **Terracota (#C1666B)**: Alertas, vento forte
- **Verde sálvia (#4A7C59)**: Condições ideais
- **Cinzento quente (#8B8680)**: Texto secundário

### Layout Paradigm
- **Mapa como contexto**: Pequeno mapa de Portugal com pontos de localidades
- **Cards sobrepostos**: Cards com sombra e textura, dispostos como notas sobre um mapa
- **Sidebar com bússola**: Bússola visual que roda conforme o vento muda
- **Rodapé com legenda cartográfica**: Legenda estilo mapa antigo

### Signature Elements
1. **Bússola rosa animada**: Rosa dos ventos estilo cartografia histórica
2. **Ilustrações de estado do mar**: Pequenas ilustrações (ondas altas, ondas baixas, calmaria)
3. **Texturas de papel**: Fundo com padrão de papel envelhecido
4. **Ícones ilustrados**: Ícones desenhados à mão para cada tipo de alerta

### Interaction Philosophy
- **Hover revela história**: Passar o rato mostra histórico de 7 dias em gráfico suave
- **Clique para detalhe**: Expandir card mostra previsão de 5 dias
- **Transições fluidas**: Mudança de dados com dissolve suave (400ms)
- **Feedback tátil**: Efeito de "papel" ao clicar (som suave opcional)

### Animation
- Bússola: rotação suave contínua (5s por volta, ease-in-out)
- Gráfico de maré: animação de desenho com efeito de tinta (2s)
- Cards: entrada com scale-up suave + fade (400ms, ease-out)
- Ondas: animação suave de movimento vertical para indicar maré subindo/descendo

### Typography System
- **Display**: Playfair Display Bold 36px (títulos, nomes de locais)
- **Heading**: Lora SemiBold 24px (seções)
- **Body**: Lora Regular 16px (descrição, contexto)
- **Data**: Courier Prime Regular 18px (velocidade, altura - monoespacial para dados)
- **Small**: Lora Regular 13px (timestamps, unidades)

---

## Decisão Final
Será escolhida a **Resposta 1: Minimalismo Náutico Moderno** por oferecer o melhor equilíbrio entre:
- Funcionalidade clara para dados técnicos de vela
- Estética profissional e moderna
- Facilidade de implementação com React + Tailwind
- Escalabilidade para adicionar mais locais/funcionalidades
