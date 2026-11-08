import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);

  readonly navigation = [
    { path: '/dashboard', label: 'Обзор', icon: '◫' },
    { path: '/board', label: 'Доска', icon: '▦' },
    { path: '/team', label: 'Команда', icon: '◎' },
    { path: '/insights', label: 'Аналитика', icon: '↗' },
    { path: '/settings', label: 'Настройки', icon: '⚙' }
  ];

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
