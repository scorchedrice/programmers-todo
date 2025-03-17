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

async function tryUploadWork(columnId, title, description, dueDate, dueTime) {
    const response = await fetch('http://localhost:3000/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            workName: title,
            workDescription: description,
            workDueDate: dueDate,
            workDueTime: dueTime,
        })
    })
    if (response.status !== 201) {
        return false
    } else {
        return true
    }
}


function addTask(columnId, title, description, dueDate, dueTime) {
    const tryUpload = tryUploadWork(columnId, title, description, dueDate, dueTime);
    if (!tryUpload) {
        alert('서버측 오류로 등록할 수 없어요')
        return
    }

    const task = document.createElement("div");
    task.classList.add("task");
    console.log(title, description, dueDate, dueTime);
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

// TODO : 제가 추가적으로 작성한 코드 보시고, work 상태를 바꾸는 것, 삭제하는 로직만 구현해보시면 될거같습니다.
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
