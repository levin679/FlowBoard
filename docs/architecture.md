# Архитектура FlowBoard

## Поток данных

`Page component → FlowBoardStore → Signal snapshot → computed selectors → template`

Компоненты не изменяют массивы напрямую. Все команды (`createTask`, `moveTask`, `deleteTask`) находятся в store. Это упрощает тестирование и позволяет заменить localStorage на HTTP-репозиторий без переписывания UI.

## Решения

- **Standalone components** уменьшают связность и упрощают lazy loading.
- **Signals** подходят для локального клиентского состояния и синхронных селекторов.
- **Reactive Forms** дают явную модель формы и валидаторы.
- **CSS custom properties** образуют минимальную дизайн-систему и поддерживают темы.
- **Feature folders** группируют код по пользовательским сценариям, а не по типам файлов.

## Production-доработки

HTTP interceptor, обработка ошибок, DTO mapping, auth guard, серверная пагинация, audit logging, i18n, e2e, CI/CD и observability.
