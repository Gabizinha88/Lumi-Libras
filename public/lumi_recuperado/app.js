/* Lumi Libras — HTML5 + JavaScript puro, sem framework ou etapa de compilação.
 * Conteúdo pedagógico: data.js. Aparência: styles.css. Estrutura: index.html.
 * O progresso é local; a chave antiga preserva as conquistas da primeira versão.
 */
(() => {
  'use strict';
  const { alphabet, stages, words, categories, examples, motionLetters } =
    window.LUMI_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character],
    );
  const storageKey = 'mundo-das-maos-v1';
  const dialog = $('#detail-dialog');
  let activePage = 'inicio';
  let selectedLetter = 'A';
  let selectedCategory = 'cumprimentos';
  let lesson = null;
  let memory = null;
  let memoryTimer = null;
  let videoTimer = null;
  let dialogWord = null;
  let videoWatched = false;
  let lumiStep = 0;

  // 1. Progresso: valida os dados salvos antes de utilizá-los.
  function readProgress() {
    const empty = { levels: [], seen: [], wins: 0, words: [], paused: false };
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '{}') || {};
      const unique = (items, predicate) => [
        ...new Set(Array.isArray(items) ? items.filter(predicate) : []),
      ];
      return {
        levels: unique(
          value.levels,
          (n) => Number.isInteger(n) && n >= 0 && n < stages.length,
        ),
        seen: unique(
          value.seen,
          (letter) =>
            typeof letter === 'string' &&
            letter.length === 1 &&
            alphabet.includes(letter),
        ),
        wins: Number.isInteger(value.wins)
          ? Math.max(0, Math.min(value.wins, 10000))
          : 0,
        words: unique(value.words, (id) =>
          words.some((word) => word.id === id),
        ),
        paused: value.paused === true,
      };
    } catch {
      $('#storage-warning').hidden = false;
      return empty;
    }
  }
  const progress = readProgress();
  function saveProgress() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      $('#storage-warning').hidden = false;
    }
    updateStars();
  }
  function updateStars() {
    const total =
      progress.levels.length * 10 +
      progress.seen.length +
      progress.wins * 5 +
      progress.words.length;
    $('#star-count').textContent = total;
    $('.stars').setAttribute('aria-label', `${total} estrelas conquistadas`);
  }
  function announce(message) {
    $('#announcement').textContent = message;
  }
  // A interface do personagem recebe apenas eventos; as regras ficam aqui.
  function lumiFeedback(message, success = false) {
    document.dispatchEvent(new CustomEvent('lumi:feedback', { detail: { message, success } }));
  }
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function signImage(letter, decorative = false) {
    return `<img class="sign-image" src="assets/signs/${letter}.png" width="360" height="360" alt="${decorative ? '' : `Configuração da letra ${letter} em Libras`}" draggable="false">`;
  }

  // 2. Navegação: o hash permite compartilhar diretamente uma atividade.
  function navigate(moveFocus = true) {
    const requested = location.hash.slice(1) || 'inicio';
    const id = requested === 'atividades' ? 'inicio' : requested;
    const page = $(
      `#${['inicio', 'alfabeto', 'sinais', 'memoria', 'trilha'].includes(id) ? id : 'inicio'}`,
    );
    activePage = page.id;
    $$('.page').forEach((section) => {
      section.hidden = section !== page;
    });
    $$('.site-header nav a').forEach((link) => {
      if (link.hash === `#${activePage}`)
        link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (activePage === 'alfabeto') renderAlphabet();
    if (activePage === 'sinais') renderWords();
    if (activePage === 'memoria') renderMemory();
    if (activePage === 'trilha') renderTrail();
    if (requested === 'atividades')
      $('#atividades').scrollIntoView({ behavior: 'smooth' });
    else if (moveFocus) {
      window.scrollTo(0, 0);
      $('#main').focus({ preventScroll: true });
    }
  }
  function go(page) {
    if (location.hash === `#${page}`) navigate();
    else location.hash = page;
  }
  window.addEventListener('hashchange', () => navigate());

  // 3. Apresentação do mascote: mensagens curtas e animação que pode ser pausada.
  const messages = [
    'Vou acompanhar você em cada descoberta. Vamos brincar de aprender?',
    'No alfabeto, você escolhe uma letra e descobre a mão que combina com ela!',
    'Em Sinais do dia a dia, vamos aprender a cumprimentar e conversar sobre família e escola.',
    'Na memória, encontre os pares. Na trilha, resolva desafios e colecione estrelas. Você escolhe!',
  ];
  $('#lumi-next').addEventListener('click', () => {
    lumiStep = (lumiStep + 1) % messages.length;
    $('#lumi-message').textContent = messages[lumiStep];
    announce(messages[lumiStep]);
  });
  function updateMotion() {
    document.body.classList.toggle('paused', progress.paused);
    $('#motion-button').textContent = progress.paused
      ? '▷ Ativar animações'
      : 'Ⅱ Pausar animações';
    $('#motion-button').setAttribute('aria-pressed', String(progress.paused));
  }
  $('#motion-button').addEventListener('click', () => {
    progress.paused = !progress.paused;
    updateMotion();
    saveProgress();
  });

  // 4. Alfabeto: a imagem representa a letra, nunca o sinal da palavra ilustrada.
  function renderAlphabet() {
    const index = alphabet.indexOf(selectedLetter);
    const [example, emoji] = examples[index];
    $('#alphabet-content').innerHTML = `
      <div class="alphabet-layout">
        <section class="panel alphabet-picker"><div class="panel-heading"><h2>Uma letra de cada vez</h2><span class="pill">${progress.seen.length} / 26</span></div>
          <div class="letter-grid">${[...alphabet].map((letter) => `<button class="letter-button ${letter === selectedLetter ? 'selected' : ''}" data-action="letter" data-letter="${letter}" aria-pressed="${letter === selectedLetter}">${letter}${progress.seen.includes(letter) ? '<span class="tiny-check" aria-label="Explorada">✓</span>' : ''}</button>`).join('')}</div>
          <p class="tip">★ Cada nova letra explorada vale <b>1 estrela</b>. Experimente fazer a mão também!</p>
          <button class="button outline" data-action="alphabet-video">▷ Ver o alfabeto em movimento</button>
        </section>
        <section class="letter-detail" aria-live="polite"><div class="panel-heading"><span class="eyebrow">LETRA ${selectedLetter}</span><span class="pill">${motionLetters.includes(selectedLetter) ? 'Com movimento' : 'Observe a mão'}</span></div>
          <div class="letter-and-sign"><b>${selectedLetter}</b>${signImage(selectedLetter)}</div>
          <div class="word-example"><span aria-hidden="true">${emoji}</span><div><small>EM PORTUGUÊS</small><h3>${selectedLetter} de ${escape(example)}</h3></div></div>
          <p class="small-note">A mão acima representa a letra, não o sinal da palavra.</p>
          ${motionLetters.includes(selectedLetter) ? '<button class="text-button" data-action="alphabet-video">▷ Veja também o movimento no vídeo</button>' : ''}
          <div class="letter-arrows"><button class="button outline" data-action="previous-letter" aria-label="Letra anterior">←</button><span>${index + 1} de 26</span><button class="button outline" data-action="next-letter" aria-label="Próxima letra">→</button></div>
        </section>
      </div>`;
  }
  function chooseLetter(letter, focusGrid = false) {
    if (!alphabet.includes(letter) || letter.length !== 1) return;
    selectedLetter = letter;
    if (!progress.seen.includes(letter)) {
      progress.seen.push(letter);
      saveProgress();
    }
    renderAlphabet();
    if (focusGrid)
      $(`[data-letter="${letter}"]`).focus({ preventScroll: true });
  }

  // 5. Vocabulário: vídeos originais da UFV, por situação cotidiana.
  function renderWords() {
    const category = categories.find((item) => item.id === selectedCategory);
    const list = words.filter((word) => word.category === selectedCategory);
    $('#words-content').innerHTML = `
      <div class="category-grid" aria-label="Escolha um tema">${categories.map((item) => `<button class="category-card ${item.color} ${item.id === selectedCategory ? 'selected' : ''}" data-action="category" data-category="${item.id}" aria-pressed="${item.id === selectedCategory}"><span aria-hidden="true">${item.emoji}</span><b>${item.title}</b><small>${words.filter((word) => word.category === item.id).length} sinais para descobrir</small></button>`).join('')}</div>
      <section class="panel vocabulary-panel"><div class="panel-heading"><div><span class="eyebrow">${category.subtitle}</span><h2>${category.title}</h2></div><span class="pill">${list.filter((word) => progress.words.includes(word.id)).length} / ${list.length} praticados</span></div>
        <p>${category.description}</p>
        <div class="vocabulary-grid">${list.map((word) => `<button class="word-card" data-action="word" data-word="${word.id}"><span class="word-emoji" aria-hidden="true">${word.emoji}</span><h3>${escape(word.label)}</h3><span class="word-play">${progress.words.includes(word.id) ? '✓ Praticado · Rever' : '▷ Ver o sinal'}</span></button>`).join('')}</div>
        <p class="source-note">Demonstrações: Dicionário de Libras da UFV. Há variações regionais de sinais. Os desenhos nos cartões ilustram o significado; o vídeo mostra o sinal.</p>
      </section>`;
  }
  function openWord(id) {
    const word = words.find((item) => item.id === id);
    if (!word) return;
    dialogWord = word;
    videoWatched = false;
    showDialog(`<span class="eyebrow">VAMOS PRATICAR?</span><h2 id="dialog-title">${word.emoji} ${escape(word.label)}</h2><p>${escape(word.context)}</p>
      <video id="word-video" controls playsinline preload="metadata" aria-label="Demonstração em Libras: ${escape(word.label)}" src="${escape(word.video)}"></video>
      <p id="video-fallback" class="video-fallback" hidden>O vídeo está demorando ou não carregou. Você também pode assistir na página da UFV, pelo link abaixo.</p>
      <div class="video-tools"><button class="button outline" data-action="replay">↻ Repetir</button><label>Velocidade <select id="video-speed"><option value="1">Normal</option><option value="0.75">Mais devagar</option><option value="0.5">Bem devagar</option></select></label></div>
      <div class="practice-row"><p>Observe as mãos, o rosto e o movimento. Assista até o fim e pratique no seu ritmo.</p><button id="practice-button" class="button" data-action="practice" disabled>${progress.words.includes(id) ? '✓ Já praticado' : 'Assista antes de marcar'}</button></div>
      <p class="source-note">Vídeo original da Universidade Federal de Viçosa / CEAD, exibido diretamente da fonte, sem alterações. Sinal regional do acervo. <a href="${escape(word.source)}" target="_blank" rel="noopener noreferrer">Abrir na UFV ↗</a></p>`);
    const video = $('#word-video');
    videoTimer = setTimeout(() => {
      if ($('#video-fallback')) $('#video-fallback').hidden = false;
    }, 12000);
    video.addEventListener('loadedmetadata', () => clearTimeout(videoTimer), {
      once: true,
    });
    video.addEventListener('error', () => {
      $('#video-fallback').hidden = false;
      clearTimeout(videoTimer);
    });
    video.addEventListener('ended', () => {
      videoWatched = true;
      const done = progress.words.includes(word.id);
      $('#practice-button').disabled = done;
      $('#practice-button').textContent = done
        ? '✓ Já praticado'
        : 'Já pratiquei · +1 estrela';
    });
    $('#video-speed').addEventListener('change', (event) => {
      video.playbackRate = Number(event.target.value);
    });
  }
  function markPractice() {
    if (!dialogWord || !videoWatched || progress.words.includes(dialogWord.id))
      return;
    progress.words.push(dialogWord.id);
    saveProgress();
    lumiFeedback('Mais um sinal praticado! Vamos levar essa descoberta para o dia a dia?', true);
    $('#practice-button').disabled = true;
    $('#practice-button').textContent = '✓ Prática registrada!';
    announce('Mais uma descoberta! Você ganhou uma estrela.');
    renderWords();
  }

  // 6. Memória: trava a terceira carta e cancela o temporizador ao reiniciar.
  function startMemory(pairs = 4, fromTrail = false) {
    clearTimeout(memoryTimer);
    const letters = fromTrail
      ? [...'AEIO']
      : shuffle(
          [...alphabet].filter((letter) => !motionLetters.includes(letter)),
        ).slice(0, pairs);
    memory = {
      cards: shuffle(
        letters.flatMap((letter) => [
          { id: `${letter}-letter`, letter, kind: 'letter' },
          { id: `${letter}-sign`, letter, kind: 'sign' },
        ]),
      ),
      open: [],
      matched: [],
      moves: 0,
      pairs,
      fromTrail,
      won: false,
      message: 'Vire duas cartas: uma letra e uma mão.',
    };
    go('memoria');
  }
  function renderMemory() {
    if (!memory) {
      $('#memory-content').innerHTML =
        `<section class="panel memory-start"><div class="memory-demo"><span>A</span><b>+</b><span>${signImage('A')}</span></div><h2>Uma letra + uma mão = um par!</h2><p>Vire duas cartas. Se combinarem, elas ficam abertas.<br>Se forem diferentes, observe e tente outra vez.</p><div class="button-row"><button class="button" data-action="start-memory" data-pairs="4">▷ Jogar com 4 pares</button><button class="button outline" data-action="start-memory" data-pairs="6">Desafio: 6 pares →</button></div></section>`;
      return;
    }
    $('#memory-content').innerHTML =
      `<section class="panel"><div class="panel-heading"><span class="pill">${memory.matched.length} / ${memory.pairs} pares · ${memory.moves} jogadas</span><button class="text-button" data-action="new-memory">↻ Nova partida</button></div><div class="memory-grid" tabindex="-1">${memory.cards
        .map((card, index) => {
          const matched = memory.matched.includes(card.letter);
          const open = matched || memory.open.includes(card.id);
          return `<button class="memory-card ${open ? 'flipped' : ''} ${matched ? 'matched' : ''}" data-action="flip" data-card="${card.id}" ${open || memory.open.length === 2 || memory.won ? 'disabled' : ''} aria-label="${matched ? `Par ${card.letter} encontrado` : `Carta ${index + 1}${open ? ' aberta' : ', virar'}`}"><span class="card-inner"><span class="card-back" aria-hidden="true"><img src="assets/logo.png" alt=""><small>LUMI LIBRAS</small></span><span class="card-face" aria-hidden="true">${open ? (card.kind === 'letter' ? `<b>${card.letter}</b>` : signImage(card.letter, true)) : ''}${matched ? '<i>✓</i>' : ''}</span></span></button>`;
        })
        .join(
          '',
        )}</div><p class="feedback ${memory.won ? 'success' : ''}" role="status">${memory.message}</p>${memory.won ? `<div class="celebration"><span class="prize" aria-hidden="true">🏆</span><h2>Memória de explorador!</h2><p>Você ganhou 5 estrelas${memory.fromTrail ? ' e concluiu a etapa da memória' : ''}.</p><div class="button-row"><button class="button" data-action="repeat-memory">Jogar de novo</button><button class="button outline" data-action="trail-list">Ver minha trilha →</button></div></div>` : ''}</section>`;
  }
  function flipCard(id) {
    if (
      !memory ||
      memory.won ||
      memory.open.length === 2 ||
      memory.open.includes(id)
    )
      return;
    const card = memory.cards.find((item) => item.id === id);
    if (!card || memory.matched.includes(card.letter)) return;
    memory.open.push(id);
    memory.message = 'Agora escolha a outra carta.';
    if (memory.open.length === 2) {
      memory.moves++;
      const first = memory.cards.find((item) => item.id === memory.open[0]);
      if (first.letter === card.letter) {
        memory.matched.push(card.letter);
        memory.open = [];
        memory.message = '✓ Encontrou um par! Muito bem!';
        lumiFeedback('Você encontrou o par! Minha estrela está brilhando!', true);
        if (memory.matched.length === memory.pairs) {
          memory.won = true;
          progress.wins++;
          if (memory.fromTrail && !progress.levels.includes(1))
            progress.levels.push(1);
          saveProgress();
          memory.message = '★ Todos os pares encontrados!';
        }
      } else {
        memory.message =
          'Essas cartas são diferentes. Observe e tente outra vez!';
        lumiFeedback('Vamos guardar esses lugares na memória. Você pode tentar outra vez!');
        memoryTimer = setTimeout(() => {
          memory.open = [];
          if (activePage === 'memoria') {
            renderMemory();
            $('.memory-card:not(:disabled)')?.focus({ preventScroll: true });
          }
        }, 1500);
      }
    }
    renderMemory();
    const next = $('.memory-card:not(:disabled)') || $('.memory-grid');
    next?.focus({ preventScroll: true });
  }

  // 7. Trilha: etapas repetíveis; somente a primeira conclusão concede 10 estrelas.
  function startLesson(index) {
    if (!Number.isInteger(index) || !stages[index]) return;
    if (index === 1) {
      startMemory(4, true);
      return;
    }
    lesson = {
      index,
      phase: 'learn',
      question: 0,
      answer: null,
      questions: shuffle([...stages[index].letters])
        .slice(0, 5)
        .map((letter) => ({
          letter,
          options: shuffle([
            letter,
            ...shuffle([...alphabet].filter((item) => item !== letter)).slice(
              0,
              2,
            ),
          ]),
        })),
    };
    go('trilha');
  }
  function renderTrail() {
    if (lesson) {
      renderLesson();
      return;
    }
    const next = stages.findIndex(
      (_, index) => !progress.levels.includes(index),
    );
    $('#trail-content').innerHTML =
      `<div class="trail-layout"><section class="panel"><div class="panel-heading"><h2>O caminho das letras</h2><span class="pill">${progress.levels.length} / 6 etapas</span></div><ol class="trail-list">${stages.map((stage, index) => `<li><button class="level-node ${progress.levels.includes(index) ? 'completed' : next === index ? 'current' : ''}" data-action="lesson" data-level="${index}" aria-label="Etapa ${index + 1}: ${stage.title}${progress.levels.includes(index) ? ', concluída, jogar novamente' : ''}">${progress.levels.includes(index) ? '✓' : index + 1}</button><div><span class="eyebrow">ETAPA ${index + 1}</span><h3>${stage.title}</h3><p>${stage.description}</p>${next === index ? `<button class="button" data-action="lesson" data-level="${index}">Vamos aprender →</button>` : ''}</div></li>`).join('')}</ol></section><aside class="panel progress-panel"><img src="assets/lumi.png" alt="Lumi comemora suas descobertas" width="1254" height="1254"><h2>Cada descoberta conta!</h2><p>Sem pressa. Você pode tentar quantas vezes quiser.</p><label for="trail-progress">${progress.levels.length} de 6 etapas</label><progress id="trail-progress" value="${progress.levels.length}" max="6"></progress><div class="badges"><span class="${progress.levels.length ? 'earned' : ''}" title="Concluir uma etapa">★</span><span class="${progress.wins ? 'earned' : ''}" title="Completar a memória">▦</span><span class="${progress.levels.length === 6 ? 'earned' : ''}" title="Completar a trilha">🏆</span></div><p class="small-note">Seu progresso fica salvo neste navegador.</p></aside></div>`;
  }
  function renderLesson() {
    const stage = stages[lesson.index];
    const heading = `<div class="panel-heading"><button class="text-button" data-action="trail-list">← Voltar à trilha</button><span class="pill">Etapa ${lesson.index + 1} · ${stage.title}</span></div>`;
    let content = '';
    if (lesson.phase === 'learn') {
      content = `<span class="eyebrow">1. OBSERVE AS MÃOS</span><h2>${stage.title}</h2><p>Veja a letra e a mão. Experimente fazer com a sua!</p>${lesson.index >= 4 ? '<p class="tip">Estas letras podem ter movimento. <button class="text-button" data-action="alphabet-video">▷ Ver demonstração</button></p>' : ''}<div class="learn-grid">${[...stage.letters].map((letter) => `<div class="learn-card"><b>${letter}</b>${signImage(letter)}${motionLetters.includes(letter) ? '<small>Com movimento ↗</small>' : ''}</div>`).join('')}</div><div class="lesson-bottom"><span>Observe. Imite. Descubra.</span><button class="button" data-action="begin-quiz">Vamos ao desafio →</button></div>`;
    } else if (lesson.phase === 'quiz') {
      const question = lesson.questions[lesson.question];
      const correct = lesson.answer === question.letter;
      content = `<div class="panel-heading"><span class="eyebrow">2. ENCONTRE A MÃO</span><span>${lesson.question + 1} de ${lesson.questions.length}</span></div><progress value="${lesson.question}" max="${lesson.questions.length}" aria-label="Progresso do desafio"></progress><div class="question"><h2>Qual mão combina com esta letra?</h2><b class="target-letter">${question.letter}</b><p>Toque na mão que representa <b>${question.letter}</b>.</p></div><div class="answer-grid">${question.options.map((letter, index) => `<button class="answer-card ${lesson.answer === letter ? (correct ? 'correct' : 'retry') : ''}" data-action="answer" data-answer="${letter}" aria-label="Opção ${index + 1}" ${correct ? 'disabled' : ''}>${signImage(letter, true)}<span>${index + 1}</span>${lesson.answer === letter ? `<i>${correct ? '✓' : '↻'}</i>` : ''}</button>`).join('')}</div><div class="feedback ${correct ? 'success' : ''}" role="status">${lesson.answer ? (correct ? `<span>✓ Isso! Essa é a letra ${question.letter}.</span><button class="button" data-action="next-question">${lesson.question === lesson.questions.length - 1 ? 'Concluir etapa' : 'Próxima letra'} →</button>` : '↻ Ainda não. Observe e tente outra mão!') : 'Você pode tentar quantas vezes quiser.'}</div><button class="text-button" data-action="review-lesson">Rever as letras</button>`;
    } else {
      content = `<div class="celebration"><span class="prize" aria-hidden="true">🏆</span><span class="eyebrow">DESCOBERTA DESBLOQUEADA</span><h2>Você conseguiu!</h2><p>A etapa <b>${stage.title}</b> está completa.</p><p class="reward">★ 10 estrelas por esta etapa</p><p class="small-note">As estrelas de cada etapa são conquistadas uma vez. Repetir ajuda a aprender!</p><div class="button-row"><button class="button outline" data-action="lesson" data-level="${lesson.index}">↻ Jogar de novo</button><button class="button" data-action="trail-list">Ver minha trilha →</button></div></div>`;
    }
    $('#trail-content').innerHTML =
      `<section class="panel lesson-panel">${heading}${content}</section>`;
  }
  function answerQuestion(letter) {
    if (!lesson || lesson.phase !== 'quiz') return;
    const question = lesson.questions[lesson.question];
    if (lesson.answer === question.letter || !question.options.includes(letter))
      return;
    lesson.answer = letter;
    lumiFeedback(letter === question.letter ? 'Isso! Você reconheceu a mão. Vamos à próxima descoberta?' : 'Tudo bem tentar de novo. Compare a posição dos dedos com as letras que vimos.', letter === question.letter);
    renderLesson();
    if (letter === question.letter)
      $('[data-action="next-question"]').focus({ preventScroll: true });
    else $(`[data-answer="${letter}"]`).focus({ preventScroll: true });
  }
  function nextQuestion() {
    if (
      !lesson ||
      lesson.phase !== 'quiz' ||
      lesson.answer !== lesson.questions[lesson.question].letter
    )
      return;
    if (lesson.question === lesson.questions.length - 1) {
      if (!progress.levels.includes(lesson.index)) {
        progress.levels.push(lesson.index);
        saveProgress();
      }
      lesson.phase = 'done';
    } else {
      lesson.question++;
      lesson.answer = null;
    }
    renderLesson();
    $('.lesson-panel').setAttribute('tabindex', '-1');
    $('.lesson-panel').focus({ preventScroll: true });
  }

  // 8. Diálogos: fechar interrompe o vídeo e devolve o foco ao botão de origem.
  function showDialog(content) {
    clearTimeout(videoTimer);
    $('#dialog-content').innerHTML = content;
    if (!dialog.open) dialog.showModal();
  }
  function showAlphabetVideo() {
    dialogWord = null;
    showDialog(
      `<span class="eyebrow">OBSERVE E PRATIQUE</span><h2 id="dialog-title">O alfabeto em movimento</h2><p>Assista, pause e pratique no seu ritmo.</p><iframe class="alphabet-video" src="https://ntetube.nte.ufsm.br/e/1527000916" title="Alfabeto manual de Libras — UFSM Libras ON" allow="fullscreen" allowfullscreen></iframe><p class="source-note">Libras ON / Núcleo de Acessibilidade, UFSM. Vídeo original sem alterações. <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. <a href="https://ntetube.nte.ufsm.br/v/1527000916" target="_blank" rel="noopener noreferrer">Assistir na UFSM ↗</a></p>`,
    );
  }
  function showHelp() {
    dialogWord = null;
    showDialog(
      `<span class="eyebrow">APRENDER CONECTA A GENTE</span><h2 id="dialog-title">Vamos aprender juntos!</h2><div class="help-list"><p><b>Alfabeto:</b> escolha letras e observe as configurações das mãos.</p><p><b>Sinais do dia a dia:</b> assista aos vídeos, repita devagar e pratique.</p><p><b>Memória:</b> combine uma letra com sua mão.</p><p><b>Trilha:</b> resolva desafios e conquiste estrelas.</p></div><h3>Para famílias e educadores</h3><p>O vocabulário foi selecionado para situações próximas da criança: iniciar interações, falar de pessoas importantes, participar da escola e situar acontecimentos no tempo. É uma seleção inicial, não uma ordem universal de aquisição da língua.</p><p>Pratiquem em contextos reais, com pessoas fluentes em Libras. Cada família tem sua composição: a criança pode escolher os sinais que fazem sentido na sua vida. Os sinais podem variar entre regiões.</p><p>Libras é uma língua completa, com gramática, expressões faciais e movimentos. O alfabeto manual é apenas uma parte dela. Os cartões e as estrelas incentivam a prática; não avaliam a produção dos sinais da criança.</p><h3>Fontes e créditos</h3><p>Vocabulário e vídeos: <a href="https://sistemas.cead.ufv.br/capes/dicionario/" target="_blank" rel="noopener noreferrer">Dicionário Online Libras–Português, UFV / CEAD, Projeto Inovar +</a>. O próprio acervo organiza sinais básicos regionais por temas. Os vídeos são carregados diretamente da fonte, com crédito e link em cada cartão.</p><p>Alfabeto: <a href="https://www.dafont.com/libras-2016.font" target="_blank" rel="noopener noreferrer">Libras 2016</a>, fonte gratuita de Diego Aguiar da Silva, Alexandre Nassar de Peder e Ricardo Ernani Sander — UTFPR, renderizada em imagens. Demonstração em vídeo: <a href="https://ntetube.nte.ufsm.br/v/1527000916" target="_blank" rel="noopener noreferrer">UFSM / Libras ON</a>.</p><h3>Suas conquistas</h3><p>1 estrela por letra explorada; 1 por sinal marcado como praticado após assistir; 5 por partida de memória; 10 pela primeira conclusão de cada etapa. O progresso fica somente neste navegador. As conquistas da versão anterior foram preservadas.</p>`,
    );
  }
  dialog.addEventListener('close', () => {
    clearTimeout(videoTimer);
    $('#word-video')?.pause();
    $('#dialog-content').innerHTML = '';
    if (dialogWord && activePage === 'sinais')
      $(`[data-word="${dialogWord.id}"]`)?.focus();
    dialogWord = null;
  });
  $('.close-dialog').addEventListener('click', () => dialog.close());
  $('#help-button').addEventListener('click', showHelp);
  $('#sources-button').addEventListener('click', showHelp);
  document.addEventListener('lumi:teach', event => {
    const word = words.find(item => item.id === event.detail?.id);
    if (!word) return;
    selectedCategory = word.category;
    go('sinais');
    openWord(word.id);
  });

  // 9. Um único ouvinte atende os botões das áreas dinâmicas.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    switch (action) {
      case 'letter':
        chooseLetter(button.dataset.letter, true);
        break;
      case 'previous-letter':
        chooseLetter(alphabet[(alphabet.indexOf(selectedLetter) + 25) % 26]);
        $('[data-action="previous-letter"]').focus({ preventScroll: true });
        break;
      case 'next-letter':
        chooseLetter(alphabet[(alphabet.indexOf(selectedLetter) + 1) % 26]);
        $('[data-action="next-letter"]').focus({ preventScroll: true });
        break;
      case 'alphabet-video':
        showAlphabetVideo();
        break;
      case 'category':
        selectedCategory = button.dataset.category;
        renderWords();
        $(`[data-category="${selectedCategory}"]`).focus({
          preventScroll: true,
        });
        break;
      case 'word':
        openWord(button.dataset.word);
        break;
      case 'practice':
        markPractice();
        break;
      case 'replay': {
        const video = $('#word-video');
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {
            $('#video-fallback').hidden = false;
          });
        }
        break;
      }
      case 'start-memory':
        startMemory(Number(button.dataset.pairs));
        break;
      case 'repeat-memory':
        startMemory(memory.pairs, memory.fromTrail);
        break;
      case 'new-memory':
        clearTimeout(memoryTimer);
        memory = null;
        renderMemory();
        break;
      case 'flip':
        flipCard(button.dataset.card);
        break;
      case 'lesson':
        startLesson(Number(button.dataset.level));
        break;
      case 'trail-list':
        lesson = null;
        go('trilha');
        break;
      case 'begin-quiz':
        lesson.phase = 'quiz';
        lesson.answer = null;
        renderLesson();
        break;
      case 'review-lesson':
        lesson.phase = 'learn';
        lesson.answer = null;
        renderLesson();
        break;
      case 'answer':
        answerQuestion(button.dataset.answer);
        break;
      case 'next-question':
        nextQuestion();
        break;
    }
  });
  // Um erro de imagem é mostrado explicitamente, sem exibir uma letra como falso sinal.
  document.addEventListener(
    'error',
    (event) => {
      if (event.target.matches?.('.sign-image')) {
        const warning = document.createElement('span');
        warning.className = 'asset-error';
        warning.textContent =
          'A imagem da mão não carregou. Recarregue a página.';
        event.target.replaceWith(warning);
      }
    },
    true,
  );
  updateStars();
  updateMotion();
  navigate(false);
})();
