# Migração de CSS Modules → styled-components (frontend LOCUS)

## Context

Hoje o frontend `SME-SIGLA-LOCUS-Frontend/` estiliza componentes de **três** formas
paralelas: 9 arquivos `*.module.css`, objetos `style={{}}` inline, e o tema do Ant Design
(`temaAntd.ts`). Os design tokens vivem duplicados: `tokens.ts` (objetos JS, para o Ant e
para o `MenuLateral`) **e** `global.css` `:root` (as mesmas cores como `--color-*`, para
os CSS Modules). Toda vez que um token muda, são dois lugares para editar, e um typo em
`estilos.classe` vira `undefined` silencioso (sem type-check).

Esta migração adota **styled-components** como camada única de estilização de componentes,
elimina a duplicação de tokens (o `:root` some; `tokens.ts` passa a alimentar o
`ThemeProvider` do styled-components **e** o `temaAntd.ts`), e dá type-safety ao estilo
(`theme.colors.primary` autocompletado e checado). Resultado esperado: `npm run build`,
`npm run lint` e `npm run test` continuam passando; a aplicação renderiza visualmente
igual.

### Escopo (travado)

- **Migrar:** os 9 `*.module.css` → um `styles.ts` por pasta de componente; o
  `global.css` → `GlobalStyle` (styled-components).
- **Migrar junto:** os `style={{}}` inline que estão **dentro** desses 9 arquivos
  (LayoutBase 2, CardFormFiltrosUnidades 3, TabelaUnidades 5 = 10 objetos).
- **NÃO tocar:** os `style={{}}` de `CardComponenteCurricular.tsx` (8) e
  `paginas/GestaoUnidadesEducacionais/index.tsx` (1) — ficam para um PR futuro.
- **NÃO tocar:** `temaAntd.ts` (continua lendo `tokens.ts`), o `ConfigProvider`, os
  arquivos de teste (ver Seção 7 — nenhum quebra).
- **Biblioteca:** `styled-components` v6 (nova dependência), mesmo o projeto já tendo
  `@emotion/*` via MUI. Decisão do usuário; Emotion continua no bundle por causa do MUI.

---

## Seção 1 — Arquitetura da nova camada

### 1.1 O que substitui o quê

| Hoje | Depois |
|---|---|
| `src/estilos/tokens/tokens.ts` (objetos `as const`) | **Mantém** + passa a exportar `tema` (objeto único) e o tipo `Tema` |
| `src/estilos/global/global.css` | `src/estilos/global/GlobalStyle.tsx` via `createGlobalStyle` — reset + `@import` das fontes; **sem** `:root` |
| 9 × `*.module.css` | 9 × `styles.ts` irmão, exportando os styled components |
| `var(--color-primary)` | `${({ theme }) => theme.colors.primary}` |
| `estilos.classe` no JSX | `<S.Wrapper>`, `<S.Titulo>` (import `* as S from "./styles"`) |
| `ConfigProvider theme={temaAntd}` | **inalterado** |
| — | `<ThemeProvider theme={tema}>` novo em `providers.tsx` (envolve tudo) |
| — | `src/styled.d.ts` — `DefaultTheme extends Tema` |
| `identity-obj-proxy` no jest.config | **mantém** (custo zero; nada mais importa `.css`, mas não atrapalha) |

### 1.2 A ponte de tokens (a duplicação que some)

`tokens.ts` continua a fonte única. Alimenta **dois** consumidores, ambos tipados:

```
tokens.ts  ──►  temaAntd.ts        ──►  <ConfigProvider theme=…>   (Ant Design)
           └─►  tema (novo export) ──►  <ThemeProvider theme=…>    (styled-components)
```

O terceiro consumidor de hoje — as `--color-*` no `:root` do `global.css` — **deixa de
existir**. Os `styles.ts` leem `theme.colors.*` via props, não `var(--…)`.

### 1.3 Forma do `tema`

`tokens.ts` ganha, ao final do arquivo (após os `export const` existentes):

```ts
export const tema = { colors, typography, spacing, layout } as const;
export type Tema = typeof tema;
```

