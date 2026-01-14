## Configurando o Boilerplate / Limpando o projeto

Pasta do projeto criada através do comando `yarn create next-app`. Configuração feita sem recursos adicionais (TypeScript por ex.), pois a ideia é configurar manualmente.

Alguns arquivos foram removidos/editados para limpar o projeto.

---

## Configurando o TypeScript

Ao criar o arquivo `tsconfig.json` (manualmente ou através do comando `touch tsconfig.json`) e rodar o comando `yarn dev`, os tipos (`@types/node`, `@types/react`) e o próprio `typescript` foram adicionados como dependencias de desenvolvimento. O arquivo `tsconfig.json` foi modificado automaticamente.

Como o projeto é novo e será feito tudo certinho desde o começo, no arquivo `tsconfig.json` o `strict` foi setado como como `true`.

O arquivo de configuração de tipos pro next foi criado (`next-env.d.ts`) - não foi feito o commit por estar na config padrão do `.gitignore`.

O arquivo `index.js` foi alterado para `index.tsx` (ao invés de `ts`, por ser um arquivo jsx e possuir coisas visuais/html - ou seja, não é um arquivo apenas com funcionalidades). Também foi necessário ajustar o arquivo `jsconfig.json`, adicionando a linha `"jsx": "react-jsx"` por conta de erros apontados no index pelo TypeScript - correção: era cache, o arquivo `jsconfig.json` foi removido (a config já está no `tsconfig.json`).

---

## Configurando o .editorconfig

Foi criado o arquivo `.editorconfig` para setar as configurações de indentação, tipos de final de linha, charset, etc. Mesmo com o Prettier configurado depois, é interessante ter o editor config para os novos arquivos já "iniciarem" com a formatação correta, ao invés de começar com uma formatação que pode ser errada pra depois ser corrigida. É bom pra manter o padrão desde o início.

---

## Configurando o ESLint

O ESLint analisa o código enquanto está sendo digitado (variáveis, métodos, hooks), sublinhando os erros quando necessário. Pode ser utilizado com o plugin no VS Code ou sem o plugin (nesse caso é necessário rodar um comando).

O ESLint foi instalado através do comando `npx eslint --init` que executa o binário direto do repositório com as perguntas de configuração.

- Resposta 1: JavaScript
- Resposta 2: To check syntax and find problems
- Resposta 3: JavaScript modules (import/export) (esm)
- Resposta 4: React
- Resposta 5: Yes (TypeScript)
- Resposta 6: Browser
- Resposta 7: js (config file)
- Resposta 8: No (install dependencies with npm)

Sobre a resposta 2, em versões anteriores do eslint existia uma opção "To check syntax, find problems and enforce code style", que não seria selecionada pois a formatação vai ser feita através do Prettier.

Sobre a resposta 8, como o yarn está sendo utilizado, a instalação pelo npm foi cancelada e com a lista da configuração os pacotes foram instalados manualmente com o comando `yarn add --dev ...`.

---

## Configurando o ESLint (adicional)

Alguns plugins e configurações podem ser adicionados durante o projeto, e existem alguns deles que já podem ser configurados no início.

Foi instalado o plugin do React Hooks pro ESLint (`eslint-plugin-react-hooks`), que verifica se os hooks estão sendo utilizados da forma correta, se o useEffect está sendo passado de forma certa, etc.

Na configuração, o plugin pode ser setado direto na prop `extends` ou nas props `plugins` + `rules` para configurações mais específicas. Optamos pela segunda opção. Para definir as regras `rules-of-hooks` e `exhaustive-deps` foi copiado o trecho dessas regras da documentação.

Como o TypeScript vai ser o responsável pela parte de tipos, a regra do propTypes foi desativada.

Como o NextJs possui a variável `React` como global para todos os arquivos, não é necessário importa-la, por isso a regra `react/react-in-jsx-scope` foi desativada.

Como o TypeScript possui a inferência de tipos, não é necessário tipar o retorno de funções exportadas onde o TypeScript já entende qual é o tipo. Por isso a regra `@typescript-eslint/explicit-module-boundary-types` foi desligada. Isso evita que o TypeScript fica verboso. (Ainda continua sendo necessário tipar o retorno quando o TypeScript não conseguir inferir).

Também foi necessário setar a versão do React como `detect` nas configurações para o ESLint conseguir ter um parâmetro antes de verificar os arquivos.

No `package.json` foi adicionado o comando `"lint": "eslint src"` para que o lint seja verificado com o comando `yarn lint` - que verifica se existem erros, se existir - informa os erros, se passar - concluí a verificação com sucesso.

Para verificação automatica ser feita enquanto o código está sendo criado foi instalado o plugin do ESLint no VSCode.

Obs 1: a configuração foi feita no arquivo `eslint.config.mjs` que é a nova maneira. Utilizar o arquivo `.eslintrc` se tornou obsoleto.

Obs 2: as linhas `tseslint.configs.recommended` e `pluginReact.configs.flat.recommended` foram movidas pro topo para poderem ser sobrescritas pela prop `rules`.

---

## Configurando o Prettier

O Prettier funciona como um verificador/formatador do texto digitado, setando regras visuais como espaçamento, tipos de aspas, etc. É diferente do Linter (como o ESLint) que verifica/corrige a qualidade do código (hooks, forma de importação, etc), auxiliando na prevenção de bugs.

Olhando a documentação, foi feita a instalação do Prettier com o comando:

```sh
yarn add --dev --exact prettier
```

Depois foi criado o arquivo `.prettierrc` setando as configurações do Prettier que são fora do padrão. Regras: sem vírgula ao final de um último item (prop `traillingComma`), sem ponto e vírgula ao final de uma linha/comando (prop `semi`) e aspas simples ao invés de aspas duplas (prop `singleQuote`).

É possível executar o Prettier através da linha de comando, através de um plugin do VSCode ou através de um plugin pro ESLint (e mudanças manuais nas configs do VSCode). A configuração feita é para funcionar junto com o ESLint (então não foi necessário instalar o plugin do VSCode).

Para rodar o Prettier como uma regra do ESLint, instalamos os plugins `eslint-config-prettier` e `eslint-plugin-prettier`.

```sh
yarn add --dev eslint-config-prettier eslint-plugin-prettier
```

O plugin `eslint-plugin-prettier` foi adicionado as configurações do ESLint em `eslint.config.mjs`, ele habilita o prettier e ativa o outro plugin (`eslint-config-prettier`). Obs: tentei só com o `eslint-config-prettier` por estar na doc mais atual, mas não funcionou, tive que instalar/importar o `eslint-plugin-prettier`.

Nesse ponto os erros já eram sublinhados no `index.tsc`, mas o arquivo ainda não se auto-corrigia ao salvar.

Por último foi criado o arquivo `.vscode/settings.json`, desativando a formatação padrão do editor (editor.formatOnSave) e ativando a formatação pelo eslint (source.fixAll.eslint).

---

## Configurando Git Hooks

Com os Hooks do Git é possível disparar certos comandos antes de ações importantes (como commit, push, merge) e interromper o fluxo, previnindo erros (de lint, test, etc) na base de código e evitando commits de "fix lint".

Para a configuração do Git Hook é utilizado o Husky e para a configuração dos comandos que serão executados antes do commit (em staged) é utilizado o `lint-staged`.


Para instalar e inicializar o Husky (fonte: doc):

```sh
yarn dev husky
npx husky init
```

Foi criada a pasta `.husky` com um arquivo chamado `pre-commit`, onde vão todos os comandos necessários antes de um commit.

Para instalar o lint-staged (fonte: doc):

```sh
yarn add --dev lint-staged
```

Com o lint-staged adicionado, o script "lint-staged" foi adicionado no `package.json` e no arquivo `pre-commit` do Husky foi adicionada a linha do terminal para executar o script "lint-staged" (com `--no-install` pra não precisar instalar o pacote `lint-staged` toda vez que executar).

Também foi adicionado o parâmetro `--max-warnings=0` ao script "lint" do `package.json` para que "warnings" também interrompam o fluxo.

---

## Configurando o ESLint (ajuste)

A indicação de erros pelo ESLint estava duplicada com a indicação de erros do TypeScript, então foi feito um ajuste no arquivo de configuração (estava faltando importar as configs recomendadas do eslint).

---

## Configurando os testes | Jest

https://nextjs.org/docs/pages/guides/testing/jest

### Pacotes instalados:

Para trabalhar com os testes foi necessário instalar os seguintes pacotes:

***`jest`***: O framework de testes.

***`@types-jest`***: Fornece a tipagem para as variáveis do Jest.

***ts-node***: Dependencia do Jest. Motor de execução TypeScript utilizado pelo Jest para rodar o arquivo de configuração (`jest.config.ts` - no tutorial antigo ainda era `.js`). Segundo os DOCs do jest e do nextjs desse momento, é necessário ter esse pacote instalado no projeto pois não é uma dependência padrão do jest.


### Atualização/Criação de arquivos de configuração

Para definir a configuração do jest foi criado o arquivo `jest.config.ts`, onde foi definido: a ativação da cobertura de testes (`collectCoverage`) e a pasta da cobertura de testes (`collectCoverageFrom`). Obs 1: a config das pastas ignoradas pelo jest (`testPathIgnorePatterns`) não precisou ser criada pois essa versão do Next já configura isso com o `createJestConfig` do pacote `next/jest`. Obs 2: essa configuração poderia ser feita com o comando `yarn create jest`, mas gera um arquivo cheio de comentários, então o arquivo foi feito na mão.

Para não ser necessário fazer a importação das variáveis do Jest em cada arquivo de teste, as variáveis globais do jest: foram adicionadas as configs do eslint (`eslint.config.mjs`). Obs: em versões anteriores do ESLint essa config era setada na prop "env" do arquivo `.eslintrc`.
    
Para os testes rodarem via CLI: o trecho `"test": "jest"` foi adicionado ao `package.json`.

Rodei o comando `yarn test` no terminal, que chamou o jest com sucesso e indicou erro nos testes (pois nenhum teste foi escrito nessa etapa).

### Pacotes não instalados (já vem padrão nessa versão do Next)

No tutorial antigo esses pacotes precisaram ser instalados, mas não foi necessário pois vi que a versão atual do Next já utiliza eles por padrão:

***`next/babel`***: Config padrão do Next para o Babel.

***`next/jest`***: Config padrão do Next para o Jest.

***`@babel/preset-typescript`***: Config padrão do Next para tipagem do Babel.

---

## Configurando os testes | DOM

Feito seguindo o tutorial (antigo) e as docs do Next / Jest / Testing Library.

### Complementos pro Jest:

***`jest-environment-jsdom`***: Biblioteca que simula um ambiente de desenvolvimento do browser (com elementos do DOM). Vinha junto com o Jest em versões antigas (Instalação desse pacote individual necessária a parte a partir do Jest 28+).

***Pra facilitar testes com o Dom:***: Pacote `@testing-library/jest-dom` instalado. Esse pacote possui "matchers" do Jest que facilitam a verificação do Dom. Configuração feita no arquivo `jest.config.ts` pro `jest-dom` ser importado antes de qualquer teste (link pro novo arquivo de Setup `jest-setup.js`). Obs: também foram adicionadas as libs complementares `@testing-library/dom`, `@testing-library/react`.

### Complementos de Lint:
***Para o Jest Dom:***: o pacote `eslint-plugin-jest-dom` foi instalado e adicionado ao arquivo de config `eslint.config.mjs`.

### Complementos de Tipagem:

***Pro React DOM***: O pacote `@types/react-dom` foi instalado (TypeScript entende automaticamente).

***Pro Jest***: O arquivo do TypeScript `tsconfig.json` foi modificado para incluir o arquivo de Setup `jest-setup.ts`.

### Configs adicionais do package.json:

***Testes***: no "test:watch" foi adicionado o monitoramento de arquivos alterados  (`jest --watch`).

### Refs:

