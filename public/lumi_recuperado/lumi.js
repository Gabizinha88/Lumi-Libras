/* Lumi interativo: vídeo 3D fornecido, poses e ajuda contextual.
 * Não há modelo 3D esquelético: os gestos ilustrativos não são sinais de Libras.
 * app.js emite eventos de aprendizagem; este arquivo cuida só do personagem.
 */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const intro = $('#intro-dialog');
  const video = $('#intro-video');
  const idle = $('#lumi-idle-video');
  const character = $('#lumi-character');
  const sprite = character.querySelector('.lumi-sprite');
  const coach = $('#lumi-coach');
  const coachSprite = coach.querySelector('.lumi-sprite');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let reactionTimer;
  let waveTimer;
  let reactionNumber = 0;
  let returnFocus;
  let page = 'inicio';
  let hintIndex = 0;
  const hints = {
    inicio: ['Escolha uma aventura. Eu acompanho você!', 'Quer começar por um cumprimento? Toque em Aprender um sinal.'],
    alfabeto: ['Observe a posição dos dedos e a direção da palma.', 'H, J, K, X, Y e Z têm movimento. Use o botão para ver o vídeo.'],
    sinais: ['Escolha um tema e um cartão. O vídeo mostra o sinal completo.', 'Você pode repetir e diminuir a velocidade. Observe também o rosto!'],
    memoria: ['Procure uma letra e a mão que representa essa mesma letra.', 'Lembre o lugar das cartas. Não precisa correr!'],
    trilha: ['Observe as mãos antes do desafio. Pode rever as letras quando quiser.', 'Cada círculo é uma etapa. Você também pode repetir uma que já concluiu.']
  };
  const paused = () => document.body.classList.contains('paused') || reduced.matches;

  // Reações trocam a expressão; nenhum balanço artificial da imagem.
  function react(message, pose = 4, celebrate = false) {
    clearTimeout(reactionTimer);
    clearTimeout(waveTimer);
    $('#lumi-message').textContent = message;
    $('#coach-message').textContent = message;
    character.classList.add('reacting');
    idle.pause();
    for (const element of [sprite, coachSprite]) {
      element.dataset.pose = String(pose);
      element.classList.toggle('celebrating', celebrate);
    }
    if (celebrate && !paused()) {
      waveTimer = setTimeout(() => {
        for (const element of [sprite, coachSprite]) element.dataset.pose = '6';
      }, 650);
    }
    reactionTimer = setTimeout(syncPlayback, 4500);
  }
  function syncPlayback() {
    const canPlay = page === 'inicio' && !intro.open && !document.hidden && !paused();
    character.classList.toggle('reacting', !canPlay);
    if (canPlay) idle.play().catch(() => character.classList.add('reacting'));
    else idle.pause();
    if (paused()) video.pause();
  }
  function showIntro() {
    returnFocus = document.activeElement;
    video.currentTime = 0;
    intro.showModal();
    idle.pause();
    $('#intro-status').textContent = 'Conheça o Lumi. Depois, escolha sua primeira descoberta.';
    if (!paused()) video.play().catch(() => {
      $('#intro-status').textContent = 'Toque no vídeo para assistir ou entre para brincar.';
    });
  }
  function closeIntro() { intro.close(); }
  $('#intro-skip').addEventListener('click', closeIntro);
  $('#intro-enter').addEventListener('click', closeIntro);
  $('#intro-replay').addEventListener('click', showIntro);
  intro.addEventListener('close', () => {
    video.pause();
    try { sessionStorage.setItem('lumi-intro-v2', 'seen'); } catch { /* Sem armazenamento, os jogos continuam. */ }
    returnFocus?.focus();
    syncPlayback();
  });
  video.addEventListener('ended', () => {
    $('#intro-status').textContent = 'O Lumi está pronto! Toque em Entrar e brincar.';
    $('#intro-enter').focus();
  });
  video.addEventListener('error', () => {
    $('#intro-status').textContent = 'A abertura não carregou. Você pode entrar e brincar normalmente.';
  });
  idle.addEventListener('error', () => character.classList.add('reacting'));
  $('#motion-button').addEventListener('click', syncPlayback);
  reduced.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { idle.pause(); video.pause(); }
    else syncPlayback();
  });

  // A criança escolhe: conversar, comemorar ou assistir a um sinal demonstrado.
  character.addEventListener('click', () => {
    const responses = [
      ['Oi de novo! Qual vai ser a nossa descoberta?', 2],
      ['Minha estrela brilha a cada nova tentativa sua!', 5],
      ['Eu estou aqui. Quer aprender um sinal comigo?', 6]
    ];
    const [message, pose] = responses[reactionNumber++ % responses.length];
    react(message, pose);
  });
  $('#lumi-cheer').addEventListener('click', () => react('Toca aqui! Juntos, a gente vai longe! ✨', 2, true));
  $('#lumi-next').addEventListener('click', () => react($('#lumi-message').textContent, [4, 5, 6, 2][reactionNumber++ % 4]));
  $('#lumi-teach').addEventListener('click', () => {
    const word = window.LUMI_DATA.words.find(item => item.label.toLowerCase() === 'oi');
    if (word) document.dispatchEvent(new CustomEvent('lumi:teach', { detail: { id: word.id } }));
  });
  $('#coach-toggle').addEventListener('click', () => {
    const collapsed = coach.classList.toggle('collapsed');
    $('#coach-toggle').setAttribute('aria-expanded', String(!collapsed));
  });
  $('#coach-hint').addEventListener('click', () => react(hints[page][hintIndex++ % hints[page].length], 5));
  function updatePage() {
    const hash = location.hash.slice(1);
    page = Object.hasOwn(hints, hash) ? hash : 'inicio';
    coach.hidden = page === 'inicio';
    $('#coach-message').textContent = hints[page][0];
    hintIndex = 1;
    if (page !== 'inicio' && intro.open) intro.close();
    syncPlayback();
  }
  window.addEventListener('hashchange', updatePage);
  document.addEventListener('lumi:feedback', event => {
    const { message, success } = event.detail;
    react(message, success ? 2 : 5, success);
    coach.classList.remove('collapsed');
    $('#coach-toggle').setAttribute('aria-expanded', 'true');
  });
  updatePage();
  // A abertura só se repete a pedido durante a mesma sessão.
  let seen = false;
  try { seen = sessionStorage.getItem('lumi-intro-v2') === 'seen'; } catch { /* Navegação privada. */ }
  if (!seen && page === 'inicio' && !paused()) showIntro();
})();
