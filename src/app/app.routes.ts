import { Routes } from '@angular/router';
import { authGuard } from './core/guards/autenticacao.guards';

export const routes: Routes = [
    //pafina inicial
    {
        path: '',                                           
        redirectTo:'login',
        pathMatch:'full'
    },
    //login
    {
        path: 'login',
        loadComponent: () => 
            import('./pages/login/login').then(
            //modulo => modulo.login
            m => m.Login
        )
    },
    //area candidato
    {
        path: 'candidato',
        canActivate: [authGuard],
        children: [
            {
                path:'curriculo',
                loadComponent: () => import('./pages/candidato/curriculo/curriculo').then( 
                    m => m.Curriculo
                )
            },
        
            {
                path: 'vagas',
                loadComponent: () => import('./pages/candidato/vagas/vagas').then(
                    m => m.Vagas
                )
            },
            {

            path: 'cursos',
            loadComponent: () => import('./pages/candidato/cursos/cursos').then(
                m => m.CursosComponent
            )
            }
        ]
    },
    {
        //rh
        path: 'rh',
        canActivate: [authGuard],
        children: [
            {
                path:'dashboard', loadComponent:() => import('./pages/rh/dashboard/dashboard').then(
                    m => m.Dashboard
                )
            },
            {
                path: 'cursos',
                loadComponent: () => import('./pages/rh/cursos/cursos').then(
                    m => m.Cursos
                )
            },
            {
                path:'categorias',
                loadComponent: () => import('./pages/rh/categorias/categorias').then(
                    m => m.Categorias
                )
            }
        ]
    },
    {
        //area gestor
        path: 'gestor',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/gestor/dashboard/dashboard').then(
                    m => m.Dashboard
                )
            },
            {
                path:'vagas',
                loadComponent:() => import('./pages/gestor/vagas/vagas').then(
                    m => m.VagasComponent
                )
            }
        ]
    },
    //se não achar voltar a login
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
