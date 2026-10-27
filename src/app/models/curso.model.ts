
//Representa um curso que pode ser recomendado ao candidato
export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  //Conhecimentos desenvolvidos pelo curso.
  conhecimentos: string[];

}
