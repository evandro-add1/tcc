import { Component, inject} from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/service/auth.service";
import { CurriculoService } from "../../../core/service/curriculo.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-candidatos',
  styleUrl: './candidatos.css',
  templateUrl: './candidatos.html',
})
export class Candidatos {
  private authService = inject(AuthService)
  private curriculoService = inject(CurriculoService)

  //lista candidatos
  candidatos = this.authService.listarCandidatos();

  //guardar candidato
  candidatoSelecionado: any = null;

  //ver curriculo candidato
  visualizarCurriculo(candidato: any): void{
    const curriculo = this.curriculoService.buscarPorUsuario(
      candidato.id
    );
    this.candidatoSelecionado = {
      ...candidato,
      curriculo: curriculo
    };
  }
  //fechar visualização
  fecharCurriculo(): void{
    this.candidatoSelecionado =null;
  }
}
