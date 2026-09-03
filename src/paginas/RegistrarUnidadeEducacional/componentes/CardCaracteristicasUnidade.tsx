import { Typography } from "antd";
import {
  AreaMunicipalizada,
  CabecalhoItemCaracteristica,
  CampoAnoMunicipalizacao,
  CampoMotivoNaoContabilizacao,
  CardFormulario,
  DescricaoItemCaracteristica,
  ItemCaracteristica,
  SelectAnoMunicipalizacao,
  TextAreaForm,
  TituloItemCaracteristica,
  Toggle,
} from "@/estilos";
import {
  caracteristicasUnidade,
  opcoesRegistrarUnidadeEducacional,
  type CaracteristicasPadrao,
} from "../dados/dadosEstaticos";
import type { DadosUnidade } from "../hooks/useRegistrarUnidadeEducacional";

const { Title, Paragraph } = Typography;

export interface CardCaracteristicasUnidadeProps {
  caracteristicas: CaracteristicasPadrao;
  dados: DadosUnidade;
  erroMotivoNaoContabilizacao?: string;
  aoAlternar: (chave: keyof CaracteristicasPadrao) => void;
  aoAtualizarDados: (
    campo: keyof DadosUnidade,
    valor: string | undefined,
  ) => void;
}

export function CardCaracteristicasUnidade({
  caracteristicas,
  dados,
  erroMotivoNaoContabilizacao,
  aoAlternar,
  aoAtualizarDados,
}: CardCaracteristicasUnidadeProps) {
  return (
    <CardFormulario>
      <Title level={4} style={{ marginTop: 0 }}>
        Características da unidade educacional
      </Title>
      <Paragraph>
        Selecione as características que se aplicam a esta unidade educacional.
      </Paragraph>

      <div>
        {caracteristicasUnidade.map((item) => {
          const exibeCampoAno = item.exibeAnoMunicipalizacao;
          const anoMunicipalizacaoHabilitado =
            exibeCampoAno && caracteristicas.escolaMunicipalizada;
          const exibeMotivoNaoContabilizacao =
            item.exibeMotivoNaoContabilizacao &&
            !caracteristicas.contabilizarUE;

          return (
            <ItemCaracteristica key={item.chave}>
              <CabecalhoItemCaracteristica>
                <TituloItemCaracteristica>{item.titulo}</TituloItemCaracteristica>
                <Toggle
                  checked={caracteristicas[item.chave]}
                  onChange={() => aoAlternar(item.chave)}
                  aria-label={item.titulo}
                />
              </CabecalhoItemCaracteristica>

              {exibeCampoAno ? (
                <AreaMunicipalizada>
                  <DescricaoItemCaracteristica>
                    {item.descricao}
                  </DescricaoItemCaracteristica>
                  <CampoAnoMunicipalizacao
                    label="Ano da municipalização"
                    layout="vertical"
                    style={{ marginBottom: 0 }}
                  >
                    <SelectAnoMunicipalizacao
                      id="ano-municipalizacao"
                      aria-label="Ano da municipalização"
                      placeholder="Selecione"
                      allowClear
                      disabled={!anoMunicipalizacaoHabilitado}
                      value={dados.anoMunicipalizacao}
                      onChange={(valor) =>
                        aoAtualizarDados(
                          "anoMunicipalizacao",
                          valor as string | undefined,
                        )
                      }
                      options={
                        opcoesRegistrarUnidadeEducacional.anoMunicipalizacao
                      }
                    />
                  </CampoAnoMunicipalizacao>
                </AreaMunicipalizada>
              ) : (
                <DescricaoItemCaracteristica>
                  {item.descricao}
                </DescricaoItemCaracteristica>
              )}

              {exibeMotivoNaoContabilizacao ? (
                <CampoMotivoNaoContabilizacao
                  label="Por que a unidade não deve ser contabilizada?"
                  layout="vertical"
                  required
                  validateStatus={
                    erroMotivoNaoContabilizacao ? "error" : undefined
                  }
                  help={erroMotivoNaoContabilizacao}
                  style={{ marginBottom: 0 }}
                >
                  <TextAreaForm
                    status={erroMotivoNaoContabilizacao ? "error" : undefined}
                    aria-label="Por que a unidade não deve ser contabilizada?"
                    aria-required
                    aria-invalid={Boolean(erroMotivoNaoContabilizacao)}
                    placeholder="Digite o motivo da não contabilização..."
                    value={dados.motivoNaoContabilizacao}
                    onChange={(e) =>
                      aoAtualizarDados(
                        "motivoNaoContabilizacao",
                        e.target.value,
                      )
                    }
                  />
                </CampoMotivoNaoContabilizacao>
              ) : null}
            </ItemCaracteristica>
          );
        })}
      </div>
    </CardFormulario>
  );
}

export default CardCaracteristicasUnidade;
