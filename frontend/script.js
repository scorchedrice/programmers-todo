document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("task-due-date").value;
    const dueTime = document.getElementById("task-due-time").value;

    if (title.trim() === "") return;

    addTask("scheduled", title, description, dueDate, dueTime);
    this.reset();
});

function addTask(columnId, title, description, dueDate, dueTime) {
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox"> 
            <strong>${title}</strong>
            <span>${description}</span>
        </div>
        <div class="task-footer">
            <small>📅 ${dueDate} ⏰ ${dueTime}</small>
        </div>
        <div class="task-controls">
            <button class="delete-btn">✖</button>
            <button class="move-left-btn">⬅</button>
            <button class="move-right-btn">➡</button>
        </div>
    `;

    document.getElementById(columnId).appendChild(task);

    const checkbox = task.querySelector(".task-checkbox");
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            task.classList.add("completed-task"); 
        } else {
            task.classList.remove("completed-task");
        }
    });

    task.querySelector(".move-right-btn").addEventListener("click", function () {
        moveTask(task, "right");
    });

    task.querySelector(".move-left-btn").addEventListener("click", function () {
        moveTask(task, "left");
    });

    task.querySelector(".delete-btn").addEventListener("click", function () {
        deleteTask(task);
    });
}

function moveTask(task, direction) {
    const columns = document.querySelectorAll(".column");
    let currentColumn = task.closest(".column");
    let currentIndex = Array.from(columns).indexOf(currentColumn);
    
    if (direction === "right" && currentIndex < columns.length - 1) {
        // 이동할 위치가 오른쪽에 있을 경우
        columns[currentIndex + 1].appendChild(task);
    } else if (direction === "left" && currentIndex > 0) {
        // 이동할 위치가 왼쪽에 있을 경우
        columns[currentIndex - 1].appendChild(task);
    }
}

function deleteTask(task) {
    task.remove();
}
