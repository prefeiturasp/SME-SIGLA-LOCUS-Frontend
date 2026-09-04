export const CAMINHOS = {
  raiz: "/",
  cadastroGestaoUnidades: "/cadastro/gestao-unidades-educacionais",
  cadastroRegistrarUE: "/cadastro/registrar-unidade-educacional",
} as const;

export type Caminho = (typeof CAMINHOS)[keyof typeof CAMINHOS];

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

export function breadcrumbDaRota(pathname: string): ItemBreadcrumb[] {
  return BREADCRUMB_POR_ROTA[pathname] ?? [{ titulo: "Início" }];
}
