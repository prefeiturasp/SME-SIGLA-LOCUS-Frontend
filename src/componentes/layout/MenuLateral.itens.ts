import type { ComponentType } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { IconeExcluir } from "@/componentes/IconeExcluir";
import { CAMINHOS } from "@/rotas/caminhos";

export interface SubitemMenu {
  key: string;
  label: string;
  path?: string;
  filhos?: SubitemMenu[];
}

export interface ItemMenu {
  key: string;
  label: string;
  icone: ComponentType<{ fontSize?: "inherit" | "small" | "medium" | "large" }>;
  path?: string;
  prefix: string[];
  submenu?: SubitemMenu[];
}

const SUBMENU_CADASTRO: SubitemMenu[] = [
  { key: "cadastro-inclusao", label: "Inclusão", filhos: [] },
  {
    key: "cadastro-atualizacao",
    label: "Atualização",
    filhos: [
      {
        key: "cadastro-atualizacao-unidade-exercicio",
        label: "Unidade de exercício",
      },
      {
        key: "cadastro-atualizacao-unidade-lotacao",
        label: "Unidade de lotação",
      },
      {
        key: "cadastro-atualizacao-sem-rf",
        label: "Sem RF ou código da unidade",
      },
      {
        key: "cadastro-atualizacao-ato-sem-efeito",
        label: "Tornar um ato sem efeito",
      },
      {
        key: "cadastro-atualizacao-registro-funcional",
        label: "Por registro funcional (RF)",
        path: CAMINHOS.cadastroAtualizacaoRF,
      },
      { key: "cadastro-atualizacao-vacancia", label: "Vacância" },
    ],
  },
  { key: "cadastro-classificacao", label: "Classificação" },
];

export const ITENS_MENU: ItemMenu[] = [
  {
    key: "inicio",
    label: "Início",
    icone: HomeOutlinedIcon,
    path: CAMINHOS.cadastroGestaoUnidades,
    prefix: [
      CAMINHOS.cadastroGestaoUnidades,
      CAMINHOS.cadastroRegistrarUE,
      CAMINHOS.cadastroDetalheUE.replace(":codigoLotacao", ""),
    ],
  },
  {
    key: "cadastro",
    label: "Cadastro",
    icone: PostAddOutlinedIcon,
    prefix: ["/cadastro"],
    submenu: SUBMENU_CADASTRO,
  },
  {
    key: "relatorios-consultas",
    label: "Relatórios consultas",
    icone: SummarizeOutlinedIcon,
    prefix: ["/relatorios"],
  },
  {
    key: "data-base",
    label: "Data base",
    icone: CalendarMonthOutlinedIcon,
    prefix: ["/data-base"],
  },
  {
    key: "vagas",
    label: "Vagas",
    icone: DescriptionOutlinedIcon,
    prefix: ["/vagas"],
  },
  {
    key: "remocao",
    label: "Remoção",
    icone: IconeExcluir,
    prefix: ["/remocao"],
  },
  {
    key: "integracao",
    label: "Integração",
    icone: LinkOutlinedIcon,
    prefix: ["/integracao"],
  },
];

export function menuItemAtivo(pathname: string): string {
  const item = ITENS_MENU.find((i) =>
    i.prefix.some((prefixo) => pathname.startsWith(prefixo)),
  );
  return item?.key ?? "";
}

export interface SubitemAtivo {
  chave: string;
  chavesPais: string[];
}

export function localizarSubitemAtivo(
  itens: SubitemMenu[],
  pathname: string,
  chavesPais: string[] = [],
): SubitemAtivo | undefined {
  for (const item of itens) {
    if (item.path === pathname) return { chave: item.key, chavesPais };

    if (item.filhos) {
      const encontrado = localizarSubitemAtivo(item.filhos, pathname, [
        ...chavesPais,
        item.key,
      ]);
      if (encontrado) return encontrado;
    }
  }

  return undefined;
}
