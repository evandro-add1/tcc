import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    // Mantém a inicialização que você já tinha
    this.themeService.theme();

    // Cria um efeito que roda automaticamente toda vez que o sinal "theme" muda
    effect(() => {
      // Usamos a propriedade que você mesmo criou no serviço
      const caminhoFavicon = this.themeService.faviconOnLight(); 
      this.atualizarFavicon(caminhoFavicon);
    });
  }

  private atualizarFavicon(caminho: string) {
    const favicon = this.document.getElementById('app-favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = caminho;
    }
  }
}
