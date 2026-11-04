
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {Injectable,PLATFORM_ID,computed,inject,signal} from '@angular/core';

/**
 * Temas disponíveis na identidade visual Talento.
 */
export type TalentoTheme = 'roxo' | 'azul';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'talento-theme';

  /**
   * Estado global do tema.
   * Roxo é o tema padrão da aplicação.
   */
  readonly theme = signal<TalentoTheme>('roxo');

  /**
   * Verifica qual tema está ativo.
   */
  readonly isPurple = computed(() => this.theme() === 'roxo');
  readonly isBlue = computed(() => this.theme() === 'azul');

  /**
   * Caminhos das logos conforme o tema.
   */
  readonly logoOnLight = computed(() =>
    this.theme() === 'azul'
      ? 'assets/logos/logo_talento_azul.png'
      : 'assets/logos/logo_talento_roxo.png'
  );

  readonly faviconOnLight = computed(() =>
  this.theme() === 'azul'
    ? 'assets/logos/logo_o_azul.png'
    : 'assets/logos/logo_o_roxo.png'
);


  /**
   * Logo branca para fundos escuros.
   */
  readonly logoOnDark = computed(
    () => 'assets/logos/logo_talento_branca.png'
  );

  readonly faviconOnDark = computed(
    () => 'assets/logos/logo_o_branco.png'
  );

  /**
   * Inicialização do serviço.
   */
  constructor() {
    const storedTheme = this.readStored();

    this.theme.set(storedTheme);
    this.apply(storedTheme);
  }

  /**
   * Define um tema específico.
   */
  setTheme(theme: TalentoTheme): void {
    this.theme.set(theme);

    this.apply(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  /**
   * Alterna entre os temas Roxo e Azul.
   */
  toggle(): void {
    const nextTheme: TalentoTheme =
      this.theme() === 'roxo' ? 'azul' : 'roxo';

    this.setTheme(nextTheme);
  }

  /**
   * Aplica a classe CSS correspondente ao tema.
   */
  private apply(theme: TalentoTheme): void {
    const root = this.document.documentElement;

    root.classList.remove('tema-roxo', 'tema-azul');

    root.classList.add(
      theme === 'azul' ? 'tema-azul' : 'tema-roxo'
    );
  }

  /**
   * Recupera o tema salvo no navegador.
   */
  private readStored(): TalentoTheme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'roxo';
    }

    const stored = localStorage.getItem(this.storageKey);

    return stored === 'azul' ? 'azul' : 'roxo';
  }
}
