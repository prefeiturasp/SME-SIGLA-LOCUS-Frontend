import { useCallback, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import { useNotificacao } from "@/hooks/useNotificacao";
import { validarRegistroAtualizacao } from "@/paginas/validacoes/registrarAtualizacao";

export interface EstadoRegistrarAtualizacao {
  aberto: boolean;
  motivo?: string;
  dataDocumento: Dayjs | null;
  documento: string;
  erroMotivo?: string;
  erroDataDocumento?: string;
  abrir: () => void;
  fechar: () => void;
  alterarMotivo: (valor?: string) => void;
  alterarDataDocumento: (valor: Dayjs | null) => void;
  alterarDocumento: (valor: string) => void;
  registrar: () => void;
}

export function useRegistrarAtualizacao(): EstadoRegistrarAtualizacao {
  const notificacao = useNotificacao();

  const [aberto, setAberto] = useState(false);
  const [motivo, setMotivo] = useState<string>();
  const [dataDocumento, setDataDocumento] = useState<Dayjs | null>(null);
  const [documento, setDocumento] = useState("");
  const [erroMotivo, setErroMotivo] = useState<string>();
  const [erroDataDocumento, setErroDataDocumento] = useState<string>();

  const abrir = useCallback(() => setAberto(true), []);

  const fechar = useCallback(() => {
    setAberto(false);
    setMotivo(undefined);
    setDataDocumento(null);
    setDocumento("");
    setErroMotivo(undefined);
    setErroDataDocumento(undefined);
  }, []);

  const alterarMotivo = useCallback((valor?: string) => {
    setMotivo(valor);
    setErroMotivo(undefined);
  }, []);

  const alterarDataDocumento = useCallback((valor: Dayjs | null) => {
    setDataDocumento(valor);
    setErroDataDocumento(undefined);
  }, []);

  const registrar = useCallback(() => {
    const validacao = validarRegistroAtualizacao({ motivo, dataDocumento });

    if (!validacao.ok) {
      setErroMotivo(validacao.erroMotivo);
      setErroDataDocumento(validacao.erroDataDocumento);
      return;
    }

    notificacao.sucesso({
      titulo: "Sucesso!",
      texto: "A atualização foi registrada.",
    });
    fechar();
  }, [motivo, dataDocumento, notificacao, fechar]);

  return useMemo(
    () => ({
      aberto,
      motivo,
      dataDocumento,
      documento,
      erroMotivo,
      erroDataDocumento,
      abrir,
      fechar,
      alterarMotivo,
      alterarDataDocumento,
      alterarDocumento: setDocumento,
      registrar,
    }),
    [
      aberto,
      motivo,
      dataDocumento,
      documento,
      erroMotivo,
      erroDataDocumento,
      abrir,
      fechar,
      alterarMotivo,
      alterarDataDocumento,
      registrar,
    ],
  );
}

export default useRegistrarAtualizacao;
