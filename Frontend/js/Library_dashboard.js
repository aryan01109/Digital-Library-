    // Data Management
    let books = JSON.parse(localStorage.getItem('libBooksQuantity')) || [
        { id: 1, title: "Modern Control Engineering", author: "Ogata", totalQty: 5, availableQty: 5, borrowers: [] },
        { id: 2, title: "Data Structures", author: "Lipschutz", totalQty: 10, availableQty: 9, borrowers: [
            { studentId: "210280116001001", issueDate: new Date().toISOString() }
        ]}
    ];

    let selectedBookId = null;

    // Validation Regex
    const studentIdRegex = /^\d{15}$/; // Exactly 15 digits
    const authorRegex = /^[A-Za-z\s.]+$/; // Only letters, spaces, and periods

    function init() {
        renderBooks();
        updateStats();
    }

    function updateStats() {
        let total = 0, available = 0, issued = 0;
        books.forEach(b => {
            total += parseInt(b.totalQty);
            available += parseInt(b.availableQty);
            issued += b.borrowers.length;
        });
        document.getElementById('totalCount').innerText = total;
        document.getElementById('availableCount').innerText = available;
        document.getElementById('issuedCount').innerText = issued;
    }

    function renderBooks(filter = "") {
        const list = document.getElementById('bookList');
        list.innerHTML = "";
        
        books.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()) || b.author.toLowerCase().includes(filter.toLowerCase()))
        .forEach(book => {
            const isOutOfStock = book.availableQty <= 0;
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>
                    <div class="font-bold text-gray-800">${book.title}</div>
                    <div class="text-xs text-gray-500 italic">${book.author}</div>
                </td>
                <td class="text-center font-semibold text-gray-600">${book.totalQty}</td>
                <td class="text-center font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}">
                    ${book.availableQty}
                </td>
                <td class="text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="openEditModal(${book.id})" class="btn-edit" title="Edit Data">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="openIssueModal(${book.id})" class="btn-issue" ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fas fa-paper-plane mr-2"></i>Issue Book
                        </button>
                    </div>
                    ${isOutOfStock ? '<div class="text-[10px] text-red-500 mt-1 font-bold">OUT OF STOCK</div>' : ''}
                </td>
            `;
            list.appendChild(row);
        });
    }

    function addBook() {
        const t = document.getElementById('title');
        const a = document.getElementById('author');
        const q = document.getElementById('qtyInput');
        
        if (!t.value.trim() || !a.value.trim()) return customAlert("Fields cannot be empty");
        
        // Validate Author Name
        if (!authorRegex.test(a.value.trim())) {
            return customAlert("Author name must be text only (no numbers/symbols)");
        }
        
        books.push({ 
            id: Date.now(), 
            title: t.value.trim(), 
            author: a.value.trim(), 
            totalQty: parseInt(q.value), 
            availableQty: parseInt(q.value), 
            borrowers: [] 
        });
        save();
        t.value = ""; a.value = ""; q.value = "1";
        customAlert("Book added to inventory");
    }

    // Edit Logic
    function openEditModal(id) {
        selectedBookId = id;
        const book = books.find(b => b.id === id);
        
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editQty').value = book.totalQty;
        
        const issuedCount = book.borrowers.length;
        document.getElementById('editQtyHelp').innerText = `Note: ${issuedCount} copies are currently issued. New quantity must be at least ${issuedCount}.`;
        
        document.getElementById('editModal').style.display = 'flex';
    }

    function closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    function confirmEdit() {
        const title = document.getElementById('editTitle').value.trim();
        const author = document.getElementById('editAuthor').value.trim();
        const newTotalQty = parseInt(document.getElementById('editQty').value);

        if (!title || !author || isNaN(newTotalQty)) {
            customAlert("Please fill all fields correctly.");
            return;
        }

        // Validate Author Name
        if (!authorRegex.test(author)) {
            return customAlert("Author name must be text only.");
        }

        const bookIndex = books.findIndex(b => b.id === selectedBookId);
        const book = books[bookIndex];
        const issuedCount = book.borrowers.length;

        if (newTotalQty < issuedCount) {
            customAlert(`Error: You cannot set total stock to less than issued copies (${issuedCount}).`);
            return;
        }

        book.title = title;
        book.author = author;
        book.totalQty = newTotalQty;
        book.availableQty = newTotalQty - issuedCount;

        save();
        closeEditModal();
        customAlert("Book details updated successfully.");
    }

    // Issue Logic
    function openIssueModal(id) {
        selectedBookId = id;
        document.getElementById('modalBookTitle').innerText = books.find(b => b.id === id).title;
        document.getElementById('issueModal').style.display = 'flex';
        document.getElementById('studentIdInput').focus();
    }

    function closeModal() {
        document.getElementById('issueModal').style.display = 'none';
        document.getElementById('studentIdInput').value = "";
    }

    function confirmIssue() {
        const sid = document.getElementById('studentIdInput').value.trim();
        
        // 1. Validate Format (15 digits, no text, no float)
        if (!studentIdRegex.test(sid)) {
            customAlert("Enrollment No. must be exactly 15 digits.");
            return;
        }

        // 2. Check Book Limit (Max 3 books per student)
        let studentBorrowedCount = 0;
        books.forEach(book => {
            book.borrowers.forEach(borrower => {
                if (borrower.studentId === sid) {
                    studentBorrowedCount++;
                }
            });
        });

        if (studentBorrowedCount >= 3) {
            customAlert(`Limit Reached! Student ${sid} already has 3 books issued.`);
            return;
        }

        const book = books.find(b => b.id === selectedBookId);
        if (book.availableQty > 0) {
            book.availableQty--;
            book.borrowers.push({ studentId: sid, issueDate: new Date().toISOString() });
            save();
            closeModal();
            customAlert(`Successfully issued to ${sid}`);
        }
    }

    function save() {
        localStorage.setItem('libBooksQuantity', JSON.stringify(books));
        renderBooks();
        updateStats();
    }

    function searchBooks() {
        renderBooks(document.getElementById('search').value);
    }

    function customAlert(msg) {
        const b = document.createElement('div');
        b.className = "fixed top-5 right-5 bg-blue-900 text-white p-4 rounded-lg shadow-2xl z-[100] border-l-4 border-yellow-400 font-medium animate-bounce max-w-sm";
        b.innerText = msg;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 4000);
    }

    function logout(e) { 
        console.log("Logging out admin session...");
    }

    window.onload = init;