# 💰 dt money — App de Controle Financeiro

> Projeto de faculdade desenvolvido para a matéria de **Sistemas Móveis**.

## 🎓 Identificação

- **Aluno:** Mateus Vitor Silva Andrade
- **Matéria:** Sistemas Móveis
- **Faculdade:** Unileste

## 📱 Sobre o projeto

O **dt money** é um aplicativo mobile de controle financeiro pessoal. Com ele o
usuário consegue acompanhar suas finanças cadastrando **entradas** (receitas) e
**saídas** (despesas) e visualizando o resumo do seu saldo.

Principais funcionalidades:

- Cadastro e login de usuário
- Listagem das transações
- Cadastro, edição e exclusão de transações
- Cards de resumo (entradas, saídas e total)
- Busca de transações por texto
- Scroll infinito (carrega mais transações conforme o usuário rola a lista)

O aplicativo foi construído passo a passo seguindo o material da disciplina, onde cada etapa adiciona uma parte do app.

## 📂 Estrutura das pastas

```
trabalhoSM/
├── dt-money-app/                   # Aplicativo mobile (React Native + Expo) — entregável
├── dt-money-react-native-backend/  # API (backend) que fornece os dados para o app
└── tarefa*.md                      # Material/roteiro da disciplina
```

- **dt-money-app** → é o aplicativo em si, feito durante a matéria.
- **dt-money-react-native-backend** → é a API que o app consome (login, transações e categorias).

## 🛠️ Tecnologias

**App (dt-money-app):**

- React Native + Expo
- TypeScript
- NativeWind (Tailwind CSS)
- Context API
- React Navigation

**Backend:**

- Node.js
- Fastify

## ▶️ Como rodar

> É necessário ter o **Node.js** instalado e um **emulador Android** (ou um
> celular com o app do Expo).

**1. Subir o backend (API):**

```bash
cd dt-money-react-native-backend
npm install
npm run dev
```

A API fica disponível em `http://localhost:3001`.

**2. Rodar o aplicativo:**

```bash
cd dt-money-app
npm install
npx expo run:android
```

Com o backend ligado e o emulador aberto, o aplicativo abre na tela de login.

---


