# 📑 Projeto Blogs Api!

Nesse projeto foi desenvolvida uma API REST e um banco de dados para produção de conteúdo para um blog.

Foram implementados endpoints que realizam um CRUD de postagens no blog. </br>
No entando, somente usuários logados e autenticados podem realizar alterações. Para isso, existem os endpoints para criação e realização de login.

Toda a estrutura do projeto foi criada e organizada seguindo a Arquitetura em Camadas MSC (Model, Service e Controller).

O desenvolvimento desse projeto foi realizado durante o curso de Desenvolvimento Web na [Trybe](https://www.betrybe.com/)!

## Como utilizar:

Clone o repositório: `git clone git@github.com:fa-biano/blogs-api.git`.

<details>
  <summary><strong>Rodando com Docker :whale: ou Localmente</strong></summary>
  
  ## 👉 Com Docker
   **⚠ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
   
   > Rode o serviço `node` com o comando `docker-compose up -d --build`.
  - Esse serviço irá inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
  
   > :information_source: Use o comando `docker exec -it car_shop bash`.
   
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **⚠ Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - ✨ **Dica:** O projeto espera que a versão do `node` utilizada seja a 16.

  <br>  
</details>

## Inicializando:
  > :information_source: Após seguir os passos de como rodar o projeto citados acima

  Renomeie o arquivo `.env.example` para `.env`.
  
  Instale as dependências `npm install`

  Suba os containers do docker compose `docker compose up -d --build`

  Acesse o container `node` que está rodando em segundo plano `docker exec -it blogs_api bash`

  Dentro do container: 
  - Instale as dependências `npm install`

  - Crie o banco de dados e suas tabelas: `npm run prestart`

  - Insira os dados iniciais nas tabelas: `npm run seed`

  - Inicie o servidor: `npm start`

## :mailbox_with_no_mail: Rotas:

O projeto está rodando na porta `3000`. Seguem as rotas que podem ser acessadas:

  `/user`: </br>
    - POST: cria novo usuário; </br>
    - GET: lista os usuários cadastrados; </br>
    - GET: `/user/:id` traz as informações do usuário conforme id; </br>
    - DELETE: `/user/me` exclui o cadastro do usuário logado;

  `/login`: </br>
    - POST: realiza login para usuário existente;

  `/categories`: </br>
    - GET: lista as categorias de post disponíveis; </br>
    - POST: cria nova categoria para os posts;
    
  `/post`: </br>
    - POST: cria novo post para o blog; </br>
    - GET: lista todos os posts; </br>
    - GET: `/post/:id` traz as informações do post conforme id; </br>
    - GET: `/post/search` lista todos os posts que contenha a palavra pesquisada (request query); </br>
    - PUT: `/post/:id` atualiza as informações do post conforme id; </br>
    - DELETE: `/post/:id` deleta as informações do post conforme id; </br>

Utilize o seu client preferido para testar as rotas acima.

## :fire: Tecnologias utilizadas:

  **Back-end:** Node.js, Express, Sequelize (ORM) e JWT (jsonwebtoken) para Autenticação </br>
  **Banco de Dados:** SQL MySQL </br>
  **Arquitetura:** MSC (Model, Service, Controller)
