import type { ReactNode } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  BlocoTitulo,
  BotaoAcessar,
  CardRodape,
  CardSistema as CardLink,
  CardTopo,
  DescricaoSistema,
  Divisor,
  IconeSistema,
  LogoSistema,
  NomeSistema,
} from "../Estilos";

export interface CardSistemaProps {
  href: string;
  icone: ReactNode;
  logoSrc: string;
  logoAlt: string;
  logoLargura: number;
  logoAltura: number;
  nomeCompleto: string;
  descricao: string;
  rotuloBotao: string;
}

export function CardSistema({
  href,
  icone,
  logoSrc,
  logoAlt,
  logoLargura,
  logoAltura,
  nomeCompleto,
  descricao,
  rotuloBotao,
}: CardSistemaProps) {
  return (
    <CardLink href={href}>
      <CardTopo>
        <IconeSistema aria-hidden>{icone}</IconeSistema>
        <BlocoTitulo>
          <LogoSistema
            src={logoSrc}
            alt={logoAlt}
            $largura={logoLargura}
            $altura={logoAltura}
          />
          <NomeSistema>{nomeCompleto}</NomeSistema>
        </BlocoTitulo>
      </CardTopo>

      <Divisor />

      <CardRodape>
        <DescricaoSistema>{descricao}</DescricaoSistema>
        <BotaoAcessar>
          {rotuloBotao}
          <ArrowForwardIcon fontSize="inherit" />
        </BotaoAcessar>
      </CardRodape>
    </CardLink>
  );
}

export default CardSistema;
