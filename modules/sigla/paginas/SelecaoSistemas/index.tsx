import logoAlvo from "@sigla/assets/logo-alvo-sigla.svg";
import logoLocus from "@sigla/assets/logo-locus-sigla.svg";
import ondasRodape from "@sigla/assets/ondas-tela-selecao-sistema.svg";
import {
  obterUsuarioLogado,
  nomeSaudacaoDoUsuario,
} from "@sigla/servicos/recursos/autenticacao";
import { CabecalhoSelecao } from "./componentes/CabecalhoSelecao";
import { CardSistema } from "./componentes/CardSistema";
import {
  Conteudo,
  ConteudoInterno,
  FundoOndas,
  GradeSistemas,
  IconeAlvo,
  IconeLocus,
  Pagina,
  Saudacao,
  SubtituloEscolha,
  TituloEscolha,
} from "./Estilos";

const URL_ALVO = "/alvo/";
const URL_LOCUS = "/locus/";

export function SelecaoSistemas() {
  const usuario = obterUsuarioLogado();
  const nomeSaudacao = nomeSaudacaoDoUsuario(usuario.nome);

  return (
    <Pagina>
      <FundoOndas src={ondasRodape} alt="" aria-hidden />
      <CabecalhoSelecao />
      <Conteudo>
        <ConteudoInterno>
          <Saudacao>Olá, {nomeSaudacao}</Saudacao>
          <TituloEscolha>Escolha o sistema que deseja acessar</TituloEscolha>
          <SubtituloEscolha>
            Selecione uma das opções para continuar
          </SubtituloEscolha>

          <GradeSistemas>
            <CardSistema
              href={URL_ALVO}
              icone={<IconeAlvo />}
              logoSrc={logoAlvo}
              logoAlt="ALVO"
              logoLargura={139.25}
              logoAltura={48}
              nomeCompleto="Alocação de Vagas Online"
              descricao="Gerencie a alocação e o preenchimento de vagas."
              rotuloBotao="Acessar ALVO"
            />
            <CardSistema
              href={URL_LOCUS}
              icone={<IconeLocus />}
              logoSrc={logoLocus}
              logoAlt="LOCUS"
              logoLargura={149.7}
              logoAltura={35}
              nomeCompleto="Lotação e Controle Unificado de Servidores"
              descricao="Gerencie a lotação e consulte informações dos servidores."
              rotuloBotao="Acessar LOCUS"
            />
          </GradeSistemas>
        </ConteudoInterno>
      </Conteudo>
    </Pagina>
  );
}

export default SelecaoSistemas;
