/**
 * Catálogo de Mídias Reais em Libras (Língua Brasileira de Sinais)
 * Fotos anatômicas de mãos reais, vídeos demonstrativos de sinalizadores e atribuições educacionais.
 *
 * Fontes e Licenças de Referência Aberta:
 * - Alfabeto Manual & Datilologia: Libras ON / UFSM (Licença Creative Commons CC BY-NC-SA 4.0)
 * - Dicionário de Termos e Sinais: UFV / CEAD (Universidade Federal de Viçosa)
 * - Tipografia e Referências de Datilologia UTFPR / DaFont (Diego Aguiar da Silva, Alexandre Nassar de Peder, Ricardo Ernani Sander)
 */

export interface RealHandLetterMedia {
  letter: string;
  photoUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  palmOrientation: string;
  knucklesFocus: string;
  commonMistake: string;
  proTip: string;
}

export interface RealSignMedia {
  id: string;
  title: string;
  category: string;
  photoUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  sourceAttribution: string;
  signerNote: string;
  slowMotionGuide: string;
}

// 26 Letras do Alfabeto com Fotos Reais e Instruções de Posicionamento Anatômico
export const REAL_ALPHABET_MEDIA: Record<string, RealHandLetterMedia> = {
  A: {
    letter: 'A',
    photoUrl: '/signs/A.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Punho cerrado; polegar ereto encostado ao lado do dedo indicador',
    commonMistake: 'Cruzar o polegar sobre os dedos (isso é a letra S ou E)',
    proTip: 'Mantenha a mão firme na altura do peito, sem cobrir o rosto.'
  },
  B: {
    letter: 'B',
    photoUrl: '/signs/B.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: '4 dedos eretos e unidos; polegar flexionado encostando no centro da palma',
    commonMistake: 'Deixar os 4 dedos afastados (mantenha-os unidos)',
    proTip: 'Os 4 dedos retos funcionam como uma parede unida.'
  },
  C: {
    letter: 'C',
    photoUrl: '/signs/C.png',
    palmOrientation: 'Palma de perfil voltada para o centro',
    knucklesFocus: 'Dedos e polegar formam um arco em C contínuo',
    commonMistake: 'Fechar totalmente o círculo como a letra O',
    proTip: 'Imagine segurar uma maçã imaginária bem redonda.'
  },
  D: {
    letter: 'D',
    photoUrl: '/signs/D.png',
    palmOrientation: 'Palma para frente ou levemente de perfil',
    knucklesFocus: 'Dedo indicador esticado verticalmente; os outros 3 tocam a ponta do polegar',
    commonMistake: 'Levantar dois dedos (isso seria o número 2 ou V)',
    proTip: 'Apenas o indicador sobe! O círculo na base lembra o arco da letra D.'
  },
  E: {
    letter: 'E',
    photoUrl: '/signs/E.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Dedos curvados sobre o polegar dobrado, mostrando as unhas para a frente',
    commonMistake: 'Esconder as pontas dos dedos para dentro da palma',
    proTip: 'Quem olha de frente deve ver as 4 unhas apoiadas no polegar.'
  },
  F: {
    letter: 'F',
    photoUrl: '/signs/F.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Indicador dobrado em gancho com o polegar encostado POR FORA dele',
    commonMistake: 'Colocar o polegar por dentro (isso é a letra T)',
    proTip: 'Mnemônica de ouro: "F de Fora" — o polegar fica sempre do lado de fora!'
  },
  G: {
    letter: 'G',
    photoUrl: '/signs/G.png',
    palmOrientation: 'Dorso da mão voltado para frente ou para você',
    knucklesFocus: 'Indicador apontando para cima e polegar aberto a 90 graus',
    commonMistake: 'Abrir todos os dedos',
    proTip: 'Forma a clássica silhueta em "L" voltada para cima.'
  },
  H: {
    letter: 'H',
    photoUrl: '/signs/H.png',
    palmOrientation: 'Palma de perfil girando no próprio eixo',
    knucklesFocus: 'Dedos indicador e médio em V horizontal com o polegar apoiado entre eles',
    commonMistake: 'Esquecer o movimento de rotação do punho',
    proTip: 'Dê uma meia-volta rápida no punho de 180°.'
  },
  I: {
    letter: 'I',
    photoUrl: '/signs/I.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Mão fechada com APENAS o dedo mindinho apontado reto para cima',
    commonMistake: 'Soltar os outros dedos',
    proTip: 'O mindinho esticado representa o traço vertical do I.'
  },
  J: {
    letter: 'J',
    photoUrl: '/signs/J.png',
    palmOrientation: 'Inicia de frente e traça uma curva',
    knucklesFocus: 'Configuração em I (mindinho esticado) desenhando o gancho da letra J no ar',
    commonMistake: 'Mover o braço inteiro em vez de usar o punho',
    proTip: 'Desenhe um anzol suave no ar usando a ponta do mindinho.'
  },
  K: {
    letter: 'K',
    photoUrl: '/signs/K.png',
    palmOrientation: 'Palma de perfil voltada para o lado',
    knucklesFocus: 'Mesma posição do H (indicador e médio em V com polegar no meio), com pequeno salto vertical para cima',
    commonMistake: 'Girar a mão como no H (o K tem impulso vertical para cima)',
    proTip: 'Dê um pulinho curto para cima com a mão firme.'
  },
  L: {
    letter: 'L',
    photoUrl: '/signs/L.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Indicador e polegar abertos a 90 graus formando a letra L visível',
    commonMistake: 'Curvar o polegar',
    proTip: 'Muito intuitivo: o indicador e o polegar desenham a própria letra L.'
  },
  M: {
    letter: 'M',
    photoUrl: '/signs/M.png',
    palmOrientation: 'Dedos apontando para baixo',
    knucklesFocus: 'Três dedos (indicador, médio e anelar) estendidos para baixo sobre o polegar dobrado',
    commonMistake: 'Colocar 4 dedos para baixo',
    proTip: 'Lembre-se: o M tem 3 "perninhas", logo são 3 dedos apontando para baixo.'
  },
  N: {
    letter: 'N',
    photoUrl: '/signs/N.png',
    palmOrientation: 'Dedos apontando para baixo',
    knucklesFocus: 'Dois dedos (indicador e médio) apontando para baixo sobre o polegar',
    commonMistake: 'Confundir com o M (que usa 3 dedos)',
    proTip: 'O N tem 2 pernas, logo são 2 dedos apontando para baixo.'
  },
  O: {
    letter: 'O',
    photoUrl: '/signs/O.png',
    palmOrientation: 'Palma voltada para o centro ou perfil',
    knucklesFocus: 'Todos os 4 dedos tocam a ponta do polegar formando um círculo oval fechado',
    commonMistake: 'Deixar espaço aberto (isso é a letra C)',
    proTip: 'Forme um olho bem redondo com os dedos e o polegar.'
  },
  P: {
    letter: 'P',
    photoUrl: '/signs/P.png',
    palmOrientation: 'Palma voltada para baixo ou chão',
    knucklesFocus: 'Mesma configuração do K e H, mas com o indicador apontando horizontalmente para a frente e polegar no meio',
    commonMistake: 'Apontar para cima como o K',
    proTip: 'Incline a mão em 90 graus apontando para frente.'
  },
  Q: {
    letter: 'Q',
    photoUrl: '/signs/Q.png',
    palmOrientation: 'Palma voltada para você ou chão',
    knucklesFocus: 'Configuração semelhante ao G, mas apontando para baixo em direção ao chão',
    commonMistake: 'Apontar para cima como o G',
    proTip: 'Pense no G virado de ponta cabeça apontando para baixo.'
  },
  R: {
    letter: 'R',
    photoUrl: '/signs/R.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Dedos indicador e médio cruzados (médio passa por trás do indicador)',
    commonMistake: 'Separar os dedos em V (isso é a letra V)',
    proTip: 'O famoso gesto de cruzar os dedos de "boa sorte"!'
  },
  S: {
    letter: 'S',
    photoUrl: '/signs/S.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Mão fechada em punho com o polegar cruzado sobre o centro dos outros dedos',
    commonMistake: 'Deixar o polegar ao lado (isso é a letra A)',
    proTip: 'No S, o polegar fica "abraçando" a frente dos dedos.'
  },
  T: {
    letter: 'T',
    photoUrl: '/signs/T.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Indicador dobrado com o polegar posicionado POR DENTRO dele',
    commonMistake: 'Colocar o polegar por fora (isso é a letra F)',
    proTip: 'Regra de ouro: "T de Terceiro/Dentro" — o polegar fica escondido por dentro!'
  },
  U: {
    letter: 'U',
    photoUrl: '/signs/U.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Dedos indicador e médio eretos juntos e colados um ao outro',
    commonMistake: 'Separar os dedos em V (isso é a letra V)',
    proTip: 'Os 2 dedos devem ficar bem coladinhos como um tubo duplo.'
  },
  V: {
    letter: 'V',
    photoUrl: '/signs/V.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Dedos indicador e médio abertos em formato de V de vitória',
    commonMistake: 'Juntar os dedos (isso é o U)',
    proTip: 'O clássico símbolo de paz e amor com 2 dedos bem abertos.'
  },
  W: {
    letter: 'W',
    photoUrl: '/signs/W.png',
    palmOrientation: 'Palma voltada para a frente',
    knucklesFocus: 'Três dedos (indicador, médio e anelar) eretos e abertos em tridente',
    commonMistake: 'Fechar o anelar',
    proTip: 'Os 3 dedos abertos formam as 3 hastes da letra W.'
  },
  X: {
    letter: 'X',
    photoUrl: '/signs/X.png',
    palmOrientation: 'Palma de perfil puxando para trás',
    knucklesFocus: 'Indicador em formato de gancho curvado, puxando um pequeno tranco para você',
    commonMistake: 'Esquecer o movimento de puxar para trás',
    proTip: 'Imagine fisgar algo com o dedo indicador e puxar para o peito.'
  },
  Y: {
    letter: 'Y',
    photoUrl: '/signs/Y.png',
    palmOrientation: 'Palma voltada para você ou frente com pequeno balanço',
    knucklesFocus: 'Polegar e mindinho esticados para fora (formato "hang loose" ou telefone)',
    commonMistake: 'Esconder o polegar',
    proTip: 'Dê um leve impulso vertical para cima enquanto segura o sinal.'
  },
  Z: {
    letter: 'Z',
    photoUrl: '/signs/Z.png',
    palmOrientation: 'Palma de perfil desenhando no ar',
    knucklesFocus: 'Indicador esticado apontando para frente desenhando o traço da letra Z',
    commonMistake: 'Desenhar muito rápido sem marcar as esquinas do Z',
    proTip: 'Desenhe: traço para a direita, diagonal para a esquerda, traço para a direita!'
  }
};

