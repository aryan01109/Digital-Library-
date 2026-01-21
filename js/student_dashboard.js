   // Mock Data for "My Books" (Since we don't have a backend connecting this to books.html yet)
        let myBooks = [
            { id: 101, title: "Data Structures Using C", author: "Reema Thareja", issueDate: "10 Jan 2024", dueDate: "25 Jan 2024" },
            { id: 102, title: "Engineering Mathematics I", author: "B.S. Grewal", issueDate: "12 Jan 2024", dueDate: "27 Jan 2024" }
        ];

        // --- INITIALIZATION ---
        document.addEventListener('DOMContentLoaded', () => {
            loadUserProfile();
            renderMyBooks();
        });

        // --- RENDER MY BOOKS TABLE ---
        function renderMyBooks() {
            const tbody = document.getElementById("myBooksList");
            const countDisplay = document.getElementById("stat-issued");
            
            tbody.innerHTML = "";
            countDisplay.innerText = myBooks.length;

            if (myBooks.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#999; padding: 20px;">No books issued yet. Click "Browse Catalog" to get started!</td></tr>`;
                return;
            }

            myBooks.forEach(record => {
                tbody.innerHTML += `
                    <tr>
                        <td style="font-weight: 600;">${record.title}</td>
                        <td>${record.author}</td>
                        <td>${record.issueDate}</td>
                        <td>${record.dueDate}</td>
                        <td><button class="btn-return" onclick="returnBook(${record.id})">Return</button></td>
                    </tr>
                `;
            });
        }

        function returnBook(recordId) {
            if(confirm("Are you sure you want to return this book?")) {
                const recordIndex = myBooks.findIndex(r => r.id === recordId);
                if (recordIndex > -1) {
                    myBooks.splice(recordIndex, 1);
                    alert("Book Returned Successfully.");
                    renderMyBooks();
                }
            }
        }

        // --- PROFILE LOGIC ---
        function loadUserProfile() {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                const user = JSON.parse(userStr);
                document.getElementById('disp-name').innerText = user.name;
                document.getElementById('disp-enrollment').innerText = user.enrollment;
            } else {
                try { window.location.href = 'login.html'; } 
                catch (e) { console.log("Preview mode active"); }
            }
        }

        function openEditModal() {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                const user = JSON.parse(userStr);
                document.getElementById('edit-name').value = user.name;
                document.getElementById('edit-enrollment').value = user.enrollment;
                document.getElementById('editModal').style.display = 'flex';
            }
        }
        function closeEditModal() { document.getElementById('editModal').style.display = 'none'; }
        
        function saveProfile() {
            const newName = document.getElementById('edit-name').value;
            if (newName) {
                let user = JSON.parse(localStorage.getItem('currentUser'));
                user.name = newName;
                localStorage.setItem('currentUser', JSON.stringify(user));
                document.getElementById('disp-name').innerText = newName;
                closeEditModal();
            }
        }

        function logout() {
            localStorage.removeItem('currentUser');
            try { window.location.href = 'login.html'; } catch(e) { location.reload(); }
        }