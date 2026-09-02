import { render, screen } from "@testing-library/react";
import { ChipVagas } from "../index";

describe("ChipVagas", () => {
  it("mostra '+N disponíveis' em verde quando o saldo e positivo", () => {
    render(<ChipVagas saldo={5} />);
    const chip = screen.getByText("+5 disponíveis");
    expect(chip).toBeInTheDocument();
    expect(chip.closest("[data-situacao]")).toHaveAttribute(
      "data-situacao",
      "disponivel",
    );
  });

  it("mostra '-N excedentes' quando o saldo e negativo", () => {
    render(<ChipVagas saldo={-4} />);
    const chip = screen.getByText("-4 excedentes");
    expect(chip).toBeInTheDocument();
    expect(chip.closest("[data-situacao]")).toHaveAttribute(
      "data-situacao",
      "excedente",
    );
  });

  it("mostra 'Completo' quando o saldo e zero", () => {
    render(<ChipVagas saldo={0} />);
    const chip = screen.getByText("Completo");
    expect(chip).toBeInTheDocument();
    expect(chip.closest("[data-situacao]")).toHaveAttribute(
      "data-situacao",
      "completo",
    );
  });
});