(O `export const tokens` atual já é `{ colors, typography, spacing, layout }` — na prática
`tema` é o mesmo objeto com nome novo. **Renomear** `tokens` → `tema` e ajustar o
`export default`. `tokens` não é importado em lugar nenhum hoje, então é seguro.)

### 1.4 `src/styled.d.ts` (novo)

```ts
import "styled-components";
import type { Tema } from "@/estilos/tokens/tokens";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Tema {}
}
```

Incluído automaticamente pelo `tsconfig.app.json` (`include: ["src", "src/global.d.ts"]`
— `src` cobre `src/styled.d.ts`). Confirmar que pega; se não, adicionar explicitamente.

---

## Seção 2 — Setup de infraestrutura

### 2.1 Dependências

```bash
npm i styled-components@^6
npm i -D babel-plugin-styled-components
```

- `styled-components` v6 traz os próprios tipos (não precisa `@types/styled-components`).
- React 19: v6 é a linha compatível.

### 2.2 `babel-plugin-styled-components` — dois lugares

**`vite.config.ts`** — passar via `@vitejs/plugin-react` (v4.7, suporta `babel.plugins`):

```ts
plugins: [
  react({
    babel: {
      plugins: ["babel-plugin-styled-components"],
    },
  }),
  svgr({ svgrOptions: { icon: true } }),
],
```

**`babel.config.cjs`** — para o Jest (`babel-jest`):

```cjs
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["babel-plugin-styled-components"],
};
```

Efeito: classes no DOM viram `.Chip-sc-xxxx` (nome do componente + hash), `displayName`
setado, melhor DX no DevTools e nos snapshots.

### 2.3 `providers.tsx` — `ThemeProvider`

```tsx
import { ThemeProvider } from "styled-components";
import { tema } from "@/estilos/tokens/tokens";
import { GlobalStyle } from "@/estilos/global/GlobalStyle";
// …
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={tema}>
        <GlobalStyle />
        <ConfigProvider theme={temaAntd} locale={ptBR}>
          <BrowserRouter>{children}</BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

- `<ThemeProvider>` **por fora** do `<ConfigProvider>` para o tema estar disponível a
  qualquer styled component na árvore.
- `<GlobalStyle />` renderizado uma vez, aqui.

### 2.4 `src/estilos/global/GlobalStyle.tsx` (novo, substitui `global.css`)

```tsx
import { createGlobalStyle } from "styled-components";

// As duas @import de fonte foram para o <head> do index.html (ver Nota abaixo).
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.appBackground};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
  }
`;
```

**Nota sobre `@import` dentro de `createGlobalStyle`:** styled-components emite o CSS num
`<style>` tardio; alguns browsers ignoram `@import` que não está no topo da folha.
**Decisão: mover os dois `@import` de fonte para o `index.html`** como `<link
rel="stylesheet">` no `<head>` (hoje o `<head>` tem só `<meta>`, favicon e `<title>` —
adicionar 2 `<link>` do `fonts.googleapis.com`), e o `createGlobalStyle` fica **só com o
reset** (sem os `@import`). O bloco `GlobalStyle` acima então **não** inclui as duas
linhas `@import`.

### 2.5 `src/app/main.tsx` — remover o import do CSS

Feito **já na etapa de infra** (o `<GlobalStyle />` em `providers.tsx` passa a fornecer o
reset; enquanto os 9 componentes ainda não migraram, eles perdem as `var(--color-*)` —
por isso a infra e a conversão do 1º componente andam juntas, ou mantém-se o `global.css`
importado só até o fim da Seção 3). **Decisão: manter o `import "@/estilos/global/global.css"`
até a Seção 4** (fonte dupla temporária, sem efeito colateral — o `:root` e o
`ThemeProvider` coexistem). A remoção do import + o delete do arquivo + o delete do shim
`*.module.css` do `global.d.ts` estão todos na **Seção 4 (Limpeza final)**.

---

## Seção 3 — Conversão: procedimento por componente

