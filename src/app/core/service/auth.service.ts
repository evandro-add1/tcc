import { Injectable } from '@angular/core';
import { TipoUsuario, Usuario} from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  /*Usuário atualmente logado.
   Em uma aplicação real, essa informação
   seria obtida através de um token JWT.
   */
  private usuarioAtual: Usuario | null = null;

  //Usuários apenas para demonstração. n.p
  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Candidato',
      email: 'candidato@email.com',
      tipo: 'CANDIDATO'
    },

    {
      id: 2,
      nome: 'RH',
      email: 'rh@email.com',
      tipo: 'RH'
    },

    {
      id: 3,
      nome: 'Gestor',
      email: 'gestor@email.com',
      tipo: 'GESTOR'
    }
  ];

  //Realiza o login.
  login(email: string, senha: string): boolean {

    const usuario = this.usuarios.find(
        usuario => usuario.email === email
      );

    if (!usuario) {
      return false;
    }

    this.usuarioAtual = usuario;
    return true;
  }

  //Retorna o usuário atualmente logado.
  getUsuario(): Usuario | null {
    return this.usuarioAtual;
  }

  //Verifica se existe usuário logado.
  estaLogado(): boolean {
    return this.usuarioAtual !== null;
  }

  //Retorna o tipo do usuário.
  getTipoUsuario(): TipoUsuario | null {
    return this.usuarioAtual?.tipo ?? null;
  }

  //rh consegui ver os usuario do sistema
  listarCandidatos(): Usuario[] {
  return this.usuarios.filter(
    usuario => usuario.tipo === 'CANDIDATO'
  );
  }

  //Encerra a sessão.
  logout(): void {
    this.usuarioAtual = null;
  }

}
