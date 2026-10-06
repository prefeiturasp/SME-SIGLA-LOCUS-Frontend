import { Button, DatePicker, Form } from "antd";
import { PainelLateral } from "@/componentes/PainelLateral";
import { FormItem, SelectForm, TextAreaForm } from "@/estilos";
import { opcoesMotivoAtualizacao } from "../dados/dadosEstaticos";
import type { EstadoRegistrarAtualizacao } from "../hooks/useRegistrarAtualizacao";

export interface PainelRegistrarAtualizacaoProps {
  estado: EstadoRegistrarAtualizacao;
}

export function PainelRegistrarAtualizacao({
  estado,
}: PainelRegistrarAtualizacaoProps) {
  return (
    <PainelLateral
      aberto={estado.aberto}
      titulo="Registrar atualização"
      descricao="Informe o motivo e a data do documento para registrar as alterações no histórico."
      aoFechar={estado.fechar}
      rodape={
        <>
          <Button type="default" onClick={estado.fechar}>
            Cancelar
          </Button>
          <Button type="primary" onClick={estado.registrar}>
            Registrar atualização
          </Button>
        </>
      }
    >
      <Form layout="vertical">
        <FormItem
          label="Motivo da atualização"
          validateStatus={estado.erroMotivo ? "error" : undefined}
          help={estado.erroMotivo}
        >
          <SelectForm
            aria-label="Motivo da atualização"
            status={estado.erroMotivo ? "error" : undefined}
            placeholder="Selecione"
            showSearch
            optionFilterProp="label"
            value={estado.motivo}
            onChange={(valor) =>
              estado.alterarMotivo(valor as string | undefined)
            }
            options={opcoesMotivoAtualizacao}
          />
        </FormItem>

        <FormItem
          label="Data do documento"
          htmlFor="data-documento-atualizacao"
          validateStatus={estado.erroDataDocumento ? "error" : undefined}
          help={estado.erroDataDocumento}
        >
          <DatePicker
            id="data-documento-atualizacao"
            format="DD/MM/YYYY"
            placeholder="00/00/0000"
            status={estado.erroDataDocumento ? "error" : undefined}
            value={estado.dataDocumento}
            onChange={estado.alterarDataDocumento}
            style={{ width: "100%" }}
          />
        </FormItem>

        <FormItem
          label="Documento (opcional)"
          htmlFor="documento-atualizacao"
          style={{ marginBottom: 0 }}
        >
          <TextAreaForm
            id="documento-atualizacao"
            placeholder="Exemplo: Portaria nº 123/2026"
            value={estado.documento}
            onChange={(evento) => estado.alterarDocumento(evento.target.value)}
            style={{ resize: "none" }}
          />
        </FormItem>
      </Form>
    </PainelLateral>
  );
}

export default PainelRegistrarAtualizacao;
