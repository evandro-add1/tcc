import { Injectable } from "@angular/core";
import { RecomendacaoCurso } from "../../models/recomendacao-curso.model";

@Injectable({
    providedIn: 'root'
})
export class RecomendacaoCursoService {
    private recomendacoes: RecomendacaoCurso[] = [];

    //registrar uma recomendação do rh
    recomendar(
        cursoId: number,
        candidatoId: number,
        motivo: string
    ): void{
        this.recomendacoes.push({
            id: Date.now(),
            cursoId,
            candidatoId,
            motivo,
            data: new Date().toISOString()
        });
    }
    //recomendacao do candidato especifico.
    listarPorCandidato(candidatoId:number): RecomendacaoCurso[]{
        return this.recomendacoes.filter(
            recomendacao => recomendacao.candidatoId === candidatoId
        );
    }
    //retornar todas as recomendação
    listarTodas(): RecomendacaoCurso[] {
        return this.recomendacoes;
    }
}
