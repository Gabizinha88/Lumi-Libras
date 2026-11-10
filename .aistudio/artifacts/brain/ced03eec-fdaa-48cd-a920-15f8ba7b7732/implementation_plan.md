# Player Limpo do Alfabeto, Nova Aba de Fontes & Curiosidades e Menu Lateral Recolhível (Tela Cheia)

Plano detalhado para atender às três novas solicitações do usuário: isolamento do player de vídeo do alfabeto em MP4 direto (removendo a página do portal), substituição da aba "Pais & Educadores" por "Fontes & Curiosidades de Libras" com curiosidades ilustradas e créditos institucionais, e implementação de botão hambúrguer para recolher/expandir o menu lateral e permitir modo de tela cheia.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões confirmadas pelo usuário:**
> 1. **Comportamento do Menu Lateral Recolhível**:
>    - O menu lateral contará com botão hambúrguer no topo (visível tanto no desktop quanto no mobile).
>    - Ao fechar, o menu lateral é ocultado completamente (`w-0` / `translate-x-full` ou remoção fluida da barra lateral), expandindo a área de conteúdo principal para **100% da largura da tela** (aproveitamento total do monitor e sensação de tela cheia).
>    - Um botão flutuante discreto ou no cabeçalho permite reabrir o menu a qualquer momento com animação suave.
> 2. **Substituição da Aba "Pais & Educadores" por "Fontes & Curiosidades"**:
>    - Foco confirmado: **Curiosidades ilustradas de Libras** (ex: Libras não é mímica; cada país tem sua própria língua de sinais; os 5 parâmetros; o sinal de batismo na comunidade surda) e **Créditos Institucionais oficiais** (UFSM / Libras ON, UFV / CEAD Dicionário de Libras, UTFPR).
> 3. **Correção do Player do Alfabeto em Movimento**:
>    - Substituir o iframe do portal `https://ntetube.nte.ufsm.br/v/...` pelo link direto do vídeo MP4 (`https://ntetube.nte.ufsm.br/repositorio/1f20d80b2f6ed5c8b42d83891d1eeaf7/720p.mp4`) com fallback para o player embed limpo (`/e/1527000916`).
>    - Utilizar player nativo HTML5 com controles completos (play, pause, barra de progresso, tela cheia e controle de velocidade), eliminando barras de busca, menus e cabeçalhos do site da universidade.

---

### 1. Overview & Core Concept

- **O que faz**:
  - Proporciona visualização focada e limpa do vídeo do alfabeto completo, sem elementos de páginas externas.
  - Traz uma nova tela cultural e informativa ("Fontes & Curiosidades de Libras"), enriquecendo o repertório de alunos e professores.
  - Oferece controle ergonômico de visualização com menu hambúrguer dobrável, permitindo focar 100% no conteúdo das lições e do jogo da memória sem barras laterais ocupando espaço.
- **Público-alvo**: Crianças, jovens e aprendizes que buscam maior imersão e praticidade.

---

### 2. User Experience & Visual Design

- **Menu Lateral Dobrável (Full Width Toggle)**:
  - **Botão Hambúrguer**: Ícone de menu no cabeçalho e na lateral.
  - **Estado Aberto**: Barra lateral de 256px (`w-64`) com todos os atalhos.
  - **Estado Fechado**: Menu recolhido com transição CSS suave (`transition-all duration-300`); a área de conteúdo (`<main>`) expande ocupando 100% da largura disponível.
  - **Botão de Abertura Rápida**: Quando o menu estiver fechado, um botão flutuante arredondado com ícone de menu hambúrguer fica disponível no canto superior esquerdo ou no header para reabrir com 1 clique.
- **Player de Vídeo do Alfabeto Ajustado**:
  - Modal com visual limpo e centralizado.
  - Tag `<video>` HTML5 com vídeo direto em 720p HD (`720p.mp4`), controles nativos, velocidade lenta (0.5x / 1x) e botão de tela cheia.
  - Rodapé discreto com créditos à UFSM (Projeto Libras ON) e licença aberta CC BY-NC-SA 4.0.
