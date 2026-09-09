import { useEffect, useState, type DependencyList } from "react";

export interface EstadoDadosEstaticos<T> {
  dados: T | undefined;
  carregando: boolean;
  erro: boolean;
}

interface EstadoInterno<T> {
  dados: T | undefined;
  carregando: boolean;
  erro: boolean;
}

const ESTADO_OCIOSO: EstadoInterno<never> = {
  dados: undefined,
  carregando: false,
  erro: false,
};

export function useDadosEstaticos<T>(
  carregar: () => Promise<T>,
  deps: DependencyList,
  habilitado = true,
): EstadoDadosEstaticos<T> {
  const [estado, setEstado] = useState<EstadoInterno<T>>(() =>
    habilitado
      ? { dados: undefined, carregando: true, erro: false }
      : ESTADO_OCIOSO,
  );

  useEffect(() => {
    if (!habilitado) return;

    let ativo = true;

    carregar()
      .then((resultado) => {
        if (ativo)
          setEstado({ dados: resultado, carregando: false, erro: false });
      })
      .catch(() => {
        if (ativo)
          setEstado({ dados: undefined, carregando: false, erro: true });
      });

    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habilitado, ...deps]);

  return habilitado ? estado : ESTADO_OCIOSO;
}

export default useDadosEstaticos;