Para **cada** um dos 9 componentes, na ordem da Seção 5:

1. **Criar `styles.ts`** na mesma pasta do componente. Para cada classe do `.module.css`,
   um `export const NomePascal = styled.<tag>\`…\``. A `<tag>` é o elemento HTML que hoje
   recebe `className={estilos.classe}` (ver o `.tsx`).
2. **Traduzir o CSS** para dentro do template:
   - `var(--color-X)` → `${({ theme }) => theme.colors.<chaveCamel>}` (mapa na Seção 6).
   - `var(--font-roboto)` → `${({ theme }) => theme.typography.fontFamilyRoboto}`.
   - Valores de espaçamento que **batem exatamente** com um token → `${({ theme }) =>
     theme.spacing.<x>}px` (`4→xs`, `8→sm`, `16→md`, `24→lg`, `32→xl`). Valores **sem**
     token (`6px`, `12px`, `26px`, `28px`, `72px`, `129px`, `219px`, `306px`, `999px`,
     percentuais, `1px` de borda) → **mantidos como literais**.
   - Alturas conhecidas: `72px` (header) → `${({ theme }) => theme.layout.headerHeight}px`;
     `65px` (footer) → `theme.layout.footerHeight`; largura do sider `104` já vem de
     `tokens.layout.menuWidth` no `.tsx` (mantém).
   - `border-radius: 8px` → `${({ theme }) => theme.layout.radius}px`.
   - Sombras que batem com `layout.cardShadow` / `layout.headerShadow` → usar o token.
   - Literais `rgba(...)` que **têm** token equivalente → usar o token:
     `rgba(0,156,10,0.1)` = `theme.colors.successBackground` (ChipVagas),
     `rgba(188,0,0,0.1)` = `theme.colors.errorBackground` (ChipVagas).
   - Literais `rgba(...)` **sem** token: `rgba(0,104,188,0.1)` (fundo do ícone no
     CartaoStat) → **manter literal**. É cor de uso único; criar token para ela só
     infla `tokens.ts`. (`rgba(131,131,131,0.1)` não aparece em nenhum dos 9 CSS —
     ignorar.)
3. **`:global(...)` (Ant Design internals)** — styled-components resolve seletor
   descendente normalmente. Reescrever:
   ```
   .card :global(.ant-form-item-explain) { … }
   ```
   vira, dentro do `styled(Card)` (ou wrapper), usando `&`:
   ```ts
   export const Card = styled(AntCard)`
     & .ant-form-item-explain,
     & .ant-form-item-explain-connected {
       font-size: 12px;
       …
     }
   `;
   ```
   - **`MenuLateral`, `TopoBar`, `CardFormFiltrosUnidades`, `TabelaUnidades`** têm
     `:global()` mirando `.ant-menu-item`, `.ant-breadcrumb-*`, `.ant-form-item-*`,
     `.ant-table-*`, `.ant-pagination-*`. Cada bloco `.scope :global(.ant-x)` →
     `& .ant-x` dentro do styled wrapper daquele scope.
   - Onde hoje há `!important` (MenuLateral, muito), **manter os `!important`** — a briga
     de especificidade com o CSS-in-JS do Ant é a mesma; styled-components não aumenta a
     especificidade sozinho. (Nota: styled-components duplica a classe `&&` para subir
     especificidade sem `!important` — usar `&&` nos blocos do MenuLateral **se** der para
     remover os `!important` sem regressão; senão, manter como está. Decidir na
     implementação, componente a componente, olhando o resultado.)
4. **Editar o `.tsx`:**
   - `import estilos from "./X.module.css"` → `import * as S from "./styles"`.
   - `className={estilos.classe}` → trocar o elemento por `<S.NomePascal>` (e remover o
     `className`). Quando o elemento é um componente do Ant (`<Card className=…>`,
     `<Table className=…>`, `<Breadcrumb className=…>`, `<Menu className=…>`,
     `<Sider className=…>`, `<Layout className=…>`), criar `styled(AntX)` no `styles.ts` e
     usar `<S.X …>` com as mesmas props.
   - `style={{}}` inline **dentro destes 9** → virar um styled component novo no
     `styles.ts` (ou uma prop de layout). Ex.: `<Header style={{ padding: 0 }}>` →
     `<S.Header>` com `padding: 0;`.
