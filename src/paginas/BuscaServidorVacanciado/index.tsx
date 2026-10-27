import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ModalBase } from "@/componentes/ModalBase";
import { PaginaErro } from "@/componentes/PaginaErro";
import { ConteudoPagina } from "@/estilos";
import { CardBuscarServidor } from "@/paginas/BuscaServidorRF/componentes/CardBuscarServidor";
import { useAtualizacaoRegistroFuncional } from "@/paginas/BuscaServidorRF/hooks/useAtualizacaoRegistroFuncional";
import { caminhoAtualizacaoVacanciaServidor } from "@/rotas/caminhos";
import { usePerfilReativado } from "./hooks/usePerfilReativado";

export function BuscaServidorVacanciado() {
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
  const perfilReativado = usePerfilReativado();

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

      <ModalBase
        aberto={perfilReativado.aberto}
        titulo="Perfil reativado!"
        mensagem={
          <>
            Você pode conferir ou atualizar as informações do servidor clicando
            em <strong>“pesquisar por RF”</strong>.
          </>
        }
        textoAcaoSecundaria="Pesquisar por RF"
        aoAcaoSecundaria={perfilReativado.pesquisarPorRF}
        textoConfirmar="Fechar"
        confirmarPrimario
        aoConfirmar={perfilReativado.fechar}
        aoCancelar={perfilReativado.fechar}
      />
    </>
  );
}

export default BuscaServidorVacanciado;
