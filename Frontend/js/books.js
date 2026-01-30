        const DB_KEY = 'ldce_library_v2';
        let allBooks = [];

        function loadBooksFromStorage() {
            const data = localStorage.getItem(DB_KEY);
            allBooks = data ? JSON.parse(data) : [];
            filterBooks();
        }

        function filterBooks() {
            const query = document.getElementById("search").value.toLowerCase();
            const category = document.getElementById("categoryFilter").value;

            const filtered = allBooks.filter(book => {
                const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
                const matchesCategory = category === "All" || book.category === category;
                return matchesSearch && matchesCategory;
            });
            renderTable(filtered);
        }

        function renderTable(data) {
            const tbody = document.getElementById("bookList");
            tbody.innerHTML = data.length ? "" : '<tr><td colspan="6" style="text-align:center; padding:20px;">No books found in inventory.</td></tr>';
            
            data.forEach(book => {
                const isAvail = book.availableQty > 0;
                tbody.innerHTML += `
                    <tr>
                        <td><img src="${book.image || 'https://placehold.co/40x60'}" class="book-thumb" onclick="event.stopPropagation(); showImg('${book.image}')"></td>
                        <td style="font-weight:600">${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category || 'General'}</td>
                        <td>${book.availableQty}</td>
                        <td><span class="status-badge ${isAvail ? 'status-available' : 'status-issued'}">${isAvail ? 'Available' : 'Out of Stock'}</span></td>
                    </tr>
                `;
            });
        }

        function showImg(src) {
            document.getElementById('modalImage').src = src;
            document.getElementById('imageModal').style.display = 'flex';
        }

        window.onload = loadBooksFromStorage;




















































// // --- 1. MOCK DATABASE (Now with Image URLs) ---
// // Using placeholder images for demonstration. Replace URLs with your actual file paths later.
// let books = [
//     { id: 1, image: "https://placehold.co/400x600?text=Data+Structures", title: "Data Structures Using C", author: "Reema Thareja", category: "Computer Science", quantity: 5, status: "Available" },
//     { id: 2, image: "https://placehold.co/400x600?text=Clean+Code", title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", quantity: 2, status: "Available" },
//     { id: 3, image: "https://placehold.co/400x600?text=Maths+I", title: "Engineering Mathematics I", author: "B.S. Grewal", category: "Mathematics", quantity: 10, status: "Available" },
//     { id: 4, image: "https://placehold.co/400x600?text=Digital+Logic", title: "Digital Logic Design", author: "Morris Mano", category: "Electronics", quantity: 0, status: "Out of Stock" },
//     { id: 5, image: "https://placehold.co/400x600?text=Fluid+Mech", title: "Fluid Mechanics", author: "R.K. Bansal", category: "Civil Eng", quantity: 3, status: "Available" },
//     { id: 6, image: "https://placehold.co/400x600?text=Algorithms", title: "Introduction to Algorithms", author: "Cormen", category: "Computer Science", quantity: 1, status: "Available" },
//     { id: 7, image: "https://placehold.co/400x600?text=Devices", title: "Electronic Devices", author: "Boylestad", category: "Electronics", quantity: 4, status: "Available" }
// ];

// // --- 2. INITIAL RENDER ---
// document.addEventListener('DOMContentLoaded', () => {
//     renderBooks(books);
// });

// // --- 3. RENDER FUNCTION (With Image Logic) ---
// function renderBooks(data) {
//     const tbody = document.getElementById("bookList");
//     tbody.innerHTML = "";

//     if (data.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" class="no-results">No books found matching your search.</td></tr>`;
//         return;
//     }

//     data.forEach(book => {
//         const isAvailable = book.quantity > 0;
//         const statusText = isAvailable ? "Available" : "Out of Stock";
//         const badgeClass = isAvailable ? 'status-available' : 'status-issued';

//         let buttonHTML;
//         if (isAvailable) {
//             buttonHTML = `<button class="action-btn btn-issue" onclick="updateBookStatus(${book.id}, 'issue')">Issue Book</button>`;
//         } else {
//             buttonHTML = `<button class="action-btn btn-return" onclick="updateBookStatus(${book.id}, 'return')">Return / Restock</button>`;
//         }

//         const row = `
//                     <tr>
//                         <td>
//                             <img src="${book.image}" class="book-thumb" alt="Cover" onclick="openImageModal('${book.image}')">
//                         </td>
//                         <td style="font-weight: 600;">${book.title}</td>
//                         <td>${book.author}</td>
//                         <td>${book.category}</td>
//                         <td style="font-weight: 700;">${book.quantity}</td>
//                         <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
//                         <td>${buttonHTML}</td>
//                     </tr>
//                 `;
//         tbody.innerHTML += row;
//     });
// }

// // --- 4. IMAGE MODAL LOGIC ---
// function openImageModal(imgSrc) {
//     const modal = document.getElementById('imageModal');
//     const modalImg = document.getElementById('modalImage');

//     modalImg.src = imgSrc;
//     modal.style.display = 'flex';
// }

// function closeImageModal() {
//     document.getElementById('imageModal').style.display = 'none';
// }

// // --- 5. SEARCH & FILTER ---
// function filterBooks() {
//     const query = document.getElementById("search").value.toLowerCase();
//     const category = document.getElementById("categoryFilter").value;

//     const filtered = books.filter(book => {
//         const matchesSearch = book.title.toLowerCase().includes(query) ||
//             book.author.toLowerCase().includes(query);
//         const matchesCategory = category === "All" || book.category === category;
//         return matchesSearch && matchesCategory;
//     });
//     renderBooks(filtered);
// }

// // --- 6. ISSUE / RETURN LOGIC ---
// function updateBookStatus(id, action) {
//     const book = books.find(b => b.id === id);
//     if (book) {
//         if (action === 'issue') {
//             if (book.quantity > 0) {
//                 book.quantity--;
//                 alert(`Request Sent! Please collect "${book.title}". Copies remaining: ${book.quantity}`);
//             }
//         } else if (action === 'return') {
//             book.quantity++;
//             alert(`Success: "${book.title}" has been returned/restocked.`);
//         }

//         book.status = book.quantity > 0 ? "Available" : "Out of Stock";
//         filterBooks();
//     }
// }