5. **Deletar o `.module.css`** correspondente.
6. **Rodar** `npx tsc -b` e o teste do componente (se houver) antes de ir para o próximo.

### Caso especial: `ChipVagas` (único com estilo dinâmico)

Hoje: `className={estilos.chip}` + `data-situacao={situacao}` e três seletores
`.chip[data-situacao="…"]`.

Depois, no `styles.ts`:

O tipo é **`SituacaoVagas`** (`z.infer<typeof situacaoVagasSchema>`, valores
`"disponivel" | "excedente" | "completo"`), retornado por `situacaoDoSaldo(saldo)`.

```ts
import styled, { css, type DefaultTheme } from "styled-components";
import type { SituacaoVagas } from "@/servicos/recursos/unidadesEducacionais/tipos";

const porSituacao = (s: SituacaoVagas, t: DefaultTheme) =>
  ({
    disponivel: css`
      color: ${t.colors.success};
      background: ${t.colors.successBackground};
    `,
    excedente: css`
      color: ${t.colors.error};
      background: ${t.colors.errorBackground};
    `,
    completo: css`
      color: ${t.colors.completeText};
      background: ${t.colors.completeBackground};
    `,
  })[s];

export const Chip = styled.span<{ $situacao: SituacaoVagas }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;

  & svg {
    width: 16px;
    height: 16px;
  }

  ${({ $situacao, theme }) => porSituacao($situacao, theme)}
`;
```

No `.tsx`: `<S.Chip $situacao={situacao} data-situacao={situacao}>`. **Manter o
`data-situacao`** no DOM — o teste `ChipVagas/__test__/index.test.tsx` asserta nele
(`chip.closest("[data-situacao]")`).

---

## Seção 4 — Limpeza final

Após os 9 componentes convertidos e `npm run build` + `npm run test` verdes:

1. Remover `import "@/estilos/global/global.css"` de `src/app/main.tsx`.
2. Deletar `src/estilos/global/global.css`.
3. Remover `declare module "*.module.css"` de `src/global.d.ts`.
4. Confirmar `find src -name '*.module.css'` → vazio.
5. `jest.config.cjs`: pode remover a linha `"\\.(css|less|scss|sass)$": "identity-obj-proxy"`
   do `moduleNameMapper` (nada mais importa CSS) — **opcional**, custo zero em manter.
   Se remover, também tirar `identity-obj-proxy` das devDeps.
6. `src/estilos/` fica com: `tokens/tokens.ts`, `temas/temaAntd.ts`, `global/GlobalStyle.tsx`.
   A pasta `global/` agora tem um `.tsx` — ok.

---

## Seção 5 — Ordem de execução

Fazer em ordem crescente de risco/tamanho, validando `tsc -b` + teste a cada passo:

1. **Infra** (Seção 2): deps, babel plugin, `styled.d.ts`, `tema`/`Tema` em `tokens.ts`,
   `GlobalStyle.tsx`, `ThemeProvider` no `providers.tsx`, `@import` de fonte para o
   `index.html`. **Ainda com o `global.css` no lugar** (dupla fonte temporária) — validar
   que o app sobe.
2. **RodapeBar** (20 linhas, 3 classes, 0 `:global`, 0 inline) — o mais simples, serve de
   referência.
3. **CabecalhoPagina** (20 linhas, 3 classes, 0 `:global`).
4. **CartaoStat** (51 linhas, 6 classes, 0 `:global`) — tem teste (só texto, não quebra).
5. **LayoutBase** (21 linhas, 4 classes, 0 `:global`, 2 inline `padding:0`).
6. **ChipVagas** (30 linhas, estilo dinâmico) — tem teste (`data-situacao`, não quebra).
7. **CardFormFiltrosUnidades** (18 linhas CSS, 5 `:global` no `.ant-form-item-*`, 3 inline).
8. **TabelaUnidades** (49 linhas, 8 `:global` no `.ant-table-*`/`.ant-pagination-*`,
   5 inline) — a paginação centralizada e a zebra (`rowClassName="linhaPar"`) precisam
   continuar; `& .ant-table-tbody > tr.linhaPar > td` no styled wrapper.
9. **MenuLateral** (98 linhas, ~11 `:global` no `.ant-menu-*`, muito `!important`) — o
   mais pesado; deixar por último.
10. **TopoBar** (97 linhas, ~4 `:global` no `.ant-breadcrumb-*`) — tem teste (texto/role,
    não quebra).
11. **Limpeza** (Seção 4).

Commitar por etapa: um commit para a infra, um por componente (ou agrupando os 4 triviais),
um para a limpeza. Facilita bisect se algo regredir visualmente.

---

## Seção 6 — Mapa `var(--…)` → `theme.…`

| CSS var (hoje) | styled-components |
|---|---|
| `var(--color-primary)` | `theme.colors.primary` |
| `var(--color-blue)` | `theme.colors.blue` |
| `var(--color-active-blue)` | `theme.colors.activeBlue` |
| `var(--color-primary-text)` | `theme.colors.primaryText` |
| `var(--color-secondary-text)` | `theme.colors.secondaryText` |
| `var(--color-tertiary-text)` | `theme.colors.tertiaryText` |
| `var(--color-border)` | `theme.colors.border` |
| `var(--color-light-border)` | `theme.colors.lightBorder` |
| `var(--color-app-background)` | `theme.colors.appBackground` |
| `var(--color-striped-background)` | `theme.colors.stripedBackground` |
| `var(--color-success)` | `theme.colors.success` |
| `var(--color-error)` | `theme.colors.error` |
| `var(--color-complete-background)` | `theme.colors.completeBackground` |
| `var(--color-complete-text)` | `theme.colors.completeText` |
| `var(--color-header-user-background)` | `theme.colors.headerUserBackground` |
| `var(--color-header-user-text)` | `theme.colors.headerUserText` |
| `var(--color-footer-version-text)` | `theme.colors.footerVersionText` |
| `var(--font-roboto)` | `theme.typography.fontFamilyRoboto` |

Literais `#fff` / `#ffffff` → `theme.colors.white`. Literais de cinza sem token
(`#babbbc`, `#929494`) → **manter literal** (uso único, cores de ícone/borda de botão).

