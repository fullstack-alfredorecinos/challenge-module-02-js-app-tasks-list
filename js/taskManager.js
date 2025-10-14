import { Task } from './task.js';

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  agregarTarea(title, description, date) {
    if (!title.trim()) return;
    const id = Date.now();
    const newTask = new Task(id, title, description, date);
    this.tasks.push(newTask);
  }

  eliminarTarea(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  cambiarEstado(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.toggleCompleted();
  }

  editarTarea(id, title, description, date) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.editarTarea(title, description, date);
  }

  filtrarTareas(filtro) {
    if (filtro === 'completed') return this.tasks.filter(t => t.completed);
    if (filtro === 'pending') return this.tasks.filter(t => !t.completed);
    return this.tasks;
  }

  obtenerTareas() {
    return this.tasks;
  }
}
