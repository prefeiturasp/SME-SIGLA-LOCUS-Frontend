import { useCallback, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotificacao } from "@/hooks/useNotificacao";
import { validarTermoBuscaServidor } from "@/paginas/validacoes/buscarServidor";
import {
  caminhoAtualizacaoRegistroFuncional,
  type EstadoNavegacaoBuscaServidor,
} from "@/rotas/caminhos";
import { API } from "@/servicos";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import { resolverServidorDaBusca, textoDaSugestao } from "../utilitarios";

export const MINIMO_CARACTERES_SUGESTAO = 3;

export interface EstadoAtualizacaoRegistroFuncional {
  termo: string;
  sugestoes: ServidorResumo[];
  servidorEncontrado?: ServidorResumo;
  erroBusca?: string;
  semResultado: boolean;
  buscando: boolean;
  alterarTermo: (valor: string) => void;
  selecionarServidor: (servidor: ServidorResumo) => void;
  buscarServidor: () => Promise<void>;
}

export function useAtualizacaoRegistroFuncional(
  caminhoDoServidor: (rf: string) => string = caminhoAtualizacaoRegistroFuncional,
): EstadoAtualizacaoRegistroFuncional {
  const navigate = useNavigate();
  const { state } = useLocation();
  const notificacao = useNotificacao();
  const [termo, setTermo] = useState(
    () => (state as EstadoNavegacaoBuscaServidor | null)?.termoBusca ?? "",
  );
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
    ultimaConsulta.current += 1;
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

    const termoDaBusca = servidorSelecionado?.rf ?? validacao.termo;

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
      if (resolucao.situacao === "encontrado") {
        navigate(caminhoDoServidor(resolucao.servidor.rf));
      }
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
  }, [termo, servidorSelecionado, notificacao, navigate, caminhoDoServidor]);

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
