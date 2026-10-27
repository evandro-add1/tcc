
import { Component, inject } from '@angular/core';
import { CursoService } from '../../../core/service/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class CursosComponent {
  //instância do serviço de cursos
  private cursoService = inject(CursoService);

  // Busca os cursos cadastrados no serviço.
  cursos = this.cursoService.listar();
}