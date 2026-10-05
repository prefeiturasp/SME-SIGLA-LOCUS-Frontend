export const CAMINHOS = {
  raiz: "/",
  cadastroGestaoUnidades: "/cadastro/gestao-unidades-educacionais",
  cadastroRegistrarUE: "/cadastro/registrar-unidade-educacional",
  cadastroDetalheUE: "/cadastro/unidade-educacional/:codigoLotacao",
  cadastroAtualizacaoRF: "/cadastro/atualizacao/registro-funcional",
  cadastroAtualizacaoRegistroFuncional:
    "/cadastro/atualizacao/registro-funcional/:rf",
  naoEncontrado: "/pagina-nao-encontrada",
} as const;

export type Caminho = (typeof CAMINHOS)[keyof typeof CAMINHOS];

export function caminhoDetalheUE(codigoLotacao: string): string {
  return CAMINHOS.cadastroDetalheUE.replace(
    ":codigoLotacao",
    encodeURIComponent(codigoLotacao),
  );
}

export function caminhoAtualizacaoRegistroFuncional(rf: string): string {
  return CAMINHOS.cadastroAtualizacaoRegistroFuncional.replace(
    ":rf",
    encodeURIComponent(rf),
  );
}

export interface ItemBreadcrumb {
  titulo: string;
  caminho?: string;
}

const INICIO: ItemBreadcrumb = {
  titulo: "Início",
  caminho: CAMINHOS.cadastroGestaoUnidades,
};

export const BREADCRUMB_POR_ROTA: Record<string, ItemBreadcrumb[]> = {
  [CAMINHOS.cadastroGestaoUnidades]: [{ titulo: "Início" }],
  [CAMINHOS.cadastroRegistrarUE]: [
    INICIO,
    { titulo: "Registrar Unidade Educacional" },
  ],
  [CAMINHOS.cadastroAtualizacaoRF]: [
    INICIO,
    { titulo: "Cadastro" },
    { titulo: "Atualização" },
    { titulo: "Por registro funcional (RF)" },
  ],
  [CAMINHOS.naoEncontrado]: [INICIO, { titulo: "Página não encontrada" }],
};

interface PadraoBreadcrumb {
  padrao: string;
  itens: (params: Record<string, string>) => ItemBreadcrumb[];
}

const BREADCRUMB_POR_PADRAO: PadraoBreadcrumb[] = [
  {
    padrao: CAMINHOS.cadastroAtualizacaoRegistroFuncional,
    itens: () => [
      INICIO,
      { titulo: "Cadastro" },
      { titulo: "Atualização" },
      { titulo: "Por registro funcional (RF)" },
    ],
  },
  {
    padrao: CAMINHOS.cadastroDetalheUE,
    itens: () => [INICIO, { titulo: "Unidade Educacional" }],
  },
];

export function casarPadrao(
  padrao: string,
  pathname: string,
): Record<string, string> | undefined {
  const segmentosPadrao = padrao.split("/").filter(Boolean);
  const segmentosPath = pathname.split("/").filter(Boolean);

  if (segmentosPadrao.length !== segmentosPath.length) return undefined;

  const params: Record<string, string> = {};

  for (let i = 0; i < segmentosPadrao.length; i += 1) {
    const segmento = segmentosPadrao[i];

    if (segmento.startsWith(":")) {
      params[segmento.slice(1)] = decodeURIComponent(segmentosPath[i]);
      continue;
    }

    if (segmento !== segmentosPath[i]) return undefined;
  }

  return params;
}

export function breadcrumbDaRota(pathname: string): ItemBreadcrumb[] {
  const exato = BREADCRUMB_POR_ROTA[pathname];
  if (exato) return exato;

  for (const { padrao, itens } of BREADCRUMB_POR_PADRAO) {
    const params = casarPadrao(padrao, pathname);
    if (params) return itens(params);
  }

  return [{ titulo: "Início" }];
}
