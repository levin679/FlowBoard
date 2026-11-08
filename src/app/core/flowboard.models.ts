export type TaskStatus = 'backlog' | 'todo' | 'progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  email: string;
  skills: string[];
  capacity: number;
  color: string;
}

export interface WorkTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  labels: string[];
  dueDate: string;
  estimate: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  text: string;
  memberId: string;
  createdAt: string;
  kind: 'created' | 'moved' | 'completed' | 'comment';
}

export interface BoardFilters {
  query: string;
  priority: TaskPriority | 'all';
  assigneeId: string | 'all';
}

export interface FlowBoardSnapshot {
  members: Member[];
  tasks: WorkTask[];
  activities: Activity[];
}

export const BOARD_COLUMNS: ReadonlyArray<{ id: TaskStatus; label: string; hint: string }> = [
  { id: 'backlog', label: 'Бэклог', hint: 'Идеи и будущие задачи' },
  { id: 'todo', label: 'К выполнению', hint: 'Готово к старту' },
  { id: 'progress', label: 'В работе', hint: 'Активная разработка' },
  { id: 'review', label: 'Ревью', hint: 'Проверка и тестирование' },
  { id: 'done', label: 'Готово', hint: 'Завершено' }
];
