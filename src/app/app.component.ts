import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(private service: TodoService) {
  }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.service.listar().subscribe(todoList => this.todos = todoList);
  }

  submit(): void {
    const todo: Todo = { ...this.form.value };
    this.service.salvar(todo).subscribe(savedTodo => {
      this.todos.push(savedTodo);
      this.form.reset();
    });
  }

  delete(id: number) {
    this.service.deletar(id).subscribe({
      next: (response) =>
        this.listarTodos()
    });
  }

  done(todo: Todo) {
    this.service.marcarComoConcluido(todo.id).subscribe((todoAtualizado: Todo) => {
      todo.done = todoAtualizado.done;
      todo.doneDate = todoAtualizado.doneDate;
    });
  }
}
