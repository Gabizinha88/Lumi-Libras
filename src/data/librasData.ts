import { AlphabetLetter, SignItem, TrailNode, Achievement } from '../types';

export const ALPHABET_DATA: AlphabetLetter[] = [
  {
    letter: 'A',
    name: 'Letra A',
    handShapeDescription: 'Mão fechada em punho com o polegar esticado para cima encostado ao lado do dedo indicador.',
    movementDescription: 'Mão parada em frente ao tronco, com a palma voltada para a frente.',
    exampleWord: 'Amigo / Amor',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'B',
    name: 'Letra B',
    handShapeDescription: 'Quatro dedos esticados juntos para cima e o polegar dobrado sobre a palma da mão.',
    movementDescription: 'Palma voltada para frente, dedos unidos e firmes.',
    exampleWord: 'Brincar / Bola',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'C',
    name: 'Letra C',
    handShapeDescription: 'Mão curvada no formato da letra C, com os dedos e o polegar formando um semicírculo.',
    movementDescription: 'Mantenha a mão estável de perfil ou levemente voltada para a frente.',
    exampleWord: 'Casa / Coração',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'D',
    name: 'Letra D',
    handShapeDescription: 'Indicador apontado reto para cima, os outros dedos tocam a ponta do polegar formando um círculo.',
    movementDescription: 'Mantenha o indicador vertical bem estendido.',
    exampleWord: 'Dia / Doce',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'E',
    name: 'Letra E',
    handShapeDescription: 'Todos os dedos curvados para baixo com as pontas apoiadas na base do polegar dobrado.',
    movementDescription: 'Mostre as unhas e articulações voltadas para a frente.',
    exampleWord: 'Escola / Estrela',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'F',
    name: 'Letra F',
    handShapeDescription: 'Indicador dobrado com o polegar encostado POR FORA do indicador. Os outros 3 dedos abertos para cima.',
    movementDescription: 'Lembre-se: no F, o polegar fica de fora! (F = Fora).',
    exampleWord: 'Família / Feliz',
    category: 'A-G',
    mastered: true
  },
  {
    letter: 'G',
    name: 'Letra G',
    handShapeDescription: 'Indicador apontando para cima e polegar estendido para o lado em formato de L para cima.',
    movementDescription: 'Palma voltada para você ou levemente para o lado.',
    exampleWord: 'Gato / Girafa',
    category: 'A-G',
    mastered: false
  },
  {
    letter: 'H',
    name: 'Letra H',
    handShapeDescription: 'Dedos indicador e médio abertos em V com o polegar entre eles. Gire a mão levemente.',
    movementDescription: 'Faça uma rotação rápida de 180 graus com o punho.',
    exampleWord: 'História / Hoje',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'I',
    name: 'Letra I',
    handShapeDescription: 'Mão fechada em punho com apenas o dedo mindinho (mínimo) esticado para cima.',
    movementDescription: 'Mão estática em frente ao peito.',
    exampleWord: 'Irmão / Ilha',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'J',
    name: 'Letra J',
    handShapeDescription: 'Com a mão no formato do I (mindinho para cima), desenhe a letra J no ar.',
    movementDescription: 'Movimento de gancho traçando o J com o dedo mindinho.',
    exampleWord: 'Janela / Jogo',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'K',
    name: 'Letra K',
    handShapeDescription: 'Mesma configuração do H (dedos indicador e médio em V com polegar no meio), mas dê um pequeno impulso para cima.',
    movementDescription: 'Pequeno salto vertical com a mão.',
    exampleWord: 'Kiwi / Karaoke',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'L',
    name: 'Letra L',
    handShapeDescription: 'Indicador para cima e polegar aberto para o lado, formando a letra L perfeita.',
    movementDescription: 'Fácil e divertido! Mão firme virada para frente.',
    exampleWord: 'Lumi / Livro',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'M',
    name: 'Letra M',
    handShapeDescription: 'Três dedos (indicador, médio e anelar) apontados para baixo sobre o polegar.',
    movementDescription: 'Lembra as três perninhas da letra M.',
    exampleWord: 'Mãe / Maçã',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'N',
    name: 'Letra N',
    handShapeDescription: 'Dois dedos (indicador e médio) apontados para baixo sobre o polegar.',
    movementDescription: 'Lembra as duas perninhas da letra N.',
    exampleWord: 'Noite / Nuvem',
    category: 'H-N',
    mastered: false
  },
  {
    letter: 'O',
    name: 'Letra O',
    handShapeDescription: 'Todos os dedos curvados tocando o polegar, formando um círculo perfeito como a letra O.',
    movementDescription: 'Mantenha o formato redondo visível.',
    exampleWord: 'Olho / Ouro',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'P',
    name: 'Letra P',
    handShapeDescription: 'Mesma mão do K e do H, porém apontando horizontalmente para a frente/baixo.',
    movementDescription: 'Posição horizontal estável.',
    exampleWord: 'Pai / Parque',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'Q',
    name: 'Letra Q',
    handShapeDescription: 'Mesma configuração do G (indicador e polegar), porém apontados para baixo.',
    movementDescription: 'Dedos virados para o chão.',
    exampleWord: 'Queijo / Querer',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'R',
    name: 'Letra R',
    handShapeDescription: 'Dedo indicador e médio cruzados (torcidos um sobre o outro), como sinal de figa ou torcida.',
    movementDescription: 'Mão erguida com dedos cruzados bem visíveis.',
    exampleWord: 'Rir / Roda',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'S',
    name: 'Letra S',
    handShapeDescription: 'Mão fechada em punho com o polegar cruzado POR CIMA dos dedos indicador e médio.',
    movementDescription: 'Diferente do A onde o polegar fica de lado, no S o polegar abraça a frente.',
    exampleWord: 'Sol / Sorriso',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'T',
    name: 'Letra T',
    handShapeDescription: 'Indicador dobrado com o polegar encostado POR DENTRO do indicador.',
    movementDescription: 'Lembrete famoso: T = Dentro (polo guardadinho por trás do indicador).',
    exampleWord: 'Tarde / Tatu',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'U',
    name: 'Letra U',
    handShapeDescription: 'Dedos indicador e médio esticados juntos para cima, outros dedos fechados com polegar.',
    movementDescription: 'Dedos bem colados um ao outro.',
    exampleWord: 'Urso / Uva',
    category: 'O-U',
    mastered: false
  },
  {
    letter: 'V',
    name: 'Letra V',
    handShapeDescription: 'Dedos indicador e médio abertos em forma de V (sinal de paz e amor).',
    movementDescription: 'Dedos bem separados apontando para cima.',
    exampleWord: 'Vento / Verde',
    category: 'V-Z',
    mastered: false
  },
  {
    letter: 'W',
    name: 'Letra W',
    handShapeDescription: 'Três dedos (indicador, médio e anelar) esticados para cima separados, formando um W.',
    movementDescription: 'Pequeno impulso ou estático com os 3 dedos abertos.',
    exampleWord: 'Wafer / Wi-Fi',
    category: 'V-Z',
    mastered: false
  },
  {
    letter: 'X',
    name: 'Letra X',
    handShapeDescription: 'Dedo indicador dobrado em formato de gancho puxando para trás em sua direção.',
    movementDescription: 'Movimento de puxar suavemente o anzol em direção ao corpo.',
    exampleWord: 'Xícara / Xadrez',
    category: 'V-Z',
    mastered: false
  },
  {
    letter: 'Y',
    name: 'Letra Y',
    handShapeDescription: 'Polegar e mindinho esticados para fora (formato "hang loose"), balançando suavemente para cima.',
    movementDescription: 'Movimento sutil para cima ou oscilação lateral.',
    exampleWord: 'Yoga / YouTube',
    category: 'V-Z',
    mastered: false
  },
  {
    letter: 'Z',
    name: 'Letra Z',
    handShapeDescription: 'Dedo indicador esticado desenhando a letra Z no ar.',
    movementDescription: 'Traçado em zig-zag reto com a ponta do indicador.',
    exampleWord: 'Zebra / Zero',
    category: 'V-Z',
    mastered: false
  }
];

