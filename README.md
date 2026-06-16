# Portfolio Web React + Tailwind

Portfolio moderno, responsivo e interativo criado com Vite, React e Tailwind CSS.

## Como rodar

```bash
npm install
npm run dev
```

Depois acesse o endereço mostrado pelo Vite, normalmente `http://127.0.0.1:5173`.

## Onde personalizar

- Dados pessoais: edite o objeto `profile` em `src/App.jsx`.
- Textos do efeito typing: edite o array `roles` em `src/App.jsx`.
- Habilidades: edite o array `skills` em `src/App.jsx`.
- Projetos: edite o array `projects` em `src/App.jsx`.
- Cores, sombras e animações: edite `tailwind.config.js` e `src/index.css`.

## Alternância de tema

A lógica de tema está no hook `useTheme`, dentro de `src/App.jsx`.

Ele:

- lê a preferência salva em `localStorage`;
- usa `prefers-color-scheme` como fallback;
- aplica ou remove a classe `dark` no elemento `<html>`;
- persiste a escolha em `localStorage`.

O Tailwind está configurado com `darkMode: 'class'` em `tailwind.config.js`, por isso as classes `dark:*` respondem imediatamente ao botão de tema.

## Animações e interatividade

- O efeito de digitação fica no hook `useTyping`, em `src/App.jsx`.
- As animações de entrada ao rolar a página ficam no hook `useScrollReveal`, usando `IntersectionObserver`.
- Os estilos base dessas animações ficam em `src/index.css`, nas classes `.reveal` e `.reveal.is-visible`.
- Os cards usam transições Tailwind com `hover:-translate-y-1`, bordas dinâmicas e sombra customizada `shadow-glow`.

## Contato

A seção de contato mostra cards clicáveis para email, GitHub e LinkedIn. Os dados vêm do objeto `profile`, em `src/App.jsx`.

O link de LinkedIn só aparece quando `profile.linkedin` for substituído por uma URL real, evitando deixar link placeholder no portfólio publicado.
