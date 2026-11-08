import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { FlowBoardStore } from '../../core/flowboard.store';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  readonly store = inject(FlowBoardStore);
  readonly theme = inject(ThemeService);
  readonly resetDone = signal(false);

  reset(): void {
    this.store.resetDemo();
    this.resetDone.set(true);
    window.setTimeout(() => this.resetDone.set(false), 2500);
  }
}
