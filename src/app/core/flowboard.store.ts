import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { FLOWBOARD_SEED } from './flowboard.seed';
import { Activity, BoardFilters, FlowBoardSnapshot, TaskPriority, TaskStatus, WorkTask } from './flowboard.models';

const STORAGE_KEY = 'flowboard-v1';

function cloneSeed(): FlowBoardSnapshot {
  return structuredClone(FLOWBOARD_SEED);
}

@Injectable({ providedIn: 'root' })
export class FlowBoardStore {
  private readonly storage = inject(BrowserStorageService);
  private readonly snapshot = signal<FlowBoardSnapshot>(this.storage.read(STORAGE_KEY, cloneSeed()));

  readonly filters = signal<BoardFilters>({ query: '', priority: 'all', assigneeId: 'all' });
  readonly members = computed(() => this.snapshot().members);
  readonly tasks = computed(() => this.snapshot().tasks);
  readonly activities = computed(() => this.snapshot().activities);

  readonly filteredTasks = computed(() => {
    const filters = this.filters();
    const query = filters.query.trim().toLocaleLowerCase('ru');
    return this.tasks().filter((task) => {
      const matchesQuery = !query || [task.title, task.description, ...task.labels]
        .join(' ')
        .toLocaleLowerCase('ru')
        .includes(query);
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesAssignee = filters.assigneeId === 'all' || task.assigneeId === filters.assigneeId;
      return matchesQuery && matchesPriority && matchesAssignee;
    });
  });

  readonly completedTasks = computed(() => this.tasks().filter((task) => task.status === 'done'));
  readonly totalEstimate = computed(() => this.tasks().reduce((sum, task) => sum + task.estimate, 0));
  readonly completionRate = computed(() => {
    const total = this.tasks().length;
    return total ? Math.round((this.completedTasks().length / total) * 100) : 0;
  });
  readonly overdueCount = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.tasks().filter((task) => task.status !== 'done' && task.dueDate < today).length;
  });

  constructor() {
    effect(() => this.storage.write(STORAGE_KEY, this.snapshot()));
  }

  tasksByStatus(status: TaskStatus): WorkTask[] {
    return this.filteredTasks().filter((task) => task.status === status);
  }

  memberName(memberId: string): string {
    return this.members().find((member) => member.id === memberId)?.name ?? 'Без исполнителя';
  }

  memberInitials(memberId: string): string {
    return this.members().find((member) => member.id === memberId)?.initials ?? '—';
  }

  setQuery(query: string): void {
    this.filters.update((filters) => ({ ...filters, query }));
  }

  setPriority(priority: TaskPriority | 'all'): void {
    this.filters.update((filters) => ({ ...filters, priority }));
  }

  setAssignee(assigneeId: string | 'all'): void {
    this.filters.update((filters) => ({ ...filters, assigneeId }));
  }

  clearFilters(): void {
    this.filters.set({ query: '', priority: 'all', assigneeId: 'all' });
  }

  createTask(input: Omit<WorkTask, 'id' | 'createdAt'>): void {
    const task: WorkTask = {
      ...input,
      id: `t-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString()
    };
    this.snapshot.update((state) => ({
      ...state,
      tasks: [task, ...state.tasks],
      activities: [
        { id: `a-${Date.now()}`, text: `создал задачу «${task.title}»`, memberId: task.assigneeId, createdAt: new Date().toISOString(), kind: 'created' as const },
        ...state.activities
      ].slice(0, 20)
    }));
  }

  moveTask(taskId: string, status: TaskStatus): void {
    const task = this.tasks().find((item) => item.id === taskId);
    if (!task || task.status === status) return;
    const kind: Activity['kind'] = status === 'done' ? 'completed' : 'moved';
    const text = status === 'done'
      ? `завершил задачу «${task.title}»`
      : `перенес задачу «${task.title}»`;
    this.snapshot.update((state) => ({
      ...state,
      tasks: state.tasks.map((item) => item.id === taskId ? { ...item, status } : item),
      activities: [
        { id: `a-${Date.now()}`, text, memberId: task.assigneeId, createdAt: new Date().toISOString(), kind },
        ...state.activities
      ].slice(0, 20)
    }));
  }

  deleteTask(taskId: string): void {
    this.snapshot.update((state) => ({ ...state, tasks: state.tasks.filter((task) => task.id !== taskId) }));
  }

  resetDemo(): void {
    this.snapshot.set(cloneSeed());
    this.clearFilters();
  }
}
