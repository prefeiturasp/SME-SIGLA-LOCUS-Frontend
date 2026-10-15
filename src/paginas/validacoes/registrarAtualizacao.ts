import type { Dayjs } from "dayjs";
import { MENSAGENS_VALIDACAO } from "./registrarUnidadeEducacional";

export interface ErrosRegistroAtualizacao {
  erroMotivo?: string;
  erroDataDocumento?: string;
}

export interface DadosValidacaoRegistroAtualizacao {
  motivo?: string;
  dataDocumento: Dayjs | null;
}

export function validarRegistroAtualizacao(
  dados: DadosValidacaoRegistroAtualizacao,
): ErrosRegistroAtualizacao & { ok: boolean } {
  const erros: ErrosRegistroAtualizacao = {};

  if (!dados.motivo?.trim()) {
    erros.erroMotivo = MENSAGENS_VALIDACAO.campoObrigatorio;
  }

  if (!dados.dataDocumento) {
    erros.erroDataDocumento = MENSAGENS_VALIDACAO.campoObrigatorio;
  }

  return {
    ok: Object.keys(erros).length === 0,
    ...erros,
  };
}
