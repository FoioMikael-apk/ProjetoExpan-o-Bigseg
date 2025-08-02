# 🚀 ProjetoExpansão‑Bigseg

Sistema de integração e automação de processos da empresa **Bigseg**, com foco em **gerenciamento interno, automação de relatórios, consulta de dados via API** e manipulação de arquivos `.xls` e `.csv`.

---

## 📦 Tecnologias Utilizadas

- **Node.js** + **Express** – Servidor principal da API
- **Python** – Scripts para processamento e extração de dados
- **Puppeteer** – Automatização de login e scraping web
- **xlsx** – Manipulação de planilhas
- **Multer** – Upload de arquivos
- **Cors**, **Dotenv**, **Axios**, etc.

---

## 🔧 Funcionalidades

- 📄 Upload de arquivos `.xls` e `.csv`
- 📊 Leitura e conversão de planilhas
- 🔍 Extração automatizada de dados de sistemas web
- 🔐 Roteamento seguro com middleware de autenticação
- 📥 API para consultas externas a partir de planilhas internas
- ⚙️ Processamento de dados via Python (`bigseg.py`, `padrao.py`, etc.)

---

## 📁 Estrutura do Projeto

```
ProjetoExpansao-Bigseg/
├── api/                # API em Node.js
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── services/
├── python/             # Scripts auxiliares em Python
├── uploads/            # Arquivos recebidos
├── .env                # Variáveis de ambiente
├── app.js              # Inicialização do servidor
└── package.json
```

---

## ⚙️ Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/FoioMikael-apk/ProjetoExpan-o-Bigseg.git
cd ProjetoExpan-o-Bigseg
```

### 2. Instale as dependências

```bash
yarn install
```

> Recomendado: Crie um arquivo `.env` na raiz com as variáveis:
```
PORT=5000
```

### 3. Inicie o servidor

```bash
yarn dev
```

Acesse: `http://localhost:5000`

---

## 🐍 Executar os scripts Python

Algumas funcionalidades dependem de scripts Python:

```bash
cd python/
python bigseg.py
python padrao.py
```

> Certifique-se de ter o Python instalado e as bibliotecas necessárias (`pandas`, `openpyxl`, etc.)

---

## 🛠 Exemplos de uso da API

### Upload de Planilha

```
POST /api/upload
FormData: file (.xls)
```

### Consulta de dados (exemplo)

```
GET /api/consulta/{matricula}
```

---

## ✅ TODO

- [x] Upload de arquivos com validação
- [x] Integração com scripts Python
- [x] Rotas protegidas
- [ ] Dashboard visual (em construção)
- [ ] Documentação Swagger/OpenAPI

---

## 📃 Licença

MIT © 2025 [FoioMikael](https://github.com/FoioMikael-apk)

---

## 🙋‍♂️ Autor

Desenvolvido por **Mikael Alejandro**  
[🔗 GitHub](https://github.com/FoioMikael-apk)



<img src="https://github.com/user-attachments/assets/f9592d04-c9b7-44d1-b918-de4da4df8254" width="300" />
<img src="https://github.com/user-attachments/assets/667b553c-00e0-459a-9ae7-7b3ba9c242ce" width="300" />
<img src="https://github.com/user-attachments/assets/946c6fd6-5ca7-4d39-8a03-a179c32b39a2" width="300" />
<img src="https://github.com/user-attachments/assets/8052fb63-f874-41a2-bcf4-911b5bec1986" width="300" />
<img src="https://github.com/user-attachments/assets/eda87a32-f176-45d0-86c9-709333fe6206" width="300" />
<img src="https://github.com/user-attachments/assets/27664c01-6c0d-42b6-b977-419564418aea" width="300" />
<img src="https://github.com/user-attachments/assets/099729ef-3212-4c19-b13a-8e85b09abebf" width="300" />
<img src="https://github.com/user-attachments/assets/cbbc4381-4b2a-4cf1-8e25-9d85252e8040" width="300" />
<img src="https://github.com/user-attachments/assets/ed82a0bd-b723-46f3-82dd-287373e31f11" width="300" />
<img src="https://github.com/user-attachments/assets/13fcd4d1-27c5-49f2-bb6a-4808873d3f59" width="300" />
<img src="https://github.com/user-attachments/assets/1bf00aa5-8969-4efe-8fd9-483159088bf8" width="300" />
<img src="https://github.com/user-attachments/assets/b29a5a20-576a-4c8e-aeea-d4d7dbc0ed7e" width="300" />


