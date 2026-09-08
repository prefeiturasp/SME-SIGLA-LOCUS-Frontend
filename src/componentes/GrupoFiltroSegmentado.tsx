import { Segmented } from "antd";
import styled from "styled-components";

export interface OpcaoSegmentada<T extends string = string> {
  valor: T;
  rotulo: string;
}

export interface GrupoFiltroSegmentadoProps<T extends string = string> {
  opcoes: OpcaoSegmentada<T>[];
  valor: T;
  aoSelecionar: (valor: T) => void;
  rotuloAcessivel?: string;
}

const LARGURA_BORDA = 2;
const RESPIRO_INTERNO = 4;

/** Altura interna dos itens: a caixa externa precisa fechar em controlHeight. */
const alturaItem = (alturaControle: number) =>
  alturaControle - 2 * (RESPIRO_INTERNO + LARGURA_BORDA);

const SegmentadoComBorda = styled(Segmented)`
  box-sizing: border-box;
  height: ${({ theme }) => theme.layout.controlHeight}px;
  padding: ${RESPIRO_INTERNO}px;
  border: ${LARGURA_BORDA}px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.radius}px;

  .ant-segmented-item,
  .ant-segmented-thumb {
    border-radius: ${({ theme }) => theme.layout.radius - RESPIRO_INTERNO}px;
  }

  .ant-segmented-item,
  .ant-segmented-thumb,
  .ant-segmented-item-label {
    height: ${({ theme }) => alturaItem(theme.layout.controlHeight)}px;
    line-height: ${({ theme }) => alturaItem(theme.layout.controlHeight)}px;
  }

  .ant-segmented-item-label {
    padding: 0 ${({ theme }) => theme.spacing.lg}px;
  }
`;

/** Grupo de chips de filtro (Todos | Com vagas | ...). */
export function GrupoFiltroSegmentado<T extends string = string>({
  opcoes,
  valor,
  aoSelecionar,
  rotuloAcessivel,
}: GrupoFiltroSegmentadoProps<T>) {
  return (
    <SegmentadoComBorda
      aria-label={rotuloAcessivel}
      value={valor}
      onChange={(novoValor) => aoSelecionar(novoValor as T)}
      options={opcoes.map(({ valor: value, rotulo: label }) => ({
        label,
        value,
      }))}
    />
  );
}

export default GrupoFiltroSegmentado;
