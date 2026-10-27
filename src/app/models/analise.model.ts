import { Curso } from './curso.model';

// Resultado da comparação entre um currículo e uma vaga.
export interface ResultadoAnalise {

  //Percentual de compatibilidade.
  compatibilidade: number;
//Requisitos encontrados no currículo.
  possui: string[];
// Requisitos que estão faltando.
  faltando: string[];
  cursosRecomendados: Curso[];

}
