function saveWorkToStorage(title, description, dueDate, status) {
    let works = JSON.parse(localStorage.getItem('works')) || [];
    const newWork = { id: Date.now(), title, description, dueDate, status };
    works.push(newWork);
    localStorage.setItem('works', JSON.stringify(works));
}

function loadWorksFromStorage() {
    let works = JSON.parse(localStorage.getItem('works')) || [];
    works.forEach(work => {
        addTask(work.status, work.title, work.description, work.dueDate, ""); 
    });
}

function updateStorage() {
    const tasks = document.querySelectorAll(".task");
    let works = [];
    tasks.forEach(task => {
        const title = task.querySelector("strong").textContent;
        const description = task.querySelector("span").textContent;
        const dueDate = task.querySelector(".task-footer small").textContent.split("📅 ")[1].split(" ⏰")[0];
        const status = task.closest(".column").id;
        works.push({ id: Date.now(), title, description, dueDate, status });
    });
    localStorage.setItem('works', JSON.stringify(works));
}

document.addEventListener('DOMContentLoaded', loadWorksFromStorage);

// 로컬스토리지 업데이트 기능을 위해서 이동 및 삭제 이벤트 후에 업데이트
document.querySelectorAll(".move-left-btn, .move-right-btn, .delete-btn").forEach(button => {
    button.addEventListener("click", updateStorage);
});
