import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DatePicker, Form } from "antd";
import type { Dayjs } from "dayjs";
import { encerramentoEstatico } from "../dados/dadosEstaticos";
import { AvisoVacancia } from "../Estilos";

export interface CardEncerramentoProps {
  dataEscolha: Dayjs | null;
}

export function CardEncerramento({ dataEscolha }: CardEncerramentoProps) {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Data da escolha"
        htmlFor="data-escolha-encerramento"
        help={encerramentoEstatico.ajuda}
        style={{ marginBottom: 0 }}
      >
        <DatePicker
          id="data-escolha-encerramento"
          format="DD/MM/YYYY"
          placeholder="00/00/0000"
          allowClear={false}
          inputReadOnly
          value={dataEscolha}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <AvisoVacancia
        type="error"
        showIcon
        icon={<InfoOutlinedIcon fontSize="small" />}
        message={encerramentoEstatico.aviso}
      />
    </Form>
  );
}

export default CardEncerramento;
