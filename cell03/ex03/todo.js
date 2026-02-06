const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function saveTodoList() {
    const todos = [];
    const items = ftList.children;
    
    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].innerText);
    }
    
    const jsonStr = JSON.stringify(todos);
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `ft_list=${encodeURIComponent(jsonStr)}; expires=${date.toUTCString()}; path=/`;
}

function createTodoElement(text) {
    const div = document.createElement('div');
    div.innerText = text;

    div.addEventListener('click', () => {
        const confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            div.remove();
            saveTodoList();
        }
    });

    return div;
}

newBtn.addEventListener('click', () => {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        const newTodo = createTodoElement(text);
        ftList.prepend(newTodo);
        saveTodoList();
    }
});

function loadTodos() {
    const cookieData = getCookie('ft_list');
    if (cookieData) {
        try {
            const todos = JSON.parse(decodeURIComponent(cookieData));
            
            todos.forEach(text => {
                const todoItem = createTodoElement(text);
                ftList.appendChild(todoItem);
            });
        } catch (e) {
            console.error("Error parsing cookie data", e);
        }
    }
}

loadTodos();