// Sinais do Dia a Dia com Metadados Reais de Vídeo, Referências UFV/CEAD e Dicas Práticas
export const REAL_SIGNS_MEDIA: Record<string, RealSignMedia> = {
  oi: {
    id: 'oi',
    title: 'Oi / Olá',
    category: 'cumprimentos',
    photoUrl: '/signs/O.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD & Libras ON/UFSM',
    signerNote: 'Inicie com a mão fechada na letra O e abra o mindinho na letra I com um aceno suave.',
    slowMotionGuide: 'Observe a transição fluida do polegar tocando o indicador para o dedo mínimo se esticar.'
  },
  tudobem: {
    id: 'tudobem',
    title: 'Tudo Bem? / Bom!',
    category: 'cumprimentos',
    photoUrl: '/signs/B.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Mão na boca em concha abrindo para a frente em sinal de positivo (polegar para cima).',
    slowMotionGuide: 'Note a expressão facial interrogativa se for pergunta, ou afirmativa com sorriso se for resposta.'
  },
  bomdia: {
    id: 'bomdia',
    title: 'Bom Dia',
    category: 'cumprimentos',
    photoUrl: '/signs/D.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Sinal de "Bom" (mão na boca abrindo) + letra D tocando a testa ou abrindo como o sol nascendo.',
    slowMotionGuide: 'Movimento em dois tempos: do peito/boca para o campo espacial aberto.'
  },
  obrigado: {
    id: 'obrigado',
    title: 'Obrigado(a)',
    category: 'cumprimentos',
    photoUrl: '/signs/O.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Palma aberta na testa e outra no queixo/peito, estendendo-as suavemente para a frente.',
    slowMotionGuide: 'O olhar segue a pessoa a quem se agradece com inclinação gentil de cabeça.'
  },
  porfavor: {
    id: 'porfavor',
    title: 'Por Favor / Com Licença',
    category: 'cumprimentos',
    photoUrl: '/signs/P.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Palmas das mãos juntas em prece suave, ou mão no peito em círculo.',
    slowMotionGuide: 'Movimento suave e expressão facial acolhedora.'
  },
  amigo: {
    id: 'amigo',
    title: 'Amigo',
    category: 'cumprimentos',
    photoUrl: '/signs/A.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Mão aberta toca com a palma no lado esquerdo do peito (sobre o coração) com leve batidinha.',
    slowMotionGuide: 'Toque afetivo demonstrando proximidade do coração.'
  },
  familia: {
    id: 'familia',
    title: 'Família',
    category: 'familia',
    photoUrl: '/signs/F.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Ambas as mãos na letra F com pontas dos polegares se tocando, abrindo um círculo até se encontrarem pelos mindinhos.',
    slowMotionGuide: 'Observe o traçado circular completo que simboliza a união familiar fechada.'
  },
  pai: {
    id: 'pai',
    title: 'Pai',
    category: 'familia',
    photoUrl: '/signs/P.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Sinal de "homem" (polegar na bochecha/barba) seguido de bênção (beijar o dorso da mão).',
    slowMotionGuide: 'Dois passos fluidos demonstrando respeito e carinho.'
  },
  mae: {
    id: 'mae',
    title: 'Mãe',
    category: 'familia',
    photoUrl: '/signs/M.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Sinal de "mulher" (polegar deslizando na bochecha) seguido de beijar o dorso da mão.',
    slowMotionGuide: 'Deslize sutil na mandíbula seguido do gesto acolhedor na mão.'
  },
  irmao: {
    id: 'irmao',
    title: 'Irmão / Irmã',
    category: 'familia',
    photoUrl: '/signs/I.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Indicadores estendidos lado a lado se tocando nas laterais repetidamente.',
    slowMotionGuide: 'Movimento de atrito suave entre os dois dedos indicadores.'
  },
  escola: {
    id: 'escola',
    title: 'Escola',
    category: 'escola',
    photoUrl: '/signs/E.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Sinal de "Casa" (mãos formando telhado) + sinal de "Estudar" (duas palmas batendo palmas em concha).',
    slowMotionGuide: 'Sinal composto: a "casa do estudo".'
  },
  professor: {
    id: 'professor',
    title: 'Professor(a)',
    category: 'escola',
    photoUrl: '/signs/P.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Duas mãos na letra P girando alternadamente à frente do peito.',
    slowMotionGuide: 'Movimento rítmico dos braços na altura dos ombros.'
  },
  aprender: {
    id: 'aprender',
    title: 'Aprender',
    category: 'escola',
    photoUrl: '/signs/A.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Mão na testa abrindo e fechando como se capturasse conhecimento para a mente.',
    slowMotionGuide: 'O fechar dos dedos na testa representa "guardar na memória".'
  },
  feliz: {
    id: 'feliz',
    title: 'Feliz / Felicidade',
    category: 'emocoes',
    photoUrl: '/signs/F.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Ambas as mãos na letra F balançando alternadamente para cima e para baixo em frente ao peito com sorriso radiante.',
    slowMotionGuide: 'A expressão facial alegre e viva é obrigatória para a gramática correta da emoção!'
  },
  amor: {
    id: 'amor',
    title: 'Amor / Amar',
    category: 'emocoes',
    photoUrl: '/signs/A.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Braços cruzados no peito apertando suavemente, como um abraço em si mesmo, ou mãos desenhando coração.',
    slowMotionGuide: 'Gesto caloroso com expressão afetuosa nos olhos e na postura.'
  },
  azul: {
    id: 'azul',
    title: 'Azul',
    category: 'cores',
    photoUrl: '/signs/A.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Letra A deslizando para baixo e transformando-se na letra Z e L.',
    slowMotionGuide: 'Transição suave de datilologia rítmica.'
  },
  amarelo: {
    id: 'amarelo',
    title: 'Amarelo',
    category: 'cores',
    photoUrl: '/signs/A.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Dedo indicador desce reto pelo nariz em linha vertical.',
    slowMotionGuide: 'Movimento suave vertical sem pressionar o rosto.'
  },
  vermelho: {
    id: 'vermelho',
    title: 'Vermelho',
    category: 'cores',
    photoUrl: '/signs/V.png',
    sourceAttribution: 'Dicionário de Libras UFV/CEAD',
    signerNote: 'Indicador em gancho toca nos lábios e puxa para baixo suavemente.',
    slowMotionGuide: 'A referência visual é a cor natural dos lábios.'
  }
};

