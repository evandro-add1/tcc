//Representa uma vaga disponível no sistema.
export interface Vaga {

  id: number;
  titulo: string;
  empresa: string;
  descricao: string;
//informaca0
  requisitos: string[];
  //ID do gestor responsável pela vaga.
  gestorId: number;
  // Indica se a vaga está disponível.
  ativa: boolean;

}
