# Skrämmande Häuse

A Skrämmande Häuse é uma casa onde os limites entre o vivo
e o inanimado deixam de existir. Nesta galeria de arte, as obras
transcendem o tempo, as eras e o próprio espaço. Pinturas criadas há mais
de um século desafiam a passagem dos anos e chegam diretamente à sua tela.
Aprecie sua jornada enquanto percorre cada ambiente e descubra o mundo pela
visão daqueles que já partiram.

## Tecnologias utilizadas
- **Frontend**: HTML + CSS Nesting + JS
- **Backend**: JS + Node.js + Mysql2 + Express
- **Banco de Dados**: MySql

## Execução do Projeto
### 1. Instalações iniciais:
- Instalar **Node.js**
- Instalar o **MySQL Server** 
    -**Microsoft Visual C++** é pré requisito para o server.
- Reiniciar o dispositivo.

### 2. Extensões do VS Code

- **MySQL**: Facilitar conexão e manipulação do Banco de Dados MySql.
- **Live Server**: Preparar servidor local para exibição do Frontend através do navegador padrão.
- **Material Icon Theme**: Estilizar estrutura de pastas e arquivos do projeto.
- **Postman**: Realizar testes de integração.
- **Prettier**: Formatação automática do código.

### 3. Configurações do Backend
- Instalar as dependências do projeto. Com o cursor na pasta **/backend** executar o seguinte comando no terminal do **PowerShell**:

```powershell
npm install
```
- /backend/package.json dependencies:
```json
"bcrypt": "^6.0.0",
"cors": "^2.8.6",
"express": "^5.2.1",
"fs": "^0.0.1-security",
"jsonwebtoken": "^9.0.3",
"multer": "^2.2.0",
"mysql2": "^3.23.2"
```

- Criar o arquivo **dev.env** na raiz da pasta **/backend** e adicionar os dados:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=0000
DB_NAME=gallery

JWT_SECRET=
JWT_EXPIRE=24h
```
***Dados suscetíveis à mudanças em casos de configuração de banco especificada**

- Gere ou crie um código para ser a chave criptográfica dos seus tokens **JWT**.

### 4. Configurações do frontend

- Instalar as dependências do projeto. Com o cursor na pasta **/frontend** executar o seguinte comando no terminal do **PowerShell**:

```powershell
npm install
```
- /frontend/package.json dependencies:
```json
"dotenv": "^17.4.2",
"express": "^5.2.1"
```

## Execução do Sistema
- Ativar conexão com o banco de dados no topo do arquivo **./backend/sql/gallery.sql** e executá-lo para criação completa do Banco de Dados.

- Posicionar o cursos na pasta **/backend** e executar o comando configurado no arquivo package.json para acionar o backend

```powershell
npm start
```
- Clicar na url gerada no terminal para acessar a página

## API de Imagens
API Rest desevolvida em Node.js e Express para gerenciamento, processamento e armazenamento permanente de imagens.

### URL
```http
http://localhost:3000
```
---

## Endpoints

### Upload de Imagens
---
Armazena um arquivo *mimetype*: ***/image** na pasta **/tmp** e o insere na tabela **images** com o id do usuário responsável pelo upload.

### Requisição
```http
POST http://localhost:3000/upload
```
```json
{
    "key": "image",
    "value":""
}
```
***Selecione um arquivo do tipo imagem e preencha o campo *value***
### Authorization 
- **Type**: Bearer Token
- **Token**:
```bash
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTc4NjA2MTQ4MCwiZXhwIjoxNzg2MTQ3ODgwfQ.pvO7N5Fc_MNL8VqknyhwsU_Dh8rf_izLYUBLMBYKjFDju-Mycfs_VzAd5VOHHnq0P0FoqykKdQ_8vjGwwbNxRw
```

### Resposta
```json
{
    "success":true,
    "message":"Imagem enviada com sucesso.",
    "file":"20260807001601719.png",
    "url":"http://localhost:3000/20260807001601719.png"
}
```

### Listar Imagens
---
Lista todas as imagens cadastradas na pasta **/tmp**.

### Requisição
```http
GET http://localhost:3000/upload
```
### Resposta
```json
{
    "success":true,
    "images":["http://localhost:3000/20260807001601719.png"]
}
```

### Cadastro de Usuário
---
Cadastra o usuário no banco e faz o login automático gerando seu token de acesso.

### Requisição
```http
POST http://localhost:3000/login/register
Content-type: application/json
```
```json
{
    "email": "teste2@gmail.com",
    "password": "teste123"
}
```
### Resposta
```json
{
    "success":true,
    "message":"Usuário cadastrado.","token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RlMkBnbWFpbC5jb20iLCJpYXQiOjE3ODYwNjIwODMsImV4cCI6MTc4NjE0ODQ4M30.7-z6SofKCWUFMMGYEJ3eWBLVK5dqTwJWJvZtde9iWk6XxoGAIkJGIqRV0nD3NYLdIU7xLxBE1BcFnLd1LCQYBA"
}
```

### Login de Usuário
---
Loga o usuário em sua conta e gera seu token de acesso.

### Requisição
```http
POST http://localhost:3000/login
Content-type: application/json
```
```json
{
    "email": "teste@gmail.com",
    "password": "teste123"
}
```
### Resposta
```json
{
    "success":true,
    "message":"Login realizado com sucesso.","token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTc4NjA2MTQ4MCwiZXhwIjoxNzg2MTQ3ODgwfQ.pvO7N5Fc_MNL8VqknyhwsU_Dh8rf_izLYUBLMBYKjFDju-Mycfs_VzAd5VOHHnq0P0FoqykKdQ_8vjGwwbNxRw"
}
```

## Banco de Dados
### Users
| Campo | Tipo | Descrição|
|-------|------|----------|
| id | integer | Identificador do Usuário |
| email | string | Email do Usuário | 
| passsword | string | Senha do Usuário |

---

### Images
| Campo | Tipo | Descrição|
|-------|------|----------|
| id | integer | Identificador da Imagem |
| name | string | Nome da Imagem |
| url | string | URL da Imagem |
| id_user | integer | FK do Usuário |

---

### Checklist
- Instalar e criar coleções com o POSTMAN APP
- Documentação
- Classificação das galeria
  
- Consumir as rotas do backend e adicionar token ao localstorage
- Modificar upload para verificar token do localstorage
- Criar slider para o login/cadastro
- Reescrever as interações com tabelas em orientação a objetos.


### Projeto teste

- Assim que chegar o projeto teste, lê-lo todo imediatamente
- Traçar estratégias de execução
- Elaborar perguntas e marcar reunião remota com o Hiago 