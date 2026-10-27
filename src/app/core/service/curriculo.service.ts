import { Injectable } from '@angular/core';
import { Curriculo } from '../../models/curriculo.model';

@Injectable({
  providedIn: 'root'
})

export class CurriculoService {

  // Currículos cadastrados. Em produção isso virá do banco de dados.
  private curriculos: Curriculo[] = [

    {
      id: 1,
      usuarioId: 1,
      conhecimentos: [
        'Angular',
        'JavaScript',
        'HTML',
        'CSS'
      ],
      experiencia:
        'Desenvolvimento de aplicações web.',
      formacao:
        'Técnico em Desenvolvimento de Sistemas'
    }

  ];

  //Busca o currículo de um determinado usuário.
  buscarPorUsuario(usuarioId: number): Curriculo | undefined {

    return this.curriculos.find(
      curriculo => curriculo.usuarioId === usuarioId
    );

  }

  //Salva um novo currículo.
  salvar(curriculo: Curriculo): void {
    this.curriculos.push(curriculo);
  }

}
