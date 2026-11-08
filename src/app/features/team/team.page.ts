import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FlowBoardStore } from '../../core/flowboard.store';

@Component({
  selector: 'app-team-page',
  standalone: true,
  templateUrl: './team.page.html',
  styleUrl: './team.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPage {
  readonly store = inject(FlowBoardStore);
  readonly averageCapacity = computed(() => Math.round(this.store.members().reduce((sum, member) => sum + member.capacity, 0) / this.store.members().length));

  taskCount(memberId: string): number {
    return this.store.tasks().filter((task) => task.assigneeId === memberId && task.status !== 'done').length;
  }

  doneCount(memberId: string): number {
    return this.store.tasks().filter((task) => task.assigneeId === memberId && task.status === 'done').length;
  }

  capacityLabel(value: number): string {
    if (value >= 80) return 'Высокая нагрузка';
    if (value >= 65) return 'Оптимально';
    return 'Есть резерв';
  }
}
