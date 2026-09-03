import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  BotaoAcaoInline,
  CampoComAjuda,
  CampoFormulario,
  CampoFormularioControle,
  ColunaFormulario,
  FormularioEmLinha,
  GrupoCampo,
  InputCampo,
  LinhaCampoAcao,
  SelectCampo,
  TextoAjudaCampo,
} from "@/estilos";
import { opcoesRegistrarUnidadeEducacional } from "../dados/dadosEstaticos";

export interface FormularioAdicionarComponenteCurricularProps {
  componenteSelecionado?: string;
  quantidadeModulos: string;
  erroComponenteCurricular?: string;
  aoSelecionarComponente: (valor?: string) => void;
  aoAlterarQuantidade: (valor: string) => void;
  aoAdicionar: () => void;
}

export function FormularioAdicionarComponenteCurricular({
  componenteSelecionado,
  quantidadeModulos,
  erroComponenteCurricular,
  aoSelecionarComponente,
  aoAlterarQuantidade,
  aoAdicionar,
}: FormularioAdicionarComponenteCurricularProps) {
  return (
    <FormularioEmLinha>
      <ColunaFormulario>
        <CampoFormulario
          label="Componente curricular"
          layout="vertical"
          validateStatus={erroComponenteCurricular ? "error" : undefined}
          help={erroComponenteCurricular}
          style={{ marginBottom: 0 }}
        >
          <SelectCampo
            aria-label="Componente curricular"
            status={erroComponenteCurricular ? "error" : undefined}
            placeholder="Selecione"
            allowClear
            value={componenteSelecionado}
            onChange={(valor) =>
              aoSelecionarComponente(valor as string | undefined)
            }
            options={opcoesRegistrarUnidadeEducacional.componenteCurricular}
          />
        </CampoFormulario>
      </ColunaFormulario>

      <ColunaFormulario>
        <CampoFormularioControle
          label="Quantidade de módulos"
          layout="vertical"
          style={{ marginBottom: 0 }}
        >
          <LinhaCampoAcao>
            <GrupoCampo>
              <CampoComAjuda>
                <InputCampo
                  placeholder="Exemplo: 10"
                  value={quantidadeModulos}
                  onChange={(e) => aoAlterarQuantidade(e.target.value)}
                  inputMode="numeric"
                  disabled={!componenteSelecionado}
                />
                <TextoAjudaCampo>
                  Quantidade total de vagas previstas para este componente. O
                  valor mínimo é&nbsp;0
                </TextoAjudaCampo>
              </CampoComAjuda>
            </GrupoCampo>
            <BotaoAcaoInline
              icon={<AddRoundedIcon fontSize="small" />}
              onClick={aoAdicionar}
            >
              Adicionar componente
            </BotaoAcaoInline>
          </LinhaCampoAcao>
        </CampoFormularioControle>
      </ColunaFormulario>
    </FormularioEmLinha>
  );
}

export default FormularioAdicionarComponenteCurricular;
