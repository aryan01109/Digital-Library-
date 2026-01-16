  let books = [
            { id: 1, title: "Data Structures Using C", author: "Reema Thareja", category: "Computer Science", status: "Available" },
            { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", status: "Issued" },
            { id: 3, title: "Engineering Mathematics I", author: "B.S. Grewal", category: "Mathematics", status: "Available" },
            { id: 4, title: "Digital Logic Design", author: "Morris Mano", category: "Electronics", status: "Available" },
            { id: 5, title: "Fluid Mechanics", author: "R.K. Bansal", category: "Civil Eng", status: "Issued" },
            { id: 6, title: "Introduction to Algorithms", author: "Cormen", category: "Computer Science", status: "Available" },
            { id: 7, title: "Electronic Devices", author: "Boylestad", category: "Electronics", status: "Available" }
        ];

        // --- 2. INITIAL RENDER ---
        document.addEventListener('DOMContentLoaded', () => {
            renderBooks(books);
        });

        // --- 3. RENDER FUNCTION ---
        function renderBooks(data) {
            const tbody = document.getElementById("bookList");
            tbody.innerHTML = ""; // Clear existing rows

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="no-results">No books found matching your search.</td></tr>`;
                return;
            }

            data.forEach(book => {
                // Determine styling based on status
                const badgeClass = book.status === 'Available' ? 'status-available' : 'status-issued';
                
                // Determine Button Logic
                let buttonHTML;
                if (book.status === 'Available') {
                    buttonHTML = `<button class="action-btn btn-issue" onclick="toggleStatus(${book.id})">Issue Book</button>`;
                } else {
                    buttonHTML = `<button class="action-btn btn-return" onclick="toggleStatus(${book.id})">Return</button>`;
                }

                const row = `
                    <tr>
                        <td style="font-weight: 600;">${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td><span class="status-badge ${badgeClass}">${book.status}</span></td>
                        <td>${buttonHTML}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        }

        // --- 4. SEARCH & FILTER FUNCTION ---
        function filterBooks() {
            const query = document.getElementById("search").value.toLowerCase();
            const category = document.getElementById("categoryFilter").value;

            const filtered = books.filter(book => {
                const matchesSearch = book.title.toLowerCase().includes(query) || 
                                      book.author.toLowerCase().includes(query);
                const matchesCategory = category === "All" || book.category === category;

                return matchesSearch && matchesCategory;
            });

            renderBooks(filtered);
        }

        // --- 5. ISSUE / RETURN LOGIC (MOCK) ---
        // Instead of calling an API, we update our local array
        function toggleStatus(id) {
            const book = books.find(b => b.id === id);
            if (book) {
                // Toggle status
                if (book.status === "Available") {
                    book.status = "Issued";
                    alert(`Success: You have issued "${book.title}".`);
                } else {
                    book.status = "Available";
                    alert(`Success: "${book.title}" has been returned.`);
                }
                // Re-render to show changes (preserves search filter)
                filterBooks();
            }
        }