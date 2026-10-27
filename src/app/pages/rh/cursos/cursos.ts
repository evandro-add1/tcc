import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/service/auth.service';
import { CursoService } from "../../../core/service/curso.service";
import { RecomendacaoCursoService } from "../../../core/service/recomendacao-curso.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})

export class Cursos {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cursoService = inject(CursoService);
  private recomendacaoService = inject(RecomendacaoCursoService);

  cursos = this.cursoService.listar();
  candidatos = this.authService.listarCandidatos();
  //validacao para cadastrar o curso
  cursoForm = this.fb.group({
    nome: ['',Validators.required],
    descricao: ['',Validators.required],
    categoria: ['',Validators.required],
    conhecimentos: ['',Validators.required],
  });
  //validacao tem o candidato e recomendaçoes
  recomendacaoForm = this.fb.group({
    cursoId: [null as number | null, Validators.required],
    candidatoId: [null as number | null, Validators.required],
    motivo: ['', Validators.required]
  });

  cadastrarCurso(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }
    //organizando dados do curso
    const dados = this.cursoForm.getRawValue();
    this.cursoService.cadastrar({
      nome: dados.nome ?? '',
      descricao: dados.descricao ?? '',
      categoria: dados.categoria ?? '',
      conhecimentos: (dados.conhecimentos ?? '')
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0)
    });

    this.cursos = this.cursoService.listar();
    this.cursoForm.reset();

    alert('Curso cadastrado cum Sucesso!');
  }

  recomendarCurso(): void{
    if(this.recomendacaoForm.invalid){
      this.recomendacaoForm.markAllAsTouched();
      return;
      
    }
    const dados = this.recomendacaoForm.getRawValue();
    if(dados.cursoId === null || dados.candidatoId ===null){
      return;

    }
    this.recomendacaoForm.reset();
    alert('Curso recomendao ao candidato com Sucesso!')
  }

}
