# Lumi Libras

Site educativo em HTML5, CSS e JavaScript puro. Não exige framework, instalação ou compilação.

## Abrir e editar

Abra `build/index.html` no navegador. Para uma prévia por servidor local, execute `python -m http.server 3000 --directory build` e visite `http://localhost:3000`.

- `build/index.html`: estrutura semântica, menus e tela inicial.
- `build/styles.css`: cores, responsividade e animações, organizado por seções comentadas.
- `build/data.js`: letras, etapas, categorias e 30 sinais com suas fontes.
- `build/app.js`: navegação, memória, desafios e progresso, em funções comentadas.
- `build/assets/`: logo fornecida, mascote e imagens do alfabeto.

O progresso fica no navegador, sem cadastro. A chave de armazenamento anterior foi preservada. Os vídeos dependem de internet e da disponibilidade das universidades; cada vídeo tem um link para a fonte. O controle de animações e a preferência de movimento reduzido do dispositivo são respeitados.

## Conteúdo e fontes

Os temas iniciais são cumprimentos, família e amigos, escola e tempo e rotina. A seleção parte de situações cotidianas da criança, não de uma ordem universal de aquisição linguística. O alfabeto manual é apenas uma parte da Libras. As estrelas registram exploração e prática, não avaliam a produção dos sinais.

- Dicionário Online Libras–Português, UFV/CEAD: https://sistemas.cead.ufv.br/capes/dicionario/ — acervo de sinais básicos regionais, organizado por temas. Vídeos exibidos diretamente da fonte; cada entrada em `data.js` contém o endereço original e a página de crédito.
- Alfabeto em movimento, UFSM/Libras ON: https://ntetube.nte.ufsm.br/v/1527000916 — CC BY-NC-SA 4.0, sem alterações.
- Imagens do alfabeto renderizadas da fonte gratuita Libras 2016, de Diego Aguiar da Silva, Alexandre Nassar de Peder e Ricardo Ernani Sander (UTFPR): https://www.dafont.com/libras-2016.font

Há variações regionais em Libras. Famílias e educadores podem praticar em situações reais com pessoas fluentes na língua. Os emojis ilustram conceitos; somente os vídeos demonstram os sinais das palavras.

## Publicação

A pasta estática publicada é `build`, configurada em `.openai/hosting.json`. O histórico Git mantém a implementação anterior.
