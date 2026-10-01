import type { ServidorResumo } from "@/servicos/recursos/servidores/tipos";

/**
 * Servidores ficticios para a busca por nome, RF ou CPF. Os CPFs falham no
 * digito verificador de proposito.
 */
export const servidoresExemplo: ServidorResumo[] = [
  { rf: "7311452", nome: "Ana Beatriz Conceição Lima", cpf: "39145678201" },
  { rf: "7311460", nome: "João Pedro Araújo Santos", cpf: "28473619502" },
  { rf: "8123409", nome: "Maria Aparecida dos Santos", cpf: "51738204603" },
  { rf: "8123417", nome: "Maria Clara Souza Ribeiro", cpf: "62849315704" },
  { rf: "6540018", nome: "Carlos Eduardo Fernandes", cpf: "73950426805" },
  { rf: "6540026", nome: "Luciana Gonçalves Pereira", cpf: "84061537906" },
  { rf: "9087653", nome: "Paulo Henrique Moreira", cpf: "95172648007" },
  { rf: "9087661", nome: "Fernanda Oliveira Costa", cpf: "16283759108" },
  // Exemplo do Figma: "Gabriel Nascim" traz uma lista longa, com rolagem.
  { rf: "1234567", nome: "Gabriel Nascimento Arantes", cpf: "04578370802" },
  {
    rf: "1345678",
    nome: "Gabriel Nascimento Bragança de Almeida",
    cpf: "04999954495",
  },
  {
    rf: "1456789",
    nome: "Gabriel Nascimento Caruso Souza",
    cpf: "05421538070",
  },
  { rf: "1567890", nome: "Gabriel Nascimento de Andrade", cpf: "05843084699" },
  { rf: "1678901", nome: "Gabriel Nascimento Fagundes", cpf: "06264298205" },
  {
    rf: "1789012",
    nome: "Gabriel Nascimento Françozo Gomes",
    cpf: "06682181851",
  },
  { rf: "1891234", nome: "Gabriel Nascimento Gomes", cpf: "07070876191" },
  { rf: "1901234", nome: "Gabriel Nascimento Gumercindo", cpf: "07118349039" },
  { rf: "2012345", nome: "Gabriel Nascimento Hernandes", cpf: "07539932601" },
  { rf: "2123456", nome: "Gabriel Nascimento Souza Cruz", cpf: "07961516281" },
  { rf: "2234567", nome: "Gabriel Nascimento Souza Lima", cpf: "08383099844" },
  { rf: "2345678", nome: "Gabriel Nascimento Tavares", cpf: "08804683431" },
  { rf: "2456789", nome: "Gabriel Nascimento Teixeira", cpf: "09226267074" },
  { rf: "2567890", nome: "Gabriel Nascimento Toledo", cpf: "09647813601" },
  { rf: "2678901", nome: "Gabriel Nascimento Valente", cpf: "10069027243" },
  { rf: "2789012", nome: "Gabriel Nascimento Vasconcelos", cpf: "10486910807" },
  { rf: "2890123", nome: "Gabriel Nascimento Vieira", cpf: "10871494443" },
  { rf: "2901234", nome: "Gabriel Nascimento Xavier", cpf: "10923078003" },
  { rf: "3012345", nome: "Gabriel Nascimento Zanetti", cpf: "11344661611" },
  // Demais servidores.
  { rf: "4102385", nome: "Beatriz Helena Cardoso", cpf: "15388282512" },
  { rf: "4102393", nome: "Bruno Henrique Tavares", cpf: "15398785037" },
  { rf: "4215507", nome: "Camila Rodrigues Freitas", cpf: "15827779777" },
  { rf: "4215515", nome: "Daniel Ferreira Lopes", cpf: "15838282224" },
  { rf: "4328624", nome: "Débora Cristina Matos", cpf: "16267258450" },
  { rf: "4328632", nome: "Eduardo Lima Barbosa", cpf: "16277760956" },
  { rf: "4431746", nome: "Fábio Augusto Pinheiro", cpf: "16669755679" },
  { rf: "4431754", nome: "Gisele Almeida Prado", cpf: "16680258171" },
  { rf: "4544865", nome: "Helena Duarte Campos", cpf: "17109241794" },
  { rf: "4544873", nome: "Igor Santana Ribas", cpf: "17119744209" },
  { rf: "4657987", nome: "Juliana Prates Correia", cpf: "17548738987" },
  { rf: "4657995", nome: "Kátia Regina Moura", cpf: "17559241434" },
  { rf: "4761108", nome: "Leonardo Batista Silveira", cpf: "17951232492" },
  { rf: "4761116", nome: "Natália Fonseca Reis", cpf: "17961734954" },
  { rf: "4874220", nome: "Otávio Mendes Guedes", cpf: "18390692601" },
  { rf: "4874238", nome: "Patrícia Lopes Vieira", cpf: "18401232148" },
  { rf: "4987341", nome: "Rafael Antunes Coelho", cpf: "18830186172" },
  { rf: "4987359", nome: "Sílvia Helena Brandão", cpf: "18840725696" },
  { rf: "5090463", nome: "Thiago Rezende Farias", cpf: "19232683335" },
  { rf: "5090471", nome: "Vanessa Cunha Albuquerque", cpf: "19243185803" },
];
