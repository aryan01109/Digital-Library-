   // --- DATA MOCKUPS ---
        let myBooks = [
            { 
                id: 101, 
                title: "Data Structures Using C", 
                author: "Reema Thareja", 
                cover: "https://via.placeholder.com/50x75?text=DS", // Placeholder Cover
                issueDate: "2024-01-10", 
                dueDate: "2024-01-25" 
            },
            { 
                id: 102, 
                title: "Engineering Mathematics I", 
                author: "B.S. Grewal", 
                cover: "https://via.placeholder.com/50x75?text=Math", // Placeholder Cover
                issueDate: "2024-01-12", 
                dueDate: "2024-01-20" 
            }
        ];

        // --- INITIALIZATION ---
        document.addEventListener('DOMContentLoaded', () => {
            loadUserProfile();
            setGreeting();
            renderMyBooks();
        });

        // --- 1. PERSONALIZED GREETING ---
        function setGreeting() {
            const hour = new Date().getHours();
            let greeting = "Good Morning";
            if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
            else if (hour >= 17) greeting = "Good Evening";

            const userStr = localStorage.getItem('currentUser');
            const name = userStr ? JSON.parse(userStr).name.split(' ')[0] : "Student"; // Get first name
            
            document.getElementById('greeting-text').innerText = `${greeting}, ${name}!`;
        }

        // --- 2. RENDER BOOKS WITH COVERS & PROGRESS BARS ---
        function renderMyBooks() {
            const tbody = document.getElementById("myBooksList");
            const countDisplay = document.getElementById("stat-issued");
            
            tbody.innerHTML = "";
            countDisplay.innerText = myBooks.length;

            // Calculate min days left for stats
            let minDays = Infinity;

            if (myBooks.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#999; padding: 40px;">No books issued yet.</td></tr>`;
                document.getElementById('stat-days').innerText = "--";
                return;
            }

            myBooks.forEach(record => {
                // Calculate Days Left Logic
                // For demo purposes, let's assume "Today" is Jan 15th, 2024 to make the math look good on the static dates above.
                // In a real app, use: const today = new Date();
                const today = new Date("2024-01-15"); 
                const due = new Date(record.dueDate);
                const diffTime = Math.abs(due - today);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                
                if (diffDays < minDays) minDays = diffDays;

                // Progress Bar Logic (Total duration usually 15 days for libraries)
                const totalDuration = 15; 
                const daysPassed = totalDuration - diffDays;
                const progressPercent = Math.min((daysPassed / totalDuration) * 100, 100);
                
                // Color Logic
                let colorClass = "var(--success)"; // Green
                if (diffDays <= 3) colorClass = "var(--danger)"; // Red if < 3 days
                else if (diffDays <= 7) colorClass = "var(--warning)"; // Yellow

                tbody.innerHTML += `
                    <tr>
                        <td>
                            <div class="book-cell">
                                <img src="${record.cover}" class="book-thumb" alt="Cover">
                                <div class="book-info">
                                    <h4>${record.title}</h4>
                                    <span>${record.author}</span>
                                </div>
                            </div>
                        </td>
                        <td>${record.issueDate}</td>
                        <td>
                            <div class="progress-wrapper">
                                <span class="days-text" style="color: ${colorClass}">${diffDays} Days Left</span>
                                <div class="progress-bg">
                                    <div class="progress-fill" style="width: ${progressPercent}%; background-color: ${colorClass};"></div>
                                </div>
                            </div>
                        </td>
                        <td><button class="btn-return" onclick="returnBook(${record.id})">Return Book</button></td>
                    </tr>
                `;
            });

            document.getElementById('stat-days').innerText = minDays + " Days";
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
                setGreeting(); // Update greeting too
                closeEditModal();
            }
        }

        function logout() {
            localStorage.removeItem('currentUser');
            try { window.location.href = 'login.html'; } catch(e) { location.reload(); }
        }
