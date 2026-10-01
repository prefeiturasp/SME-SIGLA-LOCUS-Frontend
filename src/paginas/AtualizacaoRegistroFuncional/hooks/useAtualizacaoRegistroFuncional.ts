import { useCallback, useMemo, useRef, useState } from "react";
import { useNotificacao } from "@/hooks/useNotificacao";
import { validarTermoBuscaServidor } from "@/paginas/validacoes/buscarServidor";
import { API } from "@/servicos";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import { resolverServidorDaBusca, textoDaSugestao } from "../utilitarios";

export const MINIMO_CARACTERES_SUGESTAO = 3;

export interface EstadoAtualizacaoRegistroFuncional {
  termo: string;
  sugestoes: ServidorResumo[];
  servidorEncontrado?: ServidorResumo;
  erroBusca?: string;
  /** A ultima busca nao encontrou ninguem (mostra o sad-locus). */
  semResultado: boolean;
  buscando: boolean;
  alterarTermo: (valor: string) => void;
  /** Escolha de uma sugestao: o campo passa a mostrar o texto completo dela. */
  selecionarServidor: (servidor: ServidorResumo) => void;
  buscarServidor: () => Promise<void>;
}

export function useAtualizacaoRegistroFuncional(): EstadoAtualizacaoRegistroFuncional {
  const notificacao = useNotificacao();
  const [termo, setTermo] = useState("");
  const [sugestoes, setSugestoes] = useState<ServidorResumo[]>([]);
  const [servidorEncontrado, setServidorEncontrado] = useState<
    ServidorResumo | undefined
  >();
  const [erroBusca, setErroBusca] = useState<string | undefined>();
  const [semResultado, setSemResultado] = useState(false);
  const [servidorSelecionado, setServidorSelecionado] = useState<
    ServidorResumo | undefined
  >();
  const [buscando, setBuscando] = useState(false);
  // So a consulta mais recente atualiza as sugestoes.
  const ultimaConsulta = useRef(0);

  const alterarTermo = useCallback((valor: string) => {
    setTermo(valor);
    setErroBusca(undefined);
    setSemResultado(false);
    setServidorEncontrado(undefined);
    setServidorSelecionado(undefined);

    const consulta = ++ultimaConsulta.current;

    if (valor.trim().length < MINIMO_CARACTERES_SUGESTAO) {
      setSugestoes([]);
      return;
    }

    API.Servidores.pesquisarServidores(valor)
      .response.then((resultado) => {
        if (consulta === ultimaConsulta.current) setSugestoes(resultado);
      })
      .catch(() => {
        if (consulta === ultimaConsulta.current) setSugestoes([]);
      });
  }, []);

  const selecionarServidor = useCallback((servidor: ServidorResumo) => {
    ultimaConsulta.current += 1; // descarta sugestoes ainda pendentes
    setTermo(textoDaSugestao(servidor));
    setServidorSelecionado(servidor);
    setSugestoes([]);
    setErroBusca(undefined);
    setSemResultado(false);
    setServidorEncontrado(undefined);
  }, []);

  const buscarServidor = useCallback(async () => {
    const validacao = validarTermoBuscaServidor(termo);

    if (!validacao.ok) {
      setErroBusca(validacao.mensagem);
      return;
    }

    // Com uma sugestao escolhida, o campo tem o texto completo dela: busca
    // pelo RF, que identifica o servidor.
    const termoDaBusca = servidorSelecionado?.rf ?? validacao.termo;

    // Fecha a lista: sugestoes que ainda estao chegando nao a reabrem.
    ultimaConsulta.current += 1;
    setSugestoes([]);
    setBuscando(true);
    try {
      const resultados =
        await API.Servidores.pesquisarServidores(termoDaBusca).response;
      const resolucao = resolverServidorDaBusca(termoDaBusca, resultados);

      setServidorEncontrado(
        resolucao.situacao === "encontrado" ? resolucao.servidor : undefined,
      );
      setSemResultado(resolucao.situacao === "naoEncontrado");
      setErroBusca(
        resolucao.situacao === "varios" ? resolucao.mensagem : undefined,
      );
    } catch {
      notificacao.erro({
        titulo: "Erro",
        texto: "Não conseguimos buscar o servidor. Por favor, tente novamente!",
      });
    } finally {
      setBuscando(false);
    }
  }, [termo, servidorSelecionado, notificacao]);

  return useMemo(
    () => ({
      termo,
      sugestoes,
      servidorEncontrado,
      erroBusca,
      semResultado,
      buscando,
      alterarTermo,
      selecionarServidor,
      buscarServidor,
    }),
    [
      termo,
      sugestoes,
      servidorEncontrado,
      erroBusca,
      semResultado,
      buscando,
      alterarTermo,
      selecionarServidor,
      buscarServidor,
    ],
  );
}

export default useAtualizacaoRegistroFuncional;
