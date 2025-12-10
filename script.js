document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('theme-toggle');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.body;
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeBtn.textContent = "☀️ Light Mode";
            } else {
                themeBtn.textContent = "🌙 Dark Mode";
            }
        });
    }

    const calcBtn = document.getElementById('calculate-btn');
    
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateGrade);
    }

    function calculateGrade() {
        const subject = document.getElementById('subject').value;
        const m1 = document.getElementById('mark1').value;
        const m2 = document.getElementById('mark2').value;
        const resultArea = document.getElementById('result-area');

        resultArea.className = '';

        if (subject.trim() === "" || m1 === "" || m2 === "") {
            resultArea.textContent = "Error: Please fill in all fields.";
            resultArea.classList.add('error');
            return;
        }

        const mark1Num = parseFloat(m1);
        const mark2Num = parseFloat(m2);

        if (isNaN(mark1Num) || isNaN(mark2Num) || mark1Num < 0 || mark1Num > 100 || mark2Num < 0 || mark2Num > 100) {
            resultArea.textContent = "Error: Marks must be numbers between 0 and 100.";
            resultArea.classList.add('error');
            return;
        }

        const average = (mark1Num + mark2Num) / 2;

        let status = average >= 50 ? "PASSED ✅" : "FAILED ❌";
        let statusClass = average >= 50 ? "success" : "error";

        resultArea.innerHTML = `
            Subject: <strong>${escapeHtml(subject)}</strong> <br> 
            Average: ${average}% <br> 
            Status: <strong>${status}</strong>
        `;
        resultArea.classList.add(statusClass);
    }

    const addTaskBtn = document.getElementById('add-task-btn');
    
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }

    const taskInput = document.getElementById('task-input');
    if (taskInput) {
        taskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const list = document.getElementById('task-list');

        if (taskText === "") {
            alert("Please write a task name first!");
            return;
        }

        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        taskInput.value = "";
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});