import styled from "styled-components";
import tituloLogin from "@sigla/assets/titulo_login.svg";

const Logo = styled.img`
  display: block;
  width: auto;
  height: 62px;
  user-select: none;
`;

export function LogoSigla() {
  return <Logo src={tituloLogin} alt="SIGLA" />;
}

export default LogoSigla;
