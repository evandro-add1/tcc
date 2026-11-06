import { Component, inject } from '@angular/core';

import { VagaService } from '../../../core/service/vaga.service';

import { CurriculoService } from '../../../core/service/curriculo.service';

import { CursoService } from '../../../core/service/curso.service';

import { AnaliseService } from '../../../core/service/analise.service';

import { AuthService } from '../../../core/service/auth.service';

import { Vaga } from '../../../models/vaga.model';

import { ResultadoAnalise } from '../../../models/analise.model';

@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [],
  templateUrl: './vagas.html',
  styleUrl: './vagas.css'
})
export class VagasComponent {

  private vagaService =
    inject(VagaService);

  private curriculoService =
    inject(CurriculoService);

  private cursoService =
    inject(CursoService);

  private analiseService =
    inject(AnaliseService);

  private authService =
    inject(AuthService);

  //Lista de vagas.
  vagas: Vaga[] =
    this.vagaService.listar();

  //Resultado da última análise realizada.
  resultado: ResultadoAnalise | null = null;

  // Analisa uma determinada vaga.
  analisarVaga(vaga: Vaga): void {
    const usuario =
      this.authService.getUsuario();

    if (!usuario) {
      return;

    }

    // Busca o currículo do candidato.
    const curriculo =
      this.curriculoService.buscarPorUsuario(
        usuario.id
      );

    if (!curriculo) {
      alert(
        'Cadastre seu currículo primeiro.'
      );
      return;
    }

    //Busca os cursos disponíveis.
    const cursos =
      this.cursoService.listar();

    //Executa a análise.
    this.resultado =
      this.analiseService.analisar(
        curriculo,
        vaga,
        cursos
      );

  }

}