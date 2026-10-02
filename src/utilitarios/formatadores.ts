
export function formatarNumeroPadded(valor: number, digitos = 2): string {
  return String(valor).padStart(digitos, "0");
}


const MARCAS_DIACRITICAS = /[\u0300-\u036f]/g;

function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(MARCAS_DIACRITICAS, "");
}


export function normalizarTexto(texto: string): string {
  return semAcento(texto).toLowerCase().replace(/\s+/g, " ").trim();
}


export function somenteDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

const SO_NUMERO_E_MASCARA = /^[\d.\-\s]+$/;


export function ehTermoNumerico(termo: string): boolean {
  return SO_NUMERO_E_MASCARA.test(termo) && somenteDigitos(termo) !== "";
}


export function formatarRf(rf: string): string {
  const digitos = somenteDigitos(rf);
  if (digitos.length !== 7) return rf;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
}


export function formatarCpf(cpf: string): string {
  const digitos = somenteDigitos(cpf);
  if (digitos.length !== 11) return cpf;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

export interface ParteTexto {
  texto: string;
  destaque: boolean;
}

export function partesDestacadas(texto: string, termo: string): ParteTexto[] {
  const busca = semAcento(termo.trim()).toLowerCase();
  const caracteres = [...texto];

  // Indice no texto normalizado -> indice do caractere original.
  let normalizado = "";
  const origem: number[] = [];
  caracteres.forEach((caractere, indice) => {
    const parte = semAcento(caractere).toLowerCase();
    normalizado += parte;
    origem.push(...Array.from(parte, () => indice));
  });

  const inicio = busca ? normalizado.indexOf(busca) : -1;
  if (inicio < 0) return [{ texto, destaque: false }];

  const de = origem[inicio];
  const ate = origem[inicio + busca.length - 1] + 1;

  return [
    { texto: caracteres.slice(0, de).join(""), destaque: false },
    { texto: caracteres.slice(de, ate).join(""), destaque: true },
    { texto: caracteres.slice(ate).join(""), destaque: false },
  ].filter((parte) => parte.texto);
}

export function partesDestacadasPorDigitos(
  textoFormatado: string,
  termo: string,
): ParteTexto[] {
  const digitos = ehTermoNumerico(termo) ? somenteDigitos(termo) : "";

  if (!digitos || !somenteDigitos(textoFormatado).startsWith(digitos)) {
    return [{ texto: textoFormatado, destaque: false }];
  }


  let ate = 0;
  for (let cobertos = 0; cobertos < digitos.length; ate += 1) {
    if (/\d/.test(textoFormatado[ate])) cobertos += 1;
  }

  return [
    { texto: textoFormatado.slice(0, ate), destaque: true },
    { texto: textoFormatado.slice(ate), destaque: false },
  ].filter((parte) => parte.texto);
}
