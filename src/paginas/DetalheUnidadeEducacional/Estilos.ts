import { Segmented } from "antd";
import styled from "styled-components";

const LARGURA_BORDA = 2;
const RESPIRO_INTERNO = 4;

/** Altura interna dos itens: a caixa externa precisa fechar em controlHeight. */
const alturaItem = (alturaControle: number) =>
  alturaControle - 2 * (RESPIRO_INTERNO + LARGURA_BORDA);

export const SegmentadoComBorda = styled(Segmented)`
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

  /*
   * Durante a animacao do thumb o rc-segmented tira a classe item-selected de
   * todos os itens, entao o item de destino volta a cor escura justamente
   * enquanto o fundo azul desliza sob ele. O input do item continua checked
   * o tempo todo: usamos ele para manter o texto branco na transicao.
   */
  .ant-segmented-item:has(input:checked) .ant-segmented-item-label {
    color: ${({ theme }) => theme.colors.white};
  }
`;
