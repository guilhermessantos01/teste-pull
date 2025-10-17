// ============================================
// DOM Elements
// ============================================
const actionButton = document.getElementById('actionButton');
const messageElement = document.getElementById('message');
const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// ============================================
// Theme Management
// ============================================
const THEME_KEY = 'app-theme';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// ============================================
// Counter State
// ============================================
let counter = 0;

// ============================================
// Interactive Messages
// ============================================
const messages = [
    '🎉 Ótimo trabalho!',
    '✨ Você está indo bem!',
    '🚀 Continue assim!',
    '💪 Excelente!',
    '🌟 Fantástico!',
    '🎯 Perfeito!',
    '🔥 Incrível!'
];

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

actionButton.addEventListener('click', () => {
    messageElement.textContent = getRandomMessage();
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
});

// ============================================
// Counter Functions
// ============================================
function updateCounter() {
    counterElement.textContent = counter;
    counterElement.style.animation = 'none';
    setTimeout(() => {
        counterElement.style.animation = 'fadeIn 0.3s ease-in-out';
    }, 10);
}

incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
    messageElement.textContent = '🔄 Contador resetado!';
    setTimeout(() => {
        messageElement.textContent = '';
    }, 2000);
});

// ============================================
// Todo List Management
// ============================================
const TODO_KEY = 'app-todos';
let todos = [];

function loadTodos() {
    const savedTodos = localStorage.getItem(TODO_KEY);
    todos = savedTodos ? JSON.parse(savedTodos) : [];
    renderTodos();
}

function saveTodos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function addTodo(text) {
    if (!text.trim()) return;
    
    const todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.unshift(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">Nenhuma tarefa adicionada ainda. Comece criando uma!</div>';
        return;
    }
    
    todoList.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                aria-label="Marcar como ${todo.completed ? 'não concluída' : 'concluída'}"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="todo-delete" aria-label="Deletar tarefa">×</button>
        </li>
    `).join('');
    
    // Add event listeners
    document.querySelectorAll('.todo-checkbox').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => toggleTodo(todos[index].id));
    });
    
    document.querySelectorAll('.todo-delete').forEach((btn, index) => {
        btn.addEventListener('click', () => deleteTodo(todos[index].id));
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

addTodoBtn.addEventListener('click', () => addTodo(todoInput.value));

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo(todoInput.value);
    }
});

// ============================================
// Animations
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Initialization
// ============================================
function init() {
    console.log('🚀 Aplicação carregada com sucesso!');
    console.log('📝 Projeto de teste para Pull Request');
    console.log('🎨 Design minimalista inspirado em Stripe e Notion');
    
    initTheme();
    loadTodos();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

