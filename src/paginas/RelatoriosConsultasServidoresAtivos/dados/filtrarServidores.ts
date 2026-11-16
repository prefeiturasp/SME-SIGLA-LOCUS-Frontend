import type { Dayjs } from "dayjs";
import type { FiltrosServidores } from "../componentes/CardFormFiltrosServidores";
import type { ServidorAtivo } from "./dadosEstaticos";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function somenteDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

function campoTextoPreenchido(valor?: string): valor is string {
  return Boolean(valor && valor.trim().length > 0);
}

function dataFiltro(valor?: Dayjs | null): string | undefined {
  if (!valor || typeof valor.format !== "function") return undefined;
  return valor.format("DD/MM/YYYY");
}

/** Aplica os filtros do formulário sobre a lista estática de servidores. */
export function filtrarServidores(
  servidores: readonly ServidorAtivo[],
  filtros: FiltrosServidores,
): ServidorAtivo[] {
  return servidores.filter((servidor) => {
    if (
      campoTextoPreenchido(filtros.nome) &&
      !normalizar(servidor.nome).includes(normalizar(filtros.nome))
    ) {
      return false;
    }

    if (
      campoTextoPreenchido(filtros.rf) &&
      !somenteDigitos(servidor.rf).includes(somenteDigitos(filtros.rf))
    ) {
      return false;
    }

    if (
      campoTextoPreenchido(filtros.cpf) &&
      !somenteDigitos(servidor.cpf).includes(somenteDigitos(filtros.cpf))
    ) {
      return false;
    }

    if (filtros.dre && servidor.dre !== filtros.dre) return false;

    if (
      filtros.unidadeEducacional &&
      servidor.unidadeEducacional !== filtros.unidadeEducacional
    ) {
      return false;
    }

    if (
      filtros.cargoAtual &&
      servidor.cargoAtualCodigo !== filtros.cargoAtual
    ) {
      return false;
    }

    if (filtros.tipoLaudo && servidor.tipoLaudo !== filtros.tipoLaudo) {
      return false;
    }

    if (
      filtros.grupoAtividades &&
      servidor.grupoAtividadesCodigo !== filtros.grupoAtividades
    ) {
      return false;
    }

    if (filtros.tipoVaga && servidor.tipoVaga !== filtros.tipoVaga) {
      return false;
    }

    if (filtros.liminar && servidor.liminarCodigo !== filtros.liminar) {
      return false;
    }

    const retorno = dataFiltro(filtros.retornoAfastamento);
    if (retorno && servidor.dataRetornoAfastamento !== retorno) {
      return false;
    }

    return true;
  });
}
