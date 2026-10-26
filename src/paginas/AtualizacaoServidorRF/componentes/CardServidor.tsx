import type { ReactNode } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Card, Col, Row } from "antd";
import {
  CardDescricao,
  CardValor,
  PaginaTextos,
  Tag,
  type VarianteTag,
} from "@/estilos";
import type { ServidorCadastro } from "../dados/dadosEstaticos";
import {
  CampoIdentificacao,
  DivisorCard,
  FaixaIdentidade,
  IconeDestaque,
  IdentidadeServidor,
  LateralCard,
  LinhaCampos,
  LinhaNome,
  RotuloCampo,
  ValorCampo,
} from "../Estilos";

export interface CardServidorProps {
  servidor: ServidorCadastro;
  rotuloCargo?: string;
  varianteSituacao?: VarianteTag;
  lateral?: ReactNode;
}

export function CardServidor({
  servidor,
  rotuloCargo = "Cargo atual",
  varianteSituacao = "disponivel",
  lateral,
}: CardServidorProps) {
  const campos = [
    {
      rotulo: "Registro funcional (RF)",
      valor: servidor.registroFuncional,
      xl: 5,
    },
    { rotulo: "CPF", valor: servidor.cpf, xl: 5 },
    { rotulo: rotuloCargo, valor: servidor.cargoAtual, xl: 10 },
    { rotulo: "Código do cargo", valor: servidor.codigoCargo, xl: 4 },
  ];

  const identidade = (
    <IdentidadeServidor $comLateral={Boolean(lateral)}>
      <IconeDestaque aria-hidden>
        <PersonOutlineIcon />
      </IconeDestaque>
      <PaginaTextos>
        <LinhaNome>
          <CardValor>{servidor.nome}</CardValor>
          <Tag $variante={varianteSituacao}>{servidor.situacao}</Tag>
        </LinhaNome>
        <CardDescricao>{servidor.complemento}</CardDescricao>
      </PaginaTextos>
      {lateral ? <LateralCard>{lateral}</LateralCard> : null}
    </IdentidadeServidor>
  );

  if (lateral) {
    return (
      <Card>
        <FaixaIdentidade>{identidade}</FaixaIdentidade>
        <LinhaCampos>
          {campos.map((campo) => (
            <CampoIdentificacao key={campo.rotulo}>
              <RotuloCampo>{campo.rotulo}</RotuloCampo>
              <ValorCampo>{campo.valor}</ValorCampo>
            </CampoIdentificacao>
          ))}
        </LinhaCampos>
      </Card>
    );
  }

  return (
    <Card>
      {identidade}
      <DivisorCard />
      <Row gutter={[16, 16]}>
        {campos.map((campo) => (
          <Col key={campo.rotulo} xs={24} md={12} xl={campo.xl}>
            <CampoIdentificacao>
              <RotuloCampo>{campo.rotulo}</RotuloCampo>
              <ValorCampo>{campo.valor}</ValorCampo>
            </CampoIdentificacao>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default CardServidor;
