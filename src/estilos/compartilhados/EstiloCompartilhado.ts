import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Button, Card, Form, Input, Select, Switch, Table } from "antd";
import type { TablePaginationConfig } from "antd";
import { createElement, type ComponentProps } from "react";
import styled, { css, type DefaultTheme } from "styled-components";
import {
  useNotificacao as useNotificacaoHook,
  type OpcoesNotificacao,
} from "@/hooks/useNotificacao";
import { situacaoDoSaldo } from "@/servicos/recursos/unidadesEducacionais/tipos";

/* ======= PrimaryButton ======= */

/** Botao primario padrao (fundo azul institucional). */
export const PrimaryButton = styled(Button).attrs({ type: "primary" })``;

/* ======= SecondaryButton ======= */

/** Botao secundario padrao (fundo branco, borda/texto azul do tema Ant). */
export const SecondaryButton = styled(Button).attrs({ type: "default" })``;

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

  &:hover {
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
  }

  & .ant-pagination-item {
    margin-inline-end: ${({ theme }) => theme.spacing.sm}px;
  }
` as typeof Table;

/* ======= CardFormulario ======= */

/** Card padrao de formulario / secoes de pagina (Gestao + Registrar). */
export const CardFormulario = styled(Card)``;

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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
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
    {
      $variante: situacao,
      "data-situacao": situacao,
    } as ComponentProps<typeof Tag> & { "data-situacao": string },
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

export const InputForm = styled(Input)`
  width: 100%;
  min-width: 0;
`;

export const InputFormFlex = styled(InputForm)`
  flex: 1 1 0;
`;

export const SelectForm = styled(Select)`
  width: 100%;
`;

export const TextAreaForm = styled(TextArea)`
  width: 100%;
  max-width: 1192px;
  height: 80px !important;
  min-height: 80px;
  resize: none;
`;

export const FormItem = styled(Form.Item)`
  width: 100%;
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
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.secondaryText};
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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const DescricaoItemCaracteristica = styled.p`
  margin: ${({ theme }) => theme.spacing.xs}px 0 0;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
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

export const SelectAnoMunicipalizacao = SelectForm;

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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const EstadoVazioTexto = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  color: ${({ theme }) => theme.colors.primaryText};
  min-width: 0;
`;

export const ColunaListaCentralizada = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
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
  font-size: ${({ theme }) => theme.typography.fontSizeTitle}px;
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
  font-size: ${({ theme }) => theme.typography.fontSizeSubtitle}px;
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
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const StatLegenda = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
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
