import { Button } from "antd";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ConteudoPagina } from "@/estilos";
import { CardFormFiltrosServidores } from "./componentes/CardFormFiltrosServidores";
import { CardTabelaServidores } from "./componentes/CardTabelaServidores";
import { PainelMaisDetalhes } from "./componentes/PainelMaisDetalhes";
import { useServidoresAtivos } from "./hooks/useServidoresAtivos";

export function ServidoresAtivos() {
  const estado = useServidoresAtivos();

  return (
    <>
      <CabecalhoPagina
        titulo="Banco de servidores"
        acoes={
          <Button type="default" onClick={estado.abrirPainelDetalhes}>
            Mais detalhes
          </Button>
        }
      />
      <ConteudoPagina>
        <CardFormFiltrosServidores
          aoBuscar={estado.buscarServidores}
          aoLimpar={estado.limparFiltros}
        />
        {estado.buscaRealizada ? (
          <CardTabelaServidores
            servidores={estado.servidores}
            total={estado.totalServidores}
            colunas={estado.colunas}
            colunasVisiveis={estado.colunasVisiveis}
            aoAlterarColuna={estado.definirVisibilidadeColuna}
            aoVerDetalhes={estado.abrirPainelDetalhes}
          />
        ) : null}
      </ConteudoPagina>

      <PainelMaisDetalhes
        aberto={estado.painelDetalhesAberto}
        secoes={estado.detalhes}
        aoFechar={estado.fecharPainelDetalhes}
      />
    </>
  );
}

export default ServidoresAtivos;
