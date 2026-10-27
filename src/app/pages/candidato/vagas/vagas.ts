import { Component, inject } from '@angular/core';
import {VagaService} from '../../../core/service/vaga.service';

import {CurriculoService} from '../../../core/service/curriculo.service';
import {CursoService} from '../../../core/service/curso.service';

import {AnaliseService} from '../../../core/service/analise.service';
import {AuthService} from '../../../core/service/auth.service';

import {Vaga} from '../../../models/vaga.model';
import {ResultadoAnalise} from '../../../models/analise.model';


@Component({
  imports: [],
  selector: 'app-vagas',
  standalone: true,
  styleUrl: './vagas.css',
  templateUrl: './vagas.html',
})
export class Vagas {

  private vagaService = inject(VagaService);
  private curriculoService = inject(CurriculoService);
  private cursoService = inject(CursoService);
  private analiseService = inject(AnaliseService);
  private authService = inject(AuthService);

  //lista vagas
  vagas: Vaga[] = this.vagaService.listar();
  //resultado ultimo analise
  resultado: ResultadoAnalise | null = null;
  //analisar determinada vaga
  analisarVaga(vaga: Vaga): void {
    const usuario = this.authService.getUsuario();
    
    if (!usuario) {
      return;
    }
    //buscar curriculo
    const curriculo = this.curriculoService.buscarPorUsuario(
      usuario.id
    );
    if (!curriculo){
      alert('Cadastre seu currículo primeiro');
      return;
    }
    //buscar cursos
    const cursos = this.cursoService.listar();
    //analise
    this.resultado = this.analiseService.analisar(
      curriculo,
      vaga,
      cursos
    );
  }
}
