import { Checkbox } from "antd";
import type {
  ChaveColunaServidor,
  DefinicaoColunaServidor,
} from "../dados/dadosEstaticos";
import {
  ItemColunaSeletor,
  ListaColunasSeletor,
  TituloSeletorColunas,
} from "../Estilos";

export interface SeletorColunasServidoresProps {
  colunas: DefinicaoColunaServidor[];
  aoAlterar: (chave: ChaveColunaServidor, visivel: boolean) => void;
}

export function SeletorColunasServidores({
  colunas,
  aoAlterar,
}: SeletorColunasServidoresProps) {
  const opcoes = colunas
    .filter((coluna) => !coluna.fixa)
    .slice()
    .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));

  return (
    <div>
      <TituloSeletorColunas>Colunas da tabela de servidores</TituloSeletorColunas>
      <ListaColunasSeletor>
        {opcoes.map((coluna) => (
          <ItemColunaSeletor key={coluna.chave}>
            <Checkbox
              checked={coluna.visivel}
              onChange={(evento) =>
                aoAlterar(coluna.chave, evento.target.checked)
              }
            >
              {coluna.titulo}
            </Checkbox>
          </ItemColunaSeletor>
        ))}
      </ListaColunasSeletor>
    </div>
  );
}

export default SeletorColunasServidores;
