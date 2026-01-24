const API_BASE = "http://localhost:5000/api/books";

let books = [];

// =============================
// INITIAL LOAD FROM BACKEND
// =============================
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterBooks, 300));
  }

  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterBooks);
  }
});

// =============================
// FETCH FROM BACKEND
// =============================
async function fetchBooks() {
  const tbody = document.getElementById("bookList");

  try {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="no-results">
          Loading books...
        </td>
      </tr>
    `;

    const res = await fetch(API_BASE);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // FIX: handle new API format
    const booksArray = Array.isArray(data)
      ? data
      : Array.isArray(data.books)
      ? data.books
      : [];

    books = booksArray;

    renderBooks(books);

  } catch (err) {
    console.error("Failed to load books:", err);

    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="no-results error">
          Backend not running or API error!
        </td>
      </tr>
    `;
  }
}

// =============================
// RENDER FUNCTION
// =============================
function renderBooks(data) {
  const tbody = document.getElementById("bookList");
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="no-results">
          No books found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach(book => {
    const tr = document.createElement("tr");

    const badgeClass =
      book.status === "Available"
        ? "status-available"
        : "status-issued";

    const btn = document.createElement("button");
    btn.className =
      book.status === "Available"
        ? "action-btn btn-issue"
        : "action-btn btn-return";

    btn.textContent =
      book.status === "Available" ? "Issue Book" : "Return";

    btn.addEventListener("click", () => toggleStatus(book._id));

    tr.innerHTML = `
      <td style="font-weight:600">${escapeHTML(book.title)}</td>
      <td>${escapeHTML(book.author)}</td>
      <td>${escapeHTML(book.department || book.category || "-")}</td>
      <td>
        <span class="status-badge ${badgeClass}">
          ${book.status}
        </span>
      </td>
    `;

    const actionTd = document.createElement("td");
    actionTd.appendChild(btn);
    tr.appendChild(actionTd);

    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}

// =============================
// SEARCH & FILTER
// =============================
function filterBooks() {
  const query =
    document.getElementById("search")?.value.toLowerCase() || "";

  const category =
    document.getElementById("categoryFilter")?.value || "All";

  const filtered = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    const matchesCategory =
      category === "All" ||
      book.department === category ||
      book.category === category;

    return matchesSearch && matchesCategory;
  });

  renderBooks(filtered);
}

// =============================
// ISSUE / RETURN (BACKEND)
// =============================
async function toggleStatus(bookId) {
  try {
    const res = await fetch(
      `${API_BASE}/${encodeURIComponent(bookId)}/toggle`,
      {
        method: "PUT"
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update book");
      return;
    }

    alert(data.message || "Updated successfully!");

    await fetchBooks();

  } catch (err) {
    console.error("Toggle error:", err);
    alert("Server error while updating book");
  }
}

// =============================
// UTILS
// =============================
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function escapeHTML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