Spacing: `4→xs`, `8→sm`, `16→md`, `24→lg`, `32→xl` (só quando o valor casa **exato**).
`layout`: `72→headerHeight`, `65→footerHeight`, `8 (radius)→radius`, `104→menuWidth`.

---

## Seção 7 — Impacto nos testes (verificado — nenhum quebra)

Lidos os 4 testes que tocam estilo:

| Teste | O que asserta | Impacto |
|---|---|---|
| `ChipVagas/__test__/index.test.tsx` | texto visível + `closest("[data-situacao]")` | **Nenhum** — `data-situacao` é mantido no DOM |
| `CartaoStat/__test__/index.test.tsx` | só `getByText(...)` | **Nenhum** |
| `MenuLateral/__test__/index.test.tsx` | `getByText(...).closest("li").className` `.toMatch(/selected/)` | **Nenhum** — `selected` é a classe do Ant (`ant-menu-item-selected`), não do CSS Module |
| `TopoBar/__test__/index.test.tsx` | `getByText`, `getByRole("button", {name:/sair/i})` | **Nenhum** |

Os demais 6 testes não tocam estilo. `identity-obj-proxy` fica no `moduleNameMapper` (não
atrapalha; opcionalmente removível na Seção 4). Nenhum teste novo é necessário —
comportamento não muda. **Não há teste visual no projeto**, então a checagem de regressão
visual é manual (Seção 8).

---

## Verificação

Da pasta do frontend (`cd /home/dennyssouza/projeto-sigla/SME-SIGLA-LOCUS-Frontend`):

