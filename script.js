// Set current date in topbar
document.getElementById('dt').textContent = new Date()
  .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  .toUpperCase();

// Hide splash screen after 2.2 seconds
setTimeout(() => {
  const splash = document.getElementById('splash');
  splash.classList.add('hide');
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('app').classList.add('show');
  }, 600);
}, 2200);

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('taskflow') || '[]');
let filter = 'all';

const save = () => localStorage.setItem('taskflow', JSON.stringify(tasks));

// Update stat counters
function stats() {
  const done = tasks.filter(t => t.done).length;
  document.getElementById('s-t').textContent = tasks.length;
  document.getElementById('s-d').textContent = done;
  document.getElementById('s-p').textContent = tasks.length - done;
}

// Render task list based on active filter
function render() {
  const tl = document.getElementById('tl');
  const em = document.getElementById('em');
  const sl = document.getElementById('sl');

  sl.textContent = { all: 'ALL TASKS', pending: 'PENDING TASKS', completed: 'COMPLETED TASKS' }[filter];

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'completed' ? t.done : !t.done
  );

  tl.innerHTML = '';
  em.style.display = filtered.length ? 'none' : 'block';

  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tc' + (t.done ? ' done' : '');
    card.innerHTML = `
      <button class="cb ${t.done ? 'checked' : ''}" data-id="${t.id}">${t.done ? '✓' : ''}</button>
      <span class="tt ${t.done ? 'done' : ''}">${t.text}</span>
      <span class="badge ${t.done ? 'd' : 'p'}">${t.done ? 'DONE' : 'PENDING'}</span>
      <button class="db" data-id="${t.id}">✕</button>
    `;
    tl.appendChild(card);
  });

  stats();
}

// Add new task
document.getElementById('ab').addEventListener('click', () => {
  const inp = document.getElementById('ti');
  const text = inp.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  save(); render(); inp.value = ''; inp.focus();
});

// Enter key support
document.getElementById('ti').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('ab').click();
});

// Toggle complete / delete tasks
document.getElementById('tl').addEventListener('click', e => {
  const c = e.target.closest('.cb');
  const d = e.target.closest('.db');
  if (c) {
    const id = +c.dataset.id;
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    save(); render();
  }
  if (d) {
    const id = +d.dataset.id;
    tasks = tasks.filter(t => t.id !== id);
    save(); render();
  }
});

// Filter buttons
document.querySelectorAll('.fb').forEach(b => {
  b.addEventListener('click', () => {
    filter = b.dataset.f;
    document.querySelectorAll('.fb').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    render();
  });
});

render();
