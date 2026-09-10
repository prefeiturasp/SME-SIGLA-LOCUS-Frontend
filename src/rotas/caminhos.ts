export const CAMINHOS = {
  raiz: "/",
  cadastroGestaoUnidades: "/cadastro/gestao-unidades-educacionais",
  cadastroRegistrarUE: "/cadastro/registrar-unidade-educacional",
  cadastroDetalheUE: "/cadastro/unidade-educacional/:codigoLotacao",
} as const;

export type Caminho = (typeof CAMINHOS)[keyof typeof CAMINHOS];

/** Monta a URL de detalhe de uma UE a partir do codigo de lotacao. */
export function caminhoDetalheUE(codigoLotacao: string): string {
  return CAMINHOS.cadastroDetalheUE.replace(
    ":codigoLotacao",
    encodeURIComponent(codigoLotacao),
  );
}

export interface ItemBreadcrumb {
  titulo: string;
  caminho?: string;
}

export const BREADCRUMB_POR_ROTA: Record<string, ItemBreadcrumb[]> = {
  [CAMINHOS.cadastroGestaoUnidades]: [
    { titulo: "Início" },
    { titulo: "Cadastro", caminho: CAMINHOS.cadastroGestaoUnidades },
  ],
  [CAMINHOS.cadastroRegistrarUE]: [
    { titulo: "Início" },
    { titulo: "Cadastro", caminho: CAMINHOS.cadastroGestaoUnidades },
    { titulo: "Registrar Unidade Educacional" },
  ],
};

interface PadraoBreadcrumb {
  padrao: string;
  itens: (params: Record<string, string>) => ItemBreadcrumb[];
}

const BREADCRUMB_POR_PADRAO: PadraoBreadcrumb[] = [
  {
    padrao: CAMINHOS.cadastroDetalheUE,
    itens: () => [
      { titulo: "Início" },
      { titulo: "Cadastro", caminho: CAMINHOS.cadastroGestaoUnidades },
      { titulo: "Unidade Educacional" },
    ],
  },
];

/**
 * Casa um pathname com um padrao de rota, extraindo os parametros.
 *
 * @returns Os parametros da rota, ou `undefined` se o padrao nao casar.
 */
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
