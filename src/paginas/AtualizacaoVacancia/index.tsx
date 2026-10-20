import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { PaginaErro } from "@/componentes/PaginaErro";
import { ConteudoPagina } from "@/estilos";
import { CardBuscarServidor } from "@/paginas/AtualizacaoRegistroFuncional/componentes/CardBuscarServidor";
import { useAtualizacaoRegistroFuncional } from "@/paginas/AtualizacaoRegistroFuncional/hooks/useAtualizacaoRegistroFuncional";
import { caminhoAtualizacaoVacanciaServidor } from "@/rotas/caminhos";

export function AtualizacaoVacancia() {
  const {
    termo,
    sugestoes,
    erroBusca,
    semResultado,
    buscando,
    alterarTermo,
    selecionarServidor,
    buscarServidor,
  } = useAtualizacaoRegistroFuncional(caminhoAtualizacaoVacanciaServidor);

  return (
    <>
      <CabecalhoPagina
        titulo="Vacância"
        descricao="Pesquise pelo nome, RF ou CPF para consultar o cadastro funcional."
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

export default AtualizacaoVacancia;
