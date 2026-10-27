import { Component, inject } from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {CurriculoService} from '../../../core/service/curriculo.service'

import {AuthService} from '../../../core/service/auth.service'

@Component({
  selector: 'app-curriculo',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './curriculo.html',
  styleUrl: './curriculo.css'
})

export class Curriculo {
  private formBuilder = inject(FormBuilder);
  private curriculoService = inject(CurriculoService);
  private authService = inject(AuthService);

//FORM curriculo
  curriculoForm = this.formBuilder.group({
    conhecimentos: ['', Validators.required],
    experiencia:['', Validators.required],
    formacao:['', Validators.required]
  });
  //salvar o curriculo
  salvar (): void {
    if (this.curriculoForm.invalid){
      this.curriculoForm.markAllAsTouched();
      return;
    }

    const usuario = this.authService.getUsuario();
    if(!usuario){
      alert('Faça login antes de cadastrar o currículo.');
      return;
    }

    //trasformar formação em lista
    const conhecimentoTexto = this.curriculoForm.value.conhecimentos ?? '';

    const conhecimentos = conhecimentoTexto
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);

    //procurando, evitar duplicidade
    const curriculoExistente =
      this.curriculoService.buscarPorUsuario(usuario.id);

    if (curriculoExistente) {
      alert('Já existe um currículo cadastrado para este usuário.');
      return;
    }

    this.curriculoService.salvar({
      id: Date.now(),
      usuarioId: usuario.id,
      conhecimentos: conhecimentos,
      experiencia: this.curriculoForm.value.experiencia ??'',
      formacao: this.curriculoForm.value.formacao ?? ''
    });

    alert('Curriculo cadastrado com sucesso!');
  }
}
