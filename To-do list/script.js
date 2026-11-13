const input = document.getElementById("taskInput");
const addButton = document.querySelector(".task-bar button");
const list = document.querySelector(".list");
const allButton = document.querySelector(".all");
const pendingButton = document.querySelector(".pending");
const completedButton = document.querySelector(".completed");
const clearAllButton = document.querySelector(".clear-all");

let tasks = [];

addButton.onclick = function() {
    if (input.value === "") {
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    showAll();
};

function showAll() {
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === true) {

            list.innerHTML += `
                <div class="task">
                    <input type="checkbox" checked
                        onclick="completeTask(${i})">

                    <span style="text-decoration: line-through;">
                        ${tasks[i].text}
                    </span>

                    <button class="delete-btn" onclick="deleteTask(${i})">
                        Delete
                    </button>
                </div>
            `;

        } else {

            list.innerHTML += `
                <div class="task">
                    <input type="checkbox"
                        onclick="completeTask(${i})">

                    <span>
                        ${tasks[i].text}
                    </span>

                    <button onclick="deleteTask(${i})">
                        Delete
                    </button>
                </div>
            `;
        }
    }
}

function completeTask(index) {
    if (tasks[index].completed === false) {
        tasks[index].completed = true;
    } else {
        tasks[index].completed = false;
    }

    showAll();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showAll();
}

pendingButton.onclick = function() {
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === false) {

            list.innerHTML += `
                <div class="task">
                    <input type="checkbox"
                        onclick="completeTask(${i})">

                    <span>
                        ${tasks[i].text}
                    </span>

                    <button class="delete-btn" onclick="deleteTask(${i})">
                        Delete
                    </button>
                </div>
            `;
        }
    }
};

completedButton.onclick = function() {
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === true) {

            list.innerHTML += `
                <div class="task">
                    <input type="checkbox" checked
                        onclick="completeTask(${i})">

                    <span style="text-decoration: line-through;">
                        ${tasks[i].text}
                    </span>

                    <button class="delete-btn" onclick="deleteTask(${i})">
                Delete
            </button>
                </div>
            `;
        }
    }
};

allButton.onclick = function() {
    showAll();
};

clearAllButton.onclick = function() {
    tasks = [];
    showAll();
};