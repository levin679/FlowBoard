import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BOARD_COLUMNS, TaskStatus } from '../../core/flowboard.models';
import { FlowBoardStore } from '../../core/flowboard.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  readonly store = inject(FlowBoardStore);
  readonly columns = BOARD_COLUMNS;
  readonly today = new Date();
  readonly activeCount = computed(() => this.store.tasks().filter((task) => ['todo', 'progress', 'review'].includes(task.status)).length);
  readonly upcoming = computed(() => this.store.tasks()
    .filter((task) => task.status !== 'done')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5));

  count(status: TaskStatus): number {
    return this.store.tasks().filter((task) => task.status === status).length;
  }

  percent(status: TaskStatus): number {
    const total = this.store.tasks().length || 1;
    return Math.round((this.count(status) / total) * 100);
  }

  activityIcon(kind: string): string {
    return ({ created: '+', moved: '→', completed: '✓', comment: '…' } as Record<string, string>)[kind] ?? '•';
  }
}
