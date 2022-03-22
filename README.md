<div align="center"><h1>App Delivery</h1></div>

# Habilidades

Nesse projeto, você deverá ser capaz de:

- Manter aderência do código à especificação. Seu programa deve se comportar como especificado no repositório, no [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) e no [Diagrama de ER](./assets/readme/eer.png);
- Manter a organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);
- Manter aderência ao padrão REST na API;
- Respeitar a estrutura do banco de dados. Sua implementação não deve adicionar ou remover tabelas, campos ou relacionamentos e sua API deve estar preparada para aproveitar essa estrutura por completo;
- Manter uma cobertura de testes. Seu código deve ser testável e possuir uma suíte de testes unitários e/ou de integração robusta e com alta cobertura.
- Implementar a funcionalidade de comunicação em tempo real, utilizando o socket.io.
- Manter aderência aos princípios SOLID;



Para facilitar o entendimento, podemos dividir a aplicação em ** 4 fluxos principais**, **uma validação de status entre cliente e pessoa vendedora** e **cobertura de testes (`front-end` e `back-end`)**:

- **Fluxo Comum** que compreende: 
  - (1) Tela de Login (`01login.test`); 
  - (2) Tela de Registro (`02register.test`).

- **Fluxo do Cliente** que compreende: : 
  - (3) Tela de Produtos (`03customer_products.test`); 
  - (4) Tela de Checkout (`04customer_checkout.test`); 
  - (5) Tela de Pedidos (`05customer_orders.test`); 
  - (6) Tela de Detalhes do Pedido (`06customer_order_details.test`).

- **Fluxo da Pessoa Vendedora** que compreende: 
  - (7) Tela de Pedidos (`07seller_orders.test`); 
  - (8) Tela de Detalhes/Controle do Pedido (`08seller_order_details.test`).

- **Validação do Status do Pedido** que compreende: 
  - (9) Teste de status sem atualização em tempo real (`09customer_seller_status_sync.test`); 
  - (10) Teste de status com atualização em tempo real (`10customer_seller_socket_status_sync.test`).

- **Fluxo da Pessoa Administradora** que compreende: 
  - (11) Tela de gerenciamento de usuários (`11admin_manage_users.test`).

- **Testes da aplicação** que compreende: 
  - (12) Testes de cobertura (`12coverage_tests.test`).


- ⚠️ **IMPORTANTE** ⚠️: A tela de login deve ser capaz de direcionar para a tela principal de cada pessoa usuária, sendo as páginas:
  - Do cliente: `/customer/products`,
  - Da pessoa vendedora:  `/seller/orders`,
  - Da pessoa administradora: `/admin/manage`

## Desenvolvimento

- Para o banco de dados, utilizaremos a biblioteca ORM `Sequelize`, que fará interface com o `MySQL`!
  - Utilize para referência de criação de `migrations` e `seeders` o arquivo `./db.example.sql`;
  - O [Diagrama de ER](./assets/readme/eer.png) também pode ajudar a "visualizar" banco;

- Utilize o o [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) para se guiar na construção do front-end, ele **é comentado com os nomes de cada elemento** *(é necessário ter feito login no `figma` para visualizar)*;

- Para servir arquivos estáticos como imagens no back-end, utilize o seguinte path:`./back-end/public`;
  - Nosso banco de imagens pode ser [baixado aqui](./assets/images.zip);

**⚠️ Lembre-se de escrever testes unitários e sinta-se livre para alterar a UI. Contudo, respeite os atributos `data-testid`, pois eles serão usados na correção do projeto.**

Você pode ler mais sobre os atributos `data-*` [neste link](https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Howto/Use_data_attributes).

**⚠️ Para ver os comentários sobre cada componente ⚠️:** Estando logado, basta clicar no ícone de comentários no Figma (lado esquerdo superior).

![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)

## Antes de começar a desenvolver

1. Clone o repositório

- `git clone git@github.com:tryber/sd-013-c-project-delivery-app.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd sd-013-c-project-delivery-app`
- Vá para a branch do seu grupo, com `git checkout main-group-XX && git pull`, onde `XX` é o número do seu grupo. Exemplos: `main-group-1`, `main-group-22`.

2. Instale as dependências

- Instale as dependências:
  - `npm install`

## Scripts relevantes do `package.json` principal

**São os scripts da raiz do projeto (`./package.json`)** *(e não das aplicações individuais `./front-end/package.json` e `./back-end/package.json`)*:

- `start`: Limpa as portas `3000` e `3001` e simula a inicialização no avaliador. Prepara o campo rodando o `Sequelize` para restaurar o **banco de dados de testes** (final `-test`) e sobe a aplicação com `pm2` em modo `fork` (Uma instância pra cada aplicação). Nesse modo as alterações não são assistidas;
  - *uso (na raiz do projeto): `npm start`*

