// Load tasks from localStorage (persists after page refresh)
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update stat counters at top
function updateStats() {
  const done = tasks.filter(t => t.done).length;
  document.getElementById('stat-total').textContent = tasks.length;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-pending').textContent = tasks.length - done;
}

// Render task list based on current filter
function renderTasks() {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-msg');

  const filtered = tasks.filter(t => {
    if (currentFilter === 'completed') return t.done;
    if (currentFilter === 'pending') return !t.done;
    return true;
  });

  list.innerHTML = '';
  empty.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card' + (task.done ? ' done' : '');
    card.innerHTML = `
      <button class="check-btn ${task.done ? 'checked' : ''}" data-id="${task.id}">
        ${task.done ? '✓' : ''}
      </button>
      <span class="task-text ${task.done ? 'done' : ''}">${task.text}</span>
      <span class="badge ${task.done ? 'done' : ''}">${task.done ? 'Done' : 'Pending'}</span>
      <button class="del-btn" data-id="${task.id}">✕</button>
    `;
    list.appendChild(card);
  });

  updateStats();
}

// Add new task
document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, done: false });
  saveTasks();
  renderTasks();
  input.value = '';
});

// Allow Enter key to add task
document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-btn').click();
});

// Toggle complete / delete via event delegation
document.getElementById('task-list').addEventListener('click', e => {
  const checkBtn = e.target.closest('.check-btn');
  const delBtn = e.target.closest('.del-btn');

  if (checkBtn) {
    const id = +checkBtn.dataset.id;
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks();
    renderTasks();
  }

  if (delBtn) {
    const id = +delBtn.dataset.id;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});

// Initial render
renderTasks();