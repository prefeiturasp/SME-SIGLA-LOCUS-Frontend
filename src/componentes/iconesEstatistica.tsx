import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import type { ReactNode } from "react";

/** Icone de cada estatistica do painel, indexado pela chave. */
export const ICONE_POR_CHAVE: Record<string, ReactNode> = {
  modulos: <ViewModuleOutlinedIcon />,
  lotacao: <GroupsOutlinedIcon />,
  afastados: <PersonRemoveOutlinedIcon />,
  vagas: <EventSeatOutlinedIcon />,
  unidades: <ApartmentOutlinedIcon />,
  turmas: <Groups3OutlinedIcon />,
};

/** Icone da estatistica, com fallback para chaves desconhecidas. */
export function iconeDaEstatistica(chave: string): ReactNode {
  return ICONE_POR_CHAVE[chave] ?? <GroupsOutlinedIcon />;
}