- `stop`: Para e deleta as aplicações rodando no `pm2`;
  - *uso (na raiz do projeto): `npm stop`*

- `dev`: Limpa as portas `3000` e `3001` e sobe a aplicação com `pm2` em modo `fork` (Uma instância pra cada aplicação), nesse modo, as atualizações são assistidas (modo `watch`);
  - *uso (na raiz do projeto): `npm run dev`*

- `dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (`npm i`) nos dois projetos (`./front-end` e `./back-end`) e roda o `Sequelize` no `./back-end` (lembrar de configurar o `.env` no mesmo);
  - *uso (na raiz do projeto): `npm run dev:prestart`*

- `db:reset`: Rodas os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`), utilize caso ocorra algum problema no seu banco local;
  - *uso (na raiz do projeto): `npm run db:reset`*

- `db:reset:debug`: Rodas os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`), utilize caso ocorra algum problema no seu banco local; Esse comando também é capaz de retornar informações detalhadas de erros (quando ocorrerem no processo);
  - *uso (na raiz do projeto): `npm run db:reset:debug`*

- `test <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de testes** (final `-test`);
  - *uso (na raiz do projeto): `npm test`, `npm test 01login 02register` ou ainda `npm run test 01 02`*

- `test:dev <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`); 
  - *uso (na raiz do projeto): `npm run test:dev`, `npm run test:dev 01login 02register` ou ainda `npm test:dev 01 02`*;

- `test:dev:open <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`), exemplo `npm test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`; Esse teste deve mostrar abrir uma janela mostrando o comportamento das páginas;
  - *uso (na raiz do projeto): `npm run test:dev:open`, `npm run test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`*;

