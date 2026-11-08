import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BOARD_COLUMNS, TaskPriority, TaskStatus } from '../../core/flowboard.models';
import { FlowBoardStore } from '../../core/flowboard.store';
import { EmptyStateComponent } from '../../shared/empty-state.component';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, EmptyStateComponent],
  templateUrl: './board.page.html',
  styleUrl: './board.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPage {
  readonly store = inject(FlowBoardStore);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly columns = BOARD_COLUMNS;
  readonly modalOpen = signal(false);
  readonly draggedTaskId = signal<string | null>(null);
  readonly today = new Date().toISOString().slice(0, 10);
  readonly searchControl = new FormControl(this.store.filters().query, { nonNullable: true });

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    status: ['todo' as TaskStatus, Validators.required],
    priority: ['medium' as TaskPriority, Validators.required],
    assigneeId: ['m1', Validators.required],
    labels: ['Angular, UI'],
    dueDate: [new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10), Validators.required],
    estimate: [5, [Validators.required, Validators.min(1), Validators.max(21)]]
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((query) => this.store.setQuery(query));
  }

  clearFilters(): void {
    this.store.clearFilters();
    this.searchControl.setValue('', { emitEvent: false });
  }

  openCreate(status: TaskStatus = 'todo'): void {
    this.form.reset({
      title: '',
      description: '',
      status,
      priority: 'medium',
      assigneeId: 'm1',
      labels: 'Angular, UI',
      dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10),
      estimate: 5
    });
    this.modalOpen.set(true);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.createTask({
      ...value,
      labels: value.labels
        .split(',')
        .map((label: string) => label.trim())
        .filter(Boolean)
    });
    this.modalOpen.set(false);
  }

  startDrag(taskId: string): void {
    this.draggedTaskId.set(taskId);
  }

  drop(status: TaskStatus): void {
    const taskId = this.draggedTaskId();
    if (taskId) this.store.moveTask(taskId, status);
    this.draggedTaskId.set(null);
  }

  setPriority(value: string): void {
    this.store.setPriority(value as TaskPriority | 'all');
  }

  priorityLabel(priority: TaskPriority): string {
    return ({ low: 'Низкий', medium: 'Средний', high: 'Высокий', critical: 'Критичный' })[priority];
  }
}
