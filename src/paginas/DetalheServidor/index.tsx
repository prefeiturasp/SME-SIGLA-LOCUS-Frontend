import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "antd";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ConteudoPagina } from "@/estilos";
import { CardServidor } from "./componentes/CardServidor";
import { ListaInformacoesCadastro } from "./componentes/ListaInformacoesCadastro";
import { PainelRegistrarAtualizacao } from "./componentes/PainelRegistrarAtualizacao";
import { useDetalheServidor } from "./hooks/useDetalheServidor";
import { useRegistrarAtualizacao } from "./hooks/useRegistrarAtualizacao";

export function DetalheServidor() {
  const estado = useDetalheServidor();
  const atualizacao = useRegistrarAtualizacao();

  return (
    <>
      <CabecalhoPagina
        titulo="Atualização por registro funcional (RF)"
        descricao="Consulte ou atualize os dados funcionais de uma pessoa servidora."
        acoes={
          <>
            <Button
              type="primary"
              icon={<AddRoundedIcon fontSize="small" />}
              onClick={atualizacao.abrir}
            >
              Nova atualização
            </Button>
            <Button
              type="default"
              icon={<AccessTimeOutlinedIcon fontSize="small" />}
            >
              Histórico de atualizações
            </Button>
          </>
        }
      />

      <ConteudoPagina>
        <CardServidor servidor={estado.servidor} />
        <ListaInformacoesCadastro estado={estado} />
      </ConteudoPagina>

      <PainelRegistrarAtualizacao estado={atualizacao} />
    </>
  );
}

export default DetalheServidor;
