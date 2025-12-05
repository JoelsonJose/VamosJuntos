# VamosJuntos - Plataforma de Caronas Corporativas
> Um projeto de plataforma de caronas corporativas seguras entre colaboradores. Menos carros, mais conexões.

![Capa do Projeto](https://github.com/user-attachments/assets/12700519-00d9-4939-b5ed-3330a80a2f23)

Este é o repositório oficial do projeto "VamosJuntos", uma aplicação web moderna construída com React, focada em conectar colegas de trabalho para otimizar o transporte e fortalecer conexões.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Execução em Desenvolvimento](#execução-em-desenvolvimento)
- [Build para Produção](#build-para-produção)
- [Implantação (Deploy)](#implantação-deploy)
- [Testes](#testes)
- [Solução de Problemas](#solução-de-problemas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Sobre o Projeto

**VamosJuntos** é uma aplicação web moderna que conecta colaboradores de uma empresa para compartilhamento de caronas, promovendo:

-  Redução de custos com transporte
-  Diminuição da emissão de carbono
-  Fortalecimento de conexões entre colegas
-  Otimização de tempo e recursos

### Funcionalidades Principais

- Cadastro e busca de rotas de carona
- Sistema de avaliações de motoristas
- Gerenciamento de vagas disponíveis
- Agendamento de caronas
- Filtros por origem, destino, horário e dias da semana
- Interface responsiva e animações suaves

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

### Frontend
- **[React.js](https://react.dev/)** v19.2.0 - Biblioteca JavaScript para construção de interfaces
- **[React Router DOM](https://reactrouter.com/)** v7.9.4 - Roteamento e navegação SPA
- **[Framer Motion](https://www.framer.com/motion/)** - Animações e transições (se instalado)
- **CSS3** - Estilização moderna e responsiva

### Ferramentas de Desenvolvimento
- **[Create React App](https://create-react-app.dev/)** - Bootstrap do projeto React
- **[React Scripts](https://www.npmjs.com/package/react-scripts)** v5.0.1 - Scripts de build e desenvolvimento
- **[React Testing Library](https://testing-library.com/react)** - Testes de componentes
- **[Web Vitals](https://web.dev/vitals/)** - Métricas de performance

### Controle de Versão
- **[Git](https://git-scm.com/)** - Versionamento de código
- **[GitHub](https://github.com/)** - Hospedagem do repositório

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

### Obrigatórios
- **Node.js** versão 16.x ou superior ([Download](https://nodejs.org/))
- **npm** versão 8.x ou superior (instalado automaticamente com Node.js)
- **Git** ([Download](https://git-scm.com/))

### Recomendados
- **Visual Studio Code** ou editor de código de sua preferência
- **Extensões VS Code úteis:**
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets

### Verificando as Instalações

Execute os seguintes comandos no terminal para verificar se tudo está instalado corretamente:

```bash
# Verificar versão do Node.js
node --version
# Deve retornar: v16.x.x ou superior

# Verificar versão do npm
npm --version
# Deve retornar: 8.x.x ou superior

# Verificar instalação do Git
git --version
# Deve retornar: git version 2.x.x ou superior
```

---

## Instalação e Configuração

Siga este guia passo a passo para configurar o projeto em um novo ambiente do zero.

### Passo 1: Clone o Repositório

Abra o terminal e clone o projeto:

```bash
git clone https://github.com/JoelsonJose/VamosJuntos.git
```

### Passo 2: Acesse o Diretório do Projeto

```bash
cd VamosJuntos
```

### Passo 3: Instale as Dependências

Execute o comando para instalar todas as dependências necessárias:

```bash
npm install
```

**O que este comando faz:**
- Lê o arquivo `package.json`
- Baixa todas as bibliotecas e dependências listadas
- Cria a pasta `node_modules` com todos os pacotes
- Gera/atualiza o arquivo `package-lock.json`

**Tempo estimado:** 2-5 minutos (dependendo da velocidade da internet)


---

## Estrutura do Projeto

Entenda a organização dos arquivos e pastas:

```
VamosJuntos/
├── public/              # Arquivos públicos estáticos
│   ├── index.html       # Template HTML principal
│   ├── favicon.ico      # Ícone da aplicação
│   └── manifest.json    # Configurações PWA
│
├── src/                 # Código fonte da aplicação
│   ├── components/      # Componentes React reutilizáveis
│   ├── pages/          # Páginas/Views da aplicação
│   ├── styles/         # Arquivos CSS/SCSS
│   ├── utils/          # Funções utilitárias
│   ├── hooks/          # Custom React Hooks
│   ├── App.js          # Componente raiz da aplicação
│   ├── index.js        # Ponto de entrada da aplicação
│   └── App.css         # Estilos globais
│
├── .gitignore          # Arquivos ignorados pelo Git
├── LICENSE             # Licença MIT do projeto
└── README.md           # Este arquivo
```

---

## Execução em Desenvolvimento

### Iniciar o Servidor de Desenvolvimento

Execute o comando:

```bash
npm start
```

**O que acontece:**
- O Create React App inicia um servidor de desenvolvimento
- A aplicação é compilada automaticamente
- Seu navegador abre em `http://localhost:3000`
- Hot reload está ativado (mudanças aparecem automaticamente)

### Acessar a Aplicação

Abra seu navegador em:
```
http://localhost:3000
```

### Parar o Servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.

---

## 🏗️ Build para Produção

### Criar Build Otimizado

Para criar uma versão otimizada para produção:

```bash
npm run build
```

**O que este comando faz:**
- Compila todo o código React
- Minifica JavaScript, CSS e HTML
- Otimiza assets e imagens
- Gera arquivos estáticos na pasta `build/`
- Remove código de desenvolvimento
- Aplica tree-shaking (remove código não utilizado)

**Resultado:** A pasta `build/` conterá todos os arquivos prontos para deploy.

### Testar o Build Localmente

Para testar o build de produção localmente:

```bash
# Instale o serve globalmente (apenas uma vez)
npm install -g serve

# Sirva a pasta build
serve -s build
```

Acesse `http://localhost:3000` para ver a versão de produção.

---

## Implantação (Deploy)

### Hospedagem

#### **Vercel**

**Configuração via CLI:**

```bash
# Instale a Vercel CLI
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel
```

**Configuração via GitHub:**

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Import Project"
4. Selecione o repositório VamosJuntos
5. Configure:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Clique em "Deploy"

**Resultado:**  a aplicação estará disponível em `https://vamosjuntos.vercel.app

---

## Testes

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes com coverage
npm test -- --coverage

# Rodar testes em modo watch
npm test -- --watch
```

### Estrutura de Testes

```
src/
├── components/
│   ├── Button.js
│   └── Button.test.js    # Teste do componente
```

### Exemplo de Teste

```javascript
// Button.test.js
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});
```

---

## Solução de Problemas

### Problema: Porta 3000 já está em uso

**Solução:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Ou use outra porta
PORT=3001 npm start
```

### Problema: Erro ao instalar dependências

**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale
npm install
```

### Problema: Erro "Module not found"

**Solução:**
```bash
# Verifique se a dependência está instalada
npm list nome-do-pacote

# Se não estiver, instale
npm install nome-do-pacote

# Reinicie o servidor
npm start
```

### Problema: Build falha

**Solução:**
```bash
# Verifique erros de lint
npm run lint

# Aumente memória do Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Problema: Página em branco após deploy

**Solução:**
1. Verifique o caminho do `homepage` no `package.json`
2. Certifique-se de que o servidor está configurado para SPAs
3. Verifique o console do navegador para erros

---

## Recursos Adicionais

### Documentação Oficial
- [React Documentation](https://react.dev/)
- [Create React App Docs](https://create-react-app.dev/)
- [React Router Documentation](https://reactrouter.com/)

### Tutoriais Recomendados
- [React Tutorial for Beginners](https://react.dev/learn)
- [Deploying React Apps](https://create-react-app.dev/docs/deployment)

### Comunidade
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/reactjs)
- [Reddit - r/reactjs](https://reddit.com/r/reactjs)

---

## Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. **Fork o projeto**
2. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```
3. **Commit suas mudanças:**
   ```bash
   git commit -m 'Add: Nova funcionalidade X'
   ```
4. **Push para a branch:**
   ```bash
   git push origin feature/MinhaNovaFeature
   ```
5. **Abra um Pull Request**

### Padrões de Commit
- `Add:` Nova funcionalidade
- `Fix:` Correção de bug
- `Update:` Atualização de código
- `Docs:` Mudanças na documentação
- `Style:` Formatação de código
- `Refactor:` Refatoração de código

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

**MIT License** - você pode usar, copiar, modificar e distribuir este software livremente.

---

## Squad 33:

**Joelson José**

- GitHub: [@JoelsonJose](https://github.com/JoelsonJose)
			[@Homeroflavio](https://github.com/Homeroflavio)
			[@Wendell8708](https://github.com/Wendell8708)
			[@WNicolas Tavares](https://github.com/Otoque)
			[@IsackOtavio](https://github.com/IsackOtavio)
			[@ppmalta](https://github.com/ppmalta)
			
			
- Projeto: [VamosJuntos](https://github.com/JoelsonJose/VamosJuntos)

---

## ⭐ Suporte

Se este projeto foi útil, considere dar uma ⭐ no repositório!

Para dúvidas ou suporte:
- Abra uma [Issue](https://github.com/JoelsonJose/VamosJuntos/issues)
- Entre em contato através do GitHub

---

## Changelog

### [1.0.0] - 2025-01-XX
- ✅ Lançamento inicial
- ✅ Sistema de rotas e caronas
- ✅ Interface responsiva
- ✅ Sistema de avaliações

