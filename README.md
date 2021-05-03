# ProjetoFinalBDII

Miniprojeto para a disciplina de Banco de dados II. Consiste em implementar uma rede social para estudantes do IFPB chamada Socify, nela é possível criar posts e pesquisar outros alunos.

# :blue_book: Instruções

<h4>:heavy_check_mark: Instalar dependências em cada uma das pastas</h4>
<p><b>yarn</b> ou <b>npm i</b></p>

<h4>:heavy_check_mark: Criar um arquivo .env e configurar as variáveis do Postgres, Redis e Mongo:</h4>
<p>DB_HOST</p>
<p>DB_NAME</p>
<p>DB_USER</p>
<p>DB_PASSWORD</p>
<p>DB_PORT</p>

<p>TOKEN_SECRET</p>
<p>TOKEN_EXPIRATION</p>

<p>REDIS_HOST</p>
<p>REDIS_PORT</p>

<p>MONGO_HOST</p>
<p>MONGO_PORT</p>
<p>MONGO_DATABASE</p>

<p>PORT</p>


<h4>:heavy_check_mark: Executar os comandos do sequelize para criar e povoar as tabelas:</h4>

--- Executa as migrations para criar a tabela ---
<p><b>yarn sequelize db:migrate</b> ou <b>npx sequelize db:migrate</b></p>

--- Executa as seeds para povoar a tabela ---
<p><b>yarn sequelize db:seed:all</b> ou <b>npx sequelize db:seed:all</b></p>

<h4>:heavy_check_mark: Executar o projeto na pasta frontend</h4>
<p><b>yarn dev</b> ou <b>npm run serve</b></p>

<h4>:heavy_check_mark: Executar o projeto na pasta backend</h4>
<p><b>yarn dev</b> ou <b>npm run dev</b></p>
