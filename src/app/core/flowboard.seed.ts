import { FlowBoardSnapshot } from './flowboard.models';

export const FLOWBOARD_SEED: FlowBoardSnapshot = {
  members: [
    { id: 'm1', name: 'Илья Лёвин', role: 'Frontend developer', initials: 'ИЛ', email: 'ilya@example.dev', skills: ['Angular', 'TypeScript', 'RxJS'], capacity: 72, color: '#6857e5' },
    { id: 'm2', name: 'Анна Белова', role: 'Product designer', initials: 'АБ', email: 'anna@example.dev', skills: ['Figma', 'UX research', 'Design system'], capacity: 58, color: '#ef6c9b' },
    { id: 'm3', name: 'Марк Орлов', role: 'Backend developer', initials: 'МО', email: 'mark@example.dev', skills: ['Java', 'Spring', 'PostgreSQL'], capacity: 81, color: '#2f9e8f' },
    { id: 'm4', name: 'Дарья Волкова', role: 'QA engineer', initials: 'ДВ', email: 'daria@example.dev', skills: ['Playwright', 'API testing', 'Accessibility'], capacity: 64, color: '#f2a93b' },
    { id: 'm5', name: 'Олег Минин', role: 'Product manager', initials: 'ОМ', email: 'oleg@example.dev', skills: ['Discovery', 'Analytics', 'Roadmap'], capacity: 49, color: '#3483fa' },
    { id: 'm6', name: 'София Ким', role: 'Frontend developer', initials: 'СК', email: 'sofia@example.dev', skills: ['Angular', 'SCSS', 'Testing'], capacity: 67, color: '#9b5de5' }
  ],
  tasks: [
    { id: 't1', title: 'Спроектировать экран онбординга', description: 'Сценарий первого входа, прогресс и подсказки.', status: 'backlog', priority: 'medium', assigneeId: 'm2', labels: ['UX', 'Discovery'], dueDate: '2026-11-18', estimate: 5, createdAt: '2026-10-26T09:10:00.000Z' },
    { id: 't2', title: 'Добавить экспорт отчёта в CSV', description: 'Экспортировать текущий набор задач с учётом фильтров.', status: 'backlog', priority: 'low', assigneeId: 'm1', labels: ['Frontend'], dueDate: '2026-11-24', estimate: 3, createdAt: '2026-10-28T11:30:00.000Z' },
    { id: 't3', title: 'Обновить контракты API задач', description: 'Синхронизировать DTO и обработку ошибок.', status: 'todo', priority: 'high', assigneeId: 'm3', labels: ['API', 'Backend'], dueDate: '2026-11-11', estimate: 8, createdAt: '2026-10-29T08:00:00.000Z' },
    { id: 't4', title: 'Адаптивная навигация', description: 'Сайдбар для desktop и нижняя навигация для mobile.', status: 'todo', priority: 'medium', assigneeId: 'm6', labels: ['UI', 'Responsive'], dueDate: '2026-11-12', estimate: 5, createdAt: '2026-10-30T13:40:00.000Z' },
    { id: 't5', title: 'Валидация формы новой задачи', description: 'Добавить сообщения об ошибках и фокус на первом невалидном поле.', status: 'progress', priority: 'critical', assigneeId: 'm1', labels: ['Angular', 'Forms'], dueDate: '2026-11-08', estimate: 5, createdAt: '2026-11-01T12:20:00.000Z' },
    { id: 't6', title: 'Токены дизайн-системы', description: 'Собрать цвета, отступы, типографику и состояния компонентов.', status: 'progress', priority: 'high', assigneeId: 'm2', labels: ['Design system'], dueDate: '2026-11-10', estimate: 8, createdAt: '2026-11-01T15:00:00.000Z' },
    { id: 't7', title: 'Оптимизировать запросы дашборда', description: 'Объединить агрегаты и добавить кэширование.', status: 'progress', priority: 'medium', assigneeId: 'm3', labels: ['Performance', 'API'], dueDate: '2026-11-14', estimate: 8, createdAt: '2026-11-02T08:45:00.000Z' },
    { id: 't8', title: 'E2E-сценарий перемещения карточки', description: 'Проверить drag-and-drop и сохранение после перезагрузки.', status: 'review', priority: 'high', assigneeId: 'm4', labels: ['Testing', 'Board'], dueDate: '2026-11-09', estimate: 3, createdAt: '2026-11-02T16:30:00.000Z' },
    { id: 't9', title: 'Проверка контрастности интерфейса', description: 'Аудит WCAG AA для светлой и тёмной темы.', status: 'review', priority: 'medium', assigneeId: 'm4', labels: ['A11y'], dueDate: '2026-11-13', estimate: 5, createdAt: '2026-11-03T10:00:00.000Z' },
    { id: 't10', title: 'Метрики спринта', description: 'Velocity, cycle time и распределение задач.', status: 'done', priority: 'high', assigneeId: 'm1', labels: ['Analytics', 'Signals'], dueDate: '2026-11-04', estimate: 8, createdAt: '2026-10-22T09:00:00.000Z' },
    { id: 't11', title: 'Пустые состояния страниц', description: 'Единый компонент для отсутствия данных и фильтров.', status: 'done', priority: 'low', assigneeId: 'm6', labels: ['UI'], dueDate: '2026-11-03', estimate: 3, createdAt: '2026-10-23T09:00:00.000Z' },
    { id: 't12', title: 'Исследование сценариев команды', description: 'Интервью и карта основных проблем пользователей.', status: 'done', priority: 'medium', assigneeId: 'm5', labels: ['Research'], dueDate: '2026-10-30', estimate: 5, createdAt: '2026-10-18T09:00:00.000Z' },
    { id: 't13', title: 'Обработка сетевых ошибок', description: 'Toast, повтор запроса и понятные тексты ошибок.', status: 'todo', priority: 'critical', assigneeId: 'm1', labels: ['UX', 'API'], dueDate: '2026-11-10', estimate: 5, createdAt: '2026-11-04T09:00:00.000Z' },
    { id: 't14', title: 'Документация компонентов', description: 'Примеры использования и правила доступности.', status: 'backlog', priority: 'low', assigneeId: 'm6', labels: ['Docs'], dueDate: '2026-11-28', estimate: 8, createdAt: '2026-11-04T11:00:00.000Z' }
  ],
  activities: [
    { id: 'a1', text: 'завершил задачу «Метрики спринта»', memberId: 'm1', createdAt: '2026-11-07T10:42:00.000Z', kind: 'completed' },
    { id: 'a2', text: 'перенесла «Проверка контрастности» на ревью', memberId: 'm4', createdAt: '2026-11-07T09:20:00.000Z', kind: 'moved' },
    { id: 'a3', text: 'создала задачу «Токены дизайн-системы»', memberId: 'm2', createdAt: '2026-11-06T16:15:00.000Z', kind: 'created' },
    { id: 'a4', text: 'добавил комментарий к контрактам API', memberId: 'm3', createdAt: '2026-11-06T13:05:00.000Z', kind: 'comment' },
    { id: 'a5', text: 'обновил приоритет обработки ошибок', memberId: 'm5', createdAt: '2026-11-06T11:35:00.000Z', kind: 'comment' },
    { id: 'a6', text: 'завершила пустые состояния страниц', memberId: 'm6', createdAt: '2026-11-05T15:50:00.000Z', kind: 'completed' }
  ]
};
