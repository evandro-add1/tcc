// Define os tipos de usuários existentes no sistema.
export type TipoUsuario = 'CANDIDATO' | 'RH' | 'GESTOR';

export interface Usuario {

  id: number;

  nome: string;

  email: string;

  tipo: TipoUsuario;

}