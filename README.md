# SME-SIGLA-LOCUS-Frontend

Frontend do sistema **LOCUS** — gestão da distribuição de professores e módulos
das unidades educacionais da Rede Municipal de Ensino de São Paulo.

## Stack

React 19 · Vite · TypeScript · Ant Design (layout/UI) · React Query · Axios ·
Zod · Jest + Testing Library · ícones do `@mui/icons-material`.

## Comandos

```bash
npm install       # instala dependências
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # typecheck + build de produção
npm run lint      # ESLint
npm test          # testes (Jest)
npm run coverage  # testes com cobertura
```

Copie `.env.sample` para `.env` e ajuste `VITE_LOCUS_API_URL`.

## Estrutura de pastas

```
src/
├── app/            # bootstrap: main.tsx, App.tsx, providers.tsx
├── estilos/        # tokens, tema do antd, CSS global
│   ├── tokens/
│   ├── temas/
│   └── global/
├── componentes/    # componentes comuns e reutilizáveis
│   ├── layout/     # LayoutBase, MenuLateral, Cabecalho, Rodape
│   └── ui/         # CartaoStat, ChipVagas, CabecalhoPagina
├── paginas/        # cada tela concentra o que é dela
│   └── GestaoUnidadesEducacionais/
│       ├── index.tsx
│       ├── componentes/   # só desta página
│       ├── dados/          # dados estáticos (protótipo)
│       └── hooks/          # useGestaoUnidades
├── rotas/          # todas as rotas em um lugar (+ caminhos.ts)
├── servicos/       # http.ts (axios + interceptors) e recursos/ por domínio
│   └── recursos/
│       ├── autenticacao/
│       └── unidadesEducacionais/
└── hooks/          # hooks compartilhados (useUsuarioLogado)
```

Fluxo típico: **Rota → Página → Hook da página → Serviço HTTP → API**, com a UI
comum vindo de `componentes/` e o tema de `estilos/`.

## Estado atual

- Casca do sistema (menu lateral com logo LOCUS, topo com brasão da Prefeitura +
  breadcrumb + usuário logado + botão Sair, rodapé padronizado).
- Tela **Gestão das unidades educacionais** em
  `/cadastro/gestao-unidades-educacionais`, fiel ao Figma, com **dados
  estáticos**. A camada de serviço já tem a assinatura pronta para a API real.
- Sem fluxo de login nesta entrega: o usuário logado vem de um mock fixo.
