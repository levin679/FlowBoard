import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BOARD_COLUMNS, TaskPriority, TaskStatus } from '../../core/flowboard.models';
import { FlowBoardStore } from '../../core/flowboard.store';

@Component({
  selector: 'app-insights-page',
  standalone: true,
  templateUrl: './insights.page.html',
  styleUrl: './insights.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsightsPage {
  readonly store = inject(FlowBoardStore);
  readonly columns = BOARD_COLUMNS;
  readonly priorityOrder: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
  readonly maxMemberTasks = computed(() => Math.max(1, ...this.store.members().map((member) => this.memberTasks(member.id))));

  statusCount(status: TaskStatus): number {
    return this.store.tasks().filter((task) => task.status === status).length;
  }

  priorityCount(priority: TaskPriority): number {
    return this.store.tasks().filter((task) => task.priority === priority).length;
  }

  priorityPercent(priority: TaskPriority): number {
    return Math.round((this.priorityCount(priority) / Math.max(1, this.store.tasks().length)) * 100);
  }

  memberTasks(memberId: string): number {
    return this.store.tasks().filter((task) => task.assigneeId === memberId && task.status !== 'done').length;
  }

  memberBar(memberId: string): number {
    return Math.round((this.memberTasks(memberId) / this.maxMemberTasks()) * 100);
  }

  print(): void { window.print(); }

  priorityLabel(priority: TaskPriority): string {
    return ({ critical: 'Критичный', high: 'Высокий', medium: 'Средний', low: 'Низкий' })[priority];
  }
}
