import { Routes } from '@angular/router';
import { authGuard } from './core/guards/autenticacao.guards';

const shell = () => import('./layout/shell/shell').then((m) => m.Shell);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'candidato',
    canActivate: [authGuard],
    loadComponent: shell,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/candidato/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'curriculo',
        loadComponent: () =>
          import('./pages/candidato/curriculo/curriculo').then((m) => m.Curriculo),
      },
      {
        path: 'vagas',
        loadComponent: () => import('./pages/candidato/vagas/vagas').then((m) => m.Vagas),
      },
      {
        path: 'cursos',
        loadComponent: () =>
          import('./pages/candidato/cursos/cursos').then((m) => m.CursosComponent),
      },
    ],
  },
  {
    path: 'rh',
    canActivate: [authGuard],
    loadComponent: shell,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/rh/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'cursos',
        loadComponent: () => import('./pages/rh/cursos/cursos').then((m) => m.Cursos),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./pages/rh/categorias/categorias').then((m) => m.Categorias),
      },
      {
        path: 'candidatos',
        loadComponent: () =>
          import('./pages/rh/candidatos/candidatos').then((m) => m.Candidatos),
      },
    ],
  },
  {
    path: 'gestor',
    canActivate: [authGuard],
    loadComponent: shell,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/gestor/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'vagas',
        loadComponent: () =>
          import('./pages/gestor/vagas/vagas').then((m) => m.VagasComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
