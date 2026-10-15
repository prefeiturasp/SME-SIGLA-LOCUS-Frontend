import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { PaginaErro } from "@/componentes/PaginaErro";
import { ConteudoPagina } from "@/estilos";
import { CardBuscarServidor } from "./componentes/CardBuscarServidor";
import { useAtualizacaoRegistroFuncional } from "./hooks/useAtualizacaoRegistroFuncional";

export function AtualizacaoRegistroFuncional() {
  const {
    termo,
    sugestoes,
    erroBusca,
    semResultado,
    buscando,
    alterarTermo,
    selecionarServidor,
    buscarServidor,
  } = useAtualizacaoRegistroFuncional();

  return (
    <>
      <CabecalhoPagina
        titulo="Atualização por registro funcional (RF)"
        descricao="Consulte ou atualize os dados funcionais de uma pessoa servidora."
      />

      <ConteudoPagina>
        <CardBuscarServidor
          termo={termo}
          sugestoes={sugestoes}
          erroBusca={erroBusca}
          buscando={buscando}
          aoAlterarTermo={alterarTermo}
          aoSelecionarServidor={selecionarServidor}
          aoBuscar={buscarServidor}
        />

        {semResultado ? (
          <PaginaErro
            titulo="Não encontramos nenhuma pessoa"
            descricao="Verifique se os dados inseridos estão corretos e tente novamente."
            margemTopo={0}
          />
        ) : null}
      </ConteudoPagina>
    </>
  );
}

export default AtualizacaoRegistroFuncional;
