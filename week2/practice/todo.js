const btn = document.querySelector(".add-button");

const addTodo = () => {
    const todoInput = document.querySelector("#task");
    const li = document.createElement("li");
    li.textContent = todoInput.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        ul.removeChild(li);
    })

    li.appendChild(deleteBtn);

    const ul = document.querySelector("#todo-list");
    ul.appendChild(li);
};

btn.addEventListener('click', addTodo);