[NextJS com Jest](https://nextjs.org/docs/app/guides/testing/jest)

[NextJS com Babel](https://nextjs.org/docs/pages/guides/babel)

[React Testing Library > Cheatsheet](https://github.com/testing-library/react-testing-library/raw/main/other/cheat-sheet.pdf)

---

## Criação do primeiro teste

### Novos arquivos

Arquivo do componente Main (`Main/index.tsx`) criado com uma `<div />` vazia.

Arquivo de teste (`Main/test.tsx`) criado com o teste que espera a renderização do cabeçalho com o texto "react avançado" (letras podem ser maiúsculas ou minúsculas - `/i`).

Após a criação do teste, o cabeçalho foi adicionado no componente Main (princípio do TDD - teste primeiro, código depois).


### Configs adicionais do package.json:

***Hooks***: no "lint-staged" foi adicionado o script de testes, com o parâmetro de interromper a execução no primeiro teste com erro (`jest --bail`).

Obs: No tutorial é adicionado o parâmetro `--findRelatedTests` com o argumento de evitar que os testes executem de novo ao salvar qualquer arquivo (e quebrem), porém, ao checar a doc, não fez sentido utiliza-lo pois é necessário passar nomes de arquivos (e sem isso, executando direto na linha de comando ocorre um erro - `The --findRelatedTests option requires file paths to be specified.`). O que ocorreu comigo foi que ao tentar fazer o commit da config adicional do "lint-staged" acima sem adicionar o arquivo de teste em staged, o jest é executado no contexto do que está em staged, e ocorre o erro (por não existirem testes nesse contexto - ou seja, ao executar `yarn test` direto pelo terminal passa mesmo sem o arquivo de teste em staged).

---

## Testes | Primeiro Snapshot

Os Snapshots servem para fazer uma cópia de como um arquivo fica depois de renderizado. Ao executar um teste, o registro da renderização anterior é comparado a renderização atual. O renderização anterior deve ser igual a renderização atual ou, se uma modificação for mesmo necessária, o Snapshot precisa ser atualiado pra renderização mais recente. Funcionam como uma camada extra para garantir (antes do commit) que as modificações feitas são mesmo necessárias. Obs: na primeira execução do teste o primeiro snapshot é criado automaticamente, para depois poder ser comparado nas próximas execuções.

O comando `yarn test:watch` foi executado para ficar monitorando/testando os arquivos modificados.

No arquivo de teste (`Main/test.tsx`) foi feita a modificação pra testar se o Snapshot está ok.

No componente Main (`Main/index.tsx`) foi feita a alteração do elemento `h1` para `h2`, que foi detectada pelo monitoramento do jest. Ao executar um novo teste foi indicado um erro na linha alterada, dizendo para verificar se as modificações feitas ou atualizar o Snapshot (tecla `u`). Ao atualizar o Snapshot o teste executou de novo automaticamente e passou.

Obs: Nem sempre os Snapshots são necessários. Nesse caso serviu pois a verificação do `heading` é mais genérica, mas em casos onde eu faço verificações mais específicas não preciso criar Snapshots.

### Configs adicionais de Lint

Foi necessário alterar as configs do ESLint (`eslint.config.mjs`) para ignorar os arquivos de Snapshot (`.snap`), pois o hook/lint-staged estava disparando um warning antes de fazer o commit, fazendo a aplicação quebrar e impedindo o commit.

Ao ajustar esse warning, apareceu outro, que foi corrigido em seguida - Foi necessário ajustar o hook no `package.json`, passando pro ESLint o parâmetro `--no-warn-ignored`, para não disparar warnings de arquivos ignorados pelo Lint (que é o caso do `.snap`), assim a aplicação não quebra e o commit pode ser feito.

---

## Estilização | Configurando o Emotion

Como alternativa ao `styled-components` (que está em modo de manutenção), foi utilizado o Emotion, que é bem parecido.

### Instalação

Para instalar o Emotion, foram adicionados alguns pacotes (dependencias normais e não de desenvolvimento):

```sh
yarn add @emotion/cache @emotion/react @emotion/styled
```

### Config do NextJS

Para integrar o Emotion com o Next foi adicionado o parâmetro `emotion: true`, nas opções do compilação do arquivo `next.config.mjs`. Obs: por utilizar o Emotion junto com o Next.js a parte do SSR (processamento do CSS no servidor) já funciona.

Também foi necessário criar o arquivo padrão do Next `pages/_app.tsx` com o código de implementação do Emotion e importação do CSS global.

### Criação do CSS globalSS

Foi criado o arquivo `styles/global.tsx` com o reset padrão do CSS.

### Config do TypeScript

Para integrar o TypeScript ao Emotion foi adicionada a linha `"jsxImportSource": "@emotion/react"` no arquivo `tsconfig.json`.

### Config do Babel

Segundo a DOC do Emotion desse momento não é estritamente necessário configurar o Babel quando se usa o TypeScript - só quando o Babel já existe no projeto e é necessário aplicar alguma regra específica do Babel.

### Configs adicionais do package.json:

***lint-staged***: O comando `--passWithNoTests` precisou ser adicionado pro commit poder acontecer sem erros pois os novos arquivos não possuem testes nesse momento.

### Refs:

[Emotion no NextJS (Emotion DOCs)](https://emotion.sh/docs/ssr#nextjs)

[Config do Emotion com TS - e sem Babel (Emotion DOCs)](https://emotion.sh/docs/typescript#with-the-babel-plugin)

[Exemplo do Emotion no Next (Github)](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)

[Componente '_app' customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

---

## Configuração dos caminhos absolutos

Na importação, para não precisar acessar os níveis de pasta com `../../../` a cada nível, foi preciso configurar os caminhos de diretórios absolutos - pra isso foi configurado a importação por caminho absoluto e os aliases (@) dos caminhos no arquivo `ts.config.json`. Os arquivos com importações foram atualizados.

### Ref:

[Set up - Absolute Paths/Path Aliases (NextJS DOCs)](https://nextjs.org/docs/pages/getting-started/installation#set-up-absolute-imports-and-module-path-aliases)

---

## Definindo Meta Tags padrão

Para definir as meta informações padrão foi criado o arquivo padrão do NextJS `pages/_document.tsx` com o título, os ícones e a descrição padrão.

Obs 1: No tutorial, o estilo global foi importado no `_document` por ser uma versão antiga do NextJS com o `styled-components` (e o caso desse repositório é a versão atual do NextJS com o `Emotion`).

Obs 2: a diferença principal entre o `_app` e o `_document` é que o `_app` é renderizado no servidor e no cliente e o `_document` é renderizado apenas no servidor (ao checar o código fonte da página, as meta informações já aparecem pois já foram processadas no servidor). Estilos devem ser importados no `_app` de acordo com a documentação atual do NextJS.

### Ref:

[Componente '_document' customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)

[Componente '_app'  customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

---

## Componente Main | Estilos

Foi criado o arquivo `Main/styles.ts` para os estilos do componente `Main` (que é importado na página inicial). Nesse arquivo foram definidas os estilos via Emotion e as exportações dos componentes.

No componente `components/Main.tsx` os componentes foram importados e editados - definindo os títulos, textos, imagens e alt das imagens (pra acessibilidade).

Por convenção a importação do Emotion foi feita via `* as S`, assim batendo o olho todos os componentes com `<S.` no início já são identificados como componentes que tem estilização (ex: `<S.Title>`).

Ao rodar o teste (via `yarn test:watch`) ocorreu um erro por diferença no Snapshot e como a atualização era mesmo pra acontecer o Snapshot foi atualizado (tecla `u`).

Obs: Foi necessário fazer um ajuste no CSS global pra cor de fundo preencher toda a altura (`height: 100%`).

---

## Componente Main | Exemplo de teste no CSS

É possível verificar se os estilos foram aplicados via teste com o Jest - para isso o arquivo `Main/test.tsx` foi modificado. Foi adicionado um novo it/expect com o método `toHaveStyle` pra confirmar a cor de fundo do componente `S.Wrapper`.

É possível verificar vários estilos - nesse caso foi um exemplo. Esse tipo de teste se enquadra melhor em outros casos, por exemplo: o efeito `:hover` ou `:focus` de algum campo/botão/etc.

---

## Testes | Configuração de exibição do CSS nos Snapshots

O CSS nos Snapshots mostrava apenas classes com nomes estranhos e não as props do CSS que foram alteradas, por isso foi necessário configurar um pacote do Emotion pra fazer a integração do Jest com o Emotion e a separação do CSS.


Com essa integração configurada todos os estilos são importados pro Snapshot e podem ser conferidos antes do commit. O Snapshot fica um pouco maior, mas fica muito mais informativo, melhorando a atenção para alterações de estilos.

Obs: Vale lembrar que os Snapshots não são utilizados em tudo, somente onde faz mais sentido utilizá-lo.

---

## PWA | Configuração dos recursos de aplicativo local

É possível configurar a aplicação para ter acesso a recursos de um aplicativo local (como notificações, acesso offline, etc) para facilitar esse processo foi adicionado o pacote `next-pwa` (baseado no pacote `workbox` do Google), que gera boa parte da configuração:

```sh
yarn add next-pwa
```

Depois foi criado o arquivo `manifest.json` padrão com os ícones e informações do aplicativo - que foram importados no cabeçalho da aplicação (`_document.tsx`).

Para integrar o `next-pwa` com o `nextJS` o arquivo `next.config.js` foi alterado para importar e utilizar o `next-pwa`. Obs 1: Também foi configurado para gerar o pacote apenas no ambiente de produção e pra isso foi necessário configurar as variáveis globais do node no ESLint (arquivo `eslint.config.mjs`). Obs 2: No tutorial a importação é feita com `require` e `module.exports` (CommonJS - jeito antigo), mas consegui fazer com o `import` e `export default` (ES Modules - jeito moderno).

Feito isso já seria possível gerar os arquivos de produção:

```sh
yarn build
```

Mas ocorreram erros com a definição de tipos do `minimatch`, utilizado internamente pelo `next-pwa` - isso foi confirmado removendo o `next-pwa` (que depois foi adicionado de novo). Ao pesquisar sobre o erro foi possível [encontrar um jeito de contorna-lo](https://github.com/strapi/strapi/issues/23859#issuecomment-3031795231) criando no `package.json` a config `resolutions` com versões específicas do `minimatch` e do `@types/minimatch`. Ao fazer as alterações foi possível rodar o `yarn build`.

Após gerar o build de produção foi possível subir o mesmo:

```sh
yarn start
```

Ao acessar o localhost, um ícone de "Instalar aplicativo" já aparece na barra de endereços do navegador. Obs: Em versões antigas do DevTools / aba "Lighthouse" também era possível ver um ícone de `PWA`, atualmente é possível ver as configs da aplicação na aba "Application" > "manifest.json", que mostra o nome, os ícones, as funcionalidades, etc.

No arquivo `.gitignore` foram adicionados os arquivos gerados automaticamente pelo `next-pwa` na geração de uma build.

### Sobre o pacote pra config do PWA

O [next-pwa](https://github.com/shadowwalker/next-pwa) foi utilizado por conta do tutorial e até então não está claro se ele vai ser utilizado em alguma outra parte. Após pesquisas vi que já existe uma alternativa chamada [Serwist](https://serwist.pages.dev/). Essa alternativa moderna pode ser atualizada no boilerplate futuramente.

### Refs / Pesquisas

[Contornando o erro do minimatch (comentário)](https://github.com/strapi/strapi/issues/23859#issuecomment-3031795231)

[Página do Serwist (site)](https://serwist.pages.dev/)

[Página do Serwist (github)](https://github.com/serwist/serwist)

---

## Finalização do boilerplate

O boilerplate foi finalizado e está disponível no repositório [cafecomlucas/nextjs-boilerplate](https://github.com/cafecomlucas/nextjs-boilerplate).

---

## Inicialização do projeto

Criando um novo projeto do NextJS utilizando o boilerplate:

```sh
yarn create next-app -e https://github.com/cafecomlucas/nextjs-boilerplate
```

Foi feita uma limpeza no texto do componente `Main` e em arquivos do projeto (`styles.ts`, `test.tsx`, `test.tsx.snap` foram removidos). O título e a descrição do projeto foram atualizados (em `_document.tsx` e em `manifest.json`).

Para validar se o projeto está subindo (tudo certo):

```sh
yarn dev
```

Subindo as alterações (primeiro commit):

```sh
git branch -M main
git add .
git commit -m "Inicialização do projeto"
git remote add origin git@github.com:cafecomlucas/nextjs-mytrips.git
git push -u origin main
```

Obs: No tutorial foi removido o storybook, que estava sendo utilizado para outro tutorial, mas nesse projeto ele não foi instalado e já não existia.

---

## CSS | Propriedades customizadas - variáveis

Como vão existir cores e tamanhos padrões nesse projeto isso pode ser configurado utilizando variáveis do próprio CSS pra isso.

No arquivo `global.tsx` as variáveis CSS foram definidas e algumas estilizações padrão já foram aplicadas nas tags `body`, `p` e `a`.

Obs: Uma alternativa poderia ser o [`<ThemeProvider>` do styled-components](https://styled-components.com/docs/advanced) (se essa fosse a lib utilizada nesse projeto), mas utilizar as variáveis nativas do CSS pode ser feita sem depender da lib. 

### Refs:

[Variáveis CSS (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)

[Tema com Styled Components](https://styled-components.com/docs/advanced#theming)

[Tema com Emotion](https://emotion.sh/docs/theming)

---

## Adicionando mapas interativos

Para exibir mapas interativos foi utilizada a biblioteca [Leaflet](https://leafletjs.com/examples/quick-start/) junto com a biblioteca [React Leaftlet](https://react-leaflet.js.org/docs/start-installation/#using-a-package-registry) que abstrai o Leaflet para o uso de componentes. Para instalar as bibliotecas:

```sh
yarn add leaflet react-leaflet
```

Obs: As libs `react` e `react-dom` são mencionadas na DOC, mas já estão nesse projeto e não foi necessário instala-las.

No arquivo `_document.tsx` foi adicionado o CSS necessário (indicado na [documentação do Leaftlet]((https://leafletjs.com/examples/quick-start/))).

### Complementos de Tipagem:

Para o ambiente de desenvolvimento foi adicionada a tipagem do Leaflet:

```sh
 yarn add -D @types/leaflet
```

### Componente Map | Componente com código de exemplo

Foi criado o componente `Map` com o [código de exemplo](https://react-leaflet.js.org/docs/start-setup/)
) do React Leaflet. O componente `Map` foi importado na página inicial (`pages/index.tsx`).

Ao rodar o projeto ocorreu o erro "window is not defined" pois o Leaflet utiliza o objeto `window`do browser - em seguida é feito o ajuste para o mapa funcionar corretamente.

### Refs: 
[Instalação - Leaflet (DOCs)](https://leafletjs.com/examples/quick-start/)

[Instalação - React Leaflet (DOCs)](https://react-leaflet.js.org/docs/start-installation/#using-a-package-registry)

[Setup - Código de exemplo (React Leaflet DOCs)](https://react-leaflet.js.org/docs/start-setup/)

---

## Componente Map | Ajuste na importação do mapa (Dynamic Imports)

Para corrigir o erro "window is not defined" e o mapa abrir corretamente, na página inicial (`pages/index.tsx`) foi utilizado o [Dynamic Imports](https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr) do Next com a config `ssr: false` - dessa forma o trecho do componente `Map` não tenta carregar no servidor e só é carregado no lado do cliente (no browser - onde o objeto `window` existe).

No componente `Map` foi adicionada a estilização de `width`/`height` pro mapa poder aparecer. Além disso o zoom do mapa com scroll foi ativado setando o atrubuto do Leaftlet `scrollWheelZoom` para `true`.

### Refs:

[Dynamic Imports (NextJS DOCs)](https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr)

---

## Componente Map | Testes | Início da customização do mapa

As modificações começam pelos testes (antes do código), assim posso ir descrevendo o que eu espero do resultado, para depois fazer o código de acordo (princípio do TDD).

### Novo arquivo de teste `components/Map/test.tsx`

No novo arquivo de teste foi importado o componene `Map`.

#### `describe`

É a primeira função chamada dentro de um teste, serve para descrever (e encapsular) para quem é o bloco de testes (mais geral). Foi descrito o nome do componente (`'<Map />'`).

#### `it`

Dentro do bloco do *describe* é chamado a função `it`, que serve para descrever e encapsular um bloco mais específico - os casos de teste. Dentro dele vai o código de processamento e o que se espera como resultado (Dado "alguma coisa" espero "tal" comportamento). O *it* é mais específico do que o *describe*. Pra esse it foi descrito que se espera a renderização do componente em tela (`it should render...`).

#### `render`

Dentro do primeiro *it* foi chamado o método `render` da lib `@testing-library/react`. Esse método serve para renderizar o conteúdo de um componente. Resta adicionar o que se a saída está de acordo com o esperado.

### Executando o teste

Para executar os testes e monitorar novas modificações:

```sh
yarn test --watch
```

Ao executar os testes ocorreu um erro por um conflito entre a lib do `react-leaflet` e o `jest`, que foi verificado em seguida.

---

## Componente Map | Testes | Ajuste na config do Jest

Ao executar os testes ocorreu o seguinte erro:

```tsx
/home/cafecomlucas/projects/wjusten/nextjs/my-trips/node_modules/react-leaflet/lib/index.js:1
export { useMap, useMapEvent, useMapEvents } from './hooks.js';
^^^^^^

SyntaxError: Unexpected token 'export'
```

De acordo com as pesquisas feitas, o erro acontece pois o `jest` por padrão não lida com a semântica dos ES Modules (import/export) que estão dentro do `node_modules`. Seria preciso definir isso explicitamente.

O próprio CLI do Jest sugeriu algumas opções de solução, mas nenhuma tão específica. Foi necessário pesquisar soluções alternativas.

### Tentativas de soluções

- **Definir a config necessária no arquivo do Jest**: Não funcionou. Para essa config era necessário definir a prop `transformIgnorePatterns` no arquivo `jest.config.js`, com a pasta do `react-leaflet` que o Jest precisa lidar, mas está ignorando (por estar no `node_modules`).

- [**Adicionar config do Jest no package.json**](https://pt.stackoverflow.com/questions/557206/react-e-leaflet-jest-encountered-an-unexpected-token/557314#557314): Não funcionou pois já existe o arquivo de config do jest (`jest.config.ts`) e nesse contexto não existe tratativa pra duas configs complementares.

- [**Configurar o ts-jest pra lidar com os ESM**](https://stackoverflow.com/questions/79762452/nextjs-with-jest-unexpected-token-export/79763894#79763894): Não funcionou pois a config do Jest (prop `extensionsToTreatAsEsm`) não aceitou a extensão `.js` pra esse caso.

- [**Configurar direto na chamada do Jest via CLI**](https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export/54896569#54896569): Funcionou! A config `transformIgnorePatterns` foi adicionada direto na chamada do Jest (`jest test --transformIgnorePatterns [dir]`). Então é alguma configuração interna da integração do next com o jest que ignora a propriedade `transformIgnorePatterns` setada no `jest.config.ts`.

---

## Componente Map | Testes | Verificando se o mapa foi renderizado

### screen

Para verificar se o mapa foi renderizado primeiro é necessário selecionar algum elemento da renderização e checar se ele existe - pra isso, dentro do `it` foi utilizada a função `screen.logTestingPlaygroundURL()` do testing-library, que cria uma URL com um HTML real ao rodar `yarn test:watch`.

Ao acessar a URL é possível ir clicando nos elementos renderizados e obter sugestões de query pra selecionar algum elemento da renderização. Uma das sugestões foi o trecho que seleciona o link de rodapé do OpenStreetMap `screen.getByRole('link', { name: /openstreetmap/i })` do testing-library, que foi utilizado a seguir.

### expect

O retorno do método `screen.getByRole` foi passado para a função `expect`, o retorno da função `expect` possui o método `toBeInDocument`, que verifica se o elemento (link) existe na renderização.

Os testes passaram.

---

## Componente Map | Testes | Customização do pin (marker)

Nesse momento o marcador/pin do mapa está em um lugar fixo, com a posição (latitude, longitude) no próprio componente, sem customização. Para começar a deixar o local do pin dinâmico foram feitas modificações nos testes de `Map` e no componente `Map`.

Pra rodar os testes:

```sh
yarn test:watch
```

### Novo teste

Foi criado um novo teste (renderizar ao menos um marcador):
```ts
  it('should render with at least one marker', () => {
    ...
```

Nele foi criado um novo `render` do componente `Map`, dessa vez passando como propriedade o dado de um local (`place`) que precisa ser renderizado no mapa como um marcador/pin baseado nos dados de `place`. Aqui o teste ainda passa pois falta verificar a renderização.

A renderização é verificada com o código `expect` e `screen.getByTitle` pra checar se existe um elemento com o título "São Paulo". Nesse ponto os testes mostram erro - é o momento de modificar o componente `Map` (depois do erro no teste - seguindo o princípio do TDD).

### Alterações no componente

No Componente `Map` foi adicionada a propriedade `place` na declaração da função, que é utilizada ao chamar o componente `Marker` passando o `place.name` como argumento pra prop "title".

Neste ponto os testes passaram.

Obs: O componenet `Popup` foi removido por não ser necessário.

---

## Componente Map | Adicionando tipagem

O Typescript sublinhou algumas linhas no arquivo de teste e no arquivo do componente `Map` pois a nova prop `place` pode ser indefinida ou do tipo any.

O componente `Map` foi alterado com a tipagem necessária.

---

## Componente Map | Testes | Adicionando props de `place`

Foram adicionadas as props de latitude e longitude no componente `Map` pra serem utilizados na prop `position` do `Marker`. As tipagem e os testes também foram atualizados. Nesse ponto não ocorreram erros de teste pois a latitude e a longitude não são verificados.

---

## Componente Map | Testes | Alterando quantidade de localizações

### Novo teste

Em `Map.test.tst` foi criado o teste que verifica uma nova localização (Rio de Janeiro) - que quebra em seguida, pois esse local ainda não é renderizado.

A variável `placeTwo` foi criada pro segundo local. A prop `place` na chamada do componente `Map` é alterada de `place` para `places` que agora recebe dois locais em um array. Também foi feito um ajuste na `latitude`/`longitude` que agora está agrupado no objeto `places.location`.

### Alterações no componente

No componente `Map` a prop é modificada de `place` pra `places` e a tipagem é alterada pra receber um array. A renderização única do Marker anterior é substituída pelo método `map` do Javascript para percorrer o array. Ao utilizar o `map` uma propriedade `key` é obrigatória - foi criada a prop e a tipagem de `place.id`, que é incluído no array `places` dos testes de `Map` e utilizado no componente `Map` do percorrer o array.

Os testes passaram.

---

## Página inicial | Modificando o Map

Inicializando o projeto:

```sh
yarn dev
```

Os testes passaram, mas agora o mapa renderizado na página inicial (`pages/index.tsx`) não mostra os pins/markers pois eles não estão mais dentro do componente `Map` de forma fixa. Para aparecerem os pins é necessário passar os dados via prop `places`.

Foi passado um novo array com o objeto `place` (localidade de Belo Horizonte), que é exibido na renderização do mapa.

Os pins não estão mais estáticos dentro do componente `Map`, mas o array no nível da página inicial (`pages/index.tsx`) nesse momento é um mock/estático - e ainda será configurado de forma dinâmica com um CMS.

---

## Novo componente `LinkWrapper` + Testes

No topo da janela é necessário ter um link de informações que envia para a página "sobre" (about). Nesse caso o componente foi criado primeiro e os testes foram adicionados depois (sem TDD).

### Componente - estrutura, estilização, parâmetros e tipagem

 No novo componente `LinkWrapper` os parâmetros (um `href`, que recebe o caminho do link e um `children`, que recebe o conteúdo do link [imagem, texto, etc]) - para esses parâmetros foram definidos os tipos do Typescript no type `LinkWrapperProps`. Na estrutura o link foi definido com o componente `Link` do prórpio NextJS pois nele existem recursos de otimização como o pré-fetch (ao passar o mouse parte do conteúdo já é pré-carregado). No CSS foi definido um posicionamento fixo com as variáveis globais (definidas em `global.tsx`).

### Componente - testes

Para validar se o componente `LinkWrapper` é renderizado corretamente foi criado o arquivo de teste (`test.tsx`) - que faz a renderização (`render`), acessa o filho do `LinkWrapper` (`screen.getByRole`), valida se o link está no documento (`screen.toBeInTheDocument`) e se o atributo `href` existe (`screen.toHaveAttribute`).

Os testes passaram.

Obs: Nesse ponto o componente ainda não é definido para ser exibido em tela.

---

## Página Inicial | Componente LinkWrapper - ícone

Para exibir o link de info na página inicial foi utilizada uma biblioteca de ícones chamada [emotion-icons](https://www.npmjs.com/package/emotion-icons) (equivalente ao styled icons). Pra não pesar muito foi instalado especificamente/apenas os [Eva Icons](https://akveo.github.io/eva-icons/#/).

```sh
yarn add @emotion-icons/evaicons-outline
```

Na página inicial (`pages/index.tsx`) o componente `LinkWrapper` foi importado e utilizado (com o href /about). O componente do ícone (`InfoOutline`) também foi importado e passado como filho pro componente `LinkWrapper`. Obs: No componente `InfoOutline` também foi adicionada a prop `aria-label` para a imagem svg gerada ter mais acessibilidade.

Na estilização do ícone que é filho do `LinkWrapper` foi adicionada a estilização de mudança de cor no hover (`components/LinkWrapper/styles.tsx`).

Ao rodar o projeto a exibição do ícone foi feita em tela e o efeito de `:hover` funcionou.

Obs: Ao clicar no link exibe o erro 404 (página não existe). Na próxima etapa é criada a página `/about`.

### Refs:

[Emotion Icons](https://www.npmjs.com/package/emotion-icons)

[Eva Icons](https://akveo.github.io/eva-icons/#/)

---

## Nova Página e Componente `About`

Para criar a página "About" foi criado o arquivo `about.tsx` na pasta `pages` que exporta o componente `About`, o Next já entende que os componentes exportados dentro de pages são página, então uma nova rota (`/about`) é gerada e não é necessário fazer outras configurações.

Nesse momento ao clicar no link de info da página inicial o acesso para a página "About" é feito com sucesso.

---

## Página About | Estrutura para os estilos | Nova pasta templates

O Next não aceita estilização dentro da pasta `pages`, por isso foi criada a pasta `templates/About` - com a estrutura inicial no arquivo `index.tsx` (componente `AboutTemplate`) e a estilização inicial no arquivo `styles.ts`. O conteúdo da página `pages/about.tsx` foi substituído pela importação do componente `AboutTemplate`.

Obs: por estar utilizando alias nos caminhos de arquivo (`@/`) foi necessário fazer o ajuste nas configs do Typescript (`tsconfig.json`) para incluir a pasta `src/templates`.

---

## Página About | Link de volta pra página inicial

O componente `AboutTemplate` foi modificado pra ter um link "fecha" a página about e retorna pra página inicial (`/`) - foi utilizado o componente `LinkWrapper` e o ícone do Emotion Icons (`CloseOutline`).

---

## Página About | Estilos

Os estilos do componente `AboutTemplate` (`templates/About/styles.ts`) foi alterado, centralizando o conteúdo e mudando o tamanho da fonte. Também foi adicionada a estrutura/estilização do conteúdo geral (em `S.Body`).

---

## Conteúdo dinâmico | Escolha do CMS

Para gerênciar os conteúdos da página a parte é necessário um CMS (Content Management System) - que deixa o conteúdo dinâmico e desacoplado do código. A idéia é que ao atualizar um dado no gerenciador, a aplicação corresponda ao dado atualizado.

Exemplo de páginas que podem ter dados dinâmicos:
- Cabeçalho/Texto da página About
- Localização de cada pin na página inicial
- Cabeçalho/Texto/Imagem das páginas internas de cada pin

Exemplos de CMS: Wordpress, Strapi, GraphCMS, Prismic, Dato CMS.

Para essa aplicação é interessante ter um CMS que permita:
- A desacoplação total do conteúdo e do código (Headless CMS) - permitindo disponibilizar apenas o conteúdo pra qualquer aplicação (front/mobile/desktop) via API REST ou via API GraphQL. Em sistemas Headless o conteúdo pode estar hospedado em uma plataforma e o código (de qualquer linguagem) hospedado em outra plataforma (antigamente o Wordpress não era Headless pois o conteúdo ficava no mesmo local do código, e, a função de gerenciar o conteúdo existia, mas o Frontend era fortemente acoplado ao Backend em PHP).
- Configuração mínima/nula de servidor, banco de dados, etc.
- Na nuvem (gerenciamento totalmente online).

Algumas opções de Headless CMS em Clood:

- Antigo GraphCMS (Agora [HyGraph](https://hygraph.com/)) - host completo, servidor, banco, GraphQL, armazenamento de assets (alternativa ao S3/Amazon), chamadas pra API.
- [Prismic](https://prismic.io/) - semelhante ao HyGraph, mais complexo tecnicamente.
- [Dato CMS](https://www.datocms.com/) - bom pra armazenamento de mídias (vídeo/imagem/áudio) com CDN (Content Delivery Network), mas apenas 300 registros no banco de dados.

Para essa aplicação foi escolhido o [HyGraph](https://hygraph.com/)).

---

## HyGraph | CMS | Criação da estrutura

Para o gerênciamento do conteúdo foi necessário criar uma estrutura dentro do HyGraph. Nesse estrutura existe o Projeto - que guarda os modelos de dados com os campos (schemas), os dados em si (conteúdos) e uma API Playground, onde é possível fazer testes para obter/alterar os dados via código.

O passo a passo para o gerenciamento de conteúdo e integração com o Front:

1. Criação/Setup do Schema, na plataforma (através do modelo no projeto)
2. Criação do conteúdo, na plataforma
3. Disponibilizar a API através de um token, na plataforma
4. Integrar o conteúdo com o Front, através do GraphQL, na base de código

---

## HyGraph | CMS | Estrutura | Criação do Projeto/Modelo

### Projeto (Project)

O projeto é onde guardamos, os modelos de dados, os conteúdos, entre outras opções. Na plataforma foi criado um novo Projeto (Project), chamado `My Trips`.

#### Modelo de dados (Model)

O modelo de dados e os campos são uma abstração visual para definição do esquema (`schema`), com métodos e campos do schema gerados automaticamente.

Dentro do projeto `My Trips` foi definido o primeiro modelo de dados. No "Display name" foi definido o nome `page`, que é utilizado automaticamente pelo HyGraph para definir o "API ID" (Page) e o API ID Plural (Pages).

Obs: ia ser criado o modelo `about`, mas o Hygraph sempre cria o schema com o collection type (nesse caso o API ID Plural "Pages"). O correto seria o `about` ser singular (com o schema com o single type ao invés de collection type). Por isso foi criado o esquema mais genérico `pages`, que vai englobar tanto a página `about` quanto outras páginas.

##### Campos (Fields)

Os campos (Fields) são a definição dos dados específicos de um modelo (Model).

Dentro do modelo `page` foram criados os campos:

- heading : do tipo "Single line text", e obrigatório ("make field required" na aba validations) - armazena o título da página.
- body - do tipo "Rich text", e obrigatório ("make field required" na aba validations) - armazena o texto de descrição da página.

## HyGraph | CMS | Estrutura | Criação do conteúdo

### Conteúdo (Content)

Na aba "Content" ao acessar o modelo "page" foi criado um novo registro através do link "+ Add entry".

Para o campo `heading` foi definido o texto "My Trips".

Para o campo `body` foi definido um texto descritivo.

---

## HyGraph | CMS | Validando a obtenção de dados

### API Playground | Primeira Query

Na aba "API Playground" foi criada a primeira query para obter os dados de todas as páginas armazenadas:

```gql
query getPages {
  pages {
    id,
    heading,
    body {
      html
    }
  }
}
```

Foi retornado um objeto JSON com os dados da tabela dentro da prop "data".

---

## CMS | Configuração de acesso externo | Variáveis de ambiente

Para configurar o acesso externo a API do GraphQL do HyGraph é necessário:

- o endpoint da API
- uma autorização de acesso (pro acesso ser apenas do meu Front)
- uma lib client do GraphQL

### No HyGraph

Nas configurações do HyGraph o `endpoint` foi obtido no link "Envoiroments" (ambientes), que só tem o ambiente de produção por ser o plano free, em cenários comerciais existem outros ambientes (stage por ex).

Ainda nas configurações do HyGraph o `token` de autorização foi gerado no link "Permanent Auth Tokens".

### No Projeto - instalação/configuração do client

Foi escolhida a lib "Apollo Client" como ferramenta para se comunicar com o GraphQL do HyGraph - servindo principalmente para padronizar as requisições e para lidar com o cache automaticamente.

Obs: No tutorial foi utilizado o `graphql-request` do Prisma, mas este repositório foi descontinuado, então por isso o "Apollo Client" foi escolhido como uma das [alternativas disponíveis](https://graphql.org/community/tools-and-libraries/?tags=javascript_client) (considerando o tempo do repositório/estabilidade, a comunidade e a doc disponível).

**Instalação do "Apollo Client"**:
```sh
yarn add @apollo/client graphql rxjs
```

**Inicialização**: Seguindo as DOCs do Apollo Client, foi criado o arquivo de configuração `graphql/client.ts`, que utiliza os dados obtidos do HyGraph (`endpoint` e `token`) para fazer a [inicialização do Apollo Client](https://www.apollographql.com/docs/react/get-started#step-3-initialize-apolloclient) e a conexão com o GraphQL.

Para o endpoint foi criada uma constante chamada `endpoint` que guarda a string do link.

Para o token foi criada uma constante chamada `token` que guarda o token de autorização. Nesse caso o token de autorização é uma informação secreta e não pode ser versionada no repositório, por isso foi criado um arquivo chamado `.env.local` que é ignorado pelo git e serve para guardar as variáveis do ambiente local: nesse arquivo foi criada a variável `GRAPHQL_TOKEN` que recebe o token copiado do HyGraph.

O Next obtem as [variáveis de ambiente](https://nextjs.org/docs/pages/guides/environment-variables#loading-environment-variables) automaticamente do arquivo `.env.local` e preenche a variável global `process.env` em tempo de execução. No arquivo `graphql/client.ts` o dado do token é obtido através do acesso a variável `process.env.GRAPHQL_TOKEN`. 

**Autenticação/Header**: Seguindo as DOcs do Apollo Client, o header é configurado para incluir o `token` de [autenticação](https://www.apollographql.com/docs/react/networking/authentication#header) em todas as requisições.

Obs: por estar utilizando alias nos caminhos de arquivo (`@/`) foi necessário fazer o ajuste nas configs do Typescript (`tsconfig.json`) para incluir a pasta `src/graphql`.

---

## CMS | Variáveis de ambiente

O arquivo de config do GraphQL (`src/graphql/client.ts`) foi atualizado: o link do endpoint foi recortado para o arquivo de variáveis do ambiente local `.env.local` e agora o dado do endpoint é obtido de lá.


> <summary>arquivo <b><i>.env.local</i></b></summary>

  ```env
  GRAPHQL_HOST=https://us-west-2.cdn.hygraph.com/content/cmgs1u0o900kp07uqowxfkrvs/master

  GRAPHQL_TOKEN=xYzAbC...
  ```
  
---

## CMS | Exibindo dados do banco na página About

Para exibir os dados do banco de dados na página About foi necessário alterar o template -, e a página About (onde o template é importado).

### No template: 

No arquivo `templates/About/index.tsx` foram adicionadas as novas props `heading` e `body`, que serão informadas na chamada do template. Para essas novas props foi criada a respectiva tipagem (`type AboutTemplateProps`). Para definir o `body` com o html foi necessário utilizar o atributo `dangerouslySetInnerHTML` que utilizamos apenas quando a fonte dos dados é segura (para garantir ainda mais segurança, pode ser configurado um "sanitizer").

### Na página About:

No arquivo `pages/about.tsx` é utilizado um recurso do Next para obter as props do banco de dados em tempo de compilação dos estáticos, ou seja, quando os estáticos são gerados no servidor (SSG) com o comando `next build` as páginas estáticas já são geradas com os dados do banco.

Para gerar as props é utilizado o método `getStaticProps`, que ao ser declarado é reconhecido automaticamente pelo Next e executa antes do componente da página (antes com o nome `About`, agora alterado pra `AboutPage`). Esse método ocorre em tempo de compilação/buildtime (SSG).

Dentro do `getStaticProps` é criado um `client` do Apollo, que faz a query pro GraphQL do HyGraph, obtendo o `heading` e o `body`, que são retornados em um objeto dentro da prop "props".

Dentro do componente `AboutPage` o `heading` e o `body` são recebidos via props e passados pro componente `AboutTemplate`, que já está preparado pra receber essas novas props. Os tipos também foram importados e definidos (`AboutTemplateProps`).

Os dados que aparecem da página agora são os mesmos dados cadastrados no HyGraph.

Obs: o conteúdo vem do banco, mas nessa etapa foi obtido apenas o primeiro registro (`pages[0]`), em seguida um ajuste é feito para obter a página dinâmicamente.

### Refs:

[Apollo com Next antes da versão 13 (Pages directory)](https://www.apollographql.com/blog/next-js-getting-started#using-apollo-client-for-statically-rendered-page-data)

[Definindo html com innerHTML no React](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)

### Ref extra:

[React Server Components (RSC - Next 13+](https://www.joshwcomeau.com/react/server-components/)

---

## CMS | GraphQL | Definindo local padrão para as Queries

Para facilitar a manutenção foi criado o arquivo `graphql/queries.ts` arquivo pra guardar as queries utilizadas. O arquivo `pages/about` foi alterado de acordo com essa alteração e agora importa a constante que é exportada do arquivo de Queries.

---

## CMS | Slug | Definindo parâmetro pro conteúdo dinâmico

Pro conteúdo dinâmico foi necessário definir um parâmetro único que serve de referência para obter os dados de uma página específica. Pra esse parâmetro foi criado um novo campo no banco, além de uma nova query no projeto pra obter os dados da página com base nesse novo campo.

### No HyGraph | Novo campo no modelo Pages

Foi criado campo o novo campo "slug" do tipo "[Slug](https://hygraph.com/docs/developer-guides/schema/slug-field)" com as opções:

- "Generate slug from template": para a opção de gerar o slug no título (campo `{heading}`) 
- "Make field required": obrigatório
- "Set field as unique": pra garantir que o dado é o único para esse modelo

Obs: Foi necessário atualizar o conteúdo já existente (da página about), incluindo o slug "about" no respectivo campo.

### No Projeto

Foi criada a nova query `getPageBySlug` (disponibilizada automaticamente pelo HyGraph), que retorna os dados de uma única página (ao invés de retornar várias páginas).

A query é utilizada na página "About", fazendo a requisição pro GraphQL com a variável `slug: "about"` como parâmetro. Os dados obtidos são retornados dentro do atributo "props". 

Nesse ponto o conteúdo deixou de ser uma lista carregada de forma fixa e tratada pelo JavaScript (antigo `pages[0]`). Agora o conteúdo é carregado com base no "slug" e apenas um item é obtido direto do GraphQL.

### Refs:

[Campo Slug - HyGraph DOCs](https://hygraph.com/docs/developer-guides/schema/slug-field)

---

## CMS | Definindo rotas estáticas com base no slug

Com o slug disponível, agora é possível utilizar esse dado para também gerar as rotas dinâmicamente, para isso é utilizado o método `getStaticPaths`, que ao ser declarado é reconhecido automaticamente pelo Next e executa antes do `getStaticProps` (e antes do componente da página em si). Esse método ocorre em tempo de compilação/buildtime (SSG).

Dentro do método `getStaticPaths` foi criado um `client` do Apollo, que faz a query pro GraphQL do HyGraph, obtendo uma lista de páginas com o `slug` de cada página. A lista é retornada em um objeto dentro da prop "paths". Obs: o objeto também tem a prop "fallback" que é obrigatória, indicando se existe ou não algo pra mostrar antes da requisição terminar (como um "loading..." ou algo do tipo).

Já dentro do `getStaticProps` foi feita uma alteração para obter o slug com base no "params" definido no `getStaticPaths`. Assim a definição pela string fixa "about" deixou de ser utilizada e agora esse dado vem direto do banco.

Por fim a página `src/about.tsx` foi renomeada para `src/[slug].tsx`, que é entendida pelo Next como uma rota dinâmica, sendo renderizada com base no parâmetro entre [], nesse caso "slug".

Agora tanto as rotas quanto o conteúdo estático de cada página são renderizados dinâmicamente em tempo de compilação/buildtime (SSG).

### Conceitos

Aqui o termo "dinâmico" se refere a geração (pre-rendering) das rotas/conteúdo em tempo de compilação (buildtime) - ou seja, no fim (ao rodar `next build`) o resultado é estático (SSG - resultando em uma estrutura de pastas e html). Além desse, também existe o termo "dinâmico" no contexto de rotas/conteúdo sendo gerados em tempo de execução (runtime), quando os dados são obtidos diretamente do servidor (SSR).

Outra forma de ver: a geração pre-rendering/SSG é dinâmica pro dev e estática pro cliente, já a geração "rendering direto"/SSR é dinâmica pro dev e pro cliente.

O que é chamado de "Dynamic Routes" no Next na verdade pode ser tanto rotas estáticas (se a rota responde com um html puro, sem consultas ao banco), quanto rotas "realmente" dinâmicas (se a rota depende de consultas ao banco no momento da requisição).

### Refs:

[SSG - Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

[SSR - Server-side Rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)

[Rotas dinâmicas - NextJS DOCs (Pages Router)](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)

---

## Componente Page | Alteração em nome de pastas/importações

Como o componente da página está ficou mais genérico, os lugares onde a palavra "About" era utilizada foram alterados para utilizar apenas a palavra "Page".

---

## Projeto | Tipagem automática com base nos schemas

Na resposta de cada query chega um objeto com a prop "data" com um objeto filho e as props pedidas ao GraphQL. A prop data e os filhos dela não foram tipadas até então.

Para fazer a tipagem das respostas do GraphQL de forma automática é possível utilizar a biblioteca [codegen](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config) que obtem as tipagens dos `schemas` do GraphQL e gera a tipagens em TypeScript.

### Instalando o codegen:

```sh
yarn add --dev @graphql-codegen/cli
```

### Gerando o arquivo de config via CLI:

Para gerar o arquivo de config automaticamente com base nas perguntas:

```sh
npx graphql-code-generator init
```
Perguntas/Respostas:

> ✔ _What type of application are you building?_ **Application built with React**

> ✔ _Where is your schema?:_ (path or url) **https://us-west-2.cdn.hygraph...**
Obs: Aqui é o mesmo endereço definido no `GRAPHQL_HOST` da variáveis de ambiente (que foi obtido lá do HyGraph).

> ✔ _Where are your operations and fragments?:_ **/src/graphql/client.ts**

> ✔ _Where to write the output:_ **src/graphql/generated/graphql.ts**

> ✔ _Do you want to generate an introspection file?_ **No**
Obs: Isso serve para quando a aplicação precisa disponibilizar os schemas em um arquivo. Não é o caso dessa aplicação (my-trips). O HyGraph por exemplo disponibiliza esse arquivo via API, então outros devs conseguem saber os schemas.

> ✔ _How to name the config file?_ **codegen.ts**

> ✔ _What script in package.json should run the codegen?_ **codegen**
Obs: palavra chave a ser definida no "package.json" para chamar o codegen.

### Instalando pacotes adicionais:

Após responder as perguntas é necessário executar o gerenciador de pacotes para instalar qualquer outro pacote/plugin que foi configurado pelo CLI na etapa anterior:

```sh
yarn
```

### Gerando os arquivos de tipagem do TypeScript

Com a configuração feita, para gerar os arquivos de tipagem do TypeScript basta rodar o comando:

```sh
yarn codegen
```

### Para ignorar o lint nos arquivos gerados

É necessário ignorar os arquivos gerados pois eles sempre são automáticos e não vai existir alteração manual neles.

No tutorial é utilizada a lib `@graphql-codegen/add`, mas ela está desatualizada (em testes ela só teve efeito em um arquivo). Antes o codegen gerava só um arquivo e agora gera vários, o que levou a essa icompatibilidade.

Como alternativa a config do eslint foi alterada direto no arquivo `eslint.config.mjs` para ignorar tudo que estiver na pasta `graphql/genetared`.


### Adicionando a tipagem nos retornos das queries

No Componente da página genérica (`Page` em `[src/slug].tsx`) os tipos `GetPagesQuery` / `GetPageBySlugQuery` foram importados do arquivo gerado pelo codegen e passados como argumento de tipagem pro método `query` do Apollo Client, dessa forma a tipagem do retorno é entendida, as props "data" e os filhos dela passam a ter o autocomplete do intelisense.

### Ajuste indicado pelo TypeScript (Workaround)

A tipagem `GetStaticPaths` do next indicou um erro no retorno da função. A função sempre deve retornar a prop `paths` com um array de objetos que possuem a prop `params`, então quando o `paths` for indefinido ou quando o array de paths não tiver nenhum item, ainda é necessário existir um paths com esses critérios (`paths = [{ params: { slug: ''} }]`). Então foi feito o ajuste que faz um `if` pra verificar os critérios e modifica o `paths` caso necessário, evitando um erro de processamento no next.


### Refs:

[Codegen Config](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config)

---

## Marcadores do mapa | Estrutura de dados no Hygraph CMS

Para os marcadores/pins é necessário entender quais dados são necessários, para depois criar a estrutura através do modelo no Hygraph CMS. Analisando a referencia do projeto final, foi definido que é necessário:

Pra página **Home**:

```
Home
.
├── Localidade
│   ├── Latitude
│   └── Longitude
└── Nome do local (mousehover)
```

Pra **página interna**:

```
[página interna]
.
├── slug (pra url)
├── Nome do local (Título)
├── Descrição
└── Lista de Imagens
```

### Definição do modelo/schema

Dentro do projeto `My Trips` foi definido o segundo modelo de dados (o primeiro foi o page). No "Display name" foi definido o nome `place`, que é utilizado automaticamente pelo HyGraph para definir o "API ID" (Place) e o API ID Plural (Places).

### Campos (Fields)

Considerando a análise anterior, dentro do modelo `place` foram criados os campos:

- **name**
  - armazena o nome da localidade
  - do tipo "Single line text"
  - obrigatório (opção "Make field required")
  - reaproveitável em 2 páginas:
    - pro mousehover na home
    - pro título na página interna 
- **slug**
  - armazena a URL da localidade
  - com geração automática com base no campo {name} ("Generate slug from template")
  - caixa baixa (opção "lowercase")
  - obrigatório (opção "Make field required")
  - dado único (opção "Set field as unique")
  - reaproveitável em 2 páginas:
    - pro link da home
    - pra URL da página interna 
- **location**
  - armazena as coordenadas da localidade
  - do tipo "Location" (antigo "Map")
  - com o recurso de mapa interativo do próprio HyGraph
  - obrigatório (opção "Make field required")
  - um pin por local/dado único (opção "Set field as unique")
- **description**
  - armazena o texto de descrição da localidade
  - do tipo "Rich text" (serve pra html, listas, etc)
  - campo opcional (opção "Make field required" **_desmarcada_**)
- **gallery**
  - armazena a coleção de imagens da localidade
  - do tipo "Asset picker"
  - aceita várias imagens (opção "allow multiple assets")
  - pelo menos uma imagem/campo obrigatório (opção "Make field required")

Criação do modelo/schema concluído.

### Populando o conteúdo

Na aba "Content" ao acessar o modelo "place" foi criado um novo registro através do link "+ Add entry":

- **name**
  - preenchido com o texto `Paraty` 
- **slug**
  - preenchido com o texto `paraty` (gerado automático)
- **location**
  - o Hygraph permite selecionar ou pesquisar locais no mapa interativo
  - utilizado para posição do marker/pin
  - preenchida com a localidade de Paraty
- **description**
  - não preenchido (opcional)
- **gallery**
  - o Hygraph permite selecionar imagens locais ou pesquisar imagens online
  - preenchida com 2 imagens após pesquisa

### Validando a obtenção dos dados | API Playground

Na aba "API Playground" foi criada a query para obter os dados de todos os locais armazenados:

```gql
query getPlaces {
  places {
    id
    name
    slug
    location {
      latitude
      longitude
    }
    description {
      html
    }
    gallery {
      url
      width
      height
    }
  }
}
```

Foi retornado um objeto JSON com os dados existentes na tabela "places".

## Marcadores do mapa | Projeto | Separando o Componente/Template Home

Antes de integrar com o CMS e obter os dados do mapa foi necessário fazer a separação da página inicial (onde os dados serão requisitados) do componente em si (onde os dados serão apresentados).

Todo o código da página inicial (componente Home - `pages/index.tsx`) foi recortado pro novo componente HomeTemplate (`templates/Home/index.tsx`) e neste ponto o componente `HomeTemplate` é apenas importado no componente `Home`.

A modificação para obtenção e visualização dos dados é feita a seguir.

## Marcadores do mapa | Projeto | Integração do CMS

Para a integração com o CMS:

- a query `getPlaces` foi copiada do Hygraph pro arquivo `graphql/queries.ts`;
- a tipagem automatica da nova query foi gerada (com o comando `yarn codegen`);
- pra geração das props estáticas com base nos dados retornados de `getPlaces`:
  - o método `getStaticProps` do Next foi criado na página inicial (`pages/index.tsx`)
  - o query é chamada pelo Apollo Client
  - a query é tipada (utilizando o código gerado pelo codegen)
  - o resultado é retornado dentro de "props"
- foi criada a nova prop "places" no componente `Home`, que recebe os dados retornados pelo método `getStaticProps` e passa pro componente `HomeTemplate`;
- foi criada a nova prop "places" no componente `HomeTemplate`, que recebe os dados retornados pelo componente `Home`
- o componente `Map` deixa de receber dados fixos e passa a receber os dados via props do componente `Home`.

Como resultado o mapa mostra os pins dinâmicamente, com base nos dados cadastrados no banco de dados do HyGraph que chegam via GraphQL.

---

## Links de cada Marker | Componente Map

Para adicionar o link para as páginas internas o Componente `Map` foi alterado:

- a propriedade `slug` foi adicionada a tipagem de `Place` e nos argumentos do método `.map` utilizado no array `places`.
- o caminho da página interna (href) foi criado utilizando o `slug`.
- o método `useRouter.push` do Next foi utilizado para redirecionar pra página interna baseado no href.
- foi criado o método `HandleClick` com a chamada do `useRouter.push` para cada item de `places`.
- o método `HandleClick` é atribuído ao evento click de cada Maker através da prop `eventHandlers` do [React Leaflet](https://react-leaflet.js.org/docs/example-events/).

> **Obs:** O método `useRouter.push` foi utilizado no lugar do componente `Link` do Next por conta da estrutura interna do pacote React-Leflet.

Neste ponto da aplicação, ao clicar em um pin/marker é feito o redirecionamento para página interna (404, pois falta a integração com as páginas internas).

### Refs:

[React Leaflet DOCs - Events](https://react-leaflet.js.org/docs/example-events/)


---

## Página Place | Definindo rotas estáticas com base no slug

Semelhante ao que foi feito pra [pages](#cms--definindo-rotas-estáticas-com-base-no-slug), neste ponto é possível utilizar o slug de `places` para gerar as rotas estáticas dinâmicamente:

- A query que busca os lugares pelo slug foi criada (arquivo `queries.ts`).
- A tipagem automática das queries é gerada (`yarn codegen`)
  - `GetPlaceBySlugQuery` criado na geração automática
- Foi criado o arquivo da página Place (`pages/place/[slug].tsx`);
- Foi definido o método `getStaticPaths`, utilizado pelo Next para definir as rotas estáticas com base no parâmetro dinâmico `slug`:
  - A query `GET_PLACES` é chamada para obter o slug de cada place;
  - A tipagem do retorno da query é definida (`GetPlacesQuery`);
  - O método retorna o objeto com as props `paths` e `fallback`.
- Foi definido o método `getStaticProps`, utilizado pelo Next para definir as props recebidas na página Place (por enquanto somente `heading`):
  - A query `GET_PLACE_BY_SLUG` é chamada para obter o slug de cada place;
  - A tipagem do retorno da query é definida (`GetPlaceBySlugQuery`);
  - O método retorna o objeto `{ props: { heading } }`.
- Foi criado o componente `Place`, que recebe a prop `heading` para ser exibida dentro da tag `<h1>`.

Neste ponto da aplicação já é possível acessar uma rota ao clicar em um Marker da página inicial - que mostra o título definido dentro do `<h1>`.

---

## Componente Page | Ajuste na tipagem

> Feito um ajuste no Componente Page (`templates/Page/index.tsx`) para a tipagem do componente ficar de acordo com o schema do GraphQL, definindo o campo `body` como opcional e só exibindo o conteúdo se o campo estiver definido.

> Feito outro ajuste no componente Page. Ocorreu uma confusão, na verdade o campo `body` do componente `Page` é obrigatório, então a tipagem ajustada. O campo `description` do componente Place que é opcional (tipagem feita a seguir).

---

## Página Place | Definindo conteúdo da descrição

Foi feito um ajuste na página `Place` para exibição dos conteúdos:

- A query que busca lugares pelo slug foi atualizada (`queries.ts`).
- A tipagem automática das queries é atualizada (`yarn codegen`)
  - `GetPlaceBySlugQuery` atualizado na geração automática
- O método `getStaticProps` do next foi atualizado para passar o objeto `place` completo ao invés de props separadas (`name`/`description`)
- O componente `Place` foi atualizado:
  - tipagem atualizada (`PageTemplateProps` removido e `PlaceTemplateProps` adicionado)
  - recebe a prop `place` completa ao invés de props individuais
  - a tag `<h1>` agora recebe a prop `place.name` ao invés de `heading`.
  - a tag `<div>` é criada e recebe a prop `place.description`


Neste ponto da aplicação já é possível ver o título e a descrição de um lugar ao acessar uma rota.

## Componente PlaceTemplate | Separando o conteúdo da geração estática

Semelhante ao que foi feito pro página `Page`, a página `Place` foi alterada - o código do conteúdo foi movido para um novo componente (`templates/Place/index.tsx`) e foi criado um arquivo de estilos (`templates/Place/styles.ts`). Essas modificações melhoram:

- a organização;
- a manutenção;
- o isolamento da estrutura;
- o isolamento da estilização;
- o isolamento da lógica;
- o isolamento da tipagem.

---

## Componente PlaceTemplate | Estilização e botão de voltar

Estilização base definida para o componente PlaceTemplate (`templates/Place/styles.ts`). Também foi adicionado o botão de fechar/voltar pra página inicial (semelhante ao `PageTemplate`).

> Obs: Devido ao cache gerado pela compilação dos estáticos (com `yarn build`), foi necessário limpar os dados do site (`Clear site data` na aba "Application" do inspetor, removendo qualquer cache/dados do PWA).

---
## Componente PlaceTemplate | Adicionando imagens

As imagens ainda não apareciam nesse ponto da aplicação. Para incluir as imagens de cada lugar na página `Place`, foram feitas as modificações:

- atualização na query `getPlaceBySlug`, incluindo a prop `gallery`
- atualização da tipagem (via `yarn codegen`) do retorno da query (`GetPlaceBySlugQuery`)
- atualização nos tipagem de `PlaceTemplateProps`, incluindo a prop `gallery`
- após o título e a descrição da página, a criação de um loop (via `map`) em `gallery`
- no loop, o retorno de cada imagem com a definição da `url` no `src`
- definição dos estilos para imagens responsivas (`templates/Place/styles.ts`)

Neste ponto da aplicação as imagens aparecem ao acessar a página de cada localidade.

---

## Componente PlaceTemplate | Otimizando imagens

As imagens vindo direto do HyGraph estavam muito pesadas e carregando todas de uma vez só. Para otimizar esses pontos:

- as configs do Next foram atualizadas para requisição de imagens externas
  - o domínio `us-west-2.graphassets.com` foi adicionado
- a tag `img` foi trocada pelo componente `Image` do Next, que:
  - baixa uma cópia das imagens
  - otimiza as imagens alterando o formato (.webp)
  - cria mais versões das imagens de acordo com o tamanho de tela (viewport)
  - aplica o lazy loading para imagens abaixo da dobra da página

- sobre a prioridade:
  - o atributo `priority` do Next Image permite priorizar imagens, como por exemplo imagens acima da dobra, o que permite medir corretamente o [LCP - Large Contentful Paint](https://web.dev/articles/lcp). 

Neste ponto as páginas ficaram mais leves para diversos tamanho de tela e carregam mais rápido, melhorando a experiência do usuário (UX).

### Exemplo de carregamento na localidade São Paulo, SP:

Cenário: acesso via conexão 4G (rápida):

Antes:
- FCP (First Contentful Paint): 0.4 s
- transferred: 5800 Kb
- Load: 7.28 s
- Finish: 7.78 s

Depois:
- FCP (First Contentful Paint): 0.4 s
- transferred: 271 Kb
- Load: 640 ms
- Finish: 1.06 s

**Resultado:** 
- Aumento de 734% na velocidade de carregamento
- Economia de 6.72 segundos


### Refs:

[FCP - First Contentful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint)
[LCP - Large Contentful Paint](https://web.dev/articles/lcp)
[Componente Image - Next DOCs](https://nextjs.org/docs/pages/getting-started/images)

---

## Componente PlaceTemplate | Animação de carregamento

Para aumentar a experiência do usuário (UX) foi adicionada uma animação de fundo nas imagens com um degradê animado que se move de um lado para o outro (`templates/Place/styles.ts`). Essa animação serve como um "placeholder", que aparece enquanto a imagem está carregando.


---

## Componente Map | Ajustes nos tamanhos

Foram feitos ajustes no componente Map para definir o ponto central, o zoom e o tamanho do link de atribuição do Leaflet.

---

## Adicionando estilo alternativo pro mapa | Mapbox Studio

Para estilização alternativa do mapa foi utilizado o [Mapbox Studio](https://console.mapbox.com/studio/), com ele é possível definir o que vai aparecer no mapa, cores dos territórios, fontes alternativas, etc.

Utilizando a doc de referência uma nova conta foi criada e [configurada](
https://docs.mapbox.com/help/tutorials/configure-basemap-mapbox-studio/).

Na nova conta foi possível cadastrar um novo [estilo](https://docs.mapbox.com/studio-manual/reference/styles/), que funciona como um template visual personalizavel, com recursos de camadas, tipografia, cores, etc. Em um novo estilo é possível definir os aspectos visuais de:
- nomes dos lugares;
- terra/mar;
- rodovias/ruas;
- divisões de Estados/Países;
- etc.

Inspiração para estilos podem ser encontrados na [galeria do Mapbox](https://www.mapbox.com/gallery).

Neste ponto o estilo `blue-map-copy` está pronto na plataforma do Mapbox. Resta fazer a integração com a aplicação "my-trips".

### Refs:

[Mapbox Studio](https://console.mapbox.com/studio/)

[Configurando um mapa (Mapbox Docs)](https://docs.mapbox.com/help/tutorials/configure-basemap-mapbox-studio/)

[Estilos (Mapbox Docs)](https://docs.mapbox.com/studio-manual/reference/styles/)

[Galeria do Mapbox](https://www.mapbox.com/gallery)

---

## Projeto | Integração do Mapbox e Leaflet

Para integrar os estilos definidos do Mapbox com o mapa gerado utilizando o Leaflet foi necessário atualizar o projeto. 

O Leaflet utiliza o método de "tilemap", onde várias [imagens rasterizadas](https://docs.mapbox.com/api/maps/static-tiles/) compõem a visualização do mapa. Dependendo da posição central e do zoom aplicado, os pedaços do mapa (`tiles`) são requisitados/carregados e se encaixam um no outro, semelhante a um quebra cabeça.

Após publicar o estilo `blue-map-copy`, é possível utilizá-lo dentro do Leaflet chamando a API do Mapbox passando os parâmetros `username`, `style_id`, `tilesize`, `access_token` e o boleano `@2x` (em caso de tela retina). Os parâmetros são obtidos pelo painel do [Mapbox Studio](https://console.mapbox.com/studio/) acessando o estilo e clicando na opção "share".

No projeto foram definidas novas variáveis de ambiente no arquivo `.env.local`. Onde o início com `NEXT_PUBLIC_` indica que são [variáveis de ambiente públicas](https://nextjs.org/docs/pages/guides/environment-variables#bundling-environment-variables-for-the-browser) e ficam disposíveis não só do lado do servidor (node.js), mas também do lado do cliente (browser):

```env
...

NEXT_PUBLIC_MAPBOX_HOST=https://api.mapbox.com/styles/v1

NEXT_PUBLIC_MAPBOX_USERID=cafecomlucas

NEXT_PUBLIC_MAPBOX_STYLEID=cmhx...

NEXT_PUBLIC_MAPBOX_API_KEY=pk.eyJ1IjoiY...
```

Os parâmetros definidos nas variáveis de ambiente são configurados/exportados no novo arquivo `config/mapbox.ts`.

Por fim o componente Map (`components/Map/index.tsx`) é alterado para que  o componente `TileLayer` utilize o mapa do Mapbox apenas se a variável `mapBoxApiKey` estiver preenchida, do contrário o mapa padrão do Leaflet é utilizado. A [referência dos estilos](https://docs.mapbox.com/studio-manual/guides/publish-your-style/#leaflet) na DOC do Mapbox é um pouco diferente pois o Leaflet está sendo utilizado através do `React Leaflet`, então foi necessário ajustar de acordo com esse contexto (por exemplo: a definição de parâmetros `url` e `attribution` via props ao invés de argumentos do método `L.tileLayer`).

### Refs:

[Imagens estáticas (Mapbox DOCs)](https://docs.mapbox.com/api/maps/static-tiles/)

[Usando um estilo do Mapbox no Leaflet (Mapbox DOCs)](https://docs.mapbox.com/studio-manual/guides/publish-your-style/#leaflet)

[Variáveis de ambiente públicas (NextJS DOCs)](https://nextjs.org/docs/pages/guides/environment-variables#bundling-environment-variables-for-the-browser)

---

## Mapbox | Redução de custos | Otimizando o número de requisições

O [preço do Mapbox](https://docs.mapbox.com/api/maps/static-tiles/#static-tiles-api-pricing) é definido por requisições na API, sendo que a requisição de até 200.000 `tiles` por mês é gratuíto - passando disso é cobrado $0,50 a cada 1.000 `tiles` gerados.

Na DOC existem estratégias para [diminuir o número de requisições](https://docs.mapbox.com/api/maps/static-tiles/#manage-static-tiles-api-costs), como:

- aumentar o tamanho do `tile` padrão;
- ajustar o zoom aplicado.

O `tile` padrão do Leaflet é de 256x256, então em um pedaço do mapa que possui 1024x1024 são utilizados 16 requisições:

```sh
256 | 256 | 256 | 256
────|─────|─────|─────
256 | 256 | 256 | 256
────|─────|─────|─────
256 | 256 | 256 | 256
────|─────|─────|─────
256 | 256 | 256 | 256
```


Ou seja, ajustando o tamanho padrão do tile para 512x512, o mesmo pedaço do mapa utiliza apenas 4 requisições:

```sh
512 | 512 
────|─────
512 | 512 
```

O ajuste do Leaflet foi feito no componente `Map` (Ajustando o `tileSize` para `512` e o zoomOffset para `-1`). O ajuste do Mapbox foi feito no arquivo de config do mapbox (substituindo 256 por 512 na constante `mapBoxUrl`).

Extra: foi configurado para a API do Mapbox retornar uma imagem para telas retina (incluído o `@2x` na constante `mapBoxUrl`) - o que retorna imagens com o dobro do tamanho (1024x1024px), mas que ocupam o espaço padrão (512x512) setato automaticamente pelo Leaflet via CSS.

### Refs:

[Preços do Mapbox](https://docs.mapbox.com/api/maps/static-tiles/#static-tiles-api-pricing)

[Gerenciando os custos da API (Mapbox DOCs)](https://docs.mapbox.com/api/maps/static-tiles/#manage-static-tiles-api-costs)

[Outras formas de gerenciar os custos](https://docs.mapbox.com/help/troubleshooting/manage-web-map-costs/)


---

## Projeto | UX | Melhorando a usabilidade com uma barra de progresso

Ao navegar entre uma página e outra não era possível saber se a interação tinha funcionado ou não. Era necessário melhorar a experiência do usuário (UX) - para isso foi adicionada uma pequena biblioteca chamada [NProgress](https://ricostacruz.com/nprogress/), que exibe automaticamente uma barra de progresso no topo de todas as páginas.

Como o projeto está com o NextJS, ao invés de utilizar a lib NProgress diretamente, foi utilizada a lib [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar), que funciona como um Wrapper do Nprogress original, deixando ele compatível com o NextJS (ou seja, pode ser adicionado/configurado através de um componente).

Instalação do nextjs-progressbar:
```sh
yarn add nextjs-progressbar
```

Após a instalação, o nível mais alto da aplicação (`_app.tsx`) foi alterado para incluir a barra de progresso antes do conteúdo.

Neste ponto, ao navegar entre as páginas uma barra de progresso é preenchida automáticamente e desaparece - isso dá um feedback do que está acontecendo, o que melhora a experiência do usuário.

### Refs:

[NProgress (site)](https://ricostacruz.com/nprogress/)

[NProgress (Github)](https://github.com/rstacruz/nprogress)

[nextjs-progressbar (NPM)](https://www.npmjs.com/package/nextjs-progressbar)

---

## SEO | Config padrão para os mecanismos de busca 

Para melhorar a encontrabilidade do site, foi o utilizado o plugin [next-seo](https://github.com/garmeeh/next-seo/tree/main/src/pages), que facilita a definição das meta informações.

Obs: Pela indicação do README atual, a referência foi a doc mais antiga do Next SEO, pois neste ponto da aplicação o projeto utiliza o Router antigo do Next.js (ou seja, utiliza o Pages Router ao invés do App Router).

Instalação:
```sh
yarn add next-seo
```

Seguindo a documentação, foram feitas as modificações:
- Criação do arquivo de configuração (`next-seo.config.ts`)
- Definição das meta infos padrão (as comuns e as espefícicas pro Facebook/Opengraph)
- Importação/implementação das meta infos no componente `_app`
- Remoção das meta infos antigas do componente `_document`
- Adicional: devido um alerta do TypeScript, foi necessário fazer um ajuste na config (`tsconfig.json`) para aceitar o jeito que o Next SEO exporta os tipos ([Module Resolution](https://www.typescriptlang.org/tsconfig/#moduleResolution))


### Refs:

[Next SEO (GitHub)](https://github.com/garmeeh/next-seo/tree/main/src/pages)
[Module Resolution (TypeScript DOCs)](https://www.typescriptlang.org/tsconfig/#moduleResolution) 

---

## SEO | Config para mecanismos de busca nas páginas internas

O SEO foi definido nos componentes da página inicial (`HomeTemplate`) e das páginas internas de cada lugar (`PlaceTemplate`).

O componente `HomeTemplate` foi modificado para implementar a descrição das meta infos da página inicial.

O componente `PlaceTemplate` também foi modificado para implementar as meta infos de acordo com os dados recebidos do HyGraph via props. Foi necessário:

- ajustar o template do meta título na config do Next SEO padrão (resultando no padrão `{name} | My Places`);
- definir o meta título do `PlaceTemplate` com o atributo `name` (que utiliza o template do Next SEO)
- adicionar atributos `description.text` (para a meta descrição), `gallery.width` e `gallery.height` (para o tamanho da meta imagem definida pro Facebook/OpenGraph)
- adicionar tipagem no `PlaceTemplateProps` para os novos atributos
- modificar as queries do GraphQL para retornar os novos atributos necessários
- gerar tipagem automática das queries via codegen (`yarn codegen`)

Obs 01: no arquivo de queries também foram removidas propriedades que não estavam sendo utilizadas.

Obs 02: As infos de meta títulos/descrições comuns servem como referência para definir esses mesmos meta dados pro Facebook/Opengraph automaticamente.

Neste ponto os meta dados são gerados/exibidos dentro da tag `head` de cada página ao inspencionar o código fonte. 

### Refs:

[Propriedades comuns - Next SEO DOCs](https://github.com/garmeeh/next-seo/tree/main/src/pages#common-props)

---

## Conceitos de Server Side com o Next | SSR | SSG | ISR

### SSR - Server Side Rendeding

Renderização do lado do servidor: É baseado no jeito tradicional de renderização, que retorna páginas dinâmicas, onde o cliente faz uma requisição pro servidor e o servidor processa o html logo antes de enviar (em tempo de execução - runtime). Este é um modelo utilizado também em outras linguagens como PHP, Ruby, Phyton.

Como a renderização é feita no servidor, os bots dos mecânismos de busca recebem exatamente o que precisam, o que é melhor para o SEO. Já em aplicações SPA (Single Page Application) por exemplo, boa parte do processamento é feita do lado do cliente, o que deixa a indexação/SEO pior.

A desvantagem é que o processamento envolve consultas ao banco de dados e a renderização dos arquivos dinâmicos enquanto o cliente aguarda a finalização (leva mais tempo).

Exemplo:

```
SSR - SERVER SIDE RENDERING (RUNTIME)           
                                          
┌────────┐           ┌─────────────┐        ┌────┐              
│ CLIENT │           │   SERVER    │        │ DB │              
│        ├──────────►│  ┌──────┐   │        │    │              
│        │           │  │ NEXT ├───│───────►│    │              
│        │           │  │      │◄──│────────│    │              
│        │           │  └──────┘   │        │    │              
└────────┘           │     │       │        │    │              
    ▲                │     ▼       │        └────┘              
    │                │ ┌─────────┐ │                            
    │                │ │ DYNAMIC │ │                            
    │                │ └─────────┘ │                            
    │                └─────┼───────┘                            
    │                      │                                   
    │                      │                                   
    └──────────────────────┘                                     
```

### SSG - Static Site Generation

Geração de Site Estático: Surgiu como uma maneira de otimizar o tempo de resposta pro cliente, mantendo a qualidade do SEO. Todo o processamento (consulta a banco de dados / criação dos arquivos estáticos) é feito antes mesmo do cliente realizar qualquer requisição. Os arquivos são gerados em tempo de compilação (buildtime). Então quando a requisição ocorre os estáticos já estão prontos (pré-renderizados), o que melhora o tempo de resposta (quase instântaneo) e a experiência do usuário (UX). 

Nesse modo os estáticos gerados podem até mesmo movidos para outro servidor, pois passam a existir independente da requisição direta do cliente.

Outros geradores estáticos que utilizam essa abordagem são: Jenkyll, Hugo, Gatsby, etc.

A desvantagem é que alterações no banco de dados não geram novos estáticos automaticamente e o comando para um novo `BUILD` precisa ser feito manualmente (e posso **esquecer**) - nesse cenário, a alteração do preço de um produto que não foi feita pode trazer prejuízo, por exemplo. 

Além disso, mesmo com um `trigger`/`webhook` configurado no servidor para fazer um novo `BUILD` após uma atualização no banco, todos os estáticos são regerados, e quanto mais estáticos passarem a existir, maior o tempo de compilação, já que todos os arquivos são compilados novamente (mesmo os não atualizados), o que consome cada vez mais recursos do servidor.

Exemplo:

```
SSG - STATIC SITE GENERATION (BUILDTIME)

                                   ┌───────┐                   
                                   │ BUILD │                   
                                   └───────┘                   
                                       │                       
                                       ▼                       
┌────────┐                       ┌────────────┐        ┌────┐  
│ CLIENT │                       │   SERVER   │        │ DB │  
│        ├────────────┐          │  ┌──────┐  │        │    │  
│        │            │          │  │ NEXT ├──│───────►│    │  
│        │            │          │  │      │◄─│────────│    │  
│        │            │          │  └──────┘  │        │    │  
└────────┘            │          │     │      │        │    │  
    ▲                 │          │     │      │        └────┘  
    │                 ▼          │     │      │                
    │              ┌──────┐      │     │      │                
    └──────────────│STATIC│◄─────│─────┘      │                
                   └──────┘      └────────────┘                
```


### ISR - Incremental Static Regeneration

Surgiu como uma maneira de otimizar o tempo de compilação dos estáticos. Essa abordagem une o melhor da renderização em tempo de execução (runtime) e o melhor da renderização em tempo de compilação (buildtime).

É feita uma compilação inicial (buildtime) com apenas alguns estáticos e os estáticos seguintes são gerados quando o cliente faz uma requisição para o servidor.

Caso o estático já exista o mesmo é entregue para o cliente. Caso não exista ainda, um estático de página inexistente (404) é retornada e a geração do estático é iniciada em paralelo - ou seja, o cliente continua recebendo apenas estáticos e não precisa aguardar processamentos feitos no servidor. Para essa abordagem funcionar a requisição precisa ser feita diretamente servidor onde os estáticos são gerados - ou seja, os estáticos não podem ser movidos pra outro servidor.

Obs: no gráfico abaixo, fica assumido que quando a página não existe é apenas estático dela, mas os dados dela existem no banco e por isso ela precisa ser gerada. No fluxo completo essa verificação é adicionada.

Exemplo:
```
ISR - INCREMENTAL STATIC REGENERATION (RUNTIME + BUILDTIME)

                                   ┌───────┐                   
                                   │ BUILD │                   
                                   └───────┘                   
                                       │                       
                                       ▼                       
┌────────┐                      ┌──────────────┐       ┌────┐  
│ CLIENT │                      │    SERVER    │       │ DB │  
│        │─────────────────────►│   ┌──────┐   │       │    │  
│        │                      │   │ NEXT ├───│──────►│    │  
│        │                      │   │      │◄──│───────│    │  
│        │                      │   └──────┘   │       │    │  
└────────┘                      │      │       │       │    │  
    ▲  ▲                        │ PAGE EXISTS? │       └────┘  
    │  │                        │  YES    NO   │               
    │  │           ┌──────┐     │   │     │    │               
    │  └───────────┤STATIC│◄────│───┘  ┌─────┐ │               
    │              └──────┘     │      │BUILD│ │               
    │                           │      └─────┘ │               
    │                           │         │    │              
    │                           └──────────────┘               
    │              ┌─────┐                │                    
    └──────────────┤ 404 │◄───────────────┘                    
                   └─────┘                                     

```

#### ISR: Revalidate

Para lidar com páginas que precisam ser regeradas de tempos em tempos é utilizado o atributo `revalidate`, que armazena de quanto em quanto tempo a página precisa ser gerada novamente, caso existam dados atualizados.

Se o estático da página ainda não existir, mas existe no banco e precisa ser gerada, segue o mesmo fluxo anterior.

Agora, quando a página já existe e precisa ser gerada novamente (dados atualizados no banco) é necessário verificar o tempo do `revalidate`. Se o `revalidate` expirar, o estático antigo é entregue pro cliente e a regeração (`REBUILD`) do novo estático é iniciado - ou seja, na próxima vez que o cliente acessar o estático, ele já vai estar atualizado.

Obs: no gráfico abaixo, fica assumido que quando a página não existe é apenas estático dela, mas os dados dela existem no banco e por isso ela precisa ser gerada. No fluxo completo essa verificação é adicionada.

Exemplo:
```
ISR: REVALIDATE
                                   ┌───────┐                         
                                   │ BUILD │                         
                                   └───────┘                         
                                       │                             
                                       ▼                             
┌────────┐                      ┌───────────────────┐        ┌────┐  
│ CLIENT │                      │    SERVER         │        │ DB │  
│        │─────────────────────►│   ┌──────┐        │        │    │  
│        │                      │   │ NEXT ├────────│───────►│    │  
│        │                      │   │      │◄───────│────────┤    │  
│        │                      │   └──────┘        │        │    │  
└────────┘                      │      │            │        │    │  
    ▲  ▲                        │ PAGE EXISTS?      │        └────┘  
    │  │                        │  YES    NO ─────┐ │                
    │  │           ┌──────┐     │   │             │ │                
    │  └───────────┤STATIC│     │   │             │ │                
    │              └──────┘     │ REVALIDATE?     │ │                
    │               ▲ ▲         │  NO    YES      ▼ │                
    │               │ │         │   │    ││  ┌─────┐│                
    │               │ └─────────│───┘    ││  │BUILD││                
    │               └───────────│────────┘│  └─────┘│                
    │                           │         ▼       │ │                
    │                           │     ┌───────┐   │ │                
    │                           │     │REBUILD│   │ │                
    │                           │     └───────┘   │ │                
    │              ┌─────┐      └───────────────────┘                
    └──────────────┤ 404 │◄───────────────────────┘                  
                   └─────┘                                           
```


#### ISR: Fallback

Quando o estático da página ainda não existe, mas é necessário gerar a mesma (existe no banco), então é feito um `BUILD`. Nesse caso, como a página não existe (ainda) e o cliente recebe um estático, o retorno seria o estático de página inexistente (404).

Para lidar com isso é utilizado o recurso de `fallback`, que serve para mostrar um conteúdo alternativo (uma tela de "Carregando..." por exemplo) até que a compilação do estático termine.

Exemplo do fluxo completo:
```
ISR: FALLBACK
                            ┌───────┐                            
                            │ BUILD │                            
                            └───────┘                            
                                │                                
                                ▼                                
┌────────┐               ┌─────────────────────────────┐   ┌────┐
│ CLIENT │               │    SERVER                   │   │ DB │
│        │──────────────►│   ┌───────────────┐         │   │    │
│        │               │   │ NEXT          │ ────────│─► │    │
│        │               │   │               │ ◄───────│───│    │
│        │               │   └───────────────┘         │   │    │
└────────┘               │       │                     │   │    │
 ▲  ▲  ▲                 │     PAGE EXISTS?            │   └────┘
 │  │  │                 │   ┌──YES    NO───┐          │         
 │  │  │    ┌──────┐     │   │              │          │         
 │  │  └────┤STATIC│     │   │              │          │         
 │  │       └──────┘     │ REVALIDATE?    DATA EXISTS? │         
 │  │        ▲  ▲ ▲      │  NO    YES      YES    NO   │         
 │  │        │  │ │      │   │    ││        │      │   │         
 │  │        │  │ └──────│───┘    ││        │      │   │         
 │  │        │  └────────│────────┘│        │      │   │         
 │  │        │           │         ▼        │      │   │         
 │  │        │           │   ┌───────┐  ┌─────┐    │   │         
 │  │        │           │   │REBUILD│  │BUILD│    │   │         
 │  │        │           │   └───────┘  └─────┘    │   │         
 │  │    ┌─► BUILD       │                  │      │   │         
 │  │    │    DONE       │             FALLBACK?   │   │         
 │  │    │               │              YES  NO    │   │         
 │  │   ┌──────────┐     │               │   │     │   │         
 │  └───┤ FALLBACK │◄────│───────────────┘   │     │   │         
 │      └──────────┘     │                   │     │   │         
 │                       └─────────────────────────────┘         
 │                                           │     │             
 │          ┌─────┐                          │     │             
 │          │     │◄─────────────────────────┘     │             
 └──────────┤ 404 │◄───────────────────────────────┘             
            │     │                                              
            └─────┘                                              
```

### Refs:

[ASCIIFlow - criação de desenhos em ASCII](https://asciiflow.com/)

[Jekyll - Gerador de sites baseado em texto](https://jekyllrb.com/)

[Gatsby - Gerador de sites baseado em React](https://www.gatsbyjs.com/)

[Hugo - Gerador de sites baseado em Go](https://gohugo.io/)

[Lista JAMStack - Outros geradores de site](https://jamstack.org/generators/)


## Página Home | ISR: Revalidate

Na página inicial foi aplicado o `revalidate`, que funciona quando a página já existe e os dados passaram por uma atualização, mas a página ainda não reflete essa alteração. Foi definido o tempo de 12 horas (43200ms) para revalidação. 

Então se passar de 12 horas e os dados de `props` em cache forem:

- Iguais aos dados consultados (`GET_PLACES`);
  - Apenas entrega o estático que já estava em cache;
- Diferentes aos dados consultados (`GET_PLACES`);
  - Entrega o estático que já estava em cache pra requisição atual;
  - Em paralelo atualiza o estático com os novos dados pra próxima requisição.


Ou, se não passar de 12 horas:

- Apenas entrega o estático que já estava em cache.


### Refs:

[How to implement ISR (NextJS Docs)](https://nextjs.org/docs/pages/guides/incremental-static-regeneration)

---

## Página Place | ISR: Revalidate

Semelhante ao que foi feito na página inicial, o `revalidate` foi aplicado pra página interna `Place`, que após 12 horas verifica quando a página já existe e os dados em cache são diferentes dos dados do banco, e faz a atualização da página estática quando for o caso.

Quando os dados existem e a página ainda não existe, a página é gerada, mas o retorno pra requisição atual é uma de página inexistente (404), sendo exibida normalmente na requisição seguinte. Para corrigir esse detalhe a seguir é utilizado o Fallback.

---

## Página Place | ISR: Fallback

Para quando a página ainda não existe foi adicionada a configuração de Fallback, que pode retornar uma página em branco ou um loading quando definido.

No método `getStaticPaths` o `fallback` foi setado como `true` no retorno e no componente `Place` o hook `useRouter` é utilizad pra verificar se o fallback está ativo (`router.isFallback`) - se estiver retorna uma página em branco (`null`) enquanto gera a página e direciona pra página nova assim que ela termina de ser gerada.

### Refs:

[How to implement ISR (NextJS Docs)](https://nextjs.org/docs/pages/guides/incremental-static-regeneration)

---

## Página Place | Otimizando build

Para otimizar o build de todas as páginas `Place` internas, a query que busca todos os lugares (`GET_PLACES`) foi atualizada para retornar apenas o primeiro item (`first: 1`).

Assim, quando o projeto for compilado pra produção (com `yarn build`) apenas um local será compilado/pré-renderizado. Os demais locais vão ser gerados via demanda, conforme os usuários requisitarem as páginas.

A tipagem automática do retorno da query (`GetPlaceBySlugQuery`) foi atualizada através do codegen (`yarn codegen`).

---

## Componente Map | Ajustes | Cor de fundo

Para melhorar a visualização do mapa foi necessário trocar o fundo cinza que estava tinha muito contraste em relação ao mapa (era possível perceber isso quando o mapa estava pequeno, ao diminuir o zoom).

No estilo da classe `.leaflet-container` foi adicionada a cor de background padrão (mais escura), o que melhorou a visualização do mapa.

---

## Componente Map | Ajustes | Limite de zoom

Ao diminuir todo o zoom o mapa ficava muito pequeno e as faixas do background apareciam em cima e em baixo.

Para ajustar isso foi definido um zoom mínimo através da propriedade `minZoom` na criação do mapa.

### Refs:

[minZoom (Leaflet DOCs)](https://leafletjs.com/reference.html#map-minzoom)

---

## Componente Map | Ajustes | Limite de scroll

Ao arrastar o mapa para os lados o mesmo mapa aparecia infinitamente, mas sem os pins/markers. E ao arrastar para cima/para baixo ocorria um espaçamento grande pois o mapa só é replicado na horizontal e não na vertical.

Para lidar com isso foi utilizada a prop `maxBounds`, que limita até onde o mapa pode ser arrastado com base na latitude e longitude dos cantos definidos como limite.

Obs: também era possível utilizar a prop `worldCopyJump` para copiar os pins/markers automaticamente ao arrastar o mapa horizontalmente. O problema com essa solução é que o mapa fica "piscando" quando a cópia é feita e o scroll vertical fica infinito.

### Refs:

[maxBounds (Leaflet DOCs)](https://leafletjs.com/reference.html#map-maxbounds)

[worldCopyJump (Leaflet DOCs)](https://leafletjs.com/reference.html#map-worldcopyjump)

---

## Componente Map | Ajustes | Responsividade do mapa

Ao acessar o mapa com o tamanho de tela menor (tablet/celular) o zoom mínimo estava muito perto, o que dificultava a navegação. Foi necessário um ajuste para alterar o zoom atual e o zoom minimo de acordo com o tamanho da tela.

No tutorial foi utilizado o antigo `MapConsumer` do React Leaflet, que internamente utiliza a Context API do React, mas na versão atual a utilização da Context API é feita de uma forma diferente, utilizando hooks.

Para acesso ao contexto foi criado um componente customizado chamado `MapContext` que é definido/chamado dentro do `MapContainer` para funcionar. Por ser um componente também precisa ter um retorno (que foi definido como `null`).

Esse novo componente utiliza o hook `useMap` do React Leaflet para setar o zoom atual e o zoom mínimo de acordo com o tamanho da tela. O valor mínimo do zoom foi armazenado na constante `minZoomDefault` utilizando do hook `useRef` do próprio React.

No método `handleResize` o tamanho de tela é obtido e verificado antes de definir os valores. A chamada do método é feita ao inicializar o componente (hook `useEffect` do React) e ao redimensionar a tela (hook `useMapEvents` do React Leaflet) - dessa forma, o mapa já inicializa com os valores corretos (ao carregar a página pela primeira vez) e também reajusta quando necessário (quando o tamanho de tela é alterado).

### Refs:

[hook useMap (React Leaflet DOCs)](https://react-leaflet.js.org/docs/api-map/#usemap)

[hook useMapEvents (React Leaflet DOCs)](https://react-leaflet.js.org/docs/api-map/#usemapevents)

[Context API (React DOCs)](https://react.dev/reference/react/createContext)

---

## Componente Map | Ajustes | Alteração dos markers/pins

Para modificar os markers/pins padrões foi necessário criar um novo objeto do tipo ícone da lib Leaflet, para isso o próprio Leaflet foi importado (`L`) e o novo ícone foi instânciado (`L.icon`).

O novo ícone instânciado foi passado como prop pro componente `Marker` do React Leaflet.

Neste ponto o novo ícone já aparece no lugar do antigo.

Obs 1: na definição da imagem importada algumas libs podem usar o `require('img/...')`, mas no contexto dessa aplicação o `Next.js` já resolve essas importações sem precisar chamar o `require`.

Obs 2: também é possível definir o marker com base no lugar visitado ou não visitado - bastaria criar um novo campo no CMS e utilizar a nova prop pra essa definição.

### Refs:

[Custom Icons (Leaflet DOCs)](https://leafletjs.com/examples/custom-icons/)

[Marker Props (React Leaflet DOCs)](https://react-leaflet.js.org/docs/api-components/#marker)

---

## Métricas | Configurando o Google Analytics

Para gerar relatórios do site foi utilizado o Google Analytics, que permite medir número de usuários, de onde vieram os acessos, os países que acessaram, etc.

Foi criada uma nova conta no [site principal](https://analytics.google.com/) e configurada uma nova propriedade - que gerou um script do Google tag para ser adicionado ao projeto.

No projeto foi criado um novo componente chamado `Analytics` que serve para guardar o script do Google tag com o código de configuração armazenado nas variáveis de ambiente. Foi criado um novo arquivo chamado `.env.production` (ignorado pelo git).

No componente `Analytics` também foi necessário setar o Javascript do Google Analytics dentro da prop `dangerouslySetInnerHTML` por ser um projeto em Next.

No arquivo `_document.tsx` foi importado o componente `Analytics`. A importação no `_document` garante que a configuração esteja disponível em todas as páginas (já que ele é renderizado apenas no servidor).

Também foi necessário adicionar a variável de ambiente `NEXT_PUBLIC_GA_TRACKING` na configuração da infra online (na Vercel) .

Com a configuração feita e os arquivos no ar foi possível verificar a instalação pelo site Google Analytics.

Obs: o Google Analytics atualmente já analisa vários recursos automaticamente, para recursos mais avançados e configurações mais customizadas de eventos existem outras ferramentas, como o antigo [react-ga](https://github.com/react-ga/react-ga).

### Refs:

[Como configurar o Google Analytics (DOCs)](https://support.google.com/analytics/answer/9304153?hl=pt-br)

[Google Analytics - Página principal](https://analytics.google.com/)

[react-ga](https://github.com/react-ga/react-ga).

---

## Métricas | Configurando o Search Console

Para mais informações de indexação da página foi configurado o Google Search Console (antigo Web Master), que permite o envio de sitemaps, a inspeção de urls específicas, verificar a performance das pesquisas, checar a usabilidade mobile, se a página foi "crawleada", screenshots, possíveis erros, etc.

A configuração foi feita verificando a propriedade através do site principal, que oferece duas opções do tipo de propriedade: por "Domain" (via DNS, mais abrangente, engloba todos subdomínios) e por "URL Prefix" (via código ou DNS, mais específico, pra subdomínios específicos). 

Foi selecionada a opção "URL Prefix" e dentre as opções de verificação da propriedade foi selecionada a verificação via Meta Tag, que foi copiada.

No projeto a meta tag foi colada no arquivo `_app.tsx`.

Com a configuração feita e o arquivo modificado no ar foi possível verificar a instalação pelo site Google Search Console.

### Refs:

[Google Search Console - Site Principal](https://search.google.com/search-console/)

[Search Console - Verificação via Meta Tag](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag)


---

## Indexação | Geração de Site Map estático

O sitemap é um arquivo que melhora/acelera o processo de indexação, aumentando o ranking do site nos buscadores (Google, Bing, etc).

Para facilitar a geração do sitemap foi utilizado um plugin chamado [next-sitemap](https://github.com/iamvishnusankar/next-sitemap), que permite gerar o sitemap de forma estática ou dinâmica e com suporte a TypeScript. Pra esse ponto da aplicação, o sitemap vai ser gerado de forma estática.

### Instalação

Foi instalada como dependência normal (e não de desenvolvimento) pois depois será feita a modificação pra gerar o sitemap dinâmicamente.

```sh
yarn add next-sitemap
```

### Configuração

Foi criado o arquivo `next-sitemap.config.js` na raiz do projeto com as configurações da url principal e se o robots.txt deve ser gerado.

No `package.json` foi adicionada o script `postbuild`, que executa o `next-sitemap` logo após a execução do `build`.

### Geração do Site Map estático

Ao executar o comando `yarn build`, o comando pós build (`next-sitemap`) é executado em seguida, gerando o arquivo `sitemap.xml` e `robots.txt` na pasta `public`.

No XML do sitemap, foi gerado os caminhos (urls) da página home (`/`), da página sobre (`/about`) e apenas uma única página interna de um local (`/place/paraty-rio-janeiro`) devido ao limite definido em `place/[slug].tsx` no método `getStaticPaths`.

### Subindo o Site Map para o Search Console

Com o Site Map gerado, foi possível configurá-lo no [Google Search Console](https://search.google.com/u/3/search-console/sitemaps).

### Refs:

[next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

[Google Search Console - Site Maps](https://search.google.com/u/3/search-console/sitemaps)

---

## Indexação | Geração de Site Map dinâmico

Para geração do Site Map dinâmico as modificações anteriores foram deletadas (xmls da pasta public, configs do next-sitemap).

O `sitemap.xml` é uma página que pode ser acessada como qualquer outra, então isso foi criada a pasta `pages/sitemap.xml` e dentro dela o arquivo `index.tsx`, onde a geração é feita no servidor quando a página é requisitada. Como esta é uma página de pouco acesso, faz sentido gerá-la no servidor.

Para gerar o XML é necessário acessar os dados no lado do servidor a cada requisição via props, e utilizar esses dados pra gerar o XML com a estrutura correta.

As props são obtidas dentro do (antigo) método `getServerSideProps`, que ao ser declarado é reconhecido automaticamente pelo Next e executa a cada requisição. Esse método ocorre em tempo de execução/runtime (SSR).

No método `getServerSideProps` é feita uma requisição via Apollo client para obter os slugs dos lugares (com uma query já existente GET_PLACES), pra composição das URLs dinâmicas e guardar em no array `fields`. Em seguida as URLs estáticas são adicionadas manualmente ao array.

Com as props obtidas, o XML é gerado através do método `getServerSideSitemapLegacy` do `next-sitemap`, retornando o resultado do método `getServerSideProps`.

Com o novo Site Map gerado, foi possível configurá-lo no [Google Search Console](https://search.google.com/u/3/search-console/sitemaps) - melhorando a indexação e o ranking do site nos sites de busca.

Obs 01: para melhorar o código e ter acesso ao IntelliSense, a constante de arrays `field` foi tipada através da interface `ISitemapField[]` do `next-sitemap`.

Obs 02: Na doc do `next-sitemap` mostra como criar o sitemap com o estático e com o dinâmico ao mesmo tempo (com o arquivo de config), o que não foi necessário neste projeto.

### Refs:

[Server Side Props - NextJS Docs](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props)

[Server Side Site Map - next-sitemap Docs](https://github.com/iamvishnusankar/next-sitemap?tab=readme-ov-file#server-side-sitemap-getserversidesitemap)

[Google Search Console - Site Maps](https://search.google.com/u/3/search-console/sitemaps)


---


## Refs adicionais:

[NextJS - Migração do Pages Router pro App Router](https://nextjs.org/docs/pages/guides/migrating/app-router-migration)

[How to GraphQL](https://www.howtographql.com/basics/0-introduction/)

[GraphQL Learn - Schema](https://graphql.org/learn/schema/)

[HyGraph Quickstart](https://hygraph.com/docs/getting-started/fundamentals/quickstart)

[HyGraph - Content Modeling](https://hygraph.com/blog/content-modeling#common-pitfalls-in-content-modeling)