export const DAILY_SIGNS: SignItem[] = [
  {
    id: 'sign-oi',
    title: 'Oi! / Olá',
    category: 'cumprimentos',
    categoryLabel: 'Cumprimentos',
    description: 'O sinal mais acolhedor de todos! Usado para cumprimentar qualquer amigo, colega ou familiar.',
    handConfig: 'Configuração em O girando e abrindo em I (ou aceno com mão aberta)',
    location: 'Espaço neutro, ao lado do rosto na altura dos olhos',
    movement: 'Mão desenha um pequeno semicírculo de dentro para fora',
    facialExpression: 'Sorriso aberto, olhar atento e alegre nos olhos da pessoa',
    difficulty: 'fácil',
    mastered: true
  },
  {
    id: 'sign-tudo-bem',
    title: 'Tudo Bem?',
    category: 'cumprimentos',
    categoryLabel: 'Cumprimentos',
    description: 'Composto pelo sinal de "BOM" + expressão de pergunta ou afirmação positiva.',
    handConfig: 'Mão fechada em frente à boca abrindo para frente, seguida de polegar para cima ("Joinha")',
    location: 'Da boca em direção ao espaço neutro à frente',
    movement: 'Movimento suave de sopro/abertura das pontas dos dedos e polegar erguido',
    facialExpression: 'Sobrancelhas levemente arqueadas e sorriso amigável',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-bom-dia',
    title: 'Bom Dia',
    category: 'cumprimentos',
    categoryLabel: 'Cumprimentos',
    description: 'Sinal de "BOM" junto com o sinal de "DIA" (letra D tocando o lado da têmpora ou sol nascendo).',
    handConfig: 'Mão aberta da boca + letra D partindo do rosto em direção ao espaço',
    location: 'Da boca até a têmpora/espaço',
    movement: 'Abertura suave seguida do traçado da letra D para a frente',
    facialExpression: 'Expressão luminosa, acordando com energia!',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-obrigado',
    title: 'Obrigado(a)',
    category: 'cumprimentos',
    categoryLabel: 'Cumprimentos',
    description: 'Gesto de gentileza e gratidão sincera.',
    handConfig: 'Mão aberta tocando a testa e outra tocando o peito, afastando-se suavemente para a frente',
    location: 'Testa e peito',
    movement: 'As mãos tocam e se projetam levemente para frente com uma pequena reverência com a cabeça',
    facialExpression: 'Expressão de carinho e gratidão sincera',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-por-favor',
    title: 'Por Favor / Com Licença',
    category: 'cumprimentos',
    categoryLabel: 'Cumprimentos',
    description: 'Sinal essencial para convivência e respeito.',
    handConfig: 'Palmas das mãos unidas em frente ao peito deslizando suavemente para trás e para frente',
    location: 'Espaço à frente do peito',
    movement: 'Deslizar suave das palmas juntas',
    facialExpression: 'Expressão suave e cordial',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-mae',
    title: 'Mãe',
    category: 'familia',
    categoryLabel: 'Família',
    description: 'Sinal de "MULHER" (polegar descendo a bochecha) + beijo na ponta dos dedos com carinho.',
    handConfig: 'Polegar suave na bochecha e dorso da mão encostando na boca como um beijinho',
    location: 'Bochecha e queixo',
    movement: 'Deslizar suave e toque afetivo',
    facialExpression: 'Olhar doce e acolhedor',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-pai',
    title: 'Pai',
    category: 'familia',
    categoryLabel: 'Família',
    description: 'Sinal de "HOMEM" (passando a mão fechada ou indicador no queixo como barba) + beijo na mão.',
    handConfig: 'Polegar ou indicador no queixo (sinal masculino) + toque no dorso da mão',
    location: 'Queixo e queixo inferior',
    movement: 'Toque firme e gentil',
    facialExpression: 'Expressão afetuosa e respeitosa',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-amigo',
    title: 'Amigo',
    category: 'familia',
    categoryLabel: 'Família & Amizade',
    description: 'Representa a união do coração entre companheiros de jornada!',
    handConfig: 'Mão direita toca suavemente o lado esquerdo do peito (sobre o coração) com pequenos toques',
    location: 'Região do coração / peito',
    movement: 'Dois toques suaves com a palma aberta ou mão espalmada',
    facialExpression: 'Sorriso amigo e acolhedor, olhos brilhantes',
    difficulty: 'fácil',
    mastered: true
  },
  {
    id: 'sign-escola',
    title: 'Escola',
    category: 'escola',
    categoryLabel: 'Escola',
    description: 'Junção do sinal de "CASA" com o sinal de "ESTUDAR" (bater palmas suavemente ou folhear).',
    handConfig: 'Mãos em telhado (Casa) e depois mãos batendo suavemente nas palmas (Estudar)',
    location: 'À frente do tronco',
    movement: 'Fazer o formato de telhado e depois bater suavemente as palmas abertas',
    facialExpression: 'Expressão motivada e curiosa',
    difficulty: 'médio',
    mastered: false
  },
  {
    id: 'sign-aprender',
    title: 'Aprender',
    category: 'escola',
    categoryLabel: 'Escola',
    description: 'Pegar o conhecimento e levar diretamente para a mente!',
    handConfig: 'Mão aberta em frente à testa fechando-se em punho enquanto toca suavemente a testa',
    location: 'Testa / mente',
    movement: 'Mão abre e fecha pegando o saber e guardando na cabeça',
    facialExpression: 'Olhar de descoberta e iluminação!',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-feliz',
    title: 'Feliz',
    category: 'emocoes',
    categoryLabel: 'Emoções',
    description: 'Transmite alegria contagiante através do movimento e do sorriso!',
    handConfig: 'Mãos em configuração da letra F (ou palmas abertas) subindo pelo peito com ritmo',
    location: 'Região do peito',
    movement: 'Mãos oscilam alternadamente para cima com leveza',
    facialExpression: 'Sorriso largo, olhos semicerrados de tanta alegria!',
    difficulty: 'fácil',
    mastered: false
  },
  {
    id: 'sign-azul',
    title: 'Azul (Cor do Lumi!)',
    category: 'cores',
    categoryLabel: 'Cores',
    description: 'A cor mágica do Lumi e do céu limpo!',
    handConfig: 'Letra A deslizando para a letra L ou mão balançando suavemente',
    location: 'Espaço neutro à frente',
    movement: 'Transição rápida e fluida das letras A para L',
    facialExpression: 'Expressão relaxada e alegre',
    difficulty: 'médio',
    mastered: false
  }
];

