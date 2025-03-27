const todo = JSON.parse(localStorage.getItem('todo')) || [{
  name : 'Wash Dishes',
  dueDate : '2025-03-05 16:22' 
}, {
  name : 'Watch Youtube',
  dueDate : '2025-03-05 16:22' 
}];

const completedTodo = JSON.parse(localStorage.getItem('completed')) || [{
  name : 'Wash Dishes',
  dueDate : '2025-03-05 16:22' 
}];

function saveToStorageCompleted() {
  localStorage.setItem('completed', JSON.stringify(completedTodo))
};
function saveToStorage() {
  localStorage.setItem('todo', JSON.stringify(todo))
};

renderTodo();
renderCompleted();

function renderCompleted() {
  let completedItems = ''

  completedTodo.forEach((completedItem) => {
    completedItems += `
      <div class="items">
        <img class="image" src="images/checked.png.jpg" alt="Checked Icon">
        <div class="content">
          <p class="checked">${completedItem.name}</p>
          <span class="date-and-time">${completedItem.dueDate}</span>
        </div>
        <button class="completed-delete">Delete</button>
      </div>
    `
  });

  document.querySelector('.completed-list-container').innerHTML = completedItems;
  document.querySelector('.no-completed-todo').innerHTML = completedTodo.length;

  document.querySelectorAll('.completed-delete').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      completedTodo.splice(index, 1);
      renderCompleted();
      localStorage.removeItem('completed')
      saveToStorageCompleted();
    })
  });
}

function renderTodo() {
  let todoHTML = '';

  todo.forEach((item) => {
    todoHTML += `
      <div class="items">
        <img class="image" src="images/unchecked.png.jpg" alt="Unchecked Icon">
        <div class="content">
          <p class="checked">${item.name}</p>
          <span class="date-and-time">${item.dueDate}</span>
        </div>
        <button class="delete-button">Delete</button>
      </div>
    `
  }); 

  document.querySelector('.list-container').innerHTML = todoHTML;

  document.querySelectorAll('.image').forEach((todoCheck, index) => {
    todoCheck.addEventListener('click', () => {
      completedTodo.push(todo[index]);
      renderCompleted();
      saveToStorageCompleted();

      todo.splice(index, 1)
      renderTodo();
      saveToStorage();
    });
  });

  document.querySelectorAll('.delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todo.splice(index, 1)
      renderTodo();
      localStorage.removeItem('todo')
      saveToStorage();
    })
  });

  document.querySelector('.todo').innerHTML = todo.length;
}

const name = document.querySelector('.input-box');
const dueDate = document.querySelector('.date-input');

// Event Listeners
name.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
document.querySelector('.js-add-button').addEventListener('click', () => {
  addTask();
});

function addTask() {
  if (name.value === '') {
    document.querySelector('.error-message').innerHTML = 'You have to type a To-Do';
    setTimeout(() => {
      document.querySelector('.error-message').innerHTML = '';
    }, 3000);
  } else {
    todo.push({
      name:name.value, 
      dueDate:dueDate.value.replace('T',' ')
    })
  }

  name.value = '';
  dueDate.value = '';
  renderTodo();
  saveToStorage();
}