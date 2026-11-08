import { TestBed } from '@angular/core/testing';
import { FlowBoardStore } from './flowboard.store';

describe('FlowBoardStore', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('calculates completion rate from the initial snapshot', () => {
    const store = TestBed.inject(FlowBoardStore);
    expect(store.tasks().length).toBeGreaterThan(0);
    expect(store.completionRate()).toBeGreaterThan(0);
  });

  it('moves a task between columns', () => {
    const store = TestBed.inject(FlowBoardStore);
    const task = store.tasks().find((item) => item.status !== 'done');
    expect(task).toBeDefined();
    store.moveTask(task!.id, 'done');
    expect(store.tasks().find((item) => item.id === task!.id)?.status).toBe('done');
  });
});
