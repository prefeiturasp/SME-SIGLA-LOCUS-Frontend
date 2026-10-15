import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs, { type Dayjs } from "dayjs";
import {
  atividadeEstatica,
  concursoEstatico,
  dadosFuncionaisEstaticos,
  encerramentoEstatico,
  historicoAtualizacoesEstatico,
  lotacaoEstatica,
  servidorEstatico,
  type AbaUnidade,
  type RegistroAtualizacao,
  type ServidorCadastro,
} from "../dados/dadosEstaticos";

export interface EstadoDetalheServidor {
  servidor: ServidorCadastro;
  registroFuncional: string;
  situacaoCargoBase: string;
  atividade: string;
  tipoVaga: string;
  dataRetorno: Dayjs | null;
  realocado: boolean;
  abaUnidade: AbaUnidade;
  codigoEol: string;
  tipoLotacao?: string;
  classificacaoGeral: string;
  classificacaoNna: string;
  classificacaoPcd: string;
  dataConvocacao: Dayjs | null;
  dataEscolhaConcurso: Dayjs | null;
  dataNomeacao: Dayjs | null;
  liminar: boolean;
  remocao: boolean;
  tipoLaudo?: string;
  atividadeReadaptacao?: string;
  dataEscolhaEncerramento: Dayjs | null;
  historico: RegistroAtualizacao[];
  painelHistoricoAberto: boolean;
  abrirPainelHistorico: () => void;
  fecharPainelHistorico: () => void;
}

export function useDetalheServidor(): EstadoDetalheServidor {
  const { rf } = useParams();
  const registroFuncional = rf ?? servidorEstatico.registroFuncional;
  const servidor = useMemo(
    () => ({ ...servidorEstatico, registroFuncional }),
    [registroFuncional],
  );

  const [situacaoCargoBase] = useState(
    dadosFuncionaisEstaticos.situacaoCargoBase,
  );
  const [atividade] = useState(atividadeEstatica.atividade);
  const [tipoVaga] = useState(atividadeEstatica.tipoVaga);
  const [dataRetorno] = useState<Dayjs | null>(null);
  const [realocado] = useState(atividadeEstatica.realocado);
  const [abaUnidade] = useState<AbaUnidade>("lotacao");
  const [codigoEol] = useState(lotacaoEstatica.codigoEol);
  const [tipoLotacao] = useState(lotacaoEstatica.tipoLotacao);
  const [classificacaoGeral] = useState(concursoEstatico.classificacaoGeral);
  const [classificacaoNna] = useState("");
  const [classificacaoPcd] = useState("");
  const [dataConvocacao] = useState<Dayjs | null>(
    dayjs(concursoEstatico.dataConvocacao),
  );
  const [dataEscolhaConcurso] = useState<Dayjs | null>(
    dayjs(concursoEstatico.dataEscolha),
  );
  const [dataNomeacao] = useState<Dayjs | null>(
    dayjs(concursoEstatico.dataNomeacao),
  );
  const [liminar] = useState(false);
  const [remocao] = useState(false);
  const [tipoLaudo] = useState<string>();
  const [atividadeReadaptacao] = useState<string>();
  const [dataEscolhaEncerramento] = useState<Dayjs | null>(
    dayjs(encerramentoEstatico.dataEscolha),
  );

  const [painelHistoricoAberto, setPainelHistoricoAberto] = useState(false);
  const historico = useMemo(
    () => (painelHistoricoAberto ? historicoAtualizacoesEstatico : []),
    [painelHistoricoAberto],
  );
  const abrirPainelHistorico = useCallback(
    () => setPainelHistoricoAberto(true),
    [],
  );
  const fecharPainelHistorico = useCallback(
    () => setPainelHistoricoAberto(false),
    [],
  );

  return useMemo(
    () => ({
      servidor,
      registroFuncional,
      situacaoCargoBase,
      atividade,
      tipoVaga,
      dataRetorno,
      realocado,
      abaUnidade,
      codigoEol,
      tipoLotacao,
      classificacaoGeral,
      classificacaoNna,
      classificacaoPcd,
      dataConvocacao,
      dataEscolhaConcurso,
      dataNomeacao,
      liminar,
      remocao,
      tipoLaudo,
      atividadeReadaptacao,
      dataEscolhaEncerramento,
      historico,
      painelHistoricoAberto,
      abrirPainelHistorico,
      fecharPainelHistorico,
    }),
    [
      servidor,
      registroFuncional,
      situacaoCargoBase,
      atividade,
      tipoVaga,
      dataRetorno,
      realocado,
      abaUnidade,
      codigoEol,
      tipoLotacao,
      classificacaoGeral,
      classificacaoNna,
      classificacaoPcd,
      dataConvocacao,
      dataEscolhaConcurso,
      dataNomeacao,
      liminar,
      remocao,
      tipoLaudo,
      atividadeReadaptacao,
      dataEscolhaEncerramento,
      historico,
      painelHistoricoAberto,
      abrirPainelHistorico,
      fecharPainelHistorico,
    ],
  );
}

export default useDetalheServidor;
