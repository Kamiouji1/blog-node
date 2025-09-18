# Blog App

Um aplicativo de blog simples e elegante construído com Node.js, Express, e EJS. Este projeto oferece um sistema de postagem de blog básico com visualização de posts e detalhes do autor.


## ✨ Features (Funcionalidades)

Visualização de Posts: Exibe os 10 posts mais recentes na página inicial.

Detalhes do Post: Exibe um post individual com todos os seus detalhes.

Dados do Usuário: Associa posts a usuários, exibindo o nome do autor em cada post.

Formato de Data: Formata a data de criação do post para um formato legível (DD de MMMM de YYYY às HH:mm).



## 🛠️ Tecnologias Utilizadas

Node.js: Ambiente de execução JavaScript.

Express: Framework web para Node.js.

Sequelize: ORM para Node.js.

MySQL (ou outro banco de dados que você usou): Banco de dados relacional.

EJS: Motor de template.

Moment.js: Biblioteca para manipulação de datas.



## 💻 Como Executar o Projeto

Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados.

1. Clonar o Repositório
Bash

git clone https://github.com/seu-usuario/blog-node.git

2. Instalar as Dependências
Navegue até o diretório do projeto e instale as dependências.

Bash

cd blog-node
npm install

3. Configurar o Banco de Dados
Crie um arquivo .env na raiz do projeto e adicione as configurações do seu banco de dados.

DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql

4. Rodar as Migrações
Execute as migrações para criar as tabelas no seu banco de dados.

Bash

npx sequelize-cli db:migrate

5. **Executar o Servidor**
   Inicie o servidor localmente.

Bash

npm start
O aplicativo estará disponível em http://localhost:3000.

.
├── config
│   └── config.json
├── db
│   ├── config
│   ├── migrations
│   ├── models
│   │   ├── index.js
│   │   ├── post.js
│   │   └── usuario.js
│   └── seeders
├── middleware
│   ├── autenticacao.mid.js
│   └── log.mid.js
├── rotas
│   ├── index.js
│   ├── posts.rota.js
│   └── usuario.rot.js
├── utils
│   ├── ErrorHandler.js
│   ├── logger.js
│   └── index.js
├── views
│   ├── layouts
│   │   └── layout-blog.ejs
│   └── pages
│       └── posts.ejs
├── app.js
├── package.json
└── README.md

## 📧 Contato


Edmo Gibson - https://github.com/Kamiouji1

Email - edmogc@gmail.com

* **Fique à vontade para entrar em contato!**
