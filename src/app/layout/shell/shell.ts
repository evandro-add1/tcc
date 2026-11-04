import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ThemeService } from '../../core/theme/theme.service';
import { TipoUsuario } from '../../models/usuario.model';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell implements OnInit {
  private readonly title = inject(Title);
  readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly usuario = this.auth.getUsuario();
  readonly links = this.linksFor(this.auth.getTipoUsuario());
  readonly home = this.links[0]?.path ?? '/login';

  ngOnInit(): void {
    const nome = this.usuario?.nome;
    this.title.setTitle(nome ? `Talento - ${nome}` : 'Talento');
  }

  sair(): void {
    this.title.setTitle('Talento - Login');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private linksFor(tipo: TipoUsuario | null): NavLink[] {
    if (tipo === 'RH') {
      return [
        { path: '/rh/dashboard', label: 'Painel' },
        { path: '/rh/cursos', label: 'Cursos' },
        { path: '/rh/categorias', label: 'Categorias' },
        { path: '/rh/candidatos', label: 'Candidatos' },
      ];
    }
    if (tipo === 'GESTOR') {
      return [
        { path: '/gestor/dashboard', label: 'Painel' },
        { path: '/gestor/vagas', label: 'Vagas' },
      ];
    }
    return [
      { path: '/candidato/dashboard', label: 'Painel' },
      { path: '/candidato/curriculo', label: 'Currículo' },
      { path: '/candidato/vagas', label: 'Vagas' },
      { path: '/candidato/cursos', label: 'Cursos' },
    ];
  }
}