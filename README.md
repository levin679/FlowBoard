# FlowBoard

Production-like Angular-приложение для управления командной разработкой. Проект показывает архитектуру SPA, работу с состоянием, сложные формы, drag-and-drop без внешней библиотеки, адаптивный интерфейс и вычисляемую аналитику.

## Возможности

- канбан из пяти колонок с HTML5 drag-and-drop;
- создание и удаление задач, фильтры, RxJS debounce-поиск, приоритеты и исполнители;
- дашборд со статусами спринта, дедлайнами и активностью;
- экран команды с загрузкой и навыками;
- аналитика по статусам, приоритетам и участникам;
- светлая/тёмная тема и сохранение состояния в `localStorage`;
- standalone components, lazy routes, Signals/computed/effect, reactive forms;
- базовые unit-тесты хранилища.

## Запуск

Требуется Node.js 22.12+ в ветке 22.x.

```bash
nvm use
npm install
npm start
```

Откройте `http://localhost:4200`.

## Проверки

```bash
npm run verify
```

Workflow `.github/workflows/ci.yml` выполняет typecheck, unit-тесты и production build для push и pull request.

## Архитектура

- `core/flowboard.store.ts` — единая точка изменения состояния и persistence;
- `features/*` — лениво загружаемые страницы по бизнес-возможностям;
- `layout/` — shell приложения;
- `shared/` — переиспользуемые UI-компоненты.

## Идеи для следующего этапа

1. Заменить localStorage на REST API на Spring Boot или Node.js.
2. Добавить OAuth/JWT и роли участника/администратора.
3. Подключить Angular CDK drag-drop, WebSocket-обновления и optimistic rollback.
4. Добавить Playwright e2e и автоматический deploy preview.

Подробности: [`docs/architecture.md`](docs/architecture.md) и [`PORTFOLIO.md`](PORTFOLIO.md).
