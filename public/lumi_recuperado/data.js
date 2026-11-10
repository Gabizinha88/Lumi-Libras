/* Conteúdo do Lumi Libras.
 * Vídeos: extraídos das páginas originais da UFV e verificados em 11/09/2026.
 * Nenhum vídeo é copiado ou alterado. source mantém a página de origem.
 * Emojis ilustram conceitos; somente os vídeos demonstram os sinais.
 * Edite os textos aqui sem alterar as regras em app.js.
 */
window.LUMI_DATA = {
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  motionLetters: 'HJKXYZ',
  stages: [
    {
      title: 'Olá, vogais!',
      letters: 'AEIOU',
      description: 'A, E, I, O, U · Suas primeiras letras',
    },
    {
      title: 'Encontre os pares',
      letters: 'AEIO',
      description: 'Uma letra + uma mão = um par',
    },
    {
      title: 'Novas descobertas',
      letters: 'BCDFGL',
      description: 'B, C, D, F, G, L · Vamos explorar',
    },
    {
      title: 'Mais letras, mais sinais',
      letters: 'MNPQRSTUVW',
      description: 'M até W · Continue descobrindo',
    },
    {
      title: 'Letras em movimento',
      letters: 'HJKXYZ',
      description: 'H, J, K, X, Y, Z · Veja os movimentos',
    },
    {
      title: 'Grande desafio',
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      description: 'Misture tudo o que você descobriu',
    },
  ],
  examples: [
    ['Abacaxi', '🍍'],
    ['Bola', '⚽'],
    ['Casa', '🏠'],
    ['Dado', '🎲'],
    ['Estrela', '⭐'],
    ['Flor', '🌼'],
    ['Gato', '🐱'],
    ['Helicóptero', '🚁'],
    ['Ilha', '🏝️'],
    ['Jacaré', '🐊'],
    ['Kiwi', '🥝'],
    ['Lua', '🌙'],
    ['Maçã', '🍎'],
    ['Navio', '🚢'],
    ['Ovo', '🥚'],
    ['Pato', '🦆'],
    ['Queijo', '🧀'],
    ['Robô', '🤖'],
    ['Sol', '☀️'],
    ['Tartaruga', '🐢'],
    ['Uva', '🍇'],
    ['Vaca', '🐮'],
    ['Wi-fi', '📶'],
    ['Xícara', '☕'],
    ['Yoga', '🧘'],
    ['Zebra', '🦓'],
  ],
  categories: [
    {
      id: 'cumprimentos',
      title: 'Cumprimentos',
      emoji: '👋',
      color: 'blue',
      subtitle: 'UM OI PODE SER O COMEÇO',
      description:
        'Para chegar, se despedir, agradecer e conversar com gentileza.',
    },
    {
      id: 'familia',
      title: 'Família e amigos',
      emoji: '🏡',
      color: 'purple',
      subtitle: 'QUEM FAZ PARTE DA SUA VIDA?',
      description:
        'Para falar das pessoas importantes para você. Cada família tem seu jeito de ser.',
    },
    {
      id: 'escola',
      title: 'Na escola',
      emoji: '🎒',
      color: 'pink',
      subtitle: 'APRENDER E PARTICIPAR',
      description:
        'Para reconhecer materiais, pessoas e espaços da vida escolar.',
    },
    {
      id: 'tempo',
      title: 'Tempo e rotina',
      emoji: '🌤️',
      color: 'teal',
      subtitle: 'HOJE, ONTEM OU AMANHÃ?',
      description:
        'Para conversar sobre quando as coisas acontecem. Bom dia, boa tarde e boa noite estão em Cumprimentos.',
    },
  ],
  words: [
    {
      id: 'oi',
      category: 'cumprimentos',
      label: 'Oi',
      emoji: '👋',
      context: 'Cumprimente alguém quando vocês se encontrarem.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01449-Oi.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=oi&term=temas&value=cumprimentos',
    },
    {
      id: 'bom-dia',
      category: 'cumprimentos',
      label: 'Bom Dia',
      emoji: '🌤️',
      context: 'Um cumprimento para o começo do dia.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01446-Bom-Dia.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=bom-dia&term=temas&value=cumprimentos',
    },
    {
      id: 'boa-tarde',
      category: 'cumprimentos',
      label: 'Boa tarde',
      emoji: '☀️',
      context: 'Um cumprimento para encontrar alguém à tarde.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01445-Boa-Tarde.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=boa-tarde&term=temas&value=cumprimentos',
    },
    {
      id: 'boa-noite',
      category: 'cumprimentos',
      label: 'Boa Noite',
      emoji: '🌙',
      context: 'Um cumprimento para encontrar alguém à noite.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01444-Boa-Noite.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=boa-noite&term=temas&value=cumprimentos',
    },
    {
      id: 'obrigado',
      category: 'cumprimentos',
      label: 'Obrigado',
      emoji: '💛',
      context: 'Agradeça quando alguém ajudar você.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01448-Obrigado.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=obrigado&term=temas&value=cumprimentos',
    },
    {
      id: 'por-favorcom-licenca',
      category: 'cumprimentos',
      label: 'Por Favor/Com Licença',
      emoji: '🤝',
      context:
        'Conheça a forma apresentada pelo acervo para pedir com gentileza. O uso depende do contexto.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01450-Por-favor-com-licença.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=por-favorcom-licenca&term=temas&value=cumprimentos',
    },
    {
      id: 'tchau',
      category: 'cumprimentos',
      label: 'Tchau',
      emoji: '👋',
      context: 'Despeça-se de alguém até o próximo encontro.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01452-Tchau.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=tchau&term=temas&value=cumprimentos',
    },
    {
      id: 'tudo-bem',
      category: 'cumprimentos',
      label: 'Tudo Bem',
      emoji: '😊',
      context: 'Pergunte como a outra pessoa está.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01453-Tudo-bem.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=tudo-bem&term=temas&value=cumprimentos',
    },
    {
      id: 'familia',
      category: 'familia',
      label: 'Família',
      emoji: '🏡',
      context: 'Fale sobre as pessoas que fazem parte da sua família.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/898-familia.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=familia&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'mae',
      category: 'familia',
      label: 'Mãe',
      emoji: '👩',
      context: 'Use ao falar de uma mãe da sua família.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/911-mãe.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=mae&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'pai',
      category: 'familia',
      label: 'Pai',
      emoji: '👨',
      context: 'Use ao falar de um pai da sua família.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/924-pai.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=pai&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'irma',
      category: 'familia',
      label: 'Irmã',
      emoji: '👧',
      context: 'Fale sobre sua irmã ou a irmã de alguém.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/906-irmã.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=irma&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'irmao',
      category: 'familia',
      label: 'Irmão',
      emoji: '👦',
      context: 'Fale sobre seu irmão ou o irmão de alguém.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/907-irmão.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=irmao&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'tia',
      category: 'familia',
      label: 'Tia',
      emoji: '👩‍🦱',
      context: 'Fale sobre uma tia da sua família.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/00933-tia.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=tia&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'tio',
      category: 'familia',
      label: 'Tio',
      emoji: '👨‍🦱',
      context: 'Fale sobre um tio da sua família.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/00934-tio.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=tio&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'amigo',
      category: 'familia',
      label: 'Amigo',
      emoji: '🧑‍🤝‍🧑',
      context: 'Fale de uma pessoa com quem você gosta de brincar e conversar.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/890-amigo.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=amigo&term=temas&value=pessoas-e-familia',
    },
    {
      id: 'escola',
      category: 'escola',
      label: 'Escola',
      emoji: '🏫',
      context: 'Fale sobre o lugar onde você estuda.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/1210-escola.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=escola&term=temas&value=escola',
    },
    {
      id: 'aluno',
      category: 'escola',
      label: 'Aluno',
      emoji: '🧒',
      context: 'Conheça o sinal para quem está aprendendo na escola.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/09/aluno.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=aluno&term=temas&value=escola',
    },
    {
      id: 'caderno',
      category: 'escola',
      label: 'Caderno',
      emoji: '📓',
      context: 'Fale do material onde você desenha e escreve.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/1207-caderno.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=caderno&term=temas&value=escola',
    },
    {
      id: 'caneta',
      category: 'escola',
      label: 'Caneta',
      emoji: '🖊️',
      context: 'Fale deste objeto usado para escrever.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/1208-caneta.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=caneta&term=temas&value=escola',
    },
    {
      id: 'lapis',
      category: 'escola',
      label: 'Lápis',
      emoji: '✏️',
      context: 'Escolha um lápis para escrever ou desenhar.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01483-Lapis.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=lapis&term=temas&value=escola',
    },
    {
      id: 'mochila',
      category: 'escola',
      label: 'Mochila',
      emoji: '🎒',
      context: 'Fale sobre onde você leva seus materiais.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/01/01486-Mochila.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=mochila&term=temas&value=escola',
    },
    {
      id: 'sala-de-aula',
      category: 'escola',
      label: 'Sala de aula',
      emoji: '🏫',
      context: 'Conheça o sinal do espaço em que a turma aprende.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/11/1220-saladeaula.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=sala-de-aula&term=temas&value=escola',
    },
    {
      id: 'desenho',
      category: 'escola',
      label: 'Desenho',
      emoji: '🎨',
      context: 'Compartilhe um desenho ou uma atividade de desenhar.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2017/12/636-desenho.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=desenho&term=temas&value=escola',
    },
    {
      id: 'hoje',
      category: 'tempo',
      label: 'Hoje',
      emoji: '📍',
      context: 'Fale sobre o dia em que estamos.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/746-hoje.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=hoje&term=temas&value=tempo-e-calendario',
    },
    {
      id: 'ontem',
      category: 'tempo',
      label: 'Ontem',
      emoji: '⏮️',
      context: 'Fale sobre algo que aconteceu no dia anterior.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/01528-Ontem.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=ontem&term=temas&value=tempo-e-calendario',
    },
    {
      id: 'amanha',
      category: 'tempo',
      label: 'Amanhã',
      emoji: '⏭️',
      context: 'Fale sobre o que vem no próximo dia.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/742-amanha.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=amanha&term=temas&value=tempo-e-calendario',
    },
    {
      id: 'manha',
      category: 'tempo',
      label: 'Manhã',
      emoji: '🌅',
      context: 'Fale sobre a primeira parte do dia.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/747-manhã.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=manha&term=temas&value=tempo-e-calendario',
    },
    {
      id: 'dia',
      category: 'tempo',
      label: 'Dia',
      emoji: '☀️',
      context: 'Use em conversas sobre os dias e a rotina.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/01516-Dia.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=dia&term=temas&value=tempo-e-calendario',
    },
    {
      id: 'hora',
      category: 'tempo',
      label: 'Hora',
      emoji: '🕒',
      context: 'Converse sobre o horário de uma atividade.',
      video:
        'https://sistemas.cead.ufv.br/capes/dicionario/wp-content/uploads/2018/04/01518-Hora.mp4',
      source:
        'https://sistemas.cead.ufv.br/capes/dicionario/?cadastros=hora&term=temas&value=tempo-e-calendario',
    },
  ],
};
