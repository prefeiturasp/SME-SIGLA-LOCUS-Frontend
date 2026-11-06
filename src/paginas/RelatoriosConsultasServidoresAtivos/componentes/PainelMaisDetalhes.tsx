import { Button } from "antd";
import { PainelLateral } from "@/componentes/PainelLateral";
import { CardTitulo } from "@/estilos";
import type { SecaoDetalheServidor } from "../dados/dadosEstaticos";
import {
  CabecalhoSecaoDetalhes,
  CampoDetalhe,
  CamposSecaoDetalhes,
  DescricaoSecaoDetalhes,
  ListaSecoesDetalhes,
  RotuloCampoDetalhe,
  SecaoDetalhes,
  ValorCampoDetalhe,
} from "../Estilos";

export interface PainelMaisDetalhesProps {
  aberto: boolean;
  secoes: SecaoDetalheServidor[];
  aoFechar: () => void;
}

export function PainelMaisDetalhes({
  aberto,
  secoes,
  aoFechar,
}: PainelMaisDetalhesProps) {
  return (
    <PainelLateral
      aberto={aberto}
      titulo="Mais detalhes"
      descricao="Confira todos os dados do servidor selecionado."
      aoFechar={aoFechar}
      rodape={
        <Button type="primary" onClick={aoFechar}>
          Fechar
        </Button>
      }
    >
      <ListaSecoesDetalhes>
        {secoes.map((secao) => (
          <SecaoDetalhes key={secao.titulo} aria-label={secao.titulo}>
            <CabecalhoSecaoDetalhes>
              <CardTitulo>{secao.titulo}</CardTitulo>
              <DescricaoSecaoDetalhes>{secao.descricao}</DescricaoSecaoDetalhes>
            </CabecalhoSecaoDetalhes>
            <CamposSecaoDetalhes $colunas={3}>
              {secao.campos.map((campo) => (
                <CampoDetalhe key={campo.rotulo}>
                  <RotuloCampoDetalhe>{campo.rotulo}</RotuloCampoDetalhe>
                  <ValorCampoDetalhe>{campo.valor}</ValorCampoDetalhe>
                </CampoDetalhe>
              ))}
            </CamposSecaoDetalhes>
          </SecaoDetalhes>
        ))}
      </ListaSecoesDetalhes>
    </PainelLateral>
  );
}

export default PainelMaisDetalhes;
