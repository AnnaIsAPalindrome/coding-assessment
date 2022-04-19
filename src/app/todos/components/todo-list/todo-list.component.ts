import { Component, OnInit } from '@angular/core';
import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit{

  todoList: ITodo[];

  constructor(private service: TodosService) { }

  ngOnInit(): void {
    this.service.allTodos$.subscribe((todos: ITodo[]) => {
      this.todoList = todos;
    });
  }

  toggleComplete(index) {
    this.service.toggleComplete(index);
  }

  onRemove(index) {
    this.service.removeTodo(index);
  }
}

