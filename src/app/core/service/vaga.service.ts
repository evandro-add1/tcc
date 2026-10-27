import { Injectable } from '@angular/core';
import { Vaga } from '../../models/vaga.model';

@Injectable({
  providedIn: 'root'
})

export class VagaService {

  /**
   * Por enquanto estamos utilizando dados mockados.
   * Futuramente essa lista virá da API C#.
   */
  private vagas: Vaga[] = [
    {
      id: 1,
      titulo: 'Desenvolvedor Angular',
      empresa: 'Empresa X',
      descricao:
        'Desenvolvimento de aplicações web utilizando Angular.',
      requisitos: [
        'Angular',
        'TypeScript',
        'HTML',
        'CSS'
      ],
      gestorId: 1,
      ativa: true
    },

    {
      id: 2,
      titulo: 'Desenvolvedor C#',
      empresa: 'Empresa Y',
      descricao:
        'Desenvolvimento de APIs utilizando C# e .NET.',
      requisitos: [
        'C#',
        '.NET',
        'SQL',
        'Git'
      ],
      gestorId: 1,
      ativa: true
    }

  ];

  //retorna as vagas
  listar(): Vaga[] {
    return this.vagas;
  }

  //Procura uma vaga pelo ID.
  buscarPorId(id: number): Vaga | undefined {
    return this.vagas.find(vaga => vaga.id === id);
  }

}
