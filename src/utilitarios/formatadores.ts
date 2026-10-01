/**
 * Formata um numero com zeros a esquerda.
 *
 * Usado nas colunas numericas das tabelas ("03", "08"). Numeros com mais
 * digitos que o minimo sao devolvidos sem alteracao.
 *
 * @example
 * formatarNumeroPadded(3)   // "03"
 * formatarNumeroPadded(105) // "105"
 */
export function formatarNumeroPadded(valor: number, digitos = 2): string {
  return String(valor).padStart(digitos, "0");
}

/* Acentos que o NFD separa das letras (U+0300 a U+036F). */
const MARCAS_DIACRITICAS = /[\u0300-\u036f]/g;

function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(MARCAS_DIACRITICAS, "");
}

/**
 * Normaliza um texto para comparacao: sem acentos, minusculo e com espacos
 * simples.
 *
 * @example
 * normalizarTexto("  João   Conceição ") // "joao conceicao"
 */
export function normalizarTexto(texto: string): string {
  return semAcento(texto).toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Mantem so os digitos do texto (remove a mascara de RF e CPF).
 *
 * @example
 * somenteDigitos("123.456.789-00") // "12345678900"
 */
export function somenteDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

/**
 * Formata o RF de 7 digitos como 123.456.7. Outros tamanhos voltam como
 * vieram.
 *
 * @example
 * formatarRf("1234567") // "123.456.7"
 */
export function formatarRf(rf: string): string {
  const digitos = somenteDigitos(rf);
  if (digitos.length !== 7) return rf;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
}

/**
 * Formata o CPF de 11 digitos como 123.456.789-01. Outros tamanhos voltam
 * como vieram.
 *
 * @example
 * formatarCpf("12345678901") // "123.456.789-01"
 */
export function formatarCpf(cpf: string): string {
  const digitos = somenteDigitos(cpf);
  if (digitos.length !== 11) return cpf;
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

export interface ParteTexto {
  texto: string;
  destaque: boolean;
}

/**
 * Divide o texto destacando a primeira ocorrencia do termo, sem diferenciar
 * acentos e maiusculas; os trechos mantem a grafia original.
 *
 * @example
 * partesDestacadas("João Lima", "joao")
 * // [{ texto: "João", destaque: true }, { texto: " Lima", destaque: false }]
 */
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
