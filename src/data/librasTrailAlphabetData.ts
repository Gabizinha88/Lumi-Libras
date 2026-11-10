import { TrailAlphabetStage } from '../types';

export const ALPHABET_TRAIL_STAGES: TrailAlphabetStage[] = [
  {
    id: 'etapa_1',
    stageNumber: 1,
    title: 'Olá, vogais!',
    subtitle: 'As 5 letras fundamentais que abrem as portas de qualquer palavra.',
    lettersSummary: 'A, E, I, O, U · Suas primeiras letras',
    rewardStars: 15,
    rewardXp: 30,
    letters: [
      { letter: 'A', name: 'Letra A', signImagePath: '/assets/signs/A.png', tip: 'Mão fechada em punho com o polegar encostado na lateral.' },
      { letter: 'E', name: 'Letra E', signImagePath: '/assets/signs/E.png', tip: 'Dedos dobrados para dentro apoiados sobre a ponta do polegar.' },
      { letter: 'I', name: 'Letra I', signImagePath: '/assets/signs/I.png', tip: 'Mão fechada com apenas o dedo mindinho apontado para cima.' },
      { letter: 'O', name: 'Letra O', signImagePath: '/assets/signs/O.png', tip: 'Todos os dedos se curvam formando um círculo perfeito.' },
      { letter: 'U', name: 'Letra U', signImagePath: '/assets/signs/U.png', tip: 'Indicador e médio juntos apontados para o alto.' }
    ],
    questions: [
      {
        id: 'q_1_1',
        targetLetter: 'E',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/M.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/E.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/K.png', isCorrect: false }
        ],
        hint: 'Observe os quatro dedos dobrados encostando suavemente no polegar.'
      },
      {
        id: 'q_1_2',
        targetLetter: 'A',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/A.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/S.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/O.png', isCorrect: false }
        ],
        hint: 'No A, o polegar fica aberto ao lado do punho fechado.'
      },
      {
        id: 'q_1_3',
        targetLetter: 'I',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/L.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/I.png', isCorrect: true }
        ],
        hint: 'Apenas o dedinho mindinho fica esticado para cima!'
      },
      {
        id: 'q_1_4',
        targetLetter: 'O',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/O.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/C.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/E.png', isCorrect: false }
        ],
        hint: 'A mão faz o formato redondo de um círculo fechado.'
      },
      {
        id: 'q_1_5',
        targetLetter: 'U',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/V.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/U.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/W.png', isCorrect: false }
        ],
        hint: 'Dois dedos unidos para cima, como se fossem perninhas grudadas.'
      }
    ]
  },
  {
    id: 'etapa_2',
    stageNumber: 2,
    title: 'Primeiras descobertas',
    subtitle: 'Consoantes com formatos visuais bem claros e divertidos de fazer.',
    lettersSummary: 'B, C, D, L · Vamos explorar',
    rewardStars: 15,
    rewardXp: 35,
    letters: [
      { letter: 'B', name: 'Letra B', signImagePath: '/assets/signs/B.png', tip: 'Quatro dedos juntos para cima com o polegar dobrado na palma.' },
      { letter: 'C', name: 'Letra C', signImagePath: '/assets/signs/C.png', tip: 'Mão curvada imitando o próprio desenho da letra C.' },
      { letter: 'D', name: 'Letra D', signImagePath: '/assets/signs/D.png', tip: 'Apenas o indicador para cima e os outros formando uma bolinha com o polegar.' },
      { letter: 'L', name: 'Letra L', signImagePath: '/assets/signs/L.png', tip: 'Polegar e indicador abertos formando o formato exato da letra L.' }
    ],
    questions: [
      {
        id: 'q_2_1',
        targetLetter: 'L',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/L.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/G.png', isCorrect: false }
        ],
        hint: 'Forma um ângulo reto com o polegar e o indicador!'
      },
      {
        id: 'q_2_2',
        targetLetter: 'C',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/O.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/C.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/E.png', isCorrect: false }
        ],
        hint: 'A mão fica aberta lateralmente parecendo a letra C.'
      },
      {
        id: 'q_2_3',
        targetLetter: 'B',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/B.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/F.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/U.png', isCorrect: false }
        ],
        hint: 'Palma aberta com 4 dedos juntos e o polegar dobrado na frente.'
      },
      {
        id: 'q_2_4',
        targetLetter: 'D',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/I.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/D.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/L.png', isCorrect: false }
        ],
        hint: 'Apenas o dedo indicador apontando para cima.'
      }
    ]
  },
  {
    id: 'etapa_3',
    stageNumber: 3,
    title: 'Dedos e formas',
    subtitle: 'Consoantes com posicionamentos de dedos refinados e expressivos.',
    lettersSummary: 'F, G, P, V · Precisão dos dedos',
    rewardStars: 20,
    rewardXp: 40,
    letters: [
      { letter: 'F', name: 'Letra F', signImagePath: '/assets/signs/F.png', tip: 'Indicador dobrado e polegar apoiado POR FORA (F = polegar Fora).' },
      { letter: 'G', name: 'Letra G', signImagePath: '/assets/signs/G.png', tip: 'Indicador apontando para cima e polegar encostado nele na base.' },
      { letter: 'P', name: 'Letra P', signImagePath: '/assets/signs/P.png', tip: 'Formato de K deitado com dedo indicador horizontal e médio para baixo.' },
      { letter: 'V', name: 'Letra V', signImagePath: '/assets/signs/V.png', tip: 'O clássico sinal de vitória com indicador e médio abertos.' }
    ],
    questions: [
      {
        id: 'q_3_1',
        targetLetter: 'V',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/U.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/V.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/W.png', isCorrect: false }
        ],
        hint: 'Dedo indicador e médio abertos em V!'
      },
      {
        id: 'q_3_2',
        targetLetter: 'F',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/T.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/F.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/B.png', isCorrect: false }
        ],
        hint: 'Lembre-se do truque: no F o polegar fica de Fora!'
      },
      {
        id: 'q_3_3',
        targetLetter: 'G',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/G.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/L.png', isCorrect: false }
        ],
        hint: 'O polegar encosta ao lado do indicador apontado para cima.'
      },
      {
        id: 'q_3_4',
        targetLetter: 'P',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/K.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/P.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/H.png', isCorrect: false }
        ],
        hint: 'Mão na horizontal apontando para o lado e dedo médio para baixo.'
      }
    ]
  },
  {
    id: 'etapa_4',
    stageNumber: 4,
    title: 'Desafio dos Três Dedos',
    subtitle: 'Aprenda a não confundir letras com dedos para baixo e para cima!',
    lettersSummary: 'M, N, W · Dedos para baixo e para cima',
    rewardStars: 20,
    rewardXp: 40,
    letters: [
      { letter: 'M', name: 'Letra M', signImagePath: '/assets/signs/M.png', tip: 'Três dedos apontados para baixo (como as três perninhas do M).' },
      { letter: 'N', name: 'Letra N', signImagePath: '/assets/signs/N.png', tip: 'Dois dedos apontados para baixo (as duas perninhas do N).' },
      { letter: 'W', name: 'Letra W', signImagePath: '/assets/signs/W.png', tip: 'Três dedos esticados para cima (indicador, médio e anelar).' }
    ],
    questions: [
      {
        id: 'q_4_1',
        targetLetter: 'M',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/M.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/N.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/E.png', isCorrect: false }
        ],
        hint: 'Conta as 3 pernas caídas para baixo do M!'
      },
      {
        id: 'q_4_2',
        targetLetter: 'N',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/M.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/N.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/U.png', isCorrect: false }
        ],
        hint: 'Apenas 2 pernas caídas para baixo no N!'
      },
      {
        id: 'q_4_3',
        targetLetter: 'W',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/V.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/B.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/W.png', isCorrect: true }
        ],
        hint: 'Três dedos abertos apontados para o alto.'
      }
    ]
  },
  {
    id: 'etapa_5',
    stageNumber: 5,
    title: 'O Quarteto Fechado',
    subtitle: 'Cruzamentos e punhos com diferenciações sutis e muito importantes.',
    lettersSummary: 'Q, R, S, T · Cruzamento e punho',
    rewardStars: 20,
    rewardXp: 45,
    letters: [
      { letter: 'Q', name: 'Letra Q', signImagePath: '/assets/signs/Q.png', tip: 'G virado para baixo, com indicador e polegar apontando para o chão.' },
      { letter: 'R', name: 'Letra R', signImagePath: '/assets/signs/R.png', tip: 'Dedos indicador e médio cruzados (como figa da sorte).' },
      { letter: 'S', name: 'Letra S', signImagePath: '/assets/signs/S.png', tip: 'Punho fechado com o polegar dobrado na frente dos dedos.' },
      { letter: 'T', name: 'Letra T', signImagePath: '/assets/signs/T.png', tip: 'Indicador dobrado e polegar apoiado POR DENTRO (T = polegar Tem dentro).' }
    ],
    questions: [
      {
        id: 'q_5_1',
        targetLetter: 'R',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/R.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/U.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/V.png', isCorrect: false }
        ],
        hint: 'Cruze os dedos para torcer por sorte!'
      },
      {
        id: 'q_5_2',
        targetLetter: 'S',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/A.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/S.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/O.png', isCorrect: false }
        ],
        hint: 'No S o polegar passa na frente de todos os dedos fechados.'
      },
      {
        id: 'q_5_3',
        targetLetter: 'T',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/F.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/T.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/B.png', isCorrect: false }
        ],
        hint: 'O polegar fica por dentro do indicador!'
      },
      {
        id: 'q_5_4',
        targetLetter: 'Q',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/G.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/P.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/Q.png', isCorrect: true }
        ],
        hint: 'Parece o G, mas com a mão virada para o chão.'
      }
    ]
  },
  {
    id: 'etapa_6',
    stageNumber: 6,
    title: 'Letras em movimento',
    subtitle: 'Sinais dinâmicos que têm trajetória no ar: giro, traço e subida.',
    lettersSummary: 'H, J, K, Z · Veja os movimentos',
    rewardStars: 25,
    rewardXp: 50,
    letters: [
      { letter: 'H', name: 'Letra H', signImagePath: '/assets/signs/H.png', tip: 'Configuração em K dando uma volta/giro de 180° no ar.' },
      { letter: 'J', name: 'Letra J', signImagePath: '/assets/signs/J.png', tip: 'Mão com o mindinho do I desenhando uma curva no ar em formato de J.' },
      { letter: 'K', name: 'Letra K', signImagePath: '/assets/signs/K.png', tip: 'Indicador e médio abertos com o polegar no meio, subindo ligeiramente.' },
      { letter: 'Z', name: 'Letra Z', signImagePath: '/assets/signs/Z.png', tip: 'Indicador desenha o zigue-zague da letra Z no ar.' }
    ],
    questions: [
      {
        id: 'q_6_1',
        targetLetter: 'Z',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/Z.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/X.png', isCorrect: false }
        ],
        hint: 'O dedo indicador desenha a letra Z no ar!'
      },
      {
        id: 'q_6_2',
        targetLetter: 'J',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/I.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/J.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/Y.png', isCorrect: false }
        ],
        hint: 'É o mindinho do I desenhando um anzol!'
      },
      {
        id: 'q_6_3',
        targetLetter: 'K',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/K.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/P.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/V.png', isCorrect: false }
        ],
        hint: 'Polegar apoia no meio do indicador e médio, dando um impulsinho para cima.'
      },
      {
        id: 'q_6_4',
        targetLetter: 'H',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/K.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/H.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/P.png', isCorrect: false }
        ],
        hint: 'A mão faz um giro no ar!'
      }
    ]
  },
  {
    id: 'etapa_7',
    stageNumber: 7,
    title: 'Reta final do alfabeto',
    subtitle: 'Completando todas as 26 letras da datilologia brasileira!',
    lettersSummary: 'X, Y · O gancho e o hang-loose',
    rewardStars: 20,
    rewardXp: 45,
    letters: [
      { letter: 'X', name: 'Letra X', signImagePath: '/assets/signs/X.png', tip: 'Indicador dobrado em forma de gancho puxando suavemente em sua direção.' },
      { letter: 'Y', name: 'Letra Y', signImagePath: '/assets/signs/Y.png', tip: 'Polegar e mindinho esticados (o famoso sinal de hang-loose ou telefone).' }
    ],
    questions: [
      {
        id: 'q_7_1',
        targetLetter: 'Y',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/I.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/Y.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/L.png', isCorrect: false }
        ],
        hint: 'Polegar e mindinho abertos!'
      },
      {
        id: 'q_7_2',
        targetLetter: 'X',
        prompt: 'Qual mão combina com esta letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/X.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/G.png', isCorrect: false }
        ],
        hint: 'O indicador dobra como um anzol puxando para você.'
      }
    ]
  },
  {
    id: 'etapa_8',
    stageNumber: 8,
    title: 'Soletrando Palavras',
    subtitle: 'Conecte as letras que aprendeu para soletrar palavras reais em Libras.',
    lettersSummary: 'OI, PAZ, AMOR, BOM · Prática de datilologia',
    rewardStars: 30,
    rewardXp: 60,
    letters: [
      { letter: 'O', name: 'Letra O', signImagePath: '/assets/signs/O.png', tip: 'Primeira letra de OI e segunda de BOM.' },
      { letter: 'I', name: 'Letra I', signImagePath: '/assets/signs/I.png', tip: 'Segunda letra de OI.' },
      { letter: 'P', name: 'Letra P', signImagePath: '/assets/signs/P.png', tip: 'Primeira letra de PAZ.' },
      { letter: 'A', name: 'Letra A', signImagePath: '/assets/signs/A.png', tip: 'Segunda letra de PAZ e primeira de AMOR.' },
      { letter: 'Z', name: 'Letra Z', signImagePath: '/assets/signs/Z.png', tip: 'Letra final de PAZ desenhada no ar.' }
    ],
    questions: [
      {
        id: 'q_8_1',
        targetLetter: 'O',
        prompt: 'Para soletrar "OI", qual é a primeira letra?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/O.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/I.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/U.png', isCorrect: false }
        ],
        hint: 'Comece fazendo o círculo da letra O!'
      },
      {
        id: 'q_8_2',
        targetLetter: 'I',
        prompt: 'E qual é a segunda letra para terminar a palavra "OI"?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/E.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/I.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/L.png', isCorrect: false }
        ],
        hint: 'Erga o dedinho mindinho para a letra I!'
      },
      {
        id: 'q_8_3',
        targetLetter: 'P',
        prompt: 'Para soletrar a palavra "PAZ", qual mão representa a letra P?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/P.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/B.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/K.png', isCorrect: false }
        ],
        hint: 'A mão em K apontada para o lado com o médio para baixo.'
      },
      {
        id: 'q_8_4',
        targetLetter: 'Z',
        prompt: 'Qual letra finaliza a palavra "PAZ"?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/S.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/X.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/Z.png', isCorrect: true }
        ],
        hint: 'O zigue-zague desenhado no ar!'
      }
    ]
  },
  {
    id: 'etapa_9',
    stageNumber: 9,
    title: 'Grande Desafio de Mestre',
    subtitle: 'Misture tudo o que você descobriu e conquiste o Troféu Dourado do Lumi!',
    lettersSummary: 'A até Z · O grande teste de maestria',
    rewardStars: 50,
    rewardXp: 100,
    letters: [
      { letter: 'A', name: 'Vogal A', signImagePath: '/assets/signs/A.png' },
      { letter: 'B', name: 'Consoante B', signImagePath: '/assets/signs/B.png' },
      { letter: 'L', name: 'Consoante L', signImagePath: '/assets/signs/L.png' },
      { letter: 'M', name: 'Consoante M', signImagePath: '/assets/signs/M.png' },
      { letter: 'R', name: 'Consoante R', signImagePath: '/assets/signs/R.png' },
      { letter: 'Z', name: 'Consoante Z', signImagePath: '/assets/signs/Z.png' }
    ],
    questions: [
      {
        id: 'q_9_1',
        targetLetter: 'B',
        prompt: 'Desafio 1 de 5: Qual mão representa a letra B?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/B.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/D.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/P.png', isCorrect: false }
        ],
        hint: 'Quatro dedos juntos para cima.'
      },
      {
        id: 'q_9_2',
        targetLetter: 'R',
        prompt: 'Desafio 2 de 5: Qual mão representa a letra R?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/U.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/R.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/V.png', isCorrect: false }
        ],
        hint: 'Dedos cruzados da sorte.'
      },
      {
        id: 'q_9_3',
        targetLetter: 'M',
        prompt: 'Desafio 3 de 5: Qual mão representa a letra M?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/N.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/W.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/M.png', isCorrect: true }
        ],
        hint: 'Três dedos para baixo.'
      },
      {
        id: 'q_9_4',
        targetLetter: 'L',
        prompt: 'Desafio 4 de 5: Qual mão representa a letra L?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/L.png', isCorrect: true },
          { id: 'opt_2', signImagePath: '/assets/signs/G.png', isCorrect: false },
          { id: 'opt_3', signImagePath: '/assets/signs/D.png', isCorrect: false }
        ],
        hint: 'Formato da letra L com polegar e indicador.'
      },
      {
        id: 'q_9_5',
        targetLetter: 'Z',
        prompt: 'Desafio Final: Qual mão representa a letra Z?',
        options: [
          { id: 'opt_1', signImagePath: '/assets/signs/S.png', isCorrect: false },
          { id: 'opt_2', signImagePath: '/assets/signs/Z.png', isCorrect: true },
          { id: 'opt_3', signImagePath: '/assets/signs/X.png', isCorrect: false }
        ],
        hint: 'Desenhe o Z no ar!'
      }
    ]
  }
];
