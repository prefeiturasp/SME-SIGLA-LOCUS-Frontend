import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Button, Card, Form, Input, Select, Switch, Table } from "antd";
import type { TablePaginationConfig } from "antd";
import { createElement } from "react";
import styled, { css, type DefaultTheme } from "styled-components";
import {
  useNotificacao as useNotificacaoHook,
  type OpcoesNotificacao,
} from "@/hooks/useNotificacao";
import { situacaoDoSaldo } from "@/servicos/recursos/unidadesEducacionais/tipos";

/* ======= PrimaryButton ======= */

/** Botao primario padrao (fundo azul institucional). */
export const PrimaryButton = styled(Button).attrs({ type: "primary" })`
  height: ${({ theme }) => theme.layout.controlHeight}px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
`;

/* ======= SecondaryButton ======= */

/** Botao secundario padrao (fundo branco, borda/texto azul do tema Ant). */
export const SecondaryButton = styled(Button).attrs({ type: "default" })`
  height: ${({ theme }) => theme.layout.controlHeight}px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
`;

/* ======= BotaoExcluir ======= */

/** Botao de exclusao padrao (icone lixeira, vermelho). */
export const BotaoExcluir = styled(Button).attrs({
  type: "text",
  danger: true,
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing.xl}px;
  height: ${({ theme }) => theme.spacing.xl}px;
  padding: 0;
  color: ${({ theme }) => theme.colors.error} !important;

  &:hover {
    color: ${({ theme }) => theme.colors.error} !important;
    background: ${({ theme }) => theme.colors.errorBackground} !important;
  }
`;

/* ======= Toggle ======= */

/** Toggle padrao do Locus (Switch Ant com cor azul do tema). */
export const Toggle = styled(Switch)``;

/* ======= Tabela ======= */

/** Tabela padrao do Locus: zebra, paginacao centralizada, total a esquerda. */
export const Tabela = styled(Table)`
  & .ant-table-tbody > tr {
    cursor: pointer;
  }

  & .ant-table-tbody > tr.linhaPar > td {
    background: ${({ theme }) => theme.colors.stripedBackground};
  }

  & .ant-table-thead th .anticon,
  & .ant-table-thead th svg {
    color: ${({ theme }) => theme.colors.blue};
    font-size: 16px;
  }

  & .ant-pagination {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  & .ant-pagination-total-text {
    position: absolute;
    inset-inline-start: 0;
    font-weight: 700;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  & .ant-pagination-item {
    margin-inline-end: ${({ theme }) => theme.spacing.sm}px;
  }

  & .ant-pagination-item-active {
    border-color: ${({ theme }) => theme.colors.activeBlue};
  }

  & .ant-pagination-item-active a {
    color: ${({ theme }) => theme.colors.activeBlue};
  }
` as typeof Table;

/* ======= CardFormulario ======= */

/** Card padrao de formulario / secoes de pagina (Gestao + Registrar). */
export const CardFormulario = styled(Card)`
  box-shadow: ${({ theme }) => theme.layout.cardShadow};

  & .ant-form-item-label > label,
  & .ant-form-item-label > label .ant-typography,
  & .ant-form-item-label > label strong {
    font-weight: 700;
  }

  & .ant-form-item-explain,
  & .ant-form-item-explain-connected {
    font-size: 12px;
    line-height: 1.4;
    min-height: auto;
    margin-top: ${({ theme }) => theme.spacing.xs}px;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

/** Area de conteudo padrao das paginas (gap e padding do mockup). */
export const ConteudoPagina = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.xl}px;
`;

/* ======= Tag ======= */

export type VarianteTag = "disponivel" | "excedente" | "completo" | "neutro";

const estilosPorVarianteTag = (variante: VarianteTag, tema: DefaultTheme) =>
  ({
    disponivel: css`
      color: ${tema.colors.success};
      background: ${tema.colors.successBackground};
    `,
    excedente: css`
      color: ${tema.colors.error};
      background: ${tema.colors.errorBackground};
    `,
    completo: css`
      color: ${tema.colors.completeText};
      background: ${tema.colors.completeBackground};
    `,
    neutro: css`
      color: ${tema.colors.neutral};
      background: ${tema.colors.neutralBackground};
    `,
  })[variante];

/** Tag padrao do Locus (chip com icone + texto). */
export const Tag = styled.span<{ $variante: VarianteTag }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;

  & svg {
    width: 16px;
    height: 16px;
  }

  ${({ $variante, theme }) => estilosPorVarianteTag($variante, theme)}
`;

/* ======= TagVagas ======= */

export interface TagVagasProps {
  saldo: number;
}

/** Tag de vagas padrao do Locus (+N disponiveis, -N excedentes, Completo). */
export function TagVagas({ saldo }: TagVagasProps) {
  const situacao = situacaoDoSaldo(saldo);

  const { Icone, texto } = {
    disponivel: {
      Icone: CheckCircleOutlinedIcon,
      texto: `+${saldo} disponíveis`,
    },
    excedente: {
      Icone: TrendingDownOutlinedIcon,
      texto: `${saldo} excedentes`,
    },
    completo: {
      Icone: RemoveCircleOutlineOutlinedIcon,
      texto: "Completo",
    },
  }[situacao];

  return createElement(
    Tag,
    { $variante: situacao, "data-situacao": situacao },
    createElement(Icone, { fontSize: "inherit", "aria-hidden": true }),
    texto,
  );
}

/* ======= paginacao ======= */

export const TAMANHO_PAGINA_PADRAO = 10;

export function textoContagemPaginacao(
  total: number,
  [inicio, fim]: [number, number],
): string {
  return `Mostrando ${inicio}-${fim} de ${total.toLocaleString(
    "pt-BR",
  )} registro(s)`;
}

export interface OpcoesPaginacaoPadrao {
  total: number;
  pageSize?: number;
  paginaAtual?: number;
  showSizeChanger?: boolean;
}

export function criarPaginacaoPadrao({
  total,
  pageSize = TAMANHO_PAGINA_PADRAO,
  paginaAtual,
  showSizeChanger = false,
}: OpcoesPaginacaoPadrao): TablePaginationConfig {
  return {
    total,
    pageSize,
    current: paginaAtual,
    showSizeChanger,
    showTotal: (totalReg, intervalo) =>
      textoContagemPaginacao(totalReg, intervalo),
  };
}

/* ======= campos ======= */

const { TextArea } = Input;

export const InputCampo = styled(Input)`
  height: ${({ theme }) => theme.layout.controlHeight}px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
  width: 100%;
  min-width: 0;
  border-width: 1px;
  padding-right: ${({ theme }) => theme.spacing.md}px;
  padding-left: ${({ theme }) => theme.spacing.md}px;
  box-sizing: border-box;

  &.ant-input-disabled,
  &.ant-input-disabled:hover {
    background-color: ${({ theme }) =>
      theme.colors.completeBackground} !important;
    border-color: ${({ theme }) => theme.colors.border} !important;
    color: ${({ theme }) => theme.colors.secondaryText};
    cursor: not-allowed;
  }
`;

export const InputCampoFlex = styled(InputCampo)`
  flex: 1 1 0;

  &.ant-input-status-error,
  &.ant-input-status-error:hover,
  &.ant-input-status-error:focus {
    border-color: ${({ theme }) => theme.colors.error} !important;
  }
`;

export const SelectCampo = styled(Select)`
  width: 100%;

  & .ant-select-selector {
    height: ${({ theme }) => theme.layout.controlHeight}px;
    border-radius: ${({ theme }) => theme.layout.radius}px;
    border-width: 1px;
    padding-right: ${({ theme }) => theme.spacing.md}px;
    padding-left: ${({ theme }) => theme.spacing.md}px;
  }

  & .ant-select-selection-item,
  & .ant-select-selection-placeholder,
  & .ant-select-selection-search-input {
    line-height: 38px;
  }

  &.ant-select-disabled .ant-select-selector {
    background-color: ${({ theme }) =>
      theme.colors.completeBackground} !important;
    border-color: ${({ theme }) => theme.colors.border} !important;
    color: ${({ theme }) => theme.colors.secondaryText};
    cursor: not-allowed;
  }

  &.ant-select-disabled .ant-select-arrow {
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  &.ant-select-status-error .ant-select-selector,
  &.ant-select-status-error:hover .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.error} !important;
  }
`;

export const TextAreaCampo = styled(TextArea)`
  width: 100%;
  max-width: 1192px;
  height: 80px !important;
  min-height: 80px;
  resize: none;
  border-radius: ${({ theme }) => theme.layout.radius}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
  gap: 10px;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: none;
  }
`;

export const CampoFormulario = styled(Form.Item)`
  width: 100%;

  & .ant-form-item-label > label {
    font-weight: 700;
  }

  & .ant-form-item-explain,
  & .ant-form-item-explain-connected {
    font-size: 12px;
    line-height: 1.4;
    margin-top: ${({ theme }) => theme.spacing.xs}px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

export const CampoFormularioControle = styled(CampoFormulario)`
  & .ant-form-item-control,
  & .ant-form-item-control-input,
  & .ant-form-item-control-input-content {
    min-width: 0;
    max-width: 100%;
  }
`;

/* ======= layoutFormulario ======= */

export const LinhaCampoAcao = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  align-items: flex-start;
  gap: 10px;
`;

export const LinhaCampoCentralizada = styled(LinhaCampoAcao)`
  align-items: center;
`;

export const GrupoCampo = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
`;

export const CampoComAjuda = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  container-type: inline-size;
`;

export const TextoAjudaCampo = styled.span`
  display: block;
  width: 100%;
  max-width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 400;
  font-style: normal;
  font-size: min(12px, 2.61cqi);
  line-height: 1.2;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.primaryText};
  white-space: nowrap;
  overflow: hidden;
`;

export const FormularioEmLinha = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-start;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const ColunaFormulario = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

export const BotaoAcaoInline = styled(SecondaryButton)`
  flex: 0 0 auto;
  white-space: nowrap;
`;

/* ======= listaCaracteristicas ======= */

export const ItemCaracteristica = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const CabecalhoItemCaracteristica = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const TituloItemCaracteristica = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const DescricaoItemCaracteristica = styled.p`
  margin: ${({ theme }) => theme.spacing.xs}px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.4;
`;

export const AreaMunicipalizada = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  width: 100%;

  ${DescricaoItemCaracteristica} {
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }
`;

export const CampoAnoMunicipalizacao = styled(Form.Item)`
  width: 50%;
  max-width: 100%;
  margin-left: ${({ theme }) => theme.spacing.lg}px;

  & .ant-form-item-control,
  & .ant-form-item-control-input,
  & .ant-form-item-control-input-content {
    width: 100%;
  }
`;

export const SelectAnoMunicipalizacao = SelectCampo;

export const CampoMotivoNaoContabilizacao = styled(Form.Item)`
  width: 100%;
  max-width: 1192px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-left: ${({ theme }) => theme.spacing.lg}px;

  & .ant-form-item-control,
  & .ant-form-item-control-input,
  & .ant-form-item-control-input-content {
    width: 100%;
  }

  &.ant-form-item-has-error ${TextAreaCampo},
  &.ant-form-item-has-error ${TextAreaCampo}:hover,
  &.ant-form-item-has-error ${TextAreaCampo}:focus {
    border-color: ${({ theme }) => theme.colors.error} !important;
  }

  &.ant-form-item-has-error .ant-form-item-explain-error {
    color: ${({ theme }) => theme.colors.error};
    margin-top: ${({ theme }) => theme.spacing.xs}px;
  }

  & .ant-form-item-required::before {
    color: ${({ theme }) => theme.colors.error} !important;
  }
`;

/* ======= listaDados ======= */

export const EstadoVazio = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  min-height: 120px;
  padding: 40px ${({ theme }) => theme.spacing.lg}px;
  border: 1px dashed ${({ theme }) => theme.colors.lightBorder};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.white};
`;

export const EstadoVazioTitulo = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const EstadoVazioTexto = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ListaDados = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;

export const CabecalhoListaDados = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 45%) 120px 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: 12px ${({ theme }) => theme.spacing.md}px;
  min-height: 48px;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.stripedBackground};
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};

  @media (max-width: 640px) {
    grid-template-columns: minmax(120px, 40%) 96px 1fr;
    gap: ${({ theme }) => theme.spacing.sm}px;
    padding: 12px;
  }
