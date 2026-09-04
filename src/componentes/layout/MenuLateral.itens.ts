import type { ComponentType } from "react";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { IconeExcluir } from "@/componentes/IconeExcluir";

export interface ItemMenu {
  key: string;
  label: string;
  icone: ComponentType<{ fontSize?: "inherit" | "small" | "medium" | "large" }>;
  path?: string;
  prefix: string[];
}

export const ITENS_MENU: ItemMenu[] = [
  {
    key: "cadastro",
    label: "Cadastro",
    icone: PostAddOutlinedIcon,
    path: "/cadastro/gestao-unidades-educacionais",
    prefix: ["/cadastro"],
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
