import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import {
  CAMINHOS,
  caminhoAtualizacaoRegistroFuncional,
} from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { servidorEstatico } from "../dados/dadosEstaticos";
import { DetalheServidor } from "../index";

function renderNaCasca(rf = servidorEstatico.registroFuncional) {
  return render(
    <ComProvedores rota={caminhoAtualizacaoRegistroFuncional(rf)}>
      <Routes>
        <Route element={<LayoutBase />}>
          <Route
            path={CAMINHOS.cadastroAtualizacaoRegistroFuncional}
            element={<DetalheServidor />}
          />
        </Route>
      </Routes>
    </ComProvedores>,
  );
}

describe("DetalheServidor", () => {
  it("renderiza o cadastro estatico dentro do layout", () => {
    renderNaCasca();

    expect(
      screen.getByRole("heading", {
        name: "Atualização por registro funcional (RF)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Consulte ou atualize os dados funcionais de uma pessoa servidora.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Nova atualização" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Histórico de atualizações" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Gabriel Nascimento Arantes")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
    expect(
      screen.getByText("Cadastro funcional individual"),
    ).toBeInTheDocument();
    expect(screen.getByText("123.456.7")).toBeInTheDocument();
    expect(screen.getByText("123.456.789-10")).toBeInTheDocument();
    expect(
      screen.getByText("Professor de Educação Infantil e Ensino Fundamental I"),
    ).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Informações do cadastro" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dados funcionais")).toBeInTheDocument();
    expect(screen.getByText("Atividade")).toBeInTheDocument();
    expect(screen.getByText("Lotação e exercício")).toBeInTheDocument();
    expect(screen.getByText("Dados do concurso")).toBeInTheDocument();
    expect(screen.getByText("Informações adicionais")).toBeInTheDocument();
    expect(screen.getByText("Readaptação funcional")).toBeInTheDocument();
    expect(screen.getByText("Encerramento do vínculo")).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(within(breadcrumb).getByText("Início")).toBeInTheDocument();
    expect(within(breadcrumb).getByText("Cadastro")).toBeInTheDocument();
    expect(within(breadcrumb).getByText("Atualização")).toBeInTheDocument();
    expect(
      within(breadcrumb).getByText("Por registro funcional (RF)"),
    ).toBeInTheDocument();
  });

  it("abre cada secao dentro da pagina", async () => {
    renderNaCasca();

    const abrir = async (nome: RegExp) => {
      const secao = screen.getByRole("button", { name: nome });
      await userEvent.click(secao);
      expect(secao).toHaveAttribute("aria-expanded", "true");
      return secao.closest(".ant-collapse-item") as HTMLElement;
    };

    const funcionais = await abrir(/Dados funcionais/);
    expect(within(funcionais).getByLabelText("CL")).toHaveValue("01");
    expect(
      within(funcionais).getByRole("combobox", {
        name: "Situação funcional do cargo base",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const atividade = await abrir(/Atividade atual/);
    expect(within(atividade).getByText("Vaga definitiva")).toBeInTheDocument();
    expect(
      within(atividade).getByLabelText("Data de retorno do afastamento"),
    ).toHaveAttribute("placeholder", "00/00/0000");
    expect(
      within(atividade).getByRole("switch", { name: "Realocado" }),
    ).not.toBeChecked();

    const lotacao = await abrir(/Lotação e exercício/);
    expect(within(lotacao).getByLabelText("Código EOL")).toHaveValue(
      "123.456.7",
    );
    expect(within(lotacao).getByLabelText("Tipo")).toHaveValue("EMEF");
    expect(
      within(lotacao).getByLabelText("Diretoria Regional de Educação"),
    ).toHaveValue("DRE Butantã");
    expect(within(lotacao).getByText("Definitiva")).toBeInTheDocument();

    const concurso = await abrir(/Dados do concurso/);
    expect(within(concurso).getByLabelText("Classificação geral")).toHaveValue(
      "142",
    );
    expect(
      within(concurso).getByLabelText("Classificação NNA"),
    ).toHaveAttribute("placeholder", "Exemplo: 100");
    expect(within(concurso).getByLabelText("Data da convocação")).toHaveValue(
      "12/02/2021",
    );

    const adicionais = await abrir(/Informações adicionais/);
    expect(
      within(adicionais).getByText(
        "Indique se há liminar relacionada ao cadastro.",
      ),
    ).toBeInTheDocument();
    expect(
      within(adicionais).getByRole("switch", { name: "Liminar" }),
    ).not.toBeChecked();

    const readaptacao = await abrir(/Readaptação funcional/);
    expect(within(readaptacao).getAllByText("Selecione")).toHaveLength(2);

    const encerramento = await abrir(/Encerramento do vínculo/);
    expect(within(encerramento).getByLabelText("Data da escolha")).toHaveValue(
      "22/02/2021",
    );
    expect(
      within(encerramento).getByText(
        "Ao informar a data, esta pessoa aparecerá somente em Vacância.",
      ),
    ).toBeInTheDocument();
  });
});