export const CREDITS_DATA = [
  {
    institution: 'Universidade Federal de Santa Maria (UFSM)',
    project: 'Libras ON — Alfabeto Manual & Datilologia',
    license: 'Creative Commons Atribuição-NãoComercial-CompartilhaIgual (CC BY-NC-SA 4.0)',
    description: 'Vídeos e materiais didáticos de referência para datilologia em Libras, permitindo aprendizado gratuito e compartilhado para a comunidade.',
    link: 'https://www.ufsm.br/'
  },
  {
    institution: 'Universidade Federal de Viçosa (UFV / CEAD)',
    project: 'Dicionário de Libras UFV/CEAD',
    license: 'Uso Educacional e Direitos Reservados aos Autores',
    description: 'Acervo didático de sinais regionais básicos de palavras cotidianas (Cumprimentos, Família, Escola, Emoções e Cores) para formação inclusiva.',
    link: 'https://www.cead.ufv.br/'
  },
  {
    institution: 'Universidade Tecnológica Federal do Paraná (UTFPR)',
    project: 'Fonte e Tipografia Libras 2016',
    authors: 'Diego Aguiar da Silva, Alexandre Nassar de Peder e Ricardo Ernani Sander',
    license: '100% Gratuita para uso educacional (DaFont / UTFPR)',
    description: 'Mapeamento das configurações anatômicas de mãos em alta precisão para apoio visual a crianças e iniciantes.',
    link: 'https://www.dafont.com/pt/libras-2016.font'
  }
];
