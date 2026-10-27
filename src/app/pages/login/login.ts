import { Component, inject } from '@angular/core';
import{
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  //injeta formBuilder
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  //form login
  loginForm= this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    senha:[
      '',
      [
        Validators.required
      ]
    ]
  });
  //realiza login
  entrar(): void {
    //caso invalido
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const email = this.loginForm.value.email ?? '';
    const senha = this.loginForm.value.senha ?? '';
    const sucesso = this.authService.login(email, senha);
    if (!sucesso){
      alert(
        'Usuario não encontrado.'
      );
      return;
    }
    //Descobrir o tipo de usuario
    const tipo = this.authService.getTipoUsuario();
    //redirecionar
    if(tipo === 'CANDIDATO') {
      this.router.navigate([
        '/candidato/vagas'
      ])
    }
    else if (tipo === 'RH') {
      this.router.navigate([
        '/rh/dashboard'
      ]);
    }
    else if( tipo === 'GESTOR') {
      this.router.navigate([
        '/gestor/dashboard'
      ]);
    }
  }
}
