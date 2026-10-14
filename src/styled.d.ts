import "styled-components";
import type { Tema } from "@/estilos/tokens/tokens";

declare module "styled-components" {
  // Permite o tema do modulo Sigla (chaves extras) sem alterar o tema do Locus.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Tema {
    colors: Tema["colors"] & Record<string, string>;
    typography: Tema["typography"] & Record<string, string | number>;
    spacing: Tema["spacing"] & Record<string, number>;
    layout: Tema["layout"] & Record<string, string | number>;
  }
}
