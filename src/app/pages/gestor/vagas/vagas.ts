import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { VagaService } from '../../../core/service/vaga.service';

import { AuthService } from '../../../core/service/auth.service';

import { Vaga } from '../../../models/vaga.model';

@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vagas.html',
  styleUrl: './vagas.css'
})
export class VagasComponent {

  private vagaService = inject(VagaService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  vagas: Vaga[] = [];

  //Guardar a vaga
  vagaEditando: number | null = null;

  //formulario de cadastrar /editar
  vagaForm = this.fb.group({
    titulo: ['', Validators.required],
    empresa: ['', Validators.required],
    descricao: ['', Validators.required],
    requisitos: ['', Validators.required]
  });
  constructor(){
    this.carregarVagas();
  }
  //carregar a vagas do gestor logado
  carregarVagas(): void {
    const usuario = this.authService.getUsuario();

    if (!usuario || usuario.tipo !== 'GESTOR'){
      this.vagas = [];
      return;
    }
    this.vagas = this.vagaService.listarPorGestor(usuario.id);
  }
  //cadatrar ou atualizar
  salvarVaga(): void{
    if(this.vagaForm.invalid){
      this.vagaForm.markAllAsTouched();
      return;
    }
    const usuario = this.authService.getUsuario();

    if(!usuario || usuario.tipo !== 'GESTOR'){
      alert('Apenas o gestor pode gerenciar.');
      return;
    }
    const dados =this.vagaForm.getRawValue();
    const requisitos = (dados.requisitos ?? '').split(',').map(item => item.trim()).filter(item => item.length > 0);

    if(this.vagaEditando !== null){
      const vaga = this.vagaService.buscarPorId(this.vagaEditando);
      if(!vaga || vaga.gestorId !== usuario.id){
        alert('Vaga não encontarda ou sem permissão.');
        return;
      }

      this.vagaService.atualizar({
        ...vaga,
        titulo: dados.titulo ?? '',
        empresa: dados.empresa ?? '',
        descricao: dados.descricao ?? '',
        requisitos
      });
      alert('Vaga atualizada com sucesso!')

    }else {
      this.vagaService.cadastrar({
        titulo: dados.titulo ?? '',
        empresa: dados.empresa ?? '',
        descricao: dados.descricao ?? '',
        requisitos,
        gestorId: usuario.id,
        ativa: true
      });
      alert('Vaga cadastrada com sucesso!')
    }

    this.limparFormulario();
    this.carregarVagas();
  }
  editarVaga(vaga: Vaga): void{
    this.vagaEditando = vaga.id;

    this.vagaForm.patchValue({
      titulo: vaga.titulo,
      empresa: vaga.empresa,
      descricao: vaga.descricao,
      requisitos: vaga.requisitos.join(',')
    });
  }
  //encerra ou reniciar a vaga
  alterarStatus(vaga: Vaga):void{
    this.vagaService.alterarStatus(vaga.id, !vaga.ativa);
    this.carregarVagas();
  }

  //limpar form
  limparFormulario(): void{
    this.vagaForm.reset();
    this.vagaEditando = null;
  }
}