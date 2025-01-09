let students = JSON.parse(localStorage.getItem('students')) || { morning: [], afternoon: [] };

        function renderStudents() {
            document.getElementById('morningStudents').innerHTML = '';
            document.getElementById('afternoonStudents').innerHTML = '';

            students.morning.forEach((name, index) => {
                addStudentToList('morningStudents', name, index, 'morning');
            });

            students.afternoon.forEach((name, index) => {
                addStudentToList('afternoonStudents', name, index, 'afternoon');
            });

            updateCounts();
        }

        function addStudent() {
            const nameInput = document.getElementById('studentName');
            const scheduleSelect = document.getElementById('schedule');
            const name = nameInput.value.trim();
            const schedule = scheduleSelect.value;

            if (!name || !schedule) {
                alert('Por favor, preencha todos os campos antes de adicionar.');
                return;
            }

            if (students.morning.length + students.afternoon.length >= 10000) {
                alert('Capacidade máxima atingida!');
                return;
            }

            students[schedule].push(name);
            localStorage.setItem('students', JSON.stringify(students));

            renderStudents();

            nameInput.value = '';
            scheduleSelect.value = '';
        }

        function removeStudent(schedule, index) {
            students[schedule].splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));

            renderStudents();
        }

        function addStudentToList(listId, name, index, schedule) {
            const list = document.getElementById(listId);
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <span>${name}</span>
                <button class="excluir" onclick="removeStudent('${schedule}', ${index})">Excluir</button>
            `;

            list.appendChild(listItem);
        }

        function updateCounts() {
            document.getElementById('morningCount').textContent = `Total: ${students.morning.length} alunos`;
            document.getElementById('afternoonCount').textContent = `Total: ${students.afternoon.length} alunos`;
        }

        document.addEventListener('DOMContentLoaded', renderStudents);