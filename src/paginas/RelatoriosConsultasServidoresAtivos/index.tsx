import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ConteudoPagina } from "@/estilos";
import { CardFormFiltrosServidores } from "./componentes/CardFormFiltrosServidores";
import { CardTabelaServidores } from "./componentes/CardTabelaServidores";
import { PainelMaisDetalhes } from "./componentes/PainelMaisDetalhes";
import { PainelPersonalizarColunas } from "./componentes/PainelPersonalizarColunas";
import { useColunasServidores } from "./hooks/useColunasServidores";
import { useServidoresAtivos } from "./hooks/useServidoresAtivos";

export function ServidoresAtivos() {
  const estado = useServidoresAtivos();
  const colunas = useColunasServidores();

  return (
    <>
      <CabecalhoPagina titulo="Banco de servidores" />
      <ConteudoPagina>
        <CardFormFiltrosServidores
          aoBuscar={estado.buscarServidores}
          aoLimpar={estado.limparFiltros}
        />
        {estado.buscaRealizada ? (
          <CardTabelaServidores
            servidores={estado.servidores}
            total={estado.totalServidores}
            colunasVisiveis={colunas.colunasVisiveis}
            aoPersonalizarColunas={colunas.abrirPainel}
            aoVerDetalhes={estado.abrirPainelDetalhes}
          />
        ) : null}
      </ConteudoPagina>

      <PainelMaisDetalhes
        aberto={estado.painelDetalhesAberto}
        secoes={estado.detalhes}
        aoFechar={estado.fecharPainelDetalhes}
      />

      <PainelPersonalizarColunas
        aberto={colunas.painelAberto}
        colunas={colunas.colunas}
        selecao={colunas.selecao}
        limite={colunas.limite}
        exibirAlertaLimite={colunas.alertaLimite}
        aoAlternar={colunas.alternarColuna}
        aoSalvar={colunas.salvar}
        aoFechar={colunas.fecharPainel}
      />
    </>
  );
}

export default ServidoresAtivos;
