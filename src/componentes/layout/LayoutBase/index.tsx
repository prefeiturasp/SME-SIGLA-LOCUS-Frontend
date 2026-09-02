import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuLateral } from "@/componentes/layout/MenuLateral";
import { TopoBar } from "@/componentes/layout/TopoBar";
import { RodapeBar } from "@/componentes/layout/RodapeBar";
import estilos from "./estilos.module.css";

const { Header, Content, Footer } = Layout;

export function LayoutBase() {
  return (
    <Layout className={estilos.layout} hasSider>
      <MenuLateral />
      <Layout className={estilos.corpo}>
        <Header style={{ padding: 0 }}>
          <TopoBar />
        </Header>
        <Content className={estilos.conteudo}>
          <div className={estilos.conteudoInterno}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ padding: 0 }}>
          <RodapeBar />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutBase;
