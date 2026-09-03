import { render, screen } from "@testing-library/react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { CartaoStat } from "../CartaoStat";
import { ComTema } from "@/testes/renderizarComTema";

describe("CartaoStat", () => {
  it("renderiza valor, rotulo e legenda", () => {
    render(
      <ComTema>
        <CartaoStat
          valor={105}
          rotulo="Módulos"
          legenda="Quantidade de professores alocados"
          icone={<GroupsOutlinedIcon />}
        />
      </ComTema>,
    );

    expect(screen.getByText("105")).toBeInTheDocument();
    expect(screen.getByText("Módulos")).toBeInTheDocument();
    expect(
      screen.getByText("Quantidade de professores alocados"),
    ).toBeInTheDocument();
  });
});