`;

export const CorpoListaDados = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemListaDados = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 45%) 120px 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: 12px ${({ theme }) => theme.spacing.md}px;
  min-height: 48px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.stripedBackground};
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(120px, 40%) 96px 1fr;
    gap: ${({ theme }) => theme.spacing.sm}px;
    padding: 12px;
  }
`;

export const ColunaListaTexto = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
  min-width: 0;
`;

export const ColunaListaCentralizada = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
`;

export const ColunaListaAcao = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 48px;
`;

/* ======= CabecalhoPagina ======= */

export const PaginaCabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.md}px;
`;

export const PaginaTitulo = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const PaginaAcoes = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

/* ======= CartaoStat ======= */

export const StatCartao = styled.div`
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  min-height: 115px;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.white};
`;

export const StatValor = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const StatLinhaRotulo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StatIcone = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: rgba(0, 104, 188, 0.1);
  color: ${({ theme }) => theme.colors.blue};

  & svg {
    width: 16px;
    height: 16px;
  }
`;

export const StatRotulo = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const StatLegenda = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

/* ======= IconeExcluir ======= */

/** Herda cor do contexto (botao, menu, texto). */
export const IconeExcluirLixeira = styled(DeleteOutlineIcon)`
  color: currentColor;
`;

/* ======= Toast ======= */

export const useNotificacao = useNotificacaoHook;
export const useToast = useNotificacaoHook;
export type { OpcoesNotificacao };
