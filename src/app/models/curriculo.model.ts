//Representa o currículo de um candidato
export interface Curriculo {
  id: number;
  //ID do usuário dono do currículo.
  usuarioId: number;
  //informacao
  conhecimentos: string[];
  experiencia: string;
  formacao: string;
}