- **Nova Tela "Fontes & Curiosidades de Libras" (`CreditsCuriositiesScreen.tsx`)**:
  - **Seção 1: Curiosidades Fascinantes de Libras**:
    - *1. Libras não é universal*: Cada país tem sua própria língua de sinais (ASL nos EUA, LSF na França, LGP em Portugal).
    - *2. Não é mímica nem código*: É uma língua natural completa com gramática, sintaxe e regras próprias reconhecidas pela Lei 10.436/2002.
    - *3. Os 5 Parâmetros Fundamentais*: Configuração de mão (CM), Ponto de articulação (PA), Movimento (M), Orientação (O) e Expressões não-manuais (ENM).
    - *4. O Sinal de Batismo*: Como as pessoas recebem seu "nome em Libras" pela comunidade surda, baseado em uma característica marcante.
    - *5. O Rosto também Fala*: As sobrancelhas e expressões faciais definem se uma frase é pergunta, exclamação ou afirmação!
  - **Seção 2: Fontes & Créditos Institucionais**:
    - Cards com links e homenagens aos projetos públicos de universidades federais que disponibilizam materiais em acesso aberto: UFSM (Libras ON), UFV / CEAD e UTFPR.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Player Nativo `<video>` vs. Iframe Embed**
  - *Abordagem*: Usar o stream MP4 direto de 720p (`https://ntetube.nte.ufsm.br/repositorio/1f20d80b2f6ed5c8b42d83891d1eeaf7/720p.mp4`) com fallback para o embed `/e/1527000916`.
  - *Por que*: O player nativo garante que nenhum elemento de navegação do site NTE Tube apareça na tela do aluno, permitindo reprodução limpa com controles fluidos do navegador.

- **Decisão 2: Substituição da Rota `parents` por `credits-curiosities`**
  - *Abordagem*: Atualizar o enum `TabType` para substituir `'parents'` por `'credits-curiosities'` (rotulado como "Fontes & Curiosidades" no menu).
  - *Por que*: Atende diretamente ao pedido do usuário de retirar "Pais e Educadores" e colocar Fontes, Créditos e Curiosidades no lugar.

- **Decisão 3: Estado de Sidebar no Desktop**
  - *Abordagem*: Gerenciar `isSidebarCollapsed` no `App.tsx` com persistência em `localStorage` para lembrar a preferência do usuário.

---

### 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      Lumi Libras Layout                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Header: [☰ Hambúrguer]  Logo Lumi Libras   [XP/Estrelas] │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────┬───────────────────────────────────┐  │
│  │   Sidebar (Colapsável)│      Área Principal (100% fluida) │  │
│  │  - Início             │                                   │  │
│  │  - Trilha de Libras   │  - Se Sidebar fechada:            │  │
│  │  - Alfabeto           │    Main ocupa tela inteira        │  │
│  │  - Sinais do Dia      │                                   │  │
│  │  - Jogo da Memória    │  - Nova Tela:                     │  │
│  │  - Conquistas         │    Fontes & Curiosidades          │  │
│  │  - Fontes&Curiosidades│                                   │  │
│  └───────────────────────┴───────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Sequência de Execução (Após Aprovação)

1. **Atualizar `AlphabetScreen.tsx`**:
   - Substituir o iframe do portal ntetube pelo player nativo `<video controls src=".../720p.mp4">` com controles limpos, sem barra de busca ou header da universidade.
2. **Atualizar `src/types/index.ts` e `Sidebar.tsx`**:
   - Atualizar a rota `parents` para `credits-curiosities` com o rótulo "Fontes & Curiosidades" e ícone temático (`BookOpen` ou `Sparkles`).
   - Adicionar o botão de fechar/abrir hambúrguer na barra lateral.
3. **Criar `src/components/screens/CreditsCuriositiesScreen.tsx`**:
   - Implementar os cards interativos de Curiosidades de Libras (ilustrações, badges, dicas do Lumi) e a seção de Fontes e Créditos Institucionais (UFSM, UFV, UTFPR).
4. **Atualizar `App.tsx` e `Header.tsx`**:
   - Adicionar estado `isSidebarCollapsed` no `App.tsx` permitindo que o menu seja recolhido tanto no desktop quanto no mobile.
   - Adicionar botão hambúrguer no `Header.tsx` e na barra lateral.
   - Renderizar `CreditsCuriositiesScreen` no lugar da antiga tela de pais.
5. **Verificar compilação e linting** via `compile_applet` e `lint_applet`.
