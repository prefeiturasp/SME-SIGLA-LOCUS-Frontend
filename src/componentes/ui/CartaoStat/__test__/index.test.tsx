import { render, screen } from "@testing-library/react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { CartaoStat } from "../index";

describe("CartaoStat", () => {
  it("renderiza valor, rotulo e legenda", () => {
    render(
      <CartaoStat
        valor={105}
        rotulo="Módulos"
        legenda="Quantidade de professores alocados"
        icone={<GroupsOutlinedIcon />}
      />,
    );

    expect(screen.getByText("105")).toBeInTheDocument();
    expect(screen.getByText("Módulos")).toBeInTheDocument();
    expect(
      screen.getByText("Quantidade de professores alocados"),
    ).toBeInTheDocument();
  });
});