export const TRAIL_NODES: TrailNode[] = [
  {
    id: 'node-1',
    title: 'Letras A, B, C',
    subtitle: 'Primeiras letras do alfabeto manual',
    type: 'completed',
    stars: 3,
    xp: 20,
    statusText: 'Concluído ✓'
  },
  {
    id: 'node-2',
    title: 'Letras D, E, F',
    subtitle: 'Dominando novas formas com as mãos',
    type: 'completed',
    stars: 3,
    xp: 20,
    statusText: 'Concluído ✓'
  },
  {
    id: 'node-3',
    title: 'Oi & Tudo Bem?',
    subtitle: 'Cumprimentos fundamentais e expressão facial',
    type: 'current',
    stars: 0,
    xp: 10,
    statusText: 'Descoberta Atual'
  },
  {
    id: 'node-4',
    title: 'Expressões & Família',
    subtitle: 'Aprenda sinais de afeto e parentesco',
    type: 'locked',
    stars: 0,
    xp: 30,
    statusText: 'Bloqueado'
  },
  {
    id: 'node-5',
    title: 'Baú Mágico do Lumi',
    subtitle: 'Surpresa especial com figurinhas colecionáveis!',
    type: 'chest',
    stars: 15,
    xp: 50,
    statusText: 'Recompensa Secreta'
  },
  {
    id: 'node-6',
    title: 'Desafio Final da Unidade 1',
    subtitle: 'O grande teste para ganhar a coroa do mundo dos primeiros sinais',
    type: 'trophy',
    stars: 25,
    xp: 100,
    statusText: 'Desafio Final'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'first-sign',
    title: 'Primeiro Sinal',
    description: 'Fez sua primeira descoberta em Libras com o Lumi.',
    icon: '✨',
    unlocked: true,
    rewardStars: 5
  },
  {
    id: 'alphabet-explorer',
    title: 'Explorador do Alfabeto',
    description: 'Aprendeu as primeiras 6 letras (A até F) com precisão.',
    icon: '🔤',
    unlocked: true,
    rewardStars: 10
  },
  {
    id: 'five-day-streak',
    title: 'Chama Olímpica (5 Dias)',
    description: 'Manteve 5 dias seguidos praticando sem falhar!',
    icon: '🔥',
    unlocked: true,
    rewardStars: 15
  },
  {
    id: 'memory-champion',
    title: 'Mestre da Memória',
    description: 'Venceu o jogo da memória combinando sinais em menos de 1 minuto.',
    icon: '🧠',
    unlocked: false,
    rewardStars: 20,
    progress: { current: 1, total: 3 }
  },
  {
    id: 'friendly-hands',
    title: 'Mãos Amigas',
    description: 'Completou a unidade de Cumprimentos e Expressões faciais.',
    icon: '🤝',
    unlocked: false,
    rewardStars: 25,
    progress: { current: 2, total: 6 }
  },
  {
    id: 'lumi-best-friend',
    title: 'Melhor Amigo do Lumi',
    description: 'Abriu o Baú Mágico e deu mais de 10 "Toca aqui!" no Lumi.',
    icon: '🌟',
    unlocked: false,
    rewardStars: 30,
    progress: { current: 4, total: 10 }
  }
];

export const LUMI_TIPS = [
  {
    title: 'O poder do rosto!',
    text: 'Em Libras, a expressão do seu rosto faz parte da palavra! Dê um sorriso sincero ao sinalizar "Oi!" ou "Bom dia!"!',
    tag: 'Expressão facial = Gramática 😊✨'
  },
  {
    title: 'Mão dominante',
    text: 'Use sempre a mesma mão para soletrar as letras (geralmente a mão com a qual você escreve ou desenha). A outra pode descansar!',
    tag: 'Conforto & Postura ✍️'
  },
  {
    title: 'O espaço ao seu redor',
    text: 'Os sinais acontecem no seu "espaço de sinalização", que vai da sua cintura até acima da cabeça. Mantenha os cotovelos relaxados!',
    tag: 'Espaço Visual 🎈'
  },
  {
    title: 'Sem pressa para soletrar',
    text: 'Na datilologia (soletrar com os dedos), a clareza é muito mais importante que a velocidade. Faça cada letra com calma e carinho!',
    tag: 'Ritmo & Clareza 🐢✨'
  }
];
