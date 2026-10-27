import { Injectable } from '@angular/core';
import { Curso } from '../../models/curso.model';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  //Cursos cadastrados pela academia/RH.
  private cursos: Curso[] = [
    {
      id: 1,
      nome: 'Curso de TypeScript',
      descricao:
        'Curso para aprender os fundamentos do TypeScript.',
      categoria: 'Programação',
      conhecimentos: [
        'TypeScript'
      ]
    },

    {
      id: 2,
      nome: 'Curso de Angular',
      descricao:
        'Curso de desenvolvimento de aplicações com Angular.',
      categoria: 'Programação',
      conhecimentos: [
        'Angular'
      ]
    },

    {
      id: 3,
      nome: 'Curso de SQL',
      descricao:
        'Curso sobre bancos de dados relacionais.',
      categoria: 'Banco de Dados',
      conhecimentos: [
        'SQL'
      ]
    },

    {
      id: 4,
      nome: 'Curso de Git',
      descricao:
        'Curso de controle de versão utilizando Git.',
      categoria: 'Ferramentas',
      conhecimentos: [
        'Git'
      ]

    }

  ];

  // Retorna todos os cursos.
  listar(): Curso[] {
    return this.cursos;

  }
  cadastrar(curso: Omit< Curso,'id'>): void{
    this.cursos.push({
      id: Date.now(),
      ...curso
    });
  }
}
