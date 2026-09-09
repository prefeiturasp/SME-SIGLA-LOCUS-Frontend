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

/**
 * Carrega dados de uma funcao assincrona da camada de dados.
 *
 * As funcoes de `dados/` hoje devolvem dados estaticos, mas continuam
 * assincronas para que a volta ao HTTP real seja uma troca de implementacao
 * dentro de `dados/`, sem tocar nas paginas. Este hook concentra o efeito, o
 * estado de carregamento/erro e a guarda contra resposta obsoleta.
 *
 * @param carregar Funcao que devolve a promessa com os dados.
 * @param deps Dependencias que disparam um novo carregamento.
 * @param habilitado Quando falso, nao carrega e mantem os dados indefinidos.
 */
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
    // `carregar` e recriada a cada render; as deps do chamador definem quando
    // recarregar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habilitado, ...deps]);

  // Enquanto desabilitado o hook fica ocioso, sem carregamento pendente.
  return habilitado ? estado : ESTADO_OCIOSO;
}

export default useDadosEstaticos;
