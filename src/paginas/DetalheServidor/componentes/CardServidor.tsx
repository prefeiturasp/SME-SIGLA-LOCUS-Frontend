import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Card, Col, Row } from "antd";
import { CardDescricao, CardValor, PaginaTextos, Tag } from "@/estilos";
import type { ServidorCadastro } from "../dados/dadosEstaticos";
import {
  CampoIdentificacao,
  DivisorCard,
  IconeDestaque,
  IdentidadeServidor,
  LinhaNome,
  RotuloCampo,
  ValorCampo,
} from "../Estilos";

export interface CardServidorProps {
  servidor: ServidorCadastro;
}

export function CardServidor({ servidor }: CardServidorProps) {
  const campos = [
    {
      rotulo: "Registro funcional (RF)",
      valor: servidor.registroFuncional,
      xl: 5,
    },
    { rotulo: "CPF", valor: servidor.cpf, xl: 5 },
    { rotulo: "Cargo atual", valor: servidor.cargoAtual, xl: 10 },
    { rotulo: "Código do cargo", valor: servidor.codigoCargo, xl: 4 },
  ];

  return (
    <Card>
      <IdentidadeServidor>
        <IconeDestaque aria-hidden>
          <PersonOutlineIcon />
        </IconeDestaque>
        <PaginaTextos>
          <LinhaNome>
            <CardValor>{servidor.nome}</CardValor>
            <Tag $variante="disponivel">{servidor.situacao}</Tag>
          </LinhaNome>
          <CardDescricao>{servidor.complemento}</CardDescricao>
        </PaginaTextos>
      </IdentidadeServidor>

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
