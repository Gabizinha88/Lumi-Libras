export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonStep {
  title: string;
  subtitle: string;
  signLetterOrId?: string;
  photoUrl?: string;
  videoUrl?: string;
  badgeText?: string;
  mainInstruction: string;
  anatomicalNote: string;
  tipText: string;
  tipEmoji?: string;
}

export interface TrailLessonData {
  nodeId: string;
  title: string;
  subtitle: string;
  type: 'lesson' | 'chest' | 'challenge';
  starsReward: number;
  xpReward: number;
  steps: LessonStep[];
  quiz?: LessonQuiz;
  challengeQuizzes?: LessonQuiz[];
}

export const TRAIL_LESSONS: Record<string, TrailLessonData> = {
  'node-1': {
    nodeId: 'node-1',
    title: 'Letras A, B, C',
    subtitle: 'Primeiras letras do alfabeto manual com fotos reais das mãos',
    type: 'lesson',
    starsReward: 3,
    xpReward: 20,
    steps: [
      {
        title: 'Letra A — Punho e Polegar',
        subtitle: 'Foto real da mão na letra A',
        signLetterOrId: 'A',
        photoUrl: '/signs/A.png',
        badgeText: 'Letra A',
        mainInstruction: 'Feche todos os quatro dedos em punho firme. Estique o dedo polegar para cima, encostado retinho ao lado do dedo indicador.',
        anatomicalNote: 'Palma voltada para frente. O polegar nunca fica dobrado na frente das unhas, e sim ereto ao lado da mão.',
        tipText: 'Pense em dar um joia discreto coladinho na lateral da mão!',
        tipEmoji: '👍'
      },
      {
        title: 'Letra B — Quatro Dedos Juntos',
        subtitle: 'Foto real da mão na letra B',
        signLetterOrId: 'B',
        photoUrl: '/signs/B.png',
        badgeText: 'Letra B',
        mainInstruction: 'Estique os quatro dedos (indicador, médio, anelar e mínimo) bem retos e coladinhos apontando para o céu. Dobre o polegar sobre o centro da palma da mão.',
        anatomicalNote: 'Mantenha os dedos unidos sem separar. O polegar cruza na horizontal sobre a palma.',
        tipText: 'Imagine uma parede de quatro dedos bem esticados e firmes!',
        tipEmoji: '✋'
      },
      {
        title: 'Letra C — Concha Perfeita',
        subtitle: 'Foto real da mão na letra C',
        signLetterOrId: 'C',
        photoUrl: '/signs/C.png',
        badgeText: 'Letra C',
        mainInstruction: 'Curve suavemente todos os dedos e o polegar, desenhando o formato redondo da letra C no ar.',
        anatomicalNote: 'Mantenha o arco arredondado aberto, mostrando a curva nítida tanto de frente quanto de perfil.',
        tipText: 'Como se estivesse segurando uma xícara ou maçã mágica no ar!',
        tipEmoji: '🍎'
      }
    ],
    quiz: {
      question: 'Qual é a posição correta do polegar na letra A em Libras?',
      options: [
        'Dobrado escondido por dentro dos dedos',
        'Esticado para cima, encostado ao lado do dedo indicador',
        'Apontado para o chão'
      ],
      correctIndex: 1,
      explanation: 'Na letra A, o punho fica fechado e o polegar fica reto para cima, bem ao lado do indicador!'
    }
  },

  'node-2': {
    nodeId: 'node-2',
    title: 'Letras D, E, F',
    subtitle: 'Dominando novas formas anatômicas com as mãos reais',
    type: 'lesson',
    starsReward: 3,
    xpReward: 20,
    steps: [
      {
        title: 'Letra D — O Arco e o Indicador',
        subtitle: 'Foto real da mão na letra D',
        signLetterOrId: 'D',
        photoUrl: '/signs/D.png',
        badgeText: 'Letra D',
        mainInstruction: 'Aponte o dedo indicador reto para cima. Curve os outros três dedos (médio, anelar e mínimo) até tocar a pontinha do polegar, formando um círculo.',
        anatomicalNote: 'Apenas o indicador fica ereto e vertical. O arco circular fica na base.',
        tipText: 'Lembra o formato de um D minúsculo desenhado no ar!',
        tipEmoji: '☝️'
      },
      {
        title: 'Letra E — Garrinha nas Unhas',
        subtitle: 'Foto real da mão na letra E',
        signLetterOrId: 'E',
        photoUrl: '/signs/E.png',
        badgeText: 'Letra E',
        mainInstruction: 'Curve todos os dedos para baixo, apoiando a pontinha deles sobre a lateral do polegar que está dobrado.',
        anatomicalNote: 'Mostre as unhas e as primeiras articulações dos dedos voltadas para a frente.',
        tipText: 'Como uma patinha de ursinho ou conchinha dobrada!',
        tipEmoji: '🐾'
      },
      {
        title: 'Letra F — Segredo do Polegar por Fora',
        subtitle: 'Foto real da mão na letra F (F = Fora!)',
        signLetterOrId: 'F',
        photoUrl: '/signs/F.png',
        badgeText: 'Letra F',
        mainInstruction: 'Dobre apenas o dedo indicador para a frente. Encoste o polegar POR FORA do indicador. Mantenha os outros três dedos abertos para cima.',
        anatomicalNote: 'Regra de ouro em Libras: na letra F, o polegar fica de Fora (F de Fora). No T, o polegar fica dentro!',
        tipText: 'Lembre-se sempre da regrinha do Lumi: F = Polegar FORA!',
        tipEmoji: '🌟'
      }
    ],
    quiz: {
      question: 'Na letra F em Libras, qual é a regra infalível para não errar?',
      options: [
        'O polegar fica encostado POR FORA do dedo indicador (F = Fora)',
        'Todos os dedos ficam fechados em punho',
        'O polegar fica escondido dentro da palma'
      ],
      correctIndex: 0,
      explanation: 'Exatamente! F = Polegar de FORA. Essa dica de ouro acompanha você em toda a sua jornada em Libras!'
    }
  },

  'node-3': {
    nodeId: 'node-3',
    title: 'Oi & Tudo Bem?',
    subtitle: 'Cumprimentos fundamentais e expressão facial com sinalizadores reais',
    type: 'lesson',
    starsReward: 3,
    xpReward: 25,
    steps: [
      {
        title: 'Sinal de "Oi!" — Acolhimento e Sorriso',
        subtitle: 'Vídeo real e foto com transição O ➔ I',
        signLetterOrId: 'O',
        photoUrl: '/signs/O.png',
        videoUrl: 'oi',
        badgeText: 'Oi / Olá',
        mainInstruction: 'Junte os dedos no formato da letra O e termine abrindo o dedo mindinho na letra I enquanto acena suavemente para a frente na altura do ombro.',
        anatomicalNote: 'Mão na altura do ombro. Faça o aceno com gentileza.',
        tipText: 'Sorria com os olhos e a boca ao sinalizar. Em Libras, o rosto dá o tom do cumprimento!',
        tipEmoji: '😊'
      },
      {
        title: 'Sinal de "Tudo Bem?" — Bom + Positivo',
        subtitle: 'Vídeo real e demonstração da pergunta em Libras',
        signLetterOrId: 'B',
        photoUrl: '/signs/B.png',
        videoUrl: 'tudobem',
        badgeText: 'Tudo Bem?',
        mainInstruction: 'Toque com a ponta dos dedos fechados perto da boca (sinal de "Bom") e em seguida estenda a mão para a frente com o polegar levantado ("joinha").',
        anatomicalNote: 'Incline levemente a cabeça para a frente e levante as sobrancelhas para indicar a pergunta.',
        tipText: 'A sobrancelha levantada funciona como o ponto de interrogação em Libras!',
        tipEmoji: '🤔'
      }
    ],
    quiz: {
      question: 'Ao perguntar "Tudo bem?" em Libras, como o seu rosto deve se comportar?',
      options: [
        'Ficar sério e olhar para o chão',
        'Levantar levemente as sobrancelhas e inclinar a cabeça com curiosidade',
        'Fechar os olhos'
      ],
      correctIndex: 1,
      explanation: 'Perfeito! As expressões faciais são gramaticais em Libras: levantar as sobrancelhas indica uma pergunta interrogativa!'
    }
  },

  'node-4': {
    nodeId: 'node-4',
    title: 'Expressões & Família',
    subtitle: 'Aprenda sinais de afeto, gratidão e parentesco com sinalizadores reais',
    type: 'lesson',
    starsReward: 4,
    xpReward: 30,
    steps: [
      {
        title: 'Sinal de "Obrigado" — Respeito e Gratidão',
        subtitle: 'Foto real e reverência com a mão',
        signLetterOrId: 'B',
        photoUrl: '/signs/B.png',
        badgeText: 'Obrigado',
        mainInstruction: 'Toque a testa com a mão espalmada e toque o queixo com a outra mão (ou uma só mão fazendo o trajeto testa ➔ para frente), curvando levemente a cabeça.',
        anatomicalNote: 'Movimento suave saindo em direção à outra pessoa em sinal de gratidão sincera.',
        tipText: 'Acompanhe com um sorriso afetuoso de agradecimento!',
        tipEmoji: '🙏'
      },
      {
        title: 'Sinal de "Amigo" — Calor no Peito',
        subtitle: 'Foto real da mão espalmada no coração',
        signLetterOrId: 'A',
        photoUrl: '/signs/A.png',
        badgeText: 'Amigo',
        mainInstruction: 'Coloque a palma da mão direita espalmada com os dedos juntos sobre o lado esquerdo do peito (sobre o coração). Dê leves toques carinhosos.',
        anatomicalNote: 'Contato suave no peito demonstrando sentimento de proximidade e confiança.',
        tipText: 'Um sinal cheio de afeto que simboliza acolhimento no coração!',
        tipEmoji: '❤️'
      },
      {
        title: 'Sinal de "Família" — Círculo Unido',
        subtitle: 'Ambas as mãos em letra F completando um laço',
        signLetterOrId: 'F',
        photoUrl: '/signs/F.png',
        badgeText: 'Família',
        mainInstruction: 'Faça a letra F com as duas mãos. Encoste os polegares à frente do corpo e desenhe um círculo para os lados até os dedos mínimos se tocarem.',
        anatomicalNote: 'O círculo completo representa a união de todas as pessoas da família em um laço fechado.',
        tipText: 'Duas mãos em F fazendo um grande abraço circular no ar!',
        tipEmoji: '👨‍👩‍👧‍👦'
      }
    ],
    quiz: {
      question: 'Como é feito o sinal de "Amigo" em Libras?',
      options: [
        'Com a palma da mão suavemente repousada no peito sobre o coração',
        'Puxando a orelha três vezes',
        'Cruzando os braços de costas'
      ],
      correctIndex: 0,
      explanation: 'Isso mesmo! O sinal de amigo repousa a mão no coração com carinho e amizade!'
    }
  },

  'node-5': {
    nodeId: 'node-5',
    title: 'Baú Mágico do Lumi',
    subtitle: 'Recompensa especial e surpresa do Lumi com estrelas e figurinha!',
    type: 'chest',
    starsReward: 10,
    xpReward: 50,
    steps: []
  },

  'node-6': {
    nodeId: 'node-6',
    title: 'Desafio Final da Unidade 1',
    subtitle: 'Grande Prova de Mestre para conquistar a Coroa da Unidade 1!',
    type: 'challenge',
    starsReward: 15,
    xpReward: 80,
    steps: [],
    challengeQuizzes: [
      {
        question: '1/3: Qual letra do alfabeto tem o punho fechado e o polegar esticado ao lado?',
        options: ['Letra A', 'Letra B', 'Letra C'],
        correctIndex: 0,
        explanation: 'Muito bem! A letra A tem o punho fechado e polegar ao lado!'
      },
      {
        question: '2/3: Na letra F em Libras, onde fica o polegar?',
        options: ['Por fora do indicador (F = Fora)', 'Dentro da palma fechada', 'Apontando para baixo'],
        correctIndex: 0,
        explanation: 'Correto! F = Polegar FORA!'
      },
      {
        question: '3/3: Para perguntar "Tudo bem?", quais são os dois componentes fundamentais?',
        options: [
          'Sinal de Bom + Polegar levantado com sobrancelhas erguidas',
          'Apenas balançar a cabeça sem usar as mãos',
          'Bater palmas duas vezes'
        ],
        correctIndex: 0,
        explanation: 'Excelente! Sinal de Bom + positivo com expressão interrogativa no rosto!'
      }
    ]
  }
};