```bash
npm run lint          # ESLint (noUnusedLocals/Params são erro)
npm run build         # tsc -b + vite build — styled.d.ts precisa resolver o DefaultTheme
npm run test          # Jest — 10 suites, nenhuma alterada
npm run dev           # smoke visual — comparar com o estado atual, tela por tela:
```

Checagem visual manual (o projeto não tem teste de regressão visual):

- **Layout geral**: menu lateral azul `#183356` largura 104, sticky; header branco 72px
  com sombra; rodapé branco 65px.
- **MenuLateral**: 6 itens, ícone em cima + label 14px/700 embaixo, tudo branco; item
  ativo destacado; botão sair no rodapé do menu.
- **TopoBar**: brasão 129px; breadcrumb cinza com último item azul; caixa do usuário
  219px com borda e fundo `#f5f6f8`, fonte Roboto; botão "Sair" com ícone redondo azul.
- **Tela "Gestão das unidades educacionais"**:
  - **CartaoStat** (3 no painel): borda cinza, raio 8, min-height 115, número 20/700,
    ícone quadrado com fundo azul-claro, legenda 12px cinza.
  - **CardFormFiltrosUnidades**: labels dos campos em **700**; texto de ajuda 12px cor do
    texto principal, `margin-top: 4px`.
  - **TabelaUnidades**: linhas zebradas (ímpar = `#f8f9fa`), cursor pointer; ícones "info"
    do header azuis 16px; **paginação centralizada** com "Mostrando 1-N…" ancorado à
    esquerda; item de página ativo com contorno azul e fundo branco; `margin` entre itens.
  - **ChipVagas**: verde `#009c0a` / fundo `rgba(0,156,10,.1)` para disponíveis; vermelho
    para excedentes; cinza para "Completo".
- **CabecalhoPagina**: título 24/700, ações à direita.
- Fontes **Open Sans** (corpo) e **Roboto** (caixa usuário / versão) carregando.

Comandos de sanidade:

```bash
find src -name '*.module.css'                    # -> vazio
grep -rn 'estilos.module.css\|from "./estilos.module' src/   # -> vazio
grep -rn -- '--color-\|--font-roboto' src/       # -> vazio (nenhuma CSS var restante)
grep -rn 'createGlobalStyle\|ThemeProvider' src/app src/estilos   # -> GlobalStyle.tsx + providers.tsx
grep -rn 'styled-components' src/ | wc -l        # -> 1 por styles.ts + styled.d.ts + GlobalStyle + providers
```

---

## Riscos e mitigações

1. **Regressão visual sem rede de teste.** Mitigação: ordem crescente de complexidade,
   commit por componente, checklist visual da seção acima, `npm run dev` lado a lado com
   a versão anterior (git stash / segunda aba).
2. **`@import` de fonte em `createGlobalStyle`.** Browsers podem ignorar `@import` fora do
   topo da folha injetada. Mitigação: mover os 2 `@import` para `<link>` no `index.html`.
3. **Especificidade vs. CSS-in-JS do Ant Design** (MenuLateral tem ~20 `!important`).
   Mitigação: manter os `!important` na primeira passada; só tentar trocar por `&&` do
   styled-components se o resultado visual bater. Não é objetivo desta migração "limpar"
   os `!important`.
4. **Dois runtimes de CSS-in-JS no bundle** (Emotion via MUI + styled-components).
   Aceito pelo usuário. Sem mitigação — é o custo da escolha da lib.
5. **`babel-plugin-styled-components` em dois configs** (Vite + `babel.config.cjs`).
   Se divergirem, dev/test geram nomes de classe diferentes. Mitigação: mesma string de
   plugin, sem options, nos dois lugares.
6. **`styled.d.ts` não ser incluído pelo tsc.** Mitigação: se `theme` vier `any` no
   build, adicionar `"src/styled.d.ts"` explicitamente ao `include` do
   `tsconfig.app.json`.
7. **`ThemeProvider` fora do `ConfigProvider`.** Se algum styled component precisar de
   contexto do Ant (não é o caso hoje), a ordem teria de inverter. Hoje nenhum precisa.
