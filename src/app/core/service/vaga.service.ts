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
      gestorId: 3,
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
      gestorId: 3,
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
      gestorId: 2,
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

  //procurar vaga pelo id de quem mandou
  listarPorGestor(gestorId: number): Vaga[]{
    return this.vagas.filter(
      vaga => vaga.gestorId === gestorId
    );
  }

  //cadastrar vagas
  cadastrar(vaga: Omit<Vaga,'id'>): void{
    this.vagas.push({
      id: Date.now(),
      ...vaga
    });
  }
  //atualizar vagas
  atualizar(vagaAtualizada: Vaga): void {
    const indice = this.vagas.findIndex(
      vaga => vaga.id === vagaAtualizada.id
    );
    if (indice !== 1){
      this.vagas[indice] = vagaAtualizada;
    }
  }
  //ativar ou encerrar vagas
  alterarStatus(id: number,ativa:boolean): void{
    const vaga = this.buscarPorId(id);
    if(vaga){
      vaga.ativa = ativa;
    }
  }
}
