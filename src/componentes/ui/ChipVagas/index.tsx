import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { situacaoDoSaldo } from "@/servicos/recursos/unidadesEducacionais/tipos";
import estilos from "./estilos.module.css";

export interface ChipVagasProps {
  /** Saldo de vagas: positivo = disponiveis, negativo = excedentes, 0 = completo. */
  saldo: number;
}

/**
 * Chip colorido da coluna "Vagas" da tabela de unidades educacionais.
 * Verde para vagas disponiveis, vermelho para excedentes, cinza para completo.
 */
export function ChipVagas({ saldo }: ChipVagasProps) {
  const situacao = situacaoDoSaldo(saldo);

  const { Icone, texto } = {
    disponivel: {
      Icone: CheckCircleOutlinedIcon,
      texto: `+${saldo} disponíveis`,
    },
    excedente: {
      Icone: TrendingDownOutlinedIcon,
      texto: `${saldo} excedentes`,
    },
    completo: {
      Icone: RemoveCircleOutlineOutlinedIcon,
      texto: "Completo",
    },
  }[situacao];

  return (
    <span className={estilos.chip} data-situacao={situacao}>
      <Icone fontSize="inherit" aria-hidden />
      {texto}
    </span>
  );
}

export default ChipVagas;
