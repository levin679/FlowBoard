import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', title: 'Обзор — FlowBoard', loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage) },
      { path: 'board', title: 'Доска — FlowBoard', loadComponent: () => import('./features/board/board.page').then((m) => m.BoardPage) },
      { path: 'team', title: 'Команда — FlowBoard', loadComponent: () => import('./features/team/team.page').then((m) => m.TeamPage) },
      { path: 'insights', title: 'Аналитика — FlowBoard', loadComponent: () => import('./features/insights/insights.page').then((m) => m.InsightsPage) },
      { path: 'settings', title: 'Настройки — FlowBoard', loadComponent: () => import('./features/settings/settings.page').then((m) => m.SettingsPage) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
