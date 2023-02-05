# 📑 Projeto Blogs Api!

Explicar o projeto...

## Como utilizar:

Clone o repositório: `git clone ...`.

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

## Rotas:

O projeto está rodando na porta `3000`. Seguem as rotas que podem ser acessadas:

 - listar rotas

## Tecnologias utilizadas:

  - listar tecnologias


