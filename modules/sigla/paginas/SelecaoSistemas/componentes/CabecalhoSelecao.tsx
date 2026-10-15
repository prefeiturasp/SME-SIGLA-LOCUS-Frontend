import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useNavigate } from "react-router-dom";
import tituloSigla from "@sigla/assets/titulo_login.svg";
import logoPrefeitura from "@sigla/assets/logo-prefeitura.png";
import {
  encerrarSessao,
  obterUsuarioLogado,
} from "@sigla/servicos/recursos/autenticacao";
import { CAMINHOS } from "@sigla/rotas/caminhos";
import {
  BotaoSair,
  Cabecalho,
  CabecalhoDireita,
  CabecalhoEsquerda,
  IconeSair,
  LogoPrefeituraCabecalho,
  LogoSiglaCabecalho,
  UsuarioBox,
  UsuarioNome,
  UsuarioRf,
} from "../Estilos";

export function CabecalhoSelecao() {
  const navigate = useNavigate();
  const usuario = obterUsuarioLogado();

  const aoSair = () => {
    encerrarSessao(() => navigate(CAMINHOS.login, { replace: true }));
  };

  return (
    <Cabecalho>
      <CabecalhoEsquerda>
        <LogoSiglaCabecalho src={tituloSigla} alt="SIGLA" />
      </CabecalhoEsquerda>

      <CabecalhoDireita>
        <LogoPrefeituraCabecalho
          src={logoPrefeitura}
          alt="Prefeitura de São Paulo"
        />
        <UsuarioBox>
          <UsuarioNome>{usuario.nome}</UsuarioNome>
          <UsuarioRf>RF: {usuario.rf || "—"}</UsuarioRf>
        </UsuarioBox>
        <BotaoSair type="button" onClick={aoSair} aria-label="Sair">
          <IconeSair aria-hidden>
            <PowerSettingsNewOutlinedIcon fontSize="inherit" />
          </IconeSair>
          Sair
        </BotaoSair>
      </CabecalhoDireita>
    </Cabecalho>
  );
}

export default CabecalhoSelecao;
