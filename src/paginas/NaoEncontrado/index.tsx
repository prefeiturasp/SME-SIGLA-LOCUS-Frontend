import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { CAMINHOS } from "@/rotas/caminhos";

export function NaoEncontrado() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="A página que você procura não foi encontrada."
      extra={
        <Link to={CAMINHOS.cadastroGestaoUnidades}>
          <Button type="primary">Voltar ao início</Button>
        </Link>
      }
    />
  );
}

export default NaoEncontrado;
