import "styled-components";
import type { Tema } from "@/estilos/tokens/tokens";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Tema {}
}
