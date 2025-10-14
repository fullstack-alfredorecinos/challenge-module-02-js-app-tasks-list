import { TaskManager } from './taskManager.js';

const taskManager = new TaskManager();

const taskTitle = document.querySelector('#taskTitle');
const taskDescription = document.querySelector('#taskDescription');
const taskDate = document.querySelector('#taskDate');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

// NUEVO: referencia al label del campo fecha
const dateLabel = document.querySelector('.date-box .static-label');

let filtroActual = 'all';
let editandoId = null;

// === Mostrar tareas ===
function mostrarTareas() {
  const tareas = taskManager.filtrarTareas(filtroActual);
  taskList.innerHTML = '';

  tareas.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small>Fecha límite: ${task.date || 'Sin fecha'}</small>
      </div>
      <div class="task-actions">
        <button class="edit" data-id="${task.id}">Editar</button>
        <button class="complete" data-id="${task.id}">Completar</button>
        <button class="delete" data-id="${task.id}">Eliminar</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// === Agregar o editar tarea ===
function agregarOEditarTarea() {
  const title = taskTitle.value;
  const description = taskDescription.value;
  const date = taskDate.value;

  if (editandoId) {
    taskManager.editarTarea(editandoId, title, description, date);
    editandoId = null;
    addTaskBtn.textContent = 'Agregar tarea';
  } else {
    taskManager.agregarTarea(title, description, date);
  }

  taskTitle.value = '';
  taskDescription.value = '';
  taskDate.value = '';

  // NUEVO: quitar el estilo del label de fecha al guardar o limpiar
  if (dateLabel) dateLabel.classList.remove('focused');

  mostrarTareas();
}

// === Manejador de clicks en botones de cada tarea ===
function manejarClick(event) {
  const id = Number(event.target.dataset.id);

  if (event.target.classList.contains('complete')) {
    taskManager.cambiarEstado(id);
    mostrarTareas();
  }

  if (event.target.classList.contains('delete')) {
    taskManager.eliminarTarea(id);

    // NUEVO: si estabas editando, limpia el estado visual del label
    if (dateLabel) dateLabel.classList.remove('focused');

    mostrarTareas();
  }

  if (event.target.classList.contains('edit')) {
    const tarea = taskManager.obtenerTareas().find(t => t.id === id);
    if (tarea) {
      taskTitle.value = tarea.title;
      taskDescription.value = tarea.description;
      taskDate.value = tarea.date;

      editandoId = id;
      addTaskBtn.textContent = 'Guardar cambios';

      // NUEVO: resalta el label del campo fecha mientras se edita
      if (dateLabel) dateLabel.classList.add('focused');
    }
  }
}

// === Filtros ===
function aplicarFiltro(e) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  filtroActual = e.target.dataset.filter;
  mostrarTareas();
}

// === Eventos ===
addTaskBtn.addEventListener('click', agregarOEditarTarea);
taskList.addEventListener('click', manejarClick);
filterButtons.forEach(btn => btn.addEventListener('click', aplicarFiltro));

// === NUEVO: resalta el label al enfocar el input de fecha ===
if (taskDate && dateLabel) {
  taskDate.addEventListener('focus', () => {
    dateLabel.classList.add('focused');
  });
  taskDate.addEventListener('blur', () => {
    // solo quitamos el color si no estamos editando
    if (!editandoId) {
      dateLabel.classList.remove('focused');
    }
  });
}

mostrarTareas();
