export class Task {
  constructor(id, title, description, date, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  editarTarea(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