- `test:dev:report "<nomes-dos-arquivos>"`: Roda todos os testes (ou uma parte deles caso `"<nomes-dos-arquivos>"` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`); Esse teste devolve um output em texto com o resultado de todos os testes; Os `logs` são gerados em `./__tests__/reports`.
  - *uso (na raiz do projeto): `npm run test:dev:report`, `npm run test:dev:report "01login 02register"` ou ainda `npm run test:dev:report "01 02"`*;

## Preparando o campo e iniciando o projeto

- ⚠️ **IMPORTANTE** ⚠️: O processo de avaliação completo **é bem demorado** (em torno de 20 minutos), por isso, **é importante que os testes sejam feitos por partes, localmente, antes de serem enviados para o avaliador!** Para isso, utilize os comandos de teste local (`npm run test:dev*`) apresentados em ["Scripts relevantes do `package.json` principal"](#scripts-relevantes-do-packagejson-principal)!
  - Exemplo: Após terminar os requisitos do primeiro arquivo (`01login.test.js`), vc pode utilizar o comando `npm run test:dev 01` ou `npm run test:dev:open 01`(caso queira visualizar) para testar aquela parte do projeto. 
  - Aqui, vocês também tem liberdade para utilizar os comandos `.only` ou `.skip` para validar testes específicos no avaliador local (pasta `./__tests__/end-to-end`), exemplo:
```js script
/*
  ⚠️ **IMPORTANTE** ⚠️: Esse artifício **não deve ser "commitado" com o projeto, sob risco de desqualificação na avaliação**, porém pode ser utilizado para ganhar tempo no teste local.
*/
describe(requirement(1), () => {
  test.only("O avaliador navegará para o endereço do host utilizando o endpoint '/'", async () => { // O `test.only` deve rodar o teste específico do requisito 1 e pular os demais
    // ...
  });
});
```

- ⚠️ **IMPORTANTE** ⚠️: Para testes locais, **é fundamental configurar o arquivo de variáveis de ambiente `.env` (de `environment`) dentro da pasta `./back-end`** (ele é o único `.env` no projeto), conforme exemplo em `.env.example`, na mesma pasta. Esse arquivo servirá de referência para o avaliador e caso não exista, o avaliador vai utilizar valores `default` pro processo (O que pode estourar erro no teste local, caso suas configurações não sejam as mesmas).

- Excepcionalmente nesse projeto, também existe a necessidade de manter e subir no repositório o arquivo `jwt.evaluation.key`, que também deve estar em `./back-end`. Esse arquivo deve conter única e exclusivamente a **chave utilizada para criptografia com JWT**, que também vai ser testado pelo avaliador. Nesse sentido, esse arquivo pode ser lido por sua aplicação na hora de trabalhar com `tokens`.

- ⚠️ **IMPORTANTE** ⚠️: Inicie o projeto pela raiz, utilizando o comando `npm i`;
  - Após isso, é possível fazer a instalação de ambos os aplicativos (back e front) através da raiz do projeto, utilizando o comando `npm run dev:prestart` (esse comando também restaurará o banco de dados, caso o `.env` esteja configurado corretamente).

## Linter

Usaremos o [ESLint](https://eslint.org/) para fazer a análise estática do seu código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-013-c-project-delivery-app/back-end/package.json`
- `sd-013-c-project-delivery-app/front-end/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto de forma individual, ou seja, precisa-se executar esse comando dentro da pasta `back-end` e também na pasta `front-end` e depois `npm run lint` dentro de cada uma dessas pastas, assim você verifica as particularidades individualmente. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Devido ao fato de as configurações das regras do `ESLint` dos projetos de front e back **serem diferentes**, **é preciso executar o `ESLint` em cada projeto**.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
  - **Dica**: Abra separadamente cada pasta do projeto (`back-end` e `front-end` em `VSCode`s separados, para tirar proveito do `ESLint` individual de cada projeto).

Usaremos também o [StyleLint](https://stylelint.io/) para fazer a análise estática do seu código.

**O Stylelint é aplicável _APENAS_ no frontend**

Para poder rodar o `StyleLint` em um projeto basta executar o comando `npm install` dentro do projeto de front-end e depois `npm run lint:styles`. Se a análise do `StyleLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Caso ainda fique alguma dúvida, você pode consultar nosso conteúdo sobre [`ESLint`](https://app.betrybe.com/course/real-life-engineer/eslint)

⚠ **PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO!** ⚠

## Sequelize

⚠️ **IMPORTANTE** ⚠️ : A configuração do sequelize pode ser considerado o **requisito zero** do projeto, dado que a maior parte dos testes depende da estrutura de alguma tabela para realização de testes, **por tanto, deve ser feita por primeiro**.

⚠️ **IMPORTANTE** ⚠️ : Antes de iniciar o projeto, garanta que o Sequelize rode corretamente no `./back-end` (pela raiz do projeto, o comando `npm run db:reset` será de grande ajuda, pois serve para restaurar o banco de dados `-dev`). O avaliador irá executar funções do sequelize para garantir a estrutura do banco de dados.

O projeto já provê uma estrutura inicializada do ORM (em `./back-end/src/database`); Aqui, é necessário que você desenvolva as **migrations** e **seeders** corretamente, seguindo o modelo em `./db.example.sql` (esse arquivo serve como referência, e não tem qualquer influência sobre a aplicação ou avaliação).

⚠️ **IMPORTANTE** ⚠️ : O avaliador usará valores `default` no arquivo `./back-end/src/database/config/config.js` que já vem no projeto caso nada seja definido. Por tanto, tome cuidado na hora de fazer qualquer alteração nesse arquivo, pois é através dele que o avaliador utilizará as referências do banco de dados correto para cada situação (desenvolvimento e testes).

Esse projeto fornece por padrão o arquivo `.sequelizerc` em `.back-end` para configurações do padrão de pastas no Sequelize.

**Opcionalmente no desenvolvimento local**, você pode alterar o valor `EVAL_ALWAYS_RESTORE_DEV_DB` do arquivo `.env` em `./back-end` para `false`, o que persistirá os dados dos testes locais durante os mesmos.

**Essa opção pode gerar implicações para a performance e confiabilidade do teste local**, já que o avaliador pode se comportar mal caso haja uma quantidade grande de registros para avaliar. Caso ocorra algum problema, utilize o comando `npm run db:reset` ou `npm run db:reset:debug` (para encontrar erros) pela raiz do projeto para restaurar o banco, ou altere de volta a opção `EVAL_ALWAYS_RESTORE_DEV_DB` para `true`.

## Componentização

O nosso [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=977%3A391) possui um conjunto de **componentes base**. Isso é proposital e sugere que é fundamental que vocês componentizem o front-end de maneira que seja possível fazer o maior reaproveitamento possível de cada estrutura. 

É bom lembrar que um front-end em React com pouca componentização **gera muita manutenção no tempo e atrasa a entrega**. *Aqui, é aconselhável pensar utilizando um [modelo atômico](https://brasil.uxdesign.cc/atomic-design-redesenhando-os-entreg%C3%A1veis-de-designers-e-desenvolvedores-da8886c7258d) de desenvolvimento.*

## Data-testids
O data-testid de cada elemento que será usado na avaliação do projeto está no arquivo [data-testids.md](data-testids.md) na raiz do projeto. Cada um desse elementos tem no [protótipo do figma](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=977%3A391) um número, e nesse arquivo, o `data-testid` que deve ser atribuido ao valor de tal. 

