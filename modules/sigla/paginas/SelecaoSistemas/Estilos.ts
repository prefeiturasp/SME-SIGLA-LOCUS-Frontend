import { createElement, type SVGProps } from "react";
import styled from "styled-components";

export const Pagina = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.appBackground};
`;

export const FundoOndas = styled.img`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  min-width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center bottom;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

export const Cabecalho = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg}px;
  height: ${({ theme }) => theme.layout.headerHeight}px;
  padding: 0 ${({ theme }) => theme.spacing.xl}px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBorder};
  box-shadow: ${({ theme }) => theme.layout.headerShadow};
  position: relative;
  z-index: 2;
`;

export const CabecalhoEsquerda = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const LogoSiglaCabecalho = styled.img`
  display: block;
  width: 91px;
  height: 28.16px;
  object-fit: contain;
  user-select: none;
`;

export const CabecalhoDireita = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  flex-shrink: 0;
`;

export const LogoPrefeituraCabecalho = styled.img`
  display: block;
  width: 135.34px;
  height: 135.34px;
  object-fit: contain;
  user-select: none;
`;

export const UsuarioBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 219px;
  height: 48px;
  padding: 6px 12px;
  border: 1px solid #dadada;
  border-radius: 4px;
  background: #f5f6f8;
  text-align: left;
  line-height: 1.2;
  overflow: hidden;
`;

export const UsuarioNome = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1c1d22;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const UsuarioRf = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #42474a;
  white-space: nowrap;
`;

export const BotaoSair = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: #929494;
  font-family: ${({ theme }) => theme.typography.fontFamilyRoboto};
  font-size: 14px;
  padding: 0;

  &:hover {
    opacity: 0.85;
  }
`;

export const IconeSair = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  & svg {
    font-size: 16px;
  }
`;

export const Conteudo = styled.main`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 110px ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.xl}px;
`;

export const ConteudoInterno = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1152px;
`;

export const Saudacao = styled.h1`
  margin: 0;
  width: 288px;
  height: 44px;
  font-family: "Open Sans", sans-serif;
  font-size: 32px;
  font-weight: 700;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #1c1d22;
  text-align: left;
  opacity: 1;
`;

export const TituloEscolha = styled.h2`
  margin: ${({ theme }) => theme.spacing.md}px 0 0;
  width: 370px;
  height: 27px;
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #1c1d22;
  text-align: left;
  opacity: 1;
`;

export const SubtituloEscolha = styled.p`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  width: 276px;
  height: 19px;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #1c1d22;
  text-align: left;
  opacity: 1;
`;

export const GradeSistemas = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 552px);
  gap: 48px;
  margin-top: 48px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 552px;
  }
`;

export const BotaoAcessar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 502px;
  max-width: 100%;
  height: 40px;
  margin-top: auto;
  padding: 0 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 700;
  transition: background 0.2s ease;

  & svg {
    font-size: 20px;
  }
`;

export const CardSistema = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 552px;
  height: 323px;
  padding: 0;
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #dadada;
  box-shadow: 0px 0px 40px 0px #1e1a480d;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  opacity: 1;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0px 8px 24px 0px rgba(0, 106, 106, 0.2);
    transform: translateY(-2px);
  }

  &:hover ${BotaoAcessar} {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 552px;
  }
`;

export const CardTopo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  box-sizing: border-box;
  height: 197px;
  padding: 32px 32px 24px;
  background: #ffffff;
`;

export const IconeSistema = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #d6eef7;
  color: #0068bc;
  flex-shrink: 0;

  & svg {
    width: 18px;
    height: 18px;
  }
`;

export const BlocoTitulo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 8px;
  /* Reserva a maior altura de logo (ALVO 48px) para alinhar subtítulos e divisores. */
  min-height: calc(48px + 8px + 1.35em);
`;

export const LogoSistema = styled.img<{ $largura: number; $altura: number }>`
  display: block;
  width: ${({ $largura }) => $largura}px;
  height: ${({ $altura }) => $altura}px;
  object-fit: contain;
  object-position: left bottom;
`;

export const NomeSistema = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.35;
  color: #1c1d22;
`;

export const Divisor = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid #dadada;
  width: 100%;
  flex-shrink: 0;
`;

export const CardRodape = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 552px;
  height: 125px;
  padding: 24px 25px;
  background: #f5f7fa;
  gap: 16px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const DescricaoSistema = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  color: #42474a;
`;

const svgBase: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

const traco = {
  stroke: "#0068BC",
  strokeWidth: 1.5,
};

export function IconeAlvo() {
  return createElement(
    "svg",
    svgBase,
    createElement("circle", { cx: 10, cy: 10, r: 7.25, ...traco }),
    createElement("circle", { cx: 10, cy: 10, r: 3.75, ...traco }),
    createElement("circle", { cx: 10, cy: 10, r: 1.5, fill: "#0068BC" }),
    createElement("path", { d: "M14.2 5.8L17 3", ...traco, strokeLinecap: "round" }),
    createElement("path", {
      d: "M15.6 3H17.2V4.6",
      ...traco,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  );
}

export function IconeLocus() {
  return createElement(
    "svg",
    svgBase,
    createElement("ellipse", { cx: 10, cy: 4.5, rx: 5.5, ry: 2.25, ...traco }),
    createElement("path", {
      d: "M4.5 4.5V9.5C4.5 10.74 6.96 11.75 10 11.75C13.04 11.75 15.5 10.74 15.5 9.5V4.5",
      ...traco,
    }),
    createElement("path", {
      d: "M4.5 9.5V14.5C4.5 15.74 6.96 16.75 10 16.75C13.04 16.75 15.5 15.74 15.5 14.5V9.5",
      ...traco,
    }),
  );
}
