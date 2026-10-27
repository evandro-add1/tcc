import { Injectable } from '@angular/core';
import { Curriculo } from '../../models/curriculo.model';
import { Vaga } from '../../models/vaga.model';
import { Curso } from '../../models/curso.model';
import { ResultadoAnalise } from '../../models/analise.model';

@Injectable({
  providedIn: 'root'
})

export class AnaliseService {

  /**
   * Analisa o currículo comparando os conhecimentos
   * do candidato com os requisitos da vaga.
   */
  analisar(
    curriculo: Curriculo,
    vaga: Vaga,
    cursos: Curso[]
  ): ResultadoAnalise {

    const possui: string[] = [];
    const faltando: string[] = [];
    //Percorremos todos os requisitos da vaga.
    vaga.requisitos.forEach(requisito => {
      /*Procuramos o requisito dentro dos conhecimentos
       existentes no currículo.
       O toLowerCase() permite comparar: diferenciar caracter 
       */
      const encontrado =
        curriculo.conhecimentos.some(
          conhecimento => conhecimento.toLowerCase() === requisito.toLowerCase()
        );
      /* Se encontrou o conhecimento,
       colocamos na lista "possui" ou "faltando".
      */
      if (encontrado) {
        possui.push(requisito);
      } else {
        faltando.push(requisito);
      }

    });

    //Quantidade total de requisitos da vaga.
    const totalRequisitos =
      vaga.requisitos.length;

    /*Calculamos a porcentagem de compatibilidade.
     3 / 4 * 100 = 75%
     */
    const compatibilidade = totalRequisitos === 0 ? 0: 
    Math.round(
      (possui.length / totalRequisitos) * 100
          );

    //Procuramos conhecimentos que estão faltando.
     
    const cursosRecomendados =
      cursos.filter(curso => curso.conhecimentos.some(
          conhecimento => faltando.some(
            requisito => requisito.toLowerCase() === conhecimento.toLowerCase()
            )
        )
      );
    //Retornamos todos os resultados da análise.
    return {
      compatibilidade,
      possui,
      faltando,
      cursosRecomendados
    };
  }
}
