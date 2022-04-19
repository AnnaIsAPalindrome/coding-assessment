import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { ITodo } from './todos/interfaces';
import { TodosService } from './todos/services/todos.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  input = '';
  todoListLength: number;

  constructor(private service: TodosService) {}
  
  ngOnInit(): void {
    this.service.allTodos$.subscribe((todos: ITodo[]) => {
      this.todoListLength = todos.length;
    })
  }

  onAdd() {
    this.service.addTodo(this.input);
    this.input = '';
  }

  changeMode(mode: FILTER_MODES) {
    this.service.changeFilterMode(mode);
  }

  clearCompleted() {
    this.service.clearCompleted();
  }
}
