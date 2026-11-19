import { useCallback, useMemo, useState } from "react";
import { Button } from "antd";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { servidoresAtivosEstaticos } from "@/paginas/RelatoriosConsultasServidoresAtivos/dados/dadosEstaticos";
import { montarDetalhesServidor } from "@/paginas/RelatoriosConsultasServidoresAtivos/dados/montarDetalhesServidor";
import { PainelMaisDetalhes } from "./componentes/PainelMaisDetalhes";

export function ServidoresVacanciados() {
  const [painelDetalhesAberto, setPainelDetalhesAberto] = useState(false);

  const detalhes = useMemo(
    () => montarDetalhesServidor(servidoresAtivosEstaticos[0]),
    [],
  );

  const abrirPainelDetalhes = useCallback(() => {
    setPainelDetalhesAberto(true);
  }, []);

  const fecharPainelDetalhes = useCallback(() => {
    setPainelDetalhesAberto(false);
  }, []);

  return (
    <>
      <CabecalhoPagina
        titulo="Banco de servidores"
        acoes={
          <Button type="default" onClick={abrirPainelDetalhes}>
            Mais detalhes
          </Button>
        }
      />

      <PainelMaisDetalhes
        aberto={painelDetalhesAberto}
        secoes={detalhes}
        aoFechar={fecharPainelDetalhes}
      />
    </>
  );
}

export default ServidoresVacanciados;
