let currentFilter = 'all';

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('task');

  li.addEventListener('click', () => {
    li.classList.toggle('done');
    applyFilter();
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
  };
  li.appendChild(removeBtn);

  document.getElementById('taskList').appendChild(li);
  input.value = '';
  applyFilter();
}

function setFilter(filter) {
  currentFilter = filter;

  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
  });

  const btn = document.querySelector(`.filters button[onclick="setFilter('${filter}')"]`);
  if (btn) btn.classList.add('active');

  applyFilter();
}

function applyFilter() {
  const tasks = document.querySelectorAll('#taskList li');
  tasks.forEach(task => {
    switch (currentFilter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'pending':
        task.style.display = task.classList.contains('done') ? 'none' : 'flex';
        break;
      case 'done':
        task.style.display = task.classList.contains('done') ? 'flex' : 'none';
        break;
    }
  });